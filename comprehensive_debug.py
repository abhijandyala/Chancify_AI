"""
Comprehensive debug to find why suggestions are empty
"""

import pandas as pd
from backend.data.improved_major_mapping import get_colleges_for_major, get_major_strength_score
from backend.ml.models.predictor import AdmissionPredictor
from backend.core.scoring import calculate_academic_score

# Load the data
df = pd.read_csv('backend/data/raw/real_colleges_integrated.csv')
print(f"Total colleges in dataset: {len(df)}")

# Test the predictor
try:
    predictor = AdmissionPredictor()
    print("✅ Predictor loaded successfully")
except Exception as e:
    print(f"❌ Predictor failed to load: {e}")
    exit(1)

# Test academic score calculation
test_profile = {
    'gpa_unweighted': '3.8',
    'gpa_weighted': '4.2',
    'sat': '1400',
    'act': '32',
    'extracurricular_depth': '8',
    'leadership_positions': '8',
    'awards_publications': '8',
    'passion_projects': '8',
    'business_ventures': '8',
    'volunteer_work': '8',
    'research_experience': '8',
    'portfolio_audition': '8',
    'essay_quality': '8',
    'recommendations': '8',
    'interview': '8',
    'demonstrated_interest': '8',
    'legacy_status': '8',
    'hs_reputation': '8',
    'geographic_diversity': '8',
    'plan_timing': '8',
    'geography_residency': '8',
    'firstgen_diversity': '8',
    'ability_to_pay': '8',
    'policy_knob': '8',
    'conduct_record': '8'
}

try:
    academic_score = calculate_academic_score(test_profile)
    print(f"✅ Academic score calculated: {academic_score}")
except Exception as e:
    print(f"❌ Academic score calculation failed: {e}")

# Test major mapping
major = 'Engineering'
print(f"\n=== TESTING MAJOR: {major} ===")
cs_elite = get_colleges_for_major(major, 'elite')
cs_highly = get_colleges_for_major(major, 'highly_selective')
cs_selective = get_colleges_for_major(major, 'selective')
cs_moderate = get_colleges_for_major(major, 'moderately_selective')

print(f"Elite {major} colleges: {len(cs_elite)}")
print(f"Highly Selective {major} colleges: {len(cs_highly)}")
print(f"Selective {major} colleges: {len(cs_selective)}")
print(f"Moderately Selective {major} colleges: {len(cs_moderate)}")

# Test a few college predictions
print(f"\n=== TESTING COLLEGE PREDICTIONS ===")
test_colleges = df.head(5)
for _, row in test_colleges.iterrows():
    college_name = row['name']
    print(f"\nTesting: {college_name}")
    print(f"  Selectivity: {row['selectivity_tier']}")
    print(f"  Acceptance Rate: {row['acceptance_rate']:.1%}")
    
    # Test major strength
    strength = get_major_strength_score(college_name, major)
    print(f"  {major} strength: {strength:.2f}")
    
    # Test prediction
    try:
        from backend.core.scoring import StudentProfile, CollegeFeatures
        
        student = StudentProfile(
            gpa_unweighted=3.8,
            gpa_weighted=4.2,
            sat=1400,
            act=32,
            extracurricular_depth=8,
            leadership_positions=8,
            awards_publications=8,
            passion_projects=8,
            business_ventures=8,
            volunteer_work=8,
            research_experience=8,
            portfolio_audition=8,
            essay_quality=8,
            recommendations=8,
            interview=8,
            demonstrated_interest=8,
            legacy_status=8,
            hs_reputation=8,
            geographic_diversity=8,
            plan_timing=8,
            geography_residency=8,
            firstgen_diversity=8,
            ability_to_pay=8,
            policy_knob=8,
            conduct_record=8
        )
        
        college = CollegeFeatures(
            name=college_name,
            acceptance_rate=row['acceptance_rate'],
            selectivity_tier=row['selectivity_tier'],
            tuition_in_state=row.get('tuition_in_state_usd', 50000),
            tuition_out_of_state=row.get('tuition_out_of_state_usd', 50000),
            city=row.get('city', 'Unknown'),
            state=row.get('state', 'Unknown')
        )
        
        result = predictor.predict(student, college, model_name='ensemble', use_formula=True)
        print(f"  Prediction: {result.probability:.1%}")
        
    except Exception as e:
        print(f"  ❌ Prediction failed: {e}")

print("\n=== SUMMARY ===")
print("If you see predictions above, the system is working.")
print("The issue might be in the filtering logic in the suggestions endpoint.")
