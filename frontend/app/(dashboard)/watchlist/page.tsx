'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Tabs } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
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
      acceptanceRate: '3.2%',
      avgSAT: '1520',
      yourChance: '15%',
      status: 'Reach',
      color: 'red'
    },
    {
      name: 'Stanford University',
      acceptanceRate: '3.9%',
      avgSAT: '1510',
      yourChance: '12%',
      status: 'Reach',
      color: 'red'
    },
    {
      name: 'UC Berkeley',
      acceptanceRate: '11.4%',
      avgSAT: '1450',
      yourChance: '45%',
      status: 'Target',
      color: 'yellow'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div {...enter} className="text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-yellow-300 mb-4">
          <Bookmark className="w-4 h-4" />
          <span className="text-sm font-semibold">Your College Watchlist</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-yellow-400 mb-4">
          Track Your Progress
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Monitor your admission chances and stay updated on your target colleges
        </p>
      </motion.div>

      <Tabs
        tabs={[
          {
            label: 'Colleges',
            content: (
              <div className="space-y-6">
                {mockColleges.length > 0 ? (
                  <>
                    {/* Stats Overview */}
                    <motion.div {...enter}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <GlassCard className="p-6 text-center">
                          <div className="p-3 rounded-xl border border-white/10 bg-yellow-400/15 text-yellow-400 shadow-[0_0_40px_rgba(245,200,75,0.15)] w-fit mx-auto mb-4">
                            <Target className="w-6 h-6" />
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">{mockColleges.length}</div>
                          <div className="text-sm text-gray-400">Colleges Tracked</div>
                        </GlassCard>
                        
                        <GlassCard className="p-6 text-center">
                          <div className="p-3 rounded-xl border border-white/10 bg-green-400/15 text-green-400 shadow-[0_0_40px_rgba(34,197,94,0.15)] w-fit mx-auto mb-4">
                            <TrendingUp className="w-6 h-6" />
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">24%</div>
                          <div className="text-sm text-gray-400">Avg. Chance</div>
                        </GlassCard>
                        
                        <GlassCard className="p-6 text-center">
                          <div className="p-3 rounded-xl border border-white/10 bg-blue-400/15 text-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.15)] w-fit mx-auto mb-4">
                            <Star className="w-6 h-6" />
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">1</div>
                          <div className="text-sm text-gray-400">Target Schools</div>
                        </GlassCard>
                      </div>
                    </motion.div>

                    {/* College Cards */}
                    <div className="grid gap-6">
                      {mockColleges.map((college, index) => (
                        <motion.div
                          key={college.name}
                          {...enter}
                          transition={{ delay: index * 0.1 }}
                        >
                          <GlassCard className="p-6 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">{college.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                  <span>Acceptance: {college.acceptanceRate}</span>
                                  <span>Avg SAT: {college.avgSAT}</span>
                                </div>
                              </div>
                              <Badge 
                                variant={college.color === 'red' ? 'danger' : college.color === 'yellow' ? 'warning' : 'success'}
                                size="sm"
                              >
                                {college.status}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-2xl font-bold text-yellow-400 mb-1">
                                  {college.yourChance}
                                </div>
                                <div className="text-sm text-gray-400">Your Chance</div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="border border-white/10 hover:border-yellow-400/50 hover:text-yellow-400">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-400/10">
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </GlassCard>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <motion.div {...enter}>
                    <GlassCard className="p-12 text-center">
                      <div className="p-4 rounded-full border border-white/10 bg-yellow-400/15 text-yellow-400 shadow-[0_0_40px_rgba(245,200,75,0.15)] w-fit mx-auto mb-6">
                        <Bookmark className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        No Colleges Yet
                      </h3>
                      <p className="text-gray-400 mb-6 max-w-md mx-auto">
                        Start adding colleges from the Discover page to track your admission chances and monitor your progress
                      </p>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                        <Plus className="w-4 h-4 mr-2" />
                        Discover Colleges
                      </Button>
                    </GlassCard>
                  </motion.div>
                )}
              </div>
            ),
          },
          {
            label: 'Scholarships',
            content: (
              <motion.div {...enter}>
                <GlassCard className="p-12 text-center">
                  <div className="p-4 rounded-full border border-white/10 bg-blue-400/15 text-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.15)] w-fit mx-auto mb-6">
                    <Star className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Scholarship Tracking Coming Soon
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    We're building comprehensive scholarship discovery and tracking tools to help you find and manage funding opportunities
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-sm">In Development</span>
                  </div>
                </GlassCard>
              </motion.div>
            ),
          },
        ]}
      />
    </div>
  )
}

