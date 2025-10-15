"""
Synthetic training data generation.

Generates realistic applicant profiles and outcomes based on:
1. Our scoring formula (provides base probabilities)
2. College characteristics
3. Realistic noise and variance
"""

import numpy as np
import pandas as pd
from typing import List, Dict, Tuple

from backend.ml.preprocessing.feature_extractor import StudentFeatures, CollegeFeatures, FeatureExtractor
from backend.core import calculate_admission_probability


class SyntheticDataGenerator:
    """
    Generates synthetic training data for ML model.
    
    Strategy:
    1. Create diverse student profiles (varying strengths)
    2. Calculate admission probability using our formula
    3. Sample outcomes with realistic noise
    4. Extract features for ML training
    """
    
    def __init__(self, random_seed: int = 42):
        """Initialize with random seed for reproducibility."""
        self.rng = np.random.RandomState(random_seed)
        np.random.seed(random_seed)
    
    def generate_student_profile(
        self,
        profile_type: str = 'mixed'
    ) -> Tuple[StudentFeatures, Dict[str, float]]:
        """
        Generate a single student profile.
        
        Args:
            profile_type: Type of profile to generate
                - 'strong': High achiever (GPA 3.8-4.0, SAT 1400-1600)
                - 'average': Typical applicant (GPA 3.3-3.7, SAT 1200-1400)
                - 'weak': Below average (GPA 2.5-3.3, SAT 1000-1200)
                - 'mixed': Random mix
                
        Returns:
            Tuple of (StudentFeatures, factor_scores_dict)
        """
        if profile_type == 'mixed':
            profile_type = self.rng.choice(['strong', 'average', 'weak'], p=[0.3, 0.5, 0.2])
        
        # Generate GPA
        if profile_type == 'strong':
            gpa = self.rng.uniform(3.8, 4.0)
            gpa_weighted = self.rng.uniform(4.2, 4.8)
        elif profile_type == 'average':
            gpa = self.rng.uniform(3.3, 3.7)
            gpa_weighted = self.rng.uniform(3.7, 4.2)
        else:  # weak
            gpa = self.rng.uniform(2.5, 3.3)
            gpa_weighted = self.rng.uniform(2.8, 3.7)
        
        # Generate SAT/ACT
        if profile_type == 'strong':
            sat_total = int(self.rng.uniform(1400, 1600))
            act = int(self.rng.uniform(32, 36))
        elif profile_type == 'average':
            sat_total = int(self.rng.uniform(1200, 1400))
            act = int(self.rng.uniform(26, 32))
        else:
            sat_total = int(self.rng.uniform(1000, 1200))
            act = int(self.rng.uniform(20, 26))
        
        sat_math = int(sat_total * self.rng.uniform(0.48, 0.52))
        sat_rw = sat_total - sat_math
        
        # Generate course rigor
        if profile_type == 'strong':
            ap_count = int(self.rng.uniform(8, 15))
            honors_count = int(self.rng.uniform(3, 8))
        elif profile_type == 'average':
            ap_count = int(self.rng.uniform(3, 8))
            honors_count = int(self.rng.uniform(2, 5))
        else:
            ap_count = int(self.rng.uniform(0, 3))
            honors_count = int(self.rng.uniform(0, 3))
        
        # Generate ECs
        if profile_type == 'strong':
            ec_count = int(self.rng.uniform(4, 8))
            leadership_count = int(self.rng.uniform(2, 4))
            awards_count = int(self.rng.uniform(3, 10))
            national_awards = int(self.rng.uniform(0, 3))
        elif profile_type == 'average':
            ec_count = int(self.rng.uniform(2, 5))
            leadership_count = int(self.rng.uniform(0, 2))
            awards_count = int(self.rng.uniform(1, 5))
            national_awards = 0
        else:
            ec_count = int(self.rng.uniform(0, 3))
            leadership_count = 0
            awards_count = int(self.rng.uniform(0, 2))
            national_awards = 0
        
        years_commitment = int(self.rng.uniform(ec_count * 2, ec_count * 4)) if ec_count > 0 else 0
        hours_per_week = self.rng.uniform(5, 20) if ec_count > 0 else 0
        
        # Demographics (random)
        first_gen = self.rng.random() < 0.15  # ~15% first-gen
        urm = self.rng.random() < 0.30  # ~30% URM
        legacy = self.rng.random() < 0.10  # ~10% legacy
        athlete = self.rng.random() < 0.05  # ~5% recruited athlete
        geographic_diversity = self.rng.uniform(3, 8)
        
        # Class rank
        if profile_type == 'strong':
            class_rank_pct = self.rng.uniform(1, 5)
        elif profile_type == 'average':
            class_rank_pct = self.rng.uniform(10, 30)
        else:
            class_rank_pct = self.rng.uniform(30, 60)
        
        # Create StudentFeatures
        student = StudentFeatures(
            factor_scores={},  # Will fill below
            gpa_unweighted=gpa,
            gpa_weighted=gpa_weighted,
            sat_total=sat_total,
            sat_math=sat_math,
            sat_reading_writing=sat_rw,
            act_composite=act,
            ap_count=ap_count,
            honors_count=honors_count,
            class_rank_percentile=class_rank_pct,
            class_size=int(self.rng.uniform(100, 600)),
            ec_count=ec_count,
            leadership_positions_count=leadership_count,
            years_commitment=years_commitment,
            hours_per_week=hours_per_week,
            awards_count=awards_count,
            national_awards=national_awards,
            first_generation=first_gen,
            underrepresented_minority=urm,
            geographic_diversity=geographic_diversity,
            legacy_status=legacy,
            recruited_athlete=athlete
        )
        
        # Generate factor scores (0-10 scale) based on profile
        factor_scores = self._profile_to_factor_scores(student, profile_type)
        student.factor_scores = factor_scores
        
        return student, factor_scores
    
    def _profile_to_factor_scores(
        self,
        student: StudentFeatures,
        profile_type: str
    ) -> Dict[str, float]:
        """Convert student profile to factor scores."""
        
        # GPA score
        gpa = student.gpa_unweighted or 3.5
        if gpa >= 3.9:
            grades_score = self.rng.uniform(9.0, 10.0)
        elif gpa >= 3.7:
            grades_score = self.rng.uniform(8.0, 9.0)
        elif gpa >= 3.5:
            grades_score = self.rng.uniform(7.0, 8.0)
        elif gpa >= 3.3:
            grades_score = self.rng.uniform(6.0, 7.0)
        else:
            grades_score = self.rng.uniform(4.0, 6.0)
        
        # Rigor score
        total_rigorous = student.ap_count + student.honors_count
        if total_rigorous >= 12:
            rigor_score = self.rng.uniform(9.0, 10.0)
        elif total_rigorous >= 8:
            rigor_score = self.rng.uniform(8.0, 9.0)
        elif total_rigorous >= 5:
            rigor_score = self.rng.uniform(7.0, 8.0)
        else:
            rigor_score = self.rng.uniform(5.0, 7.0)
        
        # Testing score
        sat = student.sat_total or 0
        if sat >= 1550:
            testing_score = 10.0
        elif sat >= 1500:
            testing_score = self.rng.uniform(9.0, 10.0)
        elif sat >= 1450:
            testing_score = self.rng.uniform(8.0, 9.0)
        elif sat >= 1400:
            testing_score = self.rng.uniform(7.5, 8.5)
        elif sat >= 1300:
            testing_score = self.rng.uniform(6.5, 7.5)
        elif sat >= 1200:
            testing_score = self.rng.uniform(5.5, 6.5)
        else:
            testing_score = self.rng.uniform(4.0, 5.5)
        
        # ECs & Leadership score
        if student.leadership_positions_count >= 3 and student.years_commitment >= 10:
            ecs_score = self.rng.uniform(9.0, 10.0)
        elif student.leadership_positions_count >= 2 and student.years_commitment >= 8:
            ecs_score = self.rng.uniform(8.0, 9.0)
        elif student.leadership_positions_count >= 1 and student.years_commitment >= 6:
            ecs_score = self.rng.uniform(7.0, 8.0)
        else:
            ecs_score = self.rng.uniform(5.0, 7.0)
        
        # Awards score
        if student.national_awards >= 2:
            awards_score = self.rng.uniform(9.0, 10.0)
        elif student.national_awards >= 1 or student.awards_count >= 5:
            awards_score = self.rng.uniform(7.5, 9.0)
        elif student.awards_count >= 3:
            awards_score = self.rng.uniform(6.0, 7.5)
        else:
            awards_score = self.rng.uniform(5.0, 6.0)
        
        # Other factors (with some variance)
        essay_score = self.rng.uniform(6.0, 9.0)  # Hard to model without actual essays
        recommendations_score = self.rng.uniform(6.5, 9.0)
        interview_score = self.rng.uniform(6.0, 8.5)
        
        return {
            'grades': grades_score,
            'rigor': rigor_score,
            'testing': testing_score,
            'essay': essay_score,
            'ecs_leadership': ecs_score,
            'recommendations': recommendations_score,
            'plan_timing': self.rng.uniform(5.0, 8.0),
            'athletic_recruit': 9.0 if student.recruited_athlete else self.rng.uniform(2.0, 4.0),
            'major_fit': self.rng.uniform(6.0, 8.0),
            'geography_residency': student.geographic_diversity,
            'firstgen_diversity': 8.0 if student.first_generation else 5.0,
            'ability_to_pay': self.rng.uniform(5.0, 7.0),
            'awards_publications': awards_score,
            'portfolio_audition': self.rng.uniform(5.0, 7.0),
            'policy_knob': 5.0,
            'demonstrated_interest': self.rng.uniform(5.0, 8.0),
            'legacy': 8.0 if student.legacy_status else 3.0,
            'interview': interview_score,
            'conduct_record': self.rng.uniform(8.5, 10.0),  # Most have clean records
            'hs_reputation': self.rng.uniform(5.0, 7.5)
        }
    
    def generate_training_data(
        self,
        colleges: List[CollegeFeatures],
        samples_per_college: int = 100,
        noise_factor: float = 0.15
    ) -> pd.DataFrame:
        """
        Generate complete training dataset.
        
        Args:
            colleges: List of college features
            samples_per_college: Number of applicants per college
            noise_factor: Amount of randomness in outcomes (0-1)
                0.0 = deterministic (formula only)
                0.15 = realistic (15% variance)
                0.3 = very noisy
                
        Returns:
            DataFrame with features and outcomes
        """
        data = []
        
        for college in colleges:
            print(f"Generating {samples_per_college} applicants for {college.name}...")
            
            for i in range(samples_per_college):
                # Generate student
                student, factor_scores = self.generate_student_profile('mixed')
                
                # Calculate formula-based probability
                try:
                    formula_result = calculate_admission_probability(
                        factor_scores=factor_scores,
                        acceptance_rate=college.acceptance_rate,
                        uses_testing=(college.test_policy != 'Test-blind'),
                        need_aware=(college.financial_aid_policy == 'Need-aware')
                    )
                    formula_prob = formula_result.probability
                except Exception as e:
                    print(f"Warning: Formula calculation failed: {e}")
                    formula_prob = college.acceptance_rate  # Fallback
                
                # Add realistic noise
                # Use beta distribution for realistic probability sampling
                alpha = formula_prob * 10
                beta = (1 - formula_prob) * 10
                noisy_prob = self.rng.beta(alpha + 1, beta + 1)
                
                # Apply noise factor
                final_prob = (1 - noise_factor) * formula_prob + noise_factor * noisy_prob
                final_prob = np.clip(final_prob, 0.02, 0.98)
                
                # Sample outcome (0 = rejected, 1 = accepted)
                outcome = 1 if self.rng.random() < final_prob else 0
                
                # Extract features for ML
                features, feature_names = FeatureExtractor.extract_features(student, college)
                
                # Create record
                record = {
                    'college_name': college.name,
                    'acceptance_rate': college.acceptance_rate,
                    'selectivity_tier': college.selectivity_tier,
                    'formula_probability': formula_prob,
                    'final_probability': final_prob,
                    'outcome': outcome,
                    'profile_strength': 'strong' if student.gpa_unweighted and student.gpa_unweighted >= 3.8 else (
                        'average' if student.gpa_unweighted and student.gpa_unweighted >= 3.3 else 'weak'
                    )
                }
                
                # Add all features
                for fname, fval in zip(feature_names, features):
                    record[fname] = fval
                
                data.append(record)
        
        df = pd.DataFrame(data)
        print(f"\nGenerated {len(df)} total training samples")
        print(f"Acceptance rate: {df['outcome'].mean():.1%}")
        print(f"Profile distribution:\n{df['profile_strength'].value_counts()}")
        
        return df


