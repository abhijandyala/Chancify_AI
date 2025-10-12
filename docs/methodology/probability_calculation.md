# Probability Calculation Methodology

## Overview

Chancify AI calculates college admission probabilities using a **hybrid approach** that combines:
1. **Factor-based scoring** (weighted factors system)
2. **Machine learning models** (trained on historical data)
3. **College-specific adjustments** (institutional variations)
4. **Contextual normalization** (comparing within student's context)

This document outlines the mathematical and statistical foundation of our probability calculations.

---

## Phase 1: Factor Score Calculation (Baseline Model)

### Step 1: Individual Factor Scoring

Each of the 20 factors is scored on a normalized scale of 0-100 based on the student's data.

#### Formula Structure
```
Factor_Score_i = Normalize(Student_Value_i, Reference_Data_i) × 100
```

#### Normalization Methods by Factor Type

**1. Numeric Factors (GPA, Test Scores)**
```
Score = min(100, (Student_Value / Competitive_Threshold) × 100)

Where Competitive_Threshold = 75th percentile of target college's admitted students
```

**Example: SAT Scoring**
```python
def score_sat(student_sat, college_75th_percentile):
    if college_75th_percentile == 0:
        return 50  # Neutral score if test-optional/blind
    
    ratio = student_sat / college_75th_percentile
    if ratio >= 1.0:
        return 100
    elif ratio >= 0.95:
        return 90 + (ratio - 0.95) * 200  # 95-100% range maps to 90-100 score
    elif ratio >= 0.75:
        return 60 + (ratio - 0.75) * 150  # 75-95% range maps to 60-90 score
    else:
        return ratio * 80  # Below 75% scales proportionally
```

**2. Categorical Factors (Application Timing)**
```
Score = Lookup_Table[Category]

Example - Application Timing:
ED1: 100
ED2: 85
EA:  70
REA: 75
RD:  50
```

**3. Scored/Qualitative Factors (Essays, ECs)**
```
Score = (Student_Rating / Max_Rating) × 100

Example: Essay rated 8/10 = 80 score
```

**4. Boolean Factors (Legacy, First-Gen)**
```
Score = Yes ? Benefit_Amount : Neutral_Value

Legacy: Yes = 80, No = 50 (neutral)
First-Gen: Yes = 75, No = 50 (neutral)
```

---

### Step 2: Weighted Composite Score

Calculate overall student strength by applying factor weights:

```
Composite_Score = Σ (Factor_Score_i × Weight_i)

Where:
- Factor_Score_i ∈ [0, 100]
- Weight_i ∈ [0, 1]
- Σ Weight_i = 1.0 (100%)
```

**Example Calculation:**
```
Student Profile:
- GPA Score: 92 (weight: 0.25)
- Rigor Score: 85 (weight: 0.12)
- SAT Score: 88 (weight: 0.08)
- Essay Score: 80 (weight: 0.08)
- EC Score: 75 (weight: 0.075)
- ... (remaining factors)

Composite = (92 × 0.25) + (85 × 0.12) + (88 × 0.08) + (80 × 0.08) + (75 × 0.075) + ...
         = 23.0 + 10.2 + 7.04 + 6.4 + 5.625 + ...
         = 82.5 (example)
```

---

### Step 3: Contextual Adjustment

Adjust composite score based on student's context:

```
Adjusted_Score = Composite_Score × Context_Multiplier

Context_Multiplier factors:
- High school competitiveness (0.9 - 1.1)
- Resource availability (0.95 - 1.05)
- Socioeconomic background (0.95 - 1.05)
```

**Example:**
```python
def calculate_context_multiplier(student_profile):
    multiplier = 1.0
    
    # High school competitiveness
    if student_profile.hs_competitiveness == "Most Competitive":
        multiplier *= 1.05  # Bonus for competitive school
    elif student_profile.hs_competitiveness == "Not Competitive":
        multiplier *= 1.02  # Slight bonus for overcoming disadvantage
    
    # Socioeconomic factors
    if student_profile.first_generation and student_profile.low_income:
        multiplier *= 1.05  # Bonus for overcoming obstacles
    
    # Cap the multiplier
    return min(max(multiplier, 0.9), 1.1)
```

---

## Phase 2: College-Specific Calibration

### Step 1: Historical Data Matching

Compare student profile to historical admitted/rejected students at target college:

```
Similarity_Score = Calculate_Profile_Similarity(Student, Historical_Applicants)

Using cosine similarity or Euclidean distance in factor space
```

### Step 2: Acceptance Rate Baseline

Start with college's base acceptance rate for student's application round:

```
Base_Probability = Acceptance_Rate_for_Round

Example:
ED1: 25%
RD:  8%
```

### Step 3: Score-Based Adjustment

Adjust probability based on how student's composite score compares to admitted students:

```
Percentile_Rank = Percentile(Adjusted_Score, Admitted_Students_Scores)

Probability_Adjustment = f(Percentile_Rank)

Where f(x) is a logistic function:
f(x) = 1 / (1 + e^(-k(x - 0.5)))

k = steepness parameter (typically 5-10 for selective schools)
```

**Adjustment Curve:**
```
Percentile in admitted pool → Probability multiplier:
90th-100th: 2.5x - 4x base rate
75th-90th:  1.5x - 2.5x
50th-75th:  0.8x - 1.5x
25th-50th:  0.4x - 0.8x
Below 25th: 0.1x - 0.4x
```

### Step 4: Final Probability Calculation (Baseline)

```
Raw_Probability = Base_Probability × Probability_Adjustment

Calibrated_Probability = Calibrate(Raw_Probability)

Where Calibrate() ensures:
- Min: 0.5% (always some chance)
- Max: 95% (never guaranteed)
- Realistic distribution
```

---

## Phase 3: Machine Learning Enhancement

### Model Architecture (Future Implementation)

**Ensemble Approach:**
1. **Logistic Regression** (baseline, interpretable)
2. **Random Forest** (captures non-linear interactions)
3. **Gradient Boosting (XGBoost)** (high accuracy)
4. **Neural Network** (deep patterns, optional)

**Training Data Requirements:**
- Historical admissions data (10,000+ applicants per college)
- Features: All 20 factors + derived features
- Target: Admitted (1) vs Rejected (0)
- Validation: 80-20 split, cross-validation

**Feature Engineering:**
```python
Derived_Features = [
    "GPA_SAT_interaction",
    "Rigor_GPA_product",
    "EC_depth_score",  # Hours × Years × Leadership
    "Geographic_diversity_value",
    "Academic_spike_indicator",  # Strong in one area
    "Well_rounded_indicator",  # Strong across areas
    "Essay_authenticity_proxy",
    "School_quality_adjustment"
]
```

**Model Output:**
```
ML_Probability = Ensemble_Average([
    LR_prob × 0.25,
    RF_prob × 0.30,
    XGB_prob × 0.35,
    NN_prob × 0.10
])
```

### Hybrid Final Probability

Combine factor-based and ML approaches:

```
Final_Probability = α × Factor_Based_Prob + (1 - α) × ML_Probability

Where:
α = 0.4 (40% factor-based, 60% ML) initially
α adjusts based on confidence and data availability
```

---

## Phase 4: Uncertainty and Confidence Intervals

### Confidence Score

Calculate confidence in the prediction:

```
Confidence = f(Data_Quality, Historical_Data_Volume, Profile_Uniqueness)

Data_Quality factors:
- Completeness of student profile (% of factors provided)
- Recency of college data
- Availability of college-specific model

Historical_Data_Volume:
- More data → Higher confidence
- Threshold: 1000+ applicants for high confidence

Profile_Uniqueness:
- Common profile → Higher confidence
- Unusual combination → Lower confidence (flag this)
```

### Probability Range

Provide a range, not just a point estimate:

```
Probability_Range = [
    Final_Probability - (1 - Confidence) × 15%,
    Final_Probability + (1 - Confidence) × 15%
]

Example:
Probability: 25%
Confidence: 0.8 (80%)
Range: [25 - 3%, 25 + 3%] = [22%, 28%]

Low confidence example:
Probability: 25%
Confidence: 0.5 (50%)
Range: [25 - 7.5%, 25 + 7.5%] = [17.5%, 32.5%]
```

---

## Special Cases & Edge Cases

### 1. Test-Optional Decisions

```python
if student.test_optional and student.sat_score < college.25th_percentile:
    # Don't submit scores - redistribute weight
    adjusted_weights = redistribute_weight("standardized_tests", 0.08, remaining_factors)
elif student.test_optional and student.sat_score >= college.50th_percentile:
    # Submit scores - boost application
    probability_boost = 1.1
```

### 2. Need-Aware vs Need-Blind

```python
if college.is_need_aware and student.requests_financial_aid:
    if college.available_aid_budget < threshold:
        probability_reduction = 0.85  # 15% penalty
    else:
        probability_reduction = 0.95  # 5% penalty
```

### 3. Major-Specific Admissions

```python
if college.admits_by_major:
    base_probability = major_specific_acceptance_rate[student.intended_major]
    # Adjust based on major fit factor
    probability *= major_fit_score / 50  # Normalize around 1.0
```

### 4. Recruited Athletes

```python
if student.is_recruited_athlete:
    if student.coach_support_level == "Verbal Offer":
        probability = min(0.95, base_probability * 10)  # Near certain
    elif student.coach_support_level == "Official Recruit":
        probability = min(0.85, base_probability * 5)
    elif student.coach_support_level == "Ongoing Communication":
        probability *= 2.5
```

### 5. Legacy Applicants

```python
legacy_boost = {
    "Parent_Undergrad_ED": 2.0,
    "Parent_Undergrad_RD": 1.5,
    "Parent_Graduate": 1.2,
    "Sibling": 1.3,
    "Grandparent": 1.1
}

if student.has_legacy:
    probability *= legacy_boost[student.legacy_type]
```

---

## Output Format

### Probability Report

```json
{
  "college_name": "Example University",
  "application_round": "ED1",
  "probability": {
    "point_estimate": 0.32,
    "range": [0.27, 0.37],
    "confidence": 0.82,
    "percentile_in_applicant_pool": 68
  },
  "breakdown": {
    "base_acceptance_rate": 0.18,
    "your_composite_score": 84.5,
    "admitted_students_avg_score": 87.2,
    "probability_multiplier": 1.78
  },
  "strength_areas": [
    "Academic Performance (95/100)",
    "Curriculum Rigor (88/100)",
    "Application Timing (100/100 - ED1)"
  ],
  "improvement_areas": [
    "Extracurricular Leadership (65/100)",
    "Standardized Testing (72/100)"
  ],
  "key_factors": {
    "strongest_factors": ["gpa_college_prep", "application_timing", "curriculum_rigor"],
    "weakest_factors": ["extracurricular_activities", "standardized_tests"]
  }
}
```

---

## Calibration and Validation

### Model Calibration

Ensure predicted probabilities match observed outcomes:

```
Calibration_Check:
For students predicted 20% chance:
→ Actually admitted ~20% of the time

Use isotonic regression or Platt scaling for calibration
```

### Validation Metrics

```
Primary Metrics:
- Brier Score: measures accuracy of probabilistic predictions
- Log Loss: penalizes confident wrong predictions
- AUC-ROC: discrimination ability

Calibration Metrics:
- Expected Calibration Error (ECE)
- Calibration plots (predicted vs observed)

Fairness Metrics:
- Equal opportunity across demographic groups
- Calibration within subgroups
```

---

## Future Enhancements

1. **Temporal Modeling**: Account for changing admissions trends year-over-year
2. **Yield Prediction**: Predict not just admission, but likelihood of enrollment
3. **Waitlist Probability**: Separate model for waitlist→admission conversion
4. **Financial Aid Prediction**: Estimate likely aid package
5. **Multi-College Optimization**: Suggest optimal college list strategy
6. **Real-Time Updates**: Adjust probabilities as application season progresses
7. **Essay Quality AI**: Use NLP to assess essay quality automatically
8. **Recommendation Strength Proxy**: Infer likely rec strength from relationship data

---

## Ethical Considerations

1. **Transparency**: Users understand this is an estimate, not a guarantee
2. **Bias Mitigation**: Regular audits for demographic bias
3. **Privacy**: User data encrypted and never sold
4. **Responsible Use**: Discourage gaming the system
5. **Access**: Free tier available to ensure equitable access
6. **Accuracy Bounds**: Clear communication of uncertainty
7. **Updates**: Regular model updates with new data

---

## References

- College Board Common Data Set standards
- NACAC admission research
- Published admissions statistics from universities
- Academic research on college admissions modeling
- Machine learning best practices for fairness and interpretability

---

**Version**: 1.0  
**Last Updated**: 2025-10-12  
**Author**: Chancify AI Development Team

