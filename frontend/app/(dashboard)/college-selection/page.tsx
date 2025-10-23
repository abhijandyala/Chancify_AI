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

  // Smart AI suggestions based on user profile and major
  useEffect(() => {
    const generateSmartSuggestions = () => {
      // Get user profile from localStorage or props
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}')
      const intendedMajor = userProfile.major || 'Computer Science'
      
      // Calculate user's academic strength (0-100)
      const gpaUnweighted = parseFloat(userProfile.gpa_unweighted) || 0
      const gpaWeighted = parseFloat(userProfile.gpa_weighted) || 0
      const sat = parseInt(userProfile.sat) || 0
      const act = parseInt(userProfile.act) || 0
      
      // Calculate composite score
      let academicScore = 0
      if (gpaUnweighted > 0) academicScore += (gpaUnweighted / 4.0) * 30
      if (gpaWeighted > 0) academicScore += (gpaWeighted / 5.0) * 20
      if (sat > 0) academicScore += (sat / 1600) * 30
      if (act > 0) academicScore += (act / 36) * 20
      
      // Determine tier based on academic strength
      let targetTier = 'Selective'
      if (academicScore >= 85) targetTier = 'Elite'
      else if (academicScore >= 70) targetTier = 'Highly Selective'
      else if (academicScore >= 50) targetTier = 'Selective'
      
      // Filter colleges by tier and major relevance
      const relevantColleges = COLLEGES.filter(college => {
        const isRightTier = college.tier === targetTier
        const hasRelevantPrograms = isMajorRelevant(college.label, intendedMajor)
        return isRightTier && hasRelevantPrograms
      })
      
      // Select top 3 colleges
      const suggestions = relevantColleges.slice(0, 3).map(college => ({
        id: college.value,
        name: college.label,
        tier: college.tier,
        acceptance_rate: college.acceptance_rate,
        tuition: getTuitionForCollege(college.value),
        enrollment: getEnrollmentForCollege(college.value),
        difficulty: getDifficultyLevel(college.tier),
        popularMajors: getPopularMajorsForCollege(college.label, intendedMajor),
        description: getDescriptionForCollege(college.label, intendedMajor)
      }))
      
      setSuggestedColleges(suggestions)
    }
    
    generateSmartSuggestions()
  }, [])
  
  // Helper functions for smart recommendations
  const isMajorRelevant = (collegeName: string, major: string) => {
    // Define major relevance for different college types
    const majorCategories = {
      'Computer Science': ['MIT', 'Stanford', 'Carnegie Mellon', 'Berkeley', 'Georgia Tech', 'Caltech'],
      'Engineering': ['MIT', 'Stanford', 'Caltech', 'Georgia Tech', 'Purdue', 'Illinois', 'Michigan'],
      'Business': ['Wharton', 'Stanford', 'MIT', 'Chicago', 'Northwestern', 'NYU', 'USC'],
      'Medicine': ['Harvard', 'Johns Hopkins', 'Stanford', 'Yale', 'Duke', 'Northwestern'],
      'Law': ['Yale', 'Stanford', 'Harvard', 'Chicago', 'Columbia', 'NYU'],
      'Liberal Arts': ['Harvard', 'Yale', 'Princeton', 'Amherst', 'Williams', 'Swarthmore']
    }
    
    const relevantColleges = majorCategories[major as keyof typeof majorCategories] || []
    return relevantColleges.some(college => collegeName.includes(college))
  }
  
  const getTuitionForCollege = (collegeId: string) => {
    const tuitionMap: { [key: string]: number } = {
      'college_166027': 57261, // Harvard
      'college_130794': 61731, // Stanford
      'college_227757': 62250, // Yale
      'college_189097': 59270, // Princeton
      'college_121345': 57986, // MIT
      'college_168342': 65000, // Columbia
      'college_186131': 65000, // UPenn
      'college_193900': 65000, // Brown
      'college_164465': 65000, // Dartmouth
      'college_221999': 65000, // Cornell
      'college_167358': 65000, // Duke
      'college_182670': 65000, // Northwestern
      'college_164155': 65000, // Vanderbilt
      'college_211893': 55000, // Rice
      'college_192110': 60000, // Notre Dame
      'college_197133': 65000, // UChicago
      'college_134130': 45000, // UC Berkeley
      'college_115409': 60000, // Georgetown
      'college_159009': 45000, // UCLA
      'college_100654': 55000, // Michigan
      'college_100663': 55000, // UVA
      'college_100706': 40000, // UNC
      'college_100724': 35000, // Georgia Tech
      'college_100751': 35000, // Illinois
      'college_100830': 40000, // UT Austin
      'college_100858': 40000, // Wisconsin
      'college_100937': 30000, // Purdue
      'college_101189': 60000, // NYU
      'college_101230': 65000, // USC
      'college_101248': 65000, // Boston College
      'college_101365': 65000, // Tufts
      'college_101412': 60000, // Emory
      'college_101421': 65000, // Wake Forest
      'college_101430': 65000, // Carnegie Mellon
      'college_101448': 65000, // WashU
      'college_101456': 30000, // Florida
      'college_101465': 30000, // Georgia
      'college_101474': 25000, // Penn State
      'college_101483': 25000, // Ohio State
      'college_101492': 25000, // Indiana
      'college_101501': 25000, // Rutgers
      'college_101510': 25000, // UT Dallas
      'college_101519': 25000, // Arizona State
      'college_101528': 25000, // Arizona
      'college_101537': 25000, // Colorado
      'college_101546': 25000, // Washington
      'college_101555': 25000, // Oregon
      'college_101564': 25000, // Minnesota
      'college_101573': 25000, // Iowa
      'college_101582': 25000, // Kansas
      'college_101591': 25000, // Missouri
      'college_101600': 25000, // Nebraska
      'college_101609': 25000, // Oklahoma
      'college_101618': 25000, // Arkansas
      'college_101627': 25000, // LSU
    }
    return tuitionMap[collegeId] || 45000
  }
  
  const getEnrollmentForCollege = (collegeId: string) => {
    const enrollmentMap: { [key: string]: number } = {
      'college_166027': 23000, // Harvard
      'college_130794': 17000, // Stanford
      'college_227757': 12000, // Yale
      'college_189097': 8000,  // Princeton
      'college_121345': 12000, // MIT
      'college_168342': 33000, // Columbia
      'college_186131': 26000, // UPenn
      'college_193900': 10000, // Brown
      'college_164465': 6500,  // Dartmouth
      'college_221999': 24000, // Cornell
      'college_167358': 17000, // Duke
      'college_182670': 22000, // Northwestern
      'college_164155': 14000, // Vanderbilt
      'college_211893': 8000,  // Rice
      'college_192110': 12000, // Notre Dame
      'college_197133': 17000, // UChicago
      'college_134130': 45000, // UC Berkeley
      'college_115409': 19000, // Georgetown
      'college_159009': 46000, // UCLA
      'college_100654': 50000, // Michigan
      'college_100663': 25000, // UVA
      'college_100706': 30000, // UNC
      'college_100724': 40000, // Georgia Tech
      'college_100751': 50000, // Illinois
      'college_100830': 52000, // UT Austin
      'college_100858': 45000, // Wisconsin
      'college_100937': 50000, // Purdue
      'college_101189': 58000, // NYU
      'college_101230': 48000, // USC
      'college_101248': 15000, // Boston College
      'college_101365': 12000, // Tufts
      'college_101412': 15000, // Emory
      'college_101421': 8000,  // Wake Forest
      'college_101430': 16000, // Carnegie Mellon
      'college_101448': 15000, // WashU
      'college_101456': 55000, // Florida
      'college_101465': 40000, // Georgia
      'college_101474': 90000, // Penn State
      'college_101483': 60000, // Ohio State
      'college_101492': 45000, // Indiana
      'college_101501': 50000, // Rutgers
      'college_101510': 30000, // UT Dallas
      'college_101519': 75000, // Arizona State
      'college_101528': 45000, // Arizona
      'college_101537': 35000, // Colorado
      'college_101546': 50000, // Washington
      'college_101555': 22000, // Oregon
      'college_101564': 52000, // Minnesota
      'college_101573': 30000, // Iowa
      'college_101582': 28000, // Kansas
      'college_101591': 30000, // Missouri
      'college_101600': 25000, // Nebraska
      'college_101609': 28000, // Oklahoma
      'college_101618': 29000, // Arkansas
      'college_101627': 35000, // LSU
    }
    return enrollmentMap[collegeId] || 25000
  }
  
  const getDifficultyLevel = (tier: string) => {
    switch (tier) {
      case 'Elite': return 'Extremely High'
      case 'Highly Selective': return 'Very High'
      case 'Selective': return 'High'
      default: return 'Moderate'
    }
  }
  
  const getPopularMajorsForCollege = (collegeName: string, intendedMajor: string) => {
    // Return majors relevant to the college and user's intended major
    const majorMap: { [key: string]: string[] } = {
      'Harvard University': ['Economics', 'Political Science', 'Computer Science', 'Psychology', 'Biology'],
      'Stanford University': ['Computer Science', 'Engineering', 'Business', 'Biology', 'Psychology'],
      'Yale University': ['Economics', 'Political Science', 'History', 'Psychology', 'Biology'],
      'Princeton University': ['Economics', 'Public Policy', 'Computer Science', 'Engineering', 'Politics'],
      'MIT': ['Computer Science', 'Engineering', 'Mathematics', 'Physics', 'Economics'],
      'Columbia University': ['Economics', 'Political Science', 'Computer Science', 'Business', 'Journalism'],
      'University of Pennsylvania': ['Business', 'Economics', 'Computer Science', 'Nursing', 'Engineering'],
      'Brown University': ['Economics', 'Computer Science', 'Biology', 'International Relations', 'Psychology'],
      'Dartmouth College': ['Economics', 'Government', 'Computer Science', 'Engineering', 'Psychology'],
      'Cornell University': ['Engineering', 'Business', 'Computer Science', 'Agriculture', 'Hotel Administration'],
      'Duke University': ['Economics', 'Public Policy', 'Computer Science', 'Biology', 'Psychology'],
      'Northwestern University': ['Journalism', 'Economics', 'Computer Science', 'Engineering', 'Psychology'],
      'Vanderbilt University': ['Economics', 'Computer Science', 'Engineering', 'Psychology', 'Biology'],
      'Rice University': ['Engineering', 'Computer Science', 'Economics', 'Biology', 'Psychology'],
      'University of Notre Dame': ['Business', 'Economics', 'Engineering', 'Computer Science', 'Psychology'],
      'University of Chicago': ['Economics', 'Mathematics', 'Computer Science', 'Public Policy', 'Psychology'],
      'University of California, Berkeley': ['Computer Science', 'Engineering', 'Business', 'Economics', 'Biology'],
      'Georgetown University': ['International Relations', 'Political Science', 'Business', 'Economics', 'Psychology'],
      'University of California, Los Angeles': ['Business', 'Psychology', 'Biology', 'Computer Science', 'Economics'],
      'University of Michigan': ['Business', 'Engineering', 'Computer Science', 'Psychology', 'Economics'],
      'University of Virginia': ['Business', 'Economics', 'Computer Science', 'Psychology', 'Biology'],
      'University of North Carolina at Chapel Hill': ['Business', 'Psychology', 'Biology', 'Journalism', 'Economics'],
      'Georgia Institute of Technology': ['Engineering', 'Computer Science', 'Business', 'Mathematics', 'Physics'],
      'University of Illinois at Urbana-Champaign': ['Engineering', 'Computer Science', 'Business', 'Psychology', 'Economics'],
      'University of Texas at Austin': ['Business', 'Engineering', 'Computer Science', 'Psychology', 'Economics'],
      'University of Wisconsin-Madison': ['Business', 'Psychology', 'Biology', 'Economics', 'Computer Science'],
      'Purdue University': ['Engineering', 'Business', 'Computer Science', 'Agriculture', 'Psychology'],
      'New York University': ['Business', 'Economics', 'Computer Science', 'Psychology', 'Film'],
      'University of Southern California': ['Business', 'Engineering', 'Computer Science', 'Film', 'Psychology'],
      'Boston College': ['Business', 'Economics', 'Psychology', 'Biology', 'Computer Science'],
      'Tufts University': ['International Relations', 'Economics', 'Psychology', 'Biology', 'Computer Science'],
      'Emory University': ['Business', 'Economics', 'Psychology', 'Biology', 'Computer Science'],
      'Wake Forest University': ['Business', 'Economics', 'Psychology', 'Biology', 'Political Science'],
      'Carnegie Mellon University': ['Computer Science', 'Engineering', 'Business', 'Drama', 'Psychology'],
      'Washington University in St. Louis': ['Business', 'Economics', 'Psychology', 'Biology', 'Computer Science'],
    }
    
    const collegeMajors = majorMap[collegeName] || ['Business', 'Economics', 'Psychology', 'Biology', 'Computer Science']
    
    // Prioritize the user's intended major
    if (collegeMajors.includes(intendedMajor)) {
      return [intendedMajor, ...collegeMajors.filter(major => major !== intendedMajor).slice(0, 2)]
    }
    
    return collegeMajors.slice(0, 3)
  }
  
  const getDescriptionForCollege = (collegeName: string, intendedMajor: string) => {
    const descriptions: { [key: string]: string } = {
      'Harvard University': 'World-renowned research university with exceptional programs across all disciplines.',
      'Stanford University': 'Leading research university known for innovation and entrepreneurship.',
      'Yale University': 'Ivy League institution with strong liberal arts and professional programs.',
      'Princeton University': 'Elite research university with strong focus on undergraduate education.',
      'MIT': 'Premier institution for science, technology, and innovation.',
      'Columbia University': 'Ivy League university in the heart of New York City.',
      'University of Pennsylvania': 'Ivy League university with strong business and professional programs.',
      'Brown University': 'Ivy League university known for its open curriculum and innovative approach.',
      'Dartmouth College': 'Ivy League liberal arts college with strong undergraduate focus.',
      'Cornell University': 'Ivy League university with diverse programs and strong research focus.',
      'Duke University': 'Elite private research university with strong athletics and academics.',
      'Northwestern University': 'Elite private research university with strong journalism and media programs.',
      'Vanderbilt University': 'Elite private research university in Nashville, Tennessee.',
      'Rice University': 'Elite private research university with strong engineering and science programs.',
      'University of Notre Dame': 'Elite Catholic research university with strong tradition and academics.',
      'University of Chicago': 'Elite private research university known for rigorous academics.',
      'University of California, Berkeley': 'Premier public research university with world-class programs.',
      'Georgetown University': 'Elite private research university in Washington, D.C.',
      'University of California, Los Angeles': 'Premier public research university in Los Angeles.',
      'University of Michigan': 'Premier public research university with strong tradition.',
      'University of Virginia': 'Premier public research university founded by Thomas Jefferson.',
      'University of North Carolina at Chapel Hill': 'Premier public research university with strong programs.',
      'Georgia Institute of Technology': 'Premier public research university specializing in technology.',
      'University of Illinois at Urbana-Champaign': 'Premier public research university with strong engineering.',
      'University of Texas at Austin': 'Premier public research university in Texas.',
      'University of Wisconsin-Madison': 'Premier public research university with strong tradition.',
      'Purdue University': 'Premier public research university with strong engineering programs.',
      'New York University': 'Elite private research university in New York City.',
      'University of Southern California': 'Elite private research university in Los Angeles.',
      'Boston College': 'Elite private research university with strong Catholic tradition.',
      'Tufts University': 'Elite private research university with strong international focus.',
      'Emory University': 'Elite private research university with strong healthcare programs.',
      'Wake Forest University': 'Elite private research university with strong undergraduate focus.',
      'Carnegie Mellon University': 'Elite private research university specializing in technology and arts.',
      'Washington University in St. Louis': 'Elite private research university with strong programs.',
    }
    
    return descriptions[collegeName] || 'Premier institution with strong academic programs.'
  }

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
