'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Tabs } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Search, MapPin, Users, Star, TrendingUp, Filter, Bookmark, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function DiscoverPage() {
  const enter = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { type: 'spring' as const, stiffness: 120, damping: 20, mass: 0.6 },
    viewport: { once: true, margin: '-10% 0px -10% 0px' }
  }

  const recommendedColleges = [
    {
      name: 'Harvard University',
      location: 'Cambridge, MA',
      acceptanceRate: '3.2%',
      avgSAT: '1520',
      yourChance: '15%',
      category: 'Elite',
      color: 'red',
      students: '23,000',
      ranking: '#1'
    },
    {
      name: 'Stanford University',
      location: 'Stanford, CA',
      acceptanceRate: '3.9%',
      avgSAT: '1510',
      yourChance: '12%',
      category: 'Elite',
      color: 'red',
      students: '17,000',
      ranking: '#2'
    },
    {
      name: 'MIT',
      location: 'Cambridge, MA',
      acceptanceRate: '4.1%',
      avgSAT: '1530',
      yourChance: '18%',
      category: 'Elite',
      color: 'red',
      students: '11,000',
      ranking: '#3'
    },
    {
      name: 'UC Berkeley',
      location: 'Berkeley, CA',
      acceptanceRate: '11.4%',
      avgSAT: '1450',
      yourChance: '45%',
      category: 'Target',
      color: 'yellow',
      students: '45,000',
      ranking: '#20'
    },
    {
      name: 'UCLA',
      location: 'Los Angeles, CA',
      acceptanceRate: '8.6%',
      avgSAT: '1470',
      yourChance: '38%',
      category: 'Target',
      color: 'yellow',
      students: '46,000',
      ranking: '#15'
    },
    {
      name: 'University of Michigan',
      location: 'Ann Arbor, MI',
      acceptanceRate: '18.0%',
      avgSAT: '1420',
      yourChance: '65%',
      category: 'Safety',
      color: 'green',
      students: '50,000',
      ranking: '#25'
    }
  ]

  const filters = [
    { name: 'All', count: 2847, active: true },
    { name: 'Elite', count: 50, active: false },
    { name: 'Target', count: 200, active: false },
    { name: 'Safety', count: 500, active: false },
    { name: 'Public', count: 1200, active: false },
    { name: 'Private', count: 1647, active: false }
  ]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div {...enter} className="text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-yellow-300 mb-4">
          <Search className="w-4 h-4" />
          <span className="text-sm font-semibold">College Discovery</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-amber-200 to-white bg-clip-text text-transparent mb-4">
          Discover Your Perfect Match
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Explore colleges and scholarships that match your profile and academic goals
        </p>
      </motion.div>

      <Tabs
        tabs={[
          {
            label: 'Colleges',
            content: (
              <div className="space-y-6">
                {/* Search and Filters */}
                <motion.div {...enter}>
                  <GlassCard className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Search Bar */}
                      <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search colleges by name, location, or major..."
                          className="input-glass pl-12 w-full"
                        />
                      </div>
                      
                      {/* Filter Button */}
                      <Button variant="ghost" className="border border-white/10 hover:border-yellow-400/50 hover:text-yellow-400">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                      </Button>
                    </div>
                    
                    {/* Quick Filters */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {filters.map((filter) => (
                        <button
                          key={filter.name}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                            filter.active
                              ? 'bg-gradient-to-r from-yellow-400/20 to-amber-600/20 border border-yellow-400/30 text-yellow-400'
                              : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {filter.name} ({filter.count})
                        </button>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Recommendations */}
                <motion.div {...enter}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Recommended for You</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>Based on your profile</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendedColleges.map((college, index) => (
                      <motion.div
                        key={college.name}
                        {...enter}
                        transition={{ delay: index * 0.1 }}
                      >
                        <GlassCard className="p-6 hover:shadow-2xl transition-all duration-300 group">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                                {college.name}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                <MapPin className="w-3 h-3" />
                                <span>{college.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Users className="w-3 h-3" />
                                <span>{college.students} students</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge 
                                variant={college.color === 'red' ? 'danger' : college.color === 'yellow' ? 'warning' : 'success'}
                                size="sm"
                              >
                                {college.category}
                              </Badge>
                              <div className="text-xs text-gray-500">#{college.ranking}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">Acceptance Rate</span>
                              <span className="text-white font-semibold">{college.acceptanceRate}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">Avg SAT</span>
                              <span className="text-white font-semibold">{college.avgSAT}</span>
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-gray-400">Your Chance</span>
                              <div className="text-2xl font-bold text-yellow-400">
                                {college.yourChance}
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="flex-1 border border-white/10 hover:border-yellow-400/50 hover:text-yellow-400"
                              >
                                <Bookmark className="w-4 h-4 mr-2" />
                                Save
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="flex-1 border border-white/10 hover:border-yellow-400/50 hover:text-yellow-400"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View
                              </Button>
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Load More */}
                <motion.div {...enter} className="text-center">
                  <Button variant="ghost" className="border border-white/10 hover:border-yellow-400/50 hover:text-yellow-400">
                    Load More Colleges
                  </Button>
                </motion.div>
              </div>
            ),
          },
          {
            label: 'Scholarships',
            content: (
              <motion.div {...enter}>
                <GlassCard className="p-12 text-center">
                  <div className="p-4 rounded-full border border-white/10 bg-gradient-to-br from-blue-400/15 to-cyan-600/15 text-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.15)] w-fit mx-auto mb-6">
                    <Star className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Scholarship Discovery Coming Soon
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    We're building comprehensive scholarship discovery tools to help you find and apply for funding opportunities that match your profile
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

