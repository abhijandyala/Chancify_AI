"""
FINAL PUSH TO 85% ROC-AUC

Advanced techniques:
1. Feature selection (remove weak features)
2. Advanced stacking with feature passthrough
3. Multiple calibration methods
4. Optimized threshold
"""

import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression, RidgeClassifier
from sklearn.ensemble import RandomForestClassifier, VotingClassifier, StackingClassifier, GradientBoostingClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.preprocessing import StandardScaler
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.metrics import roc_auc_score, accuracy_score, brier_score_loss
import xgboost as xgb
import joblib
import json
from datetime import datetime


def main():
    print("="*60)
    print("FINAL PUSH TO 85% ROC-AUC")
    print("="*60)
    print("Using 345 real colleges, 10,620 samples")
    print("Advanced feature selection + stacking")
    print()
    
    # Load training data
    df = pd.read_csv('data/processed/training_data_real_all.csv')
    print(f"Loaded {len(df):,} samples")
    
    metadata_cols = ['college_name', 'acceptance_rate', 'selectivity_tier', 
                    'formula_probability', 'final_probability', 'outcome', 'profile_strength']
    feature_cols = [col for col in df.columns if col not in metadata_cols]
    
    X = df[feature_cols].values
    y = df['outcome'].values
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    
    print(f"Train: {len(X_train):,}, Test: {len(X_test):,}")
    
    # === FEATURE SELECTION ===
    print("\n" + "="*60)
    print("FEATURE SELECTION")
    print("="*60)
    
    # Select top 45 features (remove weaker ones)
    selector = SelectKBest(score_func=f_classif, k=45)
    X_train_selected = selector.fit_transform(X_train, y_train)
    X_test_selected = selector.transform(X_test)
    
    selected_indices = selector.get_support(indices=True)
    selected_features = [feature_cols[i] for i in selected_indices]
    
    print(f"Selected {len(selected_features)} best features")
    print("Top 10:")
    scores = selector.scores_[selected_indices]
    top_10_idx = np.argsort(scores)[-10:][::-1]
    for idx in top_10_idx:
        print(f"  {selected_features[idx]}: {scores[idx]:.2f}")
    
    # Scale
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train_selected)
    X_test_scaled = scaler.transform(X_test_selected)
    
    # === ADVANCED STACKING ===
    print("\n" + "="*60)
    print("ADVANCED STACKING ENSEMBLE")
    print("="*60)
    
    # Level 0: Diverse base models
    base_models = [
        ('lr1', LogisticRegression(C=0.1, max_iter=2000, random_state=42)),
        ('lr2', LogisticRegression(C=0.5, max_iter=2000, random_state=43)),
        ('lr3', LogisticRegression(C=2.0, max_iter=2000, random_state=44)),
        ('rf', RandomForestClassifier(n_estimators=300, max_depth=15, random_state=42, n_jobs=-1)),
        ('xgb', xgb.XGBClassifier(n_estimators=300, max_depth=5, learning_rate=0.02, random_state=42)),
        ('gb', GradientBoostingClassifier(n_estimators=200, max_depth=4, learning_rate=0.05, random_state=42))
    ]
    
    # Level 1: Meta-learner
    meta_learner = LogisticRegression(C=0.5, random_state=42)
    
    # Stacking with passthrough (use original features too)
    stacked = StackingClassifier(
        estimators=base_models,
        final_estimator=meta_learner,
        cv=5,
        passthrough=True,  # Pass original features to meta-learner
        n_jobs=-1
    )
    
    print("Training 6 base models + meta-learner with 5-fold CV...")
    print("This may take a minute...")
    
    stacked.fit(X_train_scaled, y_train)
    
    # Calibrate the stacked model
    stacked_calibrated = CalibratedClassifierCV(stacked, method='isotonic', cv=3)
    stacked_calibrated.fit(X_train_scaled, y_train)
    
    y_pred = stacked_calibrated.predict_proba(X_test_scaled)[:, 1]
    
    acc = accuracy_score(y_test, (y_pred > 0.5).astype(int))
    auc = roc_auc_score(y_test, y_pred)
    brier = brier_score_loss(y_test, y_pred)
    
    print("\n" + "="*60)
    print("RESULTS")
    print("="*60)
    print(f"Accuracy:    {acc:.4f} ({acc:.1%})")
    print(f"ROC-AUC:     {auc:.4f}")
    print(f"Brier Score: {brier:.4f}")
    
    print("\n" + "="*60)
    print("PROGRESSION TO 85%")
    print("="*60)
    print("Iteration 0 (synthetic, 1K):   0.7812")
    print("Iteration 1 (synthetic, 5K):   0.8079")
    print("Iteration 2 (real, 100 colleges): 0.8144")
    print("Iteration 3 (real, 345 colleges): 0.8156")
    print(f"FINAL (advanced stacking):     {auc:.4f}")
    print()
    
    if auc >= 0.85:
        print("*** TARGET ACHIEVED! ROC-AUC >= 0.85 ***")
    else:
        gap = 0.85 - auc
        print(f"Gap to 85%: {gap:.4f} ({gap/0.85*100:.1f}%)")
        print("\nTo reach 85%+, we need:")
        print("  1. Real applicant outcomes (not synthetic)")
        print("  2. More features (essay quality, rec strength)")
        print("  3. Per-college fine-tuning")
    
    # Save best model
    output_path = Path('data/models')
    joblib.dump(stacked_calibrated, output_path / 'ensemble.joblib')
    joblib.dump(scaler, output_path / 'scaler.joblib')
    joblib.dump(selector, output_path / 'feature_selector.joblib')
    
    metadata = {
        'training_date': datetime.now().isoformat(),
        'version': '6.0_advanced_stacking',
        'data_source': 'IPEDS 2023 (345 colleges)',
        'num_colleges': 345,
        'num_samples': len(df),
        'num_features_selected': len(selected_features),
        'selected_features': selected_features,
        'metrics': {
            'ensemble': {
                'accuracy': float(acc),
                'roc_auc': float(auc),
                'brier_score': float(brier)
            }
        },
        'best_roc_auc': float(auc)
    }
    
    with open(output_path / 'metadata.json', 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print("\nModels saved!")
    print("="*60)
    
    return auc


if __name__ == "__main__":
    final_auc = main()
    print(f"\nFINAL ROC-AUC: {final_auc:.4f}")

