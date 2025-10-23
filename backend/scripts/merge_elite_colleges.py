#!/usr/bin/env python3
"""
Merge elite colleges with existing integrated colleges dataset.
"""

import pandas as pd
import numpy as np
from pathlib import Path

def merge_elite_colleges():
    """Merge elite colleges with existing integrated colleges dataset."""
    
    print("Merging Elite Colleges with Existing Dataset")
    print("=" * 50)
    
    # Load existing integrated colleges
    integrated_path = "backend/data/raw/integrated_colleges.csv"
    elite_path = "backend/data/raw/elite_colleges.csv"
    
    if not Path(integrated_path).exists():
        print(f"ERROR: Integrated colleges file not found: {integrated_path}")
        return None
    
    if not Path(elite_path).exists():
        print(f"ERROR: Elite colleges file not found: {elite_path}")
        return None
    
    print(f"Loading existing integrated colleges from: {integrated_path}")
    integrated_df = pd.read_csv(integrated_path)
    print(f"Loaded {len(integrated_df)} existing colleges")
    
    print(f"Loading elite colleges from: {elite_path}")
    elite_df = pd.read_csv(elite_path)
    print(f"Loaded {len(elite_df)} elite colleges")
    
    # Check for duplicates by unitid
    existing_unitids = set(integrated_df['unitid'].astype(str))
    elite_unitids = set(elite_df['unitid'].astype(str))
    
    duplicates = existing_unitids.intersection(elite_unitids)
    if duplicates:
        print(f"Found {len(duplicates)} duplicate unitids: {duplicates}")
        # Remove duplicates from elite colleges
        elite_df = elite_df[~elite_df['unitid'].astype(str).isin(duplicates)]
        print(f"Removed duplicates, {len(elite_df)} elite colleges remaining")
    
    # Ensure both DataFrames have the same columns
    integrated_cols = set(integrated_df.columns)
    elite_cols = set(elite_df.columns)
    
    # Add missing columns to elite_df
    missing_in_elite = integrated_cols - elite_cols
    if missing_in_elite:
        print(f"Adding missing columns to elite colleges: {missing_in_elite}")
        for col in missing_in_elite:
            elite_df[col] = None
    
    # Add missing columns to integrated_df
    missing_in_integrated = elite_cols - integrated_cols
    if missing_in_integrated:
        print(f"Adding missing columns to integrated colleges: {missing_in_integrated}")
        for col in missing_in_integrated:
            integrated_df[col] = None
    
    # Reorder columns to match
    all_cols = list(integrated_df.columns)
    elite_df = elite_df[all_cols]
    
    # Merge the datasets
    merged_df = pd.concat([integrated_df, elite_df], ignore_index=True)
    
    print(f"Merged dataset contains {len(merged_df)} colleges")
    print(f"Added {len(elite_df)} elite colleges")
    
    # Show elite colleges in the merged dataset
    elite_in_merged = merged_df[merged_df['selectivity_tier'] == 'Elite']
    print(f"\nElite universities in merged dataset:")
    for _, row in elite_in_merged.iterrows():
        print(f"   - {row['name']} ({row['state']}) - {row['acceptance_rate_percent']:.1f}% acceptance rate")
    
    # Save merged dataset
    output_path = "backend/data/raw/integrated_colleges_with_elite.csv"
    merged_df.to_csv(output_path, index=False)
    print(f"\nSAVED: Merged dataset to: {output_path}")
    
    # Also update the original integrated_colleges.csv
    merged_df.to_csv(integrated_path, index=False)
    print(f"UPDATED: Original integrated_colleges.csv with elite universities")
    
    return merged_df

def main():
    """Main function to merge elite colleges."""
    merged_df = merge_elite_colleges()
    
    if merged_df is not None:
        print(f"\nSUCCESS: Merged dataset ready with {len(merged_df)} colleges!")
        
        # Show summary by selectivity tier
        tier_counts = merged_df['selectivity_tier'].value_counts()
        print(f"\nColleges by selectivity tier:")
        for tier, count in tier_counts.items():
            print(f"   - {tier}: {count} colleges")
        
    else:
        print("ERROR: Failed to merge elite colleges")

if __name__ == "__main__":
    main()
