# Game Plan Generation Methodology

## Overview

After calculating admission probabilities, Chancify AI generates a **personalized game plan** to help students maximize their chances of admission. The game plan is data-driven, actionable, and tailored to each student's unique profile and goals.

---

## Game Plan Components

### 1. College List Strategy
**Goal**: Build a balanced list of reach, target, and safety schools

#### Classification System
```
School Classification based on probability:

Reach (Dream):     0% - 25% probability
Target (Match):    25% - 60% probability  
Safety (Likely):   60% - 95+ % probability
```

#### Recommended Distribution
```
Total colleges: 10-15 schools

Suggested mix:
- 3-5 Reach schools (30-40%)
- 4-6 Target schools (40-50%)
- 2-4 Safety schools (20-30%)

Example balanced list (12 schools):
- 4 Reach
- 5 Target
- 3 Safety
```

#### List Optimization Factors
```python
def optimize_college_list(student_profile, preferences):
    recommendations = []
    
    # Factor in student preferences
    preferred_majors = preferences.intended_majors
    location_preferences = preferences.regions
    size_preferences = preferences.school_size
    budget_constraints = preferences.max_cost
    
    # Find schools matching preferences at each tier
    for tier in ['safety', 'target', 'reach']:
        matching_schools = filter_schools(
            probability_tier=tier,
            majors=preferred_majors,
            locations=location_preferences,
            size=size_preferences,
            cost=budget_constraints
        )
        
        # Rank by fit score
        ranked = rank_by_fit(matching_schools, student_profile)
        recommendations.extend(ranked[:tier_quota])
    
    return recommendations
```

---

### 2. Application Timeline Strategy

#### Early Decision (ED) Recommendation
```
Recommend ED if:
✓ Clear first choice school exists
✓ Financial aid concerns addressed
✓ Probability boost is significant (ED vs RD)
✓ Student's profile is competitive for the school

ED Probability Boost Analysis:
School X: RD = 8%, ED = 18% → 2.25x boost → RECOMMEND ED
School Y: RD = 45%, ED = 48% → 1.07x boost → ED optional
```

#### Early Action (EA) Recommendation
```
Recommend EA for:
- Schools with non-binding early options
- Demonstrate interest at target/reach schools
- Reduce RD application load
- Increase overall admission chances

Typical EA boost: 1.2x - 1.5x acceptance rate
```

#### Timeline Template
```
SUMMER BEFORE SENIOR YEAR (June-August):
□ Finalize college list (reach/target/safety mix)
□ Visit top-choice campuses (virtual or in-person)
□ Draft Common App essay (3-5 drafts minimum)
□ Request recommendation letters
□ Prepare activity descriptions

EARLY FALL (September-October):
□ Submit Early Decision application (if applicable)
□ Submit Early Action applications (Oct 15 - Nov 1)
□ Complete supplemental essays for early schools
□ Take final SAT/ACT if needed (October)

LATE FALL (November-December):
□ Work on Regular Decision applications
□ Write supplemental essays (2-4 drafts each)
□ Submit RD applications (Jan 1 - Jan 15 deadlines)
□ Update schools with fall semester achievements

WINTER/SPRING (January-April):
□ Submit FAFSA/CSS Profile
□ Send mid-year grade reports
□ Prepare for interviews (if offered)
□ Compare financial aid offers
□ Make final decision by May 1
```

---

### 3. Academic Improvement Plan

#### GPA Enhancement (if applicable)
```
Current GPA: 3.6 (Weighted: 4.1)
Target GPA:  3.7 (Weighted: 4.3)
Time frame:  Senior Fall

Action Items:
✓ Focus on core academic classes
✓ Seek extra help in challenging subjects
✓ Aim for A/A- in all senior fall courses
✓ Potential impact: +5% probability at target schools
```

