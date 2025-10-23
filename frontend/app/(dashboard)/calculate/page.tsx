'use client'

import { motion } from 'framer-motion'
import { Calculator, Brain, Target } from 'lucide-react'

export default function CalculatePage() {
  const enter = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div {...enter} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-primary/15 text-primary">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-yellow-400">Calculate Probability</h1>
              <p className="text-gray-400">AI-powered admission probability analysis</p>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div {...enter} className="rox-card">
          <div className="p-12 text-center">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 rounded-2xl bg-primary/15 text-primary">
                  <Brain className="w-12 h-12" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
                <p className="text-white/60 max-w-md mx-auto">
                  Our AI model is analyzing your profile and selected colleges to calculate your admission probabilities. 
                  This feature will be available soon.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="p-3 rounded-xl bg-blue-400/15 text-blue-400 w-fit mx-auto mb-4">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Profile Analysis</h3>
                  <p className="text-sm text-white/60">
                    Comprehensive evaluation of your academic and extracurricular profile
                  </p>
                </div>

                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="p-3 rounded-xl bg-green-400/15 text-green-400 w-fit mx-auto mb-4">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">AI Prediction</h3>
                  <p className="text-sm text-white/60">
                    Machine learning model trained on thousands of admission outcomes
                  </p>
                </div>

                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="p-3 rounded-xl bg-purple-400/15 text-purple-400 w-fit mx-auto mb-4">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Probability Score</h3>
                  <p className="text-sm text-white/60">
                    Detailed breakdown of your chances at each selected college
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
