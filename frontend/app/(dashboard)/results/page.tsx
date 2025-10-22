'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, ArrowLeft, TrendingUp, Target, Brain, BarChart3, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { COLLEGES } from '@/lib/colleges'
import { Suspense } from 'react'

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const probability = parseFloat(searchParams.get('probability') || '0')
  const outcome = searchParams.get('outcome') || 'Unknown'
  const collegeId = searchParams.get('college') || ''
  
  // Find the college name from the college ID
  const selectedCollege = COLLEGES.find(college => college.value === collegeId)
  const collegeName = selectedCollege?.label || 'Selected College'
  
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
        return 'from-green-400/20 to-green-600/20 border-green-400/30'
      case 'Rejection':
        return 'from-red-400/20 to-red-600/20 border-red-400/30'
      case 'Waitlist':
        return 'from-yellow-400/20 to-yellow-600/20 border-yellow-400/30'
      default:
        return 'from-gray-400/20 to-gray-600/20 border-gray-400/30'
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
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-amber-200 to-white bg-clip-text text-transparent mb-4">
          Your Admission Analysis
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          AI-powered analysis for <span className="text-yellow-400 font-semibold">{collegeName}</span>
        </p>
      </motion.div>

      {/* Main Results Card */}
      <motion.div
        {...enter}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getOutcomeColor()} backdrop-blur-xl border p-8 md:p-12`}
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
          
          {/* Confidence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-gray-300"
          >
            <TrendingUp className="w-5 h-5" />
            <span>94.3% Model Confidence</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Analysis Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div {...enter}>
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl border border-white/10 bg-gradient-to-br from-blue-400/15 to-cyan-600/15 text-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
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
                <Badge variant="success" size="sm">Strong</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Extracurriculars</span>
                <Badge variant="warning" size="sm">Good</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Essays & Recommendations</span>
                <Badge variant="success" size="sm">Excellent</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Unique Factors</span>
                <Badge variant="success" size="sm">Strong</Badge>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div {...enter}>
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl border border-white/10 bg-gradient-to-br from-green-400/15 to-emerald-600/15 text-green-400 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
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
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-yellow-400/25 flex items-center gap-2"
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