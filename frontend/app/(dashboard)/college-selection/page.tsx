'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, Building2, Users, DollarSign, GraduationCap, ChevronRight } from 'lucide-react'
import { COLLEGES } from '@/lib/colleges'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

export default function CollegeSelectionPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedColleges, setSelectedColleges] = useState<string[]>([])
  const [suggestedColleges, setSuggestedColleges] = useState<any[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Filter colleges based on search query
  const filteredColleges = COLLEGES.filter(college =>
    college.label.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 20) // Limit to 20 results for performance

  // Mock AI suggestions based on major (this would come from your ML model)
  useEffect(() => {
    // This would be replaced with actual ML model predictions
    const mockSuggestions = [
      {
        id: 'college_166027',
        name: 'Harvard University',
        tier: 'Elite',
        acceptance_rate: 3.5,
        tuition: 57261,
        enrollment: 23000,
        difficulty: 'Extremely High',
        popularMajors: ['Computer Science', 'Economics', 'Political Science', 'Psychology', 'Biology'],
        description: 'World-renowned research university with exceptional programs across all disciplines.'
      },
      {
        id: 'college_130794',
        name: 'Stanford University',
        tier: 'Elite',
        acceptance_rate: 4.5,
        tuition: 61731,
        enrollment: 17000,
        difficulty: 'Extremely High',
        popularMajors: ['Computer Science', 'Engineering', 'Business', 'Biology', 'Psychology'],
        description: 'Leading research university known for innovation and entrepreneurship.'
      },
      {
        id: 'college_227757',
        name: 'Yale University',
        tier: 'Elite',
        acceptance_rate: 7.9,
        tuition: 62250,
        enrollment: 12000,
        difficulty: 'Extremely High',
        popularMajors: ['Economics', 'Political Science', 'History', 'Psychology', 'Biology'],
        description: 'Ivy League institution with strong liberal arts and professional programs.'
      }
    ]
    setSuggestedColleges(mockSuggestions)
  }, [])

  const handleCollegeSelect = (collegeId: string) => {
    setSelectedColleges(prev => 
      prev.includes(collegeId) 
        ? prev.filter(id => id !== collegeId)
        : [...prev, collegeId]
    )
  }

  const handleSuggestedCollegeSelect = (college: any) => {
    handleCollegeSelect(college.id)
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Elite': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'Highly Selective': return 'text-orange-400 bg-orange-400/10 border-orange-400/20'
      case 'Selective': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Extremely High': return 'text-red-400'
      case 'Very High': return 'text-orange-400'
      case 'High': return 'text-yellow-400'
      case 'Moderate': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const enter = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div {...enter} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-primary/15 text-primary">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-yellow-400">College Selection</h1>
              <p className="text-gray-400">Search and select colleges for your application</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Search and Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Bar */}
            <motion.div {...enter} className="rox-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Search Colleges</h2>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search for colleges..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </motion.div>

            {/* Search Results */}
            <motion.div {...enter} className="rox-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Search Results ({filteredColleges.length})
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredColleges.map((college, index) => (
                    <motion.div
                      key={college.value}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                        selectedColleges.includes(college.value)
                          ? 'bg-primary/20 border-primary/50 text-primary'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                      }`}
                      onClick={() => handleCollegeSelect(college.value)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{college.label}</h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                            <span className={`px-2 py-1 rounded-full text-xs border ${getTierColor(college.tier)}`}>
                              {college.tier}
                            </span>
                            <span>Acceptance: {college.acceptance_rate}%</span>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`w-6 h-6 rounded-full border-2 ${
                            selectedColleges.includes(college.value)
                              ? 'bg-primary border-primary'
                              : 'border-white/30'
                          }`}
                        >
                          {selectedColleges.includes(college.value) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-full h-full rounded-full bg-primary"
                            />
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - AI Suggestions */}
          <div className="space-y-6">
            <motion.div {...enter} className="rox-card">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-primary/15 text-primary">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">AI Suggestions</h2>
                </div>
                <p className="text-sm text-white/60 mb-6">
                  Based on your profile and intended major
                </p>

                <div className="space-y-4">
                  {suggestedColleges.map((college, index) => (
                    <motion.div
                      key={college.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                        selectedColleges.includes(college.id)
                          ? 'bg-primary/20 border-primary/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                      onClick={() => handleSuggestedCollegeSelect(college)}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-white">{college.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs border ${getTierColor(college.tier)}`}>
                              {college.tier}
                            </span>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`w-5 h-5 rounded-full border-2 ${
                              selectedColleges.includes(college.id)
                                ? 'bg-primary border-primary'
                                : 'border-white/30'
                            }`}
                          >
                            {selectedColleges.includes(college.id) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-full h-full rounded-full bg-primary"
                              />
                            )}
                          </motion.div>
                        </div>

                        <p className="text-sm text-white/60">{college.description}</p>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-3 h-3 text-green-400" />
                            <span className="text-white/70">${college.tuition.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-3 h-3 text-blue-400" />
                            <span className="text-white/70">{college.enrollment.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/60">Difficulty:</span>
                            <span className={`text-xs font-medium ${getDifficultyColor(college.difficulty)}`}>
                              {college.difficulty}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-white/60">Popular Majors:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {college.popularMajors.slice(0, 3).map((major: string) => (
                                <span key={major} className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                                  {major}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom - Calculate Button */}
        <motion.div {...enter} className="mt-8">
          <div className="rox-card">
            <div className="p-6 text-center">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {selectedColleges.length > 0 
                      ? `Selected ${selectedColleges.length} College${selectedColleges.length !== 1 ? 's' : ''}`
                      : 'No Colleges Selected'
                    }
                  </h2>
                  <p className="text-white/60">
                    {selectedColleges.length > 0 
                      ? 'Ready to calculate your admission probabilities'
                      : 'Select colleges to continue'
                    }
                  </p>
                </div>
                
                <Button
                  onClick={() => router.push('/calculate')}
                  disabled={selectedColleges.length === 0}
                  className={`text-lg px-8 py-4 flex items-center gap-3 transition-all duration-300 ${
                    selectedColleges.length > 0 
                      ? 'rox-button' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  <span>Calculate Probability</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
