"""
Services module for Chancify AI backend.
Contains external service integrations.
"""

from .openai_service import college_info_service

__all__ = [
    "college_info_service",
]

