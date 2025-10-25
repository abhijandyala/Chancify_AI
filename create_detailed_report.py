import pandas as pd
import json

# Load the cleaned data
df = pd.read_csv('backend/data/raw/cleaned_colleges.csv')

# Load the validator to see what was estimated
from backend.data.college_data_validator import CollegeDataValidator
validator = CollegeDataValidator()

# Create a detailed report
report = []
report.append('# Detailed College Data Filling Report')
report.append('')
report.append('This document shows exactly what data was estimated/filled in for each college.')
report.append('')

# Get the known correct data
known_colleges = validator.known_correct_data.keys()

report.append('## Colleges with REAL Data (Verified)')
report.append('')
report.append('| College Name | Acceptance Rate | Selectivity Tier | City | State |')
report.append('|--------------|-----------------|------------------|------|-------|')

for college_name in known_colleges:
    college_row = df[df['name'] == college_name]
    if len(college_row) > 0:
        row = college_row.iloc[0]
        report.append(f"| {college_name} | {row['acceptance_rate']:.1%} | {row['selectivity_tier']} | {row['city']} | {row['state']} |")

report.append('')
report.append('## Colleges with ESTIMATED Data (Filled In)')
report.append('')

# Group by selectivity tier for better organization
tiers = ['Elite', 'Highly Selective', 'Moderately Selective', 'Less Selective']

for tier in tiers:
    tier_colleges = df[df['selectivity_tier'] == tier]
    if len(tier_colleges) > 0:
        report.append(f'### {tier} Colleges')
        report.append('')
        report.append('| College Name | Estimated Acceptance Rate | City | State | Tuition (In-State) | Tuition (Out-of-State) |')
        report.append('|--------------|---------------------------|------|-------|-------------------|------------------------|')
        
        for idx, row in tier_colleges.iterrows():
            if row['name'] not in known_colleges:  # Only show estimated ones
                tuition_in = f"${row['tuition_in_state_usd']:,.0f}" if pd.notna(row['tuition_in_state_usd']) else "Unknown"
                tuition_out = f"${row['tuition_out_of_state_usd']:,.0f}" if pd.notna(row['tuition_out_of_state_usd']) else "Unknown"
                report.append(f"| {row['name']} | {row['acceptance_rate']:.1%} | {row['city']} | {row['state']} | {tuition_in} | {tuition_out} |")
        
        report.append('')

report.append('## Data Estimation Methodology')
report.append('')
report.append('### Acceptance Rate Estimates:')
report.append('- **Elite (8%)**: Applied to all colleges classified as "Elite"')
report.append('- **Highly Selective (20%)**: Applied to all colleges classified as "Highly Selective"')
report.append('- **Moderately Selective (50%)**: Applied to all colleges classified as "Moderately Selective"')
report.append('- **Less Selective (80%)**: Applied to all colleges classified as "Less Selective"')
report.append('')

report.append('### Selectivity Tier Classification:')
report.append('- Based on existing data in the dataset')
report.append('- May not reflect actual current selectivity')
report.append('- Some classifications may be outdated or incorrect')
report.append('')

report.append('### Location Data:')
report.append('- Some colleges show "Unknown" for city/state')
report.append('- Location data may be incomplete')
report.append('')

report.append('### Tuition Data:')
report.append('- May be outdated (not current year)')
report.append('- Some colleges show "Unknown" tuition')
report.append('- In-state vs out-of-state rates may not be accurate')
report.append('')

report.append('## Summary Statistics')
report.append('')

# Count by tier
for tier in tiers:
    count = len(df[df['selectivity_tier'] == tier])
    report.append(f'- **{tier}**: {count} colleges')

report.append('')
report.append(f'- **Total Colleges**: {len(df)}')
report.append(f'- **Colleges with Real Data**: {len(known_colleges)}')
report.append(f'- **Colleges with Estimated Data**: {len(df) - len(known_colleges)}')
report.append('')

report.append('## Warning')
report.append('')
report.append('⚠️ **IMPORTANT**: Most of the data in this system is estimated, not real.')
report.append('The acceptance rates, selectivity classifications, and other characteristics')
report.append('are based on assumptions and may not reflect actual current data.')
report.append('')

# Write the detailed report
with open('DETAILED_COLLEGE_DATA_REPORT.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(report))

print(f'Detailed report created with {len(df)} total colleges')
print(f'Real data: {len(known_colleges)} colleges')
print(f'Estimated data: {len(df) - len(known_colleges)} colleges')
