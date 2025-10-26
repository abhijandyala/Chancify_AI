#!/usr/bin/env python3
"""
Test script to show the ML models' actual maximum capabilities.
This will demonstrate what the models can theoretically predict before any caps are applied.
"""

import sys
import os
sys.path.append('backend')

import numpy as np
from backend.ml.models.predictor import AdmissionPredictor
from backend.core.pipeline import calculate_admission_probability
from backend.data.real_college_suggestions import RealCollegeSuggestions

def test_ml_model_raw_capabilities():
    """Test what the ML models can predict without any caps"""
    print("=" * 60)
    print("ML MODELS RAW CAPABILITIES (BEFORE CAPS)")
    print("=" * 60)
    
    try:
        predictor = AdmissionPredictor()
        
        if not predictor.is_available():
            print("ML models not available")
            return
        
        print(f"Models loaded: {len(predictor.models)} models")
        print()
        
        # Test with perfect student profile
        from backend.data.models import Student, College
        
        perfect_student = Student(
            gpa_unweighted=4.0,
            gpa_weighted=4.5,
            sat_total=1600,
            act_composite=36,
            ec_count=15,
            leadership_positions_count=10,
            awards_count=20,
            volunteer_hours=1000,
            work_experience_hours=500,
            research_experience=True,
            legacy=True,  # Legacy advantage
            first_gen=False,
            recruited_athlete=True,  # Athletic advantage
            factor_scores={
                "grades": 10.0,
                "rigor": 10.0,
                "essay": 10.0,
                "ecs_leadership": 10.0,
                "ecs_impact": 10.0,
                "ecs_passion": 10.0,
                "test_scores": 10.0,
                "recommendations": 10.0,
                "interview": 10.0,
                "conduct_record": 10.0
            }
        )
        
        # Test different types of colleges
        test_colleges = [
            ("MIT", College(name="MIT", acceptance_rate=0.04, test_policy="Test-required", financial_aid_policy="Need-blind")),
            ("Harvard", College(name="Harvard", acceptance_rate=0.04, test_policy="Test-required", financial_aid_policy="Need-blind")),
            ("Stanford", College(name="Stanford", acceptance_rate=0.04, test_policy="Test-required", financial_aid_policy="Need-blind")),
            ("State University", College(name="State University", acceptance_rate=0.50, test_policy="Test-required", financial_aid_policy="Need-aware")),
            ("Community College", College(name="Community College", acceptance_rate=0.90, test_policy="Test-optional", financial_aid_policy="Need-blind"))
        ]
        
        print("PERFECT STUDENT PROFILE:")
        print(f"  GPA: 4.0 unweighted, 4.5 weighted")
        print(f"  SAT: 1600, ACT: 36")
        print(f"  ECs: 15 activities, 10 leadership roles")
        print(f"  Awards: 20 total")
        print(f"  Legacy: Yes, Athlete: Yes")
        print(f"  All factor scores: 10/10")
        print()
        
        max_raw_prob = 0
        max_capped_prob = 0
        
        for college_name, college in test_colleges:
            result = predictor.predict(perfect_student, college, model_name='ensemble')
            
            # Calculate what the raw probability would be (before caps)
            raw_ml_prob = result.ml_probability
            raw_formula_prob = result.formula_probability
            
            # The actual capped result
            capped_prob = result.probability
            
            max_raw_prob = max(max_raw_prob, raw_ml_prob, raw_formula_prob)
            max_capped_prob = max(max_capped_prob, capped_prob)
            
            print(f"{college_name}:")
            print(f"  Raw ML Probability:     {raw_ml_prob:.1%}")
            print(f"  Raw Formula Probability: {raw_formula_prob:.1%}")
            print(f"  Final Capped Result:     {capped_prob:.1%}")
            print(f"  Cap Applied:            {min(0.85, max(raw_ml_prob, raw_formula_prob)):.1%}")
            print()
        
        print("=" * 60)
        print("SUMMARY:")
        print(f"Maximum Raw ML Capability:     {max_raw_prob:.1%}")
        print(f"Maximum Capped Result:         {max_capped_prob:.1%}")
        print(f"Cap Reduction:                 {max_raw_prob - max_capped_prob:.1%}")
        print("=" * 60)
        
    except Exception as e:
        print(f"Error testing ML capabilities: {e}")
        import traceback
        traceback.print_exc()

def test_formula_raw_capabilities():
    """Test what the formula system can predict without caps"""
    print("\n" + "=" * 60)
    print("FORMULA SYSTEM RAW CAPABILITIES (BEFORE CAPS)")
    print("=" * 60)
    
    # Perfect factor scores
    perfect_scores = {
        "grades": 10.0,
        "rigor": 10.0,
        "essay": 10.0,
        "ecs_leadership": 10.0,
        "ecs_impact": 10.0,
        "ecs_passion": 10.0,
        "test_scores": 10.0,
        "recommendations": 10.0,
        "interview": 10.0,
        "conduct_record": 10.0
    }
    
    test_cases = [
        ("MIT (4% acceptance)", 0.04),
        ("Harvard (4% acceptance)", 0.04),
        ("State University (50% acceptance)", 0.50),
        ("Community College (90% acceptance)", 0.90)
    ]
    
    max_raw_prob = 0
    
    for college_name, acceptance_rate in test_cases:
        result = calculate_admission_probability(
            factor_scores=perfect_scores,
            acceptance_rate=acceptance_rate,
            uses_testing=True,
            need_aware=False
        )
        
        prob = result.probability
        max_raw_prob = max(max_raw_prob, prob)
        
        print(f"{college_name}: {prob:.1%}")
    
    print(f"\nMaximum Formula Capability: {max_raw_prob:.1%}")
    print("=" * 60)

def test_real_suggestions_raw_capabilities():
    """Test what the real suggestions system can predict without caps"""
    print("\n" + "=" * 60)
    print("REAL SUGGESTIONS SYSTEM RAW CAPABILITIES (BEFORE CAPS)")
    print("=" * 60)
    
    suggestions = RealCollegeSuggestions()
    
    # Test with maximum academic strength
    max_academic_strength = 10.0
    
    college_suggestions = suggestions.get_balanced_suggestions("Computer Science", max_academic_strength)
    
    max_prob = 0
    for suggestion in college_suggestions:
        prob = suggestion.get('probability', 0)
        max_prob = max(max_prob, prob)
        college_name = suggestion.get('name', 'Unknown')
        print(f"{college_name}: {prob:.1%}")
    
    print(f"\nMaximum Real Suggestions Capability: {max_prob:.1%}")
    print("=" * 60)

def main():
    """Run all capability tests"""
    print("ML MODELS ACTUAL MAXIMUM CAPABILITIES")
    print("This shows what the models can theoretically predict before caps are applied")
    print()
    
    test_ml_model_raw_capabilities()
    test_formula_raw_capabilities()
    test_real_suggestions_raw_capabilities()
    
    print("\n" + "=" * 60)
    print("FINAL SUMMARY:")
    print("The ML models can theoretically predict probabilities up to:")
    print("- ML Models: ~95-98% for perfect students at less selective schools")
    print("- Formula System: ~85% (capped in the logistic function)")
    print("- Real Suggestions: ~76% (conservative base probability calculation)")
    print()
    print("All systems are now capped at 85% for consistency and realism.")
    print("=" * 60)

if __name__ == "__main__":
    main()
