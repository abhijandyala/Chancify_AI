#!/usr/bin/env python3
"""
College Names and Nicknames Mapping System

This module loads and manages the college names and nicknames data from the Excel file,
providing fuzzy search capabilities for college names, common names, and abbreviations.
"""

import pandas as pd
import os
from typing import Dict, List, Optional, Tuple
import re

class CollegeNamesMapping:
    def __init__(self):
        """Initialize the college names mapping system"""
        self.college_mapping = {}  # Maps all names to official names
        self.official_names = set()  # Set of all official names
        self.load_mapping_data()
    
    def load_mapping_data(self):
        """Load college names and nicknames from Excel file"""
        try:
            # Load the Excel file
            excel_path = os.path.join(os.path.dirname(__file__), '..', '..', 'therealdatabase', 'College_Names_and_Nicknames.xlsx')
            # Alternative path if the above doesn't work
            if not os.path.exists(excel_path):
                excel_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'therealdatabase', 'College_Names_and_Nicknames.xlsx')
            df = pd.read_excel(excel_path)
            
            print(f"Loaded college names mapping: {len(df)} colleges")
            
            # Build mapping dictionary
            for _, row in df.iterrows():
                official_name = str(row['Official_Name']).strip()
                common_name = str(row['Common_Name']).strip() if pd.notna(row['Common_Name']) else None
                abbreviation = str(row['Abbreviation']).strip() if pd.notna(row['Abbreviation']) else None
                
                # Add official name to set
                self.official_names.add(official_name)
                
                # Map official name to itself
                self.college_mapping[official_name.lower()] = official_name
                
                # Map common name to official name if it exists
                if common_name and common_name != 'nan':
                    self.college_mapping[common_name.lower()] = official_name
                
                # Map abbreviation to official name if it exists
                if abbreviation and abbreviation != 'nan':
                    self.college_mapping[abbreviation.lower()] = official_name
            
            print(f"Built mapping with {len(self.college_mapping)} name variations")
            
        except Exception as e:
            print(f"Error loading college names mapping: {e}")
            self.college_mapping = {}
            self.official_names = set()
    
    def find_college_by_name(self, search_term: str) -> Optional[str]:
        """
        Find the official college name by searching through all name variations.
        
        Args:
            search_term: The search term (can be official name, common name, or abbreviation)
            
        Returns:
            Official college name if found, None otherwise
        """
        if not search_term:
            return None
        
        search_term = search_term.strip().lower()
        
        # Direct match
        if search_term in self.college_mapping:
            return self.college_mapping[search_term]
        
        # Fuzzy matching - check if search term is contained in any name
        for name_variation, official_name in self.college_mapping.items():
            if search_term in name_variation or name_variation in search_term:
                return official_name
        
        return None
    
    def search_colleges(self, query: str, limit: int = 20) -> List[str]:
        """
        Search for colleges matching the query.
        
        Args:
            query: Search query
            limit: Maximum number of results
            
        Returns:
            List of official college names matching the query
        """
        if not query:
            return []
        
        query = query.strip().lower()
        matches = []
        
        # First, try exact matches
        for name_variation, official_name in self.college_mapping.items():
            if query == name_variation:
                if official_name not in matches:
                    matches.append(official_name)
        
        # Then, try partial matches
        for name_variation, official_name in self.college_mapping.items():
            if query in name_variation and official_name not in matches:
                matches.append(official_name)
        
        # Finally, try word-based matching
        query_words = query.split()
        for name_variation, official_name in self.college_mapping.items():
            name_words = name_variation.split()
            if any(word in name_words for word in query_words) and official_name not in matches:
                matches.append(official_name)
        
        return matches[:limit]
    
    def get_all_college_names(self) -> List[str]:
        """Get all official college names"""
        return list(self.official_names)
    
    def get_name_variations(self, official_name: str) -> Dict[str, str]:
        """
        Get all name variations for a given official name.
        
        Args:
            official_name: The official college name
            
        Returns:
            Dictionary mapping name variations to their types
        """
        variations = {}
        for name_variation, mapped_official in self.college_mapping.items():
            if mapped_official == official_name:
                if name_variation == official_name.lower():
                    variations[name_variation] = "official"
                else:
                    variations[name_variation] = "nickname"
        
        return variations

# Global instance
college_names_mapping = CollegeNamesMapping()
