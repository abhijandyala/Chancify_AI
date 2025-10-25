"""
Simple debug to find why suggestions are empty
"""

import pandas as pd
from backend.data.improved_major_mapping import get_colleges_for_major, get_major_strength_score

# Load the data
df = pd.read_csv('backend/data/raw/real_colleges_integrated.csv')
print(f"Total colleges in dataset: {len(df)}")

# Test major mapping
major = 'Engineering'
print(f"\n=== TESTING MAJOR: {major} ===")
cs_elite = get_colleges_for_major(major, 'elite')
cs_highly = get_colleges_for_major(major, 'highly_selective')
cs_selective = get_colleges_for_major(major, 'selective')
cs_moderate = get_colleges_for_major(major, 'moderately_selective')

print(f"Elite {major} colleges: {len(cs_elite)}")
print(f"Highly Selective {major} colleges: {len(cs_highly)}")
print(f"Selective {major} colleges: {len(cs_selective)}")
print(f"Moderately Selective {major} colleges: {len(cs_moderate)}")

# Check if we have any colleges with the right selectivity
print(f"\n=== SELECTIVITY DISTRIBUTION ===")
selectivity_counts = df['selectivity_tier'].value_counts()
print(selectivity_counts)

# Check if we have any colleges with the right major strength
print(f"\n=== MAJOR STRENGTH TEST ===")
test_colleges = df.head(10)
strong_colleges = []
for _, row in test_colleges.iterrows():
    college_name = row['name']
    strength = get_major_strength_score(college_name, major)
    if strength >= 0.2:  # Same threshold as in backend
        strong_colleges.append((college_name, strength, row['selectivity_tier']))

print(f"Colleges with {major} strength >= 0.2: {len(strong_colleges)}")
for college, strength, tier in strong_colleges:
    print(f"  {college}: {strength:.2f} ({tier})")

# Check the filtering logic
print(f"\n=== FILTERING LOGIC TEST ===")
major_elite = get_colleges_for_major(major, 'elite')
major_highly_selective = get_colleges_for_major(major, 'highly_selective')
major_selective = get_colleges_for_major(major, 'selective')
major_moderately_selective = get_colleges_for_major(major, 'moderately_selective')

print(f"Major-specific colleges found:")
print(f"  Elite: {len(major_elite)}")
print(f"  Highly Selective: {len(major_highly_selective)}")
print(f"  Selective: {len(major_selective)}")
print(f"  Moderately Selective: {len(major_moderately_selective)}")

# Check if the issue is in the major filtering
total_major_colleges = len(major_elite) + len(major_highly_selective) + len(major_selective) + len(major_moderately_selective)
print(f"Total major-specific colleges: {total_major_colleges}")

if total_major_colleges == 0:
    print("❌ No major-specific colleges found - this is the problem!")
    print("The system is filtering out all colleges because none match the major criteria.")
else:
    print("✅ Major-specific colleges found - the issue is elsewhere.")

print("\n=== RECOMMENDATION ===")
print("The issue is likely that the major mapping system is not finding any colleges")
print("that match the user's major. This could be because:")
print("1. The major name doesn't match exactly")
print("2. The related major logic isn't working")
print("3. The colleges don't have the expected major data")
print("\nTry using 'Engineering' instead of 'Computer Science' to test.")
