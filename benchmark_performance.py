#!/usr/bin/env python3
"""
Benchmark the performance of the college suggestions endpoint
"""

import requests
import time
import statistics

def benchmark_suggestions():
    """Benchmark the suggestions endpoint performance"""
    
    url = "http://localhost:8000/api/suggest/colleges"
    
    test_data = {
        "gpa_unweighted": "3.8",
        "gpa_weighted": "4.2",
        "sat": "1450",
        "act": "33",
        "major": "Computer Science",
        "extracurricular_depth": "8",
        "leadership_positions": "8",
        "awards_publications": "8",
        "passion_projects": "8",
        "business_ventures": "5",
        "volunteer_work": "5",
        "research_experience": "5",
        "portfolio_audition": "5",
        "essay_quality": "5",
        "recommendations": "5",
        "interview": "5",
        "demonstrated_interest": "5",
        "legacy_status": "5",
        "hs_reputation": "5",
        "geographic_diversity": "5",
        "plan_timing": "5",
        "geography_residency": "5",
        "firstgen_diversity": "5",
        "ability_to_pay": "5",
        "policy_knob": "5",
        "conduct_record": "9"
    }
    
    print("Benchmarking College Suggestions Endpoint")
    print("="*60)
    
    # Test 1: First request (cold cache)
    print("\n1. First request (cold cache):")
    start = time.time()
    response = requests.post(url, json=test_data, timeout=30)
    duration = time.time() - start
    print(f"   Status: {response.status_code}")
    print(f"   Duration: {duration:.3f}s")
    if response.status_code == 200:
        data = response.json()
        print(f"   Suggestions: {len(data.get('suggestions', []))}")
    
    # Test 2: Second request (warm cache)
    print("\n2. Second request (warm cache):")
    start = time.time()
    response = requests.post(url, json=test_data, timeout=30)
    duration = time.time() - start
    print(f"   Status: {response.status_code}")
    print(f"   Duration: {duration:.3f}s (should be much faster due to caching)")
    
    # Test 3: Multiple requests with different majors
    print("\n3. Multiple requests with different majors:")
    majors = ["Computer Science", "Business", "Engineering", "Medicine", "Psychology"]
    durations = []
    
    for major in majors:
        test_data['major'] = major
        start = time.time()
        response = requests.post(url, json=test_data, timeout=30)
        duration = time.time() - start
        durations.append(duration)
        print(f"   {major}: {duration:.3f}s")
    
    print(f"\n   Average duration: {statistics.mean(durations):.3f}s")
    print(f"   Min duration: {min(durations):.3f}s")
    print(f"   Max duration: {max(durations):.3f}s")
    
    # Test 4: Rapid fire requests (testing cache effectiveness)
    print("\n4. Rapid fire requests (same data, testing cache):")
    durations = []
    for i in range(10):
        start = time.time()
        response = requests.post(url, json=test_data, timeout=30)
        duration = time.time() - start
        durations.append(duration)
    
    print(f"   Average duration: {statistics.mean(durations):.3f}s")
    print(f"   Min duration: {min(durations):.3f}s")
    print(f"   Max duration: {max(durations):.3f}s")
    print(f"   All requests should be fast due to caching")
    
    print("\n" + "="*60)
    print("Benchmark complete!")

if __name__ == "__main__":
    benchmark_suggestions()
