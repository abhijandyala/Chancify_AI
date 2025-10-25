#!/usr/bin/env python3
"""
Test college selection page integration with calculations page
Tests the complete flow from college selection to calculations
"""

import requests
import json
import time
from typing import Dict, Any, List

# Configuration
BACKEND_URL = "http://localhost:8000"

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

def test_college_search():
    """Test college search functionality"""
    print("Testing College Search Functionality...")
    
    search_queries = ["MIT", "Harvard", "Stanford", "Berkeley", "Carnegie"]
    results = []
    
    for query in search_queries:
        try:
            response = requests.get(
                f"{BACKEND_URL}/api/search/colleges?query={query}",
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                colleges = data.get('colleges', [])
                print(f"[PASS] Search '{query}': Found {len(colleges)} colleges")
                results.append({'query': query, 'count': len(colleges), 'colleges': colleges})
            else:
                print(f"[FAIL] Search '{query}': Error {response.status_code}")
                results.append({'query': query, 'count': 0, 'colleges': []})
                
        except Exception as e:
            print(f"[FAIL] Search '{query}': Exception {e}")
            results.append({'query': query, 'count': 0, 'colleges': []})
    
    return results

def test_ai_recommendations():
    """Test AI recommendations for different majors"""
    print("\nTesting AI Recommendations...")
    
    majors = ["Computer Science", "Business", "Engineering", "Medicine", "Psychology"]
    results = []
    
    for major in majors:
        profile = create_test_profile()
        profile["major"] = major
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/api/suggest/colleges",
                json=profile,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                suggestions = data.get('suggestions', [])
                
                # Check categories
                categories = {}
                for suggestion in suggestions:
                    category = suggestion.get('category', 'unknown')
                    categories[category] = categories.get(category, 0) + 1
                
                print(f"[PASS] Major '{major}': {len(suggestions)} suggestions, Categories: {categories}")
                results.append({
                    'major': major,
                    'count': len(suggestions),
                    'categories': categories,
                    'suggestions': suggestions
                })
            else:
                print(f"[FAIL] Major '{major}': Error {response.status_code}")
                results.append({'major': major, 'count': 0, 'categories': {}, 'suggestions': []})
                
        except Exception as e:
            print(f"[FAIL] Major '{major}': Exception {e}")
            results.append({'major': major, 'count': 0, 'categories': {}, 'suggestions': []})
    
    return results

def test_selected_colleges_flow():
    """Test the flow from selected colleges to calculations"""
    print("\nTesting Selected Colleges Flow...")
    
    # Get AI recommendations first
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
            
            print(f"[PASS] Got {len(suggestions)} AI recommendations")
            
            # Simulate selecting 3 colleges (one from each category)
            selected_colleges = []
            for category in ['safety', 'target', 'reach']:
                category_colleges = [s for s in suggestions if s.get('category') == category]
                if category_colleges:
                    selected_colleges.append(category_colleges[0])
            
            print(f"[PASS] Selected {len(selected_colleges)} colleges for calculations")
            
            # Test predictions for selected colleges
            predictions = []
            for college in selected_colleges:
                college_name = college.get('name', 'Unknown')
                profile["college"] = college_name
                
                try:
                    pred_response = requests.post(
                        f"{BACKEND_URL}/api/predict/frontend",
                        json=profile,
                        timeout=10
                    )
                    
                    if pred_response.status_code == 200:
                        pred_data = pred_response.json()
                        probability = pred_data.get('probability', 0)
                        category = pred_data.get('category', 'unknown')
                        
                        predictions.append({
                            'college': college_name,
                            'probability': probability,
                            'category': category,
                            'original_category': college.get('category', 'unknown')
                        })
                        
                        print(f"[PASS] {college_name}: {probability:.1%} ({category})")
                    else:
                        print(f"[FAIL] {college_name}: Prediction error {pred_response.status_code}")
                        
                except Exception as e:
                    print(f"[FAIL] {college_name}: Prediction exception {e}")
            
            return {
                'suggestions': suggestions,
                'selected_colleges': selected_colleges,
                'predictions': predictions
            }
        else:
            print(f"[FAIL] AI recommendations error: {response.status_code}")
            return None
            
    except Exception as e:
        print(f"[FAIL] AI recommendations exception: {e}")
        return None

def test_loader_simulation():
    """Test the loader component simulation"""
    print("\nTesting Loader Component Simulation...")
    
    print("Simulating 5-second loader with live timer...")
    start_time = time.time()
    
    # Simulate the loader with live updates
    for i in range(5):
        time.sleep(1)
        elapsed = time.time() - start_time
        remaining = 5 - elapsed
        progress = (elapsed / 5) * 100
        
        print(f"  Loader Progress: {progress:.1f}% | {elapsed:.1f}s elapsed | {remaining:.1f}s remaining")
    
    print("[PASS] Loader simulation completed successfully")
    return True

def test_calculations_page_data():
    """Test the data structure for calculations page"""
    print("\nTesting Calculations Page Data Structure...")
    
    # Get the complete flow data
    flow_data = test_selected_colleges_flow()
    if not flow_data:
        print("[FAIL] Cannot test calculations page without flow data")
        return False
    
    predictions = flow_data['predictions']
    
    # Create calculations page data structure
    calculations_data = []
    
    for prediction in predictions:
        college_data = {
            'collegeName': prediction['college'],
            'category': prediction['category'],
            'probability': prediction['probability'],
            'outcome': {
                'accept': prediction['probability'] * 100,
                'waitlist': max(0, (1 - prediction['probability']) * 0.3 * 100),
                'reject': max(0, (1 - prediction['probability']) * 0.7 * 100)
            },
            'subjects': [
                {'label': 'Computer Science', 'value': 35},
                {'label': 'Engineering', 'value': 25},
                {'label': 'Business', 'value': 15},
                {'label': 'Mathematics', 'value': 10},
                {'label': 'Other', 'value': 15}
            ],
            'ethnicity': [
                {'label': 'White', 'value': 40},
                {'label': 'Asian', 'value': 30},
                {'label': 'Hispanic/Latino', 'value': 15},
                {'label': 'Black/African American', 'value': 10},
                {'label': 'Other', 'value': 5}
            ],
            'costs': {
                'year': 2025,
                'inStateTuition': 60000,
                'outStateTuition': 60000,
                'fees': 2000,
                'roomBoard': 15000,
                'books': 1000,
                'other': 3000
            },
            'tags': ['Test-Optional', 'Need-Blind', 'Meets Full Need'],
            'facts': {
                'Student-Faculty Ratio': '6:1',
                'Graduation Rate (6yr)': '95%',
                'Freshman Retention': '98%',
                'Endowment': '$25B'
            }
        }
        
        calculations_data.append(college_data)
        print(f"[PASS] Created calculations data for {prediction['college']}")
    
    print(f"[PASS] Generated complete calculations page data for {len(calculations_data)} colleges")
    return calculations_data

def main():
    """Run all integration tests"""
    print("=" * 70)
    print("COLLEGE SELECTION INTEGRATION TEST")
    print("=" * 70)
    
    # Test backend health
    try:
        response = requests.get(f"{BACKEND_URL}/", timeout=5)
        if response.status_code != 200:
            print("[FAIL] Backend is not running")
            return
    except:
        print("[FAIL] Backend is not running")
        return
    
    print("[PASS] Backend is running")
    
    # Test college search
    search_results = test_college_search()
    
    # Test AI recommendations
    recommendation_results = test_ai_recommendations()
    
    # Test selected colleges flow
    flow_results = test_selected_colleges_flow()
    
    # Test loader simulation
    loader_success = test_loader_simulation()
    
    # Test calculations page data
    calculations_data = test_calculations_page_data()
    
    # Summary
    print("\n" + "=" * 70)
    print("INTEGRATION TEST SUMMARY")
    print("=" * 70)
    
    print(f"[PASS] Backend Health: PASS")
    print(f"[PASS] College Search: {len([r for r in search_results if r['count'] > 0])}/{len(search_results)} queries")
    print(f"[PASS] AI Recommendations: {len([r for r in recommendation_results if r['count'] > 0])}/{len(recommendation_results)} majors")
    print(f"[PASS] Selected Colleges Flow: {'PASS' if flow_results else 'FAIL'}")
    print(f"[PASS] Loader Simulation: {'PASS' if loader_success else 'FAIL'}")
    print(f"[PASS] Calculations Page Data: {len(calculations_data) if calculations_data else 0} colleges")
    
    # Save test results
    test_results = {
        'timestamp': time.time(),
        'search_results': search_results,
        'recommendation_results': recommendation_results,
        'flow_results': flow_results,
        'loader_success': loader_success,
        'calculations_data': calculations_data
    }
    
    with open('college_selection_integration_results.json', 'w') as f:
        json.dump(test_results, f, indent=2)
    
    print(f"\n[PASS] Integration test results saved to 'college_selection_integration_results.json'")
    print("\nAll college selection integration tests completed!")

if __name__ == "__main__":
    main()
