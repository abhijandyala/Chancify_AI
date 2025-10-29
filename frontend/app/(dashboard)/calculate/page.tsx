'use client';

import * as React from 'react';
import { Info, MapPin, TrendingUp, Zap, Target, TrendingDown, Award, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { COLLEGES } from '@/lib/colleges';
import { useCollegeSubjectEmphasis } from '@/lib/hooks/useCollegeSubjectEmphasis';
import { useCollegeTuitionByZipcode } from '@/lib/hooks/useCollegeTuitionByZipcode';
import { useImprovementAnalysis } from '@/lib/hooks/useImprovementAnalysis';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const AnimatedBar = ({ value, color, label }: { value: number; color: string; label: string }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-300 font-medium">{label}</span>
        <span className="text-sm font-bold text-neutral-100">{Math.round(value)}%</span>
      </div>
      <div className="relative h-3 w-full rounded-full bg-gradient-to-r from-neutral-800 to-neutral-700 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r transition-all duration-1000 ease-out"
          style={{
            backgroundImage: `linear-gradient(90deg, ${color}, ${color}dd)`,
            width: `${value}%`,
            boxShadow: `0 0 20px ${color}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
          }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full opacity-30"
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
};

// ==== Types ====
type Outcome = { accept: number; waitlist: number; reject: number };
type CostBreakdown = {
  year: number;
  inStateTuition?: number;
  outStateTuition?: number;
  fees?: number;
  roomBoard?: number;
  books?: number;
  other?: number;
};
type DistributionItem = { label: string; value: number };
type CollegeStats = {
  collegeName: string;
  city?: string;
  state?: string;
  isPublic?: boolean;
  acceptanceRateOfficial?: number;
  outcome: Outcome;
  subjects: DistributionItem[];
  ethnicity: DistributionItem[];
  costs?: CostBreakdown;
  tags?: string[];
  facts?: Record<string, string>;
  updatedAtISO?: string;
};

// ==== ROX Color Palette ====
const ROX_GOLD = '#F7B500';
const ROX_BLACK = '#0A0A0A';
const ROX_DARK_GRAY = '#1A1A1A';
const ROX_WHITE = '#FFFFFF';
const CHART_COLORS = ['#F7B500', '#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500'];

function clampPct(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function CircularChance({ value }: { value: number }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (value / 100) * circumference;

  const getColor = (v: number) => {
    if (v >= 50) return ROX_GOLD;
    if (v >= 25) return '#FFD700';
    return '#FF6B6B';
  };

  const color = getColor(value);

  return (
    <div className="relative w-full flex flex-col items-center gap-6 py-8">
      <div className="relative w-40 h-40">
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ background: color }}
        />

        {/* Main circle background */}
        <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(247, 181, 0, 0.2)"
            strokeWidth="3"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            filter="drop-shadow(0 0 8px rgba(247,181,0,0.3))"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-white">
            {Math.round(value)}%
          </div>
          <div className="text-xs text-neutral-400 mt-1 text-center">Your Chance</div>
        </div>
      </div>

      <div className="text-center max-w-xs">
        <p className="text-sm text-neutral-300">
          {value >= 50
            ? '🎓 Strong shot! High probability of admission.'
            : value >= 25
            ? '⭐ Moderate chance. Competitive profile.'
            : '🎯 Long shot. Keep options open.'}
        </p>
      </div>
    </div>
  );
}

function StatRow({ label, value, hint }: { label: string; value: number; hint?: string }) {
  const colors: Record<string, string> = {
    'Acceptance': ROX_GOLD,
    'Waitlist': '#FFD700',
    'Rejection': '#FF6B6B',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-neutral-300">
          <span className="font-medium">{label}</span>
          {hint && (
            <div title={hint} className="h-4 w-4 opacity-70">
              <Info className="h-4 w-4" />
            </div>
          )}
        </div>
        <div className="font-bold text-base text-neutral-100">{clampPct(value)}%</div>
      </div>
      <AnimatedBar value={value} color={colors[label] || ROX_GOLD} label="" />
    </div>
  );
}

function Money({ n }: { n?: number }) {
  if (n == null) return <span className="text-neutral-400">—</span>;
  return <span>${n.toLocaleString()}</span>;
}

function ImprovementCard({ area, current, target, impact, priority, description, actionable_steps }: { 
  area: string; 
  current: string; 
  target: string; 
  impact: number;
  priority?: string;
  description?: string;
  actionable_steps?: string[];
}) {
  return (
    <motion.div 
      className="relative group rounded-xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 border border-neutral-600/40 p-6 hover:border-yellow-500/60 transition-all duration-300 min-h-[320px] shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

      <div className="relative space-y-4 h-full flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-bold text-white text-lg">{area}</h3>
              {priority && (
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  priority === 'high' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                  priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40' :
                  'bg-green-500/20 text-green-300 border border-green-500/40'
                }`}>
                  {priority}
                </span>
              )}
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-neutral-400 font-medium text-sm">Current:</span>
                <span className="text-white font-semibold text-base bg-neutral-700/50 px-3 py-1 rounded-lg">{current}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-neutral-400 font-medium text-sm">Target:</span>
                <span className="text-yellow-400 font-bold text-base bg-yellow-500/10 px-3 py-1 rounded-lg border border-yellow-500/30">{target}</span>
              </div>
            </div>
            
            {description && (
              <p className="text-sm text-neutral-300 mb-4 leading-relaxed">{description}</p>
            )}
          </div>
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Target className="h-5 w-5 text-yellow-400" />
          </div>
        </div>

        {actionable_steps && actionable_steps.length > 0 && (
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-neutral-200 mb-3">Action Steps:</h4>
            <ul className="space-y-2">
              {actionable_steps.slice(0, 3).map((step, index) => (
                <li key={index} className="text-xs text-neutral-400 flex items-start gap-2">
                  <span className="text-yellow-400 mt-1 font-bold">•</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-3 border-t border-neutral-600/40">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-neutral-400 font-medium">Impact</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-lg font-bold text-green-400">+{impact}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CalculationsPage() {
  const router = useRouter();
  const [collegeData, setCollegeData] = React.useState<CollegeStats | null>(null);
  const [userChance, setUserChance] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [collegeName, setCollegeName] = React.useState<string | null>(null);
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const [zipcode, setZipcode] = React.useState<string | null>(null);

  // Get tuition data for the selected college based on zipcode
  const { tuitionData: zipcodeTuitionData, loading: zipcodeTuitionLoading, error: zipcodeTuitionError } = useCollegeTuitionByZipcode(collegeName, zipcode);

  // Get subject emphasis data for the selected college
  const { subjects: subjectEmphasis, loading: subjectsLoading, error: subjectsError } = useCollegeSubjectEmphasis(collegeName);

  // Get improvement analysis for the selected college
  const { improvementData, loading: improvementLoading, error: improvementError } = useImprovementAnalysis(collegeName || '', userProfile);

  // Load data from localStorage and calculate probabilities
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const selectedColleges = JSON.parse(localStorage.getItem('selectedColleges') || '[]');
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        
        // Set the user profile state
        setUserProfile(userProfile);
        
        if (selectedColleges.length === 0) {
          router.push('/college-selection');
          return;
        }

        // Get the first selected college for detailed analysis
        const firstCollege = selectedColleges[0];
        
        // The college ID from localStorage might be a backend ID (e.g., college_1000669)
        // We need to get the actual college name from the backend data
        // For now, we'll use the ID as-is and let the backend handle it
        const collegeName = firstCollege;
        
        console.log('🔍 DEBUGGING CALCULATE PAGE:');
        console.log('🔍 Selected Colleges from localStorage:', selectedColleges);
        console.log('🔍 First College ID:', firstCollege);
        console.log('🔍 College Name to send:', collegeName);
        console.log('🔍 User Profile from localStorage:', userProfile);
        
        // Calculate probability using the backend API
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://unsmug-untensely-elroy.ngrok-free.dev';
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        
        // Add ngrok skip warning header if using ngrok
        if (API_BASE_URL.includes('ngrok')) {
          headers['ngrok-skip-browser-warning'] = 'true';
        }
        
        const requestData = {
          ...userProfile,
          college: collegeName // Send college name instead of ID
        };
        
        console.log('🔍 REQUEST DATA TO BACKEND:', requestData);
        console.log('🔍 API URL:', `${API_BASE_URL}/api/predict/frontend`);
        
        const response = await fetch(`${API_BASE_URL}/api/predict/frontend`, {
          method: 'POST',
          headers,
          body: JSON.stringify(requestData)
        });
        
        const result = await response.json();
        console.log('🔍 BACKEND RESPONSE DEBUG:', result);
        console.log('🔍 COLLEGE DATA FROM BACKEND:', result.college_data);
        console.log('🔍 COLLEGE NAME FROM BACKEND:', result.college_name);
        console.log('🔍 ACCEPTANCE RATE FROM BACKEND:', result.acceptance_rate);
        console.log('🔍 PROBABILITY FROM BACKEND:', result.probability);
        console.log('🔍 ML PROBABILITY FROM BACKEND:', result.ml_probability);
        console.log('🔍 FORMULA PROBABILITY FROM BACKEND:', result.formula_probability);
        console.log('🔍 MODEL USED FROM BACKEND:', result.model_used);
        console.log('🔍 EXPLANATION FROM BACKEND:', result.explanation);
        
        const probability = result.probability || 0;
        const userChancePercent = Math.round(probability * 100);
        setUserChance(userChancePercent);

        console.log('🔍 PROBABILITY CALCULATION:');
        console.log('🔍 Probability from backend:', probability);
        console.log('🔍 User chance %:', userChancePercent);
        console.log('🔍 ML Probability:', result.ml_probability);
        console.log('🔍 Formula Probability:', result.formula_probability);
        console.log('🔍 Model Used:', result.model_used);
        console.log('🔍 Explanation:', result.explanation);
        
        // FIXED: Calculate realistic outcome distribution
        // For elite schools like Carnegie Mellon with ~16.5% acceptance chance:
        // - Acceptance: actual probability from ML model
        // - Waitlist: ~15-20% of admits get waitlisted, so roughly 3-5% of applicants
        // - Rejection: remaining percentage
        const acceptRate = probability; // 0.0 to 1.0
        const waitlistRate = Math.min(0.10, acceptRate * 0.5); // 10% max, or half of acceptance rate
        const rejectRate = 1.0 - acceptRate - waitlistRate;
        
        console.log('🔍 OUTCOME CALCULATION:');
        console.log('🔍 Accept Rate:', (acceptRate * 100).toFixed(1) + '%');
        console.log('🔍 Waitlist Rate:', (waitlistRate * 100).toFixed(1) + '%');
        console.log('🔍 Reject Rate:', (rejectRate * 100).toFixed(1) + '%');

      // Set college name for subject emphasis hook
      const actualCollegeName = result.college_name || collegeName || 'Selected College';
      setCollegeName(actualCollegeName);
      
      // Load zipcode from localStorage
      const savedZipcode = localStorage.getItem('userZipcode');
      if (savedZipcode) {
        setZipcode(savedZipcode);
      }
        
        // Use real college data from backend response
         const collegeStats: CollegeStats = {
           collegeName: actualCollegeName, // Use college name from backend
           city: result.college_data?.city || 'Unknown',
           state: result.college_data?.state || 'Unknown', 
           isPublic: result.college_data?.is_public || false,
           acceptanceRateOfficial: Math.round((result.acceptance_rate || 0.15) * 100),
          outcome: {
            accept: Math.round(acceptRate * 100),
            waitlist: Math.round(waitlistRate * 100),
            reject: Math.round(rejectRate * 100)
          },
          subjects: result.subject_emphasis || [
            { label: 'Computer Science', value: 28 },
            { label: 'Engineering', value: 24 },
            { label: 'Business', value: 16 },
            { label: 'Biological Sciences', value: 14 },
            { label: 'Mathematics & Stats', value: 11 },
            { label: 'Social Sciences', value: 9 },
            { label: 'Arts & Humanities', value: 7 },
            { label: 'Education', value: 5 },
          ],
          ethnicity: [
            { label: 'White', value: 36 },
            { label: 'Asian', value: 28 },
            { label: 'Hispanic/Latino', value: 18 },
            { label: 'Black/African American', value: 11 },
            { label: 'Two or More', value: 7 },
          ],
          costs: {
            year: 2025,
            inStateTuition: result.college_data?.tuition_in_state || 60849,
            outStateTuition: result.college_data?.tuition_out_of_state || 60849,
            fees: 882,
            roomBoard: 20691,
            books: 891,
            other: 2283,
          },
          tags: [
            result.college_data?.financial_aid_policy || 'Need-Blind',
            'Meets Full Need', 
            result.college_data?.test_policy || 'Test-Optional'
          ],
          facts: {
            'Student-Faculty Ratio': '5:1',
            'Graduation Rate (6yr)': '97%',
            'Freshman Retention': '99%',
            'Endowment': '$38.2B',
          },
          updatedAtISO: new Date().toISOString(),
        };

        console.log('🔍 FINAL COLLEGE STATS CREATED:', collegeStats);
        console.log('🔍 COLLEGE NAME IN STATS:', collegeStats.collegeName);
        console.log('🔍 CITY IN STATS:', collegeStats.city);
        console.log('🔍 STATE IN STATS:', collegeStats.state);
        console.log('🔍 IS PUBLIC IN STATS:', collegeStats.isPublic);
        console.log('🔍 OFFICIAL ACCEPTANCE RATE IN STATS:', collegeStats.acceptanceRateOfficial + '%');
        console.log('🔍 OUTCOME BREAKDOWN:', collegeStats.outcome);
        console.log('🔍 TUITION IN STATE:', collegeStats.costs?.inStateTuition);
        console.log('🔍 TUITION OUT OF STATE:', collegeStats.costs?.outStateTuition);

        setCollegeData(collegeStats);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ROX_BLACK flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-ROX_GOLD border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">Loading calculations...</p>
        </div>
      </div>
    );
  }

  if (!collegeData) {
    return (
      <div className="min-h-screen bg-ROX_BLACK flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">No college data available</p>
          <button 
            onClick={() => router.push('/college-selection')}
            className="px-6 py-2 bg-ROX_GOLD text-black rounded-lg font-semibold hover:bg-ROX_GOLD/80 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const d = collegeData;
  const cityState = [d.city, d.state].filter(Boolean).join(', ');
  const outcomeRows = [
    { key: 'Acceptance', value: d.outcome.accept, hint: 'Probability of admission based on similar profiles.' },
    { key: 'Waitlist', value: d.outcome.waitlist, hint: 'Chance of being placed on a waitlist.' },
    { key: 'Rejection', value: d.outcome.reject, hint: 'Probability of not receiving an offer.' },
  ];

  const outcomeChartData = [
    { label: 'Acceptance', pct: clampPct(d.outcome.accept) },
    { label: 'Waitlist', pct: clampPct(d.outcome.waitlist) },
    { label: 'Rejection', pct: clampPct(d.outcome.reject) },
  ];

  const tuitionBars = [
    ...(d.costs?.inStateTuition ? [{ label: 'In-State Tuition', amount: d.costs.inStateTuition }] : []),
    ...(d.costs?.outStateTuition ? [{ label: 'Out-of-State Tuition', amount: d.costs.outStateTuition }] : []),
  ];

  // Comprehensive improvement areas with ALL factors from dropdowns
  const improvementAreas = improvementData?.improvements || [
    // Academic Performance (25% weight)
    { 
      area: 'Academic Performance', 
      current: userProfile?.gpa_unweighted ? `${userProfile.gpa_unweighted} GPA` : 'No GPA entered', 
      target: collegeData?.acceptanceRateOfficial ? `${(collegeData.acceptanceRateOfficial * 100).toFixed(1)}% acceptance rate` : '3.9+ GPA', 
      impact: 25, 
      priority: 'high', 
      description: `Focus on maintaining strong academic performance - ${collegeData?.collegeName || 'this college'} expects high grades`, 
      actionable_steps: ['Maintain high grades in core subjects', 'Take challenging courses', 'Show improvement over time', 'Focus on areas of weakness'] 
    },
    
    // Curriculum Rigor (12% weight)
    { 
      area: 'Curriculum Rigor', 
      current: userProfile?.rigor ? `${userProfile.rigor}/10 rigor` : 'No rigor entered', 
      target: '8+/10 maximum rigor', 
      impact: 12, 
      priority: 'high', 
      description: 'Take the most challenging courses available at your school', 
      actionable_steps: ['Take more AP/IB courses', 'Enroll in honors classes', 'Consider dual enrollment', 'Challenge yourself academically'] 
    },
    
    // Standardized Testing (8% weight)
    { 
      area: 'Standardized Testing', 
      current: userProfile?.sat ? `${userProfile.sat} SAT` : (userProfile?.act ? `${userProfile.act} ACT` : 'No test scores'), 
      target: '1500+ SAT', 
      impact: 8, 
      priority: 'high', 
      description: 'Improve standardized test scores to meet college expectations', 
      actionable_steps: ['Take practice tests regularly', 'Focus on weak areas', 'Consider test prep courses', 'Retake if needed'] 
    },
    
    // Extracurricular Depth (7.5% weight)
    { 
      area: 'Extracurricular Activities', 
      current: userProfile?.extracurricular_depth ? `${userProfile.extracurricular_depth}/10 depth` : 'No activities entered', 
      target: '8+/10 exceptional depth', 
      impact: 8, 
      priority: 'high', 
      description: 'Develop meaningful involvement in 2-3 key activities', 
      actionable_steps: ['Focus on 2-3 activities', 'Take leadership roles', 'Show long-term commitment', 'Create impact projects'] 
    },
    
    // Leadership Positions (7.5% weight)
    { 
      area: 'Leadership Experience', 
      current: userProfile?.leadership_positions ? `${userProfile.leadership_positions}/10 leadership` : 'No leadership entered', 
      target: '8+/10 strong leadership', 
      impact: 8, 
      priority: 'high', 
      description: 'Build leadership experience and take on responsibility', 
      actionable_steps: ['Take on leadership roles', 'Lead projects and initiatives', 'Mentor others', 'Organize events'] 
    },
    
    // Essays & Writing (8% weight)
    { 
      area: 'Essays & Writing', 
      current: userProfile?.essay_quality ? `${userProfile.essay_quality}/10 quality` : 'No essay rating', 
      target: '9+/10 compelling essays', 
      impact: 8, 
      priority: 'medium', 
      description: 'Craft compelling essays that tell your unique story', 
      actionable_steps: ['Start essays early', 'Tell unique stories', 'Get feedback from teachers', 'Revise multiple times'] 
    },
    
    // Recommendations (4% weight)
    { 
      area: 'Recommendation Letters', 
      current: userProfile?.recommendations ? `${userProfile.recommendations}/10 strength` : 'No rec rating', 
      target: '9+/10 outstanding letters', 
      impact: 4, 
      priority: 'medium', 
      description: 'Secure strong recommendation letters from teachers', 
      actionable_steps: ['Build relationships with teachers', 'Ask early', 'Provide detailed information', 'Choose recommenders wisely'] 
    },
    
    // Awards & Publications (2% weight)
    { 
      area: 'Awards & Recognition', 
      current: userProfile?.awards_publications ? `${userProfile.awards_publications}/10 recognition` : 'No awards entered', 
      target: '7+/10 notable recognition', 
      impact: 2, 
      priority: 'medium', 
      description: 'Pursue awards, competitions, and recognition', 
      actionable_steps: ['Enter competitions', 'Apply for scholarships', 'Pursue recognition', 'Document achievements'] 
    },
    
    // Research Experience (2% weight)
    { 
      area: 'Research Experience', 
      current: userProfile?.research_experience ? `${userProfile.research_experience}/10 experience` : 'No research entered', 
      target: '7+/10 research involvement', 
      impact: 2, 
      priority: 'medium', 
      description: 'Engage in research or academic projects', 
      actionable_steps: ['Find research opportunities', 'Work with professors', 'Present findings', 'Publish if possible'] 
    },
    
    // Passion Projects (2% weight)
    { 
      area: 'Passion Projects', 
      current: userProfile?.passion_projects ? `${userProfile.passion_projects}/10 projects` : 'No projects entered', 
      target: '7+/10 meaningful projects', 
      impact: 2, 
      priority: 'medium', 
      description: 'Develop personal projects that show initiative', 
      actionable_steps: ['Start personal projects', 'Show initiative', 'Document progress', 'Create impact'] 
    },
    
    // Business Ventures (2% weight)
    { 
      area: 'Entrepreneurship', 
      current: userProfile?.business_ventures ? `${userProfile.business_ventures}/10 ventures` : 'No ventures entered', 
      target: '6+/10 business experience', 
      impact: 2, 
      priority: 'low', 
      description: 'Show entrepreneurial spirit and business acumen', 
      actionable_steps: ['Start small business', 'Create products/services', 'Show leadership', 'Document success'] 
    },
    
    // Volunteer Work (2% weight)
    { 
      area: 'Community Service', 
      current: userProfile?.volunteer_work ? `${userProfile.volunteer_work}/10 service` : 'No service entered', 
      target: '7+/10 meaningful service', 
      impact: 2, 
      priority: 'medium', 
      description: 'Engage in meaningful community service', 
      actionable_steps: ['Find causes you care about', 'Commit long-term', 'Take leadership roles', 'Document impact'] 
    },
    
    // Portfolio/Audition (2% weight)
    { 
      area: 'Portfolio & Creative Work', 
      current: userProfile?.portfolio_audition ? `${userProfile.portfolio_audition}/10 quality` : 'No portfolio rating', 
      target: '8+/10 outstanding work', 
      impact: 2, 
      priority: 'low', 
      description: 'Develop outstanding creative or technical portfolio', 
      actionable_steps: ['Create high-quality work', 'Seek feedback', 'Build online presence', 'Showcase best pieces'] 
    },
    
    // Interview Performance (1% weight)
    { 
      area: 'Interview Skills', 
      current: userProfile?.interview ? `${userProfile.interview}/10 performance` : 'No interview rating', 
      target: '9+/10 excellent interview', 
      impact: 1, 
      priority: 'low', 
      description: 'Excel in interviews and show genuine interest', 
      actionable_steps: ['Practice interview skills', 'Research the college', 'Ask thoughtful questions', 'Follow up appropriately'] 
    },
    
    // Demonstrated Interest (1.5% weight)
    { 
      area: 'Demonstrated Interest', 
      current: userProfile?.demonstrated_interest ? `${userProfile.demonstrated_interest}/10 interest` : 'No interest rating', 
      target: '8+/10 strong interest', 
      impact: 2, 
      priority: 'low', 
      description: 'Show genuine interest in the college', 
      actionable_steps: ['Visit campus', 'Attend events', 'Contact admissions', 'Show enthusiasm'] 
    },
    
    // Legacy Status (1.5% weight)
    { 
      area: 'Legacy Status', 
      current: userProfile?.legacy_status ? `${userProfile.legacy_status}/10 legacy` : 'No legacy status', 
      target: '8+/10 strong legacy', 
      impact: 2, 
      priority: 'low', 
      description: 'Leverage family connections to the college', 
      actionable_steps: ['Document family connections', 'Highlight legacy status', 'Get family support', 'Show tradition'] 
    },
    
    // Geographic Diversity (3% weight)
    { 
      area: 'Geographic Diversity', 
      current: userProfile?.geographic_diversity ? `${userProfile.geographic_diversity}/10 diversity` : 'No diversity rating', 
      target: '7+/10 geographic advantage', 
      impact: 3, 
      priority: 'medium', 
      description: 'Highlight unique geographic background', 
      actionable_steps: ['Emphasize unique background', 'Show cultural perspective', 'Highlight experiences', 'Connect to college mission'] 
    },
    
    // First-Gen Diversity (3% weight)
    { 
      area: 'First-Generation Status', 
      current: userProfile?.firstgen_diversity ? `${userProfile.firstgen_diversity}/10 first-gen` : 'No first-gen status', 
      target: '8+/10 first-gen advantage', 
      impact: 3, 
      priority: 'medium', 
      description: 'Leverage first-generation college student status', 
      actionable_steps: ['Highlight first-gen status', 'Show determination', 'Connect to college mission', 'Emphasize resilience'] 
    },
    
    // High School Reputation (2% weight)
    { 
      area: 'High School Reputation', 
      current: userProfile?.hs_reputation ? `${userProfile.hs_reputation}/10 reputation` : 'No school rating', 
      target: '8+/10 strong school', 
      impact: 2, 
      priority: 'low', 
      description: 'Highlight your high school\'s academic reputation', 
      actionable_steps: ['Emphasize school strengths', 'Show academic rigor', 'Highlight achievements', 'Connect to college'] 
    }
  ];

  return (
    <div className="min-h-screen bg-ROX_BLACK text-white pt-20 relative overflow-hidden">
      {/* ROX Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-ROX_GOLD/5 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-tr from-ROX_GOLD/3 via-transparent to-transparent rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-ROX_GOLD hover:text-ROX_GOLD/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{d.collegeName}</h1>
              {d.acceptanceRateOfficial != null && (
                <div className="px-3 py-1 rounded-full bg-ROX_DARK_GRAY text-ROX_GOLD border border-ROX_GOLD/30 text-xs md:text-sm font-medium">
                  Official Acceptance: {d.acceptanceRateOfficial.toFixed(1)}%
                </div>
              )}
              {d.isPublic != null && (
                <div className="px-3 py-1 rounded-full bg-ROX_GOLD text-black text-xs md:text-sm font-medium">
                  {d.isPublic ? 'Public' : 'Private'}
                </div>
              )}
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-neutral-400">
              <MapPin className="h-4 w-4" />
              <span>{cityState || 'Location N/A'}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {(d.tags || []).map((t) => (
              <div key={t} className="px-3 py-1 rounded-full border border-ROX_GOLD/30 text-ROX_GOLD text-xs md:text-sm">
                {t}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Warning */}
        <motion.div 
          className="bg-ROX_DARK_GRAY border border-ROX_GOLD/30 rounded-2xl p-4 flex gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Info className="h-5 w-5 text-ROX_GOLD flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-white">Model-Estimated Probabilities</div>
            <div className="text-neutral-300 text-sm mt-1">
              These percentages are generated by a statistical/ML model using your provided profile. They are estimates—not admissions advice or guarantees.
            </div>
          </div>
        </motion.div>

        <div className="h-px bg-gradient-to-r from-transparent via-ROX_GOLD/30 to-transparent my-6" />

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Column - Expanded */}
          <div className="lg:col-span-9 space-y-6">
            {/* Outcome Distribution */}
            <motion.div 
              className="relative bg-gradient-to-br from-ROX_DARK_GRAY/80 via-ROX_BLACK/60 to-ROX_BLACK/80 border border-ROX_GOLD/30 rounded-3xl p-6 backdrop-blur-xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ROX_GOLD/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-6">
                  <TrendingUp className="h-5 w-5 text-ROX_GOLD" /> Outcome Distribution
                </h2>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={outcomeChartData}>
                      <XAxis dataKey="label" stroke="#9CA3AF" tickLine={false} axisLine={{ stroke: '#1F2937' }} />
                      <YAxis stroke="#9CA3AF" tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={{ stroke: '#1F2937' }} domain={[0, 100]} />
                      <RTooltip contentStyle={{ background: ROX_BLACK, border: '1px solid #F7B500', color: 'white', borderRadius: '12px', boxShadow: '0 20px 25px rgba(0,0,0,0.3)' }} formatter={(v: number) => [`${v}%`, 'Probability']} />
                      <Bar dataKey="pct" radius={[12, 12, 0, 0]}>
                        {outcomeChartData.map((_, i) => (
                          <Cell key={i} fill={[ROX_GOLD, "#FFD700", "#FF6B6B"][i]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Subjects Chart */}
            <motion.div 
              className="relative bg-gradient-to-br from-ROX_DARK_GRAY/80 via-ROX_BLACK/60 to-ROX_BLACK/80 border border-ROX_GOLD/30 rounded-3xl p-6 backdrop-blur-xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ROX_GOLD/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <h2 className="text-lg font-semibold text-white mb-6">
                  Subject Emphasis
                  {subjectsLoading && <span className="text-sm text-gray-400 ml-2">(Loading...)</span>}
                  {subjectsError && <span className="text-sm text-red-400 ml-2">(Using default data)</span>}
                </h2>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectEmphasis.length > 0 ? subjectEmphasis : d.subjects} layout="vertical" margin={{ left: 140 }}>
                      <XAxis type="number" stroke="#9CA3AF" tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                      <YAxis type="category" dataKey="label" width={130} stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                      <RTooltip contentStyle={{ background: ROX_BLACK, border: '1px solid #F7B500', color: 'white', borderRadius: '12px', boxShadow: '0 20px 25px rgba(0,0,0,0.3)' }} formatter={(v: number) => [`${v}%`, 'Share']} />
                      <Bar dataKey="value" radius={[0, 12, 12, 0]}>
                        {(subjectEmphasis.length > 0 ? subjectEmphasis : d.subjects).map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>


            {/* Tuition */}
            <motion.div 
              className="relative bg-gradient-to-br from-ROX_DARK_GRAY/80 via-ROX_BLACK/60 to-ROX_BLACK/80 border border-ROX_GOLD/30 rounded-3xl p-6 backdrop-blur-xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ROX_GOLD/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
          <h2 className="text-lg font-semibold text-white mb-6">
            Tuition & Annual Costs (2025)
            {zipcodeTuitionLoading && <span className="text-sm text-gray-400 ml-2">(Loading...)</span>}
            {zipcodeTuitionError && <span className="text-sm text-red-400 ml-2">(Using default data)</span>}
            {zipcodeTuitionData && (
              <span className="text-sm text-yellow-400 ml-2">
                ({zipcodeTuitionData.is_in_state ? 'In-State' : 'Out-of-State'} - {zipcodeTuitionData.zipcode_state || 'Unknown State'})
              </span>
            )}
          </h2>
                <div className="space-y-6">
                {tuitionBars.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {tuitionBars.map((t) => (
                      <div key={t.label} className="p-4 rounded-2xl bg-ROX_DARK_GRAY border border-ROX_GOLD/20">
                        <div className="text-sm text-neutral-400">{t.label}</div>
                        <div className="text-2xl font-semibold mt-1 text-white"><Money n={t.amount} /></div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="overflow-hidden rounded-2xl border border-ROX_GOLD/20">
                  <table className="w-full text-sm">
                    <thead className="bg-ROX_DARK_GRAY/60 text-neutral-300 border-b border-ROX_GOLD/20">
                      <tr>
                        <th className="text-left p-3">Category</th>
                        <th className="text-right p-3">Estimated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ROX_GOLD/20">
                      <tr>
                        <td className="p-3 text-white">
                          Tuition {zipcodeTuitionData && zipcodeTuitionData.success && (
                            <span className="text-xs text-yellow-400 ml-1">
                              ({zipcodeTuitionData.is_in_state ? 'In-State' : 'Out-of-State'})
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right text-white">
                          <Money n={
                            zipcodeTuitionData && zipcodeTuitionData.success 
                              ? zipcodeTuitionData.tuition 
                              : (d.costs?.inStateTuition ?? d.costs?.outStateTuition ?? 0)
                          } />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white">Fees</td>
                        <td className="p-3 text-right text-white"><Money n={d.costs?.fees ?? 1000} /></td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white">Room & Board</td>
                        <td className="p-3 text-right text-white"><Money n={d.costs?.roomBoard ?? 15000} /></td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white">Books</td>
                        <td className="p-3 text-right text-white"><Money n={d.costs?.books ?? 1000} /></td>
                      </tr>
                      <tr>
                        <td className="p-3 text-white">Other</td>
                        <td className="p-3 text-right text-white"><Money n={d.costs?.other ?? 2000} /></td>
                      </tr>
                      <tr className="border-t border-ROX_GOLD/30 bg-ROX_DARK_GRAY/40">
                        <td className="p-3 text-white font-semibold">Total</td>
                        <td className="p-3 text-right text-white font-semibold">
                          <Money n={
                            zipcodeTuitionData && zipcodeTuitionData.success 
                              ? zipcodeTuitionData.tuition + 20000  // Add estimated room/board/fees
                              : (d.costs?.inStateTuition ?? d.costs?.outStateTuition ?? 0)
                          } />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-neutral-500">Numbers are approximate and may vary by program, living situation, and aid.</p>
              </div>
              </div>
            </motion.div>

            {/* Areas to Improve - Professional Design */}
            <motion.div 
              className="relative bg-gradient-to-br from-neutral-900/90 via-neutral-800/80 to-neutral-900/90 border border-neutral-600/50 rounded-2xl p-8 backdrop-blur-xl overflow-hidden group w-full shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                    <Award className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Areas to Improve</h2>
                    <p className="text-lg text-neutral-300">Comprehensive analysis of all admission factors</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {improvementAreas.map((improvement) => (
                    <ImprovementCard
                      key={improvement.area}
                      area={improvement.area}
                      current={improvement.current}
                      target={improvement.target}
                      impact={improvement.impact}
                      priority={improvement.priority}
                      description={improvement.description}
                      actionable_steps={improvement.actionable_steps}
                    />
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="font-bold text-yellow-400 text-xl mb-1">Combined Improvement Potential</p>
                      <p className="text-white text-lg">By improving all areas above, you could increase your chances by <span className="font-bold text-yellow-400 text-2xl">+{improvementData?.combined_impact || 45}%</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Reduced */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 h-fit space-y-6">
            {/* Your Chance Card */}
            <motion.div 
              className="relative bg-gradient-to-br from-ROX_DARK_GRAY/80 via-ROX_BLACK/60 to-ROX_BLACK/80 border border-ROX_GOLD/30 rounded-3xl p-8 backdrop-blur-xl overflow-hidden group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ROX_GOLD/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-ROX_GOLD/20 via-transparent to-ROX_GOLD/20 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

              <div className="relative space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-ROX_GOLD" />
                  <h2 className="text-lg font-semibold text-white">Your Admission Chance</h2>
                </div>
                <CircularChance value={userChance} />
              </div>
            </motion.div>


            {/* Outcome Snapshot Card */}
            <motion.div 
              className="relative bg-gradient-to-br from-ROX_DARK_GRAY/80 via-ROX_BLACK/60 to-ROX_BLACK/80 border border-ROX_GOLD/30 rounded-3xl p-6 backdrop-blur-xl overflow-hidden group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ROX_GOLD/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <h2 className="text-lg font-semibold text-white mb-5">Outcome Breakdown</h2>
                <div className="space-y-5">
                  {outcomeRows.map((r) => (
                    <StatRow key={r.key} label={r.key} value={r.value} hint={r.hint} />
                  ))}
                </div>
              </div>
            </motion.div>


            {d.updatedAtISO && (
              <p className="text-xs text-neutral-500 px-2">Last updated: {new Date(d.updatedAtISO).toLocaleString()}</p>
            )}
          </div>
        </div>

        {/* Footer Meta */}
        <motion.div 
          className="mt-8 text-xs text-neutral-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Chancify estimates are based on statistical patterns in historical data and self-reported inputs. They do not account for subjective review factors and are not a guarantee of outcome.
        </motion.div>
      </div>
    </div>
  );
}