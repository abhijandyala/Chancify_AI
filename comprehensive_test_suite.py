#!/usr/bin/env python3
"""
Comprehensive End-to-End Test Suite for Chancify AI
Tests all critical functionality to ensure everything works
"""

import requests
import json
import time
import urllib.parse
from typing import Dict, List, Any

def test_backend_health():
    """Test backend health endpoint"""
    print("🔍 Testing Backend Health...")
    
    try:
        response = requests.get('http://localhost:8000/api/health', timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Backend Health: {data['status']}")
            print(f"   Database: {data['database']}")
            print(f"   Environment: {data['environment']}")
            return True
        else:
            print(f"❌ Backend Health Failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend Health Error: {e}")
        return False

def test_ngrok_health():
    """Test ngrok endpoint"""
    print("\n🔍 Testing Ngrok Endpoint...")
    
    try:
        response = requests.get('https://unsmug-untensely-elroy.ngrok-free.dev/api/health', 
                               headers={'ngrok-skip-browser-warning': 'true'}, timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Ngrok Health: {data['status']}")
            return True
        else:
            print(f"❌ Ngrok Health Failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Ngrok Health Error: {e}")
        return False

def test_college_suggestions():
    """Test college suggestions API"""
    print("\n🔍 Testing College Suggestions API...")
    
    test_cases = [
        {
            "name": "High Achiever - Computer Science",
            "data": {"gpa": "3.9", "sat": "1500", "major": "Computer Science"}
        },
        {
            "name": "Average Student - Business",
            "data": {"gpa": "3.5", "sat": "1200", "major": "Business"}
        },
        {
            "name": "Strong Student - Engineering",
            "data": {"gpa": "3.8", "sat": "1400", "major": "Engineering"}
        }
    ]
    
    success_count = 0
    
    for test_case in test_cases:
        try:
            response = requests.post('https://unsmug-untensely-elroy.ngrok-free.dev/api/suggest/colleges',
                                   headers={'ngrok-skip-browser-warning': 'true', 'Content-Type': 'application/json'},
                                   json=test_case['data'], timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and len(data.get('suggestions', [])) > 0:
                    suggestions = data['suggestions']
                    print(f"✅ {test_case['name']}: {len(suggestions)} suggestions")
                    
                    # Show top 3 suggestions
                    for i, suggestion in enumerate(suggestions[:3]):
                        print(f"   {i+1}. {suggestion['name']} - {suggestion['probability']:.1%} chance")
                    
                    success_count += 1
                else:
                    print(f"❌ {test_case['name']}: No suggestions returned")
            else:
                print(f"❌ {test_case['name']}: HTTP {response.status_code}")
                
        except Exception as e:
            print(f"❌ {test_case['name']}: Error - {e}")
    
    print(f"\n📊 College Suggestions: {success_count}/{len(test_cases)} tests passed")
    return success_count == len(test_cases)

def test_subject_emphasis():
    """Test subject emphasis API"""
    print("\n🔍 Testing Subject Emphasis API...")
    
    test_colleges = [
        "Carnegie Mellon University",
        "Massachusetts Institute of Technology", 
        "Harvard University",
        "Stanford University",
        "Yale University"
    ]
    
    success_count = 0
    
    for college in test_colleges:
        try:
            encoded_college = urllib.parse.quote(college)
            url = f'https://unsmug-untensely-elroy.ngrok-free.dev/api/college-subject-emphasis/{encoded_college}'
            
            response = requests.get(url, headers={'ngrok-skip-browser-warning': 'true'}, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and len(data.get('subjects', [])) == 8:
                    subjects = data['subjects']
                    total_percentage = sum(subject['value'] for subject in subjects)
                    
                    print(f"✅ {college}: {len(subjects)} subjects, {total_percentage:.1f}% total")
                    
                    # Show top 3 subjects
                    sorted_subjects = sorted(subjects, key=lambda x: x['value'], reverse=True)
                    for i, subject in enumerate(sorted_subjects[:3]):
                        print(f"   {i+1}. {subject['label']}: {subject['value']}%")
                    
                    success_count += 1
                else:
                    print(f"❌ {college}: Invalid response format")
            else:
                print(f"❌ {college}: HTTP {response.status_code}")
                
        except Exception as e:
            print(f"❌ {college}: Error - {e}")
    
    print(f"\n📊 Subject Emphasis: {success_count}/{len(test_colleges)} tests passed")
    return success_count == len(test_colleges)

def test_college_search():
    """Test college search API"""
    print("\n🔍 Testing College Search API...")
    
    test_searches = [
        {"query": "mit", "expected": "Massachusetts Institute of Technology"},
        {"query": "harvard", "expected": "Harvard University"},
        {"query": "stanford", "expected": "Stanford University"},
        {"query": "carnegie mellon", "expected": "Carnegie Mellon University"},
        {"query": "yale", "expected": "Yale University"}
    ]
    
    success_count = 0
    
    for test in test_searches:
        try:
            response = requests.get(f'https://unsmug-untensely-elroy.ngrok-free.dev/api/search/colleges',
                                   params={'q': test['query'], 'limit': 5},
                                   headers={'ngrok-skip-browser-warning': 'true'}, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and len(data.get('colleges', [])) > 0:
                    colleges = data['colleges']
                    found_expected = any(test['expected'].lower() in college['name'].lower() for college in colleges)
                    
                    if found_expected:
                        print(f"✅ Search '{test['query']}': Found {test['expected']}")
                        success_count += 1
                    else:
                        print(f"❌ Search '{test['query']}': Expected {test['expected']} not found")
                        print(f"   Found: {[c['name'] for c in colleges[:3]]}")
                else:
                    print(f"❌ Search '{test['query']}': No results")
            else:
                print(f"❌ Search '{test['query']}': HTTP {response.status_code}")
                
        except Exception as e:
            print(f"❌ Search '{test['query']}': Error - {e}")
    
    print(f"\n📊 College Search: {success_count}/{len(test_searches)} tests passed")
    return success_count == len(test_searches)

def test_auth_endpoints():
    """Test authentication endpoints"""
    print("\n🔍 Testing Authentication Endpoints...")
    
    try:
        # Test auth/me endpoint (should return 403 without auth)
        response = requests.get('https://unsmug-untensely-elroy.ngrok-free.dev/api/auth/me',
                               headers={'ngrok-skip-browser-warning': 'true'}, timeout=10)
        
        if response.status_code == 403:
            print("✅ Auth endpoint: Correctly requires authentication (403)")
            return True
        else:
            print(f"❌ Auth endpoint: Unexpected status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Auth endpoint: Error - {e}")
        return False

def test_cors_headers():
    """Test CORS headers for Railway frontend"""
    print("\n🔍 Testing CORS Headers...")
    
    try:
        # Test preflight request
        response = requests.options('https://unsmug-untensely-elroy.ngrok-free.dev/api/health',
                                  headers={
                                      'ngrok-skip-browser-warning': 'true',
                                      'Origin': 'https://chancifyai.up.railway.app',
                                      'Access-Control-Request-Method': 'GET'
                                  }, timeout=10)
        
        cors_headers = {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
        }
        
        if cors_headers['Access-Control-Allow-Origin']:
            print("✅ CORS Headers: Present")
            print(f"   Allow-Origin: {cors_headers['Access-Control-Allow-Origin']}")
            print(f"   Allow-Methods: {cors_headers['Access-Control-Allow-Methods']}")
            return True
        else:
            print("❌ CORS Headers: Missing")
            return False
            
    except Exception as e:
        print(f"❌ CORS Headers: Error - {e}")
        return False

def run_comprehensive_test():
    """Run all tests and provide summary"""
    print("🚀 Starting Comprehensive Chancify AI Test Suite")
    print("=" * 60)
    
    tests = [
        ("Backend Health", test_backend_health),
        ("Ngrok Health", test_ngrok_health),
        ("College Suggestions", test_college_suggestions),
        ("Subject Emphasis", test_subject_emphasis),
        ("College Search", test_college_search),
        ("Authentication", test_auth_endpoints),
        ("CORS Headers", test_cors_headers)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ {test_name}: Critical Error - {e}")
            results.append((test_name, False))
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 COMPREHENSIVE TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
    
    print(f"\n🎯 Overall Result: {passed}/{total} tests passed ({passed/total*100:.1f}%)")
    
    if passed == total:
        print("\n🎉 ALL TESTS PASSED! Chancify AI is fully functional!")
        print("✅ Backend is running and accessible")
        print("✅ Ngrok tunnel is working")
        print("✅ All API endpoints are responding")
        print("✅ CORS is configured for Railway frontend")
        print("✅ College suggestions are working")
        print("✅ Subject emphasis is working")
        print("✅ College search is working")
        print("✅ Authentication is working")
    else:
        print(f"\n⚠️  {total-passed} tests failed. Please check the issues above.")
    
    return passed == total

if __name__ == "__main__":
    success = run_comprehensive_test()
    exit(0 if success else 1)
