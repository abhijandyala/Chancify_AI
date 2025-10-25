#!/usr/bin/env python3
"""
Debug FastAPI validation issues
"""

import requests
import json

def test_fastapi_validation():
    """Test the FastAPI endpoint with verbose error handling"""
    
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
        print("Testing FastAPI validation...")
        print(f"URL: {url}")
        print(f"Data: {json.dumps(test_data, indent=2)}")
        
        response = requests.post(
            url, 
            json=test_data, 
            timeout=60
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Content-Type: {response.headers.get('content-type')}")
        print(f"Response Text ({len(response.text)} chars): {response.text[:1000]}")
        
        # Try to parse as JSON even if status is 500
        try:
            data = response.json()
            print(f"JSON Response: {json.dumps(data, indent=2)}")
        except:
            print("Could not parse response as JSON")
            
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_fastapi_validation()
