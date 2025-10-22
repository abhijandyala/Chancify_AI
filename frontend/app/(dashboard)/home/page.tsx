'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import { Input } from '@/components/ui/Input'
import { ROXSelect } from '@/components/ui/ROXSelect'
import { MajorAutocomplete } from '@/components/ui/MajorAutocomplete'
import { InfoIcon } from '@/components/ui/InfoIcon'
import { InfoModal } from '@/components/ui/InfoModal'
import CollegeCombobox from '@/components/CollegeCombobox'
import { Button } from '@/components/ui/Button'
import { useState, useEffect } from 'react'
import { COLLEGES } from '@/lib/colleges'
import { FACTOR_DESCRIPTIONS } from '@/lib/factorDescriptions'
import { motion } from 'framer-motion'
import { GraduationCap, Star, Building2, Calculator, Brain, Zap, Target, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [modalInfo, setModalInfo] = useState<{ isOpen: boolean; factor: string }>({
    isOpen: false,
    factor: ''
  })
  
  const [profile, setProfile] = useState({
    gpa_unweighted: '',
    gpa_weighted: '',
    sat: '',
    act: '',
    rigor: '5',
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
    college: '',
  })

  const updateProfile = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  // Handle Google OAuth success
  useEffect(() => {
    const handleGoogleAuthSuccess = () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search)
        const googleAuth = urlParams.get('google_auth')
        const email = urlParams.get('email')
        const name = urlParams.get('name')
        
        if (googleAuth === 'success' && email) {
          // Set auth token and user info
          localStorage.setItem('auth_token', 'google_oauth_' + Date.now())
          localStorage.setItem('user_email', email)
          if (name) localStorage.setItem('user_name', name)
          
          // Clean up URL parameters
          const newUrl = window.location.pathname
          window.history.replaceState({}, document.title, newUrl)
          
          // Trigger a custom event to notify header of auth change
          window.dispatchEvent(new CustomEvent('authStateChanged'))
        }
      }
    }
    
    handleGoogleAuthSuccess()
  }, [])

  // Validation function to check if all required fields are filled
  const isProfileComplete = () => {
    const requiredFields = ['gpa_unweighted', 'gpa_weighted']
    return requiredFields.every(field => profile[field as keyof typeof profile] && profile[field as keyof typeof profile].trim() !== '')
  }

  const openInfoModal = (factor: string) => {
    setModalInfo({ isOpen: true, factor })
  }

  const closeInfoModal = () => {
    setModalInfo({ isOpen: false, factor: '' })
  }

  const getFactorOptions = (factor: string) => {
    const factorDescriptions: { [key: string]: { [value: string]: string } } = {
      extracurricular_depth: {
        '10': '10 - Deep involvement in 2-3 activities',
        '8': '8 - Strong involvement in 1-2 activities',
        '6': '6 - Moderate involvement in multiple activities',
        '4': '4 - Light involvement in several activities',
        '2': '2 - Minimal or no extracurricular involvement'
      },
      leadership_positions: {
        '10': '10 - Multiple significant leadership roles',
        '8': '8 - Strong leadership in 1-2 roles',
        '6': '6 - Some leadership experience',
        '4': '4 - Minor leadership roles',
        '2': '2 - No leadership roles'
      },
      awards_publications: {
        '10': '10 - National/international recognition',
        '8': '8 - State/regional awards',
        '6': '6 - Local awards or publications',
        '4': '4 - School-level recognition',
        '2': '2 - No significant awards'
      },
      passion_projects: {
        '10': '10 - Exceptional personal projects',
        '8': '8 - Strong personal initiatives',
        '6': '6 - Some personal projects',
        '4': '4 - Basic personal projects',
        '2': '2 - No significant personal projects'
      },
      business_ventures: {
        '10': '10 - Successful business ventures',
        '8': '8 - Strong entrepreneurial experience',
        '6': '6 - Some business experience',
        '4': '4 - Basic business involvement',
        '2': '2 - No business experience'
      },
      volunteer_work: {
        '10': '10 - Extensive volunteer commitment',
        '8': '8 - Strong volunteer involvement',
        '6': '6 - Regular volunteer work',
        '4': '4 - Occasional volunteer work',
        '2': '2 - Minimal volunteer experience'
      },
      research_experience: {
        '10': '10 - Published research or significant projects',
        '8': '8 - Strong research involvement',
        '6': '6 - Some research experience',
        '4': '4 - Basic research exposure',
        '2': '2 - No research experience'
      },
      portfolio_audition: {
        '10': '10 - Exceptional portfolio/audition',
        '8': '8 - Strong portfolio/audition',
        '6': '6 - Good portfolio/audition',
        '4': '4 - Basic portfolio/audition',
        '2': '2 - No portfolio/audition required'
      },
      essay_quality: {
        '10': '10 - Exceptional writing quality',
        '8': '8 - Strong writing skills',
        '6': '6 - Good writing ability',
        '4': '4 - Basic writing skills',
        '2': '2 - Weak writing skills'
      },
      recommendations: {
        '10': '10 - Outstanding recommendations',
        '8': '8 - Strong recommendations',
        '6': '6 - Good recommendations',
        '4': '4 - Average recommendations',
        '2': '2 - Weak recommendations'
      },
      interview: {
        '10': '10 - Exceptional interview performance',
        '8': '8 - Strong interview skills',
        '6': '6 - Good interview performance',
        '4': '4 - Average interview',
        '2': '2 - Poor interview performance'
      },
      demonstrated_interest: {
        '10': '10 - High demonstrated interest',
        '8': '8 - Strong demonstrated interest',
        '6': '6 - Moderate demonstrated interest',
        '4': '4 - Basic demonstrated interest',
        '2': '2 - No demonstrated interest'
      },
      legacy_status: {
        '10': '10 - Strong legacy connection',
        '8': '8 - Moderate legacy connection',
        '6': '6 - Some legacy connection',
        '4': '4 - Weak legacy connection',
        '2': '2 - No legacy connection'
      },
      geographic_diversity: {
        '10': '10 - Highly underrepresented region',
        '8': '8 - Moderately underrepresented',
        '6': '6 - Somewhat underrepresented',
        '4': '4 - Slightly underrepresented',
        '2': '2 - Well-represented region'
      },
      firstgen_diversity: {
        '10': '10 - First-generation college student',
        '8': '8 - Strong diversity factors',
        '6': '6 - Some diversity factors',
        '4': '4 - Basic diversity factors',
        '2': '2 - No significant diversity factors'
      },
      hs_reputation: {
        '10': '10 - Highly prestigious high school',
        '8': '8 - Strong high school reputation',
        '6': '6 - Good high school reputation',
        '4': '4 - Average high school',
        '2': '2 - Weak high school reputation'
      }
    }

    const descriptions = factorDescriptions[factor] || {}
    return [
      { value: '10', label: descriptions['10'] || '10' },
      { value: '8', label: descriptions['8'] || '8' },
      { value: '6', label: descriptions['6'] || '6' },
      { value: '4', label: descriptions['4'] || '4' },
      { value: '2', label: descriptions['2'] || '2' },
    ]
  }

  const handleCalculateChances = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const predictionData = {
        gpa_unweighted: parseFloat(profile.gpa_unweighted) || 0,
        gpa_weighted: parseFloat(profile.gpa_weighted) || 0,
        sat: parseInt(profile.sat) || 0,
        act: parseInt(profile.act) || 0,
        rigor: parseInt(profile.rigor),
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
        college: profile.college,
      }
      
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

  const SectionHeader: React.FC<{ icon: React.ReactNode; title: string; subtitle?: string }> = ({ icon, title, subtitle }) => (
      <div className="flex items-start gap-3 mb-6">
        <div className="p-2 rounded-xl border border-white/10 bg-yellow-400/15 text-yellow-400 shadow-[0_0_40px_rgba(245,200,75,0.15)]">
          {icon}
        </div>
      <div>
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
      </div>
  )

  const FormFieldWithInfo = ({ label, factor, children }:{ label: string; factor: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs md:text-sm font-semibold text-gray-300">{label}</label>
        <InfoIcon onClick={() => openInfoModal(factor)} />
      </div>
      {children}
    </div>
  )

  const enter = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { type: 'spring' as const, stiffness: 120, damping: 20, mass: 0.6 },
    viewport: { once: true, margin: '-10% 0px -10% 0px' }
  }

  return (
    <div className="rox-section">
      {/* Header */}
      <motion.div {...enter} className="text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-yellow-300 mb-6">
          <Brain className="w-4 h-4" />
          <span className="text-sm font-semibold">AI Assessment</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-yellow-400 mb-6">
          Chancify AI
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          The only AI that considers your unique story — not just numbers
        </p>
      </motion.div>

      {/* Academic Foundation */}
      <motion.section {...enter}>
        <div className="rox-card">
          <SectionHeader icon={<GraduationCap className="w-5 h-5" />} title="Academic Foundation" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Input
              label="Unweighted GPA (4.0)"
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
              label="Weighted GPA (5.0)"
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
          </div>
        </div>
      </motion.section>

      {/* Your Unique Story */}
      <motion.section {...enter}>
        <div className="rox-card">
          <SectionHeader 
            icon={<Star className="w-5 h-5" />} 
            title="Your Unique Story" 
            subtitle="The holistic factors most other predictors ignore." 
          />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['Extracurricular Depth', 'extracurricular_depth'],
              ['Leadership Positions', 'leadership_positions'],
              ['Awards & Publications', 'awards_publications'],
              ['Passion Projects', 'passion_projects'],
              ['Business Ventures', 'business_ventures'],
              ['Volunteer Work', 'volunteer_work'],
              ['Research Experience', 'research_experience'],
              ['Portfolio/Audition', 'portfolio_audition'],
              ['Essay Quality', 'essay_quality'],
              ['Recommendations', 'recommendations'],
              ['Interview', 'interview'],
              ['Demonstrated Interest', 'demonstrated_interest'],
              ['Legacy Status', 'legacy_status'],
              ['Geographic Diversity', 'geographic_diversity'],
              ['First-Gen/Diversity', 'firstgen_diversity'],
            ].map(([label, key]) => (
              <FormFieldWithInfo key={key} label={label} factor={key}>
                <ROXSelect 
                  value={(profile as any)[key]} 
                  onChange={(v) => updateProfile(key, v)} 
                  options={getFactorOptions(key)} 
                />
              </FormFieldWithInfo>
            ))}
            
            
            {/* High School Reputation */}
            <FormFieldWithInfo label="High School Reputation" factor="hs_reputation">
              <ROXSelect 
            value={profile.hs_reputation}
                onChange={(v) => updateProfile('hs_reputation', v)} 
                options={getFactorOptions('hs_reputation')} 
              />
            </FormFieldWithInfo>
          </div>
        </div>
      </motion.section>

      {/* Next Button */}
      <motion.section {...enter}>
        <div className="rox-card">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">
                {isProfileComplete() ? 'Ready to Explore?' : 'Complete Your Profile'}
              </h2>
              <p className="text-gray-400">
                {isProfileComplete() 
                  ? 'Your profile is complete. Let\'s discover colleges that match your unique story.'
                  : 'Please fill in your GPA information to continue to college discovery.'
                }
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => {
                  // Save logic will be added later
                  console.log('Save profile clicked')
                }}
                variant="ghost"
                className="rox-button-ghost text-lg px-8 py-4 flex items-center gap-3 border-2 border-white/20 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300"
              >
                <span>Save</span>
              </Button>
              
              <Button 
                onClick={() => router.push('/college-details')}
                disabled={!isProfileComplete()}
                className={`text-lg px-8 py-4 flex items-center gap-3 transition-all duration-300 ${
                  isProfileComplete() 
                    ? 'rox-button' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            
            {!isProfileComplete() && (
              <p className="text-sm text-gray-500 mt-2">
                Required: Unweighted GPA and Weighted GPA
              </p>
            )}
          </div>
        </div>
      </motion.section>

      {/* Info Modal */}
      <InfoModal
        isOpen={modalInfo.isOpen}
        onClose={closeInfoModal}
        title={modalInfo.factor ? FACTOR_DESCRIPTIONS[modalInfo.factor as keyof typeof FACTOR_DESCRIPTIONS]?.title || '' : ''}
        description={modalInfo.factor ? FACTOR_DESCRIPTIONS[modalInfo.factor as keyof typeof FACTOR_DESCRIPTIONS]?.description || '' : ''}
        examples={modalInfo.factor ? FACTOR_DESCRIPTIONS[modalInfo.factor as keyof typeof FACTOR_DESCRIPTIONS]?.examples || [] : []}
      />
    </div>
  )
}
