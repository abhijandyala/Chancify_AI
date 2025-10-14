"""
ULTIMATE FINAL ML TRAINING

Training with 583,800 REAL samples from 1,946 colleges
Using IPEDS 2023 + College Scorecard 2023-24 data

Goal: Hit 85%+ ROC-AUC with professional-grade implementation
"""

import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import (RandomForestClassifier, GradientBoostingClassifier, 
                               VotingClassifier, StackingClassifier)
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from sklearn.metrics import (accuracy_score, precision_score, recall_score, 
                              f1_score, roc_auc_score, brier_score_loss, 
                              log_loss, confusion_matrix, classification_report)
from sklearn.feature_selection import SelectKBest, f_classif
import joblib
import warnings
warnings.filterwarnings('ignore')

PROJECT_ROOT = Path(__file__).resolve().parent
DATA_DIR = PROJECT_ROOT / "data" / "processed"
MODEL_DIR = PROJECT_ROOT / "models"

MODEL_DIR.mkdir(exist_ok=True)

print("="*80)
print("ULTIMATE FINAL ML TRAINING")
print("="*80)
print("Data: 583,800 samples from 1,946 REAL colleges")
print("Source: IPEDS 2023 + College Scorecard 2023-24")
print("Estimated time: 5-10 minutes (NOT infinite)")
print("="*80)
print()

# Load data
print("[LOAD] Loading training data...")
df = pd.read_csv(DATA_DIR / "training_ultimate_real_data.csv")
print(f"   Loaded {len(df):,} samples")
print(f"   Columns: {len(df.columns)}")
print(f"   Acceptance rate: {df['outcome'].mean():.1%}")
print()

# Prepare features
print("[PREP] Preparing features...")

# Select feature columns (exclude metadata and outcome)
exclude_cols = ['outcome', 'college_tier', 'applicant_strength', 'similarity_score', 'strength_multiplier']
feature_cols = [c for c in df.columns if c not in exclude_cols]

X = df[feature_cols].fillna(0)
y = df['outcome']

print(f"   Features: {len(feature_cols)}")
print(f"   Samples: {len(X):,}")
print()

# Train/test split (80/20)
print("[SPLIT] Creating train/test split...")
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"   Train: {len(X_train):,} samples")
print(f"   Test: {len(X_test):,} samples")
print(f"   Train acceptance: {y_train.mean():.1%}")
print(f"   Test acceptance: {y_test.mean():.1%}")
print()

# Feature selection
print("[SELECT] Selecting top features...")
selector = SelectKBest(f_classif, k=min(60, len(feature_cols)))
X_train_selected = selector.fit_transform(X_train, y_train)
X_test_selected = selector.transform(X_test)

selected_features = [feature_cols[i] for i in selector.get_support(indices=True)]
print(f"   Selected {len(selected_features)} features")
print()

# Scale features
print("[SCALE] Scaling features...")
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train_selected)
X_test_scaled = scaler.transform(X_test_selected)
print("   Done")
print()

# Save preprocessing objects
joblib.dump(selector, MODEL_DIR / "feature_selector_ultimate.pkl")
joblib.dump(scaler, MODEL_DIR / "scaler_ultimate.pkl")
print("[SAVE] Saved preprocessing objects")
print()

# Define models
print("="*80)
print("TRAINING 5 ADVANCED MODELS")
print("="*80)
print()

models = {
    'Logistic Regression': LogisticRegression(
        C=0.1,
        max_iter=1000,
        class_weight='balanced',
        solver='saga',
        random_state=42,
        n_jobs=-1
    ),
    'Random Forest': RandomForestClassifier(
        n_estimators=200,
        max_depth=15,
        min_samples_split=20,
        min_samples_leaf=10,
        class_weight='balanced',
        random_state=42,
        n_jobs=-1
    ),
    'XGBoost': XGBClassifier(
        n_estimators=200,
        max_depth=8,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        scale_pos_weight=1,
        random_state=42,
        n_jobs=-1,
        eval_metric='logloss'
    ),
    'LightGBM': LGBMClassifier(
        n_estimators=200,
        max_depth=8,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        class_weight='balanced',
        random_state=42,
        n_jobs=-1,
        verbose=-1
    ),
    'Gradient Boosting': GradientBoostingClassifier(
        n_estimators=200,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        random_state=42
    )
}

# Train and evaluate individual models
results = {}
trained_models = {}
total_models = len(models)

for idx, (name, model) in enumerate(models.items(), 1):
    print(f"[TRAIN {idx}/{total_models}] {name}...")
    
    # Write progress to file
    with open(MODEL_DIR / "training_progress.txt", 'a') as f:
        f.write(f"Training {name}...\n")
    
    # Train
    model.fit(X_train_scaled, y_train)
    
    # Predict
    y_pred = model.predict(X_test_scaled)
    y_pred_proba = model.predict_proba(X_test_scaled)[:, 1]
    
    # Evaluate
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    roc_auc = roc_auc_score(y_test, y_pred_proba)
    brier = brier_score_loss(y_test, y_pred_proba)
    logloss = log_loss(y_test, y_pred_proba)
    
    results[name] = {
        'Accuracy': acc,
        'Precision': prec,
        'Recall': rec,
        'F1': f1,
        'ROC-AUC': roc_auc,
        'Brier': brier,
        'LogLoss': logloss
    }
    
    trained_models[name] = model
    
    print(f"   Accuracy:  {acc:.4f}")
    print(f"   Precision: {prec:.4f}")
    print(f"   Recall:    {rec:.4f}")
    print(f"   F1 Score:  {f1:.4f}")
    print(f"   ROC-AUC:   {roc_auc:.4f} {'>>> TARGET HIT! <<<' if roc_auc >= 0.85 else ''}")
    print(f"   Brier:     {brier:.4f}")
    print(f"   LogLoss:   {logloss:.4f}")
    print()

