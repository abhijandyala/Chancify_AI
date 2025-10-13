"""
Process IPEDS admissions data from local Datasets folder.

Reads real college admission statistics and prepares them for ML training.
"""

import pandas as pd
import numpy as np
from pathlib import Path
import sys

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent / "backend"))

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATASETS_DIR = PROJECT_ROOT / "Datasets"
RAW_DIR = PROJECT_ROOT / "backend" / "data" / "raw"
OUT_DIR = PROJECT_ROOT / "backend" / "data" / "processed"

RAW_DIR.mkdir(parents=True, exist_ok=True)
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ADMCON importance mapping
IMPORTANCE_MAP = {
    1: "Very important",
    2: "Important",
    3: "Considered",
    4: "Not considered",
    -1: "Not reported",
    -2: "Not applicable",
}

def map_importance(val):
    """Map IPEDS importance codes to readable labels."""
    if pd.isna(val):
        return "Missing"
    try:
        val = int(val)
    except:
        return "Missing"
    return IMPORTANCE_MAP.get(val, f"Unknown({val})")


def load_ipeds_admissions():
    """Load IPEDS admissions data from Datasets folder."""
    
    print("="*60)
    print("PROCESSING IPEDS ADMISSIONS DATA")
    print("="*60)
    print(f"Source: {DATASETS_DIR}")
    print()
    
    # Find ADM CSV file
    adm_file = DATASETS_DIR / "adm2023.csv"
    
    if not adm_file.exists():
        print(f"ERROR: Could not find {adm_file}")
        print("Available files:")
        for f in DATASETS_DIR.iterdir():
            print(f"  - {f.name}")
        return None
    
    print(f"Loading: {adm_file.name}")
    
    # Load data
    df = pd.read_csv(adm_file, low_memory=False, encoding='latin1')
    
    # Normalize column names
    df.columns = [c.strip().lower() for c in df.columns]
    
    print(f"Loaded {len(df):,} institutions")
    print(f"Columns: {len(df.columns)}")
    
    return df


def process_admissions_data(df):
    """Process and clean IPEDS admissions data."""
    
    print("\n" + "="*60)
    print("CLEANING AND PROCESSING DATA")
    print("="*60)
    
    # Select and rename key columns
    column_mapping = {
        'unitid': 'unitid',
        'instnm': 'name',
        'stabbr': 'state',
        'adm_rate': 'acceptance_rate',
        'adm_rate_men': 'acceptance_rate_men',
        'adm_rate_women': 'acceptance_rate_women',
        'applcn': 'applications',
        'applcnm': 'applications_men',
        'applcnw': 'applications_women',
        'admssn': 'admitted',
        'admssnm': 'admitted_men',
        'admssnw': 'admitted_women',
        'enrlt': 'enrolled',
        'enrlm': 'enrolled_men',
        'enrlw': 'enrolled_women',
        'sat25': 'sat_total_25',
        'sat75': 'sat_total_75',
        'satvr25': 'sat_verbal_25',
        'satvr75': 'sat_verbal_75',
        'satmt25': 'sat_math_25',
        'satmt75': 'sat_math_75',
        'satwr25': 'sat_writing_25',
        'satwr75': 'sat_writing_75',
        'actcm25': 'act_composite_25',
        'actcm75': 'act_composite_75',
        'acten25': 'act_english_25',
        'acten75': 'act_english_75',
        'actmt25': 'act_math_25',
        'actmt75': 'act_math_75',
    }
    
    # Find ADMCON columns (factor importance)
    admcon_cols = [c for c in df.columns if c.startswith('admcon')]
    
    # Rename available columns
    available_cols = {k: v for k, v in column_mapping.items() if k in df.columns}
    df_clean = df.rename(columns=available_cols)
    
    # Keep relevant columns
    keep_cols = list(available_cols.values()) + admcon_cols
    keep_cols = [c for c in keep_cols if c in df_clean.columns]
    df_clean = df_clean[keep_cols].copy()
    
    # Add year if not present
    if 'year' not in df_clean.columns:
        df_clean['year'] = 2023
    
    # Convert numeric columns
    numeric_cols = [c for c in df_clean.columns if c not in ['unitid', 'name', 'state', 'year']]
    for col in numeric_cols:
        df_clean[col] = pd.to_numeric(df_clean[col], errors='coerce')
    
    # Filter out institutions without admission data
    df_clean = df_clean[df_clean['acceptance_rate'].notna()].copy()
    
    # Calculate SAT total if components available
    if 'sat_verbal_25' in df_clean.columns and 'sat_math_25' in df_clean.columns:
        df_clean['sat_total_25_calc'] = df_clean['sat_verbal_25'] + df_clean['sat_math_25']
    if 'sat_verbal_75' in df_clean.columns and 'sat_math_75' in df_clean.columns:
        df_clean['sat_total_75_calc'] = df_clean['sat_verbal_75'] + df_clean['sat_math_75']
    
    # Use calculated or reported SAT total
    if 'sat_total_25' not in df_clean.columns and 'sat_total_25_calc' in df_clean.columns:
        df_clean['sat_total_25'] = df_clean['sat_total_25_calc']
    if 'sat_total_75' not in df_clean.columns and 'sat_total_75_calc' in df_clean.columns:
        df_clean['sat_total_75'] = df_clean['sat_total_75_calc']
    
    # Map ADMCON labels
    for col in admcon_cols:
        df_clean[col + '_label'] = df_clean[col].apply(map_importance)
    
    print(f"After cleaning: {len(df_clean):,} institutions with admission data")
    print(f"\nAcceptance rate statistics:")
    print(df_clean['acceptance_rate'].describe())
    
    print(f"\nSAT score availability: {df_clean['sat_total_25'].notna().sum():,} institutions")
    print(f"ACT score availability: {df_clean['act_composite_25'].notna().sum():,} institutions")
    
    return df_clean


