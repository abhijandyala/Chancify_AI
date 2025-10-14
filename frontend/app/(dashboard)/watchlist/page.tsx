'use client'

export const dynamic = 'force-dynamic'

import { GlassCard } from '@/components/ui/GlassCard'
import { Tabs } from '@/components/ui/Tabs'

export default function WatchlistPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">
          Watchlist
        </h1>
        <p className="text-muted text-lg">
          Track your favorite colleges and scholarships
        </p>
      </div>

      <Tabs
        tabs={[
          {
            label: 'Colleges',
            content: (
              <GlassCard className="p-12 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No Colleges Yet
                </h3>
                <p className="text-muted mb-6">
                  Start adding colleges from the Discover page to track your chances
                </p>
              </GlassCard>
            ),
          },
          {
            label: 'Scholarships',
            content: (
              <GlassCard className="p-12 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No Scholarships Yet
                </h3>
                <p className="text-muted mb-6">
                  Scholarship tracking will be available soon
                </p>
              </GlassCard>
            ),
          },
        ]}
      />
    </div>
  )
}

