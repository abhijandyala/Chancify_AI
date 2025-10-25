#!/usr/bin/env python3
"""
Check if top CS schools are in our system and why they're not showing up
"""

from backend.data.real_ipeds_major_mapping import RealIPEDSMajorMapping
import json

def main():
    mapping = RealIPEDSMajorMapping()
    
    print("CHECKING TOP CS SCHOOLS IN OUR SYSTEM")
    print("=" * 50)
    
    # Top CS schools we want to check
    top_schools = [
        "Carnegie Mellon University",
        "Georgia Institute of Technology-Main Campus",
        "Massachusetts Institute of Technology", 
        "Stanford University",
        "University of California-Berkeley",
        "University of Illinois Urbana-Champaign",
        "University of Washington",
        "Cornell University",
        "Princeton University",
        "Harvard University"
    ]
    
    # Get ALL CS colleges (not just first 20)
    all_cs_colleges = mapping.get_colleges_for_major('Computer & Information Sciences', limit=100)
    
    print(f"Total CS colleges in system: {len(all_cs_colleges)}")
    print()
    
    # Check each top school
    for school in top_schools:
        print(f"Checking: {school}")
        
        # Check if it's in the CS colleges list
        if school in all_cs_colleges:
            position = all_cs_colleges.index(school) + 1
            print(f"  FOUND in CS colleges list at position {position}")
            
            # Get strength score
            strength_score = mapping.get_major_strength_score(school, 'Computer & Information Sciences')
            print(f"  Strength score: {strength_score}")
            
            # Get relevance info
            relevance_info = mapping.get_major_relevance_info(school, 'Computer & Information Sciences')
            print(f"  Match level: {relevance_info['match_level']}")
            
        else:
            print(f"  NOT FOUND in CS colleges list")
            
            # Check if it's in college_major_data at all
            if school in mapping.college_major_data:
                print(f"  But it IS in college_major_data")
                college_data = mapping.college_major_data[school]
                if 'majors' in college_data:
                    majors = [m['name'] for m in college_data['majors']]
                    print(f"  Majors offered: {majors}")
            else:
                print(f"  And NOT in college_major_data either")
        
        print()
    
    # Show the top 20 CS colleges to see what we're getting
    print("TOP 20 CS COLLEGES IN OUR SYSTEM:")
    print("=" * 40)
    for i, college in enumerate(all_cs_colleges[:20], 1):
        strength_score = mapping.get_major_strength_score(college, 'Computer & Information Sciences')
        print(f"{i:2d}. {college} - Score: {strength_score:.3f}")

if __name__ == "__main__":
    main()
