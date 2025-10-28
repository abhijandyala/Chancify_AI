#!/usr/bin/env python3
"""
Test College Subject Emphasis API
Tests the OpenAI integration for getting real college subject emphasis data
"""

import sys
import os
import requests
import json
import time

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

def test_subject_emphasis_api():
    """Test the subject emphasis API endpoint"""
    
    # Test colleges
    test_colleges = [
        "Massachusetts Institute of Technology",
        "Harvard University", 
        "Stanford University",
        "Yale University",
        "Princeton University"
    ]
    
    print("Testing College Subject Emphasis API")
    print("=" * 60)
    
    # Test with local backend (assuming it's running on port 8000)
    base_url = "http://localhost:8000"
    
    results = []
    
    for i, college in enumerate(test_colleges):
        print(f"\n{i+1}. Testing: {college}")
        print("-" * 40)
        
        try:
            # URL encode the college name
            import urllib.parse
            encoded_college = urllib.parse.quote(college)
            url = f"{base_url}/api/college-subject-emphasis/{encoded_college}"
            
            print(f"Request URL: {url}")
            
            # Make request
            response = requests.get(url, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                
                if data.get('success'):
                    subjects = data.get('subjects', [])
                    print(f"SUCCESS: Retrieved {len(subjects)} subjects")
                    
                    # Display subject emphasis
                    for subject in subjects:
                        label = subject.get('label', 'Unknown')
                        value = subject.get('value', 0)
                        print(f"   {label}: {value}%")
                    
                    # Calculate total percentage
                    total = sum(subject.get('value', 0) for subject in subjects)
                    print(f"   Total: {total}%")
                    
                    results.append({
                        'college': college,
                        'success': True,
                        'subjects': subjects,
                        'total': total
                    })
                    
                else:
                    print(f"FAILED: {data.get('error', 'Unknown error')}")
                    results.append({
                        'college': college,
                        'success': False,
                        'error': data.get('error', 'Unknown error')
                    })
            else:
                print(f"HTTP ERROR: {response.status_code}")
                print(f"Response: {response.text}")
                results.append({
                    'college': college,
                    'success': False,
                    'error': f"HTTP {response.status_code}"
                })
                
        except requests.exceptions.RequestException as e:
            print(f"REQUEST ERROR: {e}")
            results.append({
                'college': college,
                'success': False,
                'error': str(e)
            })
        
        # Add delay between requests to avoid rate limiting
        time.sleep(2)
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    successful = sum(1 for r in results if r['success'])
    total = len(results)
    
    print(f"Successful requests: {successful}/{total}")
    print(f"Success rate: {(successful/total)*100:.1f}%")
    
    if successful > 0:
        print("\nSuccessful colleges:")
        for result in results:
            if result['success']:
                print(f"  PASS {result['college']} (Total: {result['total']}%)")
    
    if successful < total:
        print("\nFailed colleges:")
        for result in results:
            if not result['success']:
                print(f"  FAIL {result['college']}: {result['error']}")
    
    return results

def test_direct_openai():
    """Test OpenAI integration directly"""
    print("\n" + "=" * 60)
    print("TESTING DIRECT OPENAI INTEGRATION")
    print("=" * 60)
    
    try:
        from backend.data.college_subject_emphasis import college_subject_emphasis
        
        test_colleges = [
            "Massachusetts Institute of Technology",
            "Harvard University",
            "Stanford University"
        ]
        
        for college in test_colleges:
            print(f"\nTesting: {college}")
            print("-" * 30)
            
            try:
                subject_data = college_subject_emphasis.get_college_subject_emphasis(college)
                
                print("SUCCESS: Retrieved subject data")
                total = 0
                for subject, percentage in subject_data.items():
                    print(f"   {subject}: {percentage}%")
                    total += percentage
                print(f"   Total: {total}%")
                
            except Exception as e:
                print(f"ERROR: {e}")
                
    except ImportError as e:
        print(f"Import error: {e}")
        print("Make sure you're running from the project root directory")

if __name__ == "__main__":
    print("Starting College Subject Emphasis Tests...")
    
    # Test direct OpenAI integration first
    test_direct_openai()
    
    # Test API endpoint
    print("\nTesting API endpoint...")
    print("Make sure the backend server is running on localhost:8000")
    input("Press Enter to continue...")
    
    test_subject_emphasis_api()