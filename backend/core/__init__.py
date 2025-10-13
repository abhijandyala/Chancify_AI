"""
Chancify AI Core Module
Complete scoring and probability calculation system.
"""

from .weights import FACTOR_WEIGHTS, CLUSTER_FACTORS, total_weight
from .scoring import (
    CollegePolicy,
    ScoringResult,
    compute_composite,
    apply_conduct_penalty
)
from .probability import (
    CalibrationParams,
    ProbabilityResult,
    calculate_probability,
    default_calibration,
    probability_to_percentile
)
from .audit import (
    AuditRow,
    AuditReport,
    build_audit,
    identify_strengths_and_weaknesses,
    format_audit_for_display
)

__all__ = [
    # Weights
    'FACTOR_WEIGHTS',
    'CLUSTER_FACTORS',
    'total_weight',
    
    # Scoring
    'CollegePolicy',
    'ScoringResult',
    'compute_composite',
    'apply_conduct_penalty',
    
    # Probability
    'CalibrationParams',
    'ProbabilityResult',
    'calculate_probability',
    'default_calibration',
    'probability_to_percentile',
    
    # Audit
    'AuditRow',
    'AuditReport',
    'build_audit',
    'identify_strengths_and_weaknesses',
    'format_audit_for_display',
]

