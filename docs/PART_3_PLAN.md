# Part 3: ML Model Implementation Plan

## Overview
Build a machine learning model that predicts college admission probabilities using real institutional data and our 20-factor scoring system.

## Strategy Summary

### Data Approach
- **Primary Sources:** College Scorecard (API) + IPEDS (official admissions data) + Common Data Set (PDFs)
- **Type:** Real institutional data (official, legal, stable)
- **Scope:** Start with 100+ colleges, expand to 1000+
- **Format:** CSV → PostgreSQL → ML Pipeline

### Model Approach
- **Algorithms:** Logistic Regression + Random Forest (ensemble)
- **Features:** Hybrid approach (20 factor scores + raw metrics like GPA, SAT)
- **Output:** Probability (0-100%) + Confidence Interval (±X%)
- **Validation:** 80/20 train/test split with cross-validation

### Integration Approach
- **Hybrid System:** Blend ML predictions with formula-based calculations
- **Weighting:** Start 60% ML + 40% formula, adjust based on confidence
- **Fallback:** Use formula if ML confidence is low
- **Transparency:** Show both predictions in audit report

### Scaling Strategy
- **Phase 1:** One model for all colleges (general patterns)
- **Phase 2:** Separate models by tier (elite/selective/less selective)
- **Phase 3:** Per-college models (as data accumulates)

---

## Detailed Implementation Steps

### PHASE 1: Data Infrastructure (Week 1)

#### Step 1.1: Create Data Repository Structure
```
Chancify_AI/
├── backend/
│   ├── ml/                      # NEW: ML module
│   │   ├── __init__.py
│   │   ├── models/              # Trained models
│   │   ├── training/            # Training scripts
│   │   ├── evaluation/          # Model evaluation
│   │   └── preprocessing/       # Data preprocessing
│   ├── data_ingestion/          # NEW: Data collection
│   │   ├── __init__.py
│   │   ├── scorecard.py         # College Scorecard API
│   │   ├── ipeds.py             # IPEDS data
│   │   ├── cds_parser.py        # Common Data Set parser
│   │   └── merge.py             # Data merging
│   └── data/                    # NEW: Raw data storage
│       ├── raw/                 # Downloaded data
│       ├── processed/           # Cleaned data
│       └── models/              # Saved ML models
```

#### Step 1.2: Install ML Dependencies
```bash
pip install scikit-learn==1.4.0
pip install xgboost==2.0.3
pip install pandas==2.2.0
pip install numpy==1.26.3
pip install joblib==1.3.2
pip install pdfplumber==0.10.3
pip install camelot-py[cv]==0.11.0
pip install matplotlib==3.8.2
pip install seaborn==0.13.0
```

#### Step 1.3: College Scorecard Integration
- Get API key from College Scorecard
- Create `scorecard.py` to fetch:
  - Institution names, locations
  - Admission rates (overall, by round if available)
  - SAT/ACT ranges (25th-75th percentiles)
  - Test requirements policy
  - School size, ownership, region
- Save to `data/raw/scorecard_institutions.csv`

#### Step 1.4: IPEDS Data Integration
- Access IPEDS "Use the Data" tool
- Extract Admissions (ADM) component:
  - Admission rates by gender/residency
  - Number of applicants/admitted/enrolled
  - SAT/ACT score distributions
  - GPA data (when available)
  - Admissions considerations (ADMCON variables)
- Save to `data/raw/ipeds_admissions.csv`

#### Step 1.5: Common Data Set Parser
- Create PDF parser for CDS Section C (Admission)
- Extract:
  - GPA bands (e.g., "3.75-4.00: 48%")
  - Factor importance ratings (Very Important/Important/Considered/Not Considered)
  - Applicant/admit/enroll numbers
  - Early decision/early action stats
- Start with 20-30 high-priority schools
- Save to `data/raw/cds_extract.jsonl`

