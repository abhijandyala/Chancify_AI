#!/usr/bin/env python3
"""
Debug script to understand how colleges are being selected for majors
"""

import requests
import json

def debug_major_selection():
    """Debug how colleges are selected for Computer Science major"""
    
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
    
    print("DEBUGGING MAJOR SELECTION FOR COMPUTER SCIENCE")
    print("=" * 60)
    
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
                major_fit = suggestion.get('major_fit_score', 0)
                majors = suggestion.get('popularMajors', [])
                
                print(f"{i}. {name}")
                print(f"   Category: {category}")
                print(f"   Probability: {prob:.1%}")
                print(f"   Major Fit Score: {major_fit:.2f}")
                print(f"   Popular Majors: {majors}")
                
                # Check if Computer Science is in popular majors
                cs_related = any('Computer' in major or 'Engineering' in major or 'Technology' in major for major in majors)
                if cs_related:
                    print(f"   CS Related: YES")
                else:
                    print(f"   CS Related: NO - PROBLEM!")
                
                # Check categorization
                if category == 'safety' and prob < 0.75:
                    print(f"   CATEGORIZATION ERROR: Safety with {prob:.1%} < 75%")
                elif category == 'target' and (prob < 0.25 or prob >= 0.75):
                    print(f"   CATEGORIZATION ERROR: Target with {prob:.1%} not in 25-75% range")
                elif category == 'reach' and (prob < 0.10 or prob >= 0.25):
                    print(f"   CATEGORIZATION ERROR: Reach with {prob:.1%} not in 10-25% range")
                else:
                    print(f"   Categorization: OK")
                
                print()
            
            # Check for duplicates
            names = [s.get('name') for s in suggestions]
            duplicates = [name for name in set(names) if names.count(name) > 1]
            if duplicates:
                print(f"DUPLICATE COLLEGES FOUND: {duplicates}")
            else:
                print("No duplicate colleges found")
            
            return True
            
        else:
            print(f"Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"Exception: {e}")
        return False

if __name__ == "__main__":
    debug_major_selection()
