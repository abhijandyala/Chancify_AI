#!/usr/bin/env python3
"""
Test the new real college suggestions system directly
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.data.real_college_suggestions import real_college_suggestions

def test_new_system():
    """Test the new real college suggestions system"""
    
    print("Testing New Real College Suggestions System")
    print("=" * 50)
    
    # Test Computer Science
    major = "Computer Science"
    academic_strength = 7.5  # Strong student
    
    print(f"Testing {major} for student with academic strength {academic_strength}")
    
    # Get balanced suggestions
    suggestions = real_college_suggestions.get_balanced_suggestions(major, academic_strength)
    
    print(f"Got {len(suggestions)} suggestions:")
    
    for i, college in enumerate(suggestions):
        print(f"\n{i+1}. {college['name']}")
        print(f"   Category: {college['category']}")
        print(f"   Major Fit Score: {college['major_fit_score']:.3f}")
        print(f"   Acceptance Rate: {college['acceptance_rate']:.1%}")
        print(f"   Selectivity Tier: {college['selectivity_tier']}")
        print(f"   City: {college['city']}, {college['state']}")
    
    # Test fallback suggestions
    print(f"\n" + "=" * 50)
    print("Testing fallback suggestions...")
    
    fallback_suggestions = real_college_suggestions.get_fallback_suggestions(major, academic_strength)
    
    print(f"Got {len(fallback_suggestions)} fallback suggestions:")
    
    for i, college in enumerate(fallback_suggestions[:5]):  # Show first 5
        print(f"\n{i+1}. {college['name']}")
        print(f"   Category: {college['category']}")
        print(f"   Major Fit Score: {college['major_fit_score']:.3f}")
        print(f"   Acceptance Rate: {college['acceptance_rate']:.1%}")
        print(f"   Selectivity Tier: {college['selectivity_tier']}")
    
    # Test different majors
    print(f"\n" + "=" * 50)
    print("Testing different majors...")
    
    test_majors = ["Business", "Engineering", "Medicine", "Psychology"]
    
    for test_major in test_majors:
        print(f"\nTesting {test_major}...")
        major_suggestions = real_college_suggestions.get_balanced_suggestions(test_major, academic_strength)
        
        if major_suggestions:
            print(f"  Got {len(major_suggestions)} suggestions")
            
            # Show the best match
            best_match = max(major_suggestions, key=lambda x: x['major_fit_score'])
            print(f"  Best match: {best_match['name']} (score: {best_match['major_fit_score']:.3f})")
        else:
            print(f"  No suggestions found")

if __name__ == "__main__":
    test_new_system()
