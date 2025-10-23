'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, Building2, Users, DollarSign, GraduationCap, ChevronRight, Star, MapPin } from 'lucide-react'
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Complex Square Star Pattern Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px'
        }} />
        {/* Star pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.01) 1px, transparent 1px)
          `,
          backgroundSize: '200px 200px, 200px 200px, 100px 100px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header - Rox Style */}
        <motion.div {...enter} className="mb-16">
          <div className="text-center">
            <h1 className="text-5xl font-light text-white mb-4 tracking-tight">
              College Selection
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              Search and select colleges for your application
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side - Search and Results */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search Bar - Rox Style */}
            <motion.div {...enter}>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for colleges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 bg-transparent border border-gray-800 rounded-none text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 text-lg font-light tracking-wide"
                />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
              </div>
            </motion.div>

            {/* Search Results - Rox Style */}
            <motion.div {...enter}>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Search Results ({filteredColleges.length})
                </h3>
              </div>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {filteredColleges.map((college, index) => (
                  <motion.div
                    key={college.value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className={`group relative py-4 px-0 border-b border-gray-900 transition-all duration-300 cursor-pointer ${
                      selectedColleges.includes(college.value)
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => handleCollegeSelect(college.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-light tracking-wide mb-1">
                          {college.label}
                        </h4>
                        <div className="flex items-center gap-6 text-sm">
                          <span className="text-gray-500">
                            {college.acceptance_rate}% acceptance
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium ${
                            college.tier === 'Elite' ? 'text-red-400' :
                            college.tier === 'Highly Selective' ? 'text-orange-400' :
                            'text-yellow-400'
                          }`}>
                            {college.tier}
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 border-2 transition-all duration-200 ${
                        selectedColleges.includes(college.value)
                          ? 'border-white bg-white'
                          : 'border-gray-600 group-hover:border-gray-400'
                      }`}>
                        {selectedColleges.includes(college.value) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-full h-full bg-white"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - AI Suggestions - Rox Style */}
          <div className="space-y-8">
            <motion.div {...enter}>
              <div className="mb-8">
                <h2 className="text-2xl font-light text-white mb-2 tracking-tight">
                  AI Suggestions
                </h2>
                <p className="text-gray-400 font-light">
                  Based on your profile and intended major
                </p>
              </div>

              <div className="space-y-6">
                {suggestedColleges.map((college, index) => (
                  <motion.div
                    key={college.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group relative border border-gray-900 transition-all duration-300 cursor-pointer ${
                      selectedColleges.includes(college.id)
                        ? 'border-gray-600'
                        : 'hover:border-gray-700'
                    }`}
                    onClick={() => handleSuggestedCollegeSelect(college)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-light text-white mb-2 tracking-wide">
                            {college.name}
                          </h3>
                          <div className="flex items-center gap-4 mb-3">
                            <span className={`text-sm font-medium ${
                              college.tier === 'Elite' ? 'text-red-400' :
                              college.tier === 'Highly Selective' ? 'text-orange-400' :
                              'text-yellow-400'
                            }`}>
                              {college.tier}
                            </span>
                            <span className="text-sm text-gray-500">
                              {college.acceptance_rate}% acceptance
                            </span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 border-2 transition-all duration-200 ${
                          selectedColleges.includes(college.id)
                            ? 'border-white bg-white'
                            : 'border-gray-600 group-hover:border-gray-400'
                        }`}>
                          {selectedColleges.includes(college.id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-full h-full bg-white"
                            />
                          )}
                        </div>
                      </div>

                      <p className="text-gray-400 font-light mb-6 leading-relaxed">
                        {college.description}
                      </p>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <div>
                            <div className="text-white font-light">${college.tuition.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Tuition</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-gray-500" />
                          <div>
                            <div className="text-white font-light">{college.enrollment.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Students</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Difficulty</div>
                          <div className={`text-sm font-medium ${
                            college.difficulty === 'Extremely High' ? 'text-red-400' :
                            college.difficulty === 'Very High' ? 'text-orange-400' :
                            college.difficulty === 'High' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {college.difficulty}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Popular Majors</div>
                          <div className="flex flex-wrap gap-2">
                            {college.popularMajors.slice(0, 3).map((major: string) => (
                              <span key={major} className="px-3 py-1 bg-gray-900 text-xs text-gray-300 font-light">
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
            </motion.div>
          </div>
        </div>

        {/* Bottom - Calculate Button - Rox Style */}
        <motion.div {...enter} className="mt-16">
          <div className="text-center">
            <div className="mb-8">
              <h2 className="text-2xl font-light text-white mb-2 tracking-tight">
                {selectedColleges.length > 0 
                  ? `${selectedColleges.length} College${selectedColleges.length !== 1 ? 's' : ''} Selected`
                  : 'No Colleges Selected'
                }
              </h2>
              <p className="text-gray-400 font-light">
                {selectedColleges.length > 0 
                  ? 'Ready to calculate your admission probabilities'
                  : 'Select colleges to continue'
                }
              </p>
            </div>
            
            <motion.button
              onClick={() => router.push('/calculate')}
              disabled={selectedColleges.length === 0}
              className={`group relative px-8 py-4 text-lg font-light tracking-wide transition-all duration-300 ${
                selectedColleges.length > 0 
                  ? 'text-black bg-white hover:bg-gray-100' 
                  : 'text-gray-500 bg-gray-900 border border-gray-800 cursor-not-allowed'
              }`}
              whileHover={selectedColleges.length > 0 ? { scale: 1.02 } : {}}
              whileTap={selectedColleges.length > 0 ? { scale: 0.98 } : {}}
            >
              <span className="relative z-10 flex items-center gap-3">
                Calculate Probability
                <ChevronRight className="w-5 h-5" />
              </span>
              {selectedColleges.length > 0 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
