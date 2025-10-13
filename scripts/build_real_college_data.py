"""
Build real college dataset from IPEDS data.

Strategy:
1. Load ADM2023 (admissions stats)
2. Calculate admission rates
3. Extract test score ranges
4. Create enhanced college profiles
5. Generate MUCH better training data with real statistics
"""

import pandas as pd
import numpy as np
from pathlib import Path
import sys

sys.path.append(str(Path(__file__).parent.parent / "backend"))

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATASETS_DIR = PROJECT_ROOT / "Datasets"
BACKEND_DATA = PROJECT_ROOT / "backend" / "data"

# Ensure directories exist
(BACKEND_DATA / "raw").mkdir(parents=True, exist_ok=True)
(BACKEND_DATA / "processed").mkdir(parents=True, exist_ok=True)


def load_and_process_ipeds():
    """Load IPEDS ADM 2023 data and calculate admission rates."""
    
    print("="*60)
    print("LOADING IPEDS ADM 2023")
    print("="*60)
    
    adm_file = DATASETS_DIR / "adm2023.csv"
    
    df = pd.read_csv(adm_file, low_memory=False, encoding='latin1')
    df.columns = [c.strip().upper() for c in df.columns]  # Keep uppercase to match IPEDS
    
    print(f"Loaded {len(df):,} institutions")
    
    # Calculate admission rate
    df['ADM_RATE'] = pd.to_numeric(df['ADMSSN'], errors='coerce') / pd.to_numeric(df['APPLCN'], errors='coerce')
    
    # Filter to institutions with admission data
    df_with_admissions = df[
        (df['APPLCN'].notna()) &
        (df['ADMSSN'].notna()) &
        (pd.to_numeric(df['APPLCN'], errors='coerce') > 0)
    ].copy()
    
    print(f"Institutions with admission data: {len(df_with_admissions):,}")
    
    # Show distribution
    print(f"\nAdmission rate distribution:")
    print(df_with_admissions['ADM_RATE'].describe())
    
    return df_with_admissions


def create_college_profiles(df):
    """Create college profiles for ML training."""
    
    print("\n" + "="*60)
    print("CREATING COLLEGE PROFILES")
    print("="*60)
    
    # Create clean dataframe
    colleges = pd.DataFrame()
    
    colleges['unitid'] = df['UNITID']
    colleges['applications'] = pd.to_numeric(df['APPLCN'], errors='coerce')
    colleges['admitted'] = pd.to_numeric(df['ADMSSN'], errors='coerce')
    colleges['enrolled'] = pd.to_numeric(df['ENRLT'], errors='coerce')
    colleges['acceptance_rate'] = df['ADM_RATE']
    
    # SAT scores
    colleges['sat_verbal_25'] = pd.to_numeric(df['SATVR25'], errors='coerce')
    colleges['sat_verbal_75'] = pd.to_numeric(df['SATVR75'], errors='coerce')
    colleges['sat_math_25'] = pd.to_numeric(df['SATMT25'], errors='coerce')
    colleges['sat_math_75'] = pd.to_numeric(df['SATMT75'], errors='coerce')
    
    # Calculate SAT total
    colleges['sat_total_25'] = colleges['sat_verbal_25'] + colleges['sat_math_25']
    colleges['sat_total_75'] = colleges['sat_verbal_75'] + colleges['sat_math_75']
    
    # ACT scores
    colleges['act_composite_25'] = pd.to_numeric(df['ACTCM25'], errors='coerce')
    colleges['act_composite_75'] = pd.to_numeric(df['ACTCM75'], errors='coerce')
    colleges['act_english_25'] = pd.to_numeric(df['ACTEN25'], errors='coerce')
    colleges['act_english_75'] = pd.to_numeric(df['ACTEN75'], errors='coerce')
    colleges['act_math_25'] = pd.to_numeric(df['ACTMT25'], errors='coerce')
    colleges['act_math_75'] = pd.to_numeric(df['ACTMT75'], errors='coerce')
    
    # Selectivity tiers
    def get_tier(rate):
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
    
    colleges['selectivity_tier'] = colleges['acceptance_rate'].apply(get_tier)
    
    # Test policy (infer from score reporting)
    def infer_test_policy(row):
        has_sat = pd.notna(row['sat_total_25']) and row['sat_total_25'] > 0
        has_act = pd.notna(row['act_composite_25']) and row['act_composite_25'] > 0
        return 'Required' if (has_sat or has_act) else 'Test-optional'
    
    colleges['test_policy'] = colleges.apply(infer_test_policy, axis=1)
    colleges['financial_aid_policy'] = 'Need-blind'  # Default
    
    # Estimate GPA average based on selectivity
    def estimate_gpa(tier):
        gpa_map = {
            'Elite': np.random.uniform(3.88, 3.98),
            'Highly Selective': np.random.uniform(3.70, 3.90),
            'Selective': np.random.uniform(3.50, 3.75),
            'Less Selective': np.random.uniform(3.00, 3.60),
            'Unknown': 3.50
        }
        return gpa_map.get(tier, 3.50)
    
    colleges['gpa_average'] = colleges['selectivity_tier'].apply(estimate_gpa)
    
    # Filter out invalid data
    colleges_clean = colleges[
        (colleges['acceptance_rate'].notna()) &
        (colleges['acceptance_rate'] > 0) &
        (colleges['acceptance_rate'] <= 1.0) &
        (colleges['applications'] >= 100)  # Minimum application threshold
    ].copy()
    
    print(f"Valid colleges: {len(colleges_clean):,}")
    print(f"\nBy selectivity tier:")
    print(colleges_clean['selectivity_tier'].value_counts())
    
    print(f"\nSAT data available: {colleges_clean['sat_total_25'].notna().sum():,}")
    print(f"ACT data available: {colleges_clean['act_composite_25'].notna().sum():,}")
    
    return colleges_clean


