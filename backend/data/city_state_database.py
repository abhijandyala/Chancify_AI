#!/usr/bin/env python3
"""
City-State Database Service
Provides mapping between colleges and their states for accurate zipcode-based tuition calculation
"""

import pandas as pd
import os
import logging
from typing import Dict, Optional

logger = logging.getLogger(__name__)

class CityStateDatabase:
    def __init__(self):
        """Initialize the city-state database"""
        self.college_to_state = {}
        self.city_to_state = {}
        self.load_database()
    
    def load_database(self):
        """Load the college-to-state mapping from CSV files"""
        try:
            # Load from College_State_Zip.csv
            csv_path = os.path.join(os.path.dirname(__file__), '..', '..', 'College_State_Zip.csv')
            if not os.path.exists(csv_path):
                csv_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'College_State_Zip.csv')
            
            df = pd.read_csv(csv_path)
            logger.info(f"Loaded college-state mapping: {len(df)} colleges")
            
            for _, row in df.iterrows():
                college_name = str(row['College']).strip()
                state = str(row['State']).strip()
                
                # Store college to state mapping
                self.college_to_state[college_name.lower()] = state
                
                # Extract city name from college name (simplified approach)
                city_name = self.extract_city_from_college_name(college_name)
                if city_name:
                    self.city_to_state[city_name.lower()] = state
                    
        except Exception as e:
            logger.error(f"Error loading city-state database: {e}")
    
    def extract_city_from_college_name(self, college_name: str) -> Optional[str]:
        """
        Extract city name from college name using common patterns
        
        Args:
            college_name: Full college name
            
        Returns:
            Extracted city name or None
        """
        college_lower = college_name.lower()
        
        # Common patterns to extract city names
        patterns = [
            'university of',
            'college of',
            'state university',
            'community college',
            'technical college',
            'university',
            'college'
        ]
        
        for pattern in patterns:
            if pattern in college_lower:
                # Extract the part after the pattern
                parts = college_name.split(pattern, 1)
                if len(parts) > 1:
                    city_part = parts[1].strip()
                    # Clean up the city name
                    city_part = city_part.replace(' - ', ' ').replace('–', ' ').replace('—', ' ')
                    city_part = city_part.split('(')[0].strip()  # Remove anything in parentheses
                    city_part = city_part.split(',')[0].strip()  # Remove anything after comma
                    
                    if city_part and len(city_part) > 2:
                        return city_part
        
        # If no pattern matches, try to extract the last meaningful word
        words = college_name.split()
        if len(words) > 1:
            # Return the last word that's not a common suffix
            common_suffixes = ['university', 'college', 'school', 'institute', 'academy']
            for word in reversed(words):
                if word.lower() not in common_suffixes and len(word) > 2:
                    return word
        
        return None
    
    def get_state_for_college(self, college_name: str) -> Optional[str]:
        """
        Get state for a specific college
        
        Args:
            college_name: Name of the college
            
        Returns:
            State abbreviation or None if not found
        """
        return self.college_to_state.get(college_name.lower())
    
    def get_state_for_city(self, city_name: str) -> Optional[str]:
        """
        Get state for a specific city
        
        Args:
            city_name: Name of the city
            
        Returns:
            State abbreviation or None if not found
        """
        return self.city_to_state.get(city_name.lower())
    
    def is_city_in_state(self, city_name: str, target_state: str) -> bool:
        """
        Check if a city is in a specific state
        
        Args:
            city_name: Name of the city
            target_state: State abbreviation (e.g., 'PA', 'CA')
            
        Returns:
            True if city is in the target state, False otherwise
        """
        city_state = self.get_state_for_city(city_name)
        if not city_state:
            return False
        return city_state.upper() == target_state.upper()

# Global instance
city_state_database = CityStateDatabase()
