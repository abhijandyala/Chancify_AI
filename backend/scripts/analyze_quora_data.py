#!/usr/bin/env python3
"""
Analyze Quora admission data to create realistic probability calibrations
for elite universities based on real admission insights.
"""

import json
import re
import statistics
from collections import defaultdict
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class QuoraDataAnalyzer:
    def __init__(self, data_file="backend/data/raw/quora_admission_data.json"):
        self.data_file = data_file
        self.data = self.load_data()
        
    def load_data(self):
        """Load Quora scraped data"""
        try:
            with open(self.data_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            logger.error(f"Data file {self.data_file} not found. Run quora_scraper.py first.")
            return {}
    
    def analyze_metrics(self):
        """
        Analyze GPA, SAT, ACT metrics from Quora posts
        """
        college_metrics = defaultdict(list)
        
        for college, posts in self.data.items():
            for post in posts:
                metrics = post.get('metrics', {})
                if metrics:
                    college_metrics[college].append(metrics)
        
        # Calculate statistics for each college
        college_stats = {}
        for college, metrics_list in college_metrics.items():
            if not metrics_list:
                continue
                
            stats = {
                'gpa': self._calculate_stats([m.get('gpa') for m in metrics_list if m.get('gpa')]),
                'sat': self._calculate_stats([m.get('sat') for m in metrics_list if m.get('sat')]),
                'act': self._calculate_stats([m.get('act') for m in metrics_list if m.get('act')]),
                'acceptance_rate': self._calculate_stats([m.get('acceptance_rate') for m in metrics_list if m.get('acceptance_rate')])
            }
            college_stats[college] = stats
            
        return college_stats
    
    def _calculate_stats(self, values):
        """Calculate statistics for a list of values"""
        if not values:
            return None
            
        return {
            'min': min(values),
            'max': max(values),
            'mean': statistics.mean(values),
            'median': statistics.median(values),
            'count': len(values)
        }
    
    def analyze_advice_patterns(self):
        """
        Analyze common advice patterns for each college
        """
        advice_patterns = defaultdict(list)
        
        for college, posts in self.data.items():
            for post in posts:
                advice = post.get('advice', [])
                advice_patterns[college].extend(advice)
        
        # Find most common advice keywords
        college_advice = {}
        for college, advice_list in advice_patterns.items():
            if not advice_list:
                continue
                
            # Count keyword frequency
            keyword_counts = defaultdict(int)
            for advice in advice_list:
                advice_lower = advice.lower()
                keywords = ['extracurricular', 'leadership', 'volunteer', 'research', 
                           'essay', 'recommendation', 'interview', 'portfolio', 'awards']
                for keyword in keywords:
                    if keyword in advice_lower:
                        keyword_counts[keyword] += 1
            
            college_advice[college] = dict(keyword_counts)
            
        return college_advice
    
    def create_realistic_probability_ranges(self):
        """
        Create realistic probability ranges based on Quora data analysis
        """
        metrics = self.analyze_metrics()
        advice = self.analyze_advice_patterns()
        
        # Known acceptance rates for elite colleges (2023 data)
        known_acceptance_rates = {
            'MIT': 0.041,
            'Harvard': 0.040,
            'Stanford': 0.040,
            'Yale': 0.053,
            'Princeton': 0.044,
            'Columbia': 0.041,
            'University of Pennsylvania': 0.059,
            'Dartmouth': 0.062,
            'Brown': 0.055,
            'Cornell': 0.087,
            'Duke': 0.059,
            'Northwestern': 0.070,
            'Vanderbilt': 0.071,
            'Rice': 0.095,
            'Emory': 0.131,
            'Georgetown': 0.120,
            'Carnegie Mellon': 0.135,
            'New York University': 0.130,
            'University of Chicago': 0.065
        }
        
        # Create realistic probability ranges
        probability_ranges = {}
        
        for college in known_acceptance_rates:
            acceptance_rate = known_acceptance_rates[college]
            
            # Base probability is the acceptance rate
            # But we'll create ranges based on profile strength
            
            # Perfect profile (4.0 GPA, 1600 SAT, 36 ACT, strong ECs)
            perfect_profile_prob = min(acceptance_rate * 3, 0.15)  # Max 15% even for perfect profiles
            
            # Strong profile (3.8+ GPA, 1500+ SAT, 34+ ACT, good ECs)
            strong_profile_prob = min(acceptance_rate * 2, 0.10)  # Max 10% for strong profiles
            
            # Average profile (3.5+ GPA, 1400+ SAT, 32+ ACT, decent ECs)
            average_profile_prob = acceptance_rate * 1.2  # Slightly above base rate
            
            # Below average profile
            below_average_prob = acceptance_rate * 0.5  # Half the base rate
            
            probability_ranges[college] = {
                'acceptance_rate': acceptance_rate,
                'perfect_profile': perfect_profile_prob,
                'strong_profile': strong_profile_prob,
                'average_profile': average_profile_prob,
                'below_average': below_average_prob,
                'quora_insights': {
                    'metrics': metrics.get(college, {}),
                    'advice': advice.get(college, {})
                }
            }
        
        return probability_ranges
    
    def generate_calibration_adjustments(self):
        """
        Generate calibration adjustments for the ML model
        """
        probability_ranges = self.create_realistic_probability_ranges()
        
        calibration_adjustments = {}
        
        for college, data in probability_ranges.items():
            acceptance_rate = data['acceptance_rate']
            
            # Create calibration factors based on college selectivity
            if acceptance_rate < 0.05:  # Ultra-selective (MIT, Harvard, Stanford)
                calibration_factor = 0.1  # Reduce probabilities by 90%
                max_probability = 0.12   # Max 12% even for perfect profiles
            elif acceptance_rate < 0.08:  # Highly selective (Yale, Princeton, etc.)
                calibration_factor = 0.15  # Reduce probabilities by 85%
                max_probability = 0.18   # Max 18% for perfect profiles
            elif acceptance_rate < 0.12:  # Very selective (Cornell, Duke, etc.)
                calibration_factor = 0.25  # Reduce probabilities by 75%
                max_probability = 0.25   # Max 25% for perfect profiles
            else:  # Selective (Rice, Emory, etc.)
                calibration_factor = 0.4   # Reduce probabilities by 60%
                max_probability = 0.35   # Max 35% for perfect profiles
            
            calibration_adjustments[college] = {
                'calibration_factor': calibration_factor,
                'max_probability': max_probability,
                'acceptance_rate': acceptance_rate,
                'category': self._get_selectivity_category(acceptance_rate)
            }
        
        return calibration_adjustments
    
    def _get_selectivity_category(self, acceptance_rate):
        """Get selectivity category based on acceptance rate"""
        if acceptance_rate < 0.05:
            return "ultra_selective"
        elif acceptance_rate < 0.08:
            return "highly_selective"
        elif acceptance_rate < 0.12:
            return "very_selective"
        else:
            return "selective"
    
    def save_analysis(self, output_file="backend/data/processed/quora_analysis.json"):
        """
        Save the complete analysis
        """
        analysis = {
            'metrics': self.analyze_metrics(),
            'advice_patterns': self.analyze_advice_patterns(),
            'probability_ranges': self.create_realistic_probability_ranges(),
            'calibration_adjustments': self.generate_calibration_adjustments()
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(analysis, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Analysis saved to {output_file}")
        return analysis

def main():
    """
    Main function to run the analysis
    """
    analyzer = QuoraDataAnalyzer()
    
    if not analyzer.data:
        logger.error("No data to analyze. Run quora_scraper.py first.")
        return
    
    logger.info("Analyzing Quora admission data...")
    analysis = analyzer.save_analysis()
    
    # Print summary
    logger.info("\n=== ANALYSIS SUMMARY ===")
    
    calibration = analysis['calibration_adjustments']
    for college, data in list(calibration.items())[:5]:  # Show first 5
        logger.info(f"{college}:")
        logger.info(f"  Acceptance Rate: {data['acceptance_rate']:.1%}")
        logger.info(f"  Calibration Factor: {data['calibration_factor']:.2f}")
        logger.info(f"  Max Probability: {data['max_probability']:.1%}")
        logger.info(f"  Category: {data['category']}")
        logger.info("")

if __name__ == "__main__":
    main()
