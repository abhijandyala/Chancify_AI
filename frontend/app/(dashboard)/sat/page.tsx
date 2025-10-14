'use client'

export const dynamic = 'force-dynamic'

import { GlassCard } from '@/components/ui/GlassCard'

export default function SATPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">
          SAT Preparation
        </h1>
        <p className="text-muted text-lg">
          Coming soon - SAT prep resources and practice tests
        </p>
      </div>

      <GlassCard className="p-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            SAT Prep Tools Coming Soon
          </h2>
          <p className="text-muted text-lg mb-8">
            We're working on comprehensive SAT preparation tools including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-2">Practice Tests</h3>
              <p className="text-sm text-muted">Full-length SAT practice exams</p>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-2">Study Plans</h3>
              <p className="text-sm text-muted">Personalized study schedules</p>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-2">Progress Tracking</h3>
              <p className="text-sm text-muted">Monitor your improvement</p>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-2">Score Predictions</h3>
              <p className="text-sm text-muted">Estimate your future scores</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

