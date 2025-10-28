#!/usr/bin/env python3
"""
Simple Test Suite for Chancify AI
"""

import requests
import json
import urllib.parse

def test_backend():
    print("Testing Chancify AI Backend...")
    print("=" * 40)
    
    # Test 1: Backend Health
    try:
        response = requests.get('http://localhost:8000/api/health', timeout=10)
        data = response.json()
        print(f"Backend Health: {response.status_code} - {data['status']}")
    except Exception as e:
        print(f"Backend Health: ERROR - {e}")
    
    # Test 2: Ngrok Health  
    try:
        response = requests.get('https://unsmug-untensely-elroy.ngrok-free.dev/api/health', 
                               headers={'ngrok-skip-browser-warning': 'true'}, timeout=10)
        data = response.json()
        print(f"Ngrok Health: {response.status_code} - {data['status']}")
    except Exception as e:
        print(f"Ngrok Health: ERROR - {e}")
    
    # Test 3: College Suggestions
    try:
        response = requests.post('https://unsmug-untensely-elroy.ngrok-free.dev/api/suggest/colleges', 
                                headers={'ngrok-skip-browser-warning': 'true', 'Content-Type': 'application/json'}, 
                                json={'gpa': '3.8', 'sat': '1400', 'major': 'Computer Science'}, timeout=30)
        data = response.json()
        suggestions = data.get('suggestions', [])
        print(f"College Suggestions: {response.status_code} - {len(suggestions)} suggestions")
    except Exception as e:
        print(f"College Suggestions: ERROR - {e}")
    
    # Test 4: Subject Emphasis
    try:
        college = urllib.parse.quote('Carnegie Mellon University')
        response = requests.get(f'https://unsmug-untensely-elroy.ngrok-free.dev/api/college-subject-emphasis/{college}', 
                               headers={'ngrok-skip-browser-warning': 'true'}, timeout=30)
        data = response.json()
        subjects = data.get('subjects', [])
        print(f"Subject Emphasis: {response.status_code} - {len(subjects)} subjects")
    except Exception as e:
        print(f"Subject Emphasis: ERROR - {e}")
    
    # Test 5: College Search
    try:
        response = requests.get('https://unsmug-untensely-elroy.ngrok-free.dev/api/search/colleges', 
                               params={'q': 'mit', 'limit': 5}, 
                               headers={'ngrok-skip-browser-warning': 'true'}, timeout=30)
        data = response.json()
        colleges = data.get('colleges', [])
        print(f"College Search: {response.status_code} - {len(colleges)} results")
    except Exception as e:
        print(f"College Search: ERROR - {e}")
    
    print("=" * 40)
    print("All tests completed!")

if __name__ == "__main__":
    test_backend()
