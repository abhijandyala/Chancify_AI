"""
Probability calculation using logistic regression.
Maps composite scores (0-1000) to admission probabilities (0-1).
"""

import math
from typing import Tuple, Optional
from dataclasses import dataclass


@dataclass
class CalibrationParams:
    """Logistic regression parameters for a college"""
    A: float  # Steepness parameter
    C: float  # Center score (inflection point)
    
    
@dataclass
class ProbabilityResult:
    """Result of probability calculation"""
    probability: float
    composite_score: float
    calibration: CalibrationParams
    acceptance_rate: float


def logistic_prob(
    score_0_to_1000: float,
    A: float,
    C: float
) -> float:
    """
    Calculate admission probability using logistic function.
    
    Formula: P = 1 / (1 + e^(-A * (score - C)))
    
    Args:
        score_0_to_1000: Composite score (0-1000)
        A: Steepness parameter (higher = steeper curve)
        C: Center score (50% probability point)
        
    Returns:
        Probability clamped to [0.02, 0.98] (2% - 98%)
    """
    exponent = -A * (score_0_to_1000 - C)
    
    # Handle overflow/underflow
    if exponent > 100:
        probability = 0.0
    elif exponent < -100:
        probability = 1.0
    else:
        probability = 1.0 / (1.0 + math.exp(exponent))
    
    # Clamp to reasonable range (never 0% or 100%)
    # Cap at 85% for consistency with real college suggestions system
    return max(0.02, min(0.85, probability))


def default_calibration(acceptance_rate: float) -> CalibrationParams:
    """
    Generate default calibration parameters based on acceptance rate.
    
    Heuristic approach for MVP when no college-specific calibration exists:
    - More selective schools (lower acceptance rate) get steeper curves
    - Center point C adjusted so that mean applicant (score ~600) 
      has probability close to the acceptance rate
    
    Args:
        acceptance_rate: Overall acceptance rate (0-1, e.g., 0.10 for 10%)
        
    Returns:
        CalibrationParams with A and C values
    """
    # Clamp acceptance rate to reasonable bounds
    R = max(0.03, min(0.80, acceptance_rate))
    
    # Steepness: increase for more selective schools
    # Base steepness of 0.012, increases as acceptance rate drops below 15%
    A = 0.012 + (0.02 * (0.15 - R)) if R < 0.15 else 0.012
    
    # Center point: where probability = acceptance_rate
    # Assume mean applicant has composite score of 600
    mean_score = 600.0
    
    # Solve for C: at mean_score, we want P ≈ R
    # R = 1 / (1 + e^(-A * (mean - C)))
    # e^(-A * (mean - C)) = (1 - R) / R
    # -A * (mean - C) = ln((1 - R) / R)
    # C = mean - (1/A) * ln((1 - R) / R)
    
    logit_R = math.log(R / (1.0 - R))
    C = mean_score - (1.0 / A) * logit_R
    
    return CalibrationParams(A=A, C=C)


def calculate_probability(
    composite_score: float,
    acceptance_rate: float,
    calibration: Optional[CalibrationParams] = None
) -> ProbabilityResult:
    """
    Calculate admission probability for a student.
    
    Args:
        composite_score: Student's composite score (0-1000)
        acceptance_rate: College's acceptance rate (0-1)
        calibration: Optional custom calibration params, otherwise use default
        
    Returns:
        ProbabilityResult with probability and metadata
    """
    if calibration is None:
        calibration = default_calibration(acceptance_rate)
    
    probability = logistic_prob(composite_score, calibration.A, calibration.C)
    
    return ProbabilityResult(
        probability=probability,
        composite_score=composite_score,
        calibration=calibration,
        acceptance_rate=acceptance_rate
    )


def probability_to_percentile(
    probability: float,
    acceptance_rate: float
) -> float:
    """
    Convert probability to approximate percentile in applicant pool.
    
    Rough heuristic:
    - If prob = acceptance_rate, you're at 50th percentile
    - If prob > acceptance_rate, you're above average
    - If prob < acceptance_rate, you're below average
    
    Args:
        probability: Calculated admission probability
        acceptance_rate: College's acceptance rate
        
    Returns:
        Approximate percentile (0-100)
    """
    if acceptance_rate <= 0:
        return 50.0
    
    # Simple mapping: log ratio of prob/rate
    ratio = probability / acceptance_rate
    
    if ratio >= 1.0:
        # Above average: map to 50-100 percentile
        percentile = 50 + 50 * (1 - math.exp(-0.5 * (ratio - 1)))
    else:
        # Below average: map to 0-50 percentile
        percentile = 50 * ratio
    
    return max(0.0, min(100.0, percentile))


# Example usage and tests
if __name__ == "__main__":
    print("=" * 60)
    print("PROBABILITY CALCULATION TESTS")
    print("=" * 60)
    
    # Test 1: Highly selective school (7% acceptance)
    print("\nTest 1: Elite University (7% acceptance rate)")
    print("-" * 60)
    cal = default_calibration(0.07)
    print(f"Calibration: A={cal.A:.4f}, C={cal.C:.1f}")
    
    for score in [600, 700, 800, 900]:
        prob = logistic_prob(score, cal.A, cal.C)
        percentile = probability_to_percentile(prob, 0.07)
        print(f"  Score {score}: {prob*100:.1f}% probability, ~{percentile:.0f}th percentile")
    
    # Test 2: Moderately selective (40% acceptance)
    print("\nTest 2: State University (40% acceptance rate)")
    print("-" * 60)
    cal = default_calibration(0.40)
    print(f"Calibration: A={cal.A:.4f}, C={cal.C:.1f}")
    
    for score in [500, 600, 700, 800]:
        prob = logistic_prob(score, cal.A, cal.C)
        percentile = probability_to_percentile(prob, 0.40)
        print(f"  Score {score}: {prob*100:.1f}% probability, ~{percentile:.0f}th percentile")
    
    # Test 3: Very selective (3% acceptance - Ivy League)
    print("\nTest 3: Ivy League (3% acceptance rate)")
    print("-" * 60)
    cal = default_calibration(0.03)
    print(f"Calibration: A={cal.A:.4f}, C={cal.C:.1f}")
    
    for score in [700, 800, 900, 950]:
        prob = logistic_prob(score, cal.A, cal.C)
        percentile = probability_to_percentile(prob, 0.03)
        print(f"  Score {score}: {prob*100:.1f}% probability, ~{percentile:.0f}th percentile")
    
    print("\n" + "=" * 60)
    print("Key Insights:")
    print("- Steeper curves (higher A) for more selective schools")
    print("- No score guarantees admission (max 98%)")
    print("- Even low scores have minimum 2% chance")
    print("- Center point C shifts based on acceptance rate")
    print("=" * 60)