#### Course Selection Recommendations
```python
def recommend_senior_courses(student_profile, target_colleges):
    recommendations = []
    
    # Analyze rigor relative to school offerings
    current_rigor_score = calculate_rigor(student_profile.courses_taken)
    available_rigorous_courses = student_profile.school.ap_ib_courses
    
    # Identify gaps in core subjects
    if not taken_senior_level_math(student_profile):
        recommendations.append({
            "course": "AP Calculus AB/BC or equivalent",
            "priority": "HIGH",
            "reason": "Top colleges expect 4 years of math"
        })
    
    if stem_major(student_profile.intended_major):
        if not taken_advanced_science(student_profile):
            recommendations.append({
                "course": "AP Physics/Chemistry/Biology",
                "priority": "HIGH",
                "reason": "Critical for STEM major credibility"
            })
    
    # Balance rigor with GPA maintenance
    if current_rigor_score < 0.7:  # Taking <70% of available advanced courses
        recommendations.append({
            "course": "Add 1-2 more AP/IB courses",
            "priority": "MEDIUM",
            "reason": "Increase rigor to match competitive applicants",
            "warning": "Balance with maintaining strong grades"
        })
    
    return recommendations
```

---

### 4. Testing Strategy

#### Retake Recommendations
```python
def should_retake_test(student_score, target_colleges):
    for college in target_colleges:
        if college.test_policy == "Test Blind":
            continue
        
        percentile = calculate_percentile(student_score, college.admitted_students)
        
        if percentile < 25:  # Below 25th percentile
            return {
                "recommendation": "STRONG RETAKE",
                "reason": f"Score below 25th percentile ({college.sat_25th})",
                "target_score": college.sat_50th,
                "potential_impact": "+10-15% probability"
            }
        elif percentile < 40:  # Below 40th percentile
            return {
                "recommendation": "CONSIDER RETAKE",
                "reason": "Score could be more competitive",
                "target_score": college.sat_50th,
                "potential_impact": "+5-8% probability"
            }
        elif percentile > 75:  # Above 75th percentile
            return {
                "recommendation": "NO RETAKE NEEDED",
                "reason": "Score is highly competitive",
                "potential_impact": "Minimal (focus elsewhere)"
            }
    
    return {"recommendation": "SCORES ADEQUATE", "potential_impact": "Minimal"}
```

#### Test-Optional Decision
```
Decision Framework:

Submit scores if:
✓ At or above 50th percentile for the school
✓ Score is consistent with strong academic record
✓ School is not test-blind

Consider withholding if:
⚠ Below 25th percentile for the school
⚠ Large GPA/test score discrepancy
⚠ Other factors (EC, essays) are much stronger

Test-optional strategy:
"Your 1420 SAT is above the 50th percentile (1390) for Target University.
RECOMMENDATION: Submit scores to strengthen application."
```

---

### 5. Extracurricular Enhancement Plan

#### EC Depth Analysis
```python
def analyze_ec_profile(student_ecs):
    # Calculate depth vs breadth
    focused_activities = [ec for ec in student_ecs if ec.years >= 3]
    leadership_roles = [ec for ec in student_ecs if ec.leadership_positions]
    
    depth_score = (len(focused_activities) / len(student_ecs)) * 100
    leadership_score = (len(leadership_roles) / len(student_ecs)) * 100
    
    if depth_score < 30:
        return {
            "issue": "Too scattered - lack of depth",
            "recommendation": "Focus on 2-3 activities for senior year",
            "action": "Show sustained commitment and growing responsibility",
            "impact": "Depth > Breadth for selective colleges"
        }
    
    if leadership_score < 20:
        return {
            "issue": "Limited leadership demonstration",
            "recommendation": "Seek leadership opportunities in current activities",
            "action": "Start initiative, mentor others, lead project",
            "impact": "Leadership crucial for demonstrating impact"
        }
    
    return {"status": "Strong EC profile", "action": "Continue current trajectory"}
```

#### Summer Plan Recommendations
```
SOPHOMORE SUMMER:
Option 1: Academic enrichment program in intended field
Option 2: Community service project with measurable impact
Option 3: Part-time job (demonstrates responsibility)

JUNIOR SUMMER (Most Important):
HIGHLY RECOMMENDED:
- Selective summer programs (RSI, TASP, SSP, etc.)
- Research internship (if STEM-focused)
- Significant community project leadership
- Deep skill development in area of passion

Example for Computer Science applicant:
✓ Apply to competitive CS programs (Google CSSI, MIT Launch, etc.)
✓ Build substantial coding project with real-world impact
✓ Teach coding to younger students
✓ Contribute to open-source projects

Impact: Strong summer activities = +8-12% probability
```

