# Fetch ~1,000 Colleges (Tuition, Selectivity, Acceptance, Accepted per Year)

This script uses the **U.S. Department of Education College Scorecard API** to download about 1,000 colleges and save them as a CSV.

## Steps

1) Get a free API key from https://api.data.gov/signup/  
   This gives you a `data.gov` key that works with the College Scorecard API.

2) Set your key in your shell:
   - macOS/Linux:
     ```bash
     export COLLEGE_SCORECARD_API_KEY="YOUR_KEY"
     ```
   - Windows (cmd):
     ```bat
     set COLLEGE_SCORECARD_API_KEY=YOUR_KEY
     ```
   - Windows (PowerShell):
     ```powershell
     $env:COLLEGE_SCORECARD_API_KEY="YOUR_KEY"
     ```

3) Install Python deps and run:
   ```bash
   pip install requests
   python fetch_colleges.py
   ```

4) Output file:
   - `colleges_1000.csv` will be created in the same folder.

## Columns
- name
- city
- state
- tuition_in_state_usd
- tuition_out_of_state_usd
- avg_net_price_usd
- selectivity_label (derived from admission rate)
- acceptance_rate_percent
- accepted_per_year (admissions_total)
- applicants_total
- student_body_size

You can change the TARGET count, filters, or fields inside `fetch_colleges.py` if you need more/less data or different columns.