def sample_diverse_colleges(df, n_samples=100):
    """Sample a diverse set of colleges for training."""
    
    print("\n" + "="*60)
    print(f"SAMPLING {n_samples} DIVERSE COLLEGES")
    print("="*60)
    
    sampled = []
    
    # Sample from each tier
    tiers = {
        'Elite': 15,
        'Highly Selective': 25,
        'Selective': 35,
        'Less Selective': 25
    }
    
    for tier, count in tiers.items():
        tier_colleges = df[df['selectivity_tier'] == tier]
        
        if len(tier_colleges) >= count:
            # Sample with preference for colleges with complete data
            tier_colleges = tier_colleges.copy()
            tier_colleges['data_completeness'] = (
                tier_colleges['sat_total_25'].notna().astype(int) +
                tier_colleges['act_composite_25'].notna().astype(int)
            )
            tier_colleges = tier_colleges.sort_values('data_completeness', ascending=False)
            sample = tier_colleges.head(count * 2).sample(n=count, random_state=42)
            sampled.append(sample)
            print(f"{tier}: {count} colleges")
        else:
            print(f"{tier}: Only {len(tier_colleges)} available (wanted {count})")
            sampled.append(tier_colleges)
    
    result = pd.concat(sampled, ignore_index=True)
    
    print(f"\nTotal sampled: {len(result)} colleges")
    print(f"Acceptance rate range: {result['acceptance_rate'].min():.1%} - {result['acceptance_rate'].max():.1%}")
    
    return result


def main():
    """Main processing pipeline."""
    
    # Load IPEDS data
    df_raw = load_and_process_ipeds()
    
    # Create college profiles
    df_colleges = create_college_profiles(df_raw)
    
    # Sample diverse set
    df_sample = sample_diverse_colleges(df_colleges, n_samples=100)
    
    # Save full dataset
    output_full = BACKEND_DATA / "processed" / "ipeds_all_colleges.csv"
    df_colleges.to_csv(output_full, index=False)
    print(f"\nSaved full dataset: {output_full} ({len(df_colleges):,} colleges)")
    
    # Save sampled dataset for training
    output_sample = BACKEND_DATA / "raw" / "real_colleges_100.csv"
    df_sample.to_csv(output_sample, index=False)
    print(f"Saved training sample: {output_sample} ({len(df_sample)} colleges)")
    
    print("\n" + "="*60)
    print("SUCCESS! Real college data ready")
    print("="*60)
    print(f"\nNow you have:")
    print(f"  1. {len(df_colleges):,} total colleges (ipeds_all_colleges.csv)")
    print(f"  2. {len(df_sample)} sampled colleges (real_colleges_100.csv)")
    print(f"\nNext: Generate training data from real colleges!")
    

if __name__ == "__main__":
    main()

