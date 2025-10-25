import requests
import json

# Test the API directly
test_data = {
    "gpa_unweighted": "3.8",
    "gpa_weighted": "4.2", 
    "sat": "1400",
    "act": "32",
    "major": "Computer Science",
    "extracurricular_depth": "8",
    "leadership_positions": "8",
    "awards_publications": "8",
    "passion_projects": "8",
    "business_ventures": "8",
    "volunteer_work": "8",
    "research_experience": "8",
    "portfolio_audition": "8",
    "essay_quality": "8",
    "recommendations": "8",
    "interview": "8",
    "demonstrated_interest": "8",
    "legacy_status": "8",
    "hs_reputation": "8",
    "geographic_diversity": "8",
    "plan_timing": "8",
    "geography_residency": "8",
    "firstgen_diversity": "8",
    "ability_to_pay": "8",
    "policy_knob": "8",
    "conduct_record": "8"
}

try:
    response = requests.post(
        "http://localhost:8000/api/suggest/colleges",
        json=test_data,
        timeout=30
    )
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"Success: {data.get('success', False)}")
        print(f"Error: {data.get('error', 'None')}")
        print(f"Message: {data.get('message', 'None')}")
    
except Exception as e:
    print(f"Exception: {e}")
