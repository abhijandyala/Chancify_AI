#!/usr/bin/env python3
"""
Comprehensive Testing Suite for Calculations Page
Tests all attributes, dropdowns, college selections, and data flow
"""

import requests
import json
import time
import random
from typing import Dict, List, Any
import sys

# Test configuration
BASE_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:3000"

class CalculationsPageTester:
    def __init__(self):
        self.test_results = []
        self.passed_tests = 0
        self.failed_tests = 0
        self.total_tests = 0
    
    def create_test_data(self, **kwargs):
        """Create test data with string values"""
        default_data = {
            "gpa_unweighted": "3.8",
            "gpa_weighted": "4.2",
            "sat": "1450",
            "act": "32",
            "extracurricular_depth": "8",
            "leadership_positions": "7",
            "awards_publications": "6",
            "passion_projects": "8",
            "business_ventures": "5",
            "volunteer_work": "7",
            "research_experience": "6",
            "portfolio_audition": "4",
            "essay_quality": "8",
            "recommendations": "7",
            "interview": "6",
            "demonstrated_interest": "7",
            "legacy_status": "3",
            "geographic_diversity": "5",
            "firstgen_diversity": "4",
            "hs_reputation": "8",
            "plan_timing": "6",
            "geography_residency": "5",
            "ability_to_pay": "7",
            "policy_knob": "5",
            "conduct_record": "9",
            "major": "Computer Science"
        }
        
        # Convert all kwargs to strings
        for key, value in kwargs.items():
            default_data[key] = str(value)
        
        return default_data
        
    def log_test(self, test_name: str, passed: bool, details: str = ""):
        """Log test result"""
        self.total_tests += 1
        if passed:
            self.passed_tests += 1
            status = "PASS"
        else:
            self.failed_tests += 1
            status = "FAIL"
            
        result = {
            "test": test_name,
            "status": status,
            "details": details,
            "timestamp": time.time()
        }
        self.test_results.append(result)
        print(f"[{status}] {test_name}: {details}")
        
    def test_backend_health(self):
        """Test 1: Backend health check"""
        try:
            # Test with a simple API call instead of health endpoint
            response = requests.get(f"{BASE_URL}/", timeout=5)
            if response.status_code in [200, 404]:  # 404 is fine, means server is running
                self.log_test("Backend Health Check", True, "Backend is running")
                return True
            else:
                self.log_test("Backend Health Check", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Backend Health Check", False, f"Error: {str(e)}")
            return False
    
    def test_frontend_health(self):
        """Test 2: Frontend health check"""
        try:
            response = requests.get(FRONTEND_URL, timeout=5)
            if response.status_code == 200:
                self.log_test("Frontend Health Check", True, "Frontend is running")
                return True
            else:
                self.log_test("Frontend Health Check", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Frontend Health Check", False, f"Error: {str(e)}")
            return False
    
    def test_college_suggestions_endpoint(self):
        """Test 3: College suggestions endpoint"""
        test_data = self.create_test_data()
        
        try:
            response = requests.post(f"{BASE_URL}/api/suggest/colleges", json=test_data, timeout=30)
            if response.status_code == 200:
                data = response.json()
                if 'suggestions' in data and len(data['suggestions']) > 0:
                    self.log_test("College Suggestions Endpoint", True, f"Got {len(data['suggestions'])} suggestions")
                    return data['suggestions']
                else:
                    self.log_test("College Suggestions Endpoint", False, "No suggestions returned")
                    return []
            else:
                self.log_test("College Suggestions Endpoint", False, f"Status: {response.status_code}")
                return []
        except Exception as e:
            self.log_test("College Suggestions Endpoint", False, f"Error: {str(e)}")
            return []
    
    def test_prediction_endpoint(self, college_name: str):
        """Test 4: Prediction endpoint for specific college"""
        test_data = self.create_test_data(
            college=college_name,
            rigor="8",
            ap_count="6",
            honors_count="4",
            class_rank_percentile="85",
            class_size="500"
        )
        
        try:
            response = requests.post(f"{BASE_URL}/api/predict/frontend", json=test_data, timeout=30)
            if response.status_code == 200:
                data = response.json()
                if 'probability' in data:
                    self.log_test(f"Prediction for {college_name}", True, f"Probability: {data['probability']:.1f}%")
                    return data
                else:
                    self.log_test(f"Prediction for {college_name}", False, "No probability returned")
                    return None
            else:
                self.log_test(f"Prediction for {college_name}", False, f"Status: {response.status_code}")
                return None
        except Exception as e:
            self.log_test(f"Prediction for {college_name}", False, f"Error: {str(e)}")
            return None
    
    def test_different_majors(self):
        """Test 5-15: Different major selections"""
        majors = [
            "Computer Science", "Business", "Engineering", "Medicine", "Law",
            "Psychology", "Biology", "Mathematics", "Physics", "Chemistry"
        ]
        
        for major in majors:
            test_data = self.create_test_data(major=major)
            
            try:
                response = requests.post(f"{BASE_URL}/api/suggest/colleges", json=test_data, timeout=30)
                if response.status_code == 200:
                    data = response.json()
                    if 'suggestions' in data and len(data['suggestions']) > 0:
                        self.log_test(f"Major: {major}", True, f"Got {len(data['suggestions'])} suggestions")
                    else:
                        self.log_test(f"Major: {major}", False, "No suggestions returned")
                else:
                    self.log_test(f"Major: {major}", False, f"Status: {response.status_code}")
            except Exception as e:
                self.log_test(f"Major: {major}", False, f"Error: {str(e)}")
    
    def test_different_gpa_ranges(self):
        """Test 16-25: Different GPA ranges"""
        gpa_combinations = [
            (3.0, 3.5), (3.2, 3.7), (3.5, 4.0), (3.7, 4.2), (3.9, 4.4),
            (4.0, 4.5), (4.2, 4.7), (4.4, 4.9), (4.6, 5.1), (4.8, 5.3)
        ]
        
        for i, (gpa_unweighted, gpa_weighted) in enumerate(gpa_combinations):
            test_data = self.create_test_data(
                gpa_unweighted=gpa_unweighted,
                gpa_weighted=gpa_weighted
            )
            
            try:
                response = requests.post(f"{BASE_URL}/api/suggest/colleges", json=test_data, timeout=30)
                if response.status_code == 200:
                    data = response.json()
                    if 'suggestions' in data and len(data['suggestions']) > 0:
                        self.log_test(f"GPA Range {i+1}: {gpa_unweighted}/{gpa_weighted}", True, f"Got {len(data['suggestions'])} suggestions")
                    else:
                        self.log_test(f"GPA Range {i+1}: {gpa_unweighted}/{gpa_weighted}", False, "No suggestions returned")
                else:
                    self.log_test(f"GPA Range {i+1}: {gpa_unweighted}/{gpa_weighted}", False, f"Status: {response.status_code}")
            except Exception as e:
                self.log_test(f"GPA Range {i+1}: {gpa_unweighted}/{gpa_weighted}", False, f"Error: {str(e)}")
    
    def test_different_sat_act_scores(self):
        """Test 26-35: Different SAT/ACT score combinations"""
        score_combinations = [
            (1200, 25), (1300, 28), (1400, 31), (1500, 34), (1600, 36),
            (1100, 23), (1350, 29), (1450, 32), (1550, 35), (1250, 27)
        ]
        
        for i, (sat, act) in enumerate(score_combinations):
            test_data = self.create_test_data(sat=sat, act=act)
            
            try:
                response = requests.post(f"{BASE_URL}/api/suggest/colleges", json=test_data, timeout=30)
                if response.status_code == 200:
                    data = response.json()
                    if 'suggestions' in data and len(data['suggestions']) > 0:
                        self.log_test(f"SAT/ACT {i+1}: {sat}/{act}", True, f"Got {len(data['suggestions'])} suggestions")
                    else:
                        self.log_test(f"SAT/ACT {i+1}: {sat}/{act}", False, "No suggestions returned")
                else:
                    self.log_test(f"SAT/ACT {i+1}: {sat}/{act}", False, f"Status: {response.status_code}")
            except Exception as e:
                self.log_test(f"SAT/ACT {i+1}: {sat}/{act}", False, f"Error: {str(e)}")
    
    def test_different_extracurricular_profiles(self):
        """Test 36-45: Different extracurricular profiles"""
        ec_profiles = [
            {"depth": 3, "leadership": 2, "awards": 1, "passion": 2, "business": 1, "volunteer": 3, "research": 1, "portfolio": 1},
            {"depth": 5, "leadership": 4, "awards": 3, "passion": 4, "business": 2, "volunteer": 5, "research": 3, "portfolio": 2},
            {"depth": 7, "leadership": 6, "awards": 5, "passion": 6, "business": 4, "volunteer": 7, "research": 5, "portfolio": 4},
            {"depth": 9, "leadership": 8, "awards": 7, "passion": 8, "business": 6, "volunteer": 9, "research": 7, "portfolio": 6},
            {"depth": 10, "leadership": 10, "awards": 9, "passion": 10, "business": 8, "volunteer": 10, "research": 9, "portfolio": 8},
            {"depth": 2, "leadership": 1, "awards": 1, "passion": 1, "business": 1, "volunteer": 2, "research": 1, "portfolio": 1},
            {"depth": 4, "leadership": 3, "awards": 2, "passion": 3, "business": 2, "volunteer": 4, "research": 2, "portfolio": 2},
            {"depth": 6, "leadership": 5, "awards": 4, "passion": 5, "business": 3, "volunteer": 6, "research": 4, "portfolio": 3},
            {"depth": 8, "leadership": 7, "awards": 6, "passion": 7, "business": 5, "volunteer": 8, "research": 6, "portfolio": 5},
            {"depth": 1, "leadership": 1, "awards": 1, "passion": 1, "business": 1, "volunteer": 1, "research": 1, "portfolio": 1}
        ]
        
        for i, profile in enumerate(ec_profiles):
            test_data = self.create_test_data(
                extracurricular_depth=profile["depth"],
                leadership_positions=profile["leadership"],
                awards_publications=profile["awards"],
                passion_projects=profile["passion"],
                business_ventures=profile["business"],
                volunteer_work=profile["volunteer"],
                research_experience=profile["research"],
                portfolio_audition=profile["portfolio"]
            )
            
            try:
                response = requests.post(f"{BASE_URL}/api/suggest/colleges", json=test_data, timeout=30)
                if response.status_code == 200:
                    data = response.json()
                    if 'suggestions' in data and len(data['suggestions']) > 0:
                        self.log_test(f"EC Profile {i+1}: Depth {profile['depth']}", True, f"Got {len(data['suggestions'])} suggestions")
                    else:
                        self.log_test(f"EC Profile {i+1}: Depth {profile['depth']}", False, "No suggestions returned")
                else:
                    self.log_test(f"EC Profile {i+1}: Depth {profile['depth']}", False, f"Status: {response.status_code}")
            except Exception as e:
                self.log_test(f"EC Profile {i+1}: Depth {profile['depth']}", False, f"Error: {str(e)}")
    
    def test_different_demographic_profiles(self):
        """Test 46-55: Different demographic profiles"""
        demo_profiles = [
            {"legacy": 1, "geographic": 3, "firstgen": 2, "hs_reputation": 5},
            {"legacy": 3, "geographic": 5, "firstgen": 4, "hs_reputation": 7},
            {"legacy": 5, "geographic": 7, "firstgen": 6, "hs_reputation": 9},
            {"legacy": 7, "geographic": 9, "firstgen": 8, "hs_reputation": 10},
            {"legacy": 10, "geographic": 10, "firstgen": 10, "hs_reputation": 10},
            {"legacy": 2, "geographic": 4, "firstgen": 3, "hs_reputation": 6},
            {"legacy": 4, "geographic": 6, "firstgen": 5, "hs_reputation": 8},
            {"legacy": 6, "geographic": 8, "firstgen": 7, "hs_reputation": 9},
            {"legacy": 8, "geographic": 9, "firstgen": 9, "hs_reputation": 10},
            {"legacy": 9, "geographic": 10, "firstgen": 10, "hs_reputation": 10}
        ]
        
        for i, profile in enumerate(demo_profiles):
            test_data = self.create_test_data(
                legacy_status=profile["legacy"],
                geographic_diversity=profile["geographic"],
                firstgen_diversity=profile["firstgen"],
                hs_reputation=profile["hs_reputation"]
            )
            
            try:
                response = requests.post(f"{BASE_URL}/api/suggest/colleges", json=test_data, timeout=30)
                if response.status_code == 200:
                    data = response.json()
                    if 'suggestions' in data and len(data['suggestions']) > 0:
                        self.log_test(f"Demo Profile {i+1}: Legacy {profile['legacy']}", True, f"Got {len(data['suggestions'])} suggestions")
                    else:
                        self.log_test(f"Demo Profile {i+1}: Legacy {profile['legacy']}", False, "No suggestions returned")
                else:
                    self.log_test(f"Demo Profile {i+1}: Legacy {profile['legacy']}", False, f"Status: {response.status_code}")
            except Exception as e:
                self.log_test(f"Demo Profile {i+1}: Legacy {profile['legacy']}", False, f"Error: {str(e)}")
    
    def test_edge_cases(self):
        """Test 56-65: Edge cases and boundary conditions"""
        edge_cases = [
            {"gpa_unweighted": 0.0, "gpa_weighted": 0.0, "sat": 400, "act": 1},
            {"gpa_unweighted": 5.0, "gpa_weighted": 6.0, "sat": 1600, "act": 36},
            {"gpa_unweighted": 2.0, "gpa_weighted": 2.5, "sat": 800, "act": 12},
            {"gpa_unweighted": 4.0, "gpa_weighted": 4.5, "sat": 1200, "act": 25},
            {"gpa_unweighted": 3.5, "gpa_weighted": 4.0, "sat": 1000, "act": 20},
            {"gpa_unweighted": 4.5, "gpa_weighted": 5.0, "sat": 1500, "act": 34},
            {"gpa_unweighted": 1.0, "gpa_weighted": 1.5, "sat": 600, "act": 8},
            {"gpa_unweighted": 4.8, "gpa_weighted": 5.3, "sat": 1580, "act": 35},
            {"gpa_unweighted": 2.5, "gpa_weighted": 3.0, "sat": 900, "act": 15},
            {"gpa_unweighted": 4.2, "gpa_weighted": 4.7, "sat": 1400, "act": 31}
        ]
        
        for i, case in enumerate(edge_cases):
            test_data = self.create_test_data(
                gpa_unweighted=case["gpa_unweighted"],
                gpa_weighted=case["gpa_weighted"],
                sat=case["sat"],
                act=case["act"],
                extracurricular_depth=5,
                leadership_positions=4,
                awards_publications=3,
                passion_projects=5,
                business_ventures=2,
                volunteer_work=5,
                research_experience=3,
                portfolio_audition=2,
                essay_quality=6,
                recommendations=5,
                interview=4,
                demonstrated_interest=5,
                legacy_status=3,
                geographic_diversity=4,
                firstgen_diversity=3,
                hs_reputation=6,
                plan_timing=4,
                geography_residency=4,
                ability_to_pay=5,
                policy_knob=4,
                conduct_record=7
            )
            
            try:
                response = requests.post(f"{BASE_URL}/api/suggest/colleges", json=test_data, timeout=30)
                if response.status_code == 200:
                    data = response.json()
                    if 'suggestions' in data and len(data['suggestions']) > 0:
                        self.log_test(f"Edge Case {i+1}: GPA {case['gpa_unweighted']}", True, f"Got {len(data['suggestions'])} suggestions")
                    else:
                        self.log_test(f"Edge Case {i+1}: GPA {case['gpa_unweighted']}", False, "No suggestions returned")
                else:
                    self.log_test(f"Edge Case {i+1}: GPA {case['gpa_unweighted']}", False, f"Status: {response.status_code}")
            except Exception as e:
                self.log_test(f"Edge Case {i+1}: GPA {case['gpa_unweighted']}", False, f"Error: {str(e)}")
    
    def test_college_data_validation(self, suggestions: List[Dict]):
        """Test 66-75: Validate college data structure"""
        if not suggestions:
            self.log_test("College Data Validation", False, "No suggestions to validate")
            return
        
        required_fields = [
            'name', 'city', 'state', 'acceptance_rate', 'tuition_in_state',
            'tuition_out_of_state', 'student_body_size', 'selectivity_tier',
            'major_fit_score', 'probability', 'category'
        ]
        
        for i, college in enumerate(suggestions[:10]):  # Test first 10 colleges
            missing_fields = []
            for field in required_fields:
                if field not in college:
                    missing_fields.append(field)
            
            if not missing_fields:
                self.log_test(f"College Data {i+1}: {college.get('name', 'Unknown')}", True, "All required fields present")
            else:
                self.log_test(f"College Data {i+1}: {college.get('name', 'Unknown')}", False, f"Missing: {', '.join(missing_fields)}")
    
    def test_probability_ranges(self, suggestions: List[Dict]):
        """Test 76-85: Validate probability ranges"""
        if not suggestions:
            self.log_test("Probability Range Validation", False, "No suggestions to validate")
            return
        
        for i, college in enumerate(suggestions[:10]):
            prob = college.get('probability', 0)
            if 0 <= prob <= 100:
                self.log_test(f"Probability {i+1}: {college.get('name', 'Unknown')}", True, f"Valid range: {prob:.1f}%")
            else:
                self.log_test(f"Probability {i+1}: {college.get('name', 'Unknown')}", False, f"Invalid range: {prob:.1f}%")
    
    def test_category_distribution(self, suggestions: List[Dict]):
        """Test 86-95: Validate category distribution"""
        if not suggestions:
            self.log_test("Category Distribution", False, "No suggestions to validate")
            return
        
        categories = {}
        for college in suggestions:
            category = college.get('category', 'Unknown')
            categories[category] = categories.get(category, 0) + 1
        
        expected_categories = ['safety', 'target', 'reach']
        for category in expected_categories:
            count = categories.get(category, 0)
            if count > 0:
                self.log_test(f"Category: {category}", True, f"Found {count} colleges")
            else:
                self.log_test(f"Category: {category}", False, "No colleges found")
    
    def test_major_relevance(self, suggestions: List[Dict]):
        """Test 96-100: Validate major relevance"""
        if not suggestions:
            self.log_test("Major Relevance", False, "No suggestions to validate")
            return
        
        for i, college in enumerate(suggestions[:10]):
            major_fit_score = college.get('major_fit_score', 0)
            if 0 <= major_fit_score <= 1:
                self.log_test(f"Major Fit {i+1}: {college.get('name', 'Unknown')}", True, f"Score: {major_fit_score:.2f}")
            else:
                self.log_test(f"Major Fit {i+1}: {college.get('name', 'Unknown')}", False, f"Invalid score: {major_fit_score:.2f}")
    
    def run_comprehensive_tests(self):
        """Run all comprehensive tests"""
        print("Starting Comprehensive Calculations Page Testing")
        print("=" * 60)
        
        # Basic health checks
        if not self.test_backend_health():
            print("Backend not available. Stopping tests.")
            return
        
        if not self.test_frontend_health():
            print("Frontend not available. Continuing with backend tests.")
        
        # Get initial suggestions
        suggestions = self.test_college_suggestions_endpoint()
        
        # Test different majors
        print("\nTesting Different Majors...")
        self.test_different_majors()
        
        # Test different GPA ranges
        print("\nTesting Different GPA Ranges...")
        self.test_different_gpa_ranges()
        
        # Test different SAT/ACT scores
        print("\nTesting Different SAT/ACT Scores...")
        self.test_different_sat_act_scores()
        
        # Test different extracurricular profiles
        print("\nTesting Different Extracurricular Profiles...")
        self.test_different_extracurricular_profiles()
        
        # Test different demographic profiles
        print("\nTesting Different Demographic Profiles...")
        self.test_different_demographic_profiles()
        
        # Test edge cases
        print("\nTesting Edge Cases...")
        self.test_edge_cases()
        
        # Validate college data
        if suggestions:
            print("\nValidating College Data...")
            self.test_college_data_validation(suggestions)
            self.test_probability_ranges(suggestions)
            self.test_category_distribution(suggestions)
            self.test_major_relevance(suggestions)
        
        # Test predictions for specific colleges
        if suggestions:
            print("\nTesting Predictions for Specific Colleges...")
            for i, college in enumerate(suggestions[:5]):
                college_name = college.get('name', 'Unknown')
                self.test_prediction_endpoint(college_name)
        
        # Print summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.total_tests}")
        print(f"Passed: {self.passed_tests}")
        print(f"Failed: {self.failed_tests}")
        print(f"Success Rate: {(self.passed_tests/self.total_tests)*100:.1f}%")
        
        if self.failed_tests > 0:
            print(f"\nFailed Tests:")
            for result in self.test_results:
                if result['status'] == 'FAIL':
                    print(f"  - {result['test']}: {result['details']}")
        
        print("\nComprehensive testing completed!")
        return self.test_results

def main():
    """Main function to run comprehensive tests"""
    tester = CalculationsPageTester()
    results = tester.run_comprehensive_tests()
    
    # Save results to file
    with open('comprehensive_test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\nTest results saved to 'comprehensive_test_results.json'")

if __name__ == "__main__":
    main()
