#!/usr/bin/env python3
"""
Test with the exact same data that the frontend would read from localStorage
"""

import requests
import json

def test_frontend_data():
    """Test with data that matches what frontend reads from localStorage"""
    
    # This is what the frontend would read from localStorage
    # The frontend uses default values of '5' for most fields if not set
    test_data = {
        "gpa_unweighted": "4.0",
        "gpa_weighted": "4.5", 
        "sat": "1600",
        "act": "36",
        "major": "Computer Science",
        "extracurricular_depth": "5",  # Default value from frontend
        "leadership_positions": "5",   # Default value from frontend
        "awards_publications": "5",    # Default value from frontend
        "passion_projects": "5",       # Default value from frontend
        "business_ventures": "5",      # Default value from frontend
        "volunteer_work": "5",         # Default value from frontend
        "research_experience": "5",    # Default value from frontend
        "portfolio_audition": "5",     # Default value from frontend
        "essay_quality": "5",          # Default value from frontend
        "recommendations": "5",        # Default value from frontend
        "interview": "5",              # Default value from frontend
        "demonstrated_interest": "5",  # Default value from frontend
        "legacy_status": "5",          # Default value from frontend
        "hs_reputation": "5",          # Default value from frontend
        "geographic_diversity": "5",   # Default value from frontend
        "plan_timing": "5",            # Default value from frontend
        "geography_residency": "5",    # Default value from frontend
        "firstgen_diversity": "5",     # Default value from frontend
        "ability_to_pay": "5",         # Default value from frontend
        "policy_knob": "5",            # Default value from frontend
        "conduct_record": "5"          # Default value from frontend
    }
    
    print("TESTING WITH FRONTEND DEFAULT VALUES (5s)")
    print("=" * 50)
    
    try:
        response = requests.post(
            "http://localhost:8000/api/suggest/colleges",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=60
        )
        
        if response.status_code == 200:
            data = response.json()
            suggestions = data.get('suggestions', [])
            
            print(f"Got {len(suggestions)} suggestions")
            print()
            
            # Analyze each suggestion
            for i, suggestion in enumerate(suggestions, 1):
                name = suggestion.get('name', 'Unknown')
                prob = suggestion.get('probability', 0)
                category = suggestion.get('category', 'Unknown')
                majors = suggestion.get('popularMajors', [])
                
                print(f"{i}. {name}")
                print(f"   Category: {category}")
                print(f"   Probability: {prob:.1%}")
                print(f"   Popular Majors: {majors}")
                
                # Check if Computer Science is in popular majors
                cs_related = any('Computer' in major or 'Engineering' in major or 'Technology' in major for major in majors)
                if cs_related:
                    print(f"   CS Related: YES")
                else:
                    print(f"   CS Related: NO - PROBLEM!")
                
                print()
            
            # Check for Iowa State specifically
            iowa_state = [s for s in suggestions if 'Iowa State' in s.get('name', '')]
            if iowa_state:
                iowa = iowa_state[0]
                print(f"IOWA STATE FOUND: {iowa.get('probability', 0):.1%} ({iowa.get('category', 'Unknown')})")
            else:
                print(f"Iowa State: NOT FOUND")
            
            # Check for Carnegie Mellon duplicates
            cmu_count = len([s for s in suggestions if 'Carnegie Mellon' in s.get('name', '')])
            print(f"Carnegie Mellon count: {cmu_count}")
            
            return True
            
        else:
            print(f"Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"Exception: {e}")
        return False

if __name__ == "__main__":
    test_frontend_data()
