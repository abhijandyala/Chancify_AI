"""
College Data Validator and Cleaner
Validates and fixes college data issues identified by user feedback
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Tuple

class CollegeDataValidator:
    def __init__(self, csv_path: str = 'backend/data/raw/integrated_colleges_with_elite.csv'):
        """Initialize with college data"""
        self.df = pd.read_csv(csv_path)
        self.issues_found = []
        self.fixes_applied = []
        
        # Known correct data for validation
        self.known_correct_data = {
            'Tuskegee University': {
                'acceptance_rate': 0.31,  # ~31% as verified by user
                'selectivity_tier': 'Moderately Selective',  # Not "Highly Selective"
                'city': 'Tuskegee',
                'state': 'AL'
            },
            'California State Polytechnic University-Humboldt': {
                'acceptance_rate': 0.85,  # Much lower than 98.8%
                'selectivity_tier': 'Less Selective',
                'city': 'Arcata',
                'state': 'CA'
            },
            'Georgetown University': {
                'acceptance_rate': 0.12,  # ~12% as shown in data
                'selectivity_tier': 'Elite',
                'city': 'Washington',
                'state': 'DC'
            },
            'New York University': {
                'acceptance_rate': 0.13,  # ~13% as shown in data
                'selectivity_tier': 'Elite',
                'city': 'New York',
                'state': 'NY'
            },
            'Emory University': {
                'acceptance_rate': 0.13,  # ~13% as shown in data
                'selectivity_tier': 'Elite',
                'city': 'Atlanta',
                'state': 'GA'
            },
            'California Institute of Technology': {
                'acceptance_rate': 0.03,  # ~3% as verified by user
                'selectivity_tier': 'Elite',
                'city': 'Pasadena',
                'state': 'CA'
            }
        }

    def validate_and_fix_data(self) -> pd.DataFrame:
        """Validate and fix all identified data issues"""
        print("Starting college data validation and cleanup...")
        
        # 1. Remove duplicate entries
        self._remove_duplicates()
        
        # 2. Fix missing acceptance rates
        self._fix_missing_acceptance_rates()
        
        # 3. Fix incorrect selectivity classifications
        self._fix_selectivity_classifications()
        
        # 4. Fix missing location data
        self._fix_missing_locations()
        
        # 5. Fix school names
        self._fix_school_names()
        
        # 6. Validate against known correct data
        self._validate_against_known_data()
        
        print(f"Validation complete. Found {len(self.issues_found)} issues, applied {len(self.fixes_applied)} fixes.")
        return self.df

    def _remove_duplicates(self):
        """Remove duplicate college entries"""
        initial_count = len(self.df)
        
        # Remove duplicates based on name, keeping the one with more complete data
        self.df = self.df.sort_values(['name', 'data_completeness'], ascending=[True, False])
        self.df = self.df.drop_duplicates(subset=['name'], keep='first')
        
        removed_count = initial_count - len(self.df)
        if removed_count > 0:
            self.fixes_applied.append(f"Removed {removed_count} duplicate college entries")

    def _fix_missing_acceptance_rates(self):
        """Fix missing acceptance rates using known data or estimates"""
        missing_rates = self.df['acceptance_rate'].isna().sum()
        
        for idx, row in self.df.iterrows():
            if pd.isna(row['acceptance_rate']):
                college_name = row['name']
                
                # Use known correct data if available
                if college_name in self.known_correct_data:
                    correct_rate = self.known_correct_data[college_name]['acceptance_rate']
                    self.df.at[idx, 'acceptance_rate'] = correct_rate
                    self.fixes_applied.append(f"Fixed missing acceptance rate for {college_name}: {correct_rate:.1%}")
                else:
                    # Estimate based on selectivity tier
                    estimated_rate = self._estimate_acceptance_rate(row['selectivity_tier'])
                    self.df.at[idx, 'acceptance_rate'] = estimated_rate
                    self.fixes_applied.append(f"Estimated acceptance rate for {college_name}: {estimated_rate:.1%}")

    def _estimate_acceptance_rate(self, selectivity_tier: str) -> float:
        """Estimate acceptance rate based on selectivity tier"""
        estimates = {
            'Elite': 0.08,           # ~8% average for elite schools
            'Highly Selective': 0.20, # ~20% average for highly selective
            'Moderately Selective': 0.50, # ~50% average for moderately selective
            'Less Selective': 0.80   # ~80% average for less selective
        }
        return estimates.get(selectivity_tier, 0.50)

    def _fix_selectivity_classifications(self):
        """Fix incorrect selectivity classifications"""
        for idx, row in self.df.iterrows():
            college_name = row['name']
            current_tier = row['selectivity_tier']
            acceptance_rate = row['acceptance_rate']
            
            # Use known correct data if available
            if college_name in self.known_correct_data:
                correct_tier = self.known_correct_data[college_name]['selectivity_tier']
                if current_tier != correct_tier:
                    self.df.at[idx, 'selectivity_tier'] = correct_tier
                    self.fixes_applied.append(f"Fixed selectivity tier for {college_name}: {current_tier} -> {correct_tier}")
            else:
                # Classify based on acceptance rate
                correct_tier = self._classify_by_acceptance_rate(acceptance_rate)
                if current_tier != correct_tier:
                    self.df.at[idx, 'selectivity_tier'] = correct_tier
                    self.fixes_applied.append(f"Fixed selectivity tier for {college_name}: {current_tier} -> {correct_tier}")

    def _classify_by_acceptance_rate(self, acceptance_rate: float) -> str:
        """Classify selectivity based on acceptance rate"""
        if acceptance_rate <= 0.10:
            return 'Elite'
        elif acceptance_rate <= 0.25:
            return 'Highly Selective'
        elif acceptance_rate <= 0.60:
            return 'Moderately Selective'
        else:
            return 'Less Selective'

    def _fix_missing_locations(self):
        """Fix missing city/state data"""
        for idx, row in self.df.iterrows():
            college_name = row['name']
            
            # Use known correct data if available
            if college_name in self.known_correct_data:
                correct_data = self.known_correct_data[college_name]
                if pd.isna(row['city']):
                    self.df.at[idx, 'city'] = correct_data['city']
                    self.fixes_applied.append(f"Fixed missing city for {college_name}: {correct_data['city']}")
                if pd.isna(row['state']):
                    self.df.at[idx, 'state'] = correct_data['state']
                    self.fixes_applied.append(f"Fixed missing state for {college_name}: {correct_data['state']}")

    def _fix_school_names(self):
        """Fix inconsistent school names"""
        name_fixes = {
            'California State Polytechnic University-Humboldt': 'Cal Poly Humboldt',
            'University of California--Berkeley': 'University of California Berkeley',
            'University of California--Los Angeles': 'University of California Los Angeles',
            'University of California--San Diego': 'University of California San Diego',
            'University of Illinois--Urbana-Champaign': 'University of Illinois Urbana-Champaign',
            'University of Michigan--Ann Arbor': 'University of Michigan Ann Arbor',
            'University of North Carolina--Chapel Hill': 'University of North Carolina Chapel Hill',
            'University of Texas--Austin': 'University of Texas Austin',
            'University of Wisconsin--Madison': 'University of Wisconsin Madison'
        }
        
        for idx, row in self.df.iterrows():
            college_name = row['name']
            if college_name in name_fixes:
                new_name = name_fixes[college_name]
                self.df.at[idx, 'name'] = new_name
                self.fixes_applied.append(f"Fixed school name: {college_name} -> {new_name}")

    def _validate_against_known_data(self):
        """Validate data against known correct values"""
        for college_name, correct_data in self.known_correct_data.items():
            college_row = self.df[self.df['name'] == college_name]
            if len(college_row) == 0:
                self.issues_found.append(f"Missing college: {college_name}")
                continue
                
            row = college_row.iloc[0]
            
            # Check acceptance rate
            if abs(row['acceptance_rate'] - correct_data['acceptance_rate']) > 0.05:
                self.issues_found.append(f"Acceptance rate mismatch for {college_name}: {row['acceptance_rate']:.1%} vs expected {correct_data['acceptance_rate']:.1%}")
            
            # Check selectivity tier
            if row['selectivity_tier'] != correct_data['selectivity_tier']:
                self.issues_found.append(f"Selectivity tier mismatch for {college_name}: {row['selectivity_tier']} vs expected {correct_data['selectivity_tier']}")
            
            # Check location
            if row['city'] != correct_data['city']:
                self.issues_found.append(f"City mismatch for {college_name}: {row['city']} vs expected {correct_data['city']}")
            
            if row['state'] != correct_data['state']:
                self.issues_found.append(f"State mismatch for {college_name}: {row['state']} vs expected {correct_data['state']}")

    def get_validation_report(self) -> Dict:
        """Get a comprehensive validation report"""
        return {
            'total_colleges': len(self.df),
            'issues_found': self.issues_found,
            'fixes_applied': self.fixes_applied,
            'data_quality_score': self._calculate_data_quality_score()
        }

    def _calculate_data_quality_score(self) -> float:
        """Calculate overall data quality score (0-100)"""
        total_fields = len(self.df) * 4  # name, acceptance_rate, city, state
        missing_fields = (
            self.df['name'].isna().sum() +
            self.df['acceptance_rate'].isna().sum() +
            self.df['city'].isna().sum() +
            self.df['state'].isna().sum()
        )
        return max(0, 100 - (missing_fields / total_fields * 100))

    def save_cleaned_data(self, output_path: str = 'backend/data/raw/cleaned_colleges.csv'):
        """Save the cleaned data to a new file"""
        self.df.to_csv(output_path, index=False)
        print(f"Cleaned data saved to {output_path}")

# Usage function
def validate_and_clean_college_data():
    """Main function to validate and clean college data"""
    validator = CollegeDataValidator()
    cleaned_df = validator.validate_and_fix_data()
    
    # Generate report
    report = validator.get_validation_report()
    print("\n" + "="*50)
    print("COLLEGE DATA VALIDATION REPORT")
    print("="*50)
    print(f"Total colleges: {report['total_colleges']}")
    print(f"Data quality score: {report['data_quality_score']:.1f}%")
    print(f"Issues found: {len(report['issues_found'])}")
    print(f"Fixes applied: {len(report['fixes_applied'])}")
    
    if report['issues_found']:
        print("\nIssues found:")
        for issue in report['issues_found']:
            print(f"  - {issue}")
    
    if report['fixes_applied']:
        print("\nFixes applied:")
        for fix in report['fixes_applied']:
            print(f"  + {fix}")
    
    # Save cleaned data
    validator.save_cleaned_data()
    
    return cleaned_df

if __name__ == "__main__":
    validate_and_clean_college_data()
