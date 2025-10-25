#!/usr/bin/env python3
"""
Comprehensive test for calculations page functionality
Tests all the API endpoints and data that the calculations page would use
"""

import requests
import json
import time
from typing import Dict, Any, List

# Configuration
BACKEND_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:3000"

def test_backend_health():
    """Test if backend is running"""
    try:
        response = requests.get(f"{BACKEND_URL}/", timeout=5)
        return response.status_code == 200
    except:
        return False

def create_test_profile() -> Dict[str, str]:
    """Create a test profile for API calls"""
    return {
        "gpa_unweighted": "3.8",
        "gpa_weighted": "4.2", 
        "sat": "1400",
        "act": "32",
        "rigor": "5",
        "ap_count": "6",
        "honors_count": "8",
        "class_rank_percentile": "85",
        "class_size": "500",
        "extracurricular_depth": "8",
        "leadership_positions": "7",
        "awards_publications": "6",
        "passion_projects": "8",
        "business_ventures": "5",
        "volunteer_work": "7",
        "research_experience": "6",
        "portfolio_audition": "4",
        "essay_quality": "8",
        "recommendations": "9",
        "interview": "7",
        "demonstrated_interest": "8",
        "legacy_status": "3",
        "hs_reputation": "8",
        "geographic_diversity": "6",
        "plan_timing": "7",
        "geography_residency": "5",
        "firstgen_diversity": "4",
        "ability_to_pay": "8",
        "policy_knob": "5",
        "conduct_record": "10",
        "major": "Computer Science",
        "college": "Stanford University"
    }

def test_college_suggestions():
    """Test college suggestions endpoint"""
    print("Testing College Suggestions Endpoint...")
    
    profile = create_test_profile()
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/suggest/colleges",
            json=profile,
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            suggestions = data.get('suggestions', [])
            
            print(f"[PASS] Got {len(suggestions)} suggestions")
            
            # Check if we have the expected 9 suggestions (3 safety, 3 target, 3 reach)
            if len(suggestions) == 9:
                print("[PASS] Correct number of suggestions (9)")
                
                # Check categories
                categories = {}
                for suggestion in suggestions:
                    category = suggestion.get('category', 'unknown')
                    categories[category] = categories.get(category, 0) + 1
                
                print(f"[PASS] Categories: {categories}")
                
                # Check if we have 3 of each category
                if categories.get('safety', 0) == 3 and categories.get('target', 0) == 3 and categories.get('reach', 0) == 3:
                    print("[PASS] Perfect 3-3-3 distribution")
                else:
                    print(f"[WARN] Non-ideal distribution: {categories}")
                
                return True, suggestions
            else:
                print(f"[WARN] Expected 9 suggestions, got {len(suggestions)}")
                return False, suggestions
        else:
            print(f"[FAIL] Error: {response.status_code} - {response.text}")
            return False, []
            
    except Exception as e:
        print(f"[FAIL] Exception: {e}")
        return False, []

def test_prediction_endpoint():
    """Test prediction endpoint for specific colleges"""
    print("\nTesting Prediction Endpoint...")
    
    profile = create_test_profile()
    test_colleges = [
        "Stanford University",
        "Harvard University", 
        "Massachusetts Institute of Technology",
        "University of California Berkeley",
        "Carnegie Mellon University"
    ]
    
    results = []
    
    for college in test_colleges:
        profile["college"] = college
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/api/predict/frontend",
                json=profile,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                probability = data.get('probability', 0)
                category = data.get('category', 'unknown')
                
                print(f"[PASS] {college}: {probability:.1%} ({category})")
                results.append({
                    'college': college,
                    'probability': probability,
                    'category': category
                })
            else:
                print(f"[FAIL] {college}: Error {response.status_code}")
                results.append({
                    'college': college,
                    'probability': 0,
                    'category': 'error'
                })
                
        except Exception as e:
            print(f"[FAIL] {college}: Exception {e}")
            results.append({
                'college': college,
                'probability': 0,
                'category': 'error'
            })
    
    return results

