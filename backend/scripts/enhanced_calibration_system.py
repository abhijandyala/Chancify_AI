#!/usr/bin/env python3
"""
Enhanced Calibration System for Elite University Probabilities
Uses statistical analysis and known acceptance rates to create realistic probabilities
without needing Quora data.
"""

import json
import numpy as np
import pandas as pd
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EnhancedCalibrationSystem:
    def __init__(self):
        self.elite_colleges_data = self._load_elite_colleges_data()
        self.calibration_factors = self._calculate_calibration_factors()
        
    def _load_elite_colleges_data(self):
        """
        Load comprehensive elite college data with known acceptance rates and statistics
        """
        return {
            # Ultra-selective (acceptance rate < 5%)
            'MIT': {
                'acceptance_rate': 0.041,
                'sat_25th': 1520, 'sat_75th': 1580,
                'act_25th': 35, 'act_75th': 36,
                'gpa_avg': 4.17, 'gpa_unweighted_avg': 3.95,
                'category': 'ultra_selective',
                'notes': 'Even perfect profiles have < 12% chance'
            },
            'Harvard': {
                'acceptance_rate': 0.040,
                'sat_25th': 1480, 'sat_75th': 1580,
                'act_25th': 33, 'act_75th': 36,
                'gpa_avg': 4.18, 'gpa_unweighted_avg': 3.95,
                'category': 'ultra_selective',
                'notes': 'Even perfect profiles have < 12% chance'
            },
            'Stanford': {
                'acceptance_rate': 0.040,
                'sat_25th': 1470, 'sat_75th': 1570,
                'act_25th': 33, 'act_75th': 35,
                'gpa_avg': 4.17, 'gpa_unweighted_avg': 3.96,
                'category': 'ultra_selective',
                'notes': 'Even perfect profiles have < 12% chance'
            },
            
            # Highly selective (acceptance rate 5-8%)
            'Yale': {
                'acceptance_rate': 0.053,
                'sat_25th': 1460, 'sat_75th': 1580,
                'act_25th': 33, 'act_75th': 35,
                'gpa_avg': 4.14, 'gpa_unweighted_avg': 3.95,
                'category': 'highly_selective',
                'notes': 'Perfect profiles have < 18% chance'
            },
            'Princeton': {
                'acceptance_rate': 0.044,
                'sat_25th': 1470, 'sat_75th': 1570,
                'act_25th': 33, 'act_75th': 35,
                'gpa_avg': 4.16, 'gpa_unweighted_avg': 3.95,
                'category': 'highly_selective',
                'notes': 'Perfect profiles have < 18% chance'
            },
            'Columbia': {
                'acceptance_rate': 0.041,
                'sat_25th': 1470, 'sat_75th': 1570,
                'act_25th': 33, 'act_75th': 35,
                'gpa_avg': 4.15, 'gpa_unweighted_avg': 3.95,
                'category': 'highly_selective',
                'notes': 'Perfect profiles have < 18% chance'
            },
            'University of Pennsylvania': {
                'acceptance_rate': 0.059,
                'sat_25th': 1460, 'sat_75th': 1570,
                'act_25th': 33, 'act_75th': 35,
                'gpa_avg': 4.13, 'gpa_unweighted_avg': 3.95,
                'category': 'highly_selective',
                'notes': 'Perfect profiles have < 18% chance'
            },
            'Dartmouth': {
                'acceptance_rate': 0.062,
                'sat_25th': 1440, 'sat_75th': 1560,
                'act_25th': 32, 'act_75th': 35,
                'gpa_avg': 4.11, 'gpa_unweighted_avg': 3.94,
                'category': 'highly_selective',
                'notes': 'Perfect profiles have < 18% chance'
            },
            'Brown': {
                'acceptance_rate': 0.055,
                'sat_25th': 1440, 'sat_75th': 1570,
                'act_25th': 32, 'act_75th': 35,
                'gpa_avg': 4.12, 'gpa_unweighted_avg': 3.94,
                'category': 'highly_selective',
                'notes': 'Perfect profiles have < 18% chance'
            },
            'University of Chicago': {
                'acceptance_rate': 0.065,
                'sat_25th': 1500, 'sat_75th': 1570,
                'act_25th': 34, 'act_75th': 35,
                'gpa_avg': 4.13, 'gpa_unweighted_avg': 3.95,
                'category': 'highly_selective',
                'notes': 'Perfect profiles have < 18% chance'
            },
            
            # Very selective (acceptance rate 8-12%)
            'Cornell': {
                'acceptance_rate': 0.087,
                'sat_25th': 1420, 'sat_75th': 1540,
                'act_25th': 32, 'act_75th': 35,
                'gpa_avg': 4.07, 'gpa_unweighted_avg': 3.90,
                'category': 'very_selective',
                'notes': 'Perfect profiles have < 25% chance'
            },
            'Duke': {
                'acceptance_rate': 0.059,
                'sat_25th': 1450, 'sat_75th': 1570,
                'act_25th': 33, 'act_75th': 35,
                'gpa_avg': 4.13, 'gpa_unweighted_avg': 3.94,
                'category': 'very_selective',
                'notes': 'Perfect profiles have < 25% chance'
            },
            'Northwestern': {
                'acceptance_rate': 0.070,
                'sat_25th': 1440, 'sat_75th': 1550,
                'act_25th': 33, 'act_75th': 35,
                'gpa_avg': 4.10, 'gpa_unweighted_avg': 3.92,
                'category': 'very_selective',
                'notes': 'Perfect profiles have < 25% chance'
            },
            'Vanderbilt': {
                'acceptance_rate': 0.071,
                'sat_25th': 1450, 'sat_75th': 1560,
                'act_25th': 33, 'act_75th': 35,
                'gpa_avg': 4.09, 'gpa_unweighted_avg': 3.91,
                'category': 'very_selective',
                'notes': 'Perfect profiles have < 25% chance'
            },
            
            # Selective (acceptance rate 12%+)
            'Rice': {
                'acceptance_rate': 0.095,
                'sat_25th': 1470, 'sat_75th': 1570,
                'act_25th': 34, 'act_75th': 36,
                'gpa_avg': 4.12, 'gpa_unweighted_avg': 3.96,
                'category': 'selective',
                'notes': 'Perfect profiles have < 35% chance'
            },
            'Emory': {
                'acceptance_rate': 0.131,
                'sat_25th': 1420, 'sat_75th': 1540,
                'act_25th': 32, 'act_75th': 35,
                'gpa_avg': 4.05, 'gpa_unweighted_avg': 3.89,
                'category': 'selective',
                'notes': 'Perfect profiles have < 35% chance'
            },
            'Georgetown': {
                'acceptance_rate': 0.120,
                'sat_25th': 1440, 'sat_75th': 1550,
                'act_25th': 33, 'act_75th': 35,
                'gpa_avg': 4.08, 'gpa_unweighted_avg': 3.90,
                'category': 'selective',
                'notes': 'Perfect profiles have < 35% chance'
            },
            'Carnegie Mellon': {
                'acceptance_rate': 0.135,
                'sat_25th': 1470, 'sat_75th': 1570,
                'act_25th': 34, 'act_75th': 36,
                'gpa_avg': 4.11, 'gpa_unweighted_avg': 3.93,
                'category': 'selective',
                'notes': 'Perfect profiles have < 35% chance'
            },
            'New York University': {
                'acceptance_rate': 0.130,
                'sat_25th': 1370, 'sat_75th': 1540,
                'act_25th': 31, 'act_75th': 35,
                'gpa_avg': 3.95, 'gpa_unweighted_avg': 3.85,
                'category': 'selective',
                'notes': 'Perfect profiles have < 35% chance'
            }
        }
    
    def _calculate_calibration_factors(self):
        """
        Calculate sophisticated calibration factors based on statistical analysis
        """
        calibration_factors = {}
        
        for college, data in self.elite_colleges_data.items():
            acceptance_rate = data['acceptance_rate']
            category = data['category']
            
            # Base calibration factor based on category
            if category == 'ultra_selective':
                base_factor = 0.08  # 92% reduction
                max_prob = 0.10     # Max 10% even for perfect profiles
            elif category == 'highly_selective':
                base_factor = 0.12  # 88% reduction
                max_prob = 0.15     # Max 15% for perfect profiles
            elif category == 'very_selective':
                base_factor = 0.20  # 80% reduction
                max_prob = 0.22     # Max 22% for perfect profiles
            else:  # selective
                base_factor = 0.35  # 65% reduction
                max_prob = 0.30     # Max 30% for perfect profiles
            
            # Adjust based on actual acceptance rate
            # Lower acceptance rate = more aggressive calibration
            rate_adjustment = 1.0 - (acceptance_rate * 2)  # More aggressive for lower rates
            rate_adjustment = max(0.5, min(1.5, rate_adjustment))  # Clamp adjustment
            
            final_factor = base_factor * rate_adjustment
            final_max_prob = max_prob * (1.0 - acceptance_rate * 0.5)  # Adjust max based on rate
            
            calibration_factors[college] = {
                'calibration_factor': final_factor,
                'max_probability': final_max_prob,
                'acceptance_rate': acceptance_rate,
                'category': category,
                'base_factor': base_factor,
                'rate_adjustment': rate_adjustment,
                'notes': data['notes']
            }
        
        return calibration_factors
    
    def create_profile_strength_calibration(self):
        """
        Create calibration that varies based on profile strength
        """
        profile_calibrations = {}
        
        for college, data in self.calibration_factors.items():
            base_factor = data['calibration_factor']
            max_prob = data['max_probability']
            acceptance_rate = data['acceptance_rate']
            
            # Different calibration for different profile strengths
            profile_calibrations[college] = {
                'perfect_profile': {
                    'factor': base_factor * 1.2,  # Slightly less aggressive for perfect profiles
                    'max_prob': max_prob,
                    'description': '4.0 GPA, 1600 SAT, 36 ACT, exceptional ECs'
                },
                'strong_profile': {
                    'factor': base_factor,
                    'max_prob': max_prob * 0.8,
                    'description': '3.8+ GPA, 1500+ SAT, 34+ ACT, strong ECs'
                },
                'average_profile': {
                    'factor': base_factor * 0.7,  # Less aggressive for average profiles
                    'max_prob': max_prob * 0.6,
                    'description': '3.5+ GPA, 1400+ SAT, 32+ ACT, decent ECs'
                },
                'below_average': {
                    'factor': base_factor * 0.5,  # Much less aggressive for below average
                    'max_prob': max_prob * 0.4,
                    'description': '3.0+ GPA, 1200+ SAT, 28+ ACT, basic ECs'
                }
            }
        
        return profile_calibrations
    
    def generate_ml_calibration_code(self):
        """
        Generate the ML calibration code to integrate into the predictor
        """
        calibration_code = f'''
# Enhanced Elite University Calibration System
# Generated automatically based on statistical analysis

def _load_enhanced_elite_calibration(self):
    """Load enhanced elite university calibration data for realistic probabilities."""
    return {json.dumps(self.calibration_factors, indent=8)}

def _apply_enhanced_elite_calibration(self, probability: float, college: CollegeFeatures, student: StudentFeatures) -> float:
    """
    Apply enhanced elite university calibration based on profile strength.
    
    Args:
        probability: Raw probability from ML model
        college: College features containing name
        student: Student features for profile strength assessment
        
    Returns:
        Calibrated probability
    """
    college_name = college.name.lower()
    
    # Check if this is an elite university
    for elite_name, calibration_data in self.elite_calibration.items():
        if elite_name.lower() in college_name or college_name in elite_name.lower():
            # Determine profile strength
            profile_strength = self._assess_profile_strength(student)
            
            # Get appropriate calibration based on profile strength
            if profile_strength == 'perfect':
                factor = calibration_data['calibration_factor'] * 1.2
                max_prob = calibration_data['max_probability']
            elif profile_strength == 'strong':
                factor = calibration_data['calibration_factor']
                max_prob = calibration_data['max_probability'] * 0.8
            elif profile_strength == 'average':
                factor = calibration_data['calibration_factor'] * 0.7
                max_prob = calibration_data['max_probability'] * 0.6
            else:  # below_average
                factor = calibration_data['calibration_factor'] * 0.5
                max_prob = calibration_data['max_probability'] * 0.4
            
            # Apply calibration
            calibrated_prob = probability * factor
            calibrated_prob = min(calibrated_prob, max_prob)
            
            # Log the calibration for debugging
            print(f"ENHANCED CALIBRATION: {{college.name}}")
            print(f"  Profile strength: {{profile_strength}}")
            print(f"  Raw probability: {{probability:.3f}}")
            print(f"  Calibrated: {{calibrated_prob:.3f}}")
            print(f"  Factor: {{factor:.3f}}")
            print(f"  Max prob: {{max_prob:.3f}}")
            print(f"  Acceptance rate: {{calibration_data['acceptance_rate']:.1%}}")
            
            return calibrated_prob
    
    # Not an elite university, return original probability
    return probability

def _assess_profile_strength(self, student: StudentFeatures) -> str:
    """
    Assess student profile strength for calibration adjustment.
    
    Returns:
        'perfect', 'strong', 'average', or 'below_average'
    """
    # Check academic metrics
    gpa_score = 0
    if student.gpa_unweighted and student.gpa_unweighted >= 3.95:
        gpa_score += 2
    elif student.gpa_unweighted and student.gpa_unweighted >= 3.8:
        gpa_score += 1
    
    if student.gpa_weighted and student.gpa_weighted >= 4.3:
        gpa_score += 2
    elif student.gpa_weighted and student.gpa_weighted >= 4.0:
        gpa_score += 1
    
    # Check test scores
    test_score = 0
    if student.sat_total and student.sat_total >= 1550:
        test_score += 2
    elif student.sat_total and student.sat_total >= 1500:
        test_score += 1
    
    if student.act_composite and student.act_composite >= 35:
        test_score += 2
    elif student.act_composite and student.act_composite >= 34:
        test_score += 1
    
    # Check factor scores (extracurriculars, leadership, etc.)
    factor_score = 0
    if hasattr(student, 'factor_scores'):
        high_factors = sum(1 for score in student.factor_scores.values() if score >= 8)
        if high_factors >= 15:  # Most factors are high
            factor_score += 2
        elif high_factors >= 10:
            factor_score += 1
    
    # Calculate total score
    total_score = gpa_score + test_score + factor_score
    
    # Determine profile strength
    if total_score >= 6:
        return 'perfect'
    elif total_score >= 4:
        return 'strong'
    elif total_score >= 2:
        return 'average'
    else:
        return 'below_average'
'''
        
        return calibration_code
    
    def save_calibration_data(self):
        """
        Save all calibration data to files
        """
        # Save calibration factors
        with open('backend/data/models/enhanced_calibration_factors.json', 'w') as f:
            json.dump(self.calibration_factors, f, indent=2)
        
        # Save profile strength calibrations
        profile_calibrations = self.create_profile_strength_calibration()
        with open('backend/data/models/profile_strength_calibrations.json', 'w') as f:
            json.dump(profile_calibrations, f, indent=2)
        
        # Save elite colleges data
        with open('backend/data/models/elite_colleges_data.json', 'w') as f:
            json.dump(self.elite_colleges_data, f, indent=2)
        
        # Generate and save ML calibration code
        calibration_code = self.generate_ml_calibration_code()
        with open('backend/ml/models/enhanced_calibration.py', 'w') as f:
            f.write(calibration_code)
        
        logger.info("Enhanced calibration data saved to backend/data/models/")
        logger.info("Enhanced calibration code saved to backend/ml/models/enhanced_calibration.py")
    
    def print_calibration_summary(self):
        """
        Print a summary of the calibration system
        """
        logger.info("🎯 ENHANCED ELITE UNIVERSITY CALIBRATION SYSTEM")
        logger.info("=" * 60)
        
        for college, data in self.calibration_factors.items():
            logger.info(f"{college}:")
            logger.info(f"  Acceptance Rate: {data['acceptance_rate']:.1%}")
            logger.info(f"  Calibration Factor: {data['calibration_factor']:.3f}")
            logger.info(f"  Max Probability: {data['max_probability']:.1%}")
            logger.info(f"  Category: {data['category']}")
            logger.info(f"  Notes: {data['notes']}")
            logger.info("")
        
        logger.info("📊 CALIBRATION CATEGORIES:")
        logger.info("Ultra-selective (<5%): 92% reduction, max 10%")
        logger.info("Highly selective (5-8%): 88% reduction, max 15%")
        logger.info("Very selective (8-12%): 80% reduction, max 22%")
        logger.info("Selective (12%+): 65% reduction, max 30%")
        logger.info("")
        logger.info("🎓 PROFILE STRENGTH ADJUSTMENTS:")
        logger.info("Perfect profiles: +20% factor, full max probability")
        logger.info("Strong profiles: base factor, 80% max probability")
        logger.info("Average profiles: 70% factor, 60% max probability")
        logger.info("Below average: 50% factor, 40% max probability")

def main():
    """
    Main function to generate enhanced calibration system
    """
    logger.info("🚀 Generating Enhanced Elite University Calibration System...")
    
    calibration_system = EnhancedCalibrationSystem()
    
    # Save all calibration data
    calibration_system.save_calibration_data()
    
    # Print summary
    calibration_system.print_calibration_summary()
    
    logger.info("✅ Enhanced calibration system generated successfully!")
    logger.info("📁 Files created:")
    logger.info("  - backend/data/models/enhanced_calibration_factors.json")
    logger.info("  - backend/data/models/profile_strength_calibrations.json")
    logger.info("  - backend/data/models/elite_colleges_data.json")
    logger.info("  - backend/ml/models/enhanced_calibration.py")

if __name__ == "__main__":
    main()
