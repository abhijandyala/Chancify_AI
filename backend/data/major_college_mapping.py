"""
Major-College Mapping System
Maps majors to colleges that are known for excellence in those fields
"""

# Major categories and their associated strong colleges
MAJOR_COLLEGE_MAPPING = {
    # Computer Science & Engineering
    "Computer Science": {
        "elite": ["Massachusetts Institute of Technology", "Stanford University", "Carnegie Mellon University", "University of California--Berkeley"],
        "highly_selective": ["Georgia Institute of Technology", "University of Illinois--Urbana-Champaign", "University of Washington", "Cornell University", "University of Texas--Austin"],
        "selective": ["University of California--San Diego", "University of Wisconsin--Madison", "Purdue University", "University of Maryland--College Park"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    "Engineering": {
        "elite": ["Massachusetts Institute of Technology", "Stanford University", "California Institute of Technology", "Georgia Institute of Technology"],
        "highly_selective": ["University of Illinois--Urbana-Champaign", "Purdue University", "University of Michigan--Ann Arbor", "Carnegie Mellon University"],
        "selective": ["Texas A&M University", "Virginia Tech", "University of Wisconsin--Madison", "North Carolina State University"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "Iowa State University", "University of Utah"]
    },
    
    # Business & Economics
    "Business": {
        "elite": ["University of Pennsylvania", "Stanford University", "Harvard University", "Northwestern University"],
        "highly_selective": ["University of Michigan--Ann Arbor", "University of Virginia", "Cornell University", "New York University"],
        "selective": ["Indiana University--Bloomington", "University of Texas--Austin", "University of North Carolina--Chapel Hill", "University of Wisconsin--Madison"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    "Economics": {
        "elite": ["Harvard University", "Stanford University", "University of Chicago", "Massachusetts Institute of Technology"],
        "highly_selective": ["University of California--Berkeley", "Yale University", "Princeton University", "Columbia University"],
        "selective": ["University of Michigan--Ann Arbor", "University of Wisconsin--Madison", "University of California--Los Angeles", "Duke University"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    # Medicine & Health Sciences
    "Pre-Medicine": {
        "elite": ["Harvard University", "Stanford University", "Johns Hopkins University", "University of Pennsylvania"],
        "highly_selective": ["University of California--Berkeley", "University of Michigan--Ann Arbor", "University of North Carolina--Chapel Hill", "Emory University"],
        "selective": ["University of Wisconsin--Madison", "University of California--Los Angeles", "University of Virginia", "University of Washington"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    "Nursing": {
        "elite": ["University of Pennsylvania", "Johns Hopkins University", "Duke University", "Emory University"],
        "highly_selective": ["University of Michigan--Ann Arbor", "University of North Carolina--Chapel Hill", "University of Washington", "University of California--Los Angeles"],
        "selective": ["University of Wisconsin--Madison", "University of Virginia", "University of Texas--Austin", "Indiana University--Bloomington"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    # Liberal Arts & Humanities
    "English": {
        "elite": ["Harvard University", "Yale University", "Stanford University", "Princeton University"],
        "highly_selective": ["University of California--Berkeley", "University of Chicago", "Columbia University", "University of Virginia"],
        "selective": ["University of Michigan--Ann Arbor", "University of North Carolina--Chapel Hill", "University of Wisconsin--Madison", "University of California--Los Angeles"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    "History": {
        "elite": ["Harvard University", "Yale University", "Princeton University", "Stanford University"],
        "highly_selective": ["University of California--Berkeley", "University of Chicago", "Columbia University", "University of Virginia"],
        "selective": ["University of Michigan--Ann Arbor", "University of North Carolina--Chapel Hill", "University of Wisconsin--Madison", "University of California--Los Angeles"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    "Psychology": {
        "elite": ["Stanford University", "Harvard University", "University of California--Berkeley", "Yale University"],
        "highly_selective": ["University of Michigan--Ann Arbor", "University of California--Los Angeles", "University of North Carolina--Chapel Hill", "University of Virginia"],
        "selective": ["University of Wisconsin--Madison", "University of Texas--Austin", "Indiana University--Bloomington", "University of Washington"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    # STEM Fields
    "Mathematics": {
        "elite": ["Massachusetts Institute of Technology", "Harvard University", "Stanford University", "Princeton University"],
        "highly_selective": ["University of California--Berkeley", "University of Chicago", "Yale University", "Columbia University"],
        "selective": ["University of Michigan--Ann Arbor", "University of Wisconsin--Madison", "University of California--Los Angeles", "University of Texas--Austin"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    "Physics": {
        "elite": ["Massachusetts Institute of Technology", "California Institute of Technology", "Harvard University", "Stanford University"],
        "highly_selective": ["University of California--Berkeley", "Princeton University", "University of Chicago", "Yale University"],
        "selective": ["University of Michigan--Ann Arbor", "University of Wisconsin--Madison", "University of California--Los Angeles", "University of Texas--Austin"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    "Biology": {
        "elite": ["Harvard University", "Stanford University", "Massachusetts Institute of Technology", "University of California--Berkeley"],
        "highly_selective": ["Yale University", "Princeton University", "University of Chicago", "Columbia University"],
        "selective": ["University of Michigan--Ann Arbor", "University of North Carolina--Chapel Hill", "University of Wisconsin--Madison", "University of California--Los Angeles"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    # Arts & Design
    "Art": {
        "elite": ["Yale University", "Rhode Island School of Design", "School of the Art Institute of Chicago", "University of California--Los Angeles"],
        "highly_selective": ["Carnegie Mellon University", "New York University", "University of Southern California", "University of California--Berkeley"],
        "selective": ["University of Michigan--Ann Arbor", "University of Wisconsin--Madison", "Indiana University--Bloomington", "University of Texas--Austin"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    "Music": {
        "elite": ["Juilliard School", "Curtis Institute of Music", "Yale University", "University of Michigan--Ann Arbor"],
        "highly_selective": ["Indiana University--Bloomington", "University of Southern California", "New York University", "University of California--Los Angeles"],
        "selective": ["University of Wisconsin--Madison", "University of North Carolina--Chapel Hill", "University of Texas--Austin", "University of Washington"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    # Social Sciences
    "Political Science": {
        "elite": ["Harvard University", "Yale University", "Princeton University", "Stanford University"],
        "highly_selective": ["University of California--Berkeley", "University of Chicago", "Columbia University", "University of Virginia"],
        "selective": ["University of Michigan--Ann Arbor", "University of North Carolina--Chapel Hill", "University of Wisconsin--Madison", "University of California--Los Angeles"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    },
    
    "Sociology": {
        "elite": ["Harvard University", "University of California--Berkeley", "Stanford University", "University of Chicago"],
        "highly_selective": ["Yale University", "Princeton University", "Columbia University", "University of Michigan--Ann Arbor"],
        "selective": ["University of North Carolina--Chapel Hill", "University of Wisconsin--Madison", "University of California--Los Angeles", "University of Texas--Austin"],
        "moderately_selective": ["Arizona State University", "University of Central Florida", "University of Utah", "Iowa State University"]
    }
}

def get_colleges_for_major(major: str, selectivity_tier: str = None):
    """
    Get colleges that are strong in a specific major
    
    Args:
        major: The major field of study
        selectivity_tier: Optional filter for selectivity tier
    
    Returns:
        List of college names
    """
    if major not in MAJOR_COLLEGE_MAPPING:
        return []
    
    colleges = []
    major_data = MAJOR_COLLEGE_MAPPING[major]
    
    if selectivity_tier:
        if selectivity_tier in major_data:
            colleges.extend(major_data[selectivity_tier])
    else:
        # Return all colleges for this major
        for tier_colleges in major_data.values():
            colleges.extend(tier_colleges)
    
    return colleges

def get_major_strength_score(college_name: str, major: str):
    """
    Get a strength score (0-1) for how strong a college is in a specific major
    
    Args:
        college_name: Name of the college
        major: The major field of study
    
    Returns:
        Float score between 0 and 1
    """
    if major not in MAJOR_COLLEGE_MAPPING:
        return 0.5  # Default neutral score
    
    major_data = MAJOR_COLLEGE_MAPPING[major]
    
    # Check each tier and assign scores
    if college_name in major_data.get("elite", []):
        return 1.0
    elif college_name in major_data.get("highly_selective", []):
        return 0.8
    elif college_name in major_data.get("selective", []):
        return 0.6
    elif college_name in major_data.get("moderately_selective", []):
        return 0.4
    else:
        return 0.3  # Default score for colleges not specifically known for this major

def get_all_majors():
    """Get list of all available majors"""
    return list(MAJOR_COLLEGE_MAPPING.keys())
