'use client'

import { motion } from 'framer-motion'
import { Tabs } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
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
    }
  ]

  const filters = [
    { name: 'All', count: 2847, active: true },
    { name: 'Elite', count: 50, active: false }
  ]

  return (
    <div className="rox-container">
      <div className="rox-section">
        {/* Header Section */}
        <motion.div {...enter} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-gray-700 mb-6">
            <Search className="w-4 h-4" />
            <span className="text-sm font-medium">College Discovery</span>
          </div>
          <h1 className="rox-heading-1 mb-4">Discover Your Perfect College</h1>
          <p className="rox-text-large">Find colleges that match your academic profile and career goals</p>
        </motion.div>

        <Tabs
          tabs={[
            {
              label: 'Colleges',
              content: (
                <div className="space-y-6">
                  {/* Search and Filters */}
                  <motion.div {...enter} className="mb-8">
                    <div className="rox-card p-6">
                      <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                          <input
                            type="text"
                            placeholder="Search colleges by name, location, or major..."
                            className="rox-input pl-12"
                          />
                        </div>
                        
                        {/* Filter Button */}
                        <button className="rox-button-secondary flex items-center gap-2">
                          <Filter className="w-4 h-4" />
                          Filters
                        </button>
                      </div>
                      
                      {/* Quick Filters */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {filters.map((filter) => (
                          <button
                            key={filter.name}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                              filter.active
                                ? 'rox-button-primary'
                                : 'rox-button-ghost'
                            }`}
                          >
                            {filter.name} ({filter.count})
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Recommendations */}
                  <motion.div {...enter}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="rox-heading-3">Recommended for You</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recommendedColleges.map((college, index) => (
                        <motion.div
                          key={college.name}
                          {...enter}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="rox-card p-6 hover:shadow-lg transition-all duration-200 group">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="rox-heading-4 mb-1 group-hover:text-blue-600 transition-colors">
                                  {college.name}
                                </h3>
                                <div className="flex items-center gap-2 rox-text-small mb-2">
                                  <MapPin className="w-3 h-3" />
                                  <span>{college.location}</span>
                                </div>
                                <div className="flex items-center gap-2 rox-text-small">
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
                                <div className="rox-text-muted">#{college.ranking}</div>
                              </div>
                            </div>
                            
                            <div className="space-y-3 mb-4">
                              <div className="flex items-center justify-between rox-text-small">
                                <span>Acceptance Rate</span>
                                <span className="font-semibold">{college.acceptanceRate}</span>
                              </div>
                              <div className="flex items-center justify-between rox-text-small">
                                <span>Avg SAT</span>
                                <span className="font-semibold">{college.avgSAT}</span>
                              </div>
                            </div>
                            
                            <div className="pt-4 border-t border-gray-200">
                              <div className="flex items-center justify-between mb-3">
                                <span className="rox-text-small">Your Chance</span>
                                <div className="rox-heading-3">
                                  {college.yourChance}
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <button className="rox-button-secondary flex-1 flex items-center justify-center gap-2">
                                  <Bookmark className="w-4 h-4" />
                                  Save
                                </button>
                                <button className="rox-button-ghost flex-1 flex items-center justify-center gap-2">
                                  <ExternalLink className="w-4 h-4" />
                                  View
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ),
            },
            {
              label: 'Scholarships',
              content: (
                <motion.div {...enter}>
                  <div className="rox-card p-12 text-center">
                    <div className="p-4 rounded-lg bg-blue-50 text-blue-600 w-fit mx-auto mb-6">
                      <Star className="w-8 h-8" />
                    </div>
                    <h3 className="rox-heading-3 mb-4">Scholarship Search</h3>
                    <p className="rox-text-body mb-6">
                      Find scholarships that match your profile and academic achievements.
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