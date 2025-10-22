'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { SimpleSearchableSelect } from '@/components/ui/SimpleSearchableSelect'
import { SimpleSelect } from '@/components/ui/SimpleSelect'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { MAJORS } from '@/lib/majors'
import { COLLEGES } from '@/lib/colleges'
import Reveal from '@/components/ui/Reveal'
import { motion } from 'framer-motion'
import { GraduationCap, Target, Star, TrendingUp, Award, Users, Building2, Calculator } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const [profile, setProfile] = useState({
    // Academic Basics
    gpa_unweighted: '',
    gpa_weighted: '',
    sat: '',
    act: '',
    rigor: '5',
    
    // UNIQUE FACTORS - What makes Chancify AI special!
    extracurricular_depth: '5',
    leadership_positions: '5',
    awards_publications: '5',
    passion_projects: '5',
    business_ventures: '5',
    volunteer_work: '5',
    research_experience: '5',
    portfolio_audition: '5',
    essay_quality: '5',
    recommendations: '5',
    interview: '5',
    demonstrated_interest: '5',
    legacy_status: '5',
    geographic_diversity: '5',
    firstgen_diversity: '5',
    major: '',
    hs_reputation: '5',
    
    // College Selection
    college: '',
  })

  const updateProfile = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  const handleCalculateChances = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Prepare data for ML model
      const predictionData = {
        // Academic data
        gpa_unweighted: parseFloat(profile.gpa_unweighted) || 0,
        gpa_weighted: parseFloat(profile.gpa_weighted) || 0,
        sat: parseInt(profile.sat) || 0,
        act: parseInt(profile.act) || 0,
        rigor: parseInt(profile.rigor),
        
        // Unique factors
        extracurricular_depth: parseInt(profile.extracurricular_depth),
        leadership_positions: parseInt(profile.leadership_positions),
        awards_publications: parseInt(profile.awards_publications),
        passion_projects: parseInt(profile.passion_projects),
        business_ventures: parseInt(profile.business_ventures),
        volunteer_work: parseInt(profile.volunteer_work),
        research_experience: parseInt(profile.research_experience),
        portfolio_audition: parseInt(profile.portfolio_audition),
        essay_quality: parseInt(profile.essay_quality),
        recommendations: parseInt(profile.recommendations),
        interview: parseInt(profile.interview),
        demonstrated_interest: parseInt(profile.demonstrated_interest),
        legacy_status: parseInt(profile.legacy_status),
        geographic_diversity: parseInt(profile.geographic_diversity),
        firstgen_diversity: parseInt(profile.firstgen_diversity),
        major: profile.major,
        hs_reputation: parseInt(profile.hs_reputation),
        
        // College selection
        college: profile.college,
      }
      
      // Make API call to backend
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(predictionData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to get prediction')
      }
      
      const result = await response.json()
      
      // Redirect to results page with prediction data
      const params = new URLSearchParams({
        probability: result.probability.toString(),
        outcome: result.outcome,
        college: profile.college,
      })
      
      router.push(`/dashboard/results?${params.toString()}`)
      
    } catch (error) {
      console.error('Error calculating chances:', error)
      alert('Failed to calculate chances. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/50 to-black/80 backdrop-blur-xl border border-gray-800/50 p-8 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-transparent"></div>
          <div className="relative text-center">
            <motion.h1 
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Welcome to Chancify AI
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              The only AI that considers your unique story - not just numbers
            </motion.p>
            <motion.div 
              className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-400/20 p-6 rounded-2xl backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <p className="text-yellow-200 font-medium">
                <span className="text-yellow-400 font-bold">What makes us different:</span> While others only look at GPA and test scores, 
                we analyze your leadership, passion projects, research, awards, and the complete picture 
                of who you are as a person.
              </p>
            </motion.div>
            <motion.p 
              className="text-xs text-gray-500 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              *Predictions are based on statistical analysis and historical data. 
              Results are estimates and may not reflect actual admission outcomes.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Academic Foundation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-xl border border-gray-800/30 p-8 hover:border-yellow-400/30 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/3 to-transparent"></div>
          <div className="relative">
            <motion.div 
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30">
                <GraduationCap className="w-6 h-6 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Academic Foundation
              </h2>
            </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Input
            label="Unweighted GPA (4.0 scale)"
            type="number"
            step="0.01"
            min="0"
            max="4"
            placeholder="3.85"
            value={profile.gpa_unweighted}
            onChange={(e) => updateProfile('gpa_unweighted', e.target.value)}
            helperText="GPA without honors/AP weighting"
          />
          
          <Input
            label="Weighted GPA (5.0 scale)"
            type="number"
            step="0.01"
            min="0"
            max="5"
            placeholder="4.25"
            value={profile.gpa_weighted}
            onChange={(e) => updateProfile('gpa_weighted', e.target.value)}
            helperText="GPA with honors/AP weighting"
          />
          
          <Input
            label="SAT Score"
            type="number"
            min="400"
            max="1600"
            placeholder="1450"
            value={profile.sat}
            onChange={(e) => updateProfile('sat', e.target.value)}
            helperText="Total SAT score (optional)"
          />
          
          <Input
            label="ACT Score"
            type="number"
            min="1"
            max="36"
            placeholder="32"
            value={profile.act}
            onChange={(e) => updateProfile('act', e.target.value)}
            helperText="ACT composite (optional)"
          />
          
          <Select
            label="Course Rigor"
            value={profile.rigor}
            onChange={(e) => updateProfile('rigor', e.target.value)}
            options={[
              { value: '10', label: '10 - Most Rigorous (Many AP/IB)' },
              { value: '8', label: '8 - Very Rigorous (Several AP/IB)' },
              { value: '6', label: '6 - Rigorous (Some AP/Honors)' },
              { value: '4', label: '4 - Moderate (Few AP/Honors)' },
              { value: '2', label: '2 - Standard (Regular courses)' },
            ]}
          />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Your Unique Story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-xl border border-gray-800/30 p-8 hover:border-yellow-400/30 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/3 to-transparent"></div>
          <div className="relative">
            <motion.div 
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Your Unique Story - What Makes You Special
              </h2>
            </motion.div>
            <motion.p 
              className="text-gray-300 mb-8 text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              These are the factors that set Chancify AI apart from other college predictors. 
              We understand that you're more than just numbers!
            </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Select
            label="Extracurricular Depth"
            value={profile.extracurricular_depth}
            onChange={(e) => updateProfile('extracurricular_depth', e.target.value)}
            options={[
              { value: '10', label: '3+ years, leadership roles, national recognition, measurable impact' },
              { value: '9', label: '3+ years, officer positions, regional recognition, clear achievements' },
              { value: '8', label: '2+ years, significant involvement, local recognition, organized events' },
              { value: '7', label: '2+ years, active member, some leadership, regular participation' },
              { value: '6', label: '1-2 years, committed member, consistent attendance, some contribution' },
              { value: '5', label: '1+ years, regular member, occasional participation, basic involvement' },
              { value: '4', label: 'Less than 1 year, irregular attendance, minimal contribution' },
              { value: '3', label: 'Joined recently, very limited involvement, just getting started' },
              { value: '2', label: 'Minimal participation, mostly inactive, very little time commitment' },
              { value: '1', label: 'No real involvement, just signed up, no meaningful participation' },
            ]}
          />

          <Select
            label="Leadership Positions"
            value={profile.leadership_positions}
            onChange={(e) => updateProfile('leadership_positions', e.target.value)}
            options={[
              { value: '10', label: 'President/Founder of 3+ organizations, board positions, executive roles' },
              { value: '9', label: 'President/VP of major clubs, team captain, committee chair' },
              { value: '8', label: 'Vice President/Secretary of 2+ clubs, section leader, project manager' },
              { value: '7', label: 'Officer in 1-2 clubs, team leader, event coordinator' },
              { value: '6', label: 'Treasurer/Historian, small group leader, mentor role' },
              { value: '5', label: 'Committee member, peer tutor, occasional leadership tasks' },
              { value: '4', label: 'Helped organize 1-2 events, led small projects, informal leader' },
              { value: '3', label: 'Minimal leadership, mostly follower, occasional initiative' },
              { value: '2', label: 'Very little leadership experience, mostly passive participation' },
              { value: '1', label: 'No leadership roles, always follows others, no initiative shown' },
            ]}
          />

          <Select
            label="Awards & Publications"
            value={profile.awards_publications}
            onChange={(e) => updateProfile('awards_publications', e.target.value)}
            options={[
              { value: '10', label: 'National/international awards, published research, major competitions (ISEF, Regeneron)' },
              { value: '9', label: 'National honors, published work, top 1% in competitions, academic journals' },
              { value: '8', label: 'State/regional awards, published articles, top 5% competitions, conference presentations' },
              { value: '7', label: 'State recognition, local publications, regional competitions, academic honors' },
              { value: '6', label: 'Local awards, school publications, county/district competitions, honor roll' },
              { value: '5', label: 'School-level awards, club recognition, participation certificates, good grades' },
              { value: '4', label: 'Minor school recognition, attendance awards, basic academic achievement' },
              { value: '3', label: 'Very limited recognition, mostly participation, few achievements' },
              { value: '2', label: 'Minimal awards, mostly just showing up, very little recognition' },
              { value: '1', label: 'No significant awards or publications, no notable recognition' },
            ]}
          />

          <Select
            label="Passion Projects"
            value={profile.passion_projects}
            onChange={(e) => updateProfile('passion_projects', e.target.value)}
            options={[
              { value: '10', label: 'Revolutionary impact, thousands of users, media coverage, funding received' },
              { value: '9', label: 'Major impact, hundreds of users, significant outcomes, partnerships formed' },
              { value: '8', label: 'Substantial impact, dozens of users, measurable results, recognition gained' },
              { value: '7', label: 'Good impact, clear outcomes, active users, regular progress made' },
              { value: '6', label: 'Meaningful progress, some users, consistent work, clear goals achieved' },
              { value: '5', label: 'Decent progress, basic functionality, occasional users, steady development' },
              { value: '4', label: 'Some progress, early stages, limited users, working on features' },
              { value: '3', label: 'Minimal progress, mostly planning, very few users, basic prototype' },
              { value: '2', label: 'Little progress, mostly ideas, no real users, struggling to start' },
              { value: '1', label: 'No real projects, just ideas, no execution, no meaningful progress' },
            ]}
          />

          <Select
            label="Business Ventures"
            value={profile.business_ventures}
            onChange={(e) => updateProfile('business_ventures', e.target.value)}
            options={[
              { value: '10', label: 'Successful startup, $10K+ revenue, multiple customers, business registered' },
              { value: '9', label: 'Profitable business, $5K+ revenue, growing customer base, clear business model' },
              { value: '8', label: 'Active business, $1K+ revenue, regular customers, ongoing operations' },
              { value: '7', label: 'Business with sales, some revenue, customer base building, operational' },
              { value: '6', label: 'Business venture started, first sales made, early customers, learning' },
              { value: '5', label: 'Business idea developed, prototype created, testing market, planning launch' },
              { value: '4', label: 'Business concept formed, researching market, early planning stages' },
              { value: '3', label: 'Some business ideas, minimal execution, mostly theoretical' },
              { value: '2', label: 'Very basic business thinking, no real execution, mostly ideas' },
              { value: '1', label: 'No business ventures, no entrepreneurial experience, no business ideas' },
            ]}
          />

          <Select
            label="Volunteer Work"
            value={profile.volunteer_work}
            onChange={(e) => updateProfile('volunteer_work', e.target.value)}
            options={[
              { value: '10', label: '500+ hours, founded organization, major community impact, leadership role' },
              { value: '9', label: '300+ hours, organized major events, significant community contribution' },
              { value: '8', label: '200+ hours, regular volunteer, organized events, clear community impact' },
              { value: '7', label: '100+ hours, consistent volunteer, helped organize activities, good impact' },
              { value: '6', label: '50+ hours, regular participation, helped with events, meaningful contribution' },
              { value: '5', label: '25+ hours, occasional volunteer, participated in activities, some contribution' },
              { value: '4', label: '10+ hours, minimal volunteering, mostly just showing up, limited impact' },
              { value: '3', label: '5+ hours, very occasional volunteer, very limited involvement' },
              { value: '2', label: 'Less than 5 hours, mostly one-time events, minimal commitment' },
              { value: '1', label: 'No volunteer work, no community service, no meaningful contribution' },
            ]}
          />

          <Select
            label="Research Experience"
            value={profile.research_experience}
            onChange={(e) => updateProfile('research_experience', e.target.value)}
            options={[
              { value: '10', label: 'Published research, conference presentations, peer-reviewed journals, ISEF/Regeneron' },
              { value: '9', label: 'Research submitted for publication, conference presentations, significant findings' },
              { value: '8', label: 'Substantial research project, presented findings, university collaboration' },
              { value: '7', label: 'Independent research project, data collection, analysis completed, report written' },
              { value: '6', label: 'Research assistant role, helped with data collection, learned research methods' },
              { value: '5', label: 'Classroom research project, basic data analysis, learned research basics' },
              { value: '4', label: 'Limited research experience, mostly reading papers, minimal hands-on work' },
              { value: '3', label: 'Very basic research exposure, mostly theoretical, no practical experience' },
              { value: '2', label: 'Minimal research knowledge, very limited exposure to research methods' },
              { value: '1', label: 'No research experience, no understanding of research process' },
            ]}
          />

          <Select
            label="Portfolio/Audition"
            value={profile.portfolio_audition}
            onChange={(e) => updateProfile('portfolio_audition', e.target.value)}
            options={[
              { value: '10', label: '10 - Professional-level portfolio' },
              { value: '8', label: '8 - Strong creative work' },
              { value: '6', label: '6 - Good creative projects' },
              { value: '4', label: '4 - Some creative work' },
              { value: '2', label: '2 - Limited creative portfolio' },
            ]}
          />

          <Select
            label="Essay Quality"
            value={profile.essay_quality}
            onChange={(e) => updateProfile('essay_quality', e.target.value)}
            options={[
              { value: '10', label: 'Award-winning essays, published writing, exceptional storytelling, unique voice' },
              { value: '9', label: 'Exceptional writing, compelling narratives, strong personal voice, well-crafted' },
              { value: '8', label: 'Very strong essays, clear personal story, engaging writing, good structure' },
              { value: '7', label: 'Strong essays, personal anecdotes, good writing skills, clear message' },
              { value: '6', label: 'Good essays, some personal elements, decent writing, clear communication' },
              { value: '5', label: 'Decent essays, basic personal story, adequate writing, room for improvement' },
              { value: '4', label: 'Average essays, limited personal insight, basic writing skills, generic content' },
              { value: '3', label: 'Weak essays, little personal voice, poor structure, unclear message' },
              { value: '2', label: 'Poor essays, no personal insight, significant writing issues, needs major work' },
              { value: '1', label: 'Very poor essays, no voice, major writing problems, not college-ready' },
            ]}
          />

          <Select
            label="Recommendations"
            value={profile.recommendations}
            onChange={(e) => updateProfile('recommendations', e.target.value)}
            options={[
              { value: '10', label: '10 - Glowing recommendations' },
              { value: '8', label: '8 - Very strong recommendations' },
              { value: '6', label: '6 - Good recommendations' },
              { value: '4', label: '4 - Decent recommendations' },
              { value: '2', label: '2 - Weak recommendations' },
            ]}
          />

          <Select
            label="Interview Performance"
            value={profile.interview}
            onChange={(e) => updateProfile('interview', e.target.value)}
            options={[
              { value: '10', label: '10 - Outstanding interview skills' },
              { value: '8', label: '8 - Strong interview performance' },
              { value: '6', label: '6 - Good interview abilities' },
              { value: '4', label: '4 - Decent interview skills' },
              { value: '2', label: '2 - Interview skills need work' },
            ]}
          />

          <Select
            label="Demonstrated Interest"
            value={profile.demonstrated_interest}
            onChange={(e) => updateProfile('demonstrated_interest', e.target.value)}
            options={[
              { value: '10', label: '10 - Extensive demonstrated interest' },
              { value: '8', label: '8 - Strong interest shown' },
              { value: '6', label: '6 - Good interest demonstrated' },
              { value: '4', label: '4 - Some interest shown' },
              { value: '2', label: '2 - Limited interest demonstrated' },
            ]}
          />

          <Select
            label="Legacy Status"
            value={profile.legacy_status}
            onChange={(e) => updateProfile('legacy_status', e.target.value)}
            options={[
              { value: '10', label: '10 - Strong legacy connection' },
              { value: '8', label: '8 - Good legacy connection' },
              { value: '6', label: '6 - Some legacy connection' },
              { value: '4', label: '4 - Limited legacy connection' },
              { value: '2', label: '2 - No legacy connection' },
            ]}
          />

          <Select
            label="Geographic Diversity"
            value={profile.geographic_diversity}
            onChange={(e) => updateProfile('geographic_diversity', e.target.value)}
            options={[
              { value: '10', label: '10 - Highly diverse geographic background' },
              { value: '8', label: '8 - Good geographic diversity' },
              { value: '6', label: '6 - Some geographic diversity' },
              { value: '4', label: '4 - Limited geographic diversity' },
              { value: '2', label: '2 - No geographic diversity factor' },
            ]}
          />

          <Select
            label="First-Gen/Diversity"
            value={profile.firstgen_diversity}
            onChange={(e) => updateProfile('firstgen_diversity', e.target.value)}
            options={[
              { value: '10', label: '10 - First-gen + diverse background' },
              { value: '8', label: '8 - First-gen OR diverse background' },
              { value: '6', label: '6 - Some diversity factors' },
              { value: '4', label: '4 - Limited diversity factors' },
              { value: '2', label: '2 - No diversity factors' },
            ]}
          />

          <SimpleSelect
            label="Intended Major"
            value={profile.major}
            onChange={(value) => updateProfile('major', value)}
            options={MAJORS}
            placeholder="Search for your major..."
          />

          <Select
            label="High School Reputation"
            value={profile.hs_reputation}
            onChange={(e) => updateProfile('hs_reputation', e.target.value)}
            options={[
              { value: '10', label: '10 - Elite high school' },
              { value: '8', label: '8 - Very strong high school' },
              { value: '6', label: '6 - Good high school' },
              { value: '4', label: '4 - Average high school' },
              { value: '2', label: '2 - Below average high school' },
            ]}
          />
            </div>
          </div>
        </div>
      </motion.div>

      {/* College Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-xl border border-gray-800/30 p-8 hover:border-yellow-400/30 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/3 to-transparent"></div>
          <div className="relative">
            <motion.div 
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30">
                <Building2 className="w-6 h-6 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                College Selection
              </h2>
            </motion.div>
            <motion.p 
              className="text-gray-300 mb-8 text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              Choose the college you want to predict your chances for. Our AI will analyze your profile against their specific admission criteria.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <SimpleSearchableSelect
                label="Select Your Target College"
                value={profile.college}
                onChange={(value) => updateProfile('college', value)}
                options={COLLEGES}
                placeholder="Search for your college..."
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="flex gap-4 justify-center"
      >
        <form onSubmit={handleCalculateChances}>
          <Button 
            type="submit"
            disabled={isLoading || !profile.college}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="w-5 h-5" />
                Calculate My Chances
              </>
            )}
          </Button>
        </form>
        <Button variant="ghost" className="text-lg px-8 py-4 border border-gray-700 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300">
          Save Profile
        </Button>
      </motion.div>

    </div>
  )
}
