#!/usr/bin/env python3
"""
Test the very weak student profile to see what's happening
"""

import requests
import json

def test_weak_student():
    """Test the below average student profile"""
    
    test_data = {
        "gpa_unweighted": "3.2",
        "gpa_weighted": "3.5", 
        "sat": "1100",
        "act": "24",
        "major": "Computer Science",
        "extracurricular_depth": "5",
        "leadership_positions": "5",
        "awards_publications": "5",
        "passion_projects": "5",
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
        "conduct_record": "5"
    }
    
    print("TESTING VERY WEAK STUDENT PROFILE")
    print("=" * 50)
    print(f"Profile: 3.2 GPA, 1100 SAT, 24 ACT")
    print()
    
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
            
            # Count categories
            safety = [s for s in suggestions if s.get('category') == 'safety']
            target = [s for s in suggestions if s.get('category') == 'target']
            reach = [s for s in suggestions if s.get('category') == 'reach']
            
            print(f"Distribution: Safety={len(safety)}, Target={len(target)}, Reach={len(reach)}")
            
            # Show all suggestions with details
            for i, suggestion in enumerate(suggestions, 1):
                name = suggestion.get('name', 'Unknown')
                prob = suggestion.get('probability', 0)
                category = suggestion.get('category', 'Unknown')
                majors = suggestion.get('popularMajors', [])
                
                print(f"{i}. {name}")
                print(f"   Category: {category}")
                print(f"   Probability: {prob:.1%}")
                print(f"   Popular Majors: {majors[:2]}")
                print()
            
            # Check if we have proper distribution
            if len(safety) >= 2 and len(target) >= 2 and len(reach) >= 1:
                print("✅ DISTRIBUTION: GOOD")
            else:
                print("❌ DISTRIBUTION: NEEDS IMPROVEMENT")
                print(f"   Need: Safety≥2, Target≥2, Reach≥1")
                print(f"   Have: Safety={len(safety)}, Target={len(target)}, Reach={len(reach)}")
            
            return len(suggestions) >= 8
            
        else:
            print(f"Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"Exception: {e}")
        return False

if __name__ == "__main__":
    test_weak_student()
