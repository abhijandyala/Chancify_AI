"""
Final debug to find why suggestions are still empty
"""

import requests
import json

# Test with Computer Science (which we know has colleges)
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
        print(f"Suggestions count: {len(data.get('suggestions', []))}")
        print(f"Academic score: {data.get('academic_score', 'N/A')}")
        print(f"Target tiers: {data.get('target_tiers', 'N/A')}")
        
        if data.get('suggestions'):
            print("Sample suggestions:")
            for i, suggestion in enumerate(data['suggestions'][:3]):
                print(f"  {i+1}. {suggestion.get('name', 'Unknown')} - {suggestion.get('probability', 0):.1%}")
        else:
            print("No suggestions returned - this indicates an issue in the backend logic")
    
except Exception as e:
    print(f"Exception: {e}")

# Also test the search endpoint to make sure it's working
print("\n=== TESTING SEARCH ENDPOINT ===")
try:
    search_response = requests.get(
        "http://localhost:8000/api/search/colleges?q=Harvard",
        timeout=10
    )
    
    if search_response.status_code == 200:
        search_results = search_response.json()
        print(f"Search results: {len(search_results)}")
        if search_results:
            print(f"First result: {search_results[0].get('name', 'Unknown')}")
    else:
        print(f"Search failed: {search_response.status_code}")
        
except Exception as e:
    print(f"Search exception: {e}")

print("\n=== DIAGNOSIS ===")
print("If search works but suggestions don't, the issue is in the suggestions endpoint logic.")
print("The major mapping is working, so the issue is likely in:")
print("1. ML model prediction")
print("2. College filtering logic")
print("3. Probability calculation")
print("4. Categorization logic")
