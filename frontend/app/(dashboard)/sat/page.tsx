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
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div {...enter} className="text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-yellow-300 mb-4">
          <Timer className="w-4 h-4" />
          <span className="text-sm font-semibold">SAT Preparation</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-yellow-400 mb-4">
          Practice • Analyze • Improve
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
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
              <GlassCard className="p-6 h-full hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl border border-white/10 bg-${module.color}-400/15 text-${module.color}-400 shadow-[0_0_40px_rgba(245,200,75,0.15)]`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-white">{module.title}</h2>
                    <Badge variant="success" size="sm">{module.status}</Badge>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mb-4">{module.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Questions</span>
                    <span className="text-white font-semibold">{module.questions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-semibold">{module.duration}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                  <Button variant="ghost" className="flex-1 border border-gray-700 hover:border-yellow-400/50 hover:text-yellow-400">
                    Custom
                  </Button>
                </div>
              </GlassCard>
            </motion.section>
          )
        })}
      </div>

      {/* Study Progress */}
      <motion.div {...enter}>
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl border border-white/10 bg-green-400/15 text-green-400 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Study Progress</h2>
              <p className="text-sm text-gray-400">Track your improvement across all sections</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyAreas.map((area, index) => (
              <div key={area.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{area.name}</span>
                  <span className="text-sm text-gray-400">{area.questions} questions</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-2">
                  <motion.div
                        className="bg-yellow-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${area.progress}%` }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-yellow-400">{area.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Adaptive Plan CTA */}
      <motion.div {...enter}>
        <GlassCard className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl border border-white/10 bg-purple-400/15 text-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI-Powered Study Plan</h3>
              <p className="text-sm text-gray-400">Get a personalized study schedule based on your profile and target score</p>
            </div>
          </div>
          <Button className="bg-purple-400 hover:bg-purple-500 text-white font-semibold">
            <Award className="w-4 h-4 mr-2" />
            Generate Plan
          </Button>
        </GlassCard>
      </motion.div>

      {/* Quick Stats */}
      <motion.div {...enter}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <GlassCard className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">1,240</div>
            <div className="text-sm text-gray-400">Questions Practiced</div>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">87%</div>
            <div className="text-sm text-gray-400">Average Accuracy</div>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">24</div>
            <div className="text-sm text-gray-400">Hours Studied</div>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">1,450</div>
            <div className="text-sm text-gray-400">Predicted Score</div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}

