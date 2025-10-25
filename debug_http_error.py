#!/usr/bin/env python3
"""
Debug HTTP error with detailed logging
"""

import requests
import json
import traceback

def test_http_endpoint():
    """Test the HTTP endpoint with detailed error handling"""
    
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
        print("Testing HTTP endpoint...")
        print(f"URL: {url}")
        print(f"Data: {json.dumps(test_data, indent=2)}")
        
        # Test with different timeout and error handling
        response = requests.post(
            url, 
            json=test_data, 
            timeout=60,
            headers={'Content-Type': 'application/json'}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        print(f"Response Text: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            print("SUCCESS!")
            print(f"Number of suggestions: {len(data.get('suggestions', []))}")
            if data.get('suggestions'):
                first_suggestion = data['suggestions'][0]
                print(f"First suggestion: {first_suggestion.get('name')}")
                print(f"Major fit score: {first_suggestion.get('major_fit_score')}")
                print(f"Major match: {first_suggestion.get('major_match')}")
        else:
            print("ERROR!")
            print(f"Response Text: {response.text}")
            
    except requests.exceptions.Timeout as e:
        print(f"Timeout Error: {e}")
    except requests.exceptions.ConnectionError as e:
        print(f"Connection Error: {e}")
    except requests.exceptions.RequestException as e:
        print(f"Request Error: {e}")
        traceback.print_exc()
    except Exception as e:
        print(f"Unexpected Error: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    test_http_endpoint()
