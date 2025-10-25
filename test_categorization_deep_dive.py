#!/usr/bin/env python3
"""
Deep dive test to identify and fix categorization logic issues
Run hundreds of tests to understand the probability distribution and fix thresholds
"""

import requests
import json
import time
from typing import Dict, List, Any

# Test configuration
BACKEND_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:3000"

def test_single_profile(gpa_unweighted: str, gpa_weighted: str, sat: str, act: str, 
                       major: str, extracurricular_depth: str, test_name: str) -> Dict[str, Any]:
    """Test a single profile and analyze the results"""
    
    request_data = {
        "gpa_unweighted": gpa_unweighted,
        "gpa_weighted": gpa_weighted,
        "sat": sat,
        "act": act,
        "major": major,
        "extracurricular_depth": extracurricular_depth,
        "leadership_positions": "5",
        "awards_publications": "5",
        "passion_projects": "5",
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
        "conduct_record": "9",
        "rigor": "5",
        "ap_count": "5",
        "honors_count": "3",
        "class_rank_percentile": "75",
        "class_size": "300"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/api/suggest/colleges", json=request_data, timeout=30)
        if response.status_code == 200:
            data = response.json()
            suggestions = data.get('suggestions', [])
            
            # Analyze the results
            analysis = {
                "test_name": test_name,
                "profile": {
                    "gpa_unweighted": gpa_unweighted,
                    "gpa_weighted": gpa_weighted,
                    "sat": sat,
                    "act": act,
                    "major": major
                },
                "total_suggestions": len(suggestions),
                "categories": {"safety": 0, "target": 0, "reach": 0},
                "probabilities": [],
                "max_probability": 0,
                "min_probability": 1,
                "categorization_issues": []
            }
            
            for suggestion in suggestions:
                category = suggestion.get('category', 'unknown')
                probability = suggestion.get('probability', 0)
                college_name = suggestion.get('name', 'Unknown')
                
                analysis["categories"][category] += 1
                analysis["probabilities"].append({
                    "college": college_name,
                    "category": category,
                    "probability": probability
                })
                
                analysis["max_probability"] = max(analysis["max_probability"], probability)
                analysis["min_probability"] = min(analysis["min_probability"], probability)
                
                # Check for categorization issues
                if category == "safety" and probability < 0.75:
                    analysis["categorization_issues"].append(f"SAFETY ISSUE: {college_name} has {probability:.1%} but labeled as Safety (should be 75%+)")
                elif category == "target" and (probability < 0.25 or probability >= 0.75):
                    analysis["categorization_issues"].append(f"TARGET ISSUE: {college_name} has {probability:.1%} but labeled as Target (should be 25-75%)")
                elif category == "reach" and (probability < 0.10 or probability >= 0.25):
                    analysis["categorization_issues"].append(f"REACH ISSUE: {college_name} has {probability:.1%} but labeled as Reach (should be 10-25%)")
            
            return analysis
        else:
            return {"test_name": test_name, "error": f"HTTP {response.status_code}: {response.text}"}
            
    except Exception as e:
        return {"test_name": test_name, "error": str(e)}

def run_comprehensive_tests():
    """Run hundreds of tests with different profiles"""
    
    print("=" * 80)
    print("DEEP DIVE CATEGORIZATION TESTING")
    print("=" * 80)
    
    # Test profiles covering the full range of academic performance
    test_profiles = []
    
    # Weak students (GPA 2.0-3.0, SAT 800-1200)
    for gpa in ["2.0", "2.5", "3.0"]:
        for sat in ["800", "1000", "1200"]:
            test_profiles.append({
                "gpa_unweighted": gpa,
                "gpa_weighted": str(float(gpa) + 0.3),
                "sat": sat,
                "act": str(int(int(sat) / 40)),
                "major": "Computer Science",
                "extracurricular_depth": "3",
                "name": f"Weak Student - GPA {gpa}, SAT {sat}"
            })
    
    # Average students (GPA 3.0-3.7, SAT 1200-1400)
    for gpa in ["3.0", "3.3", "3.5", "3.7"]:
        for sat in ["1200", "1300", "1400"]:
            test_profiles.append({
                "gpa_unweighted": gpa,
                "gpa_weighted": str(float(gpa) + 0.4),
                "sat": sat,
                "act": str(int(int(sat) / 40)),
                "major": "Computer Science",
                "extracurricular_depth": "5",
                "name": f"Average Student - GPA {gpa}, SAT {sat}"
            })
    
    # Strong students (GPA 3.7-4.0, SAT 1400-1600)
    for gpa in ["3.7", "3.8", "3.9", "4.0"]:
        for sat in ["1400", "1500", "1600"]:
            test_profiles.append({
                "gpa_unweighted": gpa,
                "gpa_weighted": str(float(gpa) + 0.5),
                "sat": sat,
                "act": str(int(int(sat) / 40)),
                "major": "Computer Science",
                "extracurricular_depth": "8",
                "name": f"Strong Student - GPA {gpa}, SAT {sat}"
            })
    
    # Elite students (GPA 4.0+, SAT 1500+)
    for gpa in ["4.0", "4.2", "4.5"]:
        for sat in ["1500", "1550", "1600"]:
            test_profiles.append({
                "gpa_unweighted": gpa,
                "gpa_weighted": str(float(gpa) + 0.6),
                "sat": sat,
                "act": str(int(int(sat) / 40)),
                "major": "Computer Science",
                "extracurricular_depth": "10",
                "name": f"Elite Student - GPA {gpa}, SAT {sat}"
            })
    
    # Test different majors
    majors = ["Computer Science", "Business", "Engineering", "Medicine", "Psychology"]
    for major in majors:
        test_profiles.append({
            "gpa_unweighted": "3.8",
            "gpa_weighted": "4.2",
            "sat": "1450",
            "act": "33",
            "major": major,
            "extracurricular_depth": "7",
            "name": f"Major Test - {major}"
        })
    
    print(f"Running {len(test_profiles)} comprehensive tests...")
    
    results = []
    issues_found = []
    
    for i, profile in enumerate(test_profiles):
        print(f"Test {i+1}/{len(test_profiles)}: {profile['name']}")
        
        result = test_single_profile(
            profile["gpa_unweighted"],
            profile["gpa_weighted"], 
            profile["sat"],
            profile["act"],
            profile["major"],
            profile["extracurricular_depth"],
            profile["name"]
        )
        
        results.append(result)
        
        # Check for issues
        if "categorization_issues" in result and result["categorization_issues"]:
            issues_found.extend(result["categorization_issues"])
            print(f"  [X] ISSUES FOUND: {len(result['categorization_issues'])}")
            for issue in result["categorization_issues"]:
                print(f"    - {issue}")
        else:
            print(f"  [OK] No categorization issues")
        
        # Small delay to avoid overwhelming the server
        time.sleep(0.1)
    
    # Analyze overall results
    print("\n" + "=" * 80)
    print("COMPREHENSIVE ANALYSIS")
    print("=" * 80)
    
    total_tests = len(results)
    tests_with_issues = len([r for r in results if "categorization_issues" in r and r["categorization_issues"]])
    
    print(f"Total Tests: {total_tests}")
    print(f"Tests with Issues: {tests_with_issues}")
    print(f"Success Rate: {((total_tests - tests_with_issues) / total_tests * 100):.1f}%")
    
    if issues_found:
        print(f"\nTotal Issues Found: {len(issues_found)}")
        
        # Categorize issues
        safety_issues = [i for i in issues_found if "SAFETY ISSUE" in i]
        target_issues = [i for i in issues_found if "TARGET ISSUE" in i]
        reach_issues = [i for i in issues_found if "REACH ISSUE" in i]
        
        print(f"Safety Issues: {len(safety_issues)}")
        print(f"Target Issues: {len(target_issues)}")
        print(f"Reach Issues: {len(reach_issues)}")
        
        # Show sample issues
        print("\nSample Issues:")
        for issue in issues_found[:10]:  # Show first 10 issues
            print(f"  - {issue}")
        
        if len(issues_found) > 10:
            print(f"  ... and {len(issues_found) - 10} more issues")
    
    # Analyze probability ranges
    all_max_probs = [r["max_probability"] for r in results if "max_probability" in r]
    all_min_probs = [r["min_probability"] for r in results if "min_probability" in r]
    
    if all_max_probs:
        print(f"\nProbability Analysis:")
        print(f"Max probabilities range: {min(all_max_probs):.3f} - {max(all_max_probs):.3f}")
        print(f"Min probabilities range: {min(all_min_probs):.3f} - {max(all_min_probs):.3f}")
        print(f"Average max probability: {sum(all_max_probs)/len(all_max_probs):.3f}")
    
    # Save detailed results
    with open("categorization_deep_dive_results.json", "w") as f:
        json.dump({
            "summary": {
                "total_tests": total_tests,
                "tests_with_issues": tests_with_issues,
                "success_rate": ((total_tests - tests_with_issues) / total_tests * 100),
                "total_issues": len(issues_found)
            },
            "results": results,
            "issues": issues_found
        }, f, indent=2)
    
    print(f"\nDetailed results saved to: categorization_deep_dive_results.json")
    
    return results, issues_found

if __name__ == "__main__":
    results, issues = run_comprehensive_tests()