def generate_initial_dataset(
    colleges_csv_path: str,
    output_path: str,
    samples_per_college: int = 100,
    random_seed: int = 42
) -> pd.DataFrame:
    """
    Generate initial training dataset from college CSV.
    
    Args:
        colleges_csv_path: Path to colleges CSV
        output_path: Where to save training data
        samples_per_college: Applicants per college
        random_seed: Random seed for reproducibility
        
    Returns:
        Training DataFrame
    """
    # Load colleges
    colleges_df = pd.read_csv(colleges_csv_path)
    
    # Convert to CollegeFeatures
    colleges = []
    for _, row in colleges_df.iterrows():
        college = CollegeFeatures(
            name=row['name'],
            acceptance_rate=row['acceptance_rate'],
            acceptance_rate_ed=row.get('acceptance_rate_ed'),
            acceptance_rate_rd=row.get('acceptance_rate_rd'),
            sat_25th=row.get('sat_25th'),
            sat_75th=row.get('sat_75th'),
            act_25th=row.get('act_25th'),
            act_75th=row.get('act_75th'),
            test_policy=row['test_policy'],
            financial_aid_policy=row['financial_aid_policy'],
            selectivity_tier=row['selectivity_tier'],
            region=row.get('region', 'Unknown'),
            gpa_average=row.get('gpa_average')
        )
        colleges.append(college)
    
    # Generate data
    generator = SyntheticDataGenerator(random_seed=random_seed)
    df = generator.generate_training_data(
        colleges=colleges,
        samples_per_college=samples_per_college,
        noise_factor=0.15
    )
    
    # Save
    df.to_csv(output_path, index=False)
    print(f"\nSaved training data to: {output_path}")
    
    return df


if __name__ == "__main__":
    # Generate initial dataset
    df = generate_initial_dataset(
        colleges_csv_path="../data/raw/initial_colleges.csv",
        output_path="../data/processed/training_data.csv",
        samples_per_college=100,
        random_seed=42
    )
    
    print("\nTraining data summary:")
    print(df.describe())

