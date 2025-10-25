#!/usr/bin/env python3
"""
Test the real major mapping system integration
"""

import requests
import json

def test_real_major_system():
    """Test the real major mapping system"""
    
    print("Testing Real Major Mapping System")
    print("=" * 50)
    
    # Test data for Computer Science
    test_data = {
        "gpa_unweighted": "3.8",
        "gpa_weighted": "4.2",
        "sat": "1450",
        "act": "33",
        "major": "Computer Science",
        "extracurricular_depth": "8",
        "leadership_positions": "7",
        "awards_publications": "6",
        "passion_projects": "8",
        "business_ventures": "5",
        "volunteer_work": "7",
        "research_experience": "6",
        "portfolio_audition": "5",
        "essay_quality": "7",
        "recommendations": "8",
        "interview": "6",
        "demonstrated_interest": "7",
        "legacy_status": "5",
        "hs_reputation": "8",
        "geographic_diversity": "5",
        "plan_timing": "5",
        "geography_residency": "5",
        "firstgen_diversity": "5",
        "ability_to_pay": "5",
        "policy_knob": "5",
        "conduct_record": "9"
    }
    
    # Test the suggestions endpoint
    print("Testing college suggestions with Computer Science...")
    try:
        response = requests.post("http://localhost:8000/api/suggest/colleges", json=test_data)
        
        if response.status_code == 200:
            response_data = response.json()
            suggestions = response_data.get('suggestions', [])
            print(f"SUCCESS: Got {len(suggestions)} suggestions")
            
            # Analyze the suggestions
            safety_count = 0
            target_count = 0
            reach_count = 0
            
            for suggestion in suggestions:
                category = suggestion.get('category', '').lower()
                college_name = suggestion.get('name', '')
                major_fit_score = suggestion.get('major_fit_score', 0)
                probability = suggestion.get('probability', 0)
                
                print(f"\n{college_name}")
                print(f"  Category: {category}")
                print(f"  Probability: {probability:.1%}")
                print(f"  Major Fit Score: {major_fit_score:.2f}")
                
                if category == 'safety':
                    safety_count += 1
                elif category == 'target':
                    target_count += 1
                elif category == 'reach':
                    reach_count += 1
            
            print(f"\nSummary:")
            print(f"  Safety: {safety_count}")
            print(f"  Target: {target_count}")
            print(f"  Reach: {reach_count}")
            
            # Test a specific college prediction
            if suggestions:
                test_college = suggestions[0]['name']
                print(f"\nTesting prediction for {test_college}...")
                
                prediction_data = test_data.copy()
                prediction_data['college'] = test_college
                
                pred_response = requests.post("http://localhost:8000/api/predict/frontend", json=prediction_data)
                
                if pred_response.status_code == 200:
                    prediction = pred_response.json()
                    print(f"SUCCESS: Prediction successful")
                    print(f"  Probability: {prediction.get('probability', 0):.1%}")
                    print(f"  Category: {prediction.get('category', 'Unknown')}")
                else:
                    print(f"ERROR: Prediction failed: {pred_response.status_code}")
                    print(f"  Response: {pred_response.text}")
            
        else:
            print(f"ERROR: Suggestions failed: {response.status_code}")
            print(f"  Response: {response.text}")
    
    except Exception as e:
        print(f"ERROR: Error testing suggestions: {e}")
    
    # Test different majors
    print("\n" + "=" * 50)
    print("Testing different majors...")
    
    test_majors = ["Business", "Engineering", "Medicine", "Psychology", "Biology"]
    
    for major in test_majors:
        print(f"\nTesting {major}...")
        test_data['major'] = major
        
        try:
            response = requests.post("http://localhost:8000/api/suggest/colleges", json=test_data)
            
            if response.status_code == 200:
                response_data = response.json()
                suggestions = response_data.get('suggestions', [])
                print(f"  SUCCESS: Got {len(suggestions)} suggestions for {major}")
                
                # Check if we have good major relevance
                strong_matches = 0
                for suggestion in suggestions:
                    major_fit_score = suggestion.get('major_fit_score', 0)
                    if major_fit_score > 0.5:
                        strong_matches += 1
                
                print(f"  Strong matches: {strong_matches}/{len(suggestions)}")
            else:
                print(f"  ERROR: Failed: {response.status_code}")
        
        except Exception as e:
            print(f"  ERROR: Error: {e}")

if __name__ == "__main__":
    test_real_major_system()
