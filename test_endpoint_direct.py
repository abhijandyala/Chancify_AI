#!/usr/bin/env python3
"""
Test the endpoint directly to see what's causing the 500 error
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.main import CollegeSuggestionsRequest
from backend.data.real_college_suggestions import real_college_suggestions
from backend.data.real_ipeds_major_mapping import get_major_relevance_info
import time

def test_endpoint_logic():
    """Test the endpoint logic directly"""
    
    print("Testing Endpoint Logic")
    print("=" * 40)
    
    try:
        # Create a test request
        request = CollegeSuggestionsRequest(
            gpa_unweighted="3.8",
            gpa_weighted="4.2",
            sat="1450",
            act="33",
            major="Computer Science",
            extracurricular_depth="8",
            leadership_positions="7",
            awards_publications="6",
            passion_projects="8",
            business_ventures="5",
            volunteer_work="7",
            research_experience="6",
            portfolio_audition="5",
            essay_quality="7",
            recommendations="8",
            interview="6",
            demonstrated_interest="7",
            legacy_status="5",
            hs_reputation="8",
            geographic_diversity="5",
            plan_timing="5",
            geography_residency="5",
            firstgen_diversity="5",
            ability_to_pay="5",
            policy_knob="5",
            conduct_record="9"
        )
        
        print("Request created successfully")
        
        # Test the cache key creation
        cache_key = f"{request.gpa_unweighted}_{request.gpa_weighted}_{request.sat}_{request.act}_{request.major}_{request.extracurricular_depth}"
        print(f"Cache key: {cache_key}")
        
        # Test the safe_float function
        def safe_float(value: str) -> float:
            try:
                return float(value) if value and value.strip() else 0.0
            except (ValueError, TypeError):
                return 0.0
        
        def safe_int(value: str) -> int:
            try:
                return int(value) if value and value.strip() else 0
            except (ValueError, TypeError):
                return 0
        
        # Test the calculations
        gpa_unweighted = safe_float(request.gpa_unweighted)
        gpa_weighted = safe_float(request.gpa_weighted)
        sat_score = safe_int(request.sat)
        act_score = safe_int(request.act)
        
        print(f"Parsed values: GPA={gpa_unweighted}, SAT={sat_score}, ACT={act_score}")
        
        # Test academic strength calculation
        gpa_score = min(10.0, (gpa_unweighted / 4.0) * 10.0) if gpa_unweighted > 0 else 5.0
        sat_score_scaled = min(10.0, max(0.0, ((sat_score - 1200) / 400) * 5.0 + 5.0)) if sat_score > 0 else 5.0
        act_score_scaled = min(10.0, max(0.0, ((act_score - 20) / 16) * 5.0 + 5.0)) if act_score > 0 else 5.0
        
        test_score = max(sat_score_scaled, act_score_scaled)
        academic_strength = (gpa_score + test_score) / 2.0
        
        print(f"Academic strength: {academic_strength}")
        
        # Test extracurricular strength
        ec_strength = (
            safe_float(request.extracurricular_depth) +
            safe_float(request.leadership_positions) +
            safe_float(request.awards_publications) +
            safe_float(request.passion_projects)
        ) / 4.0
        
        student_strength = (academic_strength * 0.7) + (ec_strength * 0.3)
        
        print(f"Student strength: {student_strength}")
        
        # Test getting college suggestions
        major = request.major
        print(f"Major: {major}")
        
        college_suggestions = real_college_suggestions.get_balanced_suggestions(major, student_strength)
        print(f"Got {len(college_suggestions)} college suggestions")
        
        if len(college_suggestions) < 9:
            college_suggestions = real_college_suggestions.get_fallback_suggestions(major, student_strength)
            print(f"Using fallback, got {len(college_suggestions)} suggestions")
        
        # Test converting to API format
        suggestions = []
        for college_data in college_suggestions[:9]:
            college_name = college_data['name']
            
            # Calculate probability
            acceptance_rate = college_data['acceptance_rate']
            college_selectivity = 10.0 - (acceptance_rate * 10.0)
            
            if student_strength >= 9.0:
                base_prob = 0.98
            elif student_strength >= 8.0:
                base_prob = 0.96 + (student_strength - 8.0) * 0.02
            elif student_strength >= 7.0:
                base_prob = 0.92 + (student_strength - 7.0) * 0.04
            elif student_strength >= 5.5:
                base_prob = 0.85 + (student_strength - 5.5) * 0.047
            elif student_strength >= 4.0:
                base_prob = 0.78 + (student_strength - 4.0) * 0.047
            else:
                base_prob = 0.70 + (student_strength * 0.02)
            
            # Apply selectivity adjustment
            if college_selectivity >= 9.0:
                selectivity_factor = 0.12
            elif college_selectivity >= 7.0:
                selectivity_factor = 0.25
            elif college_selectivity >= 5.0:
                selectivity_factor = 0.70
            elif college_selectivity >= 3.0:
                selectivity_factor = 0.95
            else:
                selectivity_factor = 1.0
            
            probability = max(0.01, min(0.95, base_prob * selectivity_factor))
            
            # Get major relevance
            major_relevance = get_major_relevance_info(college_name, major)
            
            suggestion = {
                'college_id': f"college_{college_data['unitid']}",
                'name': college_name,
                'probability': round(probability, 4),
                'original_probability': round(probability, 4),
                'major_fit_score': round(college_data['major_fit_score'], 2),
                'confidence_interval': {
                    "lower": round(max(0.01, probability - 0.1), 4),
                    "upper": round(min(0.95, probability + 0.1), 4)
                },
                'acceptance_rate': college_data['acceptance_rate'],
                'selectivity_tier': college_data['selectivity_tier'],
                'tier': college_data['selectivity_tier'],
                'city': college_data['city'],
                'state': college_data['state'],
                'tuition_in_state': college_data['tuition_in_state'],
                'tuition_out_of_state': college_data['tuition_out_of_state'],
                'student_body_size': college_data['student_body_size'],
                'enrollment': f"{college_data['student_body_size']:,}",
                'category': college_data['category'],
                'major_match': major_relevance['match_level'],
                'major_relevance_score': major_relevance['score']
            }
            
            suggestions.append(suggestion)
        
        print(f"Created {len(suggestions)} API suggestions")
        
        # Test response creation
        academic_score = (gpa_unweighted * 25) + (sat_score * 0.1) + (act_score * 2.5) + (ec_strength * 5)
        
        target_tiers = []
        if academic_strength >= 8.0:
            target_tiers = ['Elite', 'Highly Selective']
        elif academic_strength >= 6.0:
            target_tiers = ['Highly Selective', 'Moderately Selective']
        else:
            target_tiers = ['Moderately Selective', 'Less Selective']
        
        response_data = {
            "success": True,
            "suggestions": suggestions,
            "academic_score": round(academic_score, 2),
            "target_tiers": target_tiers,
            "prediction_method": "real_ipeds_data"
        }
        
        print("Response created successfully")
        print(f"Response keys: {list(response_data.keys())}")
        print(f"Number of suggestions: {len(response_data['suggestions'])}")
        print(f"Prediction method: {response_data['prediction_method']}")
        
        # Show first suggestion
        if response_data['suggestions']:
            first = response_data['suggestions'][0]
            print(f"First suggestion: {first['name']}")
            print(f"  Probability: {first['probability']:.1%}")
            print(f"  Major Fit Score: {first['major_fit_score']}")
            print(f"  Major Match: {first['major_match']}")
        
        print("SUCCESS: All endpoint logic works correctly!")
        
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_endpoint_logic()
