#!/usr/bin/env python3
"""
Zippopotam.us API Service
Provides accurate zipcode-to-city-state mapping using the free Zippopotam.us API
"""

import requests
import logging
import time
from typing import Dict, Optional, Tuple

logger = logging.getLogger(__name__)

class ZippopotamService:
    def __init__(self):
        """Initialize the Zippopotam service"""
        self.base_url = "https://api.zippopotam.us/us"
        self.cache = {}  # Simple cache to avoid repeated API calls
        self.rate_limit_delay = 0.1  # 100ms delay between requests
        
    def get_location_from_zipcode(self, zipcode: str) -> Optional[Dict[str, str]]:
        """
        Get city and state information from a zipcode using Zippopotam.us API
        
        Args:
            zipcode: 5-digit US zipcode
            
        Returns:
            Dict with 'city', 'state', 'state_abbr' or None if not found
        """
        if not zipcode or len(zipcode) != 5 or not zipcode.isdigit():
            logger.warning(f"Invalid zipcode format: {zipcode}")
            return None
            
        # Check cache first
        cache_key = zipcode
        if cache_key in self.cache:
            logger.info(f"Returning cached location for zipcode {zipcode}")
            return self.cache[cache_key]
        
        try:
            # Add rate limiting delay
            time.sleep(self.rate_limit_delay)
            
            # Make API request
            url = f"{self.base_url}/{zipcode}"
            logger.info(f"Fetching location data for zipcode {zipcode} from {url}")
            
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            
            # Parse the response
            if 'places' in data and len(data['places']) > 0:
                place = data['places'][0]
                location_data = {
                    'city': place.get('place name', ''),
                    'state': place.get('state', ''),
                    'state_abbr': place.get('state abbreviation', ''),
                    'zipcode': zipcode
                }
                
                # Cache the result
                self.cache[cache_key] = location_data
                
                logger.info(f"Successfully retrieved location for {zipcode}: {location_data['city']}, {location_data['state_abbr']}")
                return location_data
            else:
                logger.warning(f"No location data found for zipcode {zipcode}")
                return None
                
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching location data for zipcode {zipcode}: {e}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error fetching location data for zipcode {zipcode}: {e}")
            return None
    
    def is_zipcode_in_state(self, zipcode: str, target_state: str) -> bool:
        """
        Check if a zipcode is in a specific state
        
        Args:
            zipcode: 5-digit US zipcode
            target_state: State abbreviation (e.g., 'PA', 'CA')
            
        Returns:
            True if zipcode is in the target state, False otherwise
        """
        location_data = self.get_location_from_zipcode(zipcode)
        if not location_data:
            return False
            
        return location_data['state_abbr'].upper() == target_state.upper()
    
    def get_city_state_from_zipcode(self, zipcode: str) -> Optional[Tuple[str, str]]:
        """
        Get city and state abbreviation from zipcode
        
        Args:
            zipcode: 5-digit US zipcode
            
        Returns:
            Tuple of (city, state_abbr) or None if not found
        """
        location_data = self.get_location_from_zipcode(zipcode)
        if not location_data:
            return None
            
        return (location_data['city'], location_data['state_abbr'])

# Global instance
zippopotam_service = ZippopotamService()
