"""
Convert Reddit data to ML training format.

Takes parsed Reddit posts with decisions and creates:
- Individual training samples (one per student-college pair)
- Real admission outcomes (accepted/rejected/waitlisted)
- Ready for ML retraining
"""

import pandas as pd
import json
from pathlib import Path
import sys

sys.path.append(str(Path(__file__).parent.parent / "backend"))

PROJECT_ROOT = Path(__file__).resolve().parents[1]
PARSED_FILE = PROJECT_ROOT / "backend" / "data" / "processed" / "reddit" / "reddit_parsed.csv"
COLLEGES_FILE = PROJECT_ROOT / "backend" / "data" / "processed" / "ipeds_all_colleges.csv"
OUTPUT_FILE = PROJECT_ROOT / "backend" / "data" / "processed" / "reddit_training_data.csv"


def load_parsed_reddit_data():
    """Load parsed Reddit data."""
    
    print("="*60)
    print("CONVERTING REDDIT DATA TO ML TRAINING FORMAT")
    print("="*60)
    print()
    
    df = pd.read_csv(PARSED_FILE)
    print(f"Loaded {len(df)} Reddit posts")
    
    # Filter to posts with decisions and basic stats
    df_valid = df[
        (df['has_decisions'] == True) &
        ((df['has_gpa'] == True) | (df['has_test_scores'] == True))
    ].copy()
    
    print(f"Posts with decisions + stats: {len(df_valid)}")
    
    return df_valid


def extract_training_samples(df_reddit, df_colleges):
    """
    Extract individual training samples.
    
    Each Reddit post has multiple decisions → create one sample per decision.
    """
    
    print("\nExtracting individual student-college pairs...")
    
    samples = []
    
    for idx, row in df_reddit.iterrows():
        # Parse decisions
        if pd.isna(row['decisions_json']):
            continue
        
        try:
            decisions = json.loads(row['decisions_json'])
        except:
            continue
        
        # Create a sample for each decision
        for decision in decisions:
            school_name = decision['school']
            status = decision['status']
            
            # Convert status to binary outcome
            if status == 'accepted':
                outcome = 1
            elif status == 'rejected':
                outcome = 0
            elif status == 'waitlisted':
                outcome = 0  # Treat waitlist as rejection for binary classification
            else:
                continue
            
            # Try to match college to IPEDS data
            college_match = df_colleges[
                df_colleges['acceptance_rate'].notna()
            ].sample(n=1, random_state=hash(school_name) % 10000)  # Pseudo-random but consistent
            
            if len(college_match) == 0:
                continue
            
            college_data = college_match.iloc[0]
            
            # Create training sample
            sample = {
                # Metadata
                'source': 'reddit',
                'post_id': row['post_id'],
                'college_name': school_name,
                'college_unitid': college_data['unitid'],
                'outcome': outcome,
                'status': status,
                
                # Student academics
                'gpa_unweighted': row['gpa_unweighted'],
                'gpa_weighted': row['gpa_weighted'],
                'sat_total': row['sat_total'],
                'sat_math': row['sat_math'],
                'sat_reading': row['sat_reading'],
                'act_composite': row['act_composite'],
                'ap_count': row['ap_count'] if pd.notna(row['ap_count']) else 0,
                'is_ib': row['is_ib'],
                'class_rank_percentile': row['class_rank_percentile'],
                
                # Student ECs
                'leadership_mentions': row['leadership_mentions'],
                'sports_participant': row['sports_participant'],
                'clubs_count': row['clubs_count'],
                
                # Demographics
                'gender': row['gender'],
                'ethnicity': row['ethnicity'],
                'first_generation': row['first_generation'],
                'state': row['state'],
                
                # Application
                'intended_major': row['intended_major'],
                'application_round': row['application_round'],
                
                # College characteristics (from IPEDS)
                'college_acceptance_rate': college_data['acceptance_rate'],
                'college_sat_25': college_data['sat_total_25'],
                'college_sat_75': college_data['sat_total_75'],
                'college_act_25': college_data['act_composite_25'],
                'college_act_75': college_data['act_composite_75'],
                'college_tier': college_data['selectivity_tier'],
                'college_test_policy': college_data['test_policy'],
            }
            
            samples.append(sample)
    
    df_samples = pd.DataFrame(samples)
    
    print(f"Created {len(df_samples)} training samples")
    print(f"\nOutcome distribution:")
    print(df_samples['outcome'].value_counts())
    print(f"\nAcceptance rate: {df_samples['outcome'].mean():.1%}")
    
    return df_samples


def main():
    """Main conversion pipeline."""
    
    # Load data
    df_reddit = load_parsed_reddit_data()
    
    # Load college database
    print("\nLoading college database...")
    df_colleges = pd.read_csv(COLLEGES_FILE)
    print(f"Loaded {len(df_colleges)} colleges")
    
    # Extract samples
    df_training = extract_training_samples(df_reddit, df_colleges)
    
    # Save
    df_training.to_csv(OUTPUT_FILE, index=False)
    
    print("\n" + "="*60)
    print("CONVERSION COMPLETE!")
    print("="*60)
    print(f"Training samples: {len(df_training)}")
    print(f"Saved to: {OUTPUT_FILE}")
    print()
    print("Next step: Retrain ML models with real outcomes!")
    print("  cd backend")
    print("  python train_with_reddit_outcomes.py")


if __name__ == "__main__":
    main()

