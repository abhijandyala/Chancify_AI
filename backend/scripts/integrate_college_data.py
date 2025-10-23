#!/usr/bin/env python3
"""
Integrate real college data from College Scorecard API with our ML model data.
This script merges the 1000+ colleges from the API with our existing 100 colleges
and creates a comprehensive dataset for the ML model.
"""

import pandas as pd
import numpy as np
import os
import sys

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

def load_existing_data():
    """Load our existing 100 colleges data"""
    existing_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'raw', 'real_colleges_100.csv')
    return pd.read_csv(existing_path)

def load_new_data():
    """Load the new 1000+ colleges data"""
    new_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'raw', 'colleges_1000.csv')
    return pd.read_csv(new_path)

def clean_and_enhance_data(df):
    """Clean and enhance the college data"""
    # Create a copy to avoid warnings
    df = df.copy()
    
    # Remove rows with missing essential data
    df = df.dropna(subset=['name', 'acceptance_rate_percent'])
    
    # Fill missing values
    df.loc[:, 'tuition_in_state_usd'] = df['tuition_in_state_usd'].fillna(df['tuition_out_of_state_usd'])
    df.loc[:, 'tuition_out_of_state_usd'] = df['tuition_out_of_state_usd'].fillna(df['tuition_in_state_usd'])
    df.loc[:, 'avg_net_price_usd'] = df['avg_net_price_usd'].fillna(df['tuition_in_state_usd'])
    
    # Create unitid (use index + 1000000 to avoid conflicts)
    df.loc[:, 'unitid'] = df.index + 1000000
    
    # Map selectivity labels to tiers
    tier_mapping = {
        'Extremely selective': 'Elite',
        'Very selective': 'Elite', 
        'Selective': 'Highly Selective',
        'Somewhat selective': 'Moderately Selective',
        'Less selective': 'Less Selective',
        'Unknown': 'Less Selective'
    }
    df.loc[:, 'selectivity_tier'] = df['selectivity_label'].map(tier_mapping)
    
    # Create estimated SAT/ACT ranges based on selectivity
    def estimate_sat_act(tier, acceptance_rate):
        if tier == 'Elite':
            if acceptance_rate < 5:
                return 1500, 1580, 34, 36  # SAT 25th, 75th, ACT 25th, 75th
            else:
                return 1400, 1520, 32, 35
        elif tier == 'Highly Selective':
            return 1300, 1480, 29, 33
        elif tier == 'Moderately Selective':
            return 1100, 1350, 24, 29
        else:
            return 900, 1200, 19, 26
    
    sat_act_data = df.apply(lambda row: estimate_sat_act(row['selectivity_tier'], row['acceptance_rate_percent']), axis=1)
    df.loc[:, 'sat_total_25'] = [x[0] for x in sat_act_data]
    df.loc[:, 'sat_total_75'] = [x[1] for x in sat_act_data]
    df.loc[:, 'act_composite_25'] = [x[2] for x in sat_act_data]
    df.loc[:, 'act_composite_75'] = [x[3] for x in sat_act_data]
    
    # Estimate GPA average based on selectivity
    def estimate_gpa(tier):
        if tier == 'Elite':
            return np.random.normal(3.9, 0.1)
        elif tier == 'Highly Selective':
            return np.random.normal(3.7, 0.15)
        elif tier == 'Moderately Selective':
            return np.random.normal(3.5, 0.2)
        else:
            return np.random.normal(3.2, 0.25)
    
    df.loc[:, 'gpa_average'] = df['selectivity_tier'].apply(estimate_gpa)
    
    # Add missing columns with defaults - handle NaN values properly
    df.loc[:, 'applications'] = df['applicants_total'].fillna(df['accepted_per_year'] * 10)
    df.loc[:, 'admitted'] = df['accepted_per_year'].fillna(df['applications'] * df['acceptance_rate_percent'] / 100)
    
    # Handle NaN values in admitted before calculating enrolled
    df.loc[:, 'admitted'] = df['admitted'].fillna(1000)  # Default to 1000 if still NaN
    df.loc[:, 'enrolled'] = (df['admitted'] * 0.7).fillna(700).astype(int)  # Assume 70% yield rate
    
    df.loc[:, 'test_policy'] = 'Required'
    df.loc[:, 'financial_aid_policy'] = 'Need-blind'
    df.loc[:, 'data_completeness'] = 1
    
    return df

def merge_datasets(existing_df, new_df):
    """Merge existing and new datasets"""
    # Keep all existing colleges (they have more detailed data)
    # Add new colleges that don't conflict
    
    # Create a comprehensive dataset
    merged_df = pd.concat([existing_df, new_df], ignore_index=True)
    
    # Remove duplicates based on name similarity (simple approach)
    merged_df = merged_df.drop_duplicates(subset=['name'], keep='first')
    
    return merged_df

def save_integrated_data(df):
    """Save the integrated dataset"""
    output_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'raw', 'integrated_colleges.csv')
    df.to_csv(output_path, index=False)
    print(f"Saved {len(df)} colleges to {output_path}")
    
    # Also create a summary
    summary_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'raw', 'college_summary.txt')
    with open(summary_path, 'w') as f:
        f.write("Integrated College Dataset Summary\n")
        f.write("=" * 40 + "\n\n")
        f.write(f"Total Colleges: {len(df)}\n")
        f.write(f"Elite: {len(df[df['selectivity_tier'] == 'Elite'])}\n")
        f.write(f"Highly Selective: {len(df[df['selectivity_tier'] == 'Highly Selective'])}\n")
        f.write(f"Moderately Selective: {len(df[df['selectivity_tier'] == 'Moderately Selective'])}\n")
        f.write(f"Less Selective: {len(df[df['selectivity_tier'] == 'Less Selective'])}\n\n")
        
        f.write("Sample Elite Colleges:\n")
        elite_colleges = df[df['selectivity_tier'] == 'Elite'].head(10)
        for _, college in elite_colleges.iterrows():
            f.write(f"- {college['name']} ({college['state']}): {college['acceptance_rate_percent']:.1f}% acceptance\n")

def main():
    print("Loading existing college data...")
    existing_df = load_existing_data()
    print(f"Loaded {len(existing_df)} existing colleges")
    
    print("Loading new college data...")
    new_df = load_new_data()
    print(f"Loaded {len(new_df)} new colleges")
    
    print("Cleaning and enhancing new data...")
    new_df = clean_and_enhance_data(new_df)
    
    print("Merging datasets...")
    merged_df = merge_datasets(existing_df, new_df)
    print(f"Created integrated dataset with {len(merged_df)} colleges")
    
    print("Saving integrated data...")
    save_integrated_data(merged_df)
    
    print("Integration complete!")

if __name__ == "__main__":
    main()
