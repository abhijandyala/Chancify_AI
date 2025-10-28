#!/usr/bin/env python3
"""
Hardcoded Subject Emphasis Data for Colleges
This replaces OpenAI API calls with predefined data
"""

# Hardcoded subject emphasis data for different colleges
SUBJECT_EMPHASIS_DATA = {
    # Carnegie Mellon University - Strong in CS and Engineering
    "carnegie mellon university": {
        "Computer Science": 35.0,
        "Engineering": 30.0,
        "Business": 15.0,
        "Biological Sciences": 5.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 4.0,
        "Arts & Humanities": 2.0,
        "Education": 1.0
    },
    
    # Massachusetts Institute of Technology - STEM focused
    "massachusetts institute of technology": {
        "Computer Science": 25.0,
        "Engineering": 40.0,
        "Business": 8.0,
        "Biological Sciences": 12.0,
        "Mathematics & Stats": 10.0,
        "Social Sciences": 3.0,
        "Arts & Humanities": 1.5,
        "Education": 0.5
    },
    
    # Harvard University - Liberal Arts with strong everything
    "harvard university": {
        "Computer Science": 12.0,
        "Engineering": 8.0,
        "Business": 15.0,
        "Biological Sciences": 15.0,
        "Mathematics & Stats": 10.0,
        "Social Sciences": 20.0,
        "Arts & Humanities": 15.0,
        "Education": 5.0
    },
    
    # Stanford University - Tech and Business focused
    "stanford university": {
        "Computer Science": 30.0,
        "Engineering": 25.0,
        "Business": 20.0,
        "Biological Sciences": 10.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 4.0,
        "Arts & Humanities": 2.5,
        "Education": 0.5
    },
    
    # Yale University - Liberal Arts strong
    "yale university": {
        "Computer Science": 8.0,
        "Engineering": 5.0,
        "Business": 12.0,
        "Biological Sciences": 15.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 25.0,
        "Arts & Humanities": 22.0,
        "Education": 5.0
    },
    
    # Princeton University - Balanced excellence
    "princeton university": {
        "Computer Science": 15.0,
        "Engineering": 15.0,
        "Business": 10.0,
        "Biological Sciences": 15.0,
        "Mathematics & Stats": 15.0,
        "Social Sciences": 15.0,
        "Arts & Humanities": 12.0,
        "Education": 3.0
    },
    
    # Columbia University - Urban, diverse programs
    "columbia university": {
        "Computer Science": 18.0,
        "Engineering": 12.0,
        "Business": 20.0,
        "Biological Sciences": 12.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 18.0,
        "Arts & Humanities": 10.0,
        "Education": 2.0
    },
    
    # University of Pennsylvania - Wharton Business focus
    "university of pennsylvania": {
        "Computer Science": 15.0,
        "Engineering": 15.0,
        "Business": 35.0,
        "Biological Sciences": 10.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 12.0,
        "Arts & Humanities": 4.0,
        "Education": 1.0
    },
    
    # Brown University - Liberal Arts, no core curriculum
    "brown university": {
        "Computer Science": 12.0,
        "Engineering": 8.0,
        "Business": 10.0,
        "Biological Sciences": 15.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 25.0,
        "Arts & Humanities": 20.0,
        "Education": 2.0
    },
    
    # Dartmouth College - Liberal Arts, small classes
    "dartmouth college": {
        "Computer Science": 10.0,
        "Engineering": 8.0,
        "Business": 15.0,
        "Biological Sciences": 12.0,
        "Mathematics & Stats": 10.0,
        "Social Sciences": 25.0,
        "Arts & Humanities": 18.0,
        "Education": 2.0
    },
    
    # Cornell University - Diverse programs, strong engineering
    "cornell university": {
        "Computer Science": 20.0,
        "Engineering": 25.0,
        "Business": 15.0,
        "Biological Sciences": 15.0,
        "Mathematics & Stats": 10.0,
        "Social Sciences": 8.0,
        "Arts & Humanities": 5.0,
        "Education": 2.0
    },
    
    # California Institute of Technology - Pure STEM
    "california institute of technology": {
        "Computer Science": 20.0,
        "Engineering": 35.0,
        "Business": 2.0,
        "Biological Sciences": 20.0,
        "Mathematics & Stats": 20.0,
        "Social Sciences": 2.0,
        "Arts & Humanities": 0.5,
        "Education": 0.5
    },
    
    # Duke University - Strong in everything
    "duke university": {
        "Computer Science": 15.0,
        "Engineering": 12.0,
        "Business": 18.0,
        "Biological Sciences": 18.0,
        "Mathematics & Stats": 10.0,
        "Social Sciences": 15.0,
        "Arts & Humanities": 10.0,
        "Education": 2.0
    },
    
    # Northwestern University - Journalism and Media
    "northwestern university": {
        "Computer Science": 12.0,
        "Engineering": 10.0,
        "Business": 15.0,
        "Biological Sciences": 12.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 25.0,
        "Arts & Humanities": 15.0,
        "Education": 3.0
    },
    
    # Rice University - Small, research-focused
    "rice university": {
        "Computer Science": 18.0,
        "Engineering": 20.0,
        "Business": 12.0,
        "Biological Sciences": 15.0,
        "Mathematics & Stats": 12.0,
        "Social Sciences": 12.0,
        "Arts & Humanities": 8.0,
        "Education": 3.0
    },
    
    # Vanderbilt University - Liberal Arts with strong pre-med
    "vanderbilt university": {
        "Computer Science": 10.0,
        "Engineering": 8.0,
        "Business": 15.0,
        "Biological Sciences": 25.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 20.0,
        "Arts & Humanities": 12.0,
        "Education": 2.0
    },
    
    # University of Notre Dame - Catholic, liberal arts
    "university of notre dame": {
        "Computer Science": 8.0,
        "Engineering": 10.0,
        "Business": 20.0,
        "Biological Sciences": 12.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 25.0,
        "Arts & Humanities": 15.0,
        "Education": 2.0
    },
    
    # University of California-Berkeley - Public, diverse
    "university of california-berkeley": {
        "Computer Science": 25.0,
        "Engineering": 20.0,
        "Business": 12.0,
        "Biological Sciences": 15.0,
        "Mathematics & Stats": 10.0,
        "Social Sciences": 12.0,
        "Arts & Humanities": 5.0,
        "Education": 1.0
    },
    
    # University of California-Los Angeles - Large, diverse
    "university of california-los angeles": {
        "Computer Science": 20.0,
        "Engineering": 15.0,
        "Business": 15.0,
        "Biological Sciences": 18.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 15.0,
        "Arts & Humanities": 8.0,
        "Education": 1.0
    },
    
    # New York University - Urban, arts and business
    "new york university": {
        "Computer Science": 15.0,
        "Engineering": 8.0,
        "Business": 25.0,
        "Biological Sciences": 10.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 20.0,
        "Arts & Humanities": 12.0,
        "Education": 2.0
    },
    
    # University of Southern California - Film and business
    "university of southern california": {
        "Computer Science": 18.0,
        "Engineering": 15.0,
        "Business": 25.0,
        "Biological Sciences": 10.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 12.0,
        "Arts & Humanities": 10.0,
        "Education": 2.0
    },
    
    # Boston College - Jesuit, liberal arts
    "boston college": {
        "Computer Science": 8.0,
        "Engineering": 5.0,
        "Business": 20.0,
        "Biological Sciences": 12.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 25.0,
        "Arts & Humanities": 20.0,
        "Education": 2.0
    },
    
    # Georgetown University - International relations
    "georgetown university": {
        "Computer Science": 5.0,
        "Engineering": 3.0,
        "Business": 15.0,
        "Biological Sciences": 8.0,
        "Mathematics & Stats": 5.0,
        "Social Sciences": 35.0,
        "Arts & Humanities": 25.0,
        "Education": 4.0
    },
    
    # Johns Hopkins University - Medicine and research
    "johns hopkins university": {
        "Computer Science": 15.0,
        "Engineering": 15.0,
        "Business": 8.0,
        "Biological Sciences": 35.0,
        "Mathematics & Stats": 12.0,
        "Social Sciences": 8.0,
        "Arts & Humanities": 5.0,
        "Education": 2.0
    },
    
    # Washington University in St Louis - Medicine and business
    "washington university in st louis": {
        "Computer Science": 12.0,
        "Engineering": 10.0,
        "Business": 20.0,
        "Biological Sciences": 30.0,
        "Mathematics & Stats": 8.0,
        "Social Sciences": 12.0,
        "Arts & Humanities": 6.0,
        "Education": 2.0
    }
}

