'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { SimpleSearchableSelect } from '@/components/ui/SimpleSearchableSelect'
import { SimpleSelect } from '@/components/ui/SimpleSelect'
import CollegeCombobox from '@/components/CollegeCombobox'
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
      
      router.push(`/results?${params.toString()}`)
      
    } catch (error) {
      console.error('Error calculating chances:', error)
      alert('Failed to calculate chances. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 w-full max-w-4xl"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-white bg-clip-text text-transparent">
          Chancify AI
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          The only AI that considers your unique story - not just numbers
        </p>
      </motion.div>

      {/* Main Form Container */}
      <div className="w-full max-w-4xl space-y-6">

        {/* Academic Foundation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30">
              <GraduationCap className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Academic Foundation</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
        </motion.div>

        {/* Your Unique Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6 overflow-visible"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Your Unique Story</h2>
          </div>
          <p className="text-gray-300 mb-6">
            These factors set Chancify AI apart from other college predictors.
          </p>
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-visible">
            <Select
              label="Extracurricular Depth"
              value={profile.extracurricular_depth}
              onChange={(e) => updateProfile('extracurricular_depth', e.target.value)}
              options={[
                { value: '10', label: '10 - Exceptional depth & impact' },
                { value: '8', label: '8 - Strong depth & impact' },
                { value: '6', label: '6 - Good depth & impact' },
                { value: '4', label: '4 - Moderate depth & impact' },
                { value: '2', label: '2 - Limited depth & impact' },
              ]}
            />
            
            <Select
              label="Leadership Positions"
              value={profile.leadership_positions}
              onChange={(e) => updateProfile('leadership_positions', e.target.value)}
              options={[
                { value: '10', label: '10 - Multiple significant leadership roles' },
                { value: '8', label: '8 - Strong leadership in 1-2 roles' },
                { value: '6', label: '6 - Some leadership experience' },
                { value: '4', label: '4 - Minor leadership roles' },
                { value: '2', label: '2 - No leadership roles' },
              ]}
            />
            
            <Select
              label="Awards & Publications"
              value={profile.awards_publications}
              onChange={(e) => updateProfile('awards_publications', e.target.value)}
              options={[
                { value: '10', label: '10 - National/International awards/publications' },
                { value: '8', label: '8 - State/Regional awards/publications' },
                { value: '6', label: '6 - School/Local awards/publications' },
                { value: '4', label: '4 - Minor recognition' },
                { value: '2', label: '2 - No significant awards/publications' },
              ]}
            />
            
            <Select
              label="Passion Projects"
              value={profile.passion_projects}
              onChange={(e) => updateProfile('passion_projects', e.target.value)}
              options={[
                { value: '10', label: '10 - Multiple, highly innovative projects' },
                { value: '8', label: '8 - 1-2 significant, well-developed projects' },
                { value: '6', label: '6 - Some developed projects' },
                { value: '4', label: '4 - Basic projects' },
                { value: '2', label: '2 - No significant projects' },
              ]}
            />
            
            <Select
              label="Business Ventures"
              value={profile.business_ventures}
              onChange={(e) => updateProfile('business_ventures', e.target.value)}
              options={[
                { value: '10', label: '10 - Successful, revenue-generating venture' },
                { value: '8', label: '8 - Developed venture with traction' },
                { value: '6', label: '6 - Business idea with some execution' },
                { value: '4', label: '4 - Basic business idea' },
                { value: '2', label: '2 - No business ventures' },
              ]}
            />
            
            <Select
              label="Volunteer Work"
              value={profile.volunteer_work}
              onChange={(e) => updateProfile('volunteer_work', e.target.value)}
              options={[
                { value: '10', label: '10 - 200+ hours, significant impact' },
                { value: '8', label: '8 - 100+ hours, good impact' },
                { value: '6', label: '6 - 50+ hours, some impact' },
                { value: '4', label: '4 - 25+ hours, limited impact' },
                { value: '2', label: '2 - Less than 25 hours' },
              ]}
            />
            
            <Select
              label="Research Experience"
              value={profile.research_experience}
              onChange={(e) => updateProfile('research_experience', e.target.value)}
              options={[
                { value: '10', label: '10 - Published/presented research' },
                { value: '8', label: '8 - Significant research project' },
                { value: '6', label: '6 - Some research involvement' },
                { value: '4', label: '4 - Minor research exposure' },
                { value: '2', label: '2 - No research experience' },
              ]}
            />
            
            <Select
              label="Portfolio/Audition"
              value={profile.portfolio_audition}
              onChange={(e) => updateProfile('portfolio_audition', e.target.value)}
              options={[
                { value: '10', label: '10 - Exceptional portfolio/audition' },
                { value: '8', label: '8 - Strong portfolio/audition' },
                { value: '6', label: '6 - Good portfolio/audition' },
                { value: '4', label: '4 - Decent portfolio/audition' },
                { value: '2', label: '2 - No portfolio/audition' },
              ]}
            />
            
            <Select
              label="Essay Quality"
              value={profile.essay_quality}
              onChange={(e) => updateProfile('essay_quality', e.target.value)}
              options={[
                { value: '10', label: '10 - Outstanding, unique essays' },
                { value: '8', label: '8 - Strong, compelling essays' },
                { value: '6', label: '6 - Good, well-written essays' },
                { value: '4', label: '4 - Decent essays' },
                { value: '2', label: '2 - Weak essays' },
              ]}
            />

            <Select
              label="Recommendations"
              value={profile.recommendations}
              onChange={(e) => updateProfile('recommendations', e.target.value)}
              options={[
                { value: '10', label: '10 - Exceptional recommendations' },
                { value: '8', label: '8 - Strong recommendations' },
                { value: '6', label: '6 - Good recommendations' },
                { value: '4', label: '4 - Average recommendations' },
                { value: '2', label: '2 - Weak recommendations' },
              ]}
            />

            <Select
              label="Interview"
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
                { value: '4', label: '4 - Minor legacy connection' },
                { value: '2', label: '2 - No legacy connection' },
              ]}
            />

            <Select
              label="Geographic Diversity"
              value={profile.geographic_diversity}
              onChange={(e) => updateProfile('geographic_diversity', e.target.value)}
              options={[
                { value: '10', label: '10 - Highly underrepresented region' },
                { value: '8', label: '8 - Underrepresented region' },
                { value: '6', label: '6 - Some geographic diversity' },
                { value: '4', label: '4 - Limited geographic diversity' },
                { value: '2', label: '2 - No geographic diversity' },
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
        </motion.div>

        {/* College Selection & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30">
              <Building2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">College Selection</h2>
          </div>
          
          <div className="space-y-6">
            <CollegeCombobox
              value={profile.college}
              onChange={(v) => updateProfile('college', v)}
              options={COLLEGES}
              className="max-w-3xl"
              placeholder="Search for your college…"
            />

            <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
              <form onSubmit={handleCalculateChances} className="flex-1">
                <Button 
                  type="submit"
                  disabled={isLoading || !profile.college}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold text-lg px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              <Button 
                variant="ghost" 
                className="flex-1 text-lg px-6 py-4 border border-gray-700 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300"
              >
                Save Profile
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}