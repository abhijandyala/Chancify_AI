#!/usr/bin/env python3
"""
Final comprehensive test of the recommendation system
"""

import requests
import json

def test_profile(gpa_unweighted, gpa_weighted, sat, act, major, profile_name, factors_level="5"):
    """Test a specific profile"""
    
    test_data = {
        "gpa_unweighted": str(gpa_unweighted),
        "gpa_weighted": str(gpa_weighted), 
        "sat": str(sat),
        "act": str(act),
        "major": major,
        "extracurricular_depth": factors_level,
        "leadership_positions": factors_level,
        "awards_publications": factors_level,
        "passion_projects": factors_level,
        "business_ventures": factors_level,
        "volunteer_work": factors_level,
        "research_experience": factors_level,
        "portfolio_audition": factors_level,
        "essay_quality": factors_level,
        "recommendations": factors_level,
        "interview": factors_level,
        "demonstrated_interest": factors_level,
        "legacy_status": factors_level,
        "hs_reputation": factors_level,
        "geographic_diversity": factors_level,
        "plan_timing": factors_level,
        "geography_residency": factors_level,
        "firstgen_diversity": factors_level,
        "ability_to_pay": factors_level,
        "policy_knob": factors_level,
        "conduct_record": factors_level
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
            print(f"Total suggestions: {len(suggestions)}")
            
            # Check if distribution is correct
            correct_distribution = len(safety) >= 2 and len(target) >= 2 and len(reach) >= 1
            print(f"Distribution Acceptable: {'YES' if correct_distribution else 'NO'}")
            
            # Check major relevance
            all_schools = safety + target + reach
            cs_related_count = sum(1 for school in all_schools 
                                 if any('Computer' in major or 'Engineering' in major or 'Technology' in major 
                                       for major in school.get('popularMajors', [])))
            
            major_relevance = cs_related_count >= len(all_schools) * 0.8  # At least 80% should be CS related
            print(f"Major Relevance ({cs_related_count}/{len(all_schools)} CS-related): {'YES' if major_relevance else 'NO'}")
            
            # Check probability ranges (using dynamic thresholds)
            # For weaker students, we use lower thresholds, so we check for reasonable ranges
            max_prob = max([s.get('probability', 0) for s in all_schools]) if all_schools else 0
            
            if max_prob >= 0.75:
                # Strong student: use standard thresholds
                safety_correct = all(0.75 <= s.get('probability', 0) for s in safety) if safety else True
                target_correct = all(0.25 <= s.get('probability', 0) < 0.75 for s in target) if target else True
                reach_correct = all(0.10 <= s.get('probability', 0) < 0.25 for s in reach) if reach else True
            elif max_prob >= 0.50:
                # Moderate student: use dynamic thresholds
                safety_correct = all(0.60 <= s.get('probability', 0) for s in safety) if safety else True
                target_correct = all(0.20 <= s.get('probability', 0) < 0.60 for s in target) if target else True
                reach_correct = all(0.05 <= s.get('probability', 0) < 0.20 for s in reach) if reach else True
            else:
                # Weak student: use even lower thresholds
                safety_correct = all(0.45 <= s.get('probability', 0) for s in safety) if safety else True
                target_correct = all(0.15 <= s.get('probability', 0) < 0.45 for s in target) if target else True
                reach_correct = all(0.02 <= s.get('probability', 0) < 0.15 for s in reach) if reach else True
            
            probability_ranges = safety_correct and target_correct and reach_correct
            print(f"Probability Ranges (Dynamic): {'YES' if probability_ranges else 'NO'}")
            
            # Check for duplicates
            names = [s.get('name') for s in suggestions]
            duplicates = [name for name in set(names) if names.count(name) > 1]
            no_duplicates = len(duplicates) == 0
            print(f"No Duplicates: {'YES' if no_duplicates else 'NO'}")
            
            # Show sample from each category
            if safety:
                print(f"Safety Sample: {safety[0]['name']} ({safety[0]['probability']:.1%})")
            if target:
                print(f"Target Sample: {target[0]['name']} ({target[0]['probability']:.1%})")
            if reach:
                print(f"Reach Sample: {reach[0]['name']} ({reach[0]['probability']:.1%})")
            
            # Overall result
            overall_pass = correct_distribution and major_relevance and probability_ranges and no_duplicates
            print(f"Overall Result: {'PASS' if overall_pass else 'FAIL'}")
            
            return overall_pass
            
        else:
            print(f"Error: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"Exception: {e}")
        return False

def test_final_system():
    """Test the final system comprehensively"""
    
    print("FINAL COMPREHENSIVE SYSTEM TEST")
    print("=" * 60)
    
    profiles = [
        (3.5, 3.8, 1200, 26, "Computer Science", "Average Student", "5"),
        (3.8, 4.2, 1400, 32, "Computer Science", "Strong Student", "5"),
        (4.0, 4.5, 1600, 36, "Computer Science", "Perfect Student", "10"),
        (3.2, 3.5, 1100, 24, "Computer Science", "Below Average Student", "5"),
        (3.9, 4.3, 1500, 34, "Computer Science", "Very Strong Student", "5"),
        (4.0, 4.5, 1600, 36, "Business", "Perfect Student - Business", "10"),
        (4.0, 4.5, 1600, 36, "Engineering", "Perfect Student - Engineering", "10"),
    ]
    
    results = []
    
    for gpa_u, gpa_w, sat, act, major, name, factors in profiles:
        result = test_profile(gpa_u, gpa_w, sat, act, major, name, factors)
        results.append(result)
    
    print(f"\nFINAL RESULTS:")
    print(f"Profiles Tested: {len(profiles)}")
    print(f"Successful: {sum(results)}")
    print(f"Failed: {len(profiles) - sum(results)}")
    
    if all(results):
        print("ALL PROFILES WORKING CORRECTLY!")
        print("SYSTEM IS READY FOR PRODUCTION!")
    else:
        print("SOME PROFILES HAVE ISSUES - NEEDS MORE WORK")

if __name__ == "__main__":
    test_final_system()
