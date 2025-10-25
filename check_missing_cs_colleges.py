#!/usr/bin/env python3
"""
Check why top CS colleges like Carnegie Mellon, Virginia Tech, Georgia Tech aren't showing up
"""

from backend.data.real_ipeds_major_mapping import RealIPEDSMajorMapping
import pandas as pd

def main():
    # Initialize the mapping system
    mapping = RealIPEDSMajorMapping()
    
    print("CHECKING FOR MISSING TOP CS COLLEGES")
    print("=" * 50)
    
    # List of top CS colleges that should be in our data
    top_cs_colleges = [
        "Carnegie Mellon University",
        "Virginia Tech",
        "Georgia Institute of Technology",
        "Georgia Tech",
        "Massachusetts Institute of Technology",
        "MIT",
        "Stanford University",
        "University of California Berkeley",
        "UC Berkeley",
        "University of Illinois Urbana-Champaign",
        "UIUC",
        "University of Washington",
        "UW",
        "Cornell University",
        "Princeton University",
        "Harvard University",
        "California Institute of Technology",
        "Caltech"
    ]
    
    print("Checking if these colleges exist in our data:")
    print()
    
    # Load the college data to check what we have
    try:
        college_df = pd.read_csv('backend/data/raw/real_colleges_integrated.csv')
        print(f"Total colleges in our dataset: {len(college_df)}")
        print()
        
        # Check each college
        found_colleges = []
        missing_colleges = []
        
        for college_name in top_cs_colleges:
            # Try exact match first
            exact_match = college_df[college_df['name'].str.contains(college_name, case=False, na=False)]
            
            if not exact_match.empty:
                found_colleges.append(college_name)
                print(f"FOUND: {college_name}")
                print(f"  Exact name in data: {exact_match.iloc[0]['name']}")
            else:
                # Try partial match
                partial_match = college_df[college_df['name'].str.contains(college_name.split()[0], case=False, na=False)]
                if not partial_match.empty:
                    print(f"PARTIAL MATCH for {college_name}:")
                    for _, row in partial_match.iterrows():
                        print(f"  - {row['name']}")
                else:
                    missing_colleges.append(college_name)
                    print(f"MISSING: {college_name}")
        
        print()
        print("SUMMARY:")
        print(f"Found: {len(found_colleges)}")
        print(f"Missing: {len(missing_colleges)}")
        
        if missing_colleges:
            print()
            print("MISSING COLLEGES:")
            for college in missing_colleges:
                print(f"  - {college}")
        
        # Let's also check what CS colleges we DO have
        print()
        print("CS COLLEGES WE DO HAVE:")
        cs_colleges = mapping.get_colleges_for_major('Computer & Information Sciences', limit=50)
        for i, college in enumerate(cs_colleges[:20], 1):
            print(f"{i:2d}. {college}")
        
    except Exception as e:
        print(f"Error loading college data: {e}")

if __name__ == "__main__":
    main()
