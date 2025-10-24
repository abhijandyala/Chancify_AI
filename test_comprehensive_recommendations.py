#!/usr/bin/env python3
"""
Comprehensive test for the recommendation system
"""

import requests
import json
import time

def test_comprehensive_recommendations():
    """Test the complete recommendation system"""
    
    # Test data - maxed out profile for Computer Science
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
    
    print("COMPREHENSIVE RECOMMENDATION SYSTEM TEST")
    print("=" * 60)
    
    try:
        # Make request to suggestions endpoint
        response = requests.post(
            "http://localhost:8000/api/suggest/colleges",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=60
        )
        
        if response.status_code == 200:
            data = response.json()
            
            print(f"SUCCESS! Got {len(data.get('suggestions', []))} suggestions")
            
            # Analyze results
            suggestions = data.get('suggestions', [])
            
            safety_schools = [s for s in suggestions if s.get('category') == 'safety']
            target_schools = [s for s in suggestions if s.get('category') == 'target'] 
            reach_schools = [s for s in suggestions if s.get('category') == 'reach']
            
            print(f"\nCATEGORIZATION RESULTS:")
            print(f"  Safety Schools: {len(safety_schools)}")
            print(f"  Target Schools: {len(target_schools)}")
            print(f"  Reach Schools: {len(reach_schools)}")
            
            # Check if we have the expected 3-3-3 distribution
            if len(safety_schools) == 3 and len(target_schools) == 3 and len(reach_schools) == 3:
                print("  YES CORRECT DISTRIBUTION: 3-3-3")
            else:
                print("  NO - INCORRECT DISTRIBUTION: Expected 3-3-3")
            
            # Analyze each category
            print(f"\nSAFETY SCHOOLS ANALYSIS:")
            for i, school in enumerate(safety_schools, 1):
                name = school.get('name', 'Unknown')
                prob = school.get('probability', 0)
                major_fit = school.get('major_fit_score', 0)
                majors = school.get('popularMajors', [])
                
                print(f"  {i}. {name}: {prob:.1%} (major fit: {major_fit:.2f})")
                print(f"     Popular Majors: {majors}")
                
                # Check if Computer Science is in popular majors
                cs_related = any('Computer' in major or 'Engineering' in major or 'Technology' in major for major in majors)
                if cs_related:
                    print(f"     YES Computer Science related")
                else:
                    print(f"     NO NOT Computer Science related")
                
                # Check probability range
                if prob >= 0.75:
                    print(f"     YES Correct probability range (>=75%)")
                else:
                    print(f"     NO Incorrect probability range ({prob:.1%})")
                print()
            
            print(f"\nTARGET SCHOOLS ANALYSIS:")
            for i, school in enumerate(target_schools, 1):
                name = school.get('name', 'Unknown')
                prob = school.get('probability', 0)
                major_fit = school.get('major_fit_score', 0)
                majors = school.get('popularMajors', [])
                
                print(f"  {i}. {name}: {prob:.1%} (major fit: {major_fit:.2f})")
                print(f"     Popular Majors: {majors}")
                
                # Check if Computer Science is in popular majors
                cs_related = any('Computer' in major or 'Engineering' in major or 'Technology' in major for major in majors)
                if cs_related:
                    print(f"     YES Computer Science related")
                else:
                    print(f"     NO NOT Computer Science related")
                
                # Check probability range
                if 0.25 <= prob < 0.75:
                    print(f"     YES Correct probability range (25-75%)")
                else:
                    print(f"     NO Incorrect probability range ({prob:.1%})")
                print()
            
            print(f"\nREACH SCHOOLS ANALYSIS:")
            for i, school in enumerate(reach_schools, 1):
                name = school.get('name', 'Unknown')
                prob = school.get('probability', 0)
                major_fit = school.get('major_fit_score', 0)
                majors = school.get('popularMajors', [])
                
                print(f"  {i}. {name}: {prob:.1%} (major fit: {major_fit:.2f})")
                print(f"     Popular Majors: {majors}")
                
                # Check if Computer Science is in popular majors
                cs_related = any('Computer' in major or 'Engineering' in major or 'Technology' in major for major in majors)
                if cs_related:
                    print(f"     YES Computer Science related")
                else:
                    print(f"     NO NOT Computer Science related")
                
                # Check probability range
                if 0.10 <= prob < 0.25:
                    print(f"     YES Correct probability range (10-25%)")
                else:
                    print(f"     NO Incorrect probability range ({prob:.1%})")
                
                # Check if elite universities have realistic probabilities
                elite_names = ['MIT', 'Harvard', 'Stanford', 'Carnegie Mellon', 'Cornell', 'Yale', 'Princeton']
                is_elite = any(elite in name for elite in elite_names)
                
                if is_elite:
                    if prob < 0.20:  # Less than 20%
                        print(f"     YES Realistic probability for elite university")
                    else:
                        print(f"     NO Probability too high for elite university")
                print()
            
            # Overall assessment
            print(f"\nOVERALL ASSESSMENT:")
            
            # Check distribution
            correct_distribution = len(safety_schools) == 3 and len(target_schools) == 3 and len(reach_schools) == 3
            print(f"  Distribution (3-3-3): {'YES PASS' if correct_distribution else 'NO FAIL'}")
            
            # Check major relevance
            all_schools = safety_schools + target_schools + reach_schools
            cs_related_count = sum(1 for school in all_schools 
                                 if any('Computer' in major or 'Engineering' in major or 'Technology' in major 
                                       for major in school.get('popularMajors', [])))
            
            major_relevance = cs_related_count >= 6  # At least 6 out of 9 should be CS related
            print(f"  Major Relevance ({cs_related_count}/9 CS-related): {'YES PASS' if major_relevance else 'NO FAIL'}")
            
            # Check probability ranges
            safety_correct = all(0.75 <= s.get('probability', 0) for s in safety_schools)
            target_correct = all(0.25 <= s.get('probability', 0) < 0.75 for s in target_schools)
            reach_correct = all(0.10 <= s.get('probability', 0) < 0.25 for s in reach_schools)
            
            probability_ranges = safety_correct and target_correct and reach_correct
            print(f"  Probability Ranges: {'YES PASS' if probability_ranges else 'NO FAIL'}")
            
            # Overall result
            overall_pass = correct_distribution and major_relevance and probability_ranges
            print(f"\nOVERALL RESULT: {'YES SYSTEM WORKING' if overall_pass else 'NO SYSTEM BROKEN'}")
            
            return overall_pass
            
        else:
            print(f"NO Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"NO Exception: {e}")
        return False

if __name__ == "__main__":
    test_comprehensive_recommendations()
