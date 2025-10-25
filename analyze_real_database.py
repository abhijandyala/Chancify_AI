#!/usr/bin/env python3
"""
Analyze the real IPEDS database to understand its structure and extract major-college mappings
"""

import pandas as pd
import os
from pathlib import Path

def analyze_ipeds_database():
    """Analyze the IPEDS database structure and content"""
    
    # Path to the Excel file
    excel_path = "therealdatabase/ipeds_top_majors_2024.xlsx"
    
    if not os.path.exists(excel_path):
        print(f"Error: {excel_path} not found!")
        return
    
    print("=" * 80)
    print("ANALYZING REAL IPEDS DATABASE")
    print("=" * 80)
    
    try:
        # Read the Excel file
        print(f"Reading Excel file: {excel_path}")
        
        # Try to read all sheets
        excel_file = pd.ExcelFile(excel_path)
        print(f"Available sheets: {excel_file.sheet_names}")
        
        # Read the first sheet (or main sheet)
        main_sheet = excel_file.sheet_names[0]
        print(f"Reading main sheet: {main_sheet}")
        
        df = pd.read_excel(excel_path, sheet_name=main_sheet)
        
        print(f"\nDatabase Shape: {df.shape}")
        print(f"Columns: {list(df.columns)}")
        
        # Display first few rows
        print("\nFirst 5 rows:")
        print(df.head())
        
        # Display data types
        print("\nData Types:")
        print(df.dtypes)
        
        # Check for missing values
        print("\nMissing Values:")
        missing_values = df.isnull().sum()
        print(missing_values[missing_values > 0])
        
        # Look for college name and major columns
        print("\nColumn Analysis:")
        for col in df.columns:
            print(f"  {col}: {df[col].dtype}, {df[col].nunique()} unique values")
            if df[col].nunique() < 20:  # Show unique values for categorical columns
                print(f"    Unique values: {list(df[col].unique())}")
        
        # Save as CSV for easier processing
        csv_path = "therealdatabase/ipeds_top_majors_2024.csv"
        df.to_csv(csv_path, index=False)
        print(f"\nSaved as CSV: {csv_path}")
        
        # Analyze major-related columns
        print("\n" + "=" * 50)
        print("MAJOR ANALYSIS")
        print("=" * 50)
        
        # Look for columns that might contain major information
        major_columns = [col for col in df.columns if any(keyword in col.lower() 
                       for keyword in ['major', 'program', 'degree', 'field', 'subject'])]
        
        if major_columns:
            print(f"Potential major columns: {major_columns}")
            for col in major_columns:
                print(f"\n{col} analysis:")
                print(f"  Unique values: {df[col].nunique()}")
                if df[col].nunique() < 50:
                    print(f"  Values: {list(df[col].unique())}")
                else:
                    print(f"  Sample values: {list(df[col].unique()[:10])}")
        
        # Look for college name columns
        college_columns = [col for col in df.columns if any(keyword in col.lower() 
                          for keyword in ['college', 'university', 'institution', 'school', 'name'])]
        
        if college_columns:
            print(f"\nPotential college name columns: {college_columns}")
            for col in college_columns:
                print(f"\n{col} analysis:")
                print(f"  Unique values: {df[col].nunique()}")
                print(f"  Sample values: {list(df[col].unique()[:10])}")
        
        # Check for enrollment or ranking data
        enrollment_columns = [col for col in df.columns if any(keyword in col.lower() 
                             for keyword in ['enrollment', 'students', 'total', 'count', 'number'])]
        
        if enrollment_columns:
            print(f"\nPotential enrollment columns: {enrollment_columns}")
            for col in enrollment_columns:
                print(f"\n{col} analysis:")
                print(f"  Data type: {df[col].dtype}")
                print(f"  Min: {df[col].min()}, Max: {df[col].max()}, Mean: {df[col].mean():.2f}")
        
        return df
        
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return None

def create_major_college_mapping(df):
    """Create a mapping from the IPEDS data"""
    if df is None:
        return None
    
    print("\n" + "=" * 50)
    print("CREATING MAJOR-COLLEGE MAPPING")
    print("=" * 50)
    
    # This will be implemented based on the actual structure of the data
    # For now, just show what we can extract
    
    print("Data structure analysis complete.")
    print("Next step: Create mapping based on actual column structure.")
    
    return df

if __name__ == "__main__":
    df = analyze_ipeds_database()
    if df is not None:
        create_major_college_mapping(df)
