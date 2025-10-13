"""
Chancify AI Machine Learning Module

This module provides ML-powered admission probability prediction,
combining trained models with our formula-based scoring system.
"""

from .preprocessing import (
    FeatureExtractor,
    StudentFeatures,
    CollegeFeatures
)
from .training import (
    SyntheticDataGenerator,
    generate_initial_dataset
)

__all__ = [
    # Preprocessing
    'FeatureExtractor',
    'StudentFeatures',
    'CollegeFeatures',
    
    # Training
    'SyntheticDataGenerator',
    'generate_initial_dataset',
]

__version__ = '0.1.0'