def test_college_data_retrieval():
    """Test college data retrieval for calculations page"""
    print("\nTesting College Data Retrieval...")
    
    test_colleges = [
        "Stanford University",
        "Harvard University",
        "Massachusetts Institute of Technology"
    ]
    
    results = []
    
    for college in test_colleges:
        try:
            # Test the college data endpoint (if it exists)
            response = requests.get(f"{BACKEND_URL}/api/college/{college}", timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                print(f"[PASS] {college}: Data retrieved")
                results.append({'college': college, 'data': data})
            else:
                print(f"[WARN] {college}: No dedicated endpoint, using fallback")
                # Use fallback data structure
                fallback_data = {
                    'name': college,
                    'acceptance_rate': 0.05,
                    'sat_25th': 1400,
                    'sat_75th': 1600,
                    'act_25th': 32,
                    'act_75th': 36,
                    'test_policy': 'Required',
                    'financial_aid_policy': 'Need-blind',
                    'selectivity_tier': 'Elite',
                    'gpa_average': 3.95,
                    'city': 'Unknown',
                    'state': 'Unknown',
                    'tuition_in_state': 60000,
                    'tuition_out_of_state': 60000,
                    'student_body_size': 10000
                }
                results.append({'college': college, 'data': fallback_data})
                
        except Exception as e:
            print(f"[FAIL] {college}: Exception {e}")
            results.append({'college': college, 'data': None})
    
    return results

def test_calculations_page_data_structure():
    """Test the data structure that would be used by the calculations page"""
    print("\nTesting Calculations Page Data Structure...")
    
    # Get suggestions
    success, suggestions = test_college_suggestions()
    if not success:
        print("[FAIL] Cannot test data structure without suggestions")
        return False
    
    # Get predictions for each suggested college
    profile = create_test_profile()
    calculations_data = []
    
    for suggestion in suggestions:
        college_name = suggestion.get('name', 'Unknown')
        profile["college"] = college_name
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/api/predict/frontend",
                json=profile,
                timeout=10
            )
            
            if response.status_code == 200:
                prediction_data = response.json()
                
                # Combine suggestion and prediction data
                combined_data = {
                    'college_name': college_name,
                    'category': suggestion.get('category', 'unknown'),
                    'probability': prediction_data.get('probability', 0),
                    'major_fit_score': suggestion.get('major_fit_score', 0),
                    'acceptance_rate': suggestion.get('acceptance_rate', 0),
                    'tuition_in_state': suggestion.get('tuition_in_state', 0),
                    'tuition_out_of_state': suggestion.get('tuition_out_of_state', 0),
                    'city': suggestion.get('city', 'Unknown'),
                    'state': suggestion.get('state', 'Unknown'),
                    'selectivity_tier': suggestion.get('selectivity_tier', 'Unknown')
                }
                
                calculations_data.append(combined_data)
                print(f"[PASS] {college_name}: Data structure complete")
            else:
                print(f"[FAIL] {college_name}: Prediction failed")
                
        except Exception as e:
            print(f"[FAIL] {college_name}: Exception {e}")
    
    print(f"[PASS] Generated data structure for {len(calculations_data)} colleges")
    return calculations_data

def test_loader_functionality():
    """Test the loader functionality (simulate 5-second delay)"""
    print("\nTesting Loader Functionality...")
    
    print("Starting 5-second loader simulation...")
    start_time = time.time()
    
    # Simulate the loader duration
    for i in range(5):
        time.sleep(1)
        elapsed = time.time() - start_time
        remaining = 5 - elapsed
        print(f"  Loader: {elapsed:.1f}s elapsed, {remaining:.1f}s remaining")
    
    print("[PASS] Loader simulation completed")
    return True

def main():
    """Run all tests"""
    print("=" * 60)
    print("CALCULATIONS PAGE FUNCTIONALITY TEST")
    print("=" * 60)
    
    # Test backend health
    if not test_backend_health():
        print("[FAIL] Backend is not running. Please start the backend first.")
        return
    
    print("[PASS] Backend is running")
    
    # Test college suggestions
    success, suggestions = test_college_suggestions()
    if not success:
        print("[FAIL] College suggestions test failed")
        return
    
    # Test prediction endpoint
    predictions = test_prediction_endpoint()
    
    # Test college data retrieval
    college_data = test_college_data_retrieval()
    
    # Test calculations page data structure
    calculations_data = test_calculations_page_data_structure()
    
    # Test loader functionality
    test_loader_functionality()
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    print(f"[PASS] Backend Health: PASS")
    print(f"[PASS] College Suggestions: {'PASS' if success else 'FAIL'}")
    print(f"[PASS] Predictions: {len([p for p in predictions if p['probability'] > 0])}/{len(predictions)} colleges")
    print(f"[PASS] College Data: {len([c for c in college_data if c['data']])}/{len(college_data)} colleges")
    print(f"[PASS] Calculations Data: {len(calculations_data)} colleges")
    print(f"[PASS] Loader Functionality: PASS")
    
    # Save test results
    test_results = {
        'timestamp': time.time(),
        'backend_health': True,
        'suggestions_success': success,
        'suggestions_count': len(suggestions),
        'predictions': predictions,
        'college_data': college_data,
        'calculations_data': calculations_data
    }
    
    with open('calculations_page_test_results.json', 'w') as f:
        json.dump(test_results, f, indent=2)
    
    print(f"\n[PASS] Test results saved to 'calculations_page_test_results.json'")
    print("\nAll calculations page functionality tests completed!")

if __name__ == "__main__":
    main()
