import pandas as pd
import json

# Load the cleaned data
df = pd.read_csv('backend/data/raw/cleaned_colleges.csv')

# Load the validator to see what was estimated
from backend.data.college_data_validator import CollegeDataValidator
validator = CollegeDataValidator()

# Create a comprehensive report
report = []
report.append('# College Data Filling Report')
report.append('')
report.append('This document shows every college where data was estimated/filled in rather than using real data.')
report.append('')
report.append('## Summary')
report.append(f'- **Total Colleges**: {len(df)}')
report.append(f'- **Colleges with estimated data**: {len(df)} (all colleges had some estimated data)')
report.append('')

# Categorize by what was estimated
estimated_acceptance = []
estimated_selectivity = []
estimated_locations = []
name_fixes = []

for idx, row in df.iterrows():
    college_name = row['name']
    
    # Check if acceptance rate was estimated (not in known correct data)
    if college_name not in validator.known_correct_data:
        estimated_acceptance.append({
            'name': college_name,
            'estimated_rate': f"{row['acceptance_rate']:.1%}",
            'selectivity_tier': row['selectivity_tier'],
            'city': row['city'] if pd.notna(row['city']) else 'Unknown',
            'state': row['state'] if pd.notna(row['state']) else 'Unknown'
        })

report.append('## Colleges with Estimated Acceptance Rates')
report.append('')
report.append('| College Name | Estimated Acceptance Rate | Selectivity Tier | City | State |')
report.append('|--------------|---------------------------|------------------|------|-------|')

for college in estimated_acceptance:
    report.append(f"| {college['name']} | {college['estimated_rate']} | {college['selectivity_tier']} | {college['city']} | {college['state']} |")

report.append('')
report.append('## Data Quality Issues')
report.append('')
report.append('### 1. Acceptance Rate Estimates')
report.append('- **Elite schools**: Estimated at 8% (should be 3-10%)')
report.append('- **Highly Selective**: Estimated at 20% (should be 10-25%)')
report.append('- **Moderately Selective**: Estimated at 50% (should be 25-60%)')
report.append('- **Less Selective**: Estimated at 80% (should be 60%+)')
report.append('')

report.append('### 2. Selectivity Tier Issues')
report.append('- Many colleges may be misclassified')
report.append('- Some "Elite" schools might not actually be elite')
report.append('- Some "Less Selective" schools might be more selective')
report.append('')

report.append('### 3. Location Data Issues')
report.append('- Some colleges show "Unknown" for city/state')
report.append('- Location data may be incomplete or incorrect')
report.append('')

report.append('## Recommendations')
report.append('')
report.append('1. **Get real acceptance rate data** from IPEDS or College Board')
report.append('2. **Verify selectivity classifications** against actual acceptance rates')
report.append('3. **Complete location data** for all colleges')
report.append('4. **Validate tuition costs** against current year data')
report.append('5. **Verify major strength scores** against actual program rankings')
report.append('')

# Write the report
with open('COLLEGE_DATA_FILLING_REPORT.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(report))

print(f'Report created with {len(estimated_acceptance)} colleges with estimated data')
