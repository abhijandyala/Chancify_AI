#!/usr/bin/env python3
"""
Update ML model calibration based on Quora analysis to make elite university
probabilities more realistic.
"""

import json
import pandas as pd
import numpy as np
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MLCalibrationUpdater:
    def __init__(self):
        self.analysis_file = "backend/data/processed/quora_analysis.json"
        self.college_data_file = "backend/data/raw/integrated_colleges.csv"
        self.calibration_data = self.load_calibration_data()
        
    def load_calibration_data(self):
        """Load Quora analysis data"""
        try:
            with open(self.analysis_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            logger.error(f"Analysis file {self.analysis_file} not found. Run analyze_quora_data.py first.")
            return None
    
    def create_elite_college_mapping(self):
        """
        Create mapping of college names to calibration factors
        """
        if not self.calibration_data:
            return {}
        
        calibration_adjustments = self.calibration_data.get('calibration_adjustments', {})
        elite_mapping = {}
        
        # Map college names to their calibration factors
        for college, data in calibration_adjustments.items():
            elite_mapping[college.lower()] = {
                'calibration_factor': data['calibration_factor'],
                'max_probability': data['max_probability'],
                'acceptance_rate': data['acceptance_rate'],
                'category': data['category']
            }
        
        return elite_mapping
    
    def update_college_data_with_calibration(self):
        """
        Update the integrated colleges CSV with calibration factors
        """
        if not Path(self.college_data_file).exists():
            logger.error(f"College data file {self.college_data_file} not found.")
            return
        
        # Load college data
        df = pd.read_csv(self.college_data_file)
        
        # Create elite mapping
        elite_mapping = self.create_elite_college_mapping()
        
        # Add calibration columns
        df['calibration_factor'] = 1.0  # Default no calibration
        df['max_probability'] = 1.0     # Default no max limit
        df['is_elite'] = False          # Default not elite
        
        # Apply calibration factors to elite colleges
        for idx, row in df.iterrows():
            college_name = str(row['name']).lower()
            
            # Check if this college matches any elite college
            for elite_college, calibration_data in elite_mapping.items():
                if elite_college in college_name or college_name in elite_college:
                    df.at[idx, 'calibration_factor'] = calibration_data['calibration_factor']
                    df.at[idx, 'max_probability'] = calibration_data['max_probability']
                    df.at[idx, 'is_elite'] = True
                    logger.info(f"Applied calibration to {row['name']}: factor={calibration_data['calibration_factor']:.2f}, max_prob={calibration_data['max_probability']:.2f}")
                    break
        
        # Save updated data
        output_file = "backend/data/raw/integrated_colleges_calibrated.csv"
        df.to_csv(output_file, index=False)
        logger.info(f"Updated college data saved to {output_file}")
        
        return df
    
    def create_calibration_config(self):
        """
        Create a configuration file for the ML model calibration
        """
        if not self.calibration_data:
            return
        
        calibration_config = {
            'version': '1.0',
            'description': 'ML Model Calibration based on Quora admission data analysis',
            'elite_colleges': self.calibration_data.get('calibration_adjustments', {}),
            'calibration_rules': {
                'ultra_selective': {
                    'description': 'MIT, Harvard, Stanford - acceptance rate < 5%',
                    'calibration_factor': 0.1,
                    'max_probability': 0.12,
                    'note': 'Even perfect profiles have < 12% chance'
                },
                'highly_selective': {
                    'description': 'Yale, Princeton, Columbia - acceptance rate 5-8%',
                    'calibration_factor': 0.15,
                    'max_probability': 0.18,
                    'note': 'Perfect profiles have < 18% chance'
                },
                'very_selective': {
                    'description': 'Cornell, Duke, Northwestern - acceptance rate 8-12%',
                    'calibration_factor': 0.25,
                    'max_probability': 0.25,
                    'note': 'Perfect profiles have < 25% chance'
                },
                'selective': {
                    'description': 'Rice, Emory, Georgetown - acceptance rate 12%+',
                    'calibration_factor': 0.4,
                    'max_probability': 0.35,
                    'note': 'Perfect profiles have < 35% chance'
                }
            },
            'implementation_notes': [
                'Apply calibration_factor to raw ML model output',
                'Cap final probability at max_probability',
                'Use acceptance_rate as baseline for realistic expectations',
                'Consider profile strength when applying calibration'
            ]
        }
        
        # Save configuration
        config_file = "backend/data/models/calibration_config.json"
        with open(config_file, 'w', encoding='utf-8') as f:
            json.dump(calibration_config, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Calibration configuration saved to {config_file}")
        return calibration_config
    
    def generate_updated_predictor_code(self):
        """
        Generate updated predictor code with calibration
        """
        predictor_code = '''
# Updated predictor with Quora-based calibration
import json
import numpy as np
from pathlib import Path

class CalibratedAdmissionPredictor(AdmissionPredictor):
    def __init__(self):
        super().__init__()
        self.calibration_config = self._load_calibration_config()
    
    def _load_calibration_config(self):
        """Load calibration configuration"""
        config_file = Path(__file__).parent / "calibration_config.json"
        try:
            with open(config_file, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            logger.warning("Calibration config not found, using default calibration")
            return None
    
    def predict(self, student, college, model_name='ensemble', use_formula=True):
        """Predict with calibration applied"""
        # Get base prediction
        result = super().predict(student, college, model_name, use_formula)
        
        # Apply calibration if available
        if self.calibration_config:
            result = self._apply_calibration(result, college)
        
        return result
    
    def _apply_calibration(self, result, college):
        """Apply calibration based on college selectivity"""
        college_name = college.name.lower()
        
        # Find matching elite college
        elite_colleges = self.calibration_config.get('elite_colleges', {})
        for elite_name, calibration_data in elite_colleges.items():
            if elite_name.lower() in college_name or college_name in elite_name.lower():
                # Apply calibration
                calibration_factor = calibration_data['calibration_factor']
                max_probability = calibration_data['max_probability']
                
                # Calibrate the probability
                calibrated_prob = result.probability * calibration_factor
                calibrated_prob = min(calibrated_prob, max_probability)
                
                # Update result
                result.probability = calibrated_prob
                
                # Add calibration info to explanation
                result.explanation += f" (Calibrated for {elite_name} selectivity)"
                
                logger.info(f"Applied calibration to {college.name}: {result.probability:.3f} -> {calibrated_prob:.3f}")
                break
        
        return result
'''
        
        # Save the updated predictor code
        code_file = "backend/ml/models/calibrated_predictor.py"
        with open(code_file, 'w', encoding='utf-8') as f:
            f.write(predictor_code)
        
        logger.info(f"Updated predictor code saved to {code_file}")
        return predictor_code

def main():
    """
    Main function to update ML calibration
    """
    updater = MLCalibrationUpdater()
    
    if not updater.calibration_data:
        logger.error("No calibration data available. Run analyze_quora_data.py first.")
        return
    
    logger.info("Updating ML model calibration...")
    
    # Update college data with calibration factors
    updated_df = updater.update_college_data_with_calibration()
    
    # Create calibration configuration
    config = updater.create_calibration_config()
    
    # Generate updated predictor code
    updater.generate_updated_predictor_code()
    
    logger.info("ML calibration update complete!")
    
    # Print summary
    if updated_df is not None:
        elite_count = updated_df['is_elite'].sum()
        logger.info(f"Applied calibration to {elite_count} elite colleges")

if __name__ == "__main__":
    main()
