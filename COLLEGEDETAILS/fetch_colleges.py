#!/usr/bin/env python3
"""
Fetch ~1,000 U.S. colleges with tuition, selectivity, acceptance chance,
and the number of students accepted per year from the College Scorecard API.

Requirements:
- Python 3.9+
- requests

Setup:
1) Get a free API key from https://api.data.gov/signup/
2) Set an environment variable before running:
   Linux/macOS: export COLLEGE_SCORECARD_API_KEY="YOUR_KEY"
   Windows (cmd): set COLLEGE_SCORECARD_API_KEY=YOUR_KEY
   Windows (PowerShell): $env:COLLEGE_SCORECARD_API_KEY="YOUR_KEY"

Run:
   pip install requests
   python fetch_colleges.py

Output:
   colleges_1000.csv (in the current folder)
"""
import csv
import os
import sys
import time
from typing import List, Dict, Any

import requests

API_URL = "https://api.data.gov/ed/collegescorecard/v1/schools"
API_KEY = os.getenv("COLLEGE_SCORECARD_API_KEY", "").strip()
# Fields to fetch; see API docs for more.
FIELDS = [
    "id",
    "school.name",
    "school.city",
    "school.state",
    "latest.admissions.admission_rate.overall",
    "latest.admissions.applicants_total",
    "latest.admissions.admissions_total",
    "latest.student.size",
    "latest.cost.tuition.in_state",
    "latest.cost.tuition.out_of_state",
    "latest.cost.avg_net_price.overall",
    "school.ownership",
    "school.main_campus",
    "school.region_id",
]

PER_PAGE = 100  # max per page
TARGET = 1000   # aim for ~1,000 rows
OUTPUT_CSV = "colleges_1000.csv"


def selectivity_label(rate: float) -> str:
    """Map admission rate (0..1) to a human label."""
    if rate is None:
        return "Unknown"
    try:
        pct = rate * 100
    except Exception:
        return "Unknown"
    if pct < 10:
        return "Extremely selective"
    if pct < 25:
        return "Very selective"
    if pct < 50:
        return "Selective"
    if pct < 75:
        return "Somewhat selective"
    return "Less selective"


def fmt_money(n):
    return None if n in (None, "", "null") else int(round(float(n)))


def fetch_page(page: int) -> Dict[str, Any]:
    if not API_KEY:
        print("ERROR: Please set COLLEGE_SCORECARD_API_KEY environment variable.", file=sys.stderr)
        sys.exit(1)
    params = {
        "api_key": API_KEY,
        "per_page": PER_PAGE,
        "page": page,
        "fields": ",".join(FIELDS),
        # Filter to main campus, degree-granting, active schools for usefulness
        "school.main_campus": "1",
        "latest.student.size__range": "100..",  # avoid tiny schools
    }
    resp = requests.get(API_URL, params=params, timeout=30)
    resp.raise_for_status()
    return resp.json()


def normalize_row(item: Dict[str, Any]) -> Dict[str, Any]:
    # Extract values with defaults
    get = item.get
    name = get("school.name")
    city = get("school.city")
    state = get("school.state")
    rate = get("latest.admissions.admission_rate.overall")
    admissions_total = get("latest.admissions.admissions_total")
    applicants_total = get("latest.admissions.applicants_total")
    tuition_in = get("latest.cost.tuition.in_state")
    tuition_out = get("latest.cost.tuition.out_of_state")
    net_price = get("latest.cost.avg_net_price.overall")

    # Convert
    rate = float(rate) if rate not in (None, "", "null") else None
    acceptance_pct = round(rate * 100, 2) if rate is not None else None
    label = selectivity_label(rate)

    admissions_total = int(admissions_total) if admissions_total not in (None, "", "null") else None
    applicants_total = int(applicants_total) if applicants_total not in (None, "", "null") else None

    tuition_in = fmt_money(tuition_in)
    tuition_out = fmt_money(tuition_out)
    net_price = fmt_money(net_price)

    return {
        "name": name,
        "city": city,
        "state": state,
        "tuition_in_state_usd": tuition_in,
        "tuition_out_of_state_usd": tuition_out,
        "avg_net_price_usd": net_price,
        "selectivity_label": label,
        "acceptance_rate_percent": acceptance_pct,
        "accepted_per_year": admissions_total,    # admissions_total
        "applicants_total": applicants_total,
        "student_body_size": item.get("latest.student.size"),
    }


def main():
    rows: List[Dict[str, Any]] = []
    page = 0
    print("Fetching colleges from College Scorecard API...")
    while len(rows) < TARGET:
        data = fetch_page(page)
        results = data.get("results", [])
        if not results:
            break
        for item in results:
            rows.append(normalize_row(item))
            if len(rows) >= TARGET:
                break
        page += 1
        time.sleep(0.2)  # be polite

    # Write CSV
    fieldnames = [
        "name",
        "city",
        "state",
        "tuition_in_state_usd",
        "tuition_out_of_state_usd",
        "avg_net_price_usd",
        "selectivity_label",
        "acceptance_rate_percent",
        "accepted_per_year",
        "applicants_total",
        "student_body_size",
    ]
    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(rows)

    print(f"Saved {len(rows)} colleges to {OUTPUT_CSV}")


if __name__ == "__main__":
    main()
