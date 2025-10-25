#!/usr/bin/env python3
"""
Debug UNITID matching between IPEDS and college data
"""

import pandas as pd
import numpy as np

def debug_unitid_matching():
    """Debug the UNITID matching issue"""
    
    print("Loading data...")
    ipeds_df = pd.read_csv("therealdatabase/ipeds_top_majors_2024.csv")
    college_df = pd.read_csv("backend/data/raw/real_colleges_integrated.csv")
    
    print(f"IPEDS data shape: {ipeds_df.shape}")
    print(f"College data shape: {college_df.shape}")
    
    print("\nIPEDS UNITID analysis:")
    print(f"UNITID type: {ipeds_df['UNITID'].dtype}")
    print(f"UNITID range: {ipeds_df['UNITID'].min()} - {ipeds_df['UNITID'].max()}")
    print(f"Sample UNITIDs: {list(ipeds_df['UNITID'].head(10))}")
    
    print("\nCollege data UNITID analysis:")
    if 'unitid' in college_df.columns:
        print(f"unitid type: {college_df['unitid'].dtype}")
        print(f"unitid range: {college_df['unitid'].min()} - {college_df['unitid'].max()}")
        print(f"Sample unitids: {list(college_df['unitid'].head(10))}")
        
        # Check for matches
        ipeds_unitids = set(ipeds_df['UNITID'])
        college_unitids = set(college_df['unitid'].dropna())
        
        matches = ipeds_unitids.intersection(college_unitids)
        print(f"\nMatching UNITIDs: {len(matches)}")
        print(f"IPEDS UNITIDs: {len(ipeds_unitids)}")
        print(f"College UNITIDs: {len(college_unitids)}")
        
        if len(matches) > 0:
            print(f"Sample matches: {list(matches)[:10]}")
        else:
            print("No matches found!")
            print("Sample IPEDS UNITIDs:", list(ipeds_unitids)[:10])
            print("Sample College UNITIDs:", list(college_unitids)[:10])
    else:
        print("No 'unitid' column found in college data")
        print("Available columns:", list(college_df.columns))
    
    # Check if there are other ID columns
    print("\nChecking for other ID columns in college data:")
    id_columns = [col for col in college_df.columns if 'id' in col.lower()]
    print(f"ID columns: {id_columns}")
    
    for col in id_columns:
        print(f"\n{col} analysis:")
        print(f"  Type: {college_df[col].dtype}")
        print(f"  Non-null count: {college_df[col].notna().sum()}")
        if college_df[col].notna().sum() > 0:
            print(f"  Range: {college_df[col].min()} - {college_df[col].max()}")
            print(f"  Sample values: {list(college_df[col].dropna().head(5))}")

if __name__ == "__main__":
    debug_unitid_matching()
