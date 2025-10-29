import pandas as pd
import os
import logging
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass

logger = logging.getLogger(__name__)

@dataclass
class ImprovementArea:
    area: str
    current: str
    target: str
    impact: int
    priority: str  # 'high', 'medium', 'low'
    description: str
    actionable_steps: List[str]

class ImprovementAnalysisService:
    def __init__(self):
        self.elite_colleges_data = {}
        self.admission_factors = {}
        self.load_data()
    
    def load_data(self):
        """Load all necessary data for improvement analysis"""
        try:
            # Load elite colleges data
            elite_path = os.path.join(os.path.dirname(__file__), 'models', 'elite_colleges_data.json')
            logger.info(f"Looking for elite colleges data at: {elite_path}")
            logger.info(f"Current working directory: {os.getcwd()}")
            logger.info(f"File exists: {os.path.exists(elite_path)}")
            
            if os.path.exists(elite_path):
                import json
                with open(elite_path, 'r') as f:
                    self.elite_colleges_data = json.load(f)
                logger.info(f"Loaded elite colleges data: {len(self.elite_colleges_data)} colleges")
            else:
                logger.error(f"Elite colleges data file not found at: {elite_path}")
                # Try alternative path
                alt_path = os.path.join(os.getcwd(), 'backend', 'data', 'models', 'elite_colleges_data.json')
                logger.info(f"Trying alternative path: {alt_path}")
                if os.path.exists(alt_path):
                    with open(alt_path, 'r') as f:
                        self.elite_colleges_data = json.load(f)
                    logger.info(f"Loaded elite colleges data from alternative path: {len(self.elite_colleges_data)} colleges")
                else:
                    logger.error(f"Alternative path also not found: {alt_path}")
                    # Try absolute path
                    abs_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'models', 'elite_colleges_data.json'))
                    logger.info(f"Trying absolute path: {abs_path}")
                    if os.path.exists(abs_path):
                        with open(abs_path, 'r') as f:
                            self.elite_colleges_data = json.load(f)
                        logger.info(f"Loaded elite colleges data from absolute path: {len(self.elite_colleges_data)} colleges")
                    else:
                        logger.error(f"Absolute path also not found: {abs_path}")
            
            # Load admission factors
            factors_path = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'factors', 'admissions_factors.json')
            if os.path.exists(factors_path):
                import json
                with open(factors_path, 'r') as f:
                    factors_data = json.load(f)
                    self.admission_factors = {factor['id']: factor for factor in factors_data['factors']}
                logger.info(f"Loaded admission factors: {len(self.admission_factors)} factors")
            
        except Exception as e:
            logger.error(f"Error loading improvement analysis data: {e}")
    
    def analyze_user_profile(self, user_profile: Dict[str, Any], college_name: str) -> List[ImprovementArea]:
        """
        Analyze user profile against college requirements and return improvement areas
        """
        try:
            # Try exact match first
            college_data = self.elite_colleges_data.get(college_name, {})
            logger.info(f"Direct match for '{college_name}': {len(college_data)} fields")
            
            # If not found, try common variations
            if not college_data:
                # Try without "University" suffix
                if "University" in college_name:
                    short_name = college_name.replace(" University", "")
                    college_data = self.elite_colleges_data.get(short_name, {})
                    logger.info(f"After removing 'University' ('{short_name}'): {len(college_data)} fields")
                
                # Try without "College" suffix
                if not college_data and "College" in college_name:
                    short_name = college_name.replace(" College", "")
                    college_data = self.elite_colleges_data.get(short_name, {})
                    logger.info(f"After removing 'College' ('{short_name}'): {len(college_data)} fields")
                
                # Try common abbreviations
                if not college_data:
                    name_variations = {
                        "Massachusetts Institute of Technology": "MIT",
                        "Carnegie Mellon University": "Carnegie Mellon",
                        "University of Pennsylvania": "Penn",
                        "New York University": "NYU",
                        "University of California-Berkeley": "UC Berkeley",
                        "University of California-Los Angeles": "UCLA"
                    }
                    for full_name, short_name in name_variations.items():
                        if college_name == full_name:
                            college_data = self.elite_colleges_data.get(short_name, {})
                            logger.info(f"Variation match ('{full_name}' -> '{short_name}'): {len(college_data)} fields")
                            break
            
            if not college_data:
                logger.warning(f"No data found for college: {college_name}")
                logger.warning(f"Available colleges: {list(self.elite_colleges_data.keys())[:10]}...")
                return self._get_default_improvements()
            
            logger.info(f"Using college data with {len(college_data)} fields for analysis")
            
            improvements = []
            
            # TEMPORARY: Add a test improvement to verify logic
            improvements.append(ImprovementArea(
                area="TEST - Analysis Working",
                current="Test data received",
                target="This proves analysis is running",
                impact=1,
                priority="low",
                description="If you see this, the analysis logic is working",
                actionable_steps=["This is a test"]
            ))
            
            # 1. Academic Performance Analysis
            try:
                improvements.extend(self._analyze_academic_performance(user_profile, college_data))
            except Exception as e:
                logger.error(f"Error in academic performance analysis: {e}")
            
            # 2. Standardized Testing Analysis
            try:
                improvements.extend(self._analyze_standardized_testing(user_profile, college_data))
            except Exception as e:
                logger.error(f"Error in standardized testing analysis: {e}")
            
            # 3. Extracurricular Activities Analysis
            try:
                improvements.extend(self._analyze_extracurriculars(user_profile, college_data))
            except Exception as e:
                logger.error(f"Error in extracurricular analysis: {e}")
            
            # 4. Leadership & Awards Analysis
            try:
                improvements.extend(self._analyze_leadership_awards(user_profile, college_data))
            except Exception as e:
                logger.error(f"Error in leadership analysis: {e}")
            
            # 5. Academic Rigor Analysis
            try:
                improvements.extend(self._analyze_academic_rigor(user_profile, college_data))
            except Exception as e:
                logger.error(f"Error in academic rigor analysis: {e}")
            
            # 6. Research & Innovation Analysis
            try:
                improvements.extend(self._analyze_research_innovation(user_profile, college_data))
            except Exception as e:
                logger.error(f"Error in research analysis: {e}")
            
            # 7. Essays & Recommendations Analysis
            try:
                improvements.extend(self._analyze_essays_recommendations(user_profile, college_data))
            except Exception as e:
                logger.error(f"Error in essays analysis: {e}")
            
            # 8. NEW: Major-Specific Analysis
            try:
                improvements.extend(self._analyze_major_specific(user_profile, college_data))
            except Exception as e:
                logger.error(f"Error in major analysis: {e}")
            
            # 9. NEW: Geographic & Diversity Analysis
            try:
                improvements.extend(self._analyze_geographic_diversity(user_profile, college_data))
            except Exception as e:
                logger.error(f"Error in geographic analysis: {e}")
            
            # 10. NEW: Interview & Demonstrated Interest Analysis
            try:
                improvements.extend(self._analyze_interview_interest(user_profile, college_data))
            except Exception as e:
                logger.error(f"Error in interview analysis: {e}")
            
            # 11. NEW: Portfolio & Creative Analysis
            try:
                improvements.extend(self._analyze_portfolio_creative(user_profile, college_data))
            except Exception as e:
                logger.error(f"Error in portfolio analysis: {e}")
            
            # 12. NEW: Volunteer & Community Service Analysis
            try:
                improvements.extend(self._analyze_volunteer_service(user_profile, college_data))
            except Exception as e:
                logger.error(f"Error in volunteer analysis: {e}")
            
            # Log the number of improvements generated
            logger.info(f"Total improvements generated: {len(improvements)}")
            
            # Sort by priority and impact
            improvements.sort(key=lambda x: (x.priority == 'high', x.impact), reverse=True)
            
            # Return improvements (analysis methods should ALWAYS return at least maintenance advice)
            if len(improvements) == 0:
                logger.error("NO improvements generated - this should never happen!")
                return self._get_default_improvements()
            
            return improvements[:20]  # Return up to 20 improvements for comprehensive analysis
            
        except Exception as e:
            logger.error(f"Error analyzing user profile: {e}")
            return self._get_default_improvements()
    
    def _analyze_academic_performance(self, profile: Dict[str, Any], college_data: Dict[str, Any]) -> List[ImprovementArea]:
        """Analyze GPA and academic performance with enhanced calculations"""
        improvements = []
        
        # Get user GPA with multiple scales - handle string values
        user_gpa_unweighted = profile.get('gpa_unweighted', 0)
        user_gpa_weighted = profile.get('gpa_weighted', 0)
        
        # Convert string values to numbers if needed
        try:
            user_gpa_unweighted = float(user_gpa_unweighted) if user_gpa_unweighted else 0
            user_gpa_weighted = float(user_gpa_weighted) if user_gpa_weighted else 0
        except (ValueError, TypeError):
            user_gpa_unweighted = 0
            user_gpa_weighted = 0
            
        college_avg_gpa = college_data.get('gpa_unweighted_avg', 3.9)
        college_weighted_gpa = college_data.get('gpa_avg', 4.1)
        
        # Use the more relevant GPA based on what's available
        user_gpa = user_gpa_unweighted if user_gpa_unweighted > 0 else user_gpa_weighted
        target_gpa = college_avg_gpa if user_gpa_unweighted > 0 else college_weighted_gpa
        
        # Always provide academic performance guidance, even if GPA is good
        if user_gpa < target_gpa - 0.1:
            gap = target_gpa - user_gpa
            target_gpa_final = min(target_gpa + 0.05, 4.0 if user_gpa_unweighted > 0 else 5.0)
            
            # Calculate impact based on gap size and college selectivity
            acceptance_rate = college_data.get('acceptance_rate', 0.15)
            selectivity_multiplier = 1.5 if acceptance_rate < 0.1 else 1.2 if acceptance_rate < 0.2 else 1.0
            
            impact = int(gap * 15 * selectivity_multiplier)
            priority = "high" if gap > 0.2 else "medium"
        else:
            # Even if GPA is good, provide guidance for maintaining excellence
            target_gpa_final = min(target_gpa + 0.05, 4.0 if user_gpa_unweighted > 0 else 5.0)
            impact = 5  # Lower impact since already good
            priority = "low"
        
        improvements.append(ImprovementArea(
            area="Academic Performance",
            current=f"{user_gpa:.2f} GPA",
            target=f"{target_gpa_final:.2f}+ GPA",
            impact=min(impact, 15),  # Cap at 15%
            priority=priority,
            description=f"{'Your GPA is ' + str(round(target_gpa - user_gpa, 2)) + ' points below the average for admitted students at this selective school' if user_gpa < target_gpa - 0.1 else 'Maintain your strong academic performance and aim for even higher grades'}",
            actionable_steps=[
                "Focus on improving grades in core academic subjects",
                "Consider retaking courses with low grades if possible",
                "Maintain strong performance in remaining semesters",
                "Highlight upward trend if grades are improving",
                "Take challenging courses while maintaining high grades"
            ]
        ))
        
        return improvements
    
    def _analyze_standardized_testing(self, profile: Dict[str, Any], college_data: Dict[str, Any]) -> List[ImprovementArea]:
        """Analyze SAT/ACT scores with enhanced calculations"""
        improvements = []
        
        # Get user test scores - handle both field name variations
        user_sat = profile.get('sat_total', profile.get('sat', 0))
        user_act = profile.get('act_composite', profile.get('act', 0))
        
        # Convert string values to numbers if needed
        try:
            user_sat = float(user_sat) if user_sat else 0
            user_act = float(user_act) if user_act else 0
        except (ValueError, TypeError):
            user_sat = 0
            user_act = 0
        
        # Get college test score ranges
        college_sat_25th = college_data.get('sat_25th', 1400)
        college_sat_75th = college_data.get('sat_75th', 1550)
        college_act_25th = college_data.get('act_25th', 30)
        college_act_75th = college_data.get('act_75th', 35)
        
        # Always provide standardized testing guidance
        if user_sat > 0:
            if user_sat < college_sat_25th:
                gap = college_sat_25th - user_sat
                target_sat = min(college_sat_75th, user_sat + 100)
                
                # Calculate impact based on gap and college selectivity
                acceptance_rate = college_data.get('acceptance_rate', 0.15)
                selectivity_multiplier = 1.3 if acceptance_rate < 0.1 else 1.1 if acceptance_rate < 0.2 else 1.0
                
                impact = int(gap / 8 * selectivity_multiplier)  # 1% per 8 SAT points
                priority = "high" if gap > 100 else "medium"
                description = f"Your SAT score is {gap} points below the 25th percentile for admitted students"
            else:
                target_sat = min(college_sat_75th + 50, 1600)
                impact = 3  # Lower impact since already good
                priority = "low"
                description = "Your SAT score is competitive - aim for the 75th percentile to strengthen your application"
            
            improvements.append(ImprovementArea(
                area="Standardized Testing",
                current=f"{user_sat} SAT",
                target=f"{target_sat}+ SAT",
                impact=min(impact, 12),  # Cap at 12%
                priority=priority,
                description=description,
                actionable_steps=[
                    "Take practice tests to identify weak areas",
                    "Consider SAT prep course or tutoring",
                    "Focus on math and reading comprehension",
                    "Take the test multiple times for superscoring",
                    "Consider SAT Subject Tests if required"
                ]
            ))
        
        elif user_act > 0:
            if user_act < college_act_25th:
                gap = college_act_25th - user_act
                target_act = min(college_act_75th, user_act + 3)
                
                # Calculate impact based on gap and college selectivity
                acceptance_rate = college_data.get('acceptance_rate', 0.15)
                selectivity_multiplier = 1.3 if acceptance_rate < 0.1 else 1.1 if acceptance_rate < 0.2 else 1.0
                
                impact = int(gap * 2 * selectivity_multiplier)  # 2% per ACT point
                priority = "high" if gap > 3 else "medium"
                description = f"Your ACT score is {gap} points below the 25th percentile for admitted students"
            else:
                target_act = min(college_act_75th + 1, 36)
                impact = 3  # Lower impact since already good
                priority = "low"
                description = "Your ACT score is competitive - aim for the 75th percentile to strengthen your application"
            
            improvements.append(ImprovementArea(
                area="Standardized Testing",
                current=f"{user_act} ACT",
                target=f"{target_act}+ ACT",
                impact=min(impact, 12),  # Cap at 12%
                priority=priority,
                description=description,
                actionable_steps=[
                    "Take practice tests to identify weak areas",
                    "Consider ACT prep course or tutoring",
                    "Focus on weak subject areas",
                    "Take the test multiple times for superscoring",
                    "Consider ACT Writing if required"
                ]
            ))
        
        else:
            # No test scores provided - provide general guidance
            improvements.append(ImprovementArea(
                area="Standardized Testing",
                current="No test scores provided",
                target=f"{college_sat_25th}+ SAT or {college_act_25th}+ ACT",
                impact=8,  # Medium impact for missing scores
                priority="high",
                description="Standardized test scores are important for this selective college",
                actionable_steps=[
                    "Take practice tests to identify weak areas",
                    "Consider test prep course or tutoring",
                    "Focus on weak subject areas",
                    "Take the test multiple times for superscoring",
                    "Consider test writing if required"
                ]
            ))
        
        return improvements
    
    def _analyze_extracurriculars(self, profile: Dict[str, Any], college_data: Dict[str, Any]) -> List[ImprovementArea]:
        """Analyze extracurricular activities with enhanced depth analysis"""
        improvements = []
        
        # Get user extracurricular data with string-to-number conversion
        ec_depth = profile.get('extracurricular_depth', 5)
        leadership = profile.get('leadership_positions', 0)
        passion_projects = profile.get('passion_projects', 0)
        
        # Convert string values to numbers if needed
        try:
            ec_depth = float(ec_depth) if ec_depth else 5
            leadership = float(leadership) if leadership else 0
            passion_projects = float(passion_projects) if passion_projects else 0
        except (ValueError, TypeError):
            ec_depth = 5
            leadership = 0
            passion_projects = 0
        
        # Calculate current level based on multiple factors
        current_level = (ec_depth + leadership + passion_projects) / 3
        
        # Determine target based on college selectivity
        acceptance_rate = college_data.get('acceptance_rate', 0.15)
        if acceptance_rate < 0.1:  # Ultra-selective
            target_level = 8.5
        elif acceptance_rate < 0.2:  # Highly selective
            target_level = 7.5
        else:  # Selective
            target_level = 6.5
        
        # Always provide extracurricular guidance
        if current_level < target_level:
            gap = target_level - current_level
            impact = int(gap * 3)  # 3% per level gap
            priority = "high" if gap > 2 else "medium"
            description = f"Increase depth and commitment in extracurricular activities for this competitive school"
        else:
            gap = 0
            impact = 2  # Lower impact since already good
            priority = "low"
            description = f"Maintain your strong extracurricular involvement and consider taking on more leadership roles"
        
        improvements.append(ImprovementArea(
            area="Extracurricular Activities",
            current=f"{current_level:.1f}/10 overall depth",
            target=f"{target_level:.1f}/10 with leadership",
            impact=min(impact, 12),  # Cap at 12%
            priority=priority,
            description=description,
            actionable_steps=[
                "Focus on 2-3 activities you're passionate about",
                "Take on leadership roles in existing activities",
                "Show long-term commitment (2+ years)",
                "Document impact and achievements",
                "Develop unique projects or initiatives"
            ]
        ))
        
        return improvements
    
    def _analyze_leadership_awards(self, profile: Dict[str, Any], college_data: Dict[str, Any]) -> List[ImprovementArea]:
        """Analyze leadership positions and awards - ALWAYS provide guidance"""
        improvements = []
        
        leadership = profile.get('leadership_positions', 0)
        awards = profile.get('awards_publications', 0)
        
        # Convert string values to numbers if needed
        try:
            leadership = float(leadership) if leadership else 0
            awards = float(awards) if awards else 0
        except (ValueError, TypeError):
            leadership = 0
            awards = 0
        
        # Always provide leadership guidance
        if leadership < 2:
            improvements.append(ImprovementArea(
                area="Leadership Experience",
                current=f"{leadership} positions",
                target="2+ leadership roles",
                impact=8,
                priority="medium",
                description="Develop leadership experience in your areas of interest",
                actionable_steps=[
                    "Run for student government positions",
                    "Start a club or organization",
                    "Take initiative in existing activities",
                    "Mentor younger students"
                ]
            ))
        else:
            # Even if good, provide guidance for excellence
            improvements.append(ImprovementArea(
                area="Leadership Experience",
                current=f"{leadership} positions",
                target="8+ exceptional leadership",
                impact=3,
                priority="low",
                description="Maintain your strong leadership and consider taking on more responsibility",
                actionable_steps=[
                    "Take on higher-level leadership roles",
                    "Mentor others in leadership",
                    "Lead major projects or initiatives",
                    "Document your leadership impact"
                ]
            ))
        
        # Always provide awards guidance
        if awards < 3:
            improvements.append(ImprovementArea(
                area="Awards & Recognition",
                current=f"{awards} awards",
                target="3+ significant awards",
                impact=6,
                priority="low",
                description="Pursue recognition in your areas of strength",
                actionable_steps=[
                    "Enter competitions in your field of interest",
                    "Apply for scholarships and recognition programs",
                    "Pursue research or creative projects",
                    "Document all achievements and recognition"
                ]
            ))
        else:
            # Even if good, provide guidance for excellence
            improvements.append(ImprovementArea(
                area="Awards & Recognition",
                current=f"{awards} awards",
                target="7+ exceptional recognition",
                impact=2,
                priority="low",
                description="Maintain your strong recognition and pursue higher-level awards",
                actionable_steps=[
                    "Apply for national/international competitions",
                    "Pursue prestigious scholarships",
                    "Document all achievements professionally",
                    "Seek recognition in multiple areas"
                ]
            ))
        
        return improvements
    
    def _analyze_academic_rigor(self, profile: Dict[str, Any], college_data: Dict[str, Any]) -> List[ImprovementArea]:
        """Analyze AP courses and academic rigor with enhanced calculations"""
        improvements = []
        
        # Get actual AP courses from profile data
        ap_count = profile.get('ap_count', 5)
        
        # Convert string values to numbers if needed
        try:
            ap_count = int(float(ap_count)) if ap_count else 5
        except (ValueError, TypeError):
            ap_count = 5
        hs_reputation = profile.get('hs_reputation', 5)
        
        # Determine target based on college selectivity and high school reputation
        acceptance_rate = college_data.get('acceptance_rate', 0.15)
        
        if acceptance_rate < 0.1:  # Ultra-selective
            target_ap = 8 if hs_reputation > 7 else 6
        elif acceptance_rate < 0.2:  # Highly selective
            target_ap = 6 if hs_reputation > 7 else 4
        else:  # Selective
            target_ap = 4 if hs_reputation > 7 else 3
        
        # Always provide academic rigor guidance
        if ap_count < target_ap:
            gap = target_ap - ap_count
            impact = int(gap * 2)  # 2% per AP course gap
            priority = "high" if gap > 3 else "medium"
            
            improvements.append(ImprovementArea(
                area="Academic Rigor",
                current=f"{ap_count} AP courses",
                target=f"{target_ap}+ AP courses",
                impact=min(impact, 10),  # Cap at 10%
                priority=priority,
                description=f"Increase the rigor of your academic coursework for this competitive school",
                actionable_steps=[
                    "Take more AP courses in your areas of strength",
                    "Consider dual enrollment courses",
                    "Pursue honors-level coursework",
                    "Maintain strong grades while increasing rigor",
                    "Focus on courses related to your intended major"
                ]
            ))
        else:
            # Even if good, provide guidance for excellence
            improvements.append(ImprovementArea(
                area="Academic Rigor",
                current=f"{ap_count} AP courses",
                target=f"{target_ap + 2}+ maximum rigor",
                impact=3,
                priority="low",
                description="Maintain your strong academic rigor and consider additional challenging courses",
                actionable_steps=[
                    "Take additional AP courses if available",
                    "Consider dual enrollment or college courses",
                    "Pursue independent study projects",
                    "Maintain excellent grades in rigorous coursework"
                ]
            ))
        
        return improvements
    
    def _analyze_research_innovation(self, profile: Dict[str, Any], college_data: Dict[str, Any]) -> List[ImprovementArea]:
        """Analyze research and innovation experience - ALWAYS provide guidance"""
        improvements = []
        
        research = profile.get('research_experience', 0)
        passion_projects = profile.get('passion_projects', 0)
        
        # Convert string values to numbers if needed
        try:
            research = float(research) if research else 0
            passion_projects = float(passion_projects) if passion_projects else 0
        except (ValueError, TypeError):
            research = 0
            passion_projects = 0
        
        # Always provide research guidance
        if research < 2:
            improvements.append(ImprovementArea(
                area="Research & Innovation",
                current=f"{research}/10 research experience",
                target="7+/10 with projects",
                impact=8,
                priority="medium",
                description="Develop research or innovative project experience",
                actionable_steps=[
                    "Pursue independent research projects",
                    "Work with teachers on research initiatives",
                    "Participate in science fairs or competitions",
                    "Document your research process and findings"
                ]
            ))
        else:
            # Even if good, provide guidance for excellence
            improvements.append(ImprovementArea(
                area="Research & Innovation",
                current=f"{research}/10 research experience",
                target="9+/10 exceptional research",
                impact=3,
                priority="low",
                description="Maintain your strong research experience and pursue advanced projects",
                actionable_steps=[
                    "Pursue advanced research opportunities",
                    "Consider publishing or presenting findings",
                    "Mentor others in research",
                    "Document all research achievements"
                ]
            ))
        
        # Always provide passion projects guidance
        if passion_projects < 3:
            improvements.append(ImprovementArea(
                area="Passion Projects",
                current=f"{passion_projects}/10 projects",
                target="7+/10 meaningful projects",
                impact=4,
                priority="medium",
                description="Develop personal projects that show initiative and passion",
                actionable_steps=[
                    "Start personal projects in your areas of interest",
                    "Show initiative and self-direction",
                    "Document progress and impact",
                    "Create something meaningful"
                ]
            ))
        else:
            # Even if good, provide guidance for excellence
            improvements.append(ImprovementArea(
                area="Passion Projects",
                current=f"{passion_projects}/10 projects",
                target="9+/10 exceptional projects",
                impact=2,
                priority="low",
                description="Maintain your strong passion projects and consider advanced initiatives",
                actionable_steps=[
                    "Take on more ambitious projects",
                    "Share your work with others",
                    "Mentor others in similar projects",
                    "Document all project achievements"
                ]
            ))
        
        return improvements
    
    def _analyze_essays_recommendations(self, profile: Dict[str, Any], college_data: Dict[str, Any]) -> List[ImprovementArea]:
        """Analyze essays and recommendations"""
        improvements = []
        
        essay_quality = profile.get('essay_quality', 5)
        recommendations = profile.get('recommendations', 5)
        
        # Convert string values to numbers if needed
        try:
            essay_quality = float(essay_quality) if essay_quality else 5
            recommendations = float(recommendations) if recommendations else 5
        except (ValueError, TypeError):
            essay_quality = 5
            recommendations = 5
        
        if essay_quality < 7:
            improvements.append(ImprovementArea(
                area="Essay Quality",
                current=f"{essay_quality}/10 quality",
                target="8+/10 compelling essays",
                impact=6,
                priority="medium",
                description="Improve the quality and authenticity of your essays",
                actionable_steps=[
                    "Start writing essays early and revise multiple times",
                    "Show, don't tell - use specific examples",
                    "Be authentic and personal in your writing",
                    "Get feedback from teachers and mentors"
                ]
            ))
        
        if recommendations < 7:
            improvements.append(ImprovementArea(
                area="Recommendations",
                current=f"{recommendations}/10 strength",
                target="8+/10 strong recommendations",
                impact=5,
                priority="low",
                description="Strengthen relationships with teachers and mentors",
                actionable_steps=[
                    "Build strong relationships with teachers",
                    "Participate actively in class discussions",
                    "Seek opportunities to work closely with faculty",
                    "Provide recommenders with your resume and goals"
                ]
            ))
        
        return improvements
    
    def _analyze_major_specific(self, profile: Dict[str, Any], college_data: Dict[str, Any]) -> List[ImprovementArea]:
        """Analyze major-specific requirements and preparation"""
        improvements = []
        
        intended_major = profile.get('intended_major', profile.get('major', 'General Studies'))
        # Always provide major-specific guidance, even if no specific major provided
        
        # STEM majors require strong math/science background
        stem_majors = ['computer science', 'engineering', 'mathematics', 'physics', 'chemistry', 'biology', 'medicine']
        is_stem = any(major in intended_major.lower() for major in stem_majors)
        
        if is_stem:
            # Check for STEM-specific activities
            research_experience = profile.get('research_experience', 0)
            if research_experience < 5:
                improvements.append(ImprovementArea(
                    area="STEM Preparation",
                    current=f"{research_experience}/10 research experience",
                    target="7+/10 with STEM projects",
                    impact=9,
                    priority="high",
                    description="Develop strong STEM background for competitive programs",
                    actionable_steps=[
                        "Participate in science fairs and competitions",
                        "Take advanced math and science courses",
                        "Pursue independent research projects",
                        "Join STEM clubs and organizations",
                        "Consider summer STEM programs"
                    ]
                ))
        
        # Business/Economics majors
        business_majors = ['business', 'economics', 'finance', 'marketing', 'management']
        is_business = any(major in intended_major.lower() for major in business_majors)
        
        if is_business:
            business_ventures = profile.get('business_ventures', 0)
            
            # Convert string values to numbers if needed
            try:
                business_ventures = float(business_ventures) if business_ventures else 0
            except (ValueError, TypeError):
                business_ventures = 0
            if business_ventures < 4:
                improvements.append(ImprovementArea(
                    area="Business Experience",
                    current=f"{business_ventures}/10 business ventures",
                    target="6+/10 with real projects",
                    impact=7,
                    priority="medium",
                    description="Gain hands-on business experience",
                    actionable_steps=[
                        "Start a small business or side project",
                        "Participate in business competitions",
                        "Take economics and business courses",
                        "Join business clubs and organizations",
                        "Seek internships or shadowing opportunities"
                    ]
                ))
        
        return improvements
    
    def _analyze_geographic_diversity(self, profile: Dict[str, Any], college_data: Dict[str, Any]) -> List[ImprovementArea]:
        """Analyze geographic diversity factors"""
        improvements = []
        
        geographic_diversity = profile.get('geographic_diversity', 5)
        firstgen_diversity = profile.get('firstgen_diversity', 5)
        
        # Convert string values to numbers if needed
        try:
            geographic_diversity = float(geographic_diversity) if geographic_diversity else 5
            firstgen_diversity = float(firstgen_diversity) if firstgen_diversity else 5
        except (ValueError, TypeError):
            geographic_diversity = 5
            firstgen_diversity = 5
        
        # First-generation college student - ALWAYS provide guidance
        if firstgen_diversity < 7:
            improvements.append(ImprovementArea(
                area="First-Gen Support",
                current=f"{firstgen_diversity}/10 first-gen factors",
                target="8+/10 strong first-gen profile",
                impact=6,
                priority="medium",
                description="Highlight first-generation college student status",
                actionable_steps=[
                    "Emphasize family's educational journey in essays",
                    "Connect with first-gen support programs",
                    "Highlight overcoming educational barriers",
                    "Showcase academic achievements despite challenges",
                    "Mention mentoring younger family members"
                ]
            ))
        else:
            # Even if good, provide guidance for excellence
            improvements.append(ImprovementArea(
                area="First-Gen Support",
                current=f"{firstgen_diversity}/10 first-gen factors",
                target="9+/10 exceptional first-gen profile",
                impact=2,
                priority="low",
                description="Maintain your strong first-generation status and leverage it effectively",
                actionable_steps=[
                    "Highlight unique perspective in essays",
                    "Connect with first-gen alumni networks",
                    "Mentor other first-gen students",
                    "Document your educational journey"
                ]
            ))
        
        # Geographic diversity - ALWAYS provide guidance
        if geographic_diversity < 6:
            improvements.append(ImprovementArea(
                area="Geographic Diversity",
                current=f"{geographic_diversity}/10 geographic factors",
                target="7+/10 diverse background",
                impact=4,
                priority="low",
                description="Enhance geographic diversity profile",
                actionable_steps=[
                    "Highlight unique geographic background",
                    "Emphasize cultural experiences and perspectives",
                    "Showcase travel or relocation experiences",
                    "Connect with diverse communities",
                    "Highlight multilingual abilities if applicable"
                ]
            ))
        else:
            # Even if good, provide guidance for excellence
            improvements.append(ImprovementArea(
                area="Geographic Diversity",
                current=f"{geographic_diversity}/10 geographic factors",
                target="8+/10 exceptional diversity",
                impact=2,
                priority="low",
                description="Maintain your strong geographic diversity and leverage it effectively",
                actionable_steps=[
                    "Highlight unique cultural perspective",
                    "Connect with diverse communities",
                    "Showcase international experiences",
                    "Document cultural contributions"
                ]
            ))
        
        return improvements
    
    def _analyze_interview_interest(self, profile: Dict[str, Any], college_data: Dict[str, Any]) -> List[ImprovementArea]:
        """Analyze interview performance and demonstrated interest"""
        improvements = []
        
        interview_quality = profile.get('interview', 5)
        demonstrated_interest = profile.get('demonstrated_interest', 5)
        
        # Convert string values to numbers if needed
        try:
            interview_quality = float(interview_quality) if interview_quality else 5
            demonstrated_interest = float(demonstrated_interest) if demonstrated_interest else 5
        except (ValueError, TypeError):
            interview_quality = 5
            demonstrated_interest = 5
        
        if interview_quality < 7:
            improvements.append(ImprovementArea(
                area="Interview Skills",
                current=f"{interview_quality}/10 interview quality",
                target="8+/10 confident performance",
                impact=5,
                priority="medium",
                description="Improve interview and communication skills",
                actionable_steps=[
                    "Practice common interview questions",
                    "Prepare thoughtful questions about the college",
                    "Practice articulating your goals and interests",
                    "Work on public speaking and presentation skills",
                    "Consider mock interviews with counselors"
                ]
            ))
        
        if demonstrated_interest < 6:
            improvements.append(ImprovementArea(
                area="Demonstrated Interest",
                current=f"{demonstrated_interest}/10 interest level",
                target="8+/10 strong engagement",
                impact=4,
                priority="low",
                description="Show strong interest in the college",
                actionable_steps=[
                    "Visit campus if possible",
                    "Attend virtual information sessions",
                    "Connect with current students or alumni",
                    "Follow college social media and engage",
                    "Mention specific programs and opportunities in essays"
                ]
            ))
        
        return improvements
    
    def _analyze_portfolio_creative(self, profile: Dict[str, Any], college_data: Dict[str, Any]) -> List[ImprovementArea]:
        """Analyze portfolio and creative work - ALWAYS provide guidance"""
        improvements = []
        
        portfolio_audition = profile.get('portfolio_audition', 0)
        
        # Convert string values to numbers if needed
        try:
            portfolio_audition = float(portfolio_audition) if portfolio_audition else 0
        except (ValueError, TypeError):
            portfolio_audition = 0
        
        # Always provide portfolio guidance, regardless of major
        if portfolio_audition < 6:
            improvements.append(ImprovementArea(
                area="Creative Portfolio",
                current=f"{portfolio_audition}/10 portfolio strength",
                target="8+/10 outstanding work",
                impact=6,
                priority="medium",
                description="Develop a strong creative portfolio",
                actionable_steps=[
                    "Create diverse, high-quality work samples",
                    "Seek feedback from teachers and professionals",
                    "Build an online portfolio or website",
                    "Document your creative process",
                    "Showcase your best work"
                ]
            ))
        else:
            # Even if good, provide guidance for excellence
            improvements.append(ImprovementArea(
                area="Creative Portfolio",
                current=f"{portfolio_audition}/10 portfolio strength",
                target="9+/10 exceptional work",
                impact=2,
                priority="low",
                description="Maintain your strong creative portfolio and pursue advanced projects",
                actionable_steps=[
                    "Create more ambitious projects",
                    "Seek professional feedback",
                    "Consider competitions or exhibitions",
                    "Mentor other creative students"
                ]
            ))
        
        return improvements
    
    def _analyze_volunteer_service(self, profile: Dict[str, Any], college_data: Dict[str, Any]) -> List[ImprovementArea]:
        """Analyze volunteer work and community service - ALWAYS provide guidance"""
        improvements = []
        
        volunteer_work = profile.get('volunteer_work', 5)
        
        # Convert string values to numbers if needed
        try:
            volunteer_work = float(volunteer_work) if volunteer_work else 5
        except (ValueError, TypeError):
            volunteer_work = 5
        
        # Always provide volunteer guidance
        if volunteer_work < 6:
            improvements.append(ImprovementArea(
                area="Community Service",
                current=f"{volunteer_work}/10 volunteer work",
                target="7+/10 meaningful service",
                impact=6,
                priority="medium",
                description="Engage in meaningful community service",
                actionable_steps=[
                    "Find volunteer opportunities aligned with your interests",
                    "Commit to long-term service projects",
                    "Take on leadership roles in service organizations",
                    "Document impact and outcomes of your service",
                    "Connect service to your academic and career goals"
                ]
            ))
        else:
            # Even if good, provide guidance for excellence
            improvements.append(ImprovementArea(
                area="Community Service",
                current=f"{volunteer_work}/10 volunteer work",
                target="9+/10 exceptional service",
                impact=2,
                priority="low",
                description="Maintain your strong community service and pursue advanced opportunities",
                actionable_steps=[
                    "Take on leadership roles in service organizations",
                    "Start your own service initiatives",
                    "Mentor other volunteers",
                    "Document and share your impact"
                ]
            ))
        
        return improvements
    
    def _get_default_improvements(self) -> List[ImprovementArea]:
        """Return default improvements when college data is not available"""
        return [
            ImprovementArea(
                area="Academic Performance",
                current="Current GPA",
                target="3.9+ GPA",
                impact=10,
                priority="high",
                description="Focus on maintaining strong academic performance",
                actionable_steps=["Maintain high grades", "Take challenging courses", "Show improvement over time"]
            ),
            ImprovementArea(
                area="Standardized Testing",
                current="Current SAT",
                target="1500+ SAT",
                impact=12,
                priority="high",
                description="Improve standardized test scores",
                actionable_steps=["Practice regularly", "Take prep courses", "Focus on weak areas"]
            ),
            ImprovementArea(
                area="Extracurricular Activities",
                current="Current activities",
                target="Deep involvement",
                impact=8,
                priority="medium",
                description="Develop meaningful extracurricular involvement",
                actionable_steps=["Focus on 2-3 activities", "Take leadership roles", "Show long-term commitment"]
            )
        ]
    
    def calculate_combined_impact(self, improvements: List[ImprovementArea]) -> int:
        """Calculate the combined potential impact of all improvements"""
        if not improvements:
            return 0
        
        # Cap the combined impact at 35% for realistic expectations
        total_impact = sum(imp.impact for imp in improvements)
        return min(total_impact, 35)

improvement_analysis_service = ImprovementAnalysisService()
