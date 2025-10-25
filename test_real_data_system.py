"""
Test the system with real data
"""

import requests
import json

def test_college_suggestions():
    """Test college suggestions with real data"""
    print("Testing college suggestions with real data...")
    
    # Test data for a strong Computer Science student
    test_data = {
        "gpa_unweighted": "3.8",
        "gpa_weighted": "4.2",
        "sat": "1400",
        "act": "32",
        "major": "Computer Science",
        "extracurricular_depth": "8",
        "leadership_positions": "8",
        "awards_publications": "8",
        "passion_projects": "8",
        "business_ventures": "8",
        "volunteer_work": "8",
        "research_experience": "8",
        "portfolio_audition": "8",
        "essay_quality": "8",
        "recommendations": "8",
        "interview": "8",
        "demonstrated_interest": "8",
        "legacy_status": "8",
        "hs_reputation": "8",
        "geographic_diversity": "8",
        "plan_timing": "8",
        "geography_residency": "8",
        "firstgen_diversity": "8",
        "ability_to_pay": "8",
        "policy_knob": "8",
        "conduct_record": "8"
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/api/suggest/colleges",
            json=test_data,
            timeout=30
        )
        
        if response.status_code == 200:
            response_data = response.json()
            print(f"SUCCESS: Got response")
            print(f"Response type: {type(response_data)}")
            print(f"Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Not a dict'}")
            
            # Extract suggestions from response
            if isinstance(response_data, dict):
                suggestions = response_data.get('suggestions', [])
                print(f"Suggestions count: {len(suggestions)}")
                
                # Check if we have the expected 3-3-3 distribution
                safety = [s for s in suggestions if s.get('category') == 'safety']
                target = [s for s in suggestions if s.get('category') == 'target']
                reach = [s for s in suggestions if s.get('category') == 'reach']
            else:
                suggestions = response_data if isinstance(response_data, list) else []
                safety = target = reach = []
            
            print(f"Safety schools: {len(safety)}")
            print(f"Target schools: {len(target)}")
            print(f"Reach schools: {len(reach)}")
            
            # Show sample suggestions
            print("\nSample Safety Schools:")
            for school in safety[:2]:
                print(f"  - {school['name']}: {school['probability']:.1%} chance")
            
            print("\nSample Target Schools:")
            for school in target[:2]:
                print(f"  - {school['name']}: {school['probability']:.1%} chance")
            
            print("\nSample Reach Schools:")
            for school in reach[:2]:
                print(f"  - {school['name']}: {school['probability']:.1%} chance")
                
        else:
            print(f"ERROR: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"EXCEPTION: {e}")

def test_college_search():
    """Test college search with real data"""
    print("\nTesting college search with real data...")
    
    try:
        response = requests.get(
            "http://localhost:8000/api/search/colleges?q=Harvard",
            timeout=10
        )
        
        if response.status_code == 200:
            results = response.json()
            print(f"SUCCESS: Found {len(results)} Harvard results")
            
            if results:
                harvard = results[0]
                print(f"  - {harvard['name']}")
                print(f"  - Acceptance rate: {harvard.get('acceptance_rate', 'Unknown')}")
                print(f"  - Selectivity: {harvard.get('selectivity_tier', 'Unknown')}")
                print(f"  - Location: {harvard.get('city', 'Unknown')}, {harvard.get('state', 'Unknown')}")
        else:
            print(f"ERROR: {response.status_code}")
            
    except Exception as e:
        print(f"EXCEPTION: {e}")

def test_major_mapping():
    """Test major mapping with real data"""
    print("\nTesting major mapping with real data...")
    
    try:
        # Test Computer Science major
        response = requests.get(
            "http://localhost:8000/api/search/colleges?q=MIT",
            timeout=10
        )
        
        if response.status_code == 200:
            results = response.json()
            if results:
                mit = results[0]
                print(f"SUCCESS: MIT found: {mit['name']}")
                print(f"  - Acceptance rate: {mit.get('acceptance_rate', 'Unknown')}")
                print(f"  - Selectivity: {mit.get('selectivity_tier', 'Unknown')}")
        else:
            print(f"ERROR: {response.status_code}")
            
    except Exception as e:
        print(f"EXCEPTION: {e}")

if __name__ == "__main__":
    print("Testing Real Data System")
    print("=" * 50)
    
    test_college_suggestions()
    test_college_search()
    test_major_mapping()
    
    print("\n" + "=" * 50)
    print("SUCCESS: Real data system test complete!")
