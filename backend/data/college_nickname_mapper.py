#!/usr/bin/env python3
"""
College Nickname Mapping System
Maps common nicknames and abbreviations to official college names
"""

import pandas as pd
import os
from typing import Dict, List, Optional

class CollegeNicknameMapper:
    def __init__(self):
        """Initialize the college nickname mapping system"""
        self.nickname_mapping = {}
        self.load_nickname_mapping()
    
    def load_nickname_mapping(self):
        """Load college nicknames from Excel file and create comprehensive mapping"""
        try:
            # Load the Excel file
            excel_path = os.path.join(os.path.dirname(__file__), '..', '..', 'therealdatabase', 'College_Names_and_Nicknames.xlsx')
            df = pd.read_excel(excel_path)
            
            print(f"Loaded college nicknames: {len(df)} colleges")
            
            # Build comprehensive mapping
            for _, row in df.iterrows():
                official_name = str(row.get('Official Name', '')).strip()
                common_name = str(row.get('Common Name', '')).strip()
                abbreviation = str(row.get('Abbreviation', '')).strip()
                
                if official_name and official_name != 'nan':
                    # Map official name to itself
                    self.nickname_mapping[official_name.lower()] = official_name
                    
                    # Map common name to official name
                    if common_name and common_name != 'nan':
                        self.nickname_mapping[common_name.lower()] = official_name
                    
                    # Map abbreviation to official name
                    if abbreviation and abbreviation != 'nan':
                        self.nickname_mapping[abbreviation.lower()] = official_name
            
            # Add additional common mappings
            self.add_common_mappings()
            
            print(f"Total mappings created: {len(self.nickname_mapping)}")
            
        except Exception as e:
            print(f"Error loading nickname mapping: {e}")
            self.add_common_mappings()
    
    def add_common_mappings(self):
        """Add common college nickname mappings"""
        common_mappings = {
            # MIT and similar
            'mit': 'Massachusetts Institute of Technology',
            'massachusetts institute of technology': 'Massachusetts Institute of Technology',
            
            # Ivy League
            'harvard': 'Harvard University',
            'harvard university': 'Harvard University',
            'yale': 'Yale University',
            'yale university': 'Yale University',
            'princeton': 'Princeton University',
            'princeton university': 'Princeton University',
            'columbia': 'Columbia University',
            'columbia university': 'Columbia University',
            'upenn': 'University of Pennsylvania',
            'university of pennsylvania': 'University of Pennsylvania',
            'brown': 'Brown University',
            'brown university': 'Brown University',
            'dartmouth': 'Dartmouth College',
            'dartmouth college': 'Dartmouth College',
            'cornell': 'Cornell University',
            'cornell university': 'Cornell University',
            
            # Other top schools
            'stanford': 'Stanford University',
            'stanford university': 'Stanford University',
            'caltech': 'California Institute of Technology',
            'california institute of technology': 'California Institute of Technology',
            'carnegie mellon': 'Carnegie Mellon University',
            'cmu': 'Carnegie Mellon University',
            'duke': 'Duke University',
            'duke university': 'Duke University',
            'northwestern': 'Northwestern University',
            'northwestern university': 'Northwestern University',
            'rice': 'Rice University',
            'rice university': 'Rice University',
            'vanderbilt': 'Vanderbilt University',
            'vanderbilt university': 'Vanderbilt University',
            'notre dame': 'University of Notre Dame',
            'university of notre dame': 'University of Notre Dame',
            
            # UC System
            'uc berkeley': 'University of California-Berkeley',
            'berkeley': 'University of California-Berkeley',
            'ucla': 'University of California-Los Angeles',
            'uc los angeles': 'University of California-Los Angeles',
            'uc san diego': 'University of California-San Diego',
            'ucsd': 'University of California-San Diego',
            'uc irvine': 'University of California-Irvine',
            'uci': 'University of California-Irvine',
            'uc davis': 'University of California-Davis',
            'uc santa barbara': 'University of California-Santa Barbara',
            'ucsb': 'University of California-Santa Barbara',
            'uc santa cruz': 'University of California-Santa Cruz',
            'ucsc': 'University of California-Santa Cruz',
            'uc riverside': 'University of California-Riverside',
            'uc merced': 'University of California-Merced',
            
            # State schools
            'umich': 'University of Michigan-Ann Arbor',
            'university of michigan': 'University of Michigan-Ann Arbor',
            'michigan': 'University of Michigan-Ann Arbor',
            'georgia tech': 'Georgia Institute of Technology',
            'gatech': 'Georgia Institute of Technology',
            'unc': 'University of North Carolina at Chapel Hill',
            'unc chapel hill': 'University of North Carolina at Chapel Hill',
            'uva': 'University of Virginia',
            'university of virginia': 'University of Virginia',
            'ut austin': 'University of Texas at Austin',
            'university of texas austin': 'University of Texas at Austin',
            'texas': 'University of Texas at Austin',
            'penn state': 'Pennsylvania State University-Main Campus',
            'ohio state': 'Ohio State University-Main Campus',
            'osu': 'Ohio State University-Main Campus',
            'florida': 'University of Florida',
            'university of florida': 'University of Florida',
            'uf': 'University of Florida',
            
            # Private schools
            'nyu': 'New York University',
            'new york university': 'New York University',
            'usc': 'University of Southern California',
            'university of southern california': 'University of Southern California',
            'boston college': 'Boston College',
            'bc': 'Boston College',
            'tufts': 'Tufts University',
            'tufts university': 'Tufts University',
            'brandeis': 'Brandeis University',
            'brandeis university': 'Brandeis University',
            'wake forest': 'Wake Forest University',
            'wake forest university': 'Wake Forest University',
            'emory': 'Emory University',
            'emory university': 'Emory University',
            'georgetown': 'Georgetown University',
            'georgetown university': 'Georgetown University',
            'johns hopkins': 'Johns Hopkins University',
            'jhu': 'Johns Hopkins University',
            'washu': 'Washington University in St Louis',
            'washington university st louis': 'Washington University in St Louis',
            'case western': 'Case Western Reserve University',
            'case western reserve': 'Case Western Reserve University',
            'cwr': 'Case Western Reserve University',
        }
        
        # Add to mapping
        for nickname, official_name in common_mappings.items():
            self.nickname_mapping[nickname.lower()] = official_name
    
    def find_college_by_nickname(self, search_term: str) -> Optional[str]:
        """
        Find official college name by nickname or abbreviation
        
        Args:
            search_term: The search term (nickname, abbreviation, or partial name)
            
        Returns:
            Official college name if found, None otherwise
        """
        if not search_term:
            return None
        
        search_term = search_term.strip().lower()
        
        # Direct nickname match
        if search_term in self.nickname_mapping:
            return self.nickname_mapping[search_term]
        
        # Partial match - check if search term is contained in any nickname
        for nickname, official_name in self.nickname_mapping.items():
            if search_term in nickname or nickname in search_term:
                return official_name
        
        return None
    
    def get_all_nicknames(self) -> Dict[str, str]:
        """Get all nickname mappings"""
        return self.nickname_mapping.copy()

# Global instance
nickname_mapper = CollegeNicknameMapper()
