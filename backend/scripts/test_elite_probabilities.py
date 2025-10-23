#!/usr/bin/env python3
"""
Test what probabilities elite universities are getting from the ML model.
"""

import requests
import json

def test_elite_probabilities():
    """Test what probabilities elite universities get from the ML model."""
    
    print("Testing Elite University Probabilities")
    print("=" * 60)
    
    # Strong profile that should get some probability for elite universities
    strong_profile = {
        "gpa_unweighted": "3.9",
        "gpa_weighted": "4.2", 
        "sat": "1500",
        "act": "34",
        "major": "Computer Science",
        "extracurricular_depth": "9",
        "leadership_positions": "8",
        "awards_publications": "7",
        "passion_projects": "9",
        "business_ventures": "6",
        "volunteer_work": "8",
        "research_experience": "9",
        "portfolio_audition": "7",
        "essay_quality": "9",
        "recommendations": "9",
        "interview": "8",
        "demonstrated_interest": "7",
        "legacy_status": "0",
        "hs_reputation": "9",
        "geographic_diversity": "0",
        "plan_timing": "0",
        "geography_residency": "0",
        "firstgen_diversity": "0",
        "ability_to_pay": "0",
        "policy_knob": "0",
        "conduct_record": "0"
    }
    
    # Test individual elite universities
    elite_universities = [
        "Harvard University",
        "Massachusetts Institute of Technology",
        "Stanford University", 
        "Yale University",
        "Princeton University"
    ]
    
    for university in elite_universities:
        try:
            # Make prediction request for individual university
            prediction_request = {
                **strong_profile,
                "college_id": f"college_{university.replace(' ', '_').lower()}"
            }
            
            response = requests.post(
                "http://localhost:8000/api/predict/frontend",
                json=prediction_request,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    probability = data.get("probability", 0) * 100
                    print(f"{university}: {probability:.1f}%")
                else:
                    print(f"{university}: ERROR - {data.get('error', 'Unknown error')}")
            else:
                print(f"{university}: HTTP {response.status_code}")
                
        except Exception as e:
            print(f"{university}: EXCEPTION - {e}")
    
    # Also test the suggestions endpoint to see what we get
    print(f"\nTesting College Suggestions:")
    try:
        response = requests.post(
            "http://localhost:8000/api/suggest/colleges",
            json=strong_profile,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            suggestions = data.get("suggestions", [])
            
            print(f"Received {len(suggestions)} suggestions:")
            for i, suggestion in enumerate(suggestions, 1):
                name = suggestion.get("name", "Unknown")
                prob = suggestion.get("probability", 0) * 100
                category = suggestion.get("category", "unknown")
                acc_rate = suggestion.get("acceptance_rate", 0) * 100
                print(f"   {i}. {name} - {prob:.1f}% ({category}) - {acc_rate:.1f}% acceptance rate")
                
                # Check if this is an elite university
                elite_keywords = ["harvard", "mit", "stanford", "yale", "princeton", "columbia", 
                                "pennsylvania", "dartmouth", "brown", "cornell", "duke", 
                                "northwestern", "vanderbilt", "rice", "emory", "georgetown", 
                                "carnegie mellon", "new york university", "chicago"]
                
                for keyword in elite_keywords:
                    if keyword in name.lower():
                        print(f"      *** ELITE UNIVERSITY FOUND ***")
                        break
        else:
            print(f"Suggestions request failed: HTTP {response.status_code}")
            
    except Exception as e:
        print(f"Suggestions test failed: {e}")

def main():
    """Main function."""
    test_elite_probabilities()

if __name__ == "__main__":
    main()
