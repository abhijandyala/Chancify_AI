"""
OpenAI Service for College Information
Fetches real-world college data like tuition, location, programs, etc.
"""

import openai
import json
import logging
from typing import Dict, Any, Optional
import os

logger = logging.getLogger(__name__)

class CollegeInfoService:
    def __init__(self):
        """Initialize OpenAI client with API key"""
        # Use environment variable for API key
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            logger.warning("OPENAI_API_KEY not set - OpenAI service will be disabled")
            api_key = None
        openai.api_key = api_key
    
    async def get_college_info(self, college_name: str) -> Dict[str, Any]:
        """
        Get comprehensive college information using OpenAI
        
        Args:
            college_name: Name of the college
            
        Returns:
            Dictionary with college information
        """
        if not self.api_key:
            logger.warning("OpenAI API key not available - returning fallback data")
            return {
                "name": college_name,
                "location": {
                    "city": "Unknown",
                    "state": "Unknown",
                    "country": "USA"
                },
                "academics": {
                    "acceptance_rate": 0.15,
                    "selectivity": "Moderately Selective"
                }
            }
        
        try:
            prompt = f"""
            Provide comprehensive information about {college_name} in JSON format. Include:
            
            {{
                "name": "Official college name",
                "location": {{
                    "city": "City name",
                    "state": "State abbreviation",
                    "country": "Country"
                }},
                "tuition": {{
                    "in_state": "In-state tuition (number only)",
                    "out_of_state": "Out-of-state tuition (number only)",
                    "room_board": "Room and board cost (number only)"
                }},
                "academics": {{
                    "acceptance_rate": "Acceptance rate as decimal (e.g., 0.15 for 15%)",
                    "sat_range": "SAT range (e.g., '1400-1600')",
                    "act_range": "ACT range (e.g., '32-36')",
                    "gpa_requirement": "Average GPA requirement (number only)"
                }},
                "programs": {{
                    "strong_programs": ["List of top 3-5 strongest programs"],
                    "notable_programs": ["List of notable/unique programs"]
                }},
                "characteristics": {{
                    "type": "Public or Private",
                    "size": "Student body size category (Small/Medium/Large)",
                    "setting": "Urban/Suburban/Rural",
                    "selectivity": "Highly Selective/Selective/Moderately Selective/Less Selective"
                }},
                "additional_info": {{
                    "founded": "Year founded",
                    "motto": "School motto if available",
                    "notable_alumni": ["List of 2-3 notable alumni"],
                    "special_features": ["List of 2-3 special features or unique aspects"]
                }}
            }}
            
            Use current data (2024-2025). If any information is not available, use "Unknown" or appropriate defaults.
            """
            
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a college information expert. Provide accurate, current data about colleges and universities."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=2000
            )
            
            # Parse the JSON response
            content = response.choices[0].message.content.strip()
            
            # Try to extract JSON from the response
            if content.startswith('```json'):
                content = content[7:-3]  # Remove ```json and ```
            elif content.startswith('```'):
                content = content[3:-3]  # Remove ``` and ```
            
            college_data = json.loads(content)
            
            # Validate and clean the data
            return self._validate_college_data(college_data)
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse OpenAI response for {college_name}: {e}")
            return self._get_fallback_data(college_name)
        except Exception as e:
            logger.error(f"OpenAI API error for {college_name}: {e}")
            return self._get_fallback_data(college_name)
    
    def _validate_college_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Validate and clean college data"""
        # Ensure numeric fields are properly formatted
        if 'tuition' in data:
            tuition = data['tuition']
            for key in ['in_state', 'out_of_state', 'room_board']:
                if key in tuition and isinstance(tuition[key], str):
                    try:
                        tuition[key] = float(tuition[key].replace(',', '').replace('$', ''))
                    except ValueError:
                        tuition[key] = 0
        
        # Ensure acceptance rate is a decimal
        if 'academics' in data and 'acceptance_rate' in data['academics']:
            try:
                rate = data['academics']['acceptance_rate']
                if isinstance(rate, str):
                    if '%' in rate:
                        rate = float(rate.replace('%', '')) / 100
                    else:
                        rate = float(rate)
                data['academics']['acceptance_rate'] = rate
            except ValueError:
                data['academics']['acceptance_rate'] = 0.5
        
        return data
    
    def _get_fallback_data(self, college_name: str) -> Dict[str, Any]:
        """Return fallback data when OpenAI fails"""
        return {
            "name": college_name,
            "location": {
                "city": "Unknown",
                "state": "Unknown",
                "country": "USA"
            },
            "tuition": {
                "in_state": 0,
                "out_of_state": 0,
                "room_board": 0
            },
            "academics": {
                "acceptance_rate": 0.5,
                "sat_range": "Unknown",
                "act_range": "Unknown",
                "gpa_requirement": 3.0
            },
            "programs": {
                "strong_programs": ["Unknown"],
                "notable_programs": ["Unknown"]
            },
            "characteristics": {
                "type": "Unknown",
                "size": "Unknown",
                "setting": "Unknown",
                "selectivity": "Moderately Selective"
            },
            "additional_info": {
                "founded": "Unknown",
                "motto": "Unknown",
                "notable_alumni": ["Unknown"],
                "special_features": ["Unknown"]
            }
        }
    
    async def get_college_subject_emphasis(self, college_name: str) -> Dict[str, Any]:
        """
        Get subject emphasis data for a specific college using OpenAI
        
        Args:
            college_name: Name of the college
            
        Returns:
            Dictionary with subject emphasis percentages
        """
        if not self.api_key:
            logger.warning("OpenAI API key not available - returning fallback subject data")
            return self._get_fallback_subject_data()
        
        try:
            prompt = f"""
            Provide the subject emphasis/major distribution for {college_name} in JSON format. 
            Based on enrollment data and program popularity, provide percentages for these categories:
            
            {{
                "subject_emphasis": [
                    {{"label": "Computer Science", "value": "percentage"}},
                    {{"label": "Engineering", "value": "percentage"}},
                    {{"label": "Business", "value": "percentage"}},
                    {{"label": "Biological Sciences", "value": "percentage"}},
                    {{"label": "Mathematics & Stats", "value": "percentage"}},
                    {{"label": "Social Sciences", "value": "percentage"}},
                    {{"label": "Arts & Humanities", "value": "percentage"}},
                    {{"label": "Education", "value": "percentage"}}
                ]
            }}
            
            Requirements:
            - Use current enrollment data (2024-2025)
            - Percentages should add up to approximately 100%
            - Focus on undergraduate programs
            - If a college is known for specific programs (e.g., CMU for CS/Engineering), reflect that
            - Use realistic percentages based on the college's reputation and actual programs
            - If data is not available, use reasonable estimates based on college type and reputation
            
            Example for Carnegie Mellon University (known for CS/Engineering):
            - Computer Science: 35-40%
            - Engineering: 25-30%
            - Business: 10-15%
            - Other subjects: lower percentages
            """
            
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a higher education data expert. Provide accurate enrollment and program distribution data for colleges and universities."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.2,
                max_tokens=1000
            )
            
            # Parse the JSON response
            content = response.choices[0].message.content.strip()
            
            # Try to extract JSON from the response
            if content.startswith('```json'):
                content = content[7:-3]  # Remove ```json and ```
            elif content.startswith('```'):
                content = content[3:-3]  # Remove ``` and ```
            
            subject_data = json.loads(content)
            
            # Validate and clean the data
            return self._validate_subject_data(subject_data)
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse OpenAI subject response for {college_name}: {e}")
            return self._get_fallback_subject_data()
        except Exception as e:
            logger.error(f"OpenAI API error for subject data {college_name}: {e}")
            return self._get_fallback_subject_data()
    
    def _validate_subject_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Validate and clean subject emphasis data"""
        if 'subject_emphasis' not in data:
            return self._get_fallback_subject_data()
        
        subjects = data['subject_emphasis']
        
        # Ensure all required subjects are present and have numeric values
        required_subjects = [
            'Computer Science', 'Engineering', 'Business', 'Biological Sciences',
            'Mathematics & Stats', 'Social Sciences', 'Arts & Humanities', 'Education'
        ]
        
        validated_subjects = []
        for subject in subjects:
            if subject.get('label') in required_subjects:
                try:
                    value = float(subject.get('value', 0))
                    validated_subjects.append({
                        'label': subject['label'],
                        'value': max(0, min(100, value))  # Clamp between 0-100
                    })
                except (ValueError, TypeError):
                    continue
        
        # Ensure we have all required subjects
        for req_subject in required_subjects:
            if not any(s['label'] == req_subject for s in validated_subjects):
                validated_subjects.append({'label': req_subject, 'value': 5.0})
        
        # Normalize percentages to sum to ~100
        total = sum(s['value'] for s in validated_subjects)
        if total > 0:
            for subject in validated_subjects:
                subject['value'] = round((subject['value'] / total) * 100, 1)
        
        return {'subject_emphasis': validated_subjects}
    
    def _get_fallback_subject_data(self) -> Dict[str, Any]:
        """Return fallback subject data when OpenAI fails"""
        return {
            "subject_emphasis": [
                {"label": "Computer Science", "value": 28},
                {"label": "Engineering", "value": 24},
                {"label": "Business", "value": 16},
                {"label": "Biological Sciences", "value": 14},
                {"label": "Mathematics & Stats", "value": 11},
                {"label": "Social Sciences", "value": 9},
                {"label": "Arts & Humanities", "value": 7},
                {"label": "Education", "value": 5}
            ]
        }
    
    async def get_multiple_colleges_info(self, college_names: list) -> Dict[str, Dict[str, Any]]:
        """Get information for multiple colleges"""
        results = {}
        for college_name in college_names:
            results[college_name] = await self.get_college_info(college_name)
        return results

# Global instance
college_info_service = CollegeInfoService()
