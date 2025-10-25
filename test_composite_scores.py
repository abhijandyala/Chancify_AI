#!/usr/bin/env python3
"""
Test the composite score calculation to see what scores are being generated
"""

import sys
sys.path.append('.')

from backend.ml.preprocessing.feature_extractor import StudentFeatures, CollegeFeatures

def test_composite_scores():
    """Test what composite scores are being generated"""
    
    print("Testing Composite Score Generation")
    print("=" * 50)
    
    # Test with a strong student profile (like the one from the API test)
    student = StudentFeatures(
        gpa_unweighted=3.8,
        gpa_weighted=4.2,
        sat_total=1450,
        act_composite=33,
        factor_scores={
            'grades': 8.0,
            'rigor': 7.0,
            'essay': 7.0,
            'ecs_leadership': 8.0,
            'ecs_depth': 8.0,
            'awards': 7.0,
            'passion_projects': 7.0,
            'business_ventures': 7.0,
            'volunteer_work': 7.0,
            'research_experience': 7.0,
            'portfolio_audition': 7.0,
            'recommendations': 7.0,
            'interview': 7.0,
            'demonstrated_interest': 7.0,
            'legacy_status': 7.0,
            'hs_reputation': 7.0,
            'geographic_diversity': 7.0,
            'plan_timing': 7.0,
            'geography_residency': 7.0,
            'firstgen_diversity': 7.0,
            'ability_to_pay': 7.0,
            'policy_knob': 7.0,
            'conduct_record': 9.0
        }
    )
    
    # Test with a typical college
    college = CollegeFeatures(
        name="University of Southern California",
        acceptance_rate=0.10,  # 10% acceptance rate
        test_policy="Test-optional",
        financial_aid_policy="Need-blind",
        selectivity_tier="Highly Selective",
        gpa_average=3.7
    )
    
    print(f"Student Profile:")
    print(f"  GPA: {student.gpa_unweighted}/{student.gpa_weighted}")
    print(f"  SAT: {student.sat_total}")
    print(f"  ACT: {student.act_composite}")
    print(f"  Factor scores: {len(student.factor_scores)} factors")
    
    print(f"\nCollege Profile:")
    print(f"  Name: {college.name}")
    print(f"  Acceptance Rate: {college.acceptance_rate:.1%}")
    print(f"  Selectivity: {college.selectivity_tier}")
    
    # Calculate composite score using the core system
    from backend.core.scoring import compute_composite, CollegePolicy
    from backend.core.probability import calculate_probability
    
    policy = CollegePolicy(
        uses_testing=(college.test_policy != 'Test-blind'),
        need_aware=(college.financial_aid_policy == 'Need-aware')
    )
    
    scoring_result = compute_composite(student.factor_scores, policy)
    print(f"\nScoring Result:")
    print(f"  Composite Score: {scoring_result.composite:.1f}")
    print(f"  Used Factors: {len(scoring_result.used_factors)}")
    
    # Calculate probability
    prob_result = calculate_probability(
        composite_score=scoring_result.composite,
        acceptance_rate=college.acceptance_rate
    )
    
    print(f"\nProbability Result:")
    print(f"  Probability: {prob_result.probability:.1%}")
    print(f"  Calibration: A={prob_result.calibration.A:.6f}, C={prob_result.calibration.C:.1f}")
    
    # Test with different factor score levels
    print(f"\n" + "=" * 50)
    print("Testing Different Factor Score Levels")
    print("=" * 50)
    
    for level in [5, 7, 9, 10]:
        test_scores = {k: float(level) for k in student.factor_scores.keys()}
        test_result = compute_composite(test_scores, policy)
        test_prob = calculate_probability(test_result.composite, college.acceptance_rate)
        
        print(f"All factors at {level}: Score {test_result.composite:.1f} → {test_prob.probability:.1%}")

if __name__ == "__main__":
    test_composite_scores()
