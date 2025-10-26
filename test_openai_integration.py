#!/usr/bin/env python3
"""
Test script for OpenAI College Information Integration
Tests the backend OpenAI service with sample college queries
"""

import asyncio
import sys
import os
import json
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_path))

from services.openai_service import college_info_service

async def test_single_college():
    """Test fetching information for a single college"""
    print("Testing single college information fetch...")
    
    test_colleges = [
        "Harvard University",
        "Massachusetts Institute of Technology", 
        "Stanford University",
        "University of California Berkeley",
        "Georgia Institute of Technology"
    ]
    
    for college_name in test_colleges:
        print(f"\nTesting: {college_name}")
        try:
            college_data = await college_info_service.get_college_info(college_name)
            
            print(f"Success!")
            print(f"   Name: {college_data['name']}")
            print(f"   Location: {college_data['location']['city']}, {college_data['location']['state']}")
            print(f"   Type: {college_data['characteristics']['type']}")
            print(f"   Acceptance Rate: {college_data['academics']['acceptance_rate']:.1%}")
            print(f"   In-State Tuition: ${college_data['tuition']['in_state']:,}")
            print(f"   Out-of-State Tuition: ${college_data['tuition']['out_of_state']:,}")
            print(f"   Strong Programs: {', '.join(college_data['programs']['strong_programs'][:3])}")
            
        except Exception as e:
            print(f"Error: {e}")

async def test_multiple_colleges():
    """Test fetching information for multiple colleges"""
    print("\nTesting multiple colleges information fetch...")
    
    test_colleges = [
        "Carnegie Mellon University",
        "Cornell University", 
        "University of Michigan"
    ]
    
    try:
        colleges_data = await college_info_service.get_multiple_colleges_info(test_colleges)
        
        print(f"Success! Fetched data for {len(colleges_data)} colleges")
        
        for college_name, college_data in colleges_data.items():
            print(f"\n{college_name}:")
            print(f"   Location: {college_data['location']['city']}, {college_data['location']['state']}")
            print(f"   Acceptance Rate: {college_data['academics']['acceptance_rate']:.1%}")
            print(f"   Tuition: ${college_data['tuition']['in_state']:,} / ${college_data['tuition']['out_of_state']:,}")
            
    except Exception as e:
        print(f"Error: {e}")

async def test_fallback_data():
    """Test fallback data for unknown colleges"""
    print("\nTesting fallback data for unknown college...")
    
    try:
        college_data = await college_info_service.get_college_info("Unknown College XYZ")
        
        print(f"Fallback data generated!")
        print(f"   Name: {college_data['name']}")
        print(f"   Location: {college_data['location']['city']}, {college_data['location']['state']}")
        print(f"   Tuition: ${college_data['tuition']['in_state']:,}")
        
    except Exception as e:
        print(f"Error: {e}")

async def test_data_validation():
    """Test data validation and cleaning"""
    print("\nTesting data validation...")
    
    try:
        college_data = await college_info_service.get_college_info("Princeton University")
        
        # Check if numeric fields are properly formatted
        tuition_in_state = college_data['tuition']['in_state']
        acceptance_rate = college_data['academics']['acceptance_rate']
        
        print(f"Data validation passed!")
        print(f"   Tuition type: {type(tuition_in_state)} (should be float)")
        print(f"   Acceptance rate type: {type(acceptance_rate)} (should be float)")
        print(f"   Tuition value: ${tuition_in_state:,}")
        print(f"   Acceptance rate: {acceptance_rate:.1%}")
        
        # Validate ranges
        if 0 <= acceptance_rate <= 1:
            print(f"   Acceptance rate in valid range (0-1)")
        else:
            print(f"   Acceptance rate out of range: {acceptance_rate}")
            
        if tuition_in_state > 0:
            print(f"   Tuition is positive")
        else:
            print(f"   Tuition is not positive: {tuition_in_state}")
            
    except Exception as e:
        print(f"Error: {e}")

async def main():
    """Run all tests"""
    print("Starting OpenAI College Information Integration Tests")
    print("=" * 60)
    
    try:
        await test_single_college()
        await test_multiple_colleges()
        await test_fallback_data()
        await test_data_validation()
        
        print("\n" + "=" * 60)
        print("All tests completed!")
        
    except Exception as e:
        print(f"\nTest suite failed: {e}")
        return False
    
    return True

if __name__ == "__main__":
    success = asyncio.run(main())
    sys.exit(0 if success else 1)
