'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Timer, BookOpenCheck, Target, Zap, Play, BarChart3, Award, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function SATPage() {
  const enter = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { type: 'spring' as const, stiffness: 120, damping: 20, mass: 0.6 },
    viewport: { once: true, margin: '-10% 0px -10% 0px' }
  }

  const practiceModules = [
    {
      title: 'Timed Drill',
      description: 'Quick 10-question sprints with exam pacing and instant review',
      icon: Timer,
      color: 'yellow',
      status: 'Available',
      questions: '10 Questions',
      duration: '15 min'
    },
    {
      title: 'Targeted Practice',
      description: 'Algebra, Advanced Math, Reading Craft & Structure, and more',
      icon: Target,
      color: 'blue',
      status: 'Available',
      questions: '25 Questions',
      duration: '45 min'
    },
    {
      title: 'Review & Insights',
      description: 'See accuracy by topic and recommended next steps',
      icon: BookOpenCheck,
      color: 'green',
      status: 'Available',
      questions: 'Analytics',
      duration: '5 min'
    }
  ]

  const studyAreas = [
    { name: 'Algebra', progress: 75, questions: 24 },
    { name: 'Advanced Math', progress: 60, questions: 18 },
    { name: 'Reading', progress: 85, questions: 32 },
    { name: 'Writing', progress: 70, questions: 28 }
  ]

  return (
    <div className="rox-container">
      <div className="rox-section">
        {/* Header Section */}
        <motion.div {...enter} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-gray-700 mb-6">
            <Timer className="w-4 h-4" />
            <span className="text-sm font-medium">SAT Preparation</span>
          </div>
          <h1 className="rox-heading-1 mb-6">
            Practice • Analyze • Improve
          </h1>
          <p className="rox-text-large max-w-3xl mx-auto">
            Timed drills, targeted practice, and progress tracking to maximize your SAT score
          </p>
        </motion.div>

      {/* Practice Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {practiceModules.map((module, index) => {
          const Icon = module.icon
          return (
            <motion.section
              key={module.title}
              {...enter}
              transition={{ delay: index * 0.1 }}
            >
              <div className="rox-card p-6 h-full hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg bg-${module.color}-50 text-${module.color}-600`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="rox-heading-4">{module.title}</h2>
                    <Badge variant="success" size="sm">{module.status}</Badge>
                  </div>
                </div>
                
                <p className="rox-text-small mb-4">{module.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between rox-text-small">
                    <span>Questions</span>
                    <span className="font-semibold">{module.questions}</span>
                  </div>
                  <div className="flex items-center justify-between rox-text-small">
                    <span>Duration</span>
                    <span className="font-semibold">{module.duration}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="rox-button-primary flex-1 flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" />
                    Start
                  </button>
                  <button className="rox-button-secondary flex-1">
                    Custom
                  </button>
                </div>
              </div>
            </motion.section>
          )
        })}
      </div>

      {/* Study Progress */}
      <motion.div {...enter} className="mb-8">
        <div className="rox-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="rox-heading-3">Study Progress</h2>
              <p className="rox-text-small">Track your improvement across all sections</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyAreas.map((area, index) => (
              <div key={area.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{area.name}</span>
                  <span className="rox-text-small">{area.questions} questions</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                        className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${area.progress}%` }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </div>
                <div className="text-right">
                  <span className="rox-text-small font-semibold text-blue-600">{area.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Adaptive Plan CTA */}
      <motion.div {...enter} className="mb-8">
        <div className="rox-card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="rox-heading-4">AI-Powered Study Plan</h3>
              <p className="rox-text-small">Get a personalized study schedule based on your profile and target score</p>
            </div>
          </div>
          <button className="rox-button-primary flex items-center gap-2">
            <Award className="w-4 h-4" />
            Generate Plan
          </button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div {...enter}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rox-card p-6 text-center">
            <div className="rox-heading-2 mb-2">1,240</div>
            <div className="rox-text-small">Questions Practiced</div>
          </div>
          <div className="rox-card p-6 text-center">
            <div className="rox-heading-2 mb-2">87%</div>
            <div className="rox-text-small">Average Accuracy</div>
          </div>
          <div className="rox-card p-6 text-center">
            <div className="rox-heading-2 mb-2">24</div>
            <div className="rox-text-small">Hours Studied</div>
          </div>
          <div className="rox-card p-6 text-center">
            <div className="rox-heading-2 mb-2">1,450</div>
            <div className="rox-text-small">Predicted Score</div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  )
}

