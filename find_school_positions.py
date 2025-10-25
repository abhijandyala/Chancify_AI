#!/usr/bin/env python3
"""
Find the positions of top CS schools in the ranking
"""

import json

def main():
    with open('backend/data/real_major_mapping.json', 'r') as f:
        data = json.load(f)
    
    cs_colleges = data.get('Computer & Information Sciences', [])
    
    # Schools to find
    target_schools = [
        "Georgia Institute of Technology-Main Campus",
        "Massachusetts Institute of Technology",
        "Stanford University",
        "Cornell University",
        "Princeton University"
    ]
    
    print("Finding positions of top CS schools:")
    print("=" * 50)
    
    for school in target_schools:
        for i, college in enumerate(cs_colleges, 1):
            if college['college'] == school:
                print(f"{school}: Position {i} - {college['percentage']}%")
                break
        else:
            print(f"{school}: NOT FOUND")
    
    print(f"\nTotal CS colleges: {len(cs_colleges)}")
    
    # Show the top 30 to see more schools
    print("\nTOP 30 CS COLLEGES:")
    for i, college in enumerate(cs_colleges[:30], 1):
        print(f"{i:2d}. {college['college']} - {college['percentage']}%")

if __name__ == "__main__":
    main()