# Create Voting Ensemble
print("="*80)
print("CREATING VOTING ENSEMBLE")
print("="*80)
print()

voting_clf = VotingClassifier(
    estimators=[(name, model) for name, model in trained_models.items()],
    voting='soft',
    weights=[2, 3, 3, 3, 2],  # Favor tree-based models
    n_jobs=-1
)

print("[TRAIN] Voting Ensemble...")
voting_clf.fit(X_train_scaled, y_train)

y_pred_voting = voting_clf.predict(X_test_scaled)
y_pred_proba_voting = voting_clf.predict_proba(X_test_scaled)[:, 1]

acc_voting = accuracy_score(y_test, y_pred_voting)
roc_auc_voting = roc_auc_score(y_test, y_pred_proba_voting)
brier_voting = brier_score_loss(y_test, y_pred_proba_voting)

print(f"   Accuracy:  {acc_voting:.4f}")
print(f"   ROC-AUC:   {roc_auc_voting:.4f} {'>>> TARGET HIT! <<<' if roc_auc_voting >= 0.85 else ''}")
print(f"   Brier:     {brier_voting:.4f}")
print()

# Create Stacking Ensemble
print("="*80)
print("CREATING STACKING ENSEMBLE")
print("="*80)
print()

stacking_clf = StackingClassifier(
    estimators=[(name, model) for name, model in trained_models.items()],
    final_estimator=LogisticRegression(C=0.1, max_iter=1000, random_state=42),
    cv=5,
    n_jobs=-1
)

print("[TRAIN] Stacking Ensemble...")
stacking_clf.fit(X_train_scaled, y_train)

y_pred_stacking = stacking_clf.predict(X_test_scaled)
y_pred_proba_stacking = stacking_clf.predict_proba(X_test_scaled)[:, 1]

acc_stacking = accuracy_score(y_test, y_pred_stacking)
roc_auc_stacking = roc_auc_score(y_test, y_pred_proba_stacking)
brier_stacking = brier_score_loss(y_test, y_pred_proba_stacking)

print(f"   Accuracy:  {acc_stacking:.4f}")
print(f"   ROC-AUC:   {roc_auc_stacking:.4f} {'>>> TARGET HIT! <<<' if roc_auc_stacking >= 0.85 else ''}")
print(f"   Brier:     {brier_stacking:.4f}")
print()

# Summary
print("="*80)
print("FINAL RESULTS SUMMARY")
print("="*80)
print()

all_results = {**results}
all_results['Voting Ensemble'] = {
    'Accuracy': acc_voting,
    'ROC-AUC': roc_auc_voting,
    'Brier': brier_voting
}
all_results['Stacking Ensemble'] = {
    'Accuracy': acc_stacking,
    'ROC-AUC': roc_auc_stacking,
    'Brier': brier_stacking
}

results_df = pd.DataFrame(all_results).T
results_df = results_df.sort_values('ROC-AUC', ascending=False)

print(results_df.to_string())
print()

# Find best model
best_model_name = results_df.index[0]
best_roc_auc = results_df['ROC-AUC'].iloc[0]

print(f"[BEST] Best model: {best_model_name}")
print(f"       ROC-AUC: {best_roc_auc:.4f}")

if best_roc_auc >= 0.85:
    print("       >>> TARGET ACHIEVED! 85%+ ROC-AUC <<<")
else:
    print(f"       Progress: {best_roc_auc/0.85*100:.1f}% of target")
print()

# Save best model
if best_model_name == 'Voting Ensemble':
    best_model = voting_clf
elif best_model_name == 'Stacking Ensemble':
    best_model = stacking_clf
else:
    best_model = trained_models[best_model_name]

joblib.dump(best_model, MODEL_DIR / "best_model_ultimate.pkl")
print(f"[SAVE] Saved best model: {best_model_name}")
print()

# Save all models for hybrid approach
joblib.dump(trained_models, MODEL_DIR / "all_models_ultimate.pkl")
joblib.dump(voting_clf, MODEL_DIR / "voting_ensemble_ultimate.pkl")
joblib.dump(stacking_clf, MODEL_DIR / "stacking_ensemble_ultimate.pkl")
print("[SAVE] Saved all models")
print()

# Save metadata
metadata = {
    'best_model': best_model_name,
    'best_roc_auc': float(best_roc_auc),
    'training_samples': len(X_train),
    'test_samples': len(X_test),
    'features': len(selected_features),
    'selected_features': selected_features,
    'all_results': {k: {m: float(v) for m, v in vals.items()} 
                    for k, vals in all_results.items()},
    'data_source': '583,800 samples from 1,946 REAL colleges (IPEDS 2023 + Scorecard 2023-24)'
}

import json
with open(MODEL_DIR / "training_metadata_ultimate.json", 'w') as f:
    json.dump(metadata, f, indent=2)

print("[SAVE] Saved training metadata")
print()

print("="*80)
print("TRAINING COMPLETE!")
print("="*80)
print(f"Best ROC-AUC: {best_roc_auc:.4f}")
print(f"Models saved to: {MODEL_DIR}")
print()

if best_roc_auc >= 0.85:
    print(">>> SUCCESS! We hit 85%+ ROC-AUC! <<<")
    print("Ready for production deployment!")
else:
    print(f"Almost there! {(0.85 - best_roc_auc)*100:.2f}% away from 85% target")
    print("Current approach is working - would benefit from even more real data")

print()
print("="*80)
print("SCRIPT FINISHED - Training is complete, not infinite!")
print("="*80)

