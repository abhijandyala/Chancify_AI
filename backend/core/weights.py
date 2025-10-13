"""
Factor weights for college admissions probability calculation.
Total weights sum to 100.0%
"""

from typing import Dict, Literal

# Exact factor weights (sum = 100.0)
FACTOR_WEIGHTS: Dict[str, float] = {
    "grades": 25.0,
    "rigor": 12.0,
    "testing": 8.0,
    "essay": 8.0,
    "ecs_leadership": 8.5,  # Increased from 7.5 (very important)
    "recommendations": 4.0,
    "plan_timing": 4.0,
    "athletic_recruit": 4.0,
    "major_fit": 3.5,  # Increased from 3.0 (important for fit)
    "geography_residency": 3.0,
    "firstgen_diversity": 3.0,
    "ability_to_pay": 3.0,  # used only if college is need-aware
    "awards_publications": 2.5,  # Increased from 2.0 (demonstrates achievement)
    "portfolio_audition": 2.5,  # Increased from 2.0 (crucial for arts applicants)
    "policy_knob": 2.0,  # special institutional priorities
    "demonstrated_interest": 1.5,
    "legacy": 1.5,
    "interview": 1.5,  # Increased from 1.0 (can make a difference)
    "conduct_record": 0.5,  # negative if issues
    "hs_reputation": 2.0,
}

# Factors that may cluster (anti-double-counting)
CLUSTER_FACTORS = ["ecs_leadership", "awards_publications", "portfolio_audition", "essay"]

FactorKey = Literal[
    "grades",
    "rigor", 
    "testing",
    "essay",
    "ecs_leadership",
    "recommendations",
    "plan_timing",
    "athletic_recruit",
    "major_fit",
    "geography_residency",
    "firstgen_diversity",
    "ability_to_pay",
    "awards_publications",
    "portfolio_audition",
    "policy_knob",
    "demonstrated_interest",
    "legacy",
    "interview",
    "conduct_record",
    "hs_reputation",
]


def total_weight() -> float:
    """Calculate total weight (should be 100.0)"""
    return sum(FACTOR_WEIGHTS.values())


def validate_weights() -> bool:
    """Validate that weights sum to 100.0"""
    total = total_weight()
    return abs(total - 100.0) < 0.01  # Allow small floating point error


# Validation check
assert validate_weights(), f"Weights must sum to 100.0, got {total_weight()}"

