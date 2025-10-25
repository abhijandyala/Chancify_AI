#!/usr/bin/env python3
"""
Test the new probability calculation system directly
"""

import requests
import json

def test_with_debug():
    """Test the API and capture any error messages"""
    
    # Test data
    test_data = {
        'gpa_unweighted': '3.8',
        'sat': '1450',
        'act': '33',
        'major': 'Computer Science',
        'extracurricular_depth': '8',
        'leadership_positions': '5',
        'awards_publications': '5',
        'passion_projects': '5',
        'business_ventures': '5',
        'volunteer_work': '5',
        'research_experience': '5',
        'portfolio_audition': '5',
        'essay_quality': '5',
        'recommendations': '5',
        'interview': '5',
        'demonstrated_interest': '5',
        'legacy_status': '5',
        'hs_reputation': '5',
        'geographic_diversity': '5',
        'plan_timing': '5',
        'geography_residency': '5',
        'firstgen_diversity': '5',
        'ability_to_pay': '5',
        'policy_knob': '5',
        'conduct_record': '9'
    }
    
    print("Testing API with new probability calculation...")
    response = requests.post('http://localhost:8000/api/suggest/colleges', json=test_data, timeout=30)
    print(f"Response status: {response.status_code}")
    
    data = response.json()
    print(f"Response: {json.dumps(data, indent=2)}")
    
    if data.get('suggestions'):
        print(f"\nNumber of suggestions: {len(data['suggestions'])}")
        print("First 5 suggestions:")
        for i, suggestion in enumerate(data['suggestions'][:5]):
            print(f"  {i+1}. {suggestion['name']}: {suggestion['probability']*100:.1f}% ({suggestion['category']})")
    else:
        print("\nNo suggestions returned!")
        print(f"Academic score: {data.get('academic_score')}")
        print(f"Target tiers: {data.get('target_tiers')}")

if __name__ == "__main__":
    test_with_debug()

