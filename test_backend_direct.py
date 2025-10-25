#!/usr/bin/env python3
"""
Test the backend directly without going through HTTP
"""

import sys
import traceback
from backend.main import app
from backend.main import CollegeSuggestionsRequest

async def test_backend_direct():
    """Test the backend logic directly"""
    
    print("Testing backend logic directly...")
    
    try:
        # Create a test request
        request = CollegeSuggestionsRequest(
            gpa_unweighted="3.8",
            gpa_weighted="4.2",
            sat="1450",
            act="33",
            major="Computer Science",
            extracurricular_depth="8",
            leadership_positions="8",
            awards_publications="8",
            passion_projects="8",
            business_ventures="5",
            volunteer_work="5",
            research_experience="5",
            portfolio_audition="5",
            essay_quality="5",
            recommendations="5",
            interview="5",
            demonstrated_interest="5",
            legacy_status="5",
            hs_reputation="5",
            geographic_diversity="5",
            plan_timing="5",
            geography_residency="5",
            firstgen_diversity="5",
            ability_to_pay="5",
            policy_knob="5",
            conduct_record="9"
        )
        
        print("Request created successfully")
        
        # Test the suggest_colleges function directly
        from backend.main import suggest_colleges
        
        print("Calling suggest_colleges...")
        result = await suggest_colleges(request)
        
        print("SUCCESS!")
        print(f"Result: {result}")
        
    except Exception as e:
        print(f"ERROR: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    import asyncio
    asyncio.run(test_backend_direct())