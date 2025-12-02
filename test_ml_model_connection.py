"""Test ML model connection and loading"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from pathlib import Path

def test_model_loading():
    print("=" * 70)
    print("TESTING ML MODEL CONNECTION")
    print("=" * 70)
    print()
    
    # Test 1: Check if model directory exists
    print("1. Checking model directory...")
    model_dir = Path("backend/data/models")
    print(f"   Model directory: {model_dir}")
    print(f"   Exists: {model_dir.exists()}")
    print(f"   Absolute path: {model_dir.resolve()}")
    
    if model_dir.exists():
        print(f"   Contents:")
        for file in sorted(model_dir.iterdir()):
            size = file.stat().st_size / 1024  # KB
            print(f"     - {file.name} ({size:.1f} KB)")
    else:
        print("   ❌ Model directory NOT FOUND!")
        return False
    
    print()
    
    # Test 2: Check for essential model files
    print("2. Checking essential model files...")
    essential_files = [
        'ensemble.joblib',
        'scaler.joblib',
        'feature_selector.joblib',
        'metadata.json'
    ]
    
    all_found = True
    for filename in essential_files:
        filepath = model_dir / filename
        exists = filepath.exists()
        status = "✅" if exists else "❌"
        print(f"   {status} {filename}: {'Found' if exists else 'MISSING'}")
        if not exists:
            all_found = False
    
    print()
    
    # Test 3: Try to load predictor
    print("3. Testing predictor initialization...")
    try:
        from ml.models.predictor import get_predictor
        predictor = get_predictor()
        print(f"   ✅ Predictor initialized")
        print(f"   Models loaded: {len(predictor.models)}")
        print(f"   Available models: {list(predictor.models.keys())}")
        print(f"   Scaler available: {predictor.scaler is not None}")
        print(f"   Feature selector available: {predictor.feature_selector is not None}")
        print(f"   ML available: {predictor.is_available()}")
        
        if not predictor.is_available():
            print("   ⚠️  WARNING: ML models are NOT available!")
            print("   This means fallbacks will be used!")
            return False
        
    except Exception as e:
        print(f"   ❌ ERROR loading predictor: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    print()
    
    # Test 4: Test a prediction
    print("4. Testing a sample prediction...")
    try:
        from ml.preprocessing.feature_extractor import StudentFeatures, CollegeFeatures
        
        student = StudentFeatures(
            gpa_unweighted=3.8,
            gpa_weighted=4.2,
            sat_total=1500,
            act_composite=34,
            factor_scores={
                'grades': 9.5,
                'rigor': 8.0,
                'testing': 8.5,
                'essay': 7.5,
                'ecs_leadership': 8.0,
                'recommendations': 8.0,
                'plan_timing': 7.0,
                'major_fit': 8.0,
                'geography_residency': 7.0,
                'firstgen_diversity': 6.0,
                'ability_to_pay': 8.0,
                'awards_publications': 7.0,
                'portfolio_audition': 6.0,
                'policy_knob': 7.0,
                'demonstrated_interest': 7.0,
                'legacy': 0.0,
                'interview': 7.0,
                'conduct_record': 10.0,
                'hs_reputation': 8.0
            }
        )
        
        college = CollegeFeatures(
            name="MIT",
            acceptance_rate=0.07,
            sat_25th=1500,
            sat_75th=1570,
            act_25th=34,
            act_75th=36,
            test_policy="Test-required",
            financial_aid_policy="Need-blind",
            selectivity_tier="Elite",
            gpa_average=4.17
        )
        
        result = predictor.predict(student, college, model_name='ensemble')
        print(f"   ✅ Prediction successful!")
        print(f"   Probability: {result.probability:.1%}")
        print(f"   ML Probability: {result.ml_probability:.1%}")
        print(f"   Formula Probability: {result.formula_probability:.1%}")
        print(f"   Model Used: {result.model_used}")
        print(f"   Blend Weights: {result.blend_weights}")
        
        if result.model_used == 'formula_only':
            print("   ⚠️  WARNING: Using formula-only (ML not working!)")
            return False
        else:
            print("   ✅ ML model is working!")
            return True
        
    except Exception as e:
        print(f"   ❌ ERROR making prediction: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_model_loading()
    print()
    print("=" * 70)
    if success:
        print("✅ ALL TESTS PASSED - ML models are working!")
    else:
        print("❌ TESTS FAILED - ML models are NOT working!")
        print("   Check the errors above to fix the issues.")
    print("=" * 70)
    sys.exit(0 if success else 1)

