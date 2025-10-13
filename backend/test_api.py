"""
Test script for Chancify AI API endpoints.
"""

import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000"

def print_test(name, result):
    """Print test result."""
    status = "PASS" if result else "FAIL"
    print(f"[{status}] {name}")

def test_health_check():
    """Test health check endpoint."""
    print("\n" + "="*60)
    print("TEST 1: Health Check Endpoint")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/api/health", timeout=5)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        success = response.status_code == 200
        print_test("Health check endpoint", success)
        return success
    except Exception as e:
        print(f"ERROR: {e}")
        print_test("Health check endpoint", False)
        return False

def test_signup():
    """Test user signup."""
    print("\n" + "="*60)
    print("TEST 2: User Signup")
    print("="*60)
    
    try:
        payload = {
            "email": f"testuser_{datetime.now().timestamp()}@test.com",
            "password": "TestPassword123!",
            "first_name": "Test",
            "last_name": "User"
        }
        
        print(f"Payload: {json.dumps(payload, indent=2)}")
        response = requests.post(f"{BASE_URL}/api/auth/signup", json=payload, timeout=5)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        success = response.status_code == 200
        print_test("User signup", success)
        
        if success:
            return response.json().get("access_token")
        return None
    except Exception as e:
        print(f"ERROR: {e}")
        print_test("User signup", False)
        return None

def test_login():
    """Test user login."""
    print("\n" + "="*60)
    print("TEST 3: User Login")
    print("="*60)
    
    try:
        # First create a user
        email = f"logintest_{datetime.now().timestamp()}@test.com"
        password = "TestPassword123!"
        
        signup_payload = {
            "email": email,
            "password": password,
            "first_name": "Login",
            "last_name": "Test"
        }
        
        signup_response = requests.post(f"{BASE_URL}/api/auth/signup", json=signup_payload, timeout=5)
        print(f"Signup Status: {signup_response.status_code}")
        
        # Now try to login
        login_payload = {
            "username": email,
            "password": password
        }
        
        print(f"Login Payload: {json.dumps(login_payload, indent=2)}")
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            data=login_payload,  # Form data for OAuth2
            timeout=5
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        success = response.status_code == 200
        print_test("User login", success)
        
        if success:
            return response.json().get("access_token")
        return None
    except Exception as e:
        print(f"ERROR: {e}")
        print_test("User login", False)
        return None

def test_get_current_user(token):
    """Test getting current user profile."""
    print("\n" + "="*60)
    print("TEST 4: Get Current User Profile")
    print("="*60)
    
    if not token:
        print("Skipping - no auth token available")
        return False
    
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers, timeout=5)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        success = response.status_code == 200
        print_test("Get current user", success)
        return success
    except Exception as e:
        print(f"ERROR: {e}")
        print_test("Get current user", False)
        return False

def test_docs():
    """Test API documentation endpoint."""
    print("\n" + "="*60)
    print("TEST 5: API Documentation")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/docs", timeout=5)
        print(f"Status Code: {response.status_code}")
        print("API docs are accessible at: http://localhost:8000/docs")
        
        success = response.status_code == 200
        print_test("API documentation", success)
        return success
    except Exception as e:
        print(f"ERROR: {e}")
        print_test("API documentation", False)
        return False

def main():
    """Run all tests."""
    print("\n" + "="*60)
    print("CHANCIFY AI API TEST SUITE")
    print("="*60)
    print(f"Testing against: {BASE_URL}")
    print(f"Start Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    results = []
    
    # Test 1: Health Check
    results.append(test_health_check())
    
    # Test 2: Signup
    token = test_signup()
    results.append(token is not None)
    
    # Test 3: Login
    login_token = test_login()
    results.append(login_token is not None)
    
    # Test 4: Get Current User
    results.append(test_get_current_user(token or login_token))
    
    # Test 5: API Docs
    results.append(test_docs())
    
    # Summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    passed = sum(results)
    total = len(results)
    print(f"Passed: {passed}/{total}")
    print(f"Failed: {total - passed}/{total}")
    print(f"Success Rate: {(passed/total)*100:.1f}%")
    
    if passed == total:
        print("\nALL TESTS PASSED!")
    else:
        print("\nSOME TESTS FAILED - Check output above for details")
    
    print("="*60)

if __name__ == "__main__":
    main()

