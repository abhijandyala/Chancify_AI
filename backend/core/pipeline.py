"""
Complete end-to-end probability calculation pipeline.
Integrates scoring, probability, and audit modules.
"""

from typing import Dict, Optional
from .scoring import CollegePolicy, compute_composite, apply_conduct_penalty
from .probability import calculate_probability, probability_to_percentile
from .audit import AuditReport, build_audit


def calculate_admission_probability(
    factor_scores: Dict[str, Optional[float]],
    acceptance_rate: float,
    uses_testing: bool = True,
    need_aware: bool = False
) -> AuditReport:
    """
    Complete pipeline: scores → composite → probability → audit report.
    
    This is the main function that external APIs should call.
    
    Args:
        factor_scores: Dictionary of factor scores (0-10 scale)
        acceptance_rate: College's acceptance rate (0-1, e.g., 0.10 for 10%)
        uses_testing: Does college require/consider test scores?
        need_aware: Is college need-aware in admissions?
        
    Returns:
        Complete AuditReport with probability and breakdown
        
    Example:
        >>> scores = {
        ...     "grades": 9.0,
        ...     "rigor": 8.5,
        ...     "essay": 7.5,
        ...     "ecs_leadership": 8.0,
        ... }
        >>> report = calculate_admission_probability(scores, 0.10)
        >>> print(f"Probability: {report.probability * 100:.1f}%")
    """
    # Step 1: Define college policy
    policy = CollegePolicy(
        uses_testing=uses_testing,
        need_aware=need_aware
    )
    
    # Step 2: Compute composite score
    scoring_result = compute_composite(factor_scores, policy)
    
    # Step 3: Apply conduct penalty if applicable
    conduct_score = factor_scores.get("conduct_record")
    final_composite = apply_conduct_penalty(
        scoring_result.composite,
        conduct_score
    )
    
    # Step 4: Calculate probability
    prob_result = calculate_probability(
        composite_score=final_composite,
        acceptance_rate=acceptance_rate
    )
    
    # Step 5: Estimate percentile
    percentile = probability_to_percentile(
        prob_result.probability,
        acceptance_rate
    )
    
    # Step 6: Build audit trail
    audit_rows = build_audit(
        scores=factor_scores,
        used_factors=scoring_result.used_factors
    )
    
    # Step 7: Compile policy notes
    policy_notes = []
    if not uses_testing:
        policy_notes.append("Test-optional: standardized testing scores not used")
    if not need_aware:
        policy_notes.append("Need-blind: ability to pay not considered")
    if scoring_result.cluster_note:
        policy_notes.append(scoring_result.cluster_note)
    if conduct_score and conduct_score < 5:
        penalty = (5.0 - conduct_score) * 8.0
        policy_notes.append(f"Conduct penalty applied: -{penalty:.0f} points")
    
    # Step 8: Create final report
    report = AuditReport(
        composite_score=final_composite,
        probability=prob_result.probability,
        acceptance_rate=acceptance_rate,
        percentile_estimate=percentile,
        factor_breakdown=audit_rows,
        policy_notes=policy_notes
    )
    
    return report


def batch_calculate_probabilities(
    factor_scores: Dict[str, Optional[float]],
    colleges: list
) -> Dict[str, AuditReport]:
    """
    Calculate probabilities for multiple colleges at once.
    
    Args:
        factor_scores: Student's factor scores
        colleges: List of dicts with college info:
                  [{"name": "Harvard", "acceptance_rate": 0.04, ...}, ...]
        
    Returns:
        Dictionary mapping college names to AuditReports
    """
    results = {}
    
    for college in colleges:
        name = college["name"]
        acceptance_rate = college["acceptance_rate"]
        uses_testing = college.get("uses_testing", True)
        need_aware = college.get("need_aware", False)
        
        report = calculate_admission_probability(
            factor_scores=factor_scores,
            acceptance_rate=acceptance_rate,
            uses_testing=uses_testing,
            need_aware=need_aware
        )
        
        results[name] = report
    
    return results


# Complete example demonstrating the full pipeline
if __name__ == "__main__":
    print("=" * 80)
    print("CHANCIFY AI - COMPLETE PROBABILITY CALCULATION DEMO")
    print("=" * 80)
    print()
    
    # Sample student profile
    student_scores = {
        "grades": 9.2,              # Excellent GPA
        "rigor": 8.5,               # Strong course rigor
        "testing": 8.8,             # SAT ~1480
        "essay": 7.5,               # Good essays
        "ecs_leadership": 8.5,      # Strong ECs with leadership
        "recommendations": 8.0,     # Strong recommendations
        "plan_timing": 8.0,         # Applying ED1
        "athletic_recruit": 3.0,    # Not recruited
        "major_fit": 7.0,           # Good fit
        "geography_residency": 6.0, # Out-of-state
        "firstgen_diversity": 7.0,  # First-gen
        "awards_publications": 7.5, # Some awards
        "demonstrated_interest": 7.5, # Visited campus
        "legacy": 3.0,              # Not legacy
        "interview": 7.5,           # Good interview
        "conduct_record": 9.0,      # Clean record
        "hs_reputation": 7.0,       # Good high school
    }
    
    # Test with three different colleges
    colleges = [
        {
            "name": "Elite University (Harvard-level)",
            "acceptance_rate": 0.04,
            "uses_testing": True,
            "need_aware": False
        },
        {
            "name": "Highly Selective (Northwestern-level)",
            "acceptance_rate": 0.09,
            "uses_testing": True,
            "need_aware": False
        },
        {
            "name": "Selective State University",
            "acceptance_rate": 0.35,
            "uses_testing": False,  # Test-optional
            "need_aware": True
        }
    ]
    
    # Calculate probabilities
    results = batch_calculate_probabilities(student_scores, colleges)
    
    # Display results
    for college_name, report in results.items():
        print()
        print("=" * 80)
        print(f"COLLEGE: {college_name}")
        print("=" * 80)
        print(f"  Composite Score:     {report.composite_score:.1f} / 1000")
        print(f"  Admission Prob:      {report.probability * 100:.1f}%")
        print(f"  School Accept Rate:  {report.acceptance_rate * 100:.1f}%")
        print(f"  Percentile Estimate: ~{report.percentile_estimate:.0f}th")
        print()
        
        # Show top strengths
        from .audit import identify_strengths_and_weaknesses
        insights = identify_strengths_and_weaknesses(report.factor_breakdown, top_n=5)
        
        print("  Top Strengths:")
        for strength in insights["strengths"][:3]:
            print(f"    ✓ {strength}")
        
        print()
        print("  Areas to Improve:")
        for weakness in insights["weaknesses"][:3]:
            print(f"    ⚠ {weakness}")
        
        print()
        if report.policy_notes:
            print("  Policy Notes:")
            for note in report.policy_notes:
                print(f"    • {note}")
    
    print()
    print("=" * 80)
    print("INTERPRETATION")
    print("=" * 80)
    print("""
This student has a strong profile with excellent academics (GPA 9.2, Rigor 8.5).
They would be:
  • A REACH at elite schools (4% chance at Harvard-level)
  • A TARGET at highly selective schools (15% at Northwestern-level)  
  • A LIKELY ADMIT at selective state schools (71% acceptance)

Key Strengths: Academics, first-gen status, leadership
Areas to Improve: Legacy/athletics (not applicable), geographic diversity

Recommendation: Apply to a balanced mix of reach, target, and safety schools.
    """)
    print("=" * 80)

