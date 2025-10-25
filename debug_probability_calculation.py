#!/usr/bin/env python3
"""
Debug script to test the new probability calculation logic
"""

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

def safe_float(value):
    """Safely convert string to float with fallback"""
    try:
        return float(value)
    except (ValueError, TypeError):
        return 0.0

def test_probability_calculation():
    """Test the new probability calculation logic"""
    
    # Test data
    gpa_unweighted = 3.8
    sat_score = 1450
    act_score = 33
    extracurricular_depth = 8
    leadership_positions = 5
    awards_publications = 5
    passion_projects = 5
    acceptance_rate = 0.1  # 10% acceptance rate
    
    print("=== Testing New Probability Calculation ===")
    print(f"GPA: {gpa_unweighted}")
    print(f"SAT: {sat_score}")
    print(f"ACT: {act_score}")
    print(f"EC Depth: {extracurricular_depth}")
    print(f"Acceptance Rate: {acceptance_rate}")
    print()
    
    # Calculate base probability from academic strength
    gpa_score = min(10.0, (gpa_unweighted / 4.0) * 10.0) if gpa_unweighted > 0 else 5.0
    sat_score_calc = min(10.0, max(0.0, ((sat_score - 1200) / 400) * 5.0 + 5.0)) if sat_score > 0 else 5.0
    act_score_calc = min(10.0, max(0.0, ((act_score - 20) / 16) * 5.0 + 5.0)) if act_score > 0 else 5.0
    
    # Use the higher of SAT or ACT
    test_score = max(sat_score_calc, act_score_calc)
    
    # Calculate academic strength (0-10 scale)
    academic_strength = (gpa_score + test_score) / 2.0
    
    # Calculate extracurricular strength from dropdown values
    ec_strength = (
        safe_float(extracurricular_depth) +
        safe_float(leadership_positions) +
        safe_float(awards_publications) +
        safe_float(passion_projects)
    ) / 4.0
    
    # Calculate overall student strength (0-10 scale)
    student_strength = (academic_strength * 0.7) + (ec_strength * 0.3)
    
    # Calculate college selectivity (0-10 scale, higher = more selective)
    college_selectivity = 10.0 - (acceptance_rate * 10.0)  # 10% acceptance = 9.0 selectivity
    
    print(f"GPA Score: {gpa_score:.2f}")
    print(f"SAT Score: {sat_score_calc:.2f}")
    print(f"ACT Score: {act_score_calc:.2f}")
    print(f"Test Score (max): {test_score:.2f}")
    print(f"Academic Strength: {academic_strength:.2f}")
    print(f"EC Strength: {ec_strength:.2f}")
    print(f"Student Strength: {student_strength:.2f}")
    print(f"College Selectivity: {college_selectivity:.2f}")
    print()
    
    # Calculate probability using realistic formula
    if student_strength >= 8.0 and college_selectivity <= 3.0:
        # Strong student at less selective college = 75-95% chance
        base_prob = 0.75 + (student_strength - 8.0) * 0.1
        print("Category: Strong student at less selective college")
    elif student_strength >= 6.0 and college_selectivity <= 6.0:
        # Good student at moderately selective college = 25-75% chance
        base_prob = 0.25 + (student_strength - 6.0) * 0.25
        print("Category: Good student at moderately selective college")
    elif student_strength >= 4.0:
        # Average student = 10-25% chance
        base_prob = 0.10 + (student_strength - 4.0) * 0.075
        print("Category: Average student")
    else:
        # Weak student = 2-10% chance
        base_prob = 0.02 + student_strength * 0.02
        print("Category: Weak student")
    
    # Apply college selectivity adjustment
    selectivity_factor = 1.0 - (college_selectivity * 0.05)  # Reduce by 5% per selectivity point
    adjusted_probability = base_prob * selectivity_factor
    
    # Ensure realistic bounds
    adjusted_probability = max(0.01, min(0.95, adjusted_probability))
    
    print(f"Base Probability: {base_prob:.3f}")
    print(f"Selectivity Factor: {selectivity_factor:.3f}")
    print(f"Final Probability: {adjusted_probability:.3f} ({adjusted_probability*100:.1f}%)")
    print()
    
    # Test with different acceptance rates
    print("=== Testing Different Acceptance Rates ===")
    test_rates = [0.8, 0.5, 0.2, 0.1, 0.05, 0.03]
    for rate in test_rates:
        selectivity = 10.0 - (rate * 10.0)
        factor = 1.0 - (selectivity * 0.05)
        prob = base_prob * factor
        prob = max(0.01, min(0.95, prob))
        print(f"Acceptance Rate {rate*100:4.1f}% -> Selectivity {selectivity:.1f} -> Probability {prob*100:5.1f}%")

if __name__ == "__main__":
    test_probability_calculation()
