"""
Generate synthetic training data for ML model.
"""

from ml.training.synthetic_data import generate_initial_dataset

if __name__ == "__main__":
    print("Generating training data from initial colleges...")
    
    df = generate_initial_dataset(
        colleges_csv_path="data/raw/initial_colleges.csv",
        output_path="data/processed/training_data.csv",
        samples_per_college=100,
        random_seed=42
    )
    
    print("\n" + "="*60)
    print("Training Data Summary:")
    print("="*60)
    print(f"Total samples: {len(df)}")
    print(f"\nAcceptance rate: {df['outcome'].mean():.1%}")
    print(f"\nBy selectivity tier:")
    print(df.groupby('selectivity_tier')['outcome'].agg(['count', 'mean']))
    print(f"\nBy profile strength:")
    print(df.groupby('profile_strength')['outcome'].agg(['count', 'mean']))
    print("\nData generation complete!")

