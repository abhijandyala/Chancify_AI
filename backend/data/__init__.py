"""
Data module for Chancify AI backend.
Contains college data, mappings, and data services.
"""

# Import commonly used modules
from .college_names_mapping import college_names_mapping
from .college_nickname_mapper import nickname_mapper
from .college_subject_emphasis import college_subject_emphasis
from .tuition_state_service import tuition_state_service
from .improvement_analysis_service import improvement_analysis_service
from .real_college_suggestions import real_college_suggestions
from .real_ipeds_major_mapping import (
    get_colleges_for_major,
    get_major_strength_score,
    get_major_relevance_info
)

__all__ = [
    "college_names_mapping",
    "nickname_mapper",
    "college_subject_emphasis",
    "tuition_state_service",
    "improvement_analysis_service",
    "real_college_suggestions",
    "get_colleges_for_major",
    "get_major_strength_score",
    "get_major_relevance_info",
]

