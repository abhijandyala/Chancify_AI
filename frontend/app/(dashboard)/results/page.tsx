'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, ArrowLeft, TrendingUp, Target } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const probability = parseFloat(searchParams.get('probability') || '0')
  const outcome = searchParams.get('outcome') || 'Unknown'
  const college = searchParams.get('college') || 'Selected College'
  
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

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/80"></div>
      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-white bg-clip-text text-transparent mb-4">
              Your Prediction Results
            </h1>
            <p className="text-xl text-gray-300">
              AI-powered analysis for <span className="text-yellow-400 font-semibold">{college}</span>
            </p>
          </motion.div>

          {/* Main Results Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getOutcomeColor()} backdrop-blur-xl border p-12 mb-8`}
          >
            <div className="text-center">
              {/* Outcome Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                {getOutcomeIcon()}
              </motion.div>
              
              {/* Outcome Text */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className={`text-4xl font-bold ${getOutcomeTextColor()} mb-4`}
              >
                {outcome}
              </motion.h2>
              
              {/* Probability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mb-8"
              >
                <div className="text-6xl font-bold text-white mb-2">
                  {(probability * 100).toFixed(1)}%
                </div>
                <p className="text-gray-300 text-lg">Probability of Admission</p>
              </motion.div>
              
              {/* Confidence */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="flex items-center justify-center gap-2 text-gray-300"
              >
                <TrendingUp className="w-5 h-5" />
                <span>85.51% Model Confidence</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-xl border border-gray-800/30 rounded-3xl p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">What This Means</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Your Profile Analysis</h4>
                <p className="text-gray-300">
                  Our AI analyzed your academic performance, extracurricular activities, 
                  essays, and unique factors to determine your admission probability.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Next Steps</h4>
                <p className="text-gray-300">
                  {outcome === 'Acceptance' && "Focus on maintaining your current performance and prepare for college life!"}
                  {outcome === 'Waitlist' && "Consider writing a letter of continued interest and exploring backup options."}
                  {outcome === 'Rejection' && "Don't be discouraged! Consider similar schools or gap year opportunities."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Button
              onClick={() => router.back()}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 flex items-center gap-2"
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
      </div>
    </div>
  )
}