---

### 6. Essay Strategy

#### Essay Approach Recommendations
```
Common App Essay Analysis:

Current essay assessment:
- Authenticity: 7/10
- Impact: 6/10
- Writing quality: 8/10

Recommendations:
1. SHOW, DON'T TELL
   Current: "I learned the value of hard work"
   Better: Specific story that demonstrates hard work

2. GO DEEPER
   Surface level: What you did
   Deep level: How it changed your perspective/values

3. BE SPECIFIC
   Generic: "I love science"
   Specific: "The moment I saw crystalline structures form in my borax 
             solution, I understood that chemistry was visible poetry"

Rewrite Priority: HIGH
Potential Impact: +5-8% probability
```

#### Supplemental Essay Strategy
```python
def prioritize_supplemental_essays(college_list):
    # Allocate time based on school probability and fit
    
    for college in college_list:
        if college.probability < 0.15:  # Very high reach
            effort = "MAXIMUM"
            reason = "Need essays to overcome probability deficit"
        elif college.probability > 0.70:  # Safety
            effort = "MODERATE"
            reason = "Show genuine interest but essays less critical"
        else:  # Target schools
            effort = "HIGH"
            reason = "Essays can be deciding factor"
        
        college.essay_effort = effort
        
        # Specific tips per school
        if "Why us?" in college.supplement_prompts:
            college.essay_tips.append(
                "Research specific programs, professors, opportunities. "
                "Be specific, not generic."
            )
```

---

### 7. Demonstrated Interest Plan

#### Interest Tracking
```
Demonstrated Interest Scorecard:

For colleges that track interest:

□ Campus visit (in-person or virtual)          [+3 points]
□ Attend local info session                    [+2 points]
□ Interview (if offered)                       [+2 points]
□ Email admissions officer with question       [+1 point]
□ Engage with social media/webinars            [+1 point]
□ High-quality "Why us?" essay                 [+3 points]
□ Apply Early Decision/Early Action            [+2 points]

Target: 6-8 points per college that tracks interest

Schools that DON'T track interest (save your time):
- Most Ivy League schools
- Stanford, MIT, Caltech
- UCs (University of California system)
```

---

### 8. Financial Planning Strategy

#### Cost vs Probability Analysis
```
School              | Probability | Net Cost  | 4-Year ROI
--------------------|-------------|-----------|------------
Reach State U       |    15%      | $25K/yr   | High
Target Private      |    45%      | $40K/yr   | Medium-High
Safety State        |    85%      | $20K/yr   | Medium
Target State        |    50%      | $22K/yr   | High

Recommendation:
- Apply to mix across cost spectrum
- Don't assume private = unaffordable (financial aid!)
- Use net price calculators for each school
- Consider merit scholarship opportunities
```

---

### 9. Monthly Milestones

#### Junior Year Spring/Summer
```
MAY:
□ Take AP exams
□ Start Common App essay brainstorming
□ Finalize preliminary college list (20-25 schools)
□ Plan summer activities

JUNE:
□ Request recommendation letters (give 2-3 months notice)
□ Visit colleges or attend virtual sessions
□ Work on Common App essay (draft 1)
□ Register for August/October SAT/ACT if retaking

JULY:
□ Research colleges deeply (programs, culture, opportunities)
□ Continue essay drafting (2-3 revisions)
□ Prepare activity descriptions for Common App
□ Engage in meaningful summer activities

AUGUST:
□ Finalize Common App personal information
□ Complete activity descriptions (max 150 characters)
□ Narrow college list to 10-15 schools
□ Begin supplemental essay research
```

