#!/usr/bin/env python3
"""
Test get_college_data function directly
"""

import sys
import os
import pandas as pd

# Add backend to path
sys.path.append('.')

def test_get_college_data():
    """Test the get_college_data function directly"""
    
    print("TESTING GET_COLLEGE_DATA FUNCTION")
    print("=" * 50)
    
    # Load the integrated college data
    try:
        df = pd.read_csv('data/raw/real_colleges_integrated.csv')
        print(f"Loaded college data: {df.shape}")
        print(f"Columns: {list(df.columns)}")
        
        # Test Harvard University
        college_name = "Harvard University"
        college_name_lower = college_name.lower()
        college_row = df[df['name'].str.lower() == college_name_lower]
        
        print(f"\nSearching for: {college_name}")
        print(f"Found rows: {len(college_row)}")
        
        if not college_row.empty:
            row = college_row.iloc[0]
            print(f"Found college data:")
            print(f"  Name: {row['name']}")
            print(f"  City: {row.get('city', 'MISSING')}")
            print(f"  State: {row.get('state', 'MISSING')}")
            print(f"  Acceptance Rate: {row.get('acceptance_rate', 'MISSING')}")
            print(f"  Tuition In-State: {row.get('tuition_in_state_usd', 'MISSING')}")
            print(f"  Tuition Out-State: {row.get('tuition_out_of_state_usd', 'MISSING')}")
            
            # Test the actual function
            try:
                from main import get_college_data
                result = get_college_data(college_name)
                print(f"\nFunction result:")
                print(f"  Name: {result.get('name', 'MISSING')}")
                print(f"  City: {result.get('city', 'MISSING')}")
                print(f"  State: {result.get('state', 'MISSING')}")
                print(f"  Acceptance Rate: {result.get('acceptance_rate', 'MISSING')}")
                print(f"  Tuition In-State: {result.get('tuition_in_state', 'MISSING')}")
                print(f"  Tuition Out-State: {result.get('tuition_out_of_state', 'MISSING')}")
            except Exception as e:
                print(f"Error calling function: {e}")
        else:
            print("No college found!")
            
    except Exception as e:
        print(f"Error loading data: {e}")

if __name__ == "__main__":
    test_get_college_data()
