"""
Feature extraction for ML models.

Converts student profiles and college data into numerical features
that can be used for ML prediction.
"""

from typing import Dict, List, Optional, Tuple
import numpy as np
from dataclasses import dataclass


@dataclass
class StudentFeatures:
    """Structured student features for ML."""
    
    # Factor scores (0-10 scale) - 20 features
    factor_scores: Dict[str, float]
    
    # Raw academic metrics - 10 features
    gpa_unweighted: Optional[float] = None
    gpa_weighted: Optional[float] = None
    sat_total: Optional[int] = None
    sat_math: Optional[int] = None
    sat_reading_writing: Optional[int] = None
    act_composite: Optional[int] = None
    ap_count: int = 0
    honors_count: int = 0
    class_rank_percentile: Optional[float] = None
    class_size: Optional[int] = None
    
    # Extracurricular metrics - 6 features
    ec_count: int = 0
    leadership_positions_count: int = 0
    years_commitment: int = 0
    hours_per_week: float = 0.0
    awards_count: int = 0
    national_awards: int = 0
    
    # Demographics - 5 features
    first_generation: bool = False
    underrepresented_minority: bool = False
    geographic_diversity: float = 5.0  # 0-10 scale
    legacy_status: bool = False
    recruited_athlete: bool = False


@dataclass
class CollegeFeatures:
    """Structured college features for ML."""
    
    name: str
    acceptance_rate: float
    acceptance_rate_ed: Optional[float] = None
    acceptance_rate_rd: Optional[float] = None
    
    # Test score ranges
    sat_25th: Optional[int] = None
    sat_75th: Optional[int] = None
    act_25th: Optional[int] = None
    act_75th: Optional[int] = None
    
    # Policies
    test_policy: str = "Required"  # Required, Optional, Blind
    financial_aid_policy: str = "Need-blind"  # Need-blind, Need-aware
    
    # Selectivity
    selectivity_tier: str = "Selective"  # Elite, Highly Selective, Selective, Less Selective
    region: str = "Northeast"
    
    # Other
    gpa_average: Optional[float] = None
    size: Optional[int] = None