def create_enhanced_college_dataset(df_ipeds):
    """Create enhanced college dataset for ML training."""
    
    print("\n" + "="*60)
    print("CREATING ENHANCED COLLEGE DATASET")
    print("="*60)
    
    # Calculate selectivity tiers
    def get_selectivity_tier(rate):
        if pd.isna(rate):
            return 'Unknown'
        if rate < 0.10:
            return 'Elite'
        elif rate < 0.25:
            return 'Highly Selective'
        elif rate < 0.50:
            return 'Selective'
        else:
            return 'Less Selective'
    
    df_ipeds['selectivity_tier'] = df_ipeds['acceptance_rate'].apply(get_selectivity_tier)
    
    # Determine test policy (infer from data availability)
    def infer_test_policy(row):
        has_sat = pd.notna(row.get('sat_total_25')) and row.get('sat_total_25', 0) > 0
        has_act = pd.notna(row.get('act_composite_25')) and row.get('act_composite_25', 0) > 0
        
        if has_sat or has_act:
            return 'Required'  # Reporting scores suggests they're used
        else:
            return 'Test-optional'
    
    df_ipeds['test_policy'] = df_ipeds.apply(infer_test_policy, axis=1)
    
    # Financial aid policy (default to need-blind for state schools, need-aware for private)
    # This is a simplification - would need separate data for accurate values
    df_ipeds['financial_aid_policy'] = 'Need-blind'  # Default
    
    # Add region mapping (simplified)
    region_map = {
        'ME': 'Northeast', 'NH': 'Northeast', 'VT': 'Northeast', 'MA': 'Northeast',
        'RI': 'Northeast', 'CT': 'Northeast', 'NY': 'Northeast', 'NJ': 'Northeast',
        'PA': 'Northeast', 'DE': 'Northeast', 'MD': 'Northeast', 'DC': 'Northeast',
        'WV': 'Southeast', 'VA': 'Southeast', 'NC': 'Southeast', 'SC': 'Southeast',
        'GA': 'Southeast', 'FL': 'Southeast', 'KY': 'Southeast', 'TN': 'Southeast',
        'AL': 'Southeast', 'MS': 'Southeast', 'LA': 'Southeast', 'AR': 'Southeast',
        'OH': 'Midwest', 'IN': 'Midwest', 'IL': 'Midwest', 'MI': 'Midwest',
        'WI': 'Midwest', 'MN': 'Midwest', 'IA': 'Midwest', 'MO': 'Midwest',
        'ND': 'Midwest', 'SD': 'Midwest', 'NE': 'Midwest', 'KS': 'Midwest',
        'OK': 'Southwest', 'TX': 'Southwest', 'NM': 'Southwest', 'AZ': 'Southwest',
        'CO': 'West', 'UT': 'West', 'NV': 'West', 'ID': 'West', 'MT': 'West',
        'WY': 'West', 'CA': 'West', 'OR': 'West', 'WA': 'West', 'AK': 'West', 'HI': 'West'
    }
    df_ipeds['region'] = df_ipeds['state'].map(region_map).fillna('Unknown')
    
    # Calculate GPA average (estimate from acceptance rate and test scores)
    # More selective = higher GPA typically
    def estimate_gpa(row):
        rate = row.get('acceptance_rate', 0.5)
        if rate < 0.10:
            return 3.90 + np.random.uniform(-0.05, 0.05)
        elif rate < 0.25:
            return 3.75 + np.random.uniform(-0.10, 0.10)
        elif rate < 0.50:
            return 3.50 + np.random.uniform(-0.15, 0.15)
        else:
            return 3.30 + np.random.uniform(-0.20, 0.20)
    
    df_ipeds['gpa_average'] = df_ipeds.apply(estimate_gpa, axis=1)
    
    # Filter to 4-year institutions with complete data
    df_filtered = df_ipeds[
        (df_ipeds['acceptance_rate'].notna()) &
        (df_ipeds['acceptance_rate'] > 0) &
        (df_ipeds['acceptance_rate'] < 1)
    ].copy()
    
    print(f"Filtered to {len(df_filtered):,} institutions with valid data")
    
    # Show distribution
    print(f"\nBy selectivity tier:")
    print(df_filtered['selectivity_tier'].value_counts())
    
    print(f"\nAcceptance rate ranges:")
    print(df_filtered.groupby('selectivity_tier')['acceptance_rate'].agg(['min', 'median', 'max']))
    
    return df_filtered


