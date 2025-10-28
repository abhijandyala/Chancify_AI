#!/usr/bin/env python3
"""
Tuition State Service
Determines in-state vs out-of-state tuition based on zipcode and college location
"""

import pandas as pd
import os
import logging
from typing import Dict, Optional, Tuple

logger = logging.getLogger(__name__)

class TuitionStateService:
    def __init__(self):
        """Initialize the tuition state service"""
        self.tuition_data = {}
        self.college_states = {}
        self.zipcode_states = {}
        self.load_tuition_data()
        self.load_zipcode_state_mapping()
    
    def load_tuition_data(self):
        """Load tuition data from CSV file"""
        try:
            csv_path = os.path.join(os.path.dirname(__file__), '..', '..', 'Tuition_InOut_2023.csv')
            if not os.path.exists(csv_path):
                csv_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'Tuition_InOut_2023.csv')
            
            df = pd.read_csv(csv_path)
            logger.info(f"Loaded tuition data: {len(df)} colleges")
            
            for _, row in df.iterrows():
                college_name = str(row['College']).strip()
                matched_name = str(row['Matched_INSTNM']).strip()
                in_state_tuition = float(row['In-State Tuition (tuition+fees)']) if pd.notna(row['In-State Tuition (tuition+fees)']) else None
                out_state_tuition = float(row['Out-of-State Tuition (tuition+fees)']) if pd.notna(row['Out-of-State Tuition (tuition+fees)']) else None
                
                # Store both college name and matched name
                self.tuition_data[college_name.lower()] = {
                    'in_state': in_state_tuition,
                    'out_state': out_state_tuition,
                    'matched_name': matched_name
                }
                self.tuition_data[matched_name.lower()] = {
                    'in_state': in_state_tuition,
                    'out_state': out_state_tuition,
                    'matched_name': matched_name
                }
                
                # Extract state from college name for basic state mapping
                self._extract_state_from_college_name(college_name, matched_name)
                
        except Exception as e:
            logger.error(f"Error loading tuition data: {e}")
    
    def _extract_state_from_college_name(self, college_name: str, matched_name: str):
        """Extract state information from college names"""
        # Common state abbreviations and full names
        state_mappings = {
            'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR', 'california': 'CA',
            'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE', 'florida': 'FL', 'georgia': 'GA',
            'hawaii': 'HI', 'idaho': 'ID', 'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA',
            'kansas': 'KS', 'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
            'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS',
            'missouri': 'MO', 'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV', 'new hampshire': 'NH',
            'new jersey': 'NJ', 'new mexico': 'NM', 'new york': 'NY', 'north carolina': 'NC',
            'north dakota': 'ND', 'ohio': 'OH', 'oklahoma': 'OK', 'oregon': 'OR', 'pennsylvania': 'PA',
            'rhode island': 'RI', 'south carolina': 'SC', 'south dakota': 'SD', 'tennessee': 'TN',
            'texas': 'TX', 'utah': 'UT', 'vermont': 'VT', 'virginia': 'VA', 'washington': 'WA',
            'west virginia': 'WV', 'wisconsin': 'WI', 'wyoming': 'WY', 'district of columbia': 'DC'
        }
        
        college_lower = college_name.lower()
        matched_lower = matched_name.lower()
        
        # Try to find state in college name
        for state_name, state_code in state_mappings.items():
            if state_name in college_lower or state_name in matched_lower:
                self.college_states[college_name.lower()] = state_code
                self.college_states[matched_name.lower()] = state_code
                break
    
    def load_zipcode_state_mapping(self):
        """Load zipcode to state mapping from College_State_Zip.csv"""
        try:
            csv_path = os.path.join(os.path.dirname(__file__), '..', '..', 'College_State_Zip.csv')
            if not os.path.exists(csv_path):
                csv_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'College_State_Zip.csv')
            
            df = pd.read_csv(csv_path)
            logger.info(f"Loaded college state mapping: {len(df)} colleges")
            
            # Create college to state mapping
            for _, row in df.iterrows():
                college_name = str(row['College']).strip()
                state = str(row['State']).strip()
                zipcode = str(row['ZIP']).strip()
                
                # Store college to state mapping
                self.college_states[college_name.lower()] = state
                
                # Store zipcode to state mapping (use first 2 digits)
                if zipcode and len(zipcode) >= 2:
                    zipcode_prefix = zipcode[:2]
                    self.zipcode_states[zipcode_prefix] = state
                    
        except Exception as e:
            logger.error(f"Error loading college state mapping: {e}")
            # Fallback to basic zipcode patterns
            zipcode_patterns = {
                'AL': ['35', '36'], 'AK': ['99'], 'AZ': ['85', '86'], 'AR': ['71', '72'],
                'CA': ['90', '91', '92', '93', '94', '95'], 'CO': ['80', '81'], 'CT': ['06'],
                'DE': ['19'], 'FL': ['32', '33', '34'], 'GA': ['30', '31'], 'HI': ['96'],
                'ID': ['83'], 'IL': ['60', '61', '62'], 'IN': ['46', '47'], 'IA': ['50', '51'],
                'KS': ['66', '67'], 'KY': ['40', '41', '42'], 'LA': ['70', '71'], 'ME': ['03', '04'],
                'MD': ['20', '21'], 'MA': ['01', '02'], 'MI': ['48', '49'], 'MN': ['55', '56'],
                'MS': ['38', '39'], 'MO': ['63', '64', '65'], 'MT': ['59'], 'NE': ['68', '69'],
                'NV': ['89'], 'NH': ['03'], 'NJ': ['07', '08'], 'NM': ['87', '88'],
                'NY': ['10', '11', '12', '13', '14'], 'NC': ['27', '28'], 'ND': ['58'],
                'OH': ['43', '44', '45'], 'OK': ['73', '74'], 'OR': ['97'], 'PA': ['15', '16', '17', '18', '19'],
                'RI': ['02'], 'SC': ['29'], 'SD': ['57'], 'TN': ['37', '38'], 'TX': ['75', '76', '77', '78', '79'],
                'UT': ['84'], 'VT': ['05'], 'VA': ['22', '23', '24'], 'WA': ['98'],
                'WV': ['24', '25', '26'], 'WI': ['53', '54'], 'WY': ['82']
            }
            
            # Create reverse mapping for quick lookup
            for state, patterns in zipcode_patterns.items():
                for pattern in patterns:
                    self.zipcode_states[pattern] = state
    
    def get_state_from_zipcode(self, zipcode: str) -> Optional[str]:
        """Get state from zipcode"""
        if not zipcode or len(zipcode) < 5:
            return None
        
        # Use first 2 digits of zipcode for state determination
        zipcode_prefix = zipcode[:2]
        return self.zipcode_states.get(zipcode_prefix)
    
    def get_tuition_for_college_and_zipcode(self, college_name: str, zipcode: str) -> Dict[str, any]:
        """Get tuition information for a college based on zipcode"""
        try:
            college_lower = college_name.lower().strip()
            
            # Get tuition data for the college
            tuition_info = self.tuition_data.get(college_lower)
            if not tuition_info:
                # Try partial matching
                for key, value in self.tuition_data.items():
                    if college_lower in key or key in college_lower:
                        tuition_info = value
                        break
            
            if not tuition_info:
                return {
                    'success': False,
                    'error': f'No tuition data found for {college_name}',
                    'is_in_state': None,
                    'tuition': None
                }
            
            # Determine if zipcode is in-state
            college_state = self.college_states.get(college_lower)
            zipcode_state = self.get_state_from_zipcode(zipcode)
            
            is_in_state = False
            if college_state and zipcode_state:
                is_in_state = (college_state == zipcode_state)
            elif not college_state:
                # If we can't determine college state, assume out-of-state for safety
                is_in_state = False
            
            # Get appropriate tuition
            if is_in_state and tuition_info['in_state'] is not None:
                tuition = tuition_info['in_state']
            elif tuition_info['out_state'] is not None:
                tuition = tuition_info['out_state']
            else:
                tuition = tuition_info['in_state'] or tuition_info['out_state']
            
            return {
                'success': True,
                'college_name': college_name,
                'zipcode': zipcode,
                'college_state': college_state,
                'zipcode_state': zipcode_state,
                'is_in_state': is_in_state,
                'tuition': tuition,
                'in_state_tuition': tuition_info['in_state'],
                'out_state_tuition': tuition_info['out_state']
            }
            
        except Exception as e:
            logger.error(f"Error getting tuition for {college_name} and {zipcode}: {e}")
            return {
                'success': False,
                'error': str(e),
                'is_in_state': None,
                'tuition': None
            }

# Global instance
tuition_state_service = TuitionStateService()
