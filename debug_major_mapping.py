#!/usr/bin/env python3
"""
Debug script to check the major mapping system
"""

from backend.data.real_ipeds_major_mapping import RealIPEDSMajorMapping
import pandas as pd

def main():
    # Initialize the mapping system
    mapping = RealIPEDSMajorMapping()
    
    print("DEBUGGING MAJOR MAPPING SYSTEM")
    print("=" * 40)
    
    # Check what majors are available
    print("Available majors:")
    if hasattr(mapping, 'major_mapping'):
        majors = list(mapping.major_mapping.keys())
        print(f"Found {len(majors)} majors")
        for i, major in enumerate(majors[:10]):  # Show first 10
            print(f"  {i+1}. {major}")
        if len(majors) > 10:
            print(f"  ... and {len(majors) - 10} more")
    else:
        print("No major_mapping attribute found")
    
    print()
    
    # Try different variations of Computer Science
    cs_variations = [
        'Computer Science',
        'computer science',
        'Computer science',
        'COMPUTER SCIENCE',
        'Computer and Information Sciences',
        'Computer Programming',
        'Computer Engineering'
    ]
    
    print("Testing Computer Science variations:")
    for variation in cs_variations:
        colleges = mapping.get_colleges_for_major(variation, limit=5)
        print(f"  '{variation}': {len(colleges)} colleges found")
        if colleges:
            print(f"    First college: {colleges[0]}")
    
    print()
    
    # Check the IPEDS data directly
    print("Checking IPEDS data structure:")
    if hasattr(mapping, 'ipeds_df') and mapping.ipeds_df is not None:
        print(f"IPEDS DataFrame shape: {mapping.ipeds_df.shape}")
        print("Sample IPEDS data:")
        print(mapping.ipeds_df.head())
        print()
        print("Unique majors in IPEDS data:")
        if 'CIPFAM_NAME' in mapping.ipeds_df.columns:
            unique_majors = mapping.ipeds_df['CIPFAM_NAME'].unique()
            print(f"Found {len(unique_majors)} unique majors")
            cs_related = [m for m in unique_majors if 'computer' in m.lower() or 'cs' in m.lower()]
            print(f"Computer-related majors: {cs_related}")
    else:
        print("No IPEDS DataFrame found")

if __name__ == "__main__":
    main()
