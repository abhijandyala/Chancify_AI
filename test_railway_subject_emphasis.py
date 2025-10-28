#!/usr/bin/env python3
"""
Comprehensive Test Suite for College Subject Emphasis API
Tests the Railway deployment endpoint with multiple colleges
"""

import requests
import json
import time
from typing import Dict, List

def test_railway_endpoint():
    """Test the Railway deployment endpoint"""
    
    # Railway URL
    base_url = "https://chancifyai.up.railway.app"
    
    # Test colleges
    test_colleges = [
        "Carnegie Mellon University",
        "Massachusetts Institute of Technology",
        "Harvard University",
        "Stanford University",
        "Yale University",
        "Princeton University",
        "Columbia University",
        "University of Pennsylvania",
        "Brown University",
        "Dartmouth College",
        "Cornell University",
        "California Institute of Technology",
        "Duke University",
        "Northwestern University",
        "Rice University",
        "Vanderbilt University",
        "University of Notre Dame",
        "University of California-Berkeley",
        "University of California-Los Angeles",
        "New York University",
        "University of Southern California",
        "Boston College",
        "Georgetown University",
        "Johns Hopkins University",
        "Washington University in St Louis"
    ]
    
    print("=" * 80)
    print("COMPREHENSIVE COLLEGE SUBJECT EMPHASIS API TEST")
    print("=" * 80)
    print(f"Testing Railway endpoint: {base_url}")
    print(f"Total colleges to test: {len(test_colleges)}")
    print()
    
    results = []
    successful_tests = 0
    failed_tests = 0
    
    for i, college in enumerate(test_colleges, 1):
        print(f"[{i:2d}/{len(test_colleges)}] Testing: {college}")
        print("-" * 60)
        
        try:
            # URL encode the college name
            import urllib.parse
            encoded_college = urllib.parse.quote(college)
            url = f"{base_url}/api/college-subject-emphasis/{encoded_college}"
            
            print(f"URL: {url}")
            
            # Make request with timeout
            response = requests.get(url, timeout=30)
            
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    
                    if data.get('success'):
                        subjects = data.get('subjects', [])
                        college_name = data.get('college_name', 'Unknown')
                        
                        print(f"SUCCESS: Retrieved {len(subjects)} subjects for {college_name}")
                        
                        # Display subject emphasis
                        total_percentage = 0
                        for subject in subjects:
                            label = subject.get('label', 'Unknown')
                            value = subject.get('value', 0)
                            total_percentage += value
                            print(f"  {label}: {value}%")
                        
                        print(f"  Total: {total_percentage}%")
                        
                        # Validate data
                        if len(subjects) == 8 and 95 <= total_percentage <= 105:
                            print("  VALIDATION: PASS - Correct number of subjects and percentage")
                            successful_tests += 1
                            results.append({
                                'college': college,
                                'status': 'SUCCESS',
                                'subjects': len(subjects),
                                'total_percentage': total_percentage,
                                'data': subjects
                            })
                        else:
                            print(f"  VALIDATION: FAIL - Expected 8 subjects, 95-105% total")
                            print(f"  Got {len(subjects)} subjects, {total_percentage}% total")
                            failed_tests += 1
                            results.append({
                                'college': college,
                                'status': 'VALIDATION_FAIL',
                                'subjects': len(subjects),
                                'total_percentage': total_percentage,
                                'error': 'Invalid data structure'
                            })
                    else:
                        error_msg = data.get('error', 'Unknown error')
                        print(f"FAILED: {error_msg}")
                        failed_tests += 1
                        results.append({
                            'college': college,
                            'status': 'API_ERROR',
                            'error': error_msg
                        })
                        
                except json.JSONDecodeError as e:
                    print(f"JSON DECODE ERROR: {e}")
                    print(f"Response content: {response.text[:200]}...")
                    failed_tests += 1
                    results.append({
                        'college': college,
                        'status': 'JSON_ERROR',
                        'error': str(e)
                    })
            else:
                print(f"HTTP ERROR: {response.status_code}")
                print(f"Response: {response.text[:200]}...")
                failed_tests += 1
                results.append({
                    'college': college,
                    'status': 'HTTP_ERROR',
                    'error': f"HTTP {response.status_code}"
                })
                
        except requests.exceptions.RequestException as e:
            print(f"REQUEST ERROR: {e}")
            failed_tests += 1
            results.append({
                'college': college,
                'status': 'REQUEST_ERROR',
                'error': str(e)
            })
        
        print()
        
        # Add delay between requests to avoid rate limiting
        time.sleep(1)
    
    # Summary Report
    print("=" * 80)
    print("TEST SUMMARY REPORT")
    print("=" * 80)
    
    total_tests = len(test_colleges)
    success_rate = (successful_tests / total_tests) * 100
    
    print(f"Total Tests: {total_tests}")
    print(f"Successful: {successful_tests}")
    print(f"Failed: {failed_tests}")
    print(f"Success Rate: {success_rate:.1f}%")
    print()
    
    # Detailed Results
    if successful_tests > 0:
        print("SUCCESSFUL TESTS:")
        print("-" * 40)
        for result in results:
            if result['status'] == 'SUCCESS':
                print(f"✓ {result['college']}")
                print(f"  Subjects: {result['subjects']}, Total: {result['total_percentage']}%")
    
    if failed_tests > 0:
        print("\nFAILED TESTS:")
        print("-" * 40)
        for result in results:
            if result['status'] != 'SUCCESS':
                print(f"✗ {result['college']}: {result['status']}")
                if 'error' in result:
                    print(f"  Error: {result['error']}")
    
    # Sample Data Analysis
    if successful_tests > 0:
        print("\nSAMPLE DATA ANALYSIS:")
        print("-" * 40)
        
        # Analyze MIT data
        mit_result = next((r for r in results if 'Massachusetts Institute of Technology' in r['college']), None)
        if mit_result and mit_result['status'] == 'SUCCESS':
            print("MIT Subject Emphasis:")
            for subject in mit_result['data']:
                print(f"  {subject['label']}: {subject['value']}%")
        
        # Analyze Harvard data
        harvard_result = next((r for r in results if 'Harvard University' in r['college']), None)
        if harvard_result and harvard_result['status'] == 'SUCCESS':
            print("\nHarvard Subject Emphasis:")
            for subject in harvard_result['data']:
                print(f"  {subject['label']}: {subject['value']}%")
    
    return results

def test_specific_college(college_name: str):
    """Test a specific college"""
    print(f"\nTesting specific college: {college_name}")
    print("-" * 50)
    
    base_url = "https://chancifyai.up.railway.app"
    
    try:
        import urllib.parse
        encoded_college = urllib.parse.quote(college_name)
        url = f"{base_url}/api/college-subject-emphasis/{encoded_college}"
        
        print(f"URL: {url}")
        
        response = requests.get(url, timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
        else:
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    print("Starting Comprehensive College Subject Emphasis Tests...")
    print("This will test the Railway deployment endpoint")
    print()
    
    # Test specific college first
    test_specific_college("Carnegie Mellon University")
    
    # Run comprehensive tests
    results = test_railway_endpoint()
    
    print("\n" + "=" * 80)
    print("TEST COMPLETED")
    print("=" * 80)
