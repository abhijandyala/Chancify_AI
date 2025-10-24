#!/usr/bin/env python3
"""
Test various student profiles to ensure the system works correctly
"""

import requests
import json

def test_profile(gpa_unweighted, gpa_weighted, sat, act, major, profile_name):
    """Test a specific profile"""
    
    test_data = {
        "gpa_unweighted": str(gpa_unweighted),
        "gpa_weighted": str(gpa_weighted), 
        "sat": str(sat),
        "act": str(act),
        "major": major,
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
    
    print(f"\n{profile_name.upper()}")
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
            
            # Count categories
            safety = [s for s in suggestions if s.get('category') == 'safety']
            target = [s for s in suggestions if s.get('category') == 'target']
            reach = [s for s in suggestions if s.get('category') == 'reach']
            
            print(f"Distribution: Safety={len(safety)}, Target={len(target)}, Reach={len(reach)}")
            
            # Check if distribution is correct
            correct_distribution = len(safety) == 3 and len(target) == 3 and len(reach) == 3
            print(f"Distribution Correct: {'YES' if correct_distribution else 'NO'}")
            
            # Show sample from each category
            if safety:
                print(f"Safety Sample: {safety[0]['name']} ({safety[0]['probability']:.1%})")
            if target:
                print(f"Target Sample: {target[0]['name']} ({target[0]['probability']:.1%})")
            if reach:
                print(f"Reach Sample: {reach[0]['name']} ({reach[0]['probability']:.1%})")
            
            return correct_distribution
            
        else:
            print(f"Error: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"Exception: {e}")
        return False

def test_various_profiles():
    """Test various student profiles"""
    
    print("TESTING VARIOUS STUDENT PROFILES")
    print("=" * 60)
    
    profiles = [
        (3.5, 3.8, 1200, 26, "Computer Science", "Average Student"),
        (3.8, 4.2, 1400, 32, "Business", "Strong Student"),
        (4.0, 4.5, 1600, 36, "Engineering", "Perfect Student"),
        (3.2, 3.5, 1100, 24, "Psychology", "Below Average Student"),
        (3.9, 4.3, 1500, 34, "Biology", "Very Strong Student")
    ]
    
    results = []
    
    for gpa_u, gpa_w, sat, act, major, name in profiles:
        result = test_profile(gpa_u, gpa_w, sat, act, major, name)
        results.append(result)
    
    print(f"\nOVERALL RESULTS:")
    print(f"Profiles Tested: {len(profiles)}")
    print(f"Successful: {sum(results)}")
    print(f"Failed: {len(profiles) - sum(results)}")
    
    if all(results):
        print("ALL PROFILES WORKING CORRECTLY!")
    else:
        print("SOME PROFILES HAVE ISSUES")

if __name__ == "__main__":
    test_various_profiles()