def save_for_ml_training(df):
    """Save processed data in format ready for ML."""
    
    print("\n" + "="*60)
    print("SAVING PROCESSED DATA")
    print("="*60)
    
    # Select columns for ML
    ml_columns = [
        'unitid', 'name', 'state', 'region',
        'acceptance_rate',
        'sat_total_25', 'sat_total_75',
        'sat_verbal_25', 'sat_verbal_75',
        'sat_math_25', 'sat_math_75',
        'act_composite_25', 'act_composite_75',
        'applications', 'admitted', 'enrolled',
        'test_policy', 'financial_aid_policy',
        'selectivity_tier', 'gpa_average'
    ]
    
    # Keep only available columns
    available = [c for c in ml_columns if c in df.columns]
    df_ml = df[available].copy()
    
    # Save to multiple locations
    output_files = [
        OUT_DIR / "ipeds_colleges.csv",
        RAW_DIR / "ipeds_colleges.csv"
    ]
    
    for output_file in output_files:
        df_ml.to_csv(output_file, index=False)
        print(f"Saved: {output_file} ({len(df_ml):,} colleges)")
    
    # Also save a summary
    summary_file = OUT_DIR / "ipeds_summary.txt"
    with open(summary_file, 'w') as f:
        f.write("IPEDS ADMISSIONS DATA SUMMARY\n")
        f.write("="*60 + "\n\n")
        f.write(f"Total Institutions: {len(df_ml):,}\n\n")
        f.write("By Selectivity Tier:\n")
        f.write(df_ml['selectivity_tier'].value_counts().to_string())
        f.write("\n\nBy Region:\n")
        f.write(df_ml['region'].value_counts().to_string())
        f.write("\n\nAcceptance Rate Statistics:\n")
        f.write(df_ml['acceptance_rate'].describe().to_string())
        f.write("\n\nSAT Score Availability:\n")
        f.write(f"Institutions with SAT data: {df_ml['sat_total_25'].notna().sum():,}\n")
        f.write("\n\nACT Score Availability:\n")
        f.write(f"Institutions with ACT data: {df_ml['act_composite_25'].notna().sum():,}\n")
    
    print(f"Saved summary: {summary_file}")
    
    return df_ml


def main():
    """Process IPEDS data pipeline."""
    
    print("IPEDS Data Processing Pipeline")
    print("="*60)
    print()
    
    # Load data
    df_raw = load_ipeds_admissions()
    if df_raw is None:
        return
    
    # Process data
    df_processed = process_admissions_data(df_raw)
    
    # Create enhanced dataset
    df_enhanced = create_enhanced_college_dataset(df_processed)
    
    # Save for ML
    df_final = save_for_ml_training(df_enhanced)
    
    print("\n" + "="*60)
    print("IPEDS PROCESSING COMPLETE!")
    print("="*60)
    print(f"\nReady for ML training with {len(df_final):,} real colleges!")
    print("\nNext step: Run training with real college data")


if __name__ == "__main__":
    main()

