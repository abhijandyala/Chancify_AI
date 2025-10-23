#!/usr/bin/env python3
"""
Debug why elite universities are not appearing in suggestions.
"""

import requests
import json
import pandas as pd

def debug_elite_issue():
    """Debug the elite university issue."""
    
    print("Debugging Elite University Issue")
    print("=" * 60)
    
    # Strong profile
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
    
    try:
        # Make API request
        response = requests.post(
            "http://localhost:8000/api/suggest/colleges",
            json=strong_profile,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code != 200:
            print(f"ERROR: API request failed with status {response.status_code}")
            return
        
        data = response.json()
        suggestions = data.get("suggestions", [])
        print(f"Received {len(suggestions)} college suggestions")
        
        # Check if we can find elite universities in the raw data
        print(f"\nChecking if elite universities exist in dataset...")
        
        # Load the integrated colleges data directly
        df = pd.read_csv('backend/data/raw/integrated_colleges.csv')
        print(f"Loaded {len(df)} colleges from integrated dataset")
        
        # Check for elite universities in the dataset
        elite_keywords = ["harvard", "mit", "stanford", "yale", "princeton", "columbia", 
                        "pennsylvania", "dartmouth", "brown", "cornell", "duke", 
                        "northwestern", "vanderbilt", "rice", "emory", "georgetown", 
                        "carnegie mellon", "new york university", "chicago"]
        
        elite_in_dataset = []
        for _, row in df.iterrows():
            college_name = str(row['name']).lower() if pd.notna(row['name']) else ""
            for keyword in elite_keywords:
                if keyword in college_name:
                    elite_in_dataset.append({
                        'name': row['name'],
                        'unitid': row['unitid'],
                        'acceptance_rate': row.get('acceptance_rate', 'N/A'),
                        'selectivity_tier': row.get('selectivity_tier', 'N/A')
                    })
                    break
        
        print(f"Found {len(elite_in_dataset)} elite universities in dataset:")
        for elite in elite_in_dataset:
            print(f"   - {elite['name']} (ID: {elite['unitid']}) - {elite['acceptance_rate']} - {elite['selectivity_tier']}")
        
        # Check what suggestions we got
        print(f"\nSuggestions received:")
        for i, suggestion in enumerate(suggestions, 1):
            name = suggestion.get("name", "Unknown")
            prob = suggestion.get("probability", 0) * 100
            category = suggestion.get("category", "unknown")
            acc_rate = suggestion.get("acceptance_rate", 0) * 100
            print(f"   {i}. {name} - {prob:.1f}% ({category}) - {acc_rate:.1f}% acceptance rate")
        
        # Check if any of the suggestions are elite universities
        elite_in_suggestions = []
        for suggestion in suggestions:
            name = suggestion.get("name", "").lower()
            for keyword in elite_keywords:
                if keyword in name:
                    elite_in_suggestions.append(suggestion)
                    break
        
        print(f"\nElite universities in suggestions: {len(elite_in_suggestions)}")
        for elite in elite_in_suggestions:
            prob = elite.get("probability", 0) * 100
            print(f"   - {elite.get('name')} - {prob:.1f}%")
        
        return elite_in_dataset, elite_in_suggestions
        
    except Exception as e:
        print(f"ERROR: {e}")
        return [], []

def main():
    """Main function."""
    elite_in_dataset, elite_in_suggestions = debug_elite_issue()
    
    print(f"\n" + "=" * 60)
    print(f"SUMMARY:")
    print(f"Elite universities in dataset: {len(elite_in_dataset)}")
    print(f"Elite universities in suggestions: {len(elite_in_suggestions)}")
    
    if len(elite_in_dataset) > 0 and len(elite_in_suggestions) == 0:
        print(f"ISSUE: Elite universities exist in dataset but not in suggestions")
        print(f"This suggests the ML model is giving them very low probabilities")
    elif len(elite_in_dataset) == 0:
        print(f"ISSUE: No elite universities found in dataset")
    else:
        print(f"SUCCESS: Elite universities are working correctly")

if __name__ == "__main__":
    main()