def get_subject_emphasis_for_college(college_name: str) -> dict:
    """
    Get subject emphasis data for a college.
    Returns hardcoded data if available, otherwise returns default data.
    """
    # Normalize college name for lookup
    normalized_name = college_name.lower().strip()
    
    # Check if we have hardcoded data for this college
    if normalized_name in SUBJECT_EMPHASIS_DATA:
        return SUBJECT_EMPHASIS_DATA[normalized_name]
    
    # Try partial matching for common variations
    for key, data in SUBJECT_EMPHASIS_DATA.items():
        if normalized_name in key or key in normalized_name:
            return data
    
    # Default data if no match found
    return {
        "Computer Science": 20.0,
        "Engineering": 18.0,
        "Business": 15.0,
        "Biological Sciences": 12.0,
        "Mathematics & Stats": 10.0,
        "Social Sciences": 10.0,
        "Arts & Humanities": 10.0,
        "Education": 5.0
    }

def test_hardcoded_data():
    """Test the hardcoded data with some colleges"""
    test_colleges = [
        "Carnegie Mellon University",
        "Massachusetts Institute of Technology",
        "Harvard University",
        "Stanford University",
        "Yale University"
    ]
    
    print("Testing Hardcoded Subject Emphasis Data...")
    print("=" * 50)
    
    for college in test_colleges:
        data = get_subject_emphasis_for_college(college)
        total = sum(data.values())
        
        print(f"\n{college}:")
        print(f"Total: {total}%")
        
        # Show top 3 subjects
        sorted_subjects = sorted(data.items(), key=lambda x: x[1], reverse=True)
        for i, (subject, percentage) in enumerate(sorted_subjects[:3]):
            print(f"  {i+1}. {subject}: {percentage}%")

if __name__ == "__main__":
    test_hardcoded_data()
