#!/usr/bin/env python3
"""
Test uvicorn and capture logs
"""

import subprocess
import time
import requests
import json

def test_with_logs():
    """Start uvicorn and test the endpoint"""
    
    print("Starting uvicorn...")
    
    # Start uvicorn in a subprocess
    process = subprocess.Popen(
        ["python", "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1
    )
    
    # Wait for server to start
    print("Waiting for server to start...")
    time.sleep(15)
    
    # Make a request
    print("\nMaking request...")
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
    
    try:
        response = requests.post(url, json=test_data, timeout=30)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text[:500]}")
    except Exception as e:
        print(f"Request error: {e}")
    
    # Print server logs
    print("\n=== Server Logs ===")
    try:
        for line in iter(process.stdout.readline, ''):
            if line:
                print(line.rstrip())
            else:
                break
    except:
        pass
    
    # Kill the process
    process.terminate()
    process.wait()

if __name__ == "__main__":
    test_with_logs()
