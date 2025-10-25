#!/usr/bin/env python3
"""
Test the probability calculation to understand why probabilities are so low
"""

import sys
sys.path.append('.')

from backend.core.probability import calculate_probability, default_calibration, logistic_prob

def test_probability_calculation():
    """Test probability calculation with different composite scores"""
    
    print("Testing Probability Calculation")
    print("=" * 50)
    
    # Test with different acceptance rates
    acceptance_rates = [0.10, 0.20, 0.30, 0.50, 0.70]
    
    for rate in acceptance_rates:
        print(f"\nAcceptance Rate: {rate:.1%}")
        print("-" * 30)
        
        calibration = default_calibration(rate)
        print(f"Calibration: A={calibration.A:.6f}, C={calibration.C:.1f}")
        
        # Test different composite scores
        scores = [400, 500, 600, 700, 800, 900]
        
        for score in scores:
            prob = logistic_prob(score, calibration.A, calibration.C)
            print(f"  Score {score}: {prob:.1%}")
    
    print("\n" + "=" * 50)
    print("Testing with actual student data")
    print("=" * 50)
    
    # Test with a strong student profile
    strong_student_score = 800  # High composite score
    college_acceptance_rate = 0.10  # 10% acceptance rate (selective)
    
    calibration = default_calibration(college_acceptance_rate)
    probability = logistic_prob(strong_student_score, calibration.A, calibration.C)
    
    print(f"Strong student (score {strong_student_score}) at selective college ({college_acceptance_rate:.1%} acceptance):")
    print(f"  Probability: {probability:.1%}")
    print(f"  Calibration: A={calibration.A:.6f}, C={calibration.C:.1f}")
    
    # Test with elite college
    elite_acceptance_rate = 0.05  # 5% acceptance rate (elite)
    elite_calibration = default_calibration(elite_acceptance_rate)
    elite_probability = logistic_prob(strong_student_score, elite_calibration.A, elite_calibration.C)
    
    print(f"\nStrong student (score {strong_student_score}) at elite college ({elite_acceptance_rate:.1%} acceptance):")
    print(f"  Probability: {elite_probability:.1%}")
    print(f"  Calibration: A={elite_calibration.A:.6f}, C={elite_calibration.C:.1f}")

if __name__ == "__main__":
    test_probability_calculation()
