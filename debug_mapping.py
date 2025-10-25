from backend.data.improved_major_mapping import ImprovedMajorMapping

# Create a new instance to test
mapping = ImprovedMajorMapping()

# Test Computer Science
print("=== TESTING COMPUTER SCIENCE MAPPING ===")
cs_elite = mapping.get_colleges_for_major('Computer Science', 'elite')
print(f"Elite CS colleges: {len(cs_elite)}")
print(f"Elite CS colleges: {cs_elite}")

# Check if the mapping was built
print(f"Computer Science in mapping: {'Computer Science' in mapping.major_mapping}")
if 'Computer Science' in mapping.major_mapping:
    print(f"CS mapping: {mapping.major_mapping['Computer Science']}")

# Test Engineering
print("\n=== TESTING ENGINEERING MAPPING ===")
eng_elite = mapping.get_colleges_for_major('Engineering', 'elite')
print(f"Elite Engineering colleges: {len(eng_elite)}")
print(f"Elite Engineering colleges: {eng_elite}")

# Check if the mapping was built
print(f"Engineering in mapping: {'Engineering' in mapping.major_mapping}")
if 'Engineering' in mapping.major_mapping:
    print(f"Engineering mapping: {mapping.major_mapping['Engineering']}")

# Test the data directly
print("\n=== TESTING DATA DIRECTLY ===")
df = mapping.df
print(f"Total colleges: {len(df)}")

# Check a few colleges
sample_colleges = df.head(3)
for _, row in sample_colleges.iterrows():
    print(f"College: {row['name']}")
    print(f"  Major 1: {row.get('major_1', 'N/A')}")
    print(f"  Major 2: {row.get('major_2', 'N/A')}")
    print(f"  Major 3: {row.get('major_3', 'N/A')}")
    print(f"  Selectivity: {row.get('selectivity_tier', 'N/A')}")
    print()