#### Step 1.6: Data Merging & Cleaning
- Merge Scorecard + IPEDS + CDS by:
  - School name (fuzzy matching)
  - UNITID (when available)
  - State + name combination
- Handle missing values:
  - Test scores: impute from similar schools
  - Admission rates: require (critical field)
  - Factor importance: default to "considered"
- Create master `data/processed/college_profiles.csv`
- Load into PostgreSQL `colleges` table

---

### PHASE 2: ML Model Development (Week 2)

#### Step 2.1: Feature Engineering
```python
# Input features (hybrid approach):
# 1. Our 20 factor scores (0-10 scale)
# 2. Raw student metrics (GPA, SAT, ACT)
# 3. College characteristics (acceptance rate, selectivity tier)
# 4. Interaction features (student strength × school selectivity)

features = [
    # Factor scores (20 features)
    'grades_score', 'rigor_score', 'testing_score', ...,
    
    # Raw metrics (10 features)
    'gpa_unweighted', 'sat_total', 'act_composite',
    'ap_count', 'honors_count', 'ec_count', 'leadership_count',
    'awards_count', 'years_commitment', 'hours_per_week',
    
    # College features (5 features)
    'acceptance_rate', 'selectivity_tier', 'sat_75th', 
    'test_policy_numeric', 'need_policy_numeric',
    
    # Interaction features (15 features)
    'gpa_above_median', 'sat_vs_75th_percentile',
    'composite_vs_acceptance_rate', ...
]
```

#### Step 2.2: Synthetic Training Data Generation
Since we don't have real applicant outcomes yet, generate synthetic training data:

```python
def generate_training_data(n_samples=10000):
    """
    Generate synthetic admissions outcomes based on:
    1. Our scoring formula (provides ground truth probabilities)
    2. College admission rates (base rates)
    3. Realistic noise (admissions isn't deterministic)
    """
    
    # For each college in our database:
    for college in colleges:
        # Generate diverse applicant profiles
        applicants = generate_applicant_profiles(n=100)
        
        # Calculate base probability with our formula
        for applicant in applicants:
            formula_prob = calculate_admission_probability(
                applicant.factor_scores,
                college.acceptance_rate
            )
            
            # Add realistic noise (admissions has randomness)
            actual_outcome = sample_with_noise(
                formula_prob, 
                noise_factor=0.15  # 15% noise
            )
            
            training_data.append({
                'features': extract_features(applicant, college),
                'probability': formula_prob,
                'outcome': actual_outcome  # 0 or 1
            })
```

**Why this works:**
- Our formula already encodes expert knowledge
- ML learns patterns the formula might miss
- Noise simulates real-world unpredictability
- When we get real data, we can retrain

#### Step 2.3: Model Training

```python
# Model 1: Logistic Regression (baseline, interpretable)
from sklearn.linear_model import LogisticRegression
from sklearn.calibration import CalibratedClassifierCV

lr_model = LogisticRegression(
    penalty='l2',
    C=1.0,
    max_iter=1000,
    random_state=42
)

# Calibrate to get good probabilities
lr_calibrated = CalibratedClassifierCV(
    lr_model, 
    method='sigmoid',
    cv=5
)

# Model 2: Random Forest (captures non-linear patterns)
from sklearn.ensemble import RandomForestClassifier

rf_model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    min_samples_split=20,
    min_samples_leaf=10,
    random_state=42,
    n_jobs=-1
)

# Model 3: XGBoost (advanced, high performance)
import xgboost as xgb

xgb_model = xgb.XGBClassifier(
    n_estimators=200,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

# Ensemble: Combine all three
from sklearn.ensemble import VotingClassifier

ensemble = VotingClassifier(
    estimators=[
        ('lr', lr_calibrated),
        ('rf', rf_model),
        ('xgb', xgb_model)
    ],
    voting='soft',  # Use probability averaging
    weights=[1, 2, 2]  # XGB and RF get more weight
)
```

