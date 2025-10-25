#!/usr/bin/env python3
"""
Test request validation to see if there's an issue with the Pydantic model
"""

import json
from backend.main import CollegeSuggestionsRequest

def test_request_validation():
    """Test if the request validation is working correctly"""
    
    print("Testing request validation...")
    
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
        print("Creating CollegeSuggestionsRequest...")
        request = CollegeSuggestionsRequest(**test_data)
        print("SUCCESS! Request validation passed")
        print(f"Request: {request}")
        
        # Test JSON serialization
        print("Testing JSON serialization...")
        json_data = request.model_dump()
        print(f"JSON data: {json.dumps(json_data, indent=2)}")
        
        # Test JSON deserialization
        print("Testing JSON deserialization...")
        request2 = CollegeSuggestionsRequest(**json_data)
        print("SUCCESS! JSON round-trip works")
        
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_request_validation()
