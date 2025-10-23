'use client'

import { motion } from 'framer-motion'
import { Tabs } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Bookmark, Plus, TrendingUp, Target, Star, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function WatchlistPage() {
  const enter = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { type: 'spring' as const, stiffness: 120, damping: 20, mass: 0.6 },
    viewport: { once: true, margin: '-10% 0px -10% 0px' }
  }

  // Mock data for demonstration
  const mockColleges = [
    {
      name: 'Harvard University',
      location: 'Cambridge, MA',
      acceptanceRate: '3.2%',
      yourChance: '15%',
      category: 'Reach',
      color: 'red',
      addedDate: '2024-01-15'
    }
  ]

  return (
    <div className="rox-container">
      <div className="rox-section">
        {/* Header Section */}
        <motion.div {...enter} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white mb-6 backdrop-blur-sm">
            <Bookmark className="w-4 h-4" />
            <span className="text-sm font-medium">College Watchlist</span>
          </div>
          <h1 className="rox-heading-1 mb-4 gradient-text">Your College Watchlist</h1>
          <p className="rox-text-large">Track your favorite colleges and monitor your application progress</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div {...enter} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rox-card p-6 text-center">
              <div className="p-3 rounded-lg bg-yellow-400/20 text-yellow-400 w-fit mx-auto mb-4">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="rox-heading-3 mb-2">12</h3>
              <p className="rox-text-muted">Colleges Saved</p>
            </div>
            <div className="rox-card p-6 text-center">
              <div className="p-3 rounded-lg bg-yellow-400/20 text-yellow-400 w-fit mx-auto mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="rox-heading-3 mb-2">8</h3>
              <p className="rox-text-muted">Applications Sent</p>
            </div>
            <div className="rox-card p-6 text-center">
              <div className="p-3 rounded-lg bg-yellow-400/20 text-yellow-400 w-fit mx-auto mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="rox-heading-3 mb-2">4</h3>
              <p className="rox-text-muted">Responses Received</p>
            </div>
            <div className="rox-card p-6 text-center">
              <div className="p-3 rounded-lg bg-yellow-400/20 text-yellow-400 w-fit mx-auto mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="rox-heading-3 mb-2">2</h3>
              <p className="rox-text-muted">Acceptances</p>
            </div>
          </div>
        </motion.div>

        <Tabs
          tabs={[
            {
              label: 'Colleges',
              content: (
                <div className="space-y-6">
                  {mockColleges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockColleges.map((college, index) => (
                        <motion.div
                          key={college.name}
                          {...enter}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="rox-card p-6 hover:shadow-lg transition-all duration-200">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="rox-heading-4 mb-1">{college.name}</h3>
                                <p className="rox-text-small text-gray-600 mb-2">{college.location}</p>
                                <div className="flex items-center gap-4 rox-text-small">
                                  <span>Acceptance: {college.acceptanceRate}</span>
                                  <span>Your Chance: {college.yourChance}</span>
                                </div>
                              </div>
                              <Badge variant="success" size="sm">
                                {college.category}
                              </Badge>
                            </div>
                            
                            <div className="pt-4 border-t border-gray-200">
                              <div className="flex gap-2">
                                <button className="rox-button-secondary flex-1 flex items-center justify-center gap-2">
                                  <ExternalLink className="w-4 h-4" />
                                  View Details
                                </button>
                                <button className="rox-button-ghost">
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div {...enter}>
                      <div className="rox-card p-12 text-center">
                        <div className="p-4 rounded-lg bg-yellow-400/20 text-yellow-400 w-fit mx-auto mb-6">
                          <Bookmark className="w-8 h-8" />
                        </div>
                        <h3 className="rox-heading-3 mb-4">No Colleges in Watchlist</h3>
                        <p className="rox-text-body mb-6">
                          Start building your college list by exploring and saving colleges that interest you.
                        </p>
                        <button className="rox-button-primary flex items-center gap-2 mx-auto">
                          <Plus className="w-4 h-4" />
                          Explore Colleges
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ),
            },
            {
              label: 'Scholarships',
              content: (
                <motion.div {...enter}>
                  <div className="rox-card p-12 text-center">
                    <div className="p-4 rounded-lg bg-yellow-400/20 text-yellow-400 w-fit mx-auto mb-6">
                      <Star className="w-8 h-8" />
                    </div>
                    <h3 className="rox-heading-3 mb-4">Scholarship Tracking</h3>
                    <p className="rox-text-body mb-6">
                      Track scholarship applications and deadlines for your saved colleges.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <span className="text-sm">In Development</span>
                    </div>
                  </div>
                </motion.div>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}