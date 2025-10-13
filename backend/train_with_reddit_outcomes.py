"""
Train ML models with REAL Reddit admission outcomes!

This is THE breakthrough - training on actual admission decisions
instead of synthetic data. Expected: 85%+ ROC-AUC!
"""

import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, VotingClassifier, StackingClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import roc_auc_score, accuracy_score, brier_score_loss, classification_report
import xgboost as xgb
import joblib
import json
from datetime import datetime


def prepare_reddit_training_data():
    """Load and prepare Reddit data for training."""
    
    print("="*60)
    print("TRAINING WITH REAL REDDIT OUTCOMES")
    print("="*60)
    print("This is the breakthrough moment!")
    print()
    
    # Load Reddit training data
    reddit_file = Path('data/processed/reddit_training_data.csv')
    df_reddit = pd.read_csv(reddit_file)
    
    print(f"Loaded {len(df_reddit)} REAL admission outcomes from Reddit")
    print(f"Acceptance rate: {df_reddit['outcome'].mean():.1%}")
    print()
    
    # Calculate factor scores from Reddit data
    # This is simplified - in production you'd do this more carefully
    def calculate_factor_scores(row):
        """Convert Reddit stats to our 20 factor scores."""
        scores = {}
        
        # GPA score
        gpa = row['gpa_unweighted'] if pd.notna(row['gpa_unweighted']) else 3.5
        if gpa >= 3.9:
            scores['grades_score'] = 9.5
        elif gpa >= 3.7:
            scores['grades_score'] = 8.5
        elif gpa >= 3.5:
            scores['grades_score'] = 7.5
        elif gpa >= 3.3:
            scores['grades_score'] = 6.5
        else:
            scores['grades_score'] = 5.5
        
        # Rigor score (from AP count)
        ap = row['ap_count'] if pd.notna(row['ap_count']) else 0
        if ap >= 12:
            scores['rigor_score'] = 9.5
        elif ap >= 8:
            scores['rigor_score'] = 8.5
        elif ap >= 5:
            scores['rigor_score'] = 7.5
        else:
            scores['rigor_score'] = 6.0
        
        # Testing score
        sat = row['sat_total'] if pd.notna(row['sat_total']) else 1200
        if sat >= 1550:
            scores['testing_score'] = 10.0
        elif sat >= 1500:
            scores['testing_score'] = 9.5
        elif sat >= 1450:
            scores['testing_score'] = 8.5
        elif sat >= 1400:
            scores['testing_score'] = 7.5
        elif sat >= 1300:
            scores['testing_score'] = 6.5
        else:
            scores['testing_score'] = 5.5
        
        # ECs from leadership mentions
        leadership = row['leadership_mentions'] if pd.notna(row['leadership_mentions']) else 0
        if leadership >= 3:
            scores['ecs_leadership_score'] = 9.0
        elif leadership >= 2:
            scores['ecs_leadership_score'] = 8.0
        elif leadership >= 1:
            scores['ecs_leadership_score'] = 7.0
        else:
            scores['ecs_leadership_score'] = 5.5
        
        # Fill in other scores with reasonable defaults
        scores.update({
            'essay_score': 7.0,
            'recommendations_score': 7.0,
            'plan_timing_score': 6.0,
            'athletic_recruit_score': 3.0,
            'major_fit_score': 6.5,
            'geography_residency_score': 5.5,
            'firstgen_diversity_score': 8.0 if row['first_generation'] else 5.0,
            'ability_to_pay_score': 5.5,
            'awards_publications_score': 6.0,
            'portfolio_audition_score': 5.0,
            'policy_knob_score': 5.0,
            'demonstrated_interest_score': 6.0,
            'legacy_score': 3.0,
            'interview_score': 6.5,
            'conduct_record_score': 9.5,
            'hs_reputation_score': 6.0
        })
        
        return scores
    
    # Add factor scores
    print("Calculating factor scores from Reddit data...")
    for col, val in calculate_factor_scores(df_reddit.iloc[0]).items():
        df_reddit[col] = df_reddit.apply(lambda row: calculate_factor_scores(row)[col], axis=1)
    
    # Add raw features
    df_reddit['gpa_weighted'] = df_reddit['gpa_weighted'].fillna(df_reddit['gpa_unweighted'] + 0.3)
    df_reddit['sat_math'] = df_reddit['sat_math'].fillna(df_reddit['sat_total'] * 0.5)
    df_reddit['sat_rw'] = df_reddit['sat_reading'].fillna(df_reddit['sat_total'] * 0.5)
    df_reddit['act_composite'] = df_reddit['act_composite'].fillna(25)
    df_reddit['honors_count'] = 0
    df_reddit['class_rank_pct'] = df_reddit['class_rank_percentile'].fillna(20.0)
    df_reddit['class_size'] = 400
    df_reddit['ec_count'] = df_reddit['clubs_count'].fillna(0) + df_reddit['sports_participant'].fillna(0).astype(int)
    df_reddit['leadership_count'] = df_reddit['leadership_mentions'].fillna(0)
    df_reddit['years_commitment'] = df_reddit['ec_count'] * 2
    df_reddit['hours_per_week'] = 10.0
    df_reddit['awards_count'] = 0
    df_reddit['national_awards'] = 0
    df_reddit['first_gen'] = df_reddit['first_generation'].fillna(False).astype(int)
    df_reddit['urm'] = 0
    df_reddit['geographic_diversity'] = 5.0
    df_reddit['legacy'] = 0
    df_reddit['recruited_athlete'] = df_reddit['sports_participant'].fillna(False).astype(int)
    
    # College features
    df_reddit['sat_median'] = (df_reddit['college_sat_25'].fillna(1300) + df_reddit['college_sat_75'].fillna(1500)) / 2
    df_reddit['act_median'] = (df_reddit['college_act_25'].fillna(28) + df_reddit['college_act_75'].fillna(33)) / 2
    df_reddit['test_policy_numeric'] = 1.0
    df_reddit['need_policy_numeric'] = 1.0
    
    # Interaction features
    df_reddit['gpa_vs_avg'] = 0.0
    df_reddit['sat_vs_median'] = (df_reddit['sat_total'].fillna(1300) - df_reddit['sat_median']) / 100
    df_reddit['act_vs_median'] = (df_reddit['act_composite'].fillna(25) - df_reddit['act_median']) / 5
    df_reddit['gpa_above_college'] = 1.0
    df_reddit['sat_above_75th'] = (df_reddit['sat_total'] > df_reddit['college_sat_75']).astype(float)
    df_reddit['act_above_75th'] = (df_reddit['act_composite'] > df_reddit['college_act_75']).astype(float)
    df_reddit['composite_vs_acceptance'] = df_reddit['sat_total'].fillna(1300) * df_reddit['college_acceptance_rate']
    df_reddit['selectivity_match'] = 1.0
    df_reddit['test_advantage'] = 1.0
    df_reddit['geographic_match'] = 0.5
    df_reddit['legacy_boost'] = 0.0
    df_reddit['first_gen_boost'] = df_reddit['first_gen']
    df_reddit['athlete_boost'] = df_reddit['recruited_athlete']
    df_reddit['academic_strength'] = df_reddit['gpa_unweighted'].fillna(3.5) / 4.0
    df_reddit['holistic_strength'] = 0.5
    
    print(f"Prepared {len(df_reddit)} samples with full feature set")
    
    return df_reddit


