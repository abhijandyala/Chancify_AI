#!/usr/bin/env python3
"""
Hardcoded College Tuition and Cost Data
Real tuition data for colleges - can be updated with Excel file later
"""

# Hardcoded tuition and cost data for different colleges
COLLEGE_TUITION_DATA = {
    # Carnegie Mellon University - Private university
    "carnegie mellon university": {
        "in_state_tuition": 61030,
        "out_state_tuition": 61030,
        "fees": 882,
        "room_board": 20691,
        "books": 891,
        "other_expenses": 2283,
        "total_in_state": 84777,
        "total_out_state": 84777,
        "is_private": True
    },
    
    # Massachusetts Institute of Technology - Private university
    "massachusetts institute of technology": {
        "in_state_tuition": 57986,
        "out_state_tuition": 57986,
        "fees": 0,
        "room_board": 19510,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 80496,
        "total_out_state": 80496,
        "is_private": True
    },
    
    # Harvard University - Private university
    "harvard university": {
        "in_state_tuition": 57261,
        "out_state_tuition": 57261,
        "fees": 0,
        "room_board": 19500,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 79761,
        "total_out_state": 79761,
        "is_private": True
    },
    
    # Stanford University - Private university
    "stanford university": {
        "in_state_tuition": 61731,
        "out_state_tuition": 61731,
        "fees": 0,
        "room_board": 19522,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 84253,
        "total_out_state": 84253,
        "is_private": True
    },
    
    # Yale University - Private university
    "yale university": {
        "in_state_tuition": 62250,
        "out_state_tuition": 62250,
        "fees": 0,
        "room_board": 18500,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 82750,
        "total_out_state": 82750,
        "is_private": True
    },
    
    # Princeton University - Private university
    "princeton university": {
        "in_state_tuition": 59270,
        "out_state_tuition": 59270,
        "fees": 0,
        "room_board": 18500,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 79770,
        "total_out_state": 79770,
        "is_private": True
    },
    
    # Columbia University - Private university
    "columbia university": {
        "in_state_tuition": 65024,
        "out_state_tuition": 65024,
        "fees": 0,
        "room_board": 16000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 84024,
        "total_out_state": 84024,
        "is_private": True
    },
    
    # University of Pennsylvania - Private university
    "university of pennsylvania": {
        "in_state_tuition": 61678,
        "out_state_tuition": 61678,
        "fees": 0,
        "room_board": 16500,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 80178,
        "total_out_state": 80178,
        "is_private": True
    },
    
    # Brown University - Private university
    "brown university": {
        "in_state_tuition": 62580,
        "out_state_tuition": 62580,
        "fees": 0,
        "room_board": 16500,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 81080,
        "total_out_state": 81080,
        "is_private": True
    },
    
    # Dartmouth College - Private university
    "dartmouth college": {
        "in_state_tuition": 62558,
        "out_state_tuition": 62558,
        "fees": 0,
        "room_board": 17000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 81558,
        "total_out_state": 81558,
        "is_private": True
    },
    
    # Cornell University - Private university
    "cornell university": {
        "in_state_tuition": 61615,
        "out_state_tuition": 61615,
        "fees": 0,
        "room_board": 16000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 79615,
        "total_out_state": 79615,
        "is_private": True
    },
    
    # California Institute of Technology - Private university
    "california institute of technology": {
        "in_state_tuition": 58680,
        "out_state_tuition": 58680,
        "fees": 0,
        "room_board": 18000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 78680,
        "total_out_state": 78680,
        "is_private": True
    },
    
    # Duke University - Private university
    "duke university": {
        "in_state_tuition": 61250,
        "out_state_tuition": 61250,
        "fees": 0,
        "room_board": 17000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 80250,
        "total_out_state": 80250,
        "is_private": True
    },
    
    # Northwestern University - Private university
    "northwestern university": {
        "in_state_tuition": 62040,
        "out_state_tuition": 62040,
        "fees": 0,
        "room_board": 17000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 81040,
        "total_out_state": 81040,
        "is_private": True
    },
    
    # Rice University - Private university
    "rice university": {
        "in_state_tuition": 52060,
        "out_state_tuition": 52060,
        "fees": 0,
        "room_board": 15000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 70060,
        "total_out_state": 70060,
        "is_private": True
    },
    
    # Vanderbilt University - Private university
    "vanderbilt university": {
        "in_state_tuition": 60000,
        "out_state_tuition": 60000,
        "fees": 0,
        "room_board": 17000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 79000,
        "total_out_state": 79000,
        "is_private": True
    },
    
    # University of Notre Dame - Private university
    "university of notre dame": {
        "in_state_tuition": 58000,
        "out_state_tuition": 58000,
        "fees": 0,
        "room_board": 16000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 76000,
        "total_out_state": 76000,
        "is_private": True
    },
    
    # University of California-Berkeley - Public university
    "university of california-berkeley": {
        "in_state_tuition": 14312,
        "out_state_tuition": 44007,
        "fees": 0,
        "room_board": 20000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 38312,
        "total_out_state": 67007,
        "is_private": False
    },
    
    # University of California-Los Angeles - Public university
    "university of california-los angeles": {
        "in_state_tuition": 13104,
        "out_state_tuition": 43098,
        "fees": 0,
        "room_board": 20000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 36104,
        "total_out_state": 66098,
        "is_private": False
    },
    
    # New York University - Private university
    "new york university": {
        "in_state_tuition": 56500,
        "out_state_tuition": 56500,
        "fees": 0,
        "room_board": 20000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 78500,
        "total_out_state": 78500,
        "is_private": True
    },
    
    # University of Southern California - Private university
    "university of southern california": {
        "in_state_tuition": 61000,
        "out_state_tuition": 61000,
        "fees": 0,
        "room_board": 16000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 79000,
        "total_out_state": 79000,
        "is_private": True
    },
    
    # Boston College - Private university
    "boston college": {
        "in_state_tuition": 61000,
        "out_state_tuition": 61000,
        "fees": 0,
        "room_board": 16000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 79000,
        "total_out_state": 79000,
        "is_private": True
    },
    
    # Georgetown University - Private university
    "georgetown university": {
        "in_state_tuition": 59000,
        "out_state_tuition": 59000,
        "fees": 0,
        "room_board": 18000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 79000,
        "total_out_state": 79000,
        "is_private": True
    },
    
    # Johns Hopkins University - Private university
    "johns hopkins university": {
        "in_state_tuition": 58000,
        "out_state_tuition": 58000,
        "fees": 0,
        "room_board": 17000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 77000,
        "total_out_state": 77000,
        "is_private": True
    },
    
    # Washington University in St Louis - Private university
    "washington university in st louis": {
        "in_state_tuition": 59000,
        "out_state_tuition": 59000,
        "fees": 0,
        "room_board": 17000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 78000,
        "total_out_state": 78000,
        "is_private": True
    }
}