class FeatureExtractor:
    """
    Extracts and combines features from student and college data.
    
    Creates a comprehensive feature vector for ML prediction:
    - 20 factor scores (from our scoring system)
    - 10 raw academic metrics
    - 6 extracurricular metrics  
    - 5 demographic features
    - 5 college characteristics
    - 15 interaction features (student × college)
    
    Total: ~61 features
    """
    
    # Feature names (for consistency and interpretability)
    FACTOR_SCORE_FEATURES = [
        'grades_score', 'rigor_score', 'testing_score', 'essay_score',
        'ecs_leadership_score', 'recommendations_score', 'plan_timing_score',
        'athletic_recruit_score', 'major_fit_score', 'geography_residency_score',
        'firstgen_diversity_score', 'ability_to_pay_score', 'awards_publications_score',
        'portfolio_audition_score', 'policy_knob_score', 'demonstrated_interest_score',
        'legacy_score', 'interview_score', 'conduct_record_score', 'hs_reputation_score'
    ]
    
    RAW_ACADEMIC_FEATURES = [
        'gpa_unweighted', 'gpa_weighted', 'sat_total', 'sat_math', 'sat_rw',
        'act_composite', 'ap_count', 'honors_count', 'class_rank_pct', 'class_size'
    ]
    
    EC_FEATURES = [
        'ec_count', 'leadership_count', 'years_commitment', 
        'hours_per_week', 'awards_count', 'national_awards'
    ]
    
    DEMOGRAPHIC_FEATURES = [
        'first_gen', 'urm', 'geographic_diversity', 'legacy', 'recruited_athlete'
    ]
    
    COLLEGE_FEATURES = [
        'sat_median', 'act_median', 
        'test_policy_numeric', 'need_policy_numeric'
    ]
    
    INTERACTION_FEATURES = [
        'gpa_vs_avg', 'sat_vs_median', 'act_vs_median',
        'gpa_above_college', 'sat_above_75th', 'act_above_75th',
        'composite_vs_acceptance', 'selectivity_match',
        'test_advantage', 'geographic_match', 'legacy_boost',
        'first_gen_boost', 'athlete_boost', 'academic_strength',
        'holistic_strength'
    ]
    
    @staticmethod
    def extract_features(
        student: StudentFeatures,
        college: CollegeFeatures
    ) -> Tuple[np.ndarray, List[str]]:
        """
        Extract complete feature vector for ML prediction.
        
        Args:
            student: Student features
            college: College features
            
        Returns:
            Tuple of (feature_vector, feature_names)
        """
        features = []
        feature_names = []
        
        # 1. Factor scores (20 features)
        for factor_name in [
            'grades', 'rigor', 'testing', 'essay', 'ecs_leadership',
            'recommendations', 'plan_timing', 'athletic_recruit', 'major_fit',
            'geography_residency', 'firstgen_diversity', 'ability_to_pay',
            'awards_publications', 'portfolio_audition', 'policy_knob',
            'demonstrated_interest', 'legacy', 'interview', 'conduct_record',
            'hs_reputation'
        ]:
            score = student.factor_scores.get(factor_name, 5.0)  # Default neutral
            features.append(score)
            feature_names.append(f'{factor_name}_score')
        
        # 2. Raw academic metrics (10 features)
        features.extend([
            student.gpa_unweighted or 3.5,
            student.gpa_weighted or 3.8,
            student.sat_total or 1200,
            student.sat_math or 600,
            student.sat_reading_writing or 600,
            student.act_composite or 25,
            student.ap_count,
            student.honors_count,
            student.class_rank_percentile or 50.0,
            student.class_size or 300
        ])
        feature_names.extend(FeatureExtractor.RAW_ACADEMIC_FEATURES)
        
        # 3. Extracurricular metrics (6 features)
        features.extend([
            student.ec_count,
            student.leadership_positions_count,
            student.years_commitment,
            student.hours_per_week,
            student.awards_count,
            student.national_awards
        ])
        feature_names.extend(FeatureExtractor.EC_FEATURES)
        
        # 4. Demographics (5 features - convert bool to int)
        features.extend([
            int(student.first_generation),
            int(student.underrepresented_minority),
            student.geographic_diversity,
            int(student.legacy_status),
            int(student.recruited_athlete)
        ])
        feature_names.extend(FeatureExtractor.DEMOGRAPHIC_FEATURES)
        
        # 5. College characteristics (4 features)
        sat_median = (college.sat_25th + college.sat_75th) / 2 if college.sat_25th and college.sat_75th else 1300
        act_median = (college.act_25th + college.act_75th) / 2 if college.act_25th and college.act_75th else 29
        
        test_policy_numeric = {
            'Required': 2.0,
            'Test-optional': 1.0,
            'Test-blind': 0.0
        }.get(college.test_policy, 1.0)
        
        need_policy_numeric = {
            'Need-blind': 1.0,
            'Need-aware': 0.0
        }.get(college.financial_aid_policy, 1.0)
        
        features.extend([
            sat_median,
            act_median,
            test_policy_numeric,
            need_policy_numeric
        ])
        feature_names.extend(FeatureExtractor.COLLEGE_FEATURES)
        
        # 6. Interaction features (15 features)
        # These capture how student strength relates to college standards
        
        # GPA comparisons
        gpa = student.gpa_unweighted or 3.5
        college_gpa_avg = college.gpa_average or 3.7
        gpa_vs_avg = (gpa - college_gpa_avg) / 0.5  # Normalized difference
        gpa_above_college = 1.0 if gpa > college_gpa_avg else 0.0
        
        # SAT comparisons
        student_sat = student.sat_total or 1200
        sat_vs_median = (student_sat - sat_median) / 100.0  # Normalized
        sat_above_75th = 1.0 if college.sat_75th and student_sat > college.sat_75th else 0.0
        
        # ACT comparisons
        student_act = student.act_composite or 25
        act_vs_median = (student_act - act_median) / 5.0  # Normalized
        act_above_75th = 1.0 if college.act_75th and student_act > college.act_75th else 0.0
        
        # Composite score vs acceptance rate (from formula)
        # Calculate a simple composite for this feature
        academic_composite = (
            gpa * 250 + 
            (student_sat if student_sat > 0 else student_act * 40) * 0.5 +
            student.ap_count * 20
        )
        composite_vs_acceptance = academic_composite * college.acceptance_rate
        
        # Selectivity match
        selectivity_tiers = {'Elite': 4, 'Highly Selective': 3, 'Selective': 2, 'Less Selective': 1}
        selectivity_numeric = selectivity_tiers.get(college.selectivity_tier, 2)
        student_tier = 4 if gpa >= 3.9 and student_sat >= 1500 else (
            3 if gpa >= 3.7 and student_sat >= 1400 else (
            2 if gpa >= 3.5 and student_sat >= 1300 else 1
        ))
        selectivity_match = 1.0 if abs(selectivity_numeric - student_tier) <= 1 else 0.0
        
        # Test advantage (for test-optional schools)
        test_advantage = 0.0
        if test_policy_numeric == 1.0:  # Test-optional
            if student_sat >= sat_median or student_act >= act_median:
                test_advantage = 1.0
        
        # Geographic/legacy/athlete/first-gen boosts
        geographic_match = 1.0 if student.geographic_diversity >= 7.0 else 0.0
        legacy_boost = 1.0 if student.legacy_status else 0.0
        first_gen_boost = 1.0 if student.first_generation else 0.0
        athlete_boost = 1.0 if student.recruited_athlete else 0.0
        
        # Academic and holistic strength indicators
        academic_strength = (gpa / 4.0 + (student_sat / 1600.0 if student_sat > 0 else student_act / 36.0)) / 2
        holistic_strength = (
            student.ec_count / 10.0 +
            student.leadership_positions_count / 5.0 +
            student.awards_count / 5.0
        ) / 3.0
        
        features.extend([
            gpa_vs_avg,
            sat_vs_median,
            act_vs_median,
            gpa_above_college,
            sat_above_75th,
            act_above_75th,
            composite_vs_acceptance,
            selectivity_match,
            test_advantage,
            geographic_match,
            legacy_boost,
            first_gen_boost,
            athlete_boost,
            academic_strength,
            holistic_strength
        ])
        feature_names.extend(FeatureExtractor.INTERACTION_FEATURES)
        
        return np.array(features), feature_names
    
    @staticmethod
    def normalize_features(features: np.ndarray) -> np.ndarray:
        """
        Normalize features to similar scales.
        
        Uses standard scaling: (x - mean) / std
        """
        # For now, features are reasonably scaled
        # We'll add StandardScaler during training if needed
        return features
    
    @staticmethod
    def get_feature_names() -> List[str]:
        """Get all feature names in order."""
        return (
            FeatureExtractor.FACTOR_SCORE_FEATURES +
            FeatureExtractor.RAW_ACADEMIC_FEATURES +
            FeatureExtractor.EC_FEATURES +
            FeatureExtractor.DEMOGRAPHIC_FEATURES +
            FeatureExtractor.COLLEGE_FEATURES +
            FeatureExtractor.INTERACTION_FEATURES
        )
    
    @staticmethod
    def feature_importance_to_names(importances: np.ndarray) -> Dict[str, float]:
        """
        Convert feature importance array to named dictionary.
        
        Args:
            importances: Array of feature importances
            
        Returns:
            Dictionary mapping feature names to importance scores
        """
        names = FeatureExtractor.get_feature_names()
        return dict(zip(names, importances))

