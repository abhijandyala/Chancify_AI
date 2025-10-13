"""
Complete Example: Chancify AI Probability Calculation
Shows how to use the scoring system from start to finish.
"""

import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from core import (
    calculate_admission_probability,
    format_audit_for_display
)


def main():
    """
    Example: Calculate admission probabilities for a student applying to
    three different colleges with varying selectivity levels.
    """
    
    print("=" * 80)
    print("CHANCIFY AI - COMPLETE CALCULATION EXAMPLE")
    print("=" * 80)
    print()
    
    # Define a sample student profile
    # All scores are on a 0-10 scale where:
    # 0-3: Below average
    # 4-6: Average
    # 7-8: Above average
    # 9-10: Exceptional
    
    print("STUDENT PROFILE")
    print("-" * 80)
    
    student_profile = {
        # Academic Factors (45% total weight)
        "grades": 8.8,              # 3.85 GPA (unweighted)
        "rigor": 8.2,               # 8 AP courses, 3 honors
        "testing": 8.5,             # SAT 1470
        
        # Qualitative Factors (13% total weight)
        "essay": 7.8,               # Strong, authentic essays
        "recommendations": 8.0,      # Very positive teacher recs
        "interview": 7.5,            # Good alumni interview
        
        # Co-curricular (7.5% weight)
        "ecs_leadership": 8.3,      # President of 2 clubs, 4-year commitment
        
        # Strategic (9.5% weight)
        "plan_timing": 8.0,         # Applying Early Decision
        "major_fit": 7.0,           # Good alignment with intended major
        "demonstrated_interest": 8.0, # Campus visit, attended info session
        
        # Special (6% weight)
        "athletic_recruit": 3.0,    # Not a recruited athlete
        "portfolio_audition": 5.0,  # Not applicable (not arts major)
        
        # Demographic (6% weight)
        "geography_residency": 6.0, # Out-of-state but from represented region
        "firstgen_diversity": 8.0,  # First-generation college student
        
        # Financial (3% weight)
        "ability_to_pay": 5.0,      # Neutral (need-blind schools)
        
        # Achievement (2% weight)
        "awards_publications": 7.5, # Regional science fair winner, some honors
        
        # Institutional (3.5% weight)
        "policy_knob": 5.0,         # Neutral
        "legacy": 3.0,              # Not a legacy
        
        # Negative (0.5% weight)
        "conduct_record": 9.0,      # Clean record, no issues
        
        # Contextual (2% weight)
        "hs_reputation": 7.5,       # Well-regarded public high school
    }
    
    print("Academic:")
    print(f"  GPA: {student_profile['grades']}/10 (3.85 unweighted)")
    print(f"  Rigor: {student_profile['rigor']}/10 (8 APs, 3 Honors)")
    print(f"  Testing: {student_profile['testing']}/10 (SAT 1470)")
    print()
    print("Profile Highlights:")
    print("  • First-generation college student")
    print("  • Strong academic performance with rigorous curriculum")
    print("  • Significant leadership in extracurriculars")
    print("  • Applying Early Decision (demonstrates commitment)")
    print()
    
    # Define three colleges of different selectivity
    colleges = [
        {
            "name": "Elite Private University",
            "description": "Ivy League level (Harvard, Princeton, Yale)",
            "acceptance_rate": 0.04,
            "uses_testing": True,
            "need_aware": False,
        },
        {
            "name": "Highly Selective University",
            "description": "Top 20 school (Northwestern, Vanderbilt, Duke)",
            "acceptance_rate": 0.09,
            "uses_testing": True,
            "need_aware": False,
        },
        {
            "name": "Selective State University",
            "description": "Top state flagship (UVA, UMich, UNC)",
            "acceptance_rate": 0.28,
            "uses_testing": False,  # Test-optional
            "need_aware": True,     # Need-aware for out-of-state
        }
    ]
    
    # Calculate probabilities for each college
    results = []
    for college in colleges:
        report = calculate_admission_probability(
            factor_scores=student_profile,
            acceptance_rate=college["acceptance_rate"],
            uses_testing=college["uses_testing"],
            need_aware=college["need_aware"]
        )
        results.append((college, report))
    
    # Display results
    print("=" * 80)
    print("PROBABILITY CALCULATIONS")
    print("=" * 80)
    print()
    
    for college, report in results:
        print("-" * 80)
        print(f"COLLEGE: {college['name']}")
        print(f"({college['description']})")
        print("-" * 80)
        print(f"Overall Acceptance Rate:     {college['acceptance_rate'] * 100:.1f}%")
        print(f"Student Composite Score:     {report.composite_score:.0f} / 1000")
        print(f"Estimated Admission Prob:    {report.probability * 100:.1f}%")
        print(f"Percentile in Applicant Pool: ~{report.percentile_estimate:.0f}th")
        print()
        
        # Classification
        prob = report.probability
        if prob < 0.15:
            category = "REACH (Dream)"
        elif prob < 0.40:
            category = "REACH"
        elif prob < 0.65:
            category = "TARGET"
        else:
            category = "SAFETY (Likely)"
        
        print(f"School Category: {category}")
        print()
        
        # Show strengths/weaknesses
        from core.audit import identify_strengths_and_weaknesses
        insights = identify_strengths_and_weaknesses(report.factor_breakdown, top_n=3)
        
        if insights["strengths"]:
            print("Top Strengths:")
            for strength in insights["strengths"]:
                print(f"  ✓ {strength}")
        print()
        
        if insights["weaknesses"]:
            print("Areas to Strengthen:")
            for weakness in insights["weaknesses"]:
                print(f"  ⚠ {weakness}")
        print()
    
    # Summary and recommendations
    print("=" * 80)
    print("SUMMARY & RECOMMENDATIONS")
    print("=" * 80)
    print()
    print("College List Balance:")
    print(f"  • Elite University: {results[0][1].probability * 100:.1f}% (REACH)")
    print(f"  • Highly Selective: {results[1][1].probability * 100:.1f}% (REACH/TARGET)")
    print(f"  • State University: {results[2][1].probability * 100:.1f}% (TARGET)")
    print()
    print("Recommendations:")
    print("  1. This is a strong applicant with competitive chances")
    print("  2. Consider adding 2-3 more target schools (40-60% probability)")
    print("  3. Add 2 safety schools (>70% probability) for security")
    print("  4. Early Decision significantly boosts chances - use strategically")
    print("  5. First-gen status is a notable advantage - highlight in essays")
    print()
    print("Improvement Opportunities:")
    print("  • Consider retaking SAT to push from 1470 → 1520+ (if time allows)")
    print("  • Strengthen supplemental essays to stand out at reach schools")
    print("  • Continue demonstrating interest at target schools")
    print()
    print("=" * 80)
    print()
    
    # Option to show full detailed audit for one school
    print("Would you like to see the complete factor breakdown?")
    print("Running full audit for Highly Selective University...")
    print()
    
    full_audit = format_audit_for_display(results[1][1])
    print(full_audit)


if __name__ == "__main__":
    main()

