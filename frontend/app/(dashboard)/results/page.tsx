'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, ArrowLeft, TrendingUp, Target, Brain, BarChart3, Zap, MapPin, DollarSign, Users, Calendar, Award, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { COLLEGES } from '@/lib/colleges'
import { Suspense, useState, useEffect } from 'react'
import { useCollegeInfo } from '@/lib/hooks/useCollegeInfo'
import { CollegeInfoDisplay } from '@/components/ui/CollegeInfoDisplay'

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const probability = parseFloat(searchParams.get('probability') || '0')
  const outcome = searchParams.get('outcome') || 'Unknown'
  const collegeId = searchParams.get('college') || ''
  const realAcceptanceRate = parseFloat(searchParams.get('realAcceptanceRate') || '0')
  const profileData = searchParams.get('profile') || '{}'
  
  // Parse user profile data
  const userProfile = JSON.parse(profileData)
  
  // Find the college name from the college ID
  const selectedCollege = COLLEGES.find(college => college.value === collegeId)
  const collegeName = selectedCollege?.label || 'Selected College'
  
  // Fetch real college information using OpenAI
  const { data: collegeInfo, loading: collegeInfoLoading, error: collegeInfoError } = useCollegeInfo(collegeName)
  
  // Analyze user profile for dynamic efficiency scores
  const analyzeUserProfile = () => {
    const analysis = {
      academic: {
        score: 0,
        label: 'Unknown',
        details: []
      },
      extracurricular: {
        score: 0,
        label: 'Unknown', 
        details: []
      },
      essays: {
        score: 0,
        label: 'Unknown',
        details: []
      },
      uniqueFactors: {
        score: 0,
        label: 'Unknown',
        details: []
      }
    }

    // Academic Performance Analysis
    const gpaUnweighted = parseFloat(userProfile.gpa_unweighted || '0')
    const gpaWeighted = parseFloat(userProfile.gpa_weighted || '0')
    const sat = parseInt(userProfile.sat || '0')
    const act = parseInt(userProfile.act || '0')
    
    if (gpaUnweighted >= 3.8) {
      analysis.academic.score = 90
      analysis.academic.label = 'Excellent'
      analysis.academic.details.push(`Strong GPA: ${gpaUnweighted}`)
    } else if (gpaUnweighted >= 3.5) {
      analysis.academic.score = 75
      analysis.academic.label = 'Strong'
      analysis.academic.details.push(`Good GPA: ${gpaUnweighted}`)
    } else if (gpaUnweighted >= 3.0) {
      analysis.academic.score = 60
      analysis.academic.label = 'Good'
      analysis.academic.details.push(`Solid GPA: ${gpaUnweighted}`)
    } else {
      analysis.academic.score = 40
      analysis.academic.label = 'Needs Improvement'
      analysis.academic.details.push(`GPA: ${gpaUnweighted}`)
    }

    if (sat >= 1400) {
      analysis.academic.score = Math.max(analysis.academic.score, 90)
      analysis.academic.details.push(`Strong SAT: ${sat}`)
    } else if (sat >= 1200) {
      analysis.academic.score = Math.max(analysis.academic.score, 70)
      analysis.academic.details.push(`Good SAT: ${sat}`)
    }

    if (act >= 32) {
      analysis.academic.score = Math.max(analysis.academic.score, 90)
      analysis.academic.details.push(`Strong ACT: ${act}`)
    } else if (act >= 28) {
      analysis.academic.score = Math.max(analysis.academic.score, 70)
      analysis.academic.details.push(`Good ACT: ${act}`)
    }

    // Extracurricular Analysis
    const ecDepth = parseInt(userProfile.extracurricular_depth || '5')
    const leadership = parseInt(userProfile.leadership_positions || '5')
    const awards = parseInt(userProfile.awards_publications || '5')
    
    const ecScore = (ecDepth + leadership + awards) / 3 * 10
    analysis.extracurricular.score = Math.round(ecScore)
    
    if (ecScore >= 80) {
      analysis.extracurricular.label = 'Outstanding'
      analysis.extracurricular.details.push('Deep involvement in activities')
    } else if (ecScore >= 60) {
      analysis.extracurricular.label = 'Strong'
      analysis.extracurricular.details.push('Good activity involvement')
    } else if (ecScore >= 40) {
      analysis.extracurricular.label = 'Moderate'
      analysis.extracurricular.details.push('Some activity involvement')
    } else {
      analysis.extracurricular.label = 'Limited'
      analysis.extracurricular.details.push('Limited activity involvement')
    }

    // Essays & Recommendations Analysis
    const essayQuality = parseInt(userProfile.essay_quality || '5')
    const recommendations = parseInt(userProfile.recommendations || '5')
    
    const essayScore = (essayQuality + recommendations) / 2 * 10
    analysis.essays.score = Math.round(essayScore)
    
    if (essayScore >= 80) {
      analysis.essays.label = 'Excellent'
      analysis.essays.details.push('Strong writing and recommendations')
    } else if (essayScore >= 60) {
      analysis.essays.label = 'Good'
      analysis.essays.details.push('Solid essays and recommendations')
    } else {
      analysis.essays.label = 'Needs Work'
      analysis.essays.details.push('Focus on essay quality')
    }

    // Unique Factors Analysis
    const legacy = parseInt(userProfile.legacy_status || '5')
    const diversity = parseInt(userProfile.firstgen_diversity || '5')
    const geographic = parseInt(userProfile.geographic_diversity || '5')
    const research = parseInt(userProfile.research_experience || '5')
    
    const uniqueScore = (legacy + diversity + geographic + research) / 4 * 10
    analysis.uniqueFactors.score = Math.round(uniqueScore)
    
    if (uniqueScore >= 80) {
      analysis.uniqueFactors.label = 'Exceptional'
      analysis.uniqueFactors.details.push('Strong unique factors')
    } else if (uniqueScore >= 60) {
      analysis.uniqueFactors.label = 'Good'
      analysis.uniqueFactors.details.push('Some unique factors')
    } else {
      analysis.uniqueFactors.label = 'Standard'
      analysis.uniqueFactors.details.push('Standard profile factors')
    }

    return analysis
  }

  const profileAnalysis = analyzeUserProfile()
  
  const getOutcomeIcon = () => {
    switch (outcome) {
      case 'Acceptance':
        return <CheckCircle className="w-16 h-16 text-green-400" />
      case 'Rejection':
        return <XCircle className="w-16 h-16 text-red-400" />
      case 'Waitlist':
        return <Clock className="w-16 h-16 text-yellow-400" />
      default:
        return <Target className="w-16 h-16 text-gray-400" />
    }
  }
  
  const getOutcomeColor = () => {
    switch (outcome) {
      case 'Acceptance':
        return 'bg-green-400/20 border-green-400/30'
      case 'Rejection':
        return 'bg-red-400/20 border-red-400/30'
      case 'Waitlist':
        return 'bg-yellow-400/20 border-yellow-400/30'
      default:
        return 'bg-gray-400/20 border-gray-400/30'
    }
  }
  
  const getOutcomeTextColor = () => {
    switch (outcome) {
      case 'Acceptance':
        return 'text-green-400'
      case 'Rejection':
        return 'text-red-400'
      case 'Waitlist':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  const enter = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { type: 'spring' as const, stiffness: 120, damping: 20, mass: 0.6 },
    viewport: { once: true, margin: '-10% 0px -10% 0px' }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div {...enter} className="text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-yellow-300 mb-4">
          <Brain className="w-4 h-4" />
          <span className="text-sm font-semibold">AI Prediction Results</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-yellow-400 mb-4">
          Your Admission Analysis
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          AI-powered analysis for <span className="text-yellow-400 font-semibold">{collegeName}</span>
        </p>
      </motion.div>

      {/* Main Results Card */}
      <motion.div
        {...enter}
        className={`relative overflow-hidden rounded-3xl ${getOutcomeColor()} backdrop-blur-xl border p-8 md:p-12`}
      >
        <div className="text-center">
          {/* Outcome Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            {getOutcomeIcon()}
          </motion.div>
          
          {/* Outcome Text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={`text-3xl md:text-4xl font-bold ${getOutcomeTextColor()} mb-4`}
          >
            {outcome}
          </motion.h2>
          
          {/* Probability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-8"
          >
            <div className="text-5xl md:text-6xl font-bold text-white mb-2">
              {(probability * 100).toFixed(1)}%
            </div>
            <p className="text-gray-300 text-lg">Probability of Admission</p>
          </motion.div>
          
          {/* Real Acceptance Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-gray-300 mb-2"
          >
            <TrendingUp className="w-5 h-5" />
            <span>{collegeName} Acceptance Rate: {(realAcceptanceRate * 100).toFixed(1)}%</span>
          </motion.div>
          
          {/* Confidence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-gray-300"
          >
            <Brain className="w-5 h-5" />
            <span>Your probability calculated against this college's actual acceptance rate</span>
          </motion.div>
        </div>
      </motion.div>

      {/* User Profile Summary */}
      <motion.div {...enter}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Your Profile Summary</h2>
          <p className="text-gray-400">Based on your assessment responses</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Academic Stats */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Academic</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">GPA:</span>
                <span className="text-white">{userProfile.gpa_unweighted || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">SAT:</span>
                <span className="text-white">{userProfile.sat || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ACT:</span>
                <span className="text-white">{userProfile.act || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Major */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Intended Major</h3>
            <div className="text-center">
              <span className="text-yellow-400 font-medium">{userProfile.major || 'Undecided'}</span>
            </div>
          </div>

          {/* Extracurriculars */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Activities</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Depth:</span>
                <span className="text-white">{userProfile.extracurricular_depth}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Leadership:</span>
                <span className="text-white">{userProfile.leadership_positions}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Awards:</span>
                <span className="text-white">{userProfile.awards_publications}/10</span>
              </div>
            </div>
          </div>

          {/* Unique Factors */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Unique Factors</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Legacy:</span>
                <span className="text-white">{userProfile.legacy_status}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Diversity:</span>
                <span className="text-white">{userProfile.firstgen_diversity}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Research:</span>
                <span className="text-white">{userProfile.research_experience}/10</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* College Information Section */}
      {collegeInfoLoading && (
        <motion.div {...enter} className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading college information...</p>
        </motion.div>
      )}

      {collegeInfoError && (
        <motion.div {...enter} className="text-center py-12">
          <div className="bg-red-400/20 border border-red-400/30 rounded-xl p-6 max-w-md mx-auto">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-400 mb-2">Unable to Load College Data</h3>
            <p className="text-gray-300 text-sm">
              We couldn't fetch detailed information about {collegeName}. The prediction results above are still accurate.
            </p>
          </div>
        </motion.div>
      )}

      {collegeInfo && (
        <motion.div {...enter}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">About {collegeInfo.name}</h2>
            <p className="text-gray-400">Real-time college information powered by AI</p>
          </div>
          <CollegeInfoDisplay collegeInfo={collegeInfo} />
        </motion.div>
      )}

      {/* Analysis Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div {...enter}>
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl border border-white/10 bg-blue-400/15 text-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Model Analysis</h3>
                <p className="text-sm text-gray-400">How we calculated your chances</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Academic Performance</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${profileAnalysis.academic.score}%` }}
                    ></div>
                  </div>
                  <Badge variant={profileAnalysis.academic.score >= 80 ? "success" : profileAnalysis.academic.score >= 60 ? "warning" : "error"} size="sm">
                    {profileAnalysis.academic.label}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Extracurriculars</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${profileAnalysis.extracurricular.score}%` }}
                    ></div>
                  </div>
                  <Badge variant={profileAnalysis.extracurricular.score >= 80 ? "success" : profileAnalysis.extracurricular.score >= 60 ? "warning" : "error"} size="sm">
                    {profileAnalysis.extracurricular.label}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Essays & Recommendations</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${profileAnalysis.essays.score}%` }}
                    ></div>
                  </div>
                  <Badge variant={profileAnalysis.essays.score >= 80 ? "success" : profileAnalysis.essays.score >= 60 ? "warning" : "error"} size="sm">
                    {profileAnalysis.essays.label}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Unique Factors</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${profileAnalysis.uniqueFactors.score}%` }}
                    ></div>
                  </div>
                  <Badge variant={profileAnalysis.uniqueFactors.score >= 80 ? "success" : profileAnalysis.uniqueFactors.score >= 60 ? "warning" : "error"} size="sm">
                    {profileAnalysis.uniqueFactors.label}
                  </Badge>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div {...enter}>
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl border border-white/10 bg-green-400/15 text-green-400 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Next Steps</h3>
                <p className="text-sm text-gray-400">Recommended actions</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {outcome === 'Acceptance' && (
                <>
                  <p className="text-gray-300">🎉 Congratulations! Focus on maintaining your current performance and prepare for college life.</p>
                  <p className="text-gray-300">• Submit your enrollment deposit</p>
                  <p className="text-gray-300">• Complete housing applications</p>
                  <p className="text-gray-300">• Connect with future classmates</p>
                </>
              )}
              {outcome === 'Waitlist' && (
                <>
                  <p className="text-gray-300">📝 You're on the waitlist. Consider these strategies:</p>
                  <p className="text-gray-300">• Write a letter of continued interest</p>
                  <p className="text-gray-300">• Submit additional achievements</p>
                  <p className="text-gray-300">• Explore backup options</p>
                </>
              )}
              {outcome === 'Rejection' && (
                <>
                  <p className="text-gray-300">💪 Don't be discouraged! Consider these alternatives:</p>
                  <p className="text-gray-300">• Apply to similar schools</p>
                  <p className="text-gray-300">• Consider gap year opportunities</p>
                  <p className="text-gray-300">• Focus on transfer options</p>
                </>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div {...enter} className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => router.back()}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-yellow-400/25 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Button>
        <Button
          variant="ghost"
          className="text-lg px-8 py-4 border border-gray-700 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300"
        >
          Try Another College
        </Button>
      </motion.div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your results...</p>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}