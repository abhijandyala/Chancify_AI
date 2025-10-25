#!/usr/bin/env python3
"""
Debug if the backend is using the real major mapping
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.data.real_ipeds_major_mapping import real_ipeds_mapping

def debug_major_mapping():
    """Debug the major mapping system"""
    
    print("Debugging Major Mapping System")
    print("=" * 40)
    
    # Test Computer Science mapping
    print("Testing Computer Science mapping...")
    
    # Test major name mapping
    user_major = "Computer Science"
    ipeds_major = real_ipeds_mapping.map_major_name(user_major)
    print(f"User major '{user_major}' -> IPEDS major '{ipeds_major}'")
    
    # Test getting colleges for Computer Science
    cs_colleges = real_ipeds_mapping.get_colleges_for_major(ipeds_major, limit=5)
    print(f"Colleges offering {ipeds_major}: {len(cs_colleges)}")
    for college in cs_colleges[:5]:
        print(f"  - {college}")
    
    # Test major strength scores for some colleges
    print(f"\nTesting major strength scores...")
    test_colleges = ["California Institute of Technology", "Lewis-Clark State College", "Blackburn College"]
    
    for college in test_colleges:
        score = real_ipeds_mapping.get_major_strength_score(college, ipeds_major)
        info = real_ipeds_mapping.get_major_relevance_info(college, ipeds_major)
        print(f"{college}:")
        print(f"  Score: {score:.3f}")
        print(f"  Match: {info['match_level']}")
        print(f"  Relevant: {info['is_relevant']}")
        print()
    
    # Test if the college is in our data
    print("Checking if test colleges are in our data...")
    for college in test_colleges:
        in_data = college in real_ipeds_mapping.college_major_data
        print(f"{college}: {'YES' if in_data else 'NO'}")
        
        if in_data:
            majors = real_ipeds_mapping.get_college_majors(college)
            print(f"  Majors: {majors[:5]}...")  # Show first 5 majors
    
    # Test all available majors
    print(f"\nAll available majors ({len(real_ipeds_mapping.get_all_majors())}):")
    for major in real_ipeds_mapping.get_all_majors()[:10]:  # Show first 10
        college_count = len(real_ipeds_mapping.get_colleges_for_major(major))
        print(f"  - {major}: {college_count} colleges")

if __name__ == "__main__":
    debug_major_mapping()
