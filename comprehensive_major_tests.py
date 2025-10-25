#!/usr/bin/env python3
"""
Comprehensive major testing across all majors in the system
"""

import requests
import json

def test_all_majors():
    """Test all majors to ensure accurate major relevance"""
    
    url = "http://localhost:8000/api/suggest/colleges"
    
    # List of all majors from the IPEDS data
    majors = [
        "Computer Science",
        "Business",
        "Engineering",
        "Medicine",
        "Psychology",
        "Biology",
        "Nursing",
        "Political Science",
        "Economics",
        "Mathematics",
        "English",
        "Communications",
        "History",
        "Chemistry",
        "Physics",
        "Sociology",
        "Education",
        "Arts",
        "Criminal Justice",
        "Environmental Science"
    ]
    
    results = {}
    
    for major in majors:
        print(f"\nTesting {major}...")
        
        test_data = {
            "gpa_unweighted": "3.8",
            "gpa_weighted": "4.2",
            "sat": "1450",
            "act": "33",
            "major": major,
            "extracurricular_depth": "8",
            "leadership_positions": "8",
            "awards_publications": "8",
            "passion_projects": "8",
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
            "conduct_record": "9"
        }
        
        try:
            response = requests.post(url, json=test_data, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                suggestions = data.get('suggestions', [])
                
                # Count strong matches
                strong_matches = sum(1 for s in suggestions if s.get('major_fit_score', 0) >= 0.5)
                good_matches = sum(1 for s in suggestions if 0.3 <= s.get('major_fit_score', 0) < 0.5)
                weak_matches = sum(1 for s in suggestions if s.get('major_fit_score', 0) < 0.3)
                
                results[major] = {
                    'total': len(suggestions),
                    'strong_matches': strong_matches,
                    'good_matches': good_matches,
                    'weak_matches': weak_matches,
                    'top_college': suggestions[0]['name'] if suggestions else 'None',
                    'top_score': suggestions[0]['major_fit_score'] if suggestions else 0
                }
                
                print(f"  OK: {len(suggestions)} suggestions")
                print(f"  Strong matches: {strong_matches}/9")
                print(f"  Good matches: {good_matches}/9")
                print(f"  Weak matches: {weak_matches}/9")
                print(f"  Top college: {results[major]['top_college']} (score: {results[major]['top_score']})")
            else:
                print(f"  ERROR: Status {response.status_code}")
                results[major] = {'error': response.status_code}
                
        except Exception as e:
            print(f"  ERROR: {e}")
            results[major] = {'error': str(e)}
    
    # Print summary
    print("\n" + "="*60)
    print("SUMMARY OF ALL MAJORS")
    print("="*60)
    
    for major, result in results.items():
        if 'error' not in result:
            print(f"\n{major}:")
            print(f"  Total suggestions: {result['total']}")
            print(f"  Strong matches (>= 0.5): {result['strong_matches']}")
            print(f"  Good matches (0.3-0.5): {result['good_matches']}")
            print(f"  Weak matches (< 0.3): {result['weak_matches']}")
            print(f"  Top college: {result['top_college']} (score: {result['top_score']})")
        else:
            print(f"\n{major}: ERROR - {result['error']}")
    
    print("\n" + "="*60)
    print(f"Successfully tested {len([r for r in results.values() if 'error' not in r])} / {len(majors)} majors")
    print("="*60)

if __name__ == "__main__":
    test_all_majors()