#### Senior Year Fall
```
SEPTEMBER:
□ Get teacher recommendation requests submitted
□ Finalize Common App essay (have 3+ people review)
□ Start supplemental essays for early schools
□ Take SAT/ACT final attempt if needed

OCTOBER:
□ Submit Early Decision/Early Action apps (review 3x before submit!)
□ Request transcripts sent to schools
□ Send SAT/ACT scores
□ Continue working on RD supplemental essays

NOVEMBER:
□ Complete all Regular Decision essays
□ Update Common App with any new achievements
□ Prep for interviews (practice common questions)
□ Thanksgiving: Relax, you've earned it!

DECEMBER:
□ Submit Regular Decision applications (aim for Dec 15-20)
□ Send mid-year grades when available
□ Receive Early Decision/Action results (mid-Dec)
□ Adjust RD list if needed based on early results
```

---

### 10. Personalized Recommendations

#### Priority Actions (Student-Specific)
```python
def generate_priority_actions(student_profile, probability_analysis):
    actions = []
    
    # Identify biggest gaps
    factor_scores = probability_analysis.factor_breakdown
    sorted_factors = sorted(factor_scores.items(), key=lambda x: x[1])
    
    weakest_factors = sorted_factors[:3]
    
    for factor_id, score in weakest_factors:
        if score < 60:  # Below competitive threshold
            actions.append(generate_action_plan(factor_id, score, student_profile))
    
    # Prioritize high-impact actions
    actions.sort(key=lambda x: x.potential_impact, reverse=True)
    
    return actions[:5]  # Top 5 priority actions

Example Output:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR TOP 5 PRIORITY ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. 🎯 STRENGTHEN ESSAYS (Current: 65/100)
   Action: Rewrite Common App essay with specific story
   Timeline: Next 2-3 weeks
   Resources: Essay coach, English teacher review
   Impact: +8-10% probability

2. 📚 INCREASE CURRICULUM RIGOR (Current: 68/100)
   Action: Add AP Calculus BC for senior year
   Timeline: Register before schedule deadline
   Impact: +5-7% probability

3. 🏆 DEMONSTRATE LEADERSHIP (Current: 62/100)
   Action: Start tutoring program or lead club initiative
   Timeline: Begin this semester, show on mid-year update
   Impact: +4-6% probability

4. 📝 RETAKE SAT (Current: 1380 → Target: 1450+)
   Action: Study prep, focus on math section
   Timeline: Take October test date
   Impact: +6-8% probability

5. 💼 PURSUE SUMMER RESEARCH (Gap in profile)
   Action: Apply to 5-8 summer research programs
   Timeline: Applications due Jan-Mar
   Impact: +7-10% probability (if accepted)
```

---

## Output Format: Personalized Game Plan

### Example Report Structure
```markdown
# Your Personalized College Admissions Game Plan

## Executive Summary
Based on your profile, you have a strong foundation with a 3.8 GPA and 
competitive test scores. Your main opportunities for improvement are 
demonstrating deeper extracurricular leadership and crafting more 
compelling essays. Here's your roadmap.

## College List Strategy
[Detailed recommendations for reach/target/safety mix]

## Timeline & Deadlines
[Month-by-month action items]

## Priority Improvements
[Top 5 actions with impact analysis]

## Application Strategy
[ED vs EA vs RD recommendations]

## Probability Projections
School                Current   After Plan   Improvement
───────────────────────────────────────────────────────
Dream University      12%       18%          +6%
Target College        35%       48%          +13%
Safety State U        78%       85%          +7%

## Resources & Support
[Links to essay guides, test prep, summer programs, etc.]

## Monthly Check-In Goals
[Specific milestones to track progress]
```

---

## Continuous Optimization

### Profile Updates
```
As student completes actions:
1. Update profile with new achievements
2. Recalculate probabilities
3. Adjust game plan recommendations
4. Celebrate progress!
```

### Real-Time Adjustments
```
Monitor:
- Changing acceptance rates (year-over-year)
- New awards/achievements
- Grade trends
- Test score improvements
- Application cycle developments

Adjust recommendations accordingly
```

---

## Success Metrics

Track game plan effectiveness:
- Actual vs predicted admission outcomes
- Student action completion rate
- Probability improvement over time
- User satisfaction with recommendations
- Admission rate improvement vs baseline

---

**Version**: 1.0  
**Last Updated**: 2025-10-12  
**Author**: Chancify AI Development Team

