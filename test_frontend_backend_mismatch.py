#!/usr/bin/env python3
"""
Test to identify frontend-backend mismatch
"""

import requests
import json

def test_frontend_backend_mismatch():
    """Test if frontend and backend are getting different results"""
    
    # Test with the exact same data that the frontend would send
    test_data = {
        "gpa_unweighted": "4.0",
        "gpa_weighted": "4.5", 
        "sat": "1600",
        "act": "36",
        "major": "Computer Science",
        "extracurricular_depth": "10",
        "leadership_positions": "10",
        "awards_publications": "10",
        "passion_projects": "10",
        "business_ventures": "10",
        "volunteer_work": "10",
        "research_experience": "10",
        "portfolio_audition": "10",
        "essay_quality": "10",
        "recommendations": "10",
        "interview": "10",
        "demonstrated_interest": "10",
        "legacy_status": "10",
        "hs_reputation": "10",
        "geographic_diversity": "10",
        "plan_timing": "10",
        "geography_residency": "10",
        "firstgen_diversity": "10",
        "ability_to_pay": "10",
        "policy_knob": "10",
        "conduct_record": "10"
    }
    
    print("TESTING FRONTEND-BACKEND MISMATCH")
    print("=" * 50)
    
    try:
        # Make multiple requests to see if results are consistent
        for i in range(3):
            print(f"\nREQUEST {i+1}:")
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
                
                # Show first few suggestions
                for j, suggestion in enumerate(suggestions[:3], 1):
                    name = suggestion.get('name', 'Unknown')
                    prob = suggestion.get('probability', 0)
                    category = suggestion.get('category', 'Unknown')
                    majors = suggestion.get('popularMajors', [])
                    
                    print(f"  {j}. {name}: {prob:.1%} ({category}) - {majors[:2]}")
                
                # Check for Iowa State specifically
                iowa_state = [s for s in suggestions if 'Iowa State' in s.get('name', '')]
                if iowa_state:
                    iowa = iowa_state[0]
                    print(f"  Iowa State: {iowa.get('probability', 0):.1%} ({iowa.get('category', 'Unknown')})")
                else:
                    print(f"  Iowa State: NOT FOUND")
                
                # Check for Carnegie Mellon duplicates
                cmu_count = len([s for s in suggestions if 'Carnegie Mellon' in s.get('name', '')])
                print(f"  Carnegie Mellon count: {cmu_count}")
                
            else:
                print(f"Error: {response.status_code}")
                print(f"Response: {response.text}")
            
            # Small delay between requests
            import time
            time.sleep(1)
        
        return True
        
    except Exception as e:
        print(f"Exception: {e}")
        return False

if __name__ == "__main__":
    test_frontend_backend_mismatch()
