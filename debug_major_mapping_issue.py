#!/usr/bin/env python3
"""
Debug why top CS schools aren't showing up in our major mapping
"""

from backend.data.real_ipeds_major_mapping import RealIPEDSMajorMapping
import pandas as pd

def main():
    # Initialize the mapping system
    mapping = RealIPEDSMajorMapping()
    
    print("DEBUGGING MAJOR MAPPING FOR TOP CS SCHOOLS")
    print("=" * 50)
    
    # Check specific top CS schools
    top_schools = [
        "Carnegie Mellon University",
        "Georgia Institute of Technology-Main Campus", 
        "Massachusetts Institute of Technology",
        "Stanford University",
        "University of California-Berkeley",
        "University of Illinois Urbana-Champaign"
    ]
    
    print("Checking if these schools offer Computer & Information Sciences:")
    print()
    
    for school in top_schools:
        print(f"Checking: {school}")
        
        # Check if school exists in our college data
        try:
            college_df = pd.read_csv('backend/data/raw/real_colleges_integrated.csv')
            school_data = college_df[college_df['name'] == school]
            
            if not school_data.empty:
                print(f"  FOUND: School found in college data")
                
                # Check if school offers Computer & Information Sciences
                strength_score = mapping.get_major_strength_score(school, 'Computer & Information Sciences')
                print(f"  Major strength score: {strength_score}")
                
                if strength_score > 0:
                    print(f"  YES: School offers Computer & Information Sciences")
                else:
                    print(f"  NO: School does NOT offer Computer & Information Sciences")
                    
            else:
                print(f"  NOT FOUND: School not found in college data")
                
        except Exception as e:
            print(f"  Error: {e}")
        
        print()
    
    # Let's also check what majors these schools actually offer
    print("CHECKING WHAT MAJORS THESE SCHOOLS ACTUALLY OFFER:")
    print("=" * 50)
    
    try:
        # Load the IPEDS data to see what majors these schools offer
        ipeds_df = pd.read_csv('therealdatabase/ipeds_top_majors_2024.csv')
        
        for school in top_schools:
            print(f"\n{school}:")
            
            # Try to find the school in IPEDS data
            # We need to match by name or UNITID
            school_matches = ipeds_df[ipeds_df['INSTNM'].str.contains(school.split()[0], case=False, na=False)]
            
            if not school_matches.empty:
                # Get the UNITID for this school
                unitid = school_matches.iloc[0]['UNITID']
                print(f"  UNITID: {unitid}")
                
                # Get all majors for this school
                school_majors = ipeds_df[ipeds_df['UNITID'] == unitid]
                
                # Show top 5 majors by share percentage
                top_majors = school_majors.nlargest(5, 'share_pct')
                
                print(f"  Top 5 majors:")
                for _, row in top_majors.iterrows():
                    major_name = row['CIPFAM_NAME']
                    share_pct = row['share_pct']
                    print(f"    - {major_name}: {share_pct:.1f}%")
                    
            else:
                print(f"  Not found in IPEDS data")
                
    except Exception as e:
        print(f"Error loading IPEDS data: {e}")

if __name__ == "__main__":
    main()