def get_tuition_data_for_college(college_name: str) -> dict:
    """
    Get tuition and cost data for a college.
    Returns hardcoded data if available, otherwise returns default data.
    """
    # Normalize college name for lookup
    normalized_name = college_name.lower().strip()
    
    # Check if we have hardcoded data for this college
    if normalized_name in COLLEGE_TUITION_DATA:
        return COLLEGE_TUITION_DATA[normalized_name]
    
    # Try partial matching for common variations
    for key, data in COLLEGE_TUITION_DATA.items():
        if normalized_name in key or key in normalized_name:
            return data
    
    # Default data if no match found (generic private university costs)
    return {
        "in_state_tuition": 50000,
        "out_state_tuition": 50000,
        "fees": 1000,
        "room_board": 15000,
        "books": 1000,
        "other_expenses": 2000,
        "total_in_state": 67000,
        "total_out_state": 67000,
        "is_private": True
    }

def test_tuition_data():
    """Test the tuition data with some colleges"""
    test_colleges = [
        "Carnegie Mellon University",
        "Massachusetts Institute of Technology",
        "Harvard University",
        "Stanford University",
        "University of California-Berkeley"
    ]
    
    print("Testing Hardcoded Tuition Data...")
    print("=" * 60)
    
    for college in test_colleges:
        data = get_tuition_data_for_college(college)
        
        print(f"\n{college}:")
        print(f"  In-State Tuition: ${data['in_state_tuition']:,}")
        print(f"  Out-of-State Tuition: ${data['out_state_tuition']:,}")
        print(f"  Room & Board: ${data['room_board']:,}")
        print(f"  Total In-State: ${data['total_in_state']:,}")
        print(f"  Total Out-of-State: ${data['total_out_state']:,}")
        print(f"  Private: {data['is_private']}")

if __name__ == "__main__":
    test_tuition_data()