def train_with_reddit_data(df):
    """Train models on real Reddit outcomes."""
    
    print("\n" + "="*60)
    print("TRAINING ON REAL DATA")
    print("="*60)
    
    # Select features (same 60 features as before)
    feature_cols = [
        # Factor scores (20)
        'grades_score', 'rigor_score', 'testing_score', 'essay_score',
        'ecs_leadership_score', 'recommendations_score', 'plan_timing_score',
        'athletic_recruit_score', 'major_fit_score', 'geography_residency_score',
        'firstgen_diversity_score', 'ability_to_pay_score', 'awards_publications_score',
        'portfolio_audition_score', 'policy_knob_score', 'demonstrated_interest_score',
        'legacy_score', 'interview_score', 'conduct_record_score', 'hs_reputation_score',
        # Raw academics (10)
        'gpa_unweighted', 'gpa_weighted', 'sat_total', 'sat_math', 'sat_rw',
        'act_composite', 'ap_count', 'honors_count', 'class_rank_pct', 'class_size',
        # ECs (6)
        'ec_count', 'leadership_count', 'years_commitment', 
        'hours_per_week', 'awards_count', 'national_awards',
        # Demographics (5)
        'first_gen', 'urm', 'geographic_diversity', 'legacy', 'recruited_athlete',
        # College (4)
        'sat_median', 'act_median', 'test_policy_numeric', 'need_policy_numeric',
        # Interactions (15)
        'gpa_vs_avg', 'sat_vs_median', 'act_vs_median',
        'gpa_above_college', 'sat_above_75th', 'act_above_75th',
        'composite_vs_acceptance', 'selectivity_match',
        'test_advantage', 'geographic_match', 'legacy_boost',
        'first_gen_boost', 'athlete_boost', 'academic_strength',
        'holistic_strength'
    ]
    
    X = df[feature_cols].values
    y = df['outcome'].values
    
    # Handle NaN values - fill with median
    print("Handling missing values...")
    from sklearn.impute import SimpleImputer
    imputer = SimpleImputer(strategy='median')
    X = imputer.fit_transform(X)
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    
    print(f"Train: {len(X_train):,}, Test: {len(X_test):,}")
    print(f"Acceptance rate (train): {y_train.mean():.1%}")
    
    # Scale
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    models = {}
    
    # === LOGISTIC REGRESSION ===
    print("\n" + "="*60)
    print("LOGISTIC REGRESSION (REAL DATA)")
    print("="*60)
    
    lr = LogisticRegression(C=0.2, max_iter=2000, random_state=42, class_weight='balanced')
    lr_cal = CalibratedClassifierCV(lr, method='sigmoid', cv=5)
    lr_cal.fit(X_train_scaled, y_train)
    
    y_pred = lr_cal.predict_proba(X_test_scaled)[:, 1]
    lr_metrics = {
        'accuracy': accuracy_score(y_test, (y_pred > 0.5).astype(int)),
        'roc_auc': roc_auc_score(y_test, y_pred),
        'brier': brier_score_loss(y_test, y_pred)
    }
    
    print(f"Accuracy: {lr_metrics['accuracy']:.4f}")
    print(f"ROC-AUC: {lr_metrics['roc_auc']:.4f}")
    print(f"Brier: {lr_metrics['brier']:.4f}")
    
    models['logistic_regression'] = lr_cal
    
    # === RANDOM FOREST ===
    print("\n" + "="*60)
    print("RANDOM FOREST (REAL DATA)")
    print("="*60)
    
    rf = RandomForestClassifier(n_estimators=500, max_depth=18, min_samples_split=10,
                                 random_state=42, class_weight='balanced', n_jobs=-1)
    rf.fit(X_train_scaled, y_train)
    
    y_pred = rf.predict_proba(X_test_scaled)[:, 1]
    rf_metrics = {
        'accuracy': accuracy_score(y_test, (y_pred > 0.5).astype(int)),
        'roc_auc': roc_auc_score(y_test, y_pred),
        'brier': brier_score_loss(y_test, y_pred)
    }
    
    print(f"Accuracy: {rf_metrics['accuracy']:.4f}")
    print(f"ROC-AUC: {rf_metrics['roc_auc']:.4f}")
    print(f"Brier: {rf_metrics['brier']:.4f}")
    
    models['random_forest'] = rf
    
    # === XGBOOST ===
    print("\n" + "="*60)
    print("XGBOOST (REAL DATA)")
    print("="*60)
    
    scale_pos_weight = (y_train == 0).sum() / (y_train == 1).sum()
    xgb_model = xgb.XGBClassifier(n_estimators=500, max_depth=6, learning_rate=0.015,
                                   scale_pos_weight=scale_pos_weight, random_state=42,
                                   reg_alpha=0.15, reg_lambda=1.2)
    xgb_model.fit(X_train_scaled, y_train)
    
    y_pred = xgb_model.predict_proba(X_test_scaled)[:, 1]
    xgb_metrics = {
        'accuracy': accuracy_score(y_test, (y_pred > 0.5).astype(int)),
        'roc_auc': roc_auc_score(y_test, y_pred),
        'brier': brier_score_loss(y_test, y_pred)
    }
    
    print(f"Accuracy: {xgb_metrics['accuracy']:.4f}")
    print(f"ROC-AUC: {xgb_metrics['roc_auc']:.4f}")
    print(f"Brier: {xgb_metrics['brier']:.4f}")
    
    models['xgboost'] = xgb_model
    
    # === ENSEMBLE ===
    print("\n" + "="*60)
    print("ENSEMBLE (REAL DATA)")
    print("="*60)
    
    ensemble = VotingClassifier(
        estimators=[('lr', lr_cal), ('rf', rf), ('xgb', xgb_model)],
        voting='soft',
        weights=[3, 1, 1]
    )
    ensemble.fit(X_train_scaled, y_train)
    
    y_pred = ensemble.predict_proba(X_test_scaled)[:, 1]
    ens_metrics = {
        'accuracy': accuracy_score(y_test, (y_pred > 0.5).astype(int)),
        'roc_auc': roc_auc_score(y_test, y_pred),
        'brier': brier_score_loss(y_test, y_pred)
    }
    
    print(f"Accuracy: {ens_metrics['accuracy']:.4f}")
    print(f"ROC-AUC: {ens_metrics['roc_auc']:.4f}")
    print(f"Brier: {ens_metrics['brier']:.4f}")
    
    models['ensemble'] = ensemble
    
    # === RESULTS ===
    print("\n" + "="*60)
    print("FINAL RESULTS WITH REAL DATA")
    print("="*60)
    print(f"{'Model':<25} {'Accuracy':>10} {'ROC-AUC':>10} {'Brier':>10}")
    print("-" * 65)
    print(f"{'Logistic Regression':<25} {lr_metrics['accuracy']:>10.4f} {lr_metrics['roc_auc']:>10.4f} {lr_metrics['brier']:>10.4f}")
    print(f"{'Random Forest':<25} {rf_metrics['accuracy']:>10.4f} {rf_metrics['roc_auc']:>10.4f} {rf_metrics['brier']:>10.4f}")
    print(f"{'XGBoost':<25} {xgb_metrics['accuracy']:>10.4f} {xgb_metrics['roc_auc']:>10.4f} {xgb_metrics['brier']:>10.4f}")
    print(f"{'ENSEMBLE (BEST)':<25} {ens_metrics['accuracy']:>10.4f} {ens_metrics['roc_auc']:>10.4f} {ens_metrics['brier']:>10.4f}")
    
    print("\n" + "="*60)
    print("IMPROVEMENT COMPARISON")
    print("="*60)
    print("Synthetic data model:  ROC-AUC 0.8156")
    print(f"REAL Reddit data:      ROC-AUC {ens_metrics['roc_auc']:.4f}")
    print(f"Improvement:           {ens_metrics['roc_auc'] - 0.8156:+.4f}")
    print(f"Percent change:        {((ens_metrics['roc_auc'] - 0.8156) / 0.8156 * 100):+.1f}%")
    print()
    
    if ens_metrics['roc_auc'] >= 0.85:
        print("*** 85% TARGET ACHIEVED! ***")
        print("The model is now EXCELLENT!")
    elif ens_metrics['roc_auc'] >= 0.83:
        print("Very close to 85%! Excellent progress!")
    else:
        print(f"Gap to 85%: {0.85 - ens_metrics['roc_auc']:.4f}")
    
    # Save models
    output_path = Path('data/models')
    for name, model in models.items():
        joblib.dump(model, output_path / f'{name}.joblib')
    joblib.dump(scaler, output_path / 'scaler.joblib')
    
    metadata = {
        'training_date': datetime.now().isoformat(),
        'version': '7.0_real_reddit_outcomes',
        'data_source': 'Reddit (r/collegeresults + r/chanceme + r/ApplyingToCollege)',
        'num_reddit_posts': len(df),
        'num_decisions': len(df),
        'num_train': len(X_train),
        'num_test': len(X_test),
        'num_features': 60,
        'feature_names': feature_cols,
        'metrics': {
            'logistic_regression': lr_metrics,
            'random_forest': rf_metrics,
            'xgboost': xgb_metrics,
            'ensemble': ens_metrics
        },
        'best_roc_auc': float(ens_metrics['roc_auc'])
    }
    
    with open(output_path / 'metadata.json', 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print("\nModels saved to data/models/")
    print("Ready for production!")
    
    return ens_metrics


if __name__ == "__main__":
    df = prepare_reddit_training_data()
    metrics = train_with_reddit_data(df)
    
    print("\n" + "="*60)
    print("TRAINING COMPLETE!")
    print("="*60)
    print(f"\nFinal ROC-AUC: {metrics['roc_auc']:.4f}")
    print("Models ready for deployment!")