#### Step 2.4: Confidence Interval Estimation

```python
def predict_with_confidence(model, features, n_bootstrap=100):
    """
    Predict probability with confidence interval using bootstrap.
    """
    predictions = []
    
    # Bootstrap sampling
    for i in range(n_bootstrap):
        # Sample with replacement
        idx = np.random.choice(len(features), len(features))
        sample_features = features[idx]
        
        # Predict
        pred = model.predict_proba(sample_features)[:, 1]
        predictions.append(pred.mean())
    
    # Calculate confidence interval
    mean_prob = np.mean(predictions)
    std_prob = np.std(predictions)
    ci_lower = mean_prob - 1.96 * std_prob  # 95% CI
    ci_upper = mean_prob + 1.96 * std_prob
    
    return {
        'probability': mean_prob,
        'confidence_interval': (ci_lower, ci_upper),
        'confidence_width': ci_upper - ci_lower,
        'confidence_score': 1.0 / (1.0 + std_prob)  # 0-1, higher is better
    }
```

#### Step 2.5: Model Evaluation

```python
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    brier_score_loss,
    calibration_curve
)

def evaluate_model(model, X_test, y_test):
    """Comprehensive model evaluation."""
    
    # Predictions
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]
    
    metrics = {
        'accuracy': accuracy_score(y_test, y_pred),
        'precision': precision_score(y_test, y_pred),
        'recall': recall_score(y_test, y_pred),
        'f1_score': f1_score(y_test, y_pred),
        'roc_auc': roc_auc_score(y_test, y_prob),
        'brier_score': brier_score_loss(y_test, y_prob),
    }
    
    # Calibration curve
    prob_true, prob_pred = calibration_curve(
        y_test, y_prob, n_bins=10
    )
    
    return metrics, (prob_true, prob_pred)
```

**Target Metrics:**
- Accuracy: >80%
- ROC-AUC: >0.85
- Brier Score: <0.15 (lower is better)
- Calibration: predictions close to actual rates

---

### PHASE 3: Integration (Week 3)

#### Step 3.1: Hybrid Prediction System

```python
def hybrid_prediction(
    factor_scores: dict,
    raw_features: dict,
    college: College,
    ml_model,
    formula_confidence: float = 0.4
) -> PredictionResult:
    """
    Blend ML and formula predictions intelligently.
    """
    
    # Get formula-based prediction
    formula_result = calculate_admission_probability(
        factor_scores,
        college.acceptance_rate,
        college.uses_testing,
        college.need_aware
    )
    
    # Get ML prediction with confidence
    ml_features = extract_features(raw_features, college)
    ml_result = predict_with_confidence(ml_model, ml_features)
    
    # Determine blending weights based on ML confidence
    if ml_result['confidence_score'] > 0.8:
        # High confidence ML: trust it more
        ml_weight = 0.7
        formula_weight = 0.3
    elif ml_result['confidence_score'] > 0.6:
        # Medium confidence: balanced blend
        ml_weight = 0.6
        formula_weight = 0.4
    else:
        # Low confidence: trust formula more
        ml_weight = 0.4
        formula_weight = 0.6
    
    # Weighted combination
    final_prob = (
        ml_weight * ml_result['probability'] +
        formula_weight * formula_result.probability
    )
    
    # Confidence interval (propagate uncertainty)
    ci_width = ml_result['confidence_width']
    final_ci = (
        max(0.02, final_prob - ci_width/2),
        min(0.98, final_prob + ci_width/2)
    )
    
    return PredictionResult(
        probability=final_prob,
        confidence_interval=final_ci,
        ml_probability=ml_result['probability'],
        formula_probability=formula_result.probability,
        ml_confidence=ml_result['confidence_score'],
        blend_weights={'ml': ml_weight, 'formula': formula_weight},
        explanation=f"ML {ml_weight:.0%} + Formula {formula_weight:.0%}"
    )
```

