#!/usr/bin/env python3
"""
Debug the API response format
"""

import requests
import json

def debug_api_response():
    """Debug the API response format"""
    
    print("Debugging API Response Format")
    print("=" * 40)
    
    # Test data for Computer Science
    test_data = {
        "gpa_unweighted": "3.8",
        "gpa_weighted": "4.2",
        "sat": "1450",
        "act": "33",
        "major": "Computer Science",
        "extracurricular_depth": "8",
        "leadership_positions": "7",
        "awards_publications": "6",
        "passion_projects": "8",
        "business_ventures": "5",
        "volunteer_work": "7",
        "research_experience": "6",
        "portfolio_audition": "5",
        "essay_quality": "7",
        "recommendations": "8",
        "interview": "6",
        "demonstrated_interest": "7",
        "legacy_status": "5",
        "hs_reputation": "8",
        "geographic_diversity": "5",
        "plan_timing": "5",
        "geography_residency": "5",
        "firstgen_diversity": "5",
        "ability_to_pay": "5",
        "policy_knob": "5",
        "conduct_record": "9"
    }
    
    try:
        response = requests.post("http://localhost:8000/api/suggest/colleges", json=test_data)
        
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            try:
                suggestions = response.json()
                print(f"Response Type: {type(suggestions)}")
                print(f"Response Length: {len(suggestions) if isinstance(suggestions, (list, dict)) else 'N/A'}")
                
                if isinstance(suggestions, list):
                    print(f"First suggestion type: {type(suggestions[0])}")
                    print(f"First suggestion: {suggestions[0]}")
                elif isinstance(suggestions, dict):
                    print(f"Response keys: {list(suggestions.keys())}")
                    print(f"Response: {suggestions}")
                else:
                    print(f"Response: {suggestions}")
                    
            except json.JSONDecodeError as e:
                print(f"JSON Decode Error: {e}")
                print(f"Raw Response: {response.text}")
        else:
            print(f"Error Response: {response.text}")
    
    except Exception as e:
        print(f"Request Error: {e}")

if __name__ == "__main__":
    debug_api_response()
