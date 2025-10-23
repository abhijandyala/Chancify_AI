#!/usr/bin/env python3
"""
Test elite universities with a weaker profile to see more reach schools.
"""

import requests
import json

def test_weak_profile():
    """Test with a weaker profile to see more elite universities as reach schools."""
    
    print("Testing Elite Universities with Weaker Profile")
    print("=" * 60)
    
    # Weaker profile - might see more elite universities as reach schools
    weak_profile = {
        "gpa_unweighted": "3.5",
        "gpa_weighted": "3.8", 
        "sat": "1200",
        "act": "26",
        "major": "Business",
        "extracurricular_depth": "5",
        "leadership_positions": "4",
        "awards_publications": "3",
        "passion_projects": "4",
        "business_ventures": "2",
        "volunteer_work": "5",
        "research_experience": "2",
        "portfolio_audition": "3",
        "essay_quality": "6",
        "recommendations": "6",
        "interview": "5",
        "demonstrated_interest": "4",
        "legacy_status": "0",
        "hs_reputation": "5",
        "geographic_diversity": "0",
        "plan_timing": "0",
        "geography_residency": "0",
        "firstgen_diversity": "0",
        "ability_to_pay": "0",
        "policy_knob": "0",
        "conduct_record": "0"
    }
    
    try:
        # Make API request
        response = requests.post(
            "http://localhost:8000/api/suggest/colleges",
            json=weak_profile,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code != 200:
            print(f"ERROR: API request failed with status {response.status_code}")
            return
        
        data = response.json()
        suggestions = data.get("suggestions", [])
        print(f"Received {len(suggestions)} college suggestions")
        
        # Check for elite universities
        elite_found = []
        for suggestion in suggestions:
            college_name = suggestion.get("name", "")
            probability = suggestion.get("probability", 0)
            category = suggestion.get("category", "unknown")
            
            # Check if this is an elite university
            elite_keywords = ["harvard", "mit", "stanford", "yale", "princeton", "columbia", 
                            "pennsylvania", "dartmouth", "brown", "cornell", "duke", 
                            "northwestern", "vanderbilt", "rice", "emory", "georgetown", 
                            "carnegie mellon", "new york university", "chicago"]
            
            for keyword in elite_keywords:
                if keyword in college_name.lower():
                    elite_found.append({
                        "name": college_name,
                        "probability": probability,
                        "category": category,
                        "acceptance_rate": suggestion.get("acceptance_rate", 0)
                    })
                    break
        
        print(f"\nElite Universities Found:")
        if elite_found:
            for item in elite_found:
                prob_percent = item["probability"] * 100
                acc_rate = item["acceptance_rate"] * 100 if item["acceptance_rate"] else 0
                print(f"   - {item['name']}")
                print(f"     Probability: {prob_percent:.1f}% | Category: {item['category']} | Acceptance Rate: {acc_rate:.1f}%")
        else:
            print("   No elite universities found in suggestions")
        
        # Show all suggestions
        print(f"\nAll Suggestions:")
        for i, suggestion in enumerate(suggestions, 1):
            prob_percent = suggestion.get("probability", 0) * 100
            print(f"   {i}. {suggestion.get('name', 'Unknown')} - {prob_percent:.1f}% ({suggestion.get('category', 'unknown')})")
        
        return elite_found
        
    except Exception as e:
        print(f"ERROR: {e}")
        return []

def main():
    """Main function."""
    elite_found = test_weak_profile()
    print(f"\nFound {len(elite_found)} elite universities in suggestions")

if __name__ == "__main__":
    main()
