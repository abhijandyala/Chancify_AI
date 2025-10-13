"""
Train ML models for Chancify AI.
"""

from ml.training.train_models import train_initial_models

if __name__ == "__main__":
    print("="*60)
    print("CHANCIFY AI - ML MODEL TRAINING")
    print("="*60)
    
    results = train_initial_models(
        training_data_path='data/processed/training_data.csv',
        output_dir='data/models',
        test_size=0.2,
        random_state=42
    )
    
    print("\n" + "="*60)
    print("TRAINING COMPLETE!")
    print("="*60)
    print("\nNext steps:")
    print("1. Models saved to data/models/")
    print("2. Ready to integrate with API")
    print("3. Test with real predictions")

