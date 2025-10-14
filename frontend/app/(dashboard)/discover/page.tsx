'use client'

import { GlassCard } from '@/components/ui/GlassCard'

export const dynamic = 'force-dynamic'
import { Tabs } from '@/components/ui/Tabs'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Search } from 'lucide-react'

export default function DiscoverPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">
          Discover
        </h1>
        <p className="text-muted text-lg">
          Explore colleges and scholarships that match your profile
        </p>
      </div>

      <Tabs
        tabs={[
          {
            label: 'Colleges',
            content: (
              <div className="space-y-6">
                {/* Search Bar */}
                <GlassCard className="p-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search colleges..."
                      className="input-glass pl-12 w-full"
                    />
                  </div>
                </GlassCard>

                {/* Recommendations */}
                <div>
                  <h2 className="subsection-heading mb-4">
                    Recommended for You
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {['Harvard University', 'Stanford University', 'MIT'].map((college) => (
                      <GlassCard key={college} className="p-6" hover>
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="card-heading">{college}</h3>
                          <Badge variant="danger" size="sm">Elite</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="text-muted">Acceptance Rate: 3.5%</p>
                          <p className="text-muted">Avg SAT: 1520</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                          <p className="text-lg font-bold accent-amber">
                            Your Chance: Calculating...
                          </p>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </div>
            ),
          },
          {
            label: 'Scholarships',
            content: (
              <GlassCard className="p-12 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Coming Soon
                </h3>
                <p className="text-muted">
                  Scholarship discovery will be available soon. Check back later!
                </p>
              </GlassCard>
            ),
          },
        ]}
      />
    </div>
  )
}