#### Step 3.2: API Integration

```python
# Update backend/api/routes/calculations.py

@router.post("/calculate/{college_id}", response_model=CalculationResponse)
async def calculate_probability_ml(
    college_id: str,
    current_user_profile: UserProfile = Depends(get_current_user_profile),
    db: Session = Depends(get_db),
    use_ml: bool = True  # New parameter
):
    """
    Calculate admission probability using ML + formula hybrid.
    """
    # ... existing code to get college, profile, etc ...
    
    if use_ml and ml_model_available():
        # Use hybrid prediction
        result = hybrid_prediction(
            factor_scores=factor_scores,
            raw_features=extract_raw_features(profile),
            college=college,
            ml_model=load_ml_model()
        )
        
        return CalculationResponse(
            college_id=college.id,
            college_name=college.name,
            probability=result.probability,
            confidence_interval=result.confidence_interval,
            ml_probability=result.ml_probability,
            formula_probability=result.formula_probability,
            prediction_method='hybrid',
            confidence_score=result.ml_confidence,
            explanation=result.explanation,
            # ... audit breakdown ...
        )
    else:
        # Fallback to formula only
        # ... existing formula code ...
```

---

## Timeline & Milestones

### Week 1: Data Infrastructure
- [ ] Day 1-2: Set up data collection scripts
- [ ] Day 3-4: Collect Scorecard + IPEDS data (100+ colleges)
- [ ] Day 5-6: Parse 20-30 CDS PDFs
- [ ] Day 7: Merge and clean data, load to database

### Week 2: ML Development
- [ ] Day 1-2: Feature engineering + synthetic data generation
- [ ] Day 3-4: Train and evaluate models
- [ ] Day 5-6: Implement confidence intervals
- [ ] Day 7: Model selection and optimization

### Week 3: Integration
- [ ] Day 1-2: Build hybrid prediction system
- [ ] Day 3-4: Update API endpoints
- [ ] Day 5-6: Testing and validation
- [ ] Day 7: Documentation and deployment

---

## Success Criteria

### Data Quality
- ✅ 100+ colleges with complete data
- ✅ <5% missing critical fields (admission rate, test scores)
- ✅ All data sources documented and verified

### Model Performance
- ✅ Accuracy >80% on test set
- ✅ ROC-AUC >0.85
- ✅ Calibration error <10%
- ✅ Confidence intervals cover 95% of cases

### Integration Quality
- ✅ API response time <500ms
- ✅ Graceful fallback to formula when ML unavailable
- ✅ Clear explanation of prediction method
- ✅ Audit trail includes both ML and formula

### Code Quality
- ✅ Full type hints
- ✅ Comprehensive tests
- ✅ Documentation for all modules
- ✅ No hardcoded values
- ✅ Production-ready error handling

---

## Risk Mitigation

### Risk: Synthetic data doesn't match real admissions
**Mitigation:** 
- Start conservative (40% formula weight)
- Monitor when real data becomes available
- Easy to retrain with real data

### Risk: ML model overfits
**Mitigation:**
- Cross-validation during training
- Regularization (L2 penalty, max_depth limits)
- Ensemble methods reduce overfitting

### Risk: Some colleges have insufficient data
**Mitigation:**
- Use formula-only for colleges with <10 data points
- Clearly indicate prediction method to user
- Tier-based models (similar colleges share model)

### Risk: Model drift over time
**Mitigation:**
- Version all models with timestamps
- A/B test new models vs old
- Easy rollback mechanism
- Retraining pipeline documented

---

## Next Steps

Ready to start? We'll begin with:

1. **Create the ML module structure**
2. **Set up data collection scripts**
3. **Get College Scorecard API key**
4. **Start collecting institutional data**

This will be done correctly, professionally, and thoroughly. No shortcuts.

**Ready to start Step 1?**

