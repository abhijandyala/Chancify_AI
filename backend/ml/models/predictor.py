"""
ML Model Predictor with hybrid formula+ML approach.
"""

import numpy as np
import joblib
import json
from pathlib import Path
from typing import Dict, Optional, Tuple
from dataclasses import dataclass

from backend.ml.preprocessing.feature_extractor import StudentFeatures, CollegeFeatures, FeatureExtractor
from backend.core import calculate_admission_probability


@dataclass
class PredictionResult:
    """Result from hybrid ML+Formula prediction."""
    
    # Final blended prediction
    probability: float
    confidence_interval: Tuple[float, float]
    
    # Individual predictions
    ml_probability: float
    formula_probability: float
    
    # Metadata
    ml_confidence: float  # 0-1, how confident is ML
    blend_weights: Dict[str, float]  # {'ml': 0.6, 'formula': 0.4}
    model_used: str  # 'ensemble', 'logistic_regression', etc.
    explanation: str
    
    # Audit data
    feature_importances: Optional[Dict[str, float]] = None


class AdmissionPredictor:
    """
    Hybrid ML+Formula predictor for admission probability.
    
    Intelligently blends ML model predictions with formula-based calculations.
    """
    
    def __init__(self, model_dir: str = 'backend/data/models'):
        """
        Initialize predictor by loading trained models.
        
        Args:
            model_dir: Directory containing saved models
        """
        self.model_dir = Path(model_dir)
        self.models = {}
        self.scaler = None
        self.feature_selector = None
        self.metadata = {}
        self.feature_names = []
        
        # Load models if available
        if self.model_dir.exists():
            self._load_models()
    
    def _load_models(self):
        """Load all trained models from disk."""
        try:
            # Load metadata
            metadata_file = self.model_dir / 'metadata.json'
            if metadata_file.exists():
                with open(metadata_file, 'r') as f:
                    self.metadata = json.load(f)
                self.feature_names = self.metadata.get('feature_names', [])
            
            # Load scaler
            scaler_file = self.model_dir / 'scaler.joblib'
            if scaler_file.exists():
                self.scaler = joblib.load(scaler_file)
            
            # Load feature selector
            selector_file = self.model_dir / 'feature_selector.joblib'
            if selector_file.exists():
                self.feature_selector = joblib.load(selector_file)
            
            # Load models
            model_files = {
                'logistic_regression': 'logistic_regression.joblib',
                'random_forest': 'random_forest.joblib',
                'xgboost': 'xgboost.joblib',
                'ensemble': 'ensemble.joblib'
            }
            
            for name, filename in model_files.items():
                filepath = self.model_dir / filename
                if filepath.exists():
                    self.models[name] = joblib.load(filepath)
            
            print(f"Loaded {len(self.models)} models from {self.model_dir}")
            
        except Exception as e:
            print(f"Warning: Could not load models: {e}")
            print("Will use formula-only predictions")
    
    def is_available(self) -> bool:
        """Check if ML models are available."""
        return len(self.models) > 0 and self.scaler is not None
    
    def predict(
        self,
        student: StudentFeatures,
        college: CollegeFeatures,
        model_name: str = 'ensemble',
        use_formula: bool = True
    ) -> PredictionResult:
        """
        Predict admission probability with hybrid ML+Formula approach.
        
        Args:
            student: Student features
            college: College features
            model_name: Which ML model to use ('ensemble', 'logistic_regression', etc.)
            use_formula: Whether to blend with formula (recommended)
            
        Returns:
            PredictionResult with probability and metadata
        """
        # Get formula-based prediction first
        formula_result = calculate_admission_probability(
            factor_scores=student.factor_scores,
            acceptance_rate=college.acceptance_rate,
            uses_testing=(college.test_policy != 'Test-blind'),
            need_aware=(college.financial_aid_policy == 'Need-aware')
        )
        formula_prob = formula_result.probability
        
        # If ML not available or not requested, return formula only
        if not self.is_available() or not use_formula:
            return PredictionResult(
                probability=formula_prob,
                confidence_interval=(max(0.02, formula_prob - 0.10), 
                                   min(0.98, formula_prob + 0.10)),
                ml_probability=formula_prob,
                formula_probability=formula_prob,
                ml_confidence=0.0,
                blend_weights={'ml': 0.0, 'formula': 1.0},
                model_used='formula_only',
                explanation="Formula-based prediction (ML not available)"
            )
        
        # Extract features for ML
        features, _ = FeatureExtractor.extract_features(student, college)
        
        # Apply feature selection if available
        if self.feature_selector is not None:
            features = self.feature_selector.transform(features.reshape(1, -1))
        else:
            features = features.reshape(1, -1)
        
        # Scale features
        features_scaled = self.scaler.transform(features)
        
        # Get ML model
        model = self.models.get(model_name, self.models.get('ensemble'))
        if model is None:
            # Fallback to any available model
            model = list(self.models.values())[0]
            model_name = list(self.models.keys())[0]
        
        # ML prediction
        ml_prob = model.predict_proba(features_scaled)[0, 1]
        
        # Estimate ML confidence based on prediction certainty
        # More extreme predictions (close to 0 or 1) = higher confidence
        ml_confidence = 1.0 - 4 * ml_prob * (1 - ml_prob)  # 0 at 0.5, 1 at 0 or 1
        ml_confidence = max(0.3, min(0.9, ml_confidence))  # Clamp to reasonable range
        
        # Determine blend weights
        # If ML is confident and performs well, trust it more
        # If ML is uncertain, trust formula more
        
        # Base weights (from training performance)
        # Ensemble ROC-AUC: 0.7812, Formula ROC-AUC: 0.8101
        # Formula is slightly better, so start with more formula weight
        
        if ml_confidence > 0.7:
            # High ML confidence: 60% ML, 40% formula
            ml_weight = 0.60
            formula_weight = 0.40
        elif ml_confidence > 0.5:
            # Medium confidence: 50-50
            ml_weight = 0.50
            formula_weight = 0.50
        else:
            # Low confidence: trust formula more
            ml_weight = 0.40
            formula_weight = 0.60
        
        # Blend predictions
        final_prob = ml_weight * ml_prob + formula_weight * formula_prob
        final_prob = np.clip(final_prob, 0.02, 0.98)  # Reasonable bounds
        
        # Confidence interval (wider if ML is uncertain)
        ci_width = 0.15 * (1 - ml_confidence)  # Smaller CI when more confident
        ci_lower = max(0.02, final_prob - ci_width)
        ci_upper = min(0.98, final_prob + ci_width)
        
        # Feature importances (if available)
        feature_importances = None
        if hasattr(model, 'feature_importances_'):
            importances = model.feature_importances_
            feature_importances = dict(zip(self.feature_names, importances))
        
        # Create explanation
        explanation = f"Hybrid: {ml_weight:.0%} ML ({model_name}) + {formula_weight:.0%} Formula"
        
        return PredictionResult(
            probability=final_prob,
            confidence_interval=(ci_lower, ci_upper),
            ml_probability=ml_prob,
            formula_probability=formula_prob,
            ml_confidence=ml_confidence,
            blend_weights={'ml': ml_weight, 'formula': formula_weight},
            model_used=model_name,
            explanation=explanation,
            feature_importances=feature_importances
        )
    
    def predict_batch(
        self,
        student: StudentFeatures,
        colleges: list[CollegeFeatures],
        model_name: str = 'ensemble'
    ) -> list[PredictionResult]:
        """
        Predict for multiple colleges at once.
        
        Args:
            student: Student features
            colleges: List of colleges
            model_name: ML model to use
            
        Returns:
            List of prediction results
        """
        results = []
        for college in colleges:
            result = self.predict(student, college, model_name=model_name)
            results.append(result)
        return results
    
    def get_model_info(self) -> Dict:
        """Get information about loaded models."""
        return {
            'available': self.is_available(),
            'models_loaded': list(self.models.keys()),
            'num_features': len(self.feature_names),
            'training_date': self.metadata.get('training_date'),
            'num_training_samples': self.metadata.get('num_samples'),
            'metrics': self.metadata.get('metrics', {})
        }


# Global predictor instance (lazy loaded)
_predictor: Optional[AdmissionPredictor] = None


def get_predictor(model_dir: str = 'backend/data/models') -> AdmissionPredictor:
    """
    Get global predictor instance (singleton pattern).
    
    Args:
        model_dir: Directory containing models
        
    Returns:
        AdmissionPredictor instance
    """
    global _predictor
    if _predictor is None:
        _predictor = AdmissionPredictor(model_dir=model_dir)
    return _predictor


def model_available() -> bool:
    """Check if ML models are available."""
    predictor = get_predictor()
    return predictor.is_available()

