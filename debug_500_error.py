#!/usr/bin/env python3
"""
Debug script to identify the 500 error in the suggestions endpoint
"""

import requests
import json
import traceback

def test_suggestions_endpoint():
    """Test the suggestions endpoint and capture any errors"""
    
    url = "http://localhost:8000/api/suggest/colleges"
    
    # Test data
    test_data = {
        "gpa_unweighted": "3.8",
        "gpa_weighted": "4.2", 
        "sat": "1450",
        "act": "33",
        "major": "Computer Science",
        "extracurricular_depth": "8",
        "leadership_positions": "8",
        "awards_publications": "8",
        "passion_projects": "8",
        "business_ventures": "5",
        "volunteer_work": "5",
        "research_experience": "5",
        "portfolio_audition": "5",
        "essay_quality": "5",
        "recommendations": "5",
        "interview": "5",
        "demonstrated_interest": "5",
        "legacy_status": "5",
        "hs_reputation": "5",
        "geographic_diversity": "5",
        "plan_timing": "5",
        "geography_residency": "5",
        "firstgen_diversity": "5",
        "ability_to_pay": "5",
        "policy_knob": "5",
        "conduct_record": "9"
    }
    
    try:
        print("Testing suggestions endpoint...")
        print(f"URL: {url}")
        print(f"Data: {json.dumps(test_data, indent=2)}")
        
        response = requests.post(url, json=test_data, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            print("SUCCESS!")
            print(f"Response: {json.dumps(data, indent=2)}")
        else:
            print("ERROR!")
            print(f"Response Text: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"Request Error: {e}")
        traceback.print_exc()
    except Exception as e:
        print(f"Unexpected Error: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    test_suggestions_endpoint()
