#!/usr/bin/env python3
"""
Examine the IPEDS data structure more carefully
"""

import pandas as pd

def examine_ipeds_structure():
    """Examine all sheets in the IPEDS Excel file"""
    
    excel_path = "therealdatabase/ipeds_top_majors_2024.xlsx"
    excel_file = pd.ExcelFile(excel_path)
    
    print("Available sheets:", excel_file.sheet_names)
    
    for sheet_name in excel_file.sheet_names:
        print(f"\n{'='*60}")
        print(f"SHEET: {sheet_name}")
        print('='*60)
        
        df = pd.read_excel(excel_path, sheet_name=sheet_name)
        print(f"Shape: {df.shape}")
        print(f"Columns: {list(df.columns)}")
        
        print("\nFirst 5 rows:")
        print(df.head())
        
        print("\nData types:")
        print(df.dtypes)
        
        # Look for college name columns
        name_cols = [col for col in df.columns if any(keyword in col.lower() 
                   for keyword in ['name', 'institution', 'college', 'university', 'school'])]
        
        if name_cols:
            print(f"\nPotential name columns: {name_cols}")
            for col in name_cols:
                print(f"\n{col} analysis:")
                print(f"  Unique values: {df[col].nunique()}")
                print(f"  Sample values: {list(df[col].unique()[:10])}")
        
        # Look for major columns
        major_cols = [col for col in df.columns if any(keyword in col.lower() 
                   for keyword in ['major', 'program', 'degree', 'field', 'subject', 'cip'])]
        
        if major_cols:
            print(f"\nPotential major columns: {major_cols}")
            for col in major_cols:
                print(f"\n{col} analysis:")
                print(f"  Unique values: {df[col].nunique()}")
                if df[col].nunique() < 50:
                    print(f"  Values: {list(df[col].unique())}")
                else:
                    print(f"  Sample values: {list(df[col].unique()[:10])}")
        
        # Look for UNITID columns
        unitid_cols = [col for col in df.columns if 'unitid' in col.lower()]
        if unitid_cols:
            print(f"\nUNITID columns: {unitid_cols}")
            for col in unitid_cols:
                print(f"\n{col} analysis:")
                print(f"  Unique values: {df[col].nunique()}")
                print(f"  Range: {df[col].min()} - {df[col].max()}")
                print(f"  Sample values: {list(df[col].unique()[:10])}")

if __name__ == "__main__":
    examine_ipeds_structure()
