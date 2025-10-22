'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import { Input } from '@/components/ui/Input'
import { ROXSelect } from '@/components/ui/ROXSelect'
import { MajorAutocomplete } from '@/components/ui/MajorAutocomplete'
import { InfoIcon } from '@/components/ui/InfoIcon'
import { InfoModal } from '@/components/ui/InfoModal'
import CollegeCombobox from '@/components/CollegeCombobox'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { COLLEGES } from '@/lib/colleges'
import { FACTOR_DESCRIPTIONS } from '@/lib/factorDescriptions'
import { motion } from 'framer-motion'
import { GraduationCap, Star, Building2, Calculator, Brain, Zap, Target } from 'lucide-react'
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
    setProfile({ ...profile, [field]: value })
  }

  const openInfoModal = (factor: string) => {
    setModalInfo({ isOpen: true, factor })
  }

  const closeInfoModal = () => {
    setModalInfo({ isOpen: false, factor: '' })
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
      <div className="p-2 rounded-xl border border-white/10 bg-gradient-to-br from-yellow-400/15 to-amber-600/15 text-yellow-400 shadow-[0_0_40px_rgba(245,200,75,0.15)]">
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
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight gradient-text mb-6">
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
                  options={[
                    { value: '10', label: '10' },
                    { value: '8', label: '8' },
                    { value: '6', label: '6' },
                    { value: '4', label: '4' },
                    { value: '2', label: '2' },
                  ]} 
                />
              </FormFieldWithInfo>
            ))}
            
            {/* Intended Major */}
            <FormFieldWithInfo label="Intended Major" factor="major">
              <input
                type="text"
                value={profile.major}
                onChange={(e) => updateProfile('major', e.target.value)}
                placeholder="e.g., Computer Science, Business, Medicine..."
                className="input-glass w-full"
              />
            </FormFieldWithInfo>
            
            {/* High School Reputation */}
            <FormFieldWithInfo label="High School Reputation" factor="hs_reputation">
              <ROXSelect 
                value={profile.hs_reputation} 
                onChange={(v) => updateProfile('hs_reputation', v)} 
                options={[
                  { value: '10', label: '10' },
                  { value: '8', label: '8' },
                  { value: '6', label: '6' },
                  { value: '4', label: '4' },
                  { value: '2', label: '2' },
                ]} 
              />
            </FormFieldWithInfo>
          </div>
        </div>
      </motion.section>

      {/* College & Actions */}
      <motion.section {...enter}>
        <div className="rox-card">
          <SectionHeader icon={<Building2 className="w-5 h-5" />} title="College Selection" />
          <div className="space-y-4">
            <CollegeCombobox 
              value={profile.college} 
              onChange={(v) => updateProfile('college', v)} 
              options={COLLEGES} 
              className="w-full" 
              placeholder="Search for your college…" 
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <form onSubmit={handleCalculateChances} className="flex-1">
                <Button 
                  type="submit" 
                  disabled={isLoading || !profile.college} 
                  className="w-full rox-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
                      Calculating…
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
                className="flex-1 rox-button-ghost"
              >
                Save Profile
              </Button>
            </div>
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