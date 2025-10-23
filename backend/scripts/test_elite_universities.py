#!/usr/bin/env python3
"""
Test elite universities in college suggestions to verify realistic probabilities.
"""

import requests
import json
import pandas as pd

def test_elite_universities():
    """Test that elite universities appear with realistic probabilities."""
    
    print("Testing Elite Universities in College Suggestions")
    print("=" * 60)
    
    # Test profile - strong student who might apply to elite universities
    test_profile = {
        "gpa_unweighted": "3.9",
        "gpa_weighted": "4.2", 
        "sat": "1500",
        "act": "34",
        "major": "Computer Science",
        "extracurricular_depth": "8",
        "leadership_positions": "7",
        "awards_publications": "6",
        "passion_projects": "8",
        "business_ventures": "5",
        "volunteer_work": "7",
        "research_experience": "8",
        "portfolio_audition": "6",
        "essay_quality": "8",
        "recommendations": "9",
        "interview": "7",
        "demonstrated_interest": "6",
        "legacy_status": "0",
        "hs_reputation": "8",
        "geographic_diversity": "0",
        "plan_timing": "0",
        "geography_residency": "0",
        "firstgen_diversity": "0",
        "ability_to_pay": "0",
        "policy_knob": "0",
        "conduct_record": "0"
    }
    
    # Elite universities to check for
    elite_universities = [
        "Harvard University",
        "Massachusetts Institute of Technology",
        "Stanford University", 
        "Yale University",
        "Princeton University",
        "Columbia University",
        "University of Pennsylvania",
        "Dartmouth College",
        "Brown University",
        "Cornell University",
        "Duke University",
        "Northwestern University",
        "Vanderbilt University",
        "Rice University",
        "Emory University",
        "Georgetown University",
        "Carnegie Mellon University",
        "New York University",
        "University of Chicago"
    ]
    
    try:
        # Make API request
        response = requests.post(
            "http://localhost:8000/api/suggest/colleges",
            json=test_profile,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code != 200:
            print(f"ERROR: API request failed with status {response.status_code}")
            print(response.text)
            return
        
        data = response.json()
        
        if not data.get("success"):
            print(f"ERROR: API returned success=False")
            print(data)
            return
        
        suggestions = data.get("suggestions", [])
        print(f"Received {len(suggestions)} college suggestions")
        
        # Check for elite universities in suggestions
        elite_found = []
        elite_not_found = []
        
        for suggestion in suggestions:
            college_name = suggestion.get("name", "")
            probability = suggestion.get("probability", 0)
            category = suggestion.get("category", "unknown")
            
            # Check if this is an elite university
            for elite in elite_universities:
                if elite.lower() in college_name.lower():
                    elite_found.append({
                        "name": college_name,
                        "probability": probability,
                        "category": category,
                        "acceptance_rate": suggestion.get("acceptance_rate", 0)
                    })
                    break
        
        # Check which elite universities are missing
        found_names = [item["name"] for item in elite_found]
        for elite in elite_universities:
            found = False
            for found_name in found_names:
                if elite.lower() in found_name.lower():
                    found = True
                    break
            if not found:
                elite_not_found.append(elite)
        
        print(f"\nElite Universities Found in Suggestions:")
        print(f"Found: {len(elite_found)} out of {len(elite_universities)}")
        
        if elite_found:
            print(f"\nElite Universities with Probabilities:")
            for item in elite_found:
                prob_percent = item["probability"] * 100
                acc_rate = item["acceptance_rate"] * 100 if item["acceptance_rate"] else 0
                print(f"   - {item['name']}")
                print(f"     Probability: {prob_percent:.1f}% | Category: {item['category']} | Acceptance Rate: {acc_rate:.1f}%")
                
                # Check if probability is realistic
                if prob_percent > 50:
                    print(f"     WARNING: Probability seems too high for elite university")
                elif prob_percent < 5:
                    print(f"     GOOD: Realistic low probability for elite university")
                else:
                    print(f"     GOOD: Reasonable probability range")
        
        if elite_not_found:
            print(f"\nElite Universities NOT Found in Suggestions:")
            for elite in elite_not_found:
                print(f"   - {elite}")
        
        # Check categories
        categories = {}
        for suggestion in suggestions:
            category = suggestion.get("category", "unknown")
            if category not in categories:
                categories[category] = 0
            categories[category] += 1
        
        print(f"\nSuggestion Categories:")
        for category, count in categories.items():
            print(f"   - {category}: {count} colleges")
        
        # Verify probability ranges are realistic
        print(f"\nProbability Range Analysis:")
        probabilities = [s["probability"] for s in suggestions]
        if probabilities:
            min_prob = min(probabilities) * 100
            max_prob = max(probabilities) * 100
            avg_prob = sum(probabilities) / len(probabilities) * 100
            
            print(f"   - Min probability: {min_prob:.1f}%")
            print(f"   - Max probability: {max_prob:.1f}%")
            print(f"   - Average probability: {avg_prob:.1f}%")
            
            if max_prob > 95:
                print(f"   WARNING: Some probabilities seem too high")
            elif min_prob < 2:
                print(f"   GOOD: Some very low probabilities (realistic for elite schools)")
            else:
                print(f"   GOOD: Reasonable probability range")
        
        return elite_found, elite_not_found
        
    except Exception as e:
        print(f"ERROR: {e}")
        return None, None

def main():
    """Main function to test elite universities."""
    elite_found, elite_not_found = test_elite_universities()
    
    if elite_found is not None:
        print(f"\n" + "=" * 60)
        print(f"SUMMARY:")
        print(f"SUCCESS: Elite universities found: {len(elite_found)}")
        print(f"ERROR: Elite universities missing: {len(elite_not_found)}")
        
        if len(elite_found) > 0:
            print(f"SUCCESS: Elite universities are appearing in suggestions")
        else:
            print(f"ERROR: No elite universities found in suggestions")
            
        if len(elite_not_found) > 0:
            print(f"WARNING: Some elite universities are missing from suggestions")
        
        print(f"\nTest completed successfully!")

if __name__ == "__main__":
    main()
