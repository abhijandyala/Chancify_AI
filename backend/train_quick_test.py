"""
QUICK TEST - Train with smaller subset to verify everything works
Then we'll run the full training
"""

import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, roc_auc_score
import joblib

PROJECT_ROOT = Path(__file__).resolve().parent
DATA_DIR = PROJECT_ROOT / "data" / "processed"
MODEL_DIR = PROJECT_ROOT / "models"

MODEL_DIR.mkdir(exist_ok=True)

print("="*80)
print("QUICK TEST - Verify training works")
print("="*80)

# Load data
print("[LOAD] Loading training data...")
df = pd.read_csv(DATA_DIR / "training_ultimate_real_data.csv")
print(f"   Total: {len(df):,} samples")

# Use only 50,000 samples for quick test
df_test = df.sample(n=50000, random_state=42)
print(f"   Using: {len(df_test):,} samples for quick test")

# Prepare features
exclude_cols = ['outcome', 'college_tier', 'applicant_strength', 'similarity_score', 'strength_multiplier']
feature_cols = [c for c in df_test.columns if c not in exclude_cols]

X = df_test[feature_cols].fillna(0)
y = df_test['outcome']

print(f"   Features: {len(feature_cols)}")

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"   Train: {len(X_train):,}, Test: {len(X_test):,}")

# Scale
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train quick model
print("\n[TRAIN] Training Random Forest...")
model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train_scaled, y_train)
print("   Training complete!")

# Evaluate
print("\n[EVAL] Evaluating...")
y_pred = model.predict(X_test_scaled)
y_pred_proba = model.predict_proba(X_test_scaled)[:, 1]

acc = accuracy_score(y_test, y_pred)
roc_auc = roc_auc_score(y_test, y_pred_proba)

print(f"   Accuracy:  {acc:.4f}")
print(f"   ROC-AUC:   {roc_auc:.4f}")

if roc_auc >= 0.80:
    print(f"\n>>> GOOD! ROC-AUC is {roc_auc:.4f} - Ready for full training!")
else:
    print(f"\n   ROC-AUC is {roc_auc:.4f} - Need to investigate")

# Save test model
joblib.dump(model, MODEL_DIR / "test_model.pkl")
print(f"\n[SAVE] Saved test model")

print("\n="*80)
print("TEST COMPLETE - Everything works!")
print("="*80)
print("\nNext: Run full training with all 583,800 samples")
print("   python backend\\train_ultimate_final.py")

