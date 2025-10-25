from backend.data.improved_major_mapping import get_colleges_for_major, get_major_strength_score, get_all_majors

print("=== IMPROVED MAJOR MAPPING TEST ===")

# Test Computer Science major
print("\n=== COMPUTER SCIENCE MAJOR ===")
cs_elite = get_colleges_for_major('Computer Science', 'elite')
cs_highly = get_colleges_for_major('Computer Science', 'highly_selective')
cs_selective = get_colleges_for_major('Computer Science', 'selective')
cs_moderate = get_colleges_for_major('Computer Science', 'moderately_selective')

print(f"Elite CS colleges: {len(cs_elite)}")
print(f"Highly Selective CS colleges: {len(cs_highly)}")
print(f"Selective CS colleges: {len(cs_selective)}")
print(f"Moderately Selective CS colleges: {len(cs_moderate)}")

if cs_elite:
    print("Elite CS colleges:", cs_elite[:3])
if cs_highly:
    print("Highly Selective CS colleges:", cs_highly[:3])

# Test major strength for a few colleges
print("\n=== MAJOR STRENGTH TEST ===")
test_colleges = ['Harvard University', 'MIT', 'Stanford University', 'University of Alabama', 'Auburn University']
for college in test_colleges:
    strength = get_major_strength_score(college, 'Computer Science')
    print(f"{college}: CS strength = {strength:.2f}")

# Test all available majors
print("\n=== ALL AVAILABLE MAJORS ===")
all_majors = get_all_majors()
print(f"Total majors: {len(all_majors)}")
print("All majors:", all_majors)
