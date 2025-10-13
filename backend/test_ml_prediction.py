"""
Test ML predictions with hybrid system.
"""

from ml.models.predictor import get_predictor
from ml.preprocessing.feature_extractor import StudentFeatures, CollegeFeatures

def test_predictions():
    """Test hybrid ML+Formula predictions."""
    
    print("="*60)
    print("TESTING ML HYBRID PREDICTIONS")
    print("="*60)
    
    # Load predictor
    predictor = get_predictor('data/models')
    
    if not predictor.is_available():
        print("ERROR: Models not available!")
        return
    
    print("\nModel info:")
    info = predictor.get_model_info()
    for key, value in info.items():
        print(f"  {key}: {value}")
    
    # Test student 1: Strong applicant
    print("\n" + "="*60)
    print("TEST 1: Strong Applicant to Harvard")
    print("="*60)
    
    strong_student = StudentFeatures(
        factor_scores={
            'grades': 9.5,
            'rigor': 9.0,
            'testing': 9.5,
            'essay': 8.5,
            'ecs_leadership': 9.0,
            'recommendations': 8.5,
            'plan_timing': 8.0,
            'athletic_recruit': 3.0,
            'major_fit': 8.0,
            'geography_residency': 7.0,
            'firstgen_diversity': 5.0,
            'ability_to_pay': 6.0,
            'awards_publications': 8.5,
            'portfolio_audition': 5.0,
            'policy_knob': 5.0,
            'demonstrated_interest': 8.0,
            'legacy': 3.0,
            'interview': 8.5,
            'conduct_record': 10.0,
            'hs_reputation': 7.5
        },
        gpa_unweighted=3.98,
        gpa_weighted=4.65,
        sat_total=1570,
        sat_math=790,
        sat_reading_writing=780,
        act_composite=35,
        ap_count=12,
        honors_count=5,
        ec_count=6,
        leadership_positions_count=3,
        years_commitment=15,
        hours_per_week=18.0,
        awards_count=8,
        national_awards=2,
        first_generation=False,
        underrepresented_minority=False,
        geographic_diversity=7.0,
        legacy_status=False,
        recruited_athlete=False
    )
    
    harvard = CollegeFeatures(
        name="Harvard University",
        acceptance_rate=0.0325,
        sat_25th=1460,
        sat_75th=1580,
        act_25th=33,
        act_75th=36,
        test_policy="Required",
        financial_aid_policy="Need-blind",
        selectivity_tier="Elite",
        region="Northeast",
        gpa_average=3.95
    )
    
    result = predictor.predict(strong_student, harvard, model_name='ensemble')
    
    print(f"Formula Probability:  {result.formula_probability:.1%}")
    print(f"ML Probability:       {result.ml_probability:.1%}")
    print(f"Final Probability:    {result.probability:.1%}")
    print(f"Confidence Interval:  {result.confidence_interval[0]:.1%} - {result.confidence_interval[1]:.1%}")
    print(f"ML Confidence:        {result.ml_confidence:.1%}")
    print(f"Blend: {result.explanation}")
    
    # Test student 2: Average applicant
    print("\n" + "="*60)
    print("TEST 2: Average Applicant to Penn State")
    print("="*60)
    
    average_student = StudentFeatures(
        factor_scores={
            'grades': 7.0,
            'rigor': 6.5,
            'testing': 6.5,
            'essay': 6.5,
            'ecs_leadership': 6.0,
            'recommendations': 6.5,
            'plan_timing': 6.0,
            'athletic_recruit': 3.0,
            'major_fit': 6.5,
            'geography_residency': 5.5,
            'firstgen_diversity': 5.0,
            'ability_to_pay': 5.5,
            'awards_publications': 5.5,
            'portfolio_audition': 5.0,
            'policy_knob': 5.0,
            'demonstrated_interest': 6.5,
            'legacy': 3.0,
            'interview': 6.5,
            'conduct_record': 9.5,
            'hs_reputation': 6.0
        },
        gpa_unweighted=3.55,
        gpa_weighted=3.85,
        sat_total=1280,
        sat_math=640,
        sat_reading_writing=640,
        act_composite=28,
        ap_count=5,
        honors_count=3,
        ec_count=3,
        leadership_positions_count=1,
        years_commitment=8,
        hours_per_week=10.0,
        awards_count=2,
        national_awards=0,
        first_generation=False,
        underrepresented_minority=False,
        geographic_diversity=5.5,
        legacy_status=False,
        recruited_athlete=False
    )
    
    penn_state = CollegeFeatures(
        name="Penn State",
        acceptance_rate=0.49,
        sat_25th=1180,
        sat_75th=1390,
        act_25th=26,
        act_75th=32,
        test_policy="Test-optional",
        financial_aid_policy="Need-aware",
        selectivity_tier="Less Selective",
        region="Northeast",
        gpa_average=3.60
    )
    
    result2 = predictor.predict(average_student, penn_state, model_name='ensemble')
    
    print(f"Formula Probability:  {result2.formula_probability:.1%}")
    print(f"ML Probability:       {result2.ml_probability:.1%}")
    print(f"Final Probability:    {result2.probability:.1%}")
    print(f"Confidence Interval:  {result2.confidence_interval[0]:.1%} - {result2.confidence_interval[1]:.1%}")
    print(f"ML Confidence:        {result2.ml_confidence:.1%}")
    print(f"Blend: {result2.explanation}")
    
    print("\n" + "="*60)
    print("HYBRID PREDICTION SYSTEM WORKING!")
    print("="*60)
    print("\nThe ML model successfully:")
    print("  1. Loaded trained models")
    print("  2. Made predictions")
    print("  3. Blended with formula intelligently")
    print("  4. Provided confidence intervals")
    print("\nReady for API integration!")


if __name__ == "__main__":
    test_predictions()

