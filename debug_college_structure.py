#!/usr/bin/env python3
"""
Debug the college data structure issue
"""

from backend.data.real_ipeds_major_mapping import RealIPEDSMajorMapping
import json

def main():
    mapping = RealIPEDSMajorMapping()
    
    print("DEBUGGING COLLEGE DATA STRUCTURE")
    print("=" * 40)
    
    # Get the first few colleges
    cs_colleges = mapping.get_colleges_for_major('Computer & Information Sciences', limit=5)
    
    print(f"First 5 CS colleges: {cs_colleges}")
    print()
    
    # Check the structure of each college
    for college in cs_colleges:
        print(f"Checking: {college}")
        
        if college in mapping.college_major_data:
            college_data = mapping.college_major_data[college]
            print(f"  College data keys: {list(college_data.keys())}")
            
            if 'majors' in college_data:
                print(f"  Has majors: {len(college_data['majors'])}")
            else:
                print(f"  NO MAJORS KEY!")
                print(f"  Full data: {college_data}")
        else:
            print(f"  NOT FOUND in college_major_data")
        
        print()

if __name__ == "__main__":
    main()
