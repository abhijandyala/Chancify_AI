#!/usr/bin/env python3
"""
Debug script to test the API and capture error messages
"""

import requests
import json

def test_api():
    """Test the API and capture any error messages"""
    
    # Test data
    test_data = {
        'gpa_unweighted': '3.8',
        'sat': '1450',
        'act': '33',
        'major': 'Computer Science',
        'extracurricular_depth': '8',
        'leadership_positions': '5',
        'awards_publications': '5',
        'passion_projects': '5',
        'business_ventures': '5',
        'volunteer_work': '5',
        'research_experience': '5',
        'portfolio_audition': '5',
        'essay_quality': '5',
        'recommendations': '5',
        'interview': '5',
        'demonstrated_interest': '5',
        'legacy_status': '5',
        'hs_reputation': '5',
        'geographic_diversity': '5',
        'plan_timing': '5',
        'geography_residency': '5',
        'firstgen_diversity': '5',
        'ability_to_pay': '5',
        'policy_knob': '5',
        'conduct_record': '9'
    }
    
    print("=== Testing API ===")
    print(f"Request data: {json.dumps(test_data, indent=2)}")
    print()
    
    try:
        response = requests.post('http://localhost:8000/api/suggest/colleges', json=test_data)
        print(f"Response status: {response.status_code}")
        print(f"Response headers: {dict(response.headers)}")
        print()
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response data: {json.dumps(data, indent=2)}")
            
            if 'suggestions' in data:
                print(f"Number of suggestions: {len(data['suggestions'])}")
                if data['suggestions']:
                    print("First 3 suggestions:")
                    for i, suggestion in enumerate(data['suggestions'][:3]):
                        print(f"  {i+1}. {suggestion['name']}: {suggestion['probability']*100:.1f}% ({suggestion['category']})")
                else:
                    print("No suggestions returned!")
            else:
                print("No 'suggestions' key in response!")
        else:
            print(f"Error response: {response.text}")
            
    except Exception as e:
        print(f"Exception occurred: {e}")
        print(f"Exception type: {type(e)}")

if __name__ == "__main__":
    test_api()
