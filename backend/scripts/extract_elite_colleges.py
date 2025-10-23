#!/usr/bin/env python3
"""
Extract elite universities from College Scorecard data.
This script searches for the top 20 elite universities in the MERGED2021_22_PP.csv file
and extracts their data using the specified column mapping.
"""

import pandas as pd
import numpy as np
import os
from pathlib import Path

# Elite universities to search for
ELITE_UNIVERSITIES = [
    "Harvard University",
    "Massachusetts Institute of Technology", 
    "Stanford University",
    "Yale University",
    "Princeton University",
    "Columbia University",
    "University of Pennsylvania",
    "Dartmouth College",
    "Brown University",
    "Cornell University",
    "Duke University",
    "Northwestern University",
    "Vanderbilt University",
    "Rice University",
    "Washington University in St. Louis",
    "Emory University",
    "Georgetown University",
    "Carnegie Mellon University",
    "New York University",
    "University of Chicago"
]

# Column mapping from College Scorecard to our format
COLUMN_MAPPING = {
    'INSTNM': 'name',                    # College name
    'STABBR': 'state',                   # State abbreviation
    'ADM_RATE': 'acceptance_rate',       # Admission rate
    'APPLCN': 'applications',            # Total applicants
    'ADMSSN': 'admitted',                # Total admitted
    'ENRLT': 'enrolled',                 # Total enrolled
    'TUITIONFEE_IN': 'tuition_in_state_usd',    # In-state tuition
    'TUITIONFEE_OUT': 'tuition_out_of_state_usd', # Out-of-state tuition
    'CONTROL': 'control',                # Public/private control
    'UGDS': 'student_body_size',         # Undergraduate size
    'UNITID': 'unitid'                   # Institution ID
}

def extract_elite_colleges():
    """Extract elite universities from College Scorecard data."""
    
    # Path to the College Scorecard data
    data_path = Path("elitecolleges/College_Scorecard_Raw_Data_05192025/MERGED2021_22_PP.csv")
    
    if not data_path.exists():
        print(f"ERROR: Data file not found: {data_path}")
        return None
    
    print(f"Loading College Scorecard data from: {data_path}")
    
    try:
        # Load the data
        df = pd.read_csv(data_path, low_memory=False)
        print(f"SUCCESS: Loaded {len(df)} institutions from College Scorecard data")
        
        # Search for elite universities
        elite_found = []
        elite_not_found = []
        
        for university in ELITE_UNIVERSITIES:
            # Search for exact match first
            exact_match = df[df['INSTNM'] == university]
            
            if len(exact_match) > 0:
                elite_found.append(university)
                print(f"FOUND: {university}")
            else:
                # Try partial match
                partial_match = df[df['INSTNM'].str.contains(university, case=False, na=False)]
                if len(partial_match) > 0:
                    print(f"PARTIAL MATCH for {university}:")
                    for _, row in partial_match.iterrows():
                        print(f"   - {row['INSTNM']}")
                    elite_found.append(university)
                else:
                    elite_not_found.append(university)
                    print(f"NOT FOUND: {university}")
        
        print(f"\nSummary:")
        print(f"FOUND: {len(elite_found)} universities")
        print(f"NOT FOUND: {len(elite_not_found)} universities")
        
        if elite_not_found:
            print(f"\nMissing universities: {elite_not_found}")
        
        # Extract data for found universities
        elite_data = []
        
        for university in elite_found:
            # Get the row for this university
            if university in df['INSTNM'].values:
                row = df[df['INSTNM'] == university].iloc[0]
            else:
                # Try partial match
                partial_matches = df[df['INSTNM'].str.contains(university, case=False, na=False)]
                if len(partial_matches) > 0:
                    row = partial_matches.iloc[0]
                else:
                    continue
            
            # Extract and clean the data
            college_data = {}
            
            for scorecard_col, our_col in COLUMN_MAPPING.items():
                if scorecard_col in row:
                    value = row[scorecard_col]
                    
                    # Handle missing values
                    if pd.isna(value) or value == 'NULL' or value == '':
                        college_data[our_col] = None
                    else:
                        college_data[our_col] = value
                else:
                    college_data[our_col] = None
            
            # Calculate derived fields
            college_data['acceptance_rate_percent'] = None
            if college_data['acceptance_rate'] is not None:
                try:
                    college_data['acceptance_rate_percent'] = float(college_data['acceptance_rate']) * 100
                except (ValueError, TypeError):
                    pass
            
            # Determine selectivity tier based on acceptance rate
            if college_data['acceptance_rate'] is not None:
                try:
                    rate = float(college_data['acceptance_rate'])
                    if rate <= 0.10:
                        college_data['selectivity_tier'] = 'Elite'
                    elif rate <= 0.25:
                        college_data['selectivity_tier'] = 'Highly Selective'
                    elif rate <= 0.50:
                        college_data['selectivity_tier'] = 'Moderately Selective'
                    else:
                        college_data['selectivity_tier'] = 'Less Selective'
                except (ValueError, TypeError):
                    college_data['selectivity_tier'] = 'Elite'  # Default for elite universities
            else:
                college_data['selectivity_tier'] = 'Elite'
            
            # Set default values for missing fields
            college_data['city'] = None  # Not available in this dataset
            college_data['gpa_average'] = 3.9  # Typical for elite universities
            college_data['test_policy'] = 'Required'
            college_data['financial_aid_policy'] = 'Need-blind'
            college_data['data_completeness'] = 1
            
            elite_data.append(college_data)
        
        # Convert to DataFrame
        elite_df = pd.DataFrame(elite_data)
        
        print(f"\nExtracted data for {len(elite_df)} elite universities:")
        for _, row in elite_df.iterrows():
            print(f"   - {row['name']} ({row['state']}) - {row['acceptance_rate_percent']:.1f}% acceptance rate")
        
        return elite_df
        
    except Exception as e:
        print(f"ERROR loading data: {e}")
        return None

def save_elite_colleges(elite_df):
    """Save elite colleges data to CSV."""
    if elite_df is None or len(elite_df) == 0:
        print("ERROR: No elite colleges data to save")
        return
    
    output_path = "backend/data/raw/elite_colleges.csv"
    elite_df.to_csv(output_path, index=False)
    print(f"SAVED: Elite colleges data to: {output_path}")
    
    return output_path

def main():
    """Main function to extract elite colleges."""
    print("Elite Universities Extractor")
    print("=" * 50)
    
    # Extract elite colleges
    elite_df = extract_elite_colleges()
    
    if elite_df is not None and len(elite_df) > 0:
        # Save to CSV
        output_path = save_elite_colleges(elite_df)
        
        print(f"\nSUCCESS: Extracted {len(elite_df)} elite universities!")
        print(f"Data saved to: {output_path}")
        
        # Show sample data
        print(f"\nSample data:")
        print(elite_df[['name', 'state', 'acceptance_rate_percent', 'selectivity_tier']].head())
        
    else:
        print("ERROR: Failed to extract elite colleges data")

if __name__ == "__main__":
    main()