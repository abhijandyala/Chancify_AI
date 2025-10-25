import pandas as pd
from backend.data.real_major_mapping import get_all_majors, get_colleges_for_major, get_major_strength_score

# Load the real data
df = pd.read_csv('backend/data/raw/real_colleges_integrated.csv')

print("=== REAL DATA DEBUG ===")
print(f"Total colleges: {len(df)}")
print(f"Columns: {list(df.columns)}")

# Check Computer Science major
print("\n=== COMPUTER SCIENCE MAJOR ===")
cs_elite = get_colleges_for_major('Computer Science', 'elite')
cs_highly = get_colleges_for_major('Computer Science', 'highly_selective')
cs_selective = get_colleges_for_major('Computer Science', 'selective')
cs_moderate = get_colleges_for_major('Computer Science', 'moderately_selective')

print(f"Elite CS colleges: {len(cs_elite)}")
print(f"Highly Selective CS colleges: {len(cs_highly)}")
print(f"Selective CS colleges: {len(cs_selective)}")
print(f"Moderately Selective CS colleges: {len(cs_moderate)}")

# Check some sample colleges
print("\n=== SAMPLE COLLEGES ===")
sample_colleges = df.head(5)
for _, row in sample_colleges.iterrows():
    print(f"College: {row['name']}")
    print(f"  Major 1: {row.get('major_1', 'N/A')}")
    print(f"  Major 2: {row.get('major_2', 'N/A')}")
    print(f"  Major 3: {row.get('major_3', 'N/A')}")
    print(f"  Selectivity: {row.get('selectivity_tier', 'N/A')}")
    print(f"  Acceptance Rate: {row.get('acceptance_rate', 'N/A')}")
    print()

# Check all available majors
print("\n=== ALL AVAILABLE MAJORS ===")
all_majors = get_all_majors()
print(f"Total majors: {len(all_majors)}")
print("Sample majors:", all_majors[:10])

# Test major strength for a few colleges
print("\n=== MAJOR STRENGTH TEST ===")
test_colleges = ['Harvard University', 'MIT', 'Stanford University', 'University of Alabama']
for college in test_colleges:
    strength = get_major_strength_score(college, 'Computer Science')
    print(f"{college}: CS strength = {strength:.2f}")
