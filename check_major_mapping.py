#!/usr/bin/env python3
"""
Check what's in the major mapping
"""

import json

def main():
    with open('backend/data/real_major_mapping.json', 'r') as f:
        data = json.load(f)
    
    cs_colleges = data.get('Computer & Information Sciences', [])
    
    print("First 15 CS colleges in major mapping:")
    for i, college in enumerate(cs_colleges[:15], 1):
        print(f"{i:2d}. {college['college']} - {college['percentage']}%")
    
    print(f"\nTotal CS colleges in major mapping: {len(cs_colleges)}")
    
    # Check if specific schools are in the mapping
    target_schools = [
        "Georgia Institute of Technology-Main Campus",
        "Massachusetts Institute of Technology",
        "Stanford University",
        "Cornell University",
        "Princeton University"
    ]
    
    print("\nChecking for missing schools:")
    for school in target_schools:
        found = any(college['college'] == school for college in cs_colleges)
        print(f"{school}: {'FOUND' if found else 'NOT FOUND'}")

if __name__ == "__main__":
    main()
