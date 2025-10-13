"""
Model training module.

Trains multiple ML models for admission probability prediction:
1. Logistic Regression (baseline, interpretable)
2. Random Forest (captures non-linear patterns)
3. XGBoost (high performance)
4. Ensemble (combines all three)
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, brier_score_loss, log_loss,
    confusion_matrix, classification_report
)
import xgboost as xgb
import joblib
import json
from pathlib import Path
from typing import Dict, Tuple, Any
from datetime import datetime


class ModelTrainer:
    """
    Trains and evaluates ML models for admission prediction.
    """
    
    def __init__(self, random_state: int = 42):
        """Initialize trainer with random seed."""
        self.random_state = random_state
        self.models = {}
        self.scalers = {}
        self.feature_names = []
        self.metadata = {}
        
    def prepare_data(
        self,
        df: pd.DataFrame,
        test_size: float = 0.2
    ) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
        """
        Prepare training and test sets.
        
        Args:
            df: Training dataframe
            test_size: Fraction for test set
            
        Returns:
            X_train, X_test, y_train, y_test, probs_train, probs_test
        """
        print("\n" + "="*60)
        print("PREPARING DATA")
        print("="*60)
        
        # Separate features from metadata
        metadata_cols = ['college_name', 'acceptance_rate', 'selectivity_tier', 
                        'formula_probability', 'final_probability', 'outcome', 'profile_strength']
        
        feature_cols = [col for col in df.columns if col not in metadata_cols]
        
        X = df[feature_cols].values
        y = df['outcome'].values
        probs = df['formula_probability'].values  # Keep formula probabilities
        
        self.feature_names = feature_cols
        
        # Split data (stratified to maintain class balance)
        X_train, X_test, y_train, y_test, probs_train, probs_test = train_test_split(
            X, y, probs,
            test_size=test_size,
            random_state=self.random_state,
            stratify=y
        )
        
        print(f"Training set: {len(X_train)} samples")
        print(f"Test set: {len(X_test)} samples")
        print(f"Class balance (train): {y_train.mean():.1%} accepted")
        print(f"Class balance (test): {y_test.mean():.1%} accepted")
        
        # Scale features (important for Logistic Regression)
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        self.scalers['standard'] = scaler
        
        return X_train_scaled, X_test_scaled, y_train, y_test, probs_train, probs_test
    
    def train_logistic_regression(
        self,
        X_train: np.ndarray,
        y_train: np.ndarray
    ) -> CalibratedClassifierCV:
        """
        Train calibrated logistic regression model.
        
        This is our baseline model - simple, interpretable, fast.
        """
        print("\n" + "="*60)
        print("TRAINING LOGISTIC REGRESSION")
        print("="*60)
        
        # Base logistic regression
        lr = LogisticRegression(
            penalty='l2',
            C=1.0,  # Regularization strength
            max_iter=1000,
            random_state=self.random_state,
            class_weight='balanced',  # Handle class imbalance
            solver='lbfgs'
        )
        
        # Calibrate probabilities using cross-validation
        lr_calibrated = CalibratedClassifierCV(
            lr,
            method='sigmoid',
            cv=5
        )
        
        print("Training with 5-fold calibration...")
        lr_calibrated.fit(X_train, y_train)
        
        # Cross-validation score
        cv_scores = cross_val_score(
            lr, X_train, y_train,
            cv=5,
            scoring='roc_auc'
        )
        
        print(f"Cross-validation ROC-AUC: {cv_scores.mean():.4f} (+/- {cv_scores.std():.4f})")
        
        self.models['logistic_regression'] = lr_calibrated
        return lr_calibrated
    
    def train_random_forest(
        self,
        X_train: np.ndarray,
        y_train: np.ndarray
    ) -> RandomForestClassifier:
        """
        Train Random Forest model.
        
        Captures non-linear patterns and feature interactions.
        """
        print("\n" + "="*60)
        print("TRAINING RANDOM FOREST")
        print("="*60)
        
        rf = RandomForestClassifier(
            n_estimators=200,  # Number of trees
            max_depth=10,  # Prevent overfitting
            min_samples_split=20,
            min_samples_leaf=10,
            max_features='sqrt',  # Feature subsampling
            random_state=self.random_state,
            class_weight='balanced',
            n_jobs=-1  # Use all CPU cores
        )
        
        print("Training 200 trees...")
        rf.fit(X_train, y_train)
        
        # Feature importance
        importances = rf.feature_importances_
        top_features_idx = np.argsort(importances)[-10:][::-1]
        
        print("\nTop 10 most important features:")
        for idx in top_features_idx:
            print(f"  {self.feature_names[idx]}: {importances[idx]:.4f}")
        
        self.models['random_forest'] = rf
        return rf
    
    def train_xgboost(
        self,
        X_train: np.ndarray,
        y_train: np.ndarray
    ) -> xgb.XGBClassifier:
        """
        Train XGBoost model.
        
        State-of-the-art gradient boosting - highest accuracy.
        """
        print("\n" + "="*60)
        print("TRAINING XGBOOST")
        print("="*60)
        
        # Calculate scale_pos_weight for imbalanced data
        scale_pos_weight = (y_train == 0).sum() / (y_train == 1).sum()
        
        xgb_model = xgb.XGBClassifier(
            n_estimators=200,
            max_depth=6,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            scale_pos_weight=scale_pos_weight,
            random_state=self.random_state,
            eval_metric='logloss',
            use_label_encoder=False
        )
        
        print("Training with gradient boosting...")
        xgb_model.fit(X_train, y_train)
        
        # Feature importance
        importances = xgb_model.feature_importances_
        top_features_idx = np.argsort(importances)[-10:][::-1]
        
        print("\nTop 10 most important features:")
        for idx in top_features_idx:
            print(f"  {self.feature_names[idx]}: {importances[idx]:.4f}")
        
        self.models['xgboost'] = xgb_model
        return xgb_model
    
    def create_ensemble(
        self,
        X_train: np.ndarray,
        y_train: np.ndarray
    ) -> VotingClassifier:
        """
        Create ensemble model combining all three models.
        
        Uses soft voting (probability averaging).
        """
        print("\n" + "="*60)
        print("CREATING ENSEMBLE MODEL")
        print("="*60)
        
        ensemble = VotingClassifier(
            estimators=[
                ('lr', self.models['logistic_regression']),
                ('rf', self.models['random_forest']),
                ('xgb', self.models['xgboost'])
            ],
            voting='soft',  # Average probabilities
            weights=[1, 2, 2]  # Give more weight to RF and XGBoost
        )
        
        print("Ensemble weights: LR=1, RF=2, XGB=2")
        print("This gives 20% LR, 40% RF, 40% XGB")
        print("Fitting ensemble...")
        ensemble.fit(X_train, y_train)
        
        self.models['ensemble'] = ensemble
        return ensemble
    
    def evaluate_model(
        self,
        model,
        X_test: np.ndarray,
        y_test: np.ndarray,
        model_name: str
    ) -> Dict[str, float]:
        """
        Comprehensive model evaluation.
        
        Returns:
            Dictionary of metrics
        """
        print(f"\n{'='*60}")
        print(f"EVALUATING {model_name.upper()}")
        print(f"{'='*60}")
        
        # Predictions
        y_pred = model.predict(X_test)
        y_prob = model.predict_proba(X_test)[:, 1]
        
        # Calculate metrics
        metrics = {
            'accuracy': accuracy_score(y_test, y_pred),
            'precision': precision_score(y_test, y_pred),
            'recall': recall_score(y_test, y_pred),
            'f1_score': f1_score(y_test, y_pred),
            'roc_auc': roc_auc_score(y_test, y_prob),
            'brier_score': brier_score_loss(y_test, y_prob),
            'log_loss': log_loss(y_test, y_prob)
        }
        
        # Print results
        print(f"Accuracy:     {metrics['accuracy']:.4f}")
        print(f"Precision:    {metrics['precision']:.4f}")
        print(f"Recall:       {metrics['recall']:.4f}")
        print(f"F1 Score:     {metrics['f1_score']:.4f}")
        print(f"ROC-AUC:      {metrics['roc_auc']:.4f}")
        print(f"Brier Score:  {metrics['brier_score']:.4f} (lower is better)")
        print(f"Log Loss:     {metrics['log_loss']:.4f} (lower is better)")
        
        # Confusion matrix
        cm = confusion_matrix(y_test, y_pred)
        print(f"\nConfusion Matrix:")
        print(f"                 Predicted")
        print(f"                 Reject  Accept")
        print(f"Actual Reject    {cm[0,0]:4d}    {cm[0,1]:4d}")
        print(f"       Accept    {cm[1,0]:4d}    {cm[1,1]:4d}")
        
        return metrics
    
    def train_all_models(
        self,
        df: pd.DataFrame,
        test_size: float = 0.2
    ) -> Dict[str, Dict[str, float]]:
        """
        Train and evaluate all models.
        
        Args:
            df: Training dataframe
            test_size: Test set fraction
            
        Returns:
            Dictionary of metrics for each model
        """
        print("\n" + "="*60)
        print("CHANCIFY AI - ML MODEL TRAINING")
        print("="*60)
        print(f"Total samples: {len(df)}")
        print(f"Features: {len([c for c in df.columns if c not in ['college_name', 'acceptance_rate', 'selectivity_tier', 'formula_probability', 'final_probability', 'outcome', 'profile_strength']])}")
        print(f"Test size: {test_size:.0%}")
        
        # Prepare data
        X_train, X_test, y_train, y_test, probs_train, probs_test = self.prepare_data(df, test_size)
        
        # Train models
        self.train_logistic_regression(X_train, y_train)
        self.train_random_forest(X_train, y_train)
        self.train_xgboost(X_train, y_train)
        self.create_ensemble(X_train, y_train)
        
        # Evaluate all models
        results = {}
        for model_name, model in self.models.items():
            results[model_name] = self.evaluate_model(model, X_test, y_test, model_name)
        
        # Compare formula baseline
        print(f"\n{'='*60}")
        print("FORMULA BASELINE COMPARISON")
        print(f"{'='*60}")
        
        # Calculate metrics for formula predictions
        formula_pred = (probs_test > 0.5).astype(int)
        formula_metrics = {
            'accuracy': accuracy_score(y_test, formula_pred),
            'roc_auc': roc_auc_score(y_test, probs_test),
            'brier_score': brier_score_loss(y_test, probs_test)
        }
        
        print(f"Formula Accuracy: {formula_metrics['accuracy']:.4f}")
        print(f"Formula ROC-AUC:  {formula_metrics['roc_auc']:.4f}")
        print(f"Formula Brier:    {formula_metrics['brier_score']:.4f}")
        
        results['formula_baseline'] = formula_metrics
        
        # Summary comparison
        print(f"\n{'='*60}")
        print("MODEL COMPARISON SUMMARY")
        print(f"{'='*60}")
        print(f"{'Model':<20} {'Accuracy':>10} {'ROC-AUC':>10} {'Brier':>10}")
        print("-" * 60)
        
        for name, metrics in results.items():
            acc = metrics.get('accuracy', 0)
            auc = metrics.get('roc_auc', 0)
            brier = metrics.get('brier_score', 0)
            print(f"{name:<20} {acc:>10.4f} {auc:>10.4f} {brier:>10.4f}")
        
        # Store metadata
        self.metadata = {
            'training_date': datetime.now().isoformat(),
            'num_samples': len(df),
            'num_features': len(self.feature_names),
            'test_size': test_size,
            'num_train': len(X_train),
            'num_test': len(X_test),
            'class_balance_train': float(y_train.mean()),
            'class_balance_test': float(y_test.mean()),
            'feature_names': self.feature_names,
            'metrics': results
        }
        
        return results
    
    def save_models(self, output_dir: str = 'data/models'):
        """
        Save trained models and metadata.
        
        Args:
            output_dir: Directory to save models
        """
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        print(f"\n{'='*60}")
        print("SAVING MODELS")
        print(f"{'='*60}")
        
        # Save each model
        for model_name, model in self.models.items():
            model_file = output_path / f'{model_name}.joblib'
            joblib.dump(model, model_file)
            print(f"Saved {model_name} to {model_file}")
        
        # Save scaler
        scaler_file = output_path / 'scaler.joblib'
        joblib.dump(self.scalers['standard'], scaler_file)
        print(f"Saved scaler to {scaler_file}")
        
        # Save metadata
        metadata_file = output_path / 'metadata.json'
        with open(metadata_file, 'w') as f:
            json.dump(self.metadata, f, indent=2)
        print(f"Saved metadata to {metadata_file}")
        
        print(f"\nAll models saved to: {output_path}")
        print("Ready for deployment!")


def train_initial_models(
    training_data_path: str = 'data/processed/training_data.csv',
    output_dir: str = 'data/models',
    test_size: float = 0.2,
    random_state: int = 42
) -> Dict[str, Dict[str, float]]:
    """
    Train ML models from training data CSV.
    
    Args:
        training_data_path: Path to training data
        output_dir: Where to save models
        test_size: Test set fraction
        random_state: Random seed
        
    Returns:
        Dictionary of model metrics
    """
    # Load data
    print("Loading training data...")
    df = pd.read_csv(training_data_path)
    print(f"Loaded {len(df)} samples")
    
    # Train models
    trainer = ModelTrainer(random_state=random_state)
    results = trainer.train_all_models(df, test_size=test_size)
    
    # Save models
    trainer.save_models(output_dir)
    
    return results


if __name__ == "__main__":
    # Train models
    results = train_initial_models(
        training_data_path='../data/processed/training_data.csv',
        output_dir='../data/models',
        test_size=0.2,
        random_state=42
    )
    
    print("\n" + "="*60)
    print("TRAINING COMPLETE!")
    print("="*60)
    print("Models are ready for integration with the API.")

