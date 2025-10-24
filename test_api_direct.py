#!/usr/bin/env python3
"""
Direct API test to check current backend behavior
"""

import requests
import json

def test_api_direct():
    """Test the API directly"""
    
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
    
    print("DIRECT API TEST")
    print("=" * 40)
    
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
            
            # Count categories
            safety = [s for s in suggestions if s.get('category') == 'safety']
            target = [s for s in suggestions if s.get('category') == 'target']
            reach = [s for s in suggestions if s.get('category') == 'reach']
            
            print(f"Safety: {len(safety)}, Target: {len(target)}, Reach: {len(reach)}")
            
            # Show first few suggestions
            for i, suggestion in enumerate(suggestions[:5]):
                name = suggestion.get('name', 'Unknown')
                prob = suggestion.get('probability', 0)
                category = suggestion.get('category', 'Unknown')
                print(f"{i+1}. {name}: {prob:.1%} ({category})")
            
            return True
        else:
            print(f"Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"Exception: {e}")
        return False

if __name__ == "__main__":
    test_api_direct()
