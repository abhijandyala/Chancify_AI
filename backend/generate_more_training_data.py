"""
Generate MORE training data for better ML performance.
"""

from ml.training.synthetic_data import generate_initial_dataset

if __name__ == "__main__":
    print("="*60)
    print("GENERATING ENHANCED TRAINING DATA")
    print("="*60)
    print("Strategy: 5x more samples per college")
    print("Target: 5,000 total samples (500 per college)")
    print()
    
    df = generate_initial_dataset(
        colleges_csv_path="data/raw/initial_colleges.csv",
        output_path="data/processed/training_data_large.csv",
        samples_per_college=500,  # 5x increase!
        random_seed=42
    )
    
    print("\n" + "="*60)
    print("ENHANCED TRAINING DATA SUMMARY")
    print("="*60)
    print(f"Total samples: {len(df)}")
    print(f"\nAcceptance rate: {df['outcome'].mean():.1%}")
    print(f"\nBy selectivity tier:")
    print(df.groupby('selectivity_tier')['outcome'].agg(['count', 'mean']))
    print(f"\nBy profile strength:")
    print(df.groupby('profile_strength')['outcome'].agg(['count', 'mean']))
    print("\n" + "="*60)
    print("Ready for improved training!")
    print("="*60)

