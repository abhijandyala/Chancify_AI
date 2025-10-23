'use client'

import { motion } from 'framer-motion'
import { Calculator, Brain, Target, TrendingUp, TrendingDown, BarChart3, Info, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getAdmissionProbability, type PredictionRequest } from '@/lib/api'
import ProbabilityExplorer from '@/components/ui/ProbabilityExplorer'
import CollegeComparison from '@/components/ui/CollegeComparison'

interface PredictionResult {
  success: boolean
  probability?: number
  category?: string
  model_used?: string
  explanation?: string
  ml_probability?: number
  formula_probability?: number
  blend_weights?: { ml: number; formula: number }
  message?: string
  error?: string
}

export default function CalculatePage() {
  const [results, setResults] = useState<PredictionResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedColleges, setSelectedColleges] = useState<string[]>([])

  const enter = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  // Load selected colleges from localStorage
  useEffect(() => {
    const colleges = JSON.parse(localStorage.getItem('selectedColleges') || '[]')
    setSelectedColleges(colleges)
    
    if (colleges.length > 0) {
      calculateProbabilities(colleges)
    }
  }, [])

  const calculateProbabilities = async (colleges: string[]) => {
    setIsLoading(true)
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}')
    
    const promises = colleges.map(async (collegeId) => {
      const request: PredictionRequest = {
        ...userProfile,
        college: collegeId
      }
      
      try {
        const result = await getAdmissionProbability(request)
        return result
      } catch (error) {
        return { success: false, error: 'Failed to calculate probability' }
      }
    })
    
    const results = await Promise.all(promises)
    setResults(results)
    setIsLoading(false)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'safety': return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'target': return <Target className="w-5 h-5 text-yellow-400" />
      case 'reach': return <AlertCircle className="w-5 h-5 text-red-400" />
      default: return <Info className="w-5 h-5 text-gray-400" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safety': return 'border-green-400/30 bg-green-400/5'
      case 'target': return 'border-yellow-400/30 bg-yellow-400/5'
      case 'reach': return 'border-red-400/30 bg-red-400/5'
      default: return 'border-gray-400/30 bg-gray-400/5'
    }
  }

  const getCategoryExplanation = (category: string) => {
    switch (category) {
      case 'safety': return 'Strong chance of admission - consider as backup options'
      case 'target': return 'Good chance of admission - realistic target schools'
      case 'reach': return 'Challenging but possible - stretch goals worth applying to'
      default: return 'Probability calculated based on your profile'
    }
  }

  return (
    <div className="relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div {...enter} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-primary/15 text-primary">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-yellow-400">Admission Probabilities</h1>
              <p className="text-gray-400">AI-powered analysis of your college chances</p>
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <motion.div {...enter} className="rox-card">
            <div className="p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-white mb-2">Calculating Probabilities</h2>
              <p className="text-white/60">Our AI model is analyzing your profile...</p>
            </div>
          </motion.div>
        ) : results.length === 0 ? (
          <motion.div {...enter} className="rox-card">
            <div className="p-12 text-center">
              <div className="p-4 rounded-2xl bg-primary/15 text-primary w-fit mx-auto mb-6">
                <Brain className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">No Colleges Selected</h2>
              <p className="text-white/60 max-w-md mx-auto mb-6">
                Please go back to the college selection page and choose colleges to calculate your admission probabilities.
              </p>
              <button 
                onClick={() => window.history.back()}
                className="rox-button"
              >
                Go Back to College Selection
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Results Summary */}
            <motion.div {...enter} className="rox-card">
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Results Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-400/10 border border-green-400/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="font-semibold text-green-400">Safety Schools</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {results.filter(r => r.category === 'safety').length}
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-yellow-400" />
                      <span className="font-semibold text-yellow-400">Target Schools</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {results.filter(r => r.category === 'target').length}
                    </p>
                  </div>
                  <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="font-semibold text-red-400">Reach Schools</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {results.filter(r => r.category === 'reach').length}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Individual Results */}
            {results.map((result, index) => (
              <motion.div 
                key={index}
                {...enter}
                className={`rox-card border-2 ${getCategoryColor(result.category || '')}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(result.category || '')}
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          College {index + 1}
                        </h3>
                        <p className="text-sm text-white/60 capitalize">
                          {result.category} School
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-white">
                        {result.probability ? `${(result.probability * 100).toFixed(1)}%` : 'N/A'}
                      </p>
                      <p className="text-sm text-white/60">Admission Chance</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-white/60 mb-1">
                      <span>Probability</span>
                      <span>{result.probability ? `${(result.probability * 100).toFixed(1)}%` : 'N/A'}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          result.category === 'safety' ? 'bg-green-400' :
                          result.category === 'target' ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${(result.probability || 0) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm mb-4">
                    {getCategoryExplanation(result.category || '')}
                  </p>

                  {result.explanation && (
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="font-semibold text-white mb-2">AI Analysis</h4>
                      <p className="text-sm text-white/60">{result.explanation}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Interactive Tools */}
            {results.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Probability Explorer for first college */}
                {results[0] && (
                  <ProbabilityExplorer
                    collegeId={selectedColleges[0]}
                    collegeName={`College 1`}
                    initialProfile={JSON.parse(localStorage.getItem('userProfile') || '{}')}
                  />
                )}

                {/* College Comparison */}
                <CollegeComparison
                  colleges={selectedColleges.map((id, index) => ({
                    id,
                    name: `College ${index + 1}`,
                    tier: results[index]?.category || 'Unknown',
                    acceptance_rate: (results[index]?.probability || 0) * 100
                  }))}
                  userProfile={JSON.parse(localStorage.getItem('userProfile') || '{}')}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
