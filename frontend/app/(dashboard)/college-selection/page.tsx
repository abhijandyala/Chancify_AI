'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, Building2, Users, DollarSign, GraduationCap, ChevronRight, Star, MapPin, Loader2 } from 'lucide-react'
import { COLLEGES } from '@/lib/colleges'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { getCollegeSuggestions, getAdmissionProbability, type PredictionRequest, type CollegeSuggestionsRequest, type CollegeSuggestion } from '@/lib/api'

export default function CollegeSelectionPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedColleges, setSelectedColleges] = useState<string[]>([])
  const [suggestedColleges, setSuggestedColleges] = useState<CollegeSuggestion[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false)
  const [predictionResults, setPredictionResults] = useState<Record<string, any>>({})
  const [error, setError] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Filter colleges based on search query
  const filteredColleges = COLLEGES.filter(college =>
    college.label.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 20) // Limit to 20 results for performance

  // Get AI suggestions from real ML backend
  useEffect(() => {
    const loadAISuggestions = async () => {
      setIsLoadingSuggestions(true)
      setError(null)
      
      try {
        // Get user profile from localStorage
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}')
        
        // Create college suggestions request
        const collegeSuggestionsRequest: CollegeSuggestionsRequest = {
          gpa_unweighted: userProfile.gpa_unweighted || '',
          gpa_weighted: userProfile.gpa_weighted || '',
          sat: userProfile.sat || '',
          act: userProfile.act || '',
          major: userProfile.major || 'Computer Science',
          extracurricular_depth: userProfile.extracurricular_depth || '5',
          leadership_positions: userProfile.leadership_positions || '5',
          awards_publications: userProfile.awards_publications || '5',
          passion_projects: userProfile.passion_projects || '5',
          business_ventures: userProfile.business_ventures || '5',
          volunteer_work: userProfile.volunteer_work || '5',
          research_experience: userProfile.research_experience || '5',
          portfolio_audition: userProfile.portfolio_audition || '5',
          essay_quality: userProfile.essay_quality || '5',
          recommendations: userProfile.recommendations || '5',
          interview: userProfile.interview || '5',
          demonstrated_interest: userProfile.demonstrated_interest || '5',
          legacy_status: userProfile.legacy_status || '5',
          hs_reputation: userProfile.hs_reputation || '5',
          geographic_diversity: userProfile.geographic_diversity || '5',
          plan_timing: userProfile.plan_timing || '5',
          geography_residency: userProfile.geography_residency || '5',
          firstgen_diversity: userProfile.firstgen_diversity || '5',
          ability_to_pay: userProfile.ability_to_pay || '5',
          policy_knob: userProfile.policy_knob || '5',
          conduct_record: userProfile.conduct_record || '5'
        }
        
        // Get AI suggestions from backend
        const response = await getCollegeSuggestions(collegeSuggestionsRequest)
        
        if (response.success) {
          setSuggestedColleges(response.suggestions)
        } else {
          setError(response.message || 'Failed to get AI suggestions')
        }
      } catch (err) {
        console.error('Error loading AI suggestions:', err)
        setError('Failed to load AI suggestions. Please try again.')
      } finally {
        setIsLoadingSuggestions(false)
      }
    }
    
    loadAISuggestions()
  }, [])

  // Listen for profile changes to regenerate suggestions
  useEffect(() => {
    const handleProfileChange = () => {
      // Reload suggestions when profile changes
      const loadAISuggestions = async () => {
        setIsLoadingSuggestions(true)
        setError(null)
        
        try {
          const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}')
          
          const collegeSuggestionsRequest: CollegeSuggestionsRequest = {
            gpa_unweighted: userProfile.gpa_unweighted || '',
            gpa_weighted: userProfile.gpa_weighted || '',
            sat: userProfile.sat || '',
            act: userProfile.act || '',
            major: userProfile.major || 'Computer Science',
            extracurricular_depth: userProfile.extracurricular_depth || '5',
            leadership_positions: userProfile.leadership_positions || '5',
            awards_publications: userProfile.awards_publications || '5',
            passion_projects: userProfile.passion_projects || '5',
            business_ventures: userProfile.business_ventures || '5',
            volunteer_work: userProfile.volunteer_work || '5',
            research_experience: userProfile.research_experience || '5',
            portfolio_audition: userProfile.portfolio_audition || '5',
            essay_quality: userProfile.essay_quality || '5',
            recommendations: userProfile.recommendations || '5',
            interview: userProfile.interview || '5',
            demonstrated_interest: userProfile.demonstrated_interest || '5',
            legacy_status: userProfile.legacy_status || '5',
            hs_reputation: userProfile.hs_reputation || '5',
            geographic_diversity: userProfile.geographic_diversity || '5',
            plan_timing: userProfile.plan_timing || '5',
            geography_residency: userProfile.geography_residency || '5',
            firstgen_diversity: userProfile.firstgen_diversity || '5',
            ability_to_pay: userProfile.ability_to_pay || '5',
            policy_knob: userProfile.policy_knob || '5',
            conduct_record: userProfile.conduct_record || '5'
          }
          
          const response = await getCollegeSuggestions(collegeSuggestionsRequest)
          
          if (response.success) {
            setSuggestedColleges(response.suggestions)
          } else {
            setError(response.message || 'Failed to get AI suggestions')
          }
        } catch (err) {
          console.error('Error loading AI suggestions:', err)
          setError('Failed to load AI suggestions. Please try again.')
        } finally {
          setIsLoadingSuggestions(false)
        }
      }
      
      loadAISuggestions()
    }
    
    // Listen for storage changes and custom events
    window.addEventListener('storage', handleProfileChange)
    window.addEventListener('profileUpdated', handleProfileChange)
    
    return () => {
      window.removeEventListener('storage', handleProfileChange)
      window.removeEventListener('profileUpdated', handleProfileChange)
    }
  }, [])

  // Handle college selection
  const handleCollegeSelect = (collegeId: string) => {
    setSelectedColleges(prev => 
      prev.includes(collegeId) 
        ? prev.filter(id => id !== collegeId)
        : [...prev, collegeId]
    )
  }

  // Get prediction for a specific college
  const handleGetPrediction = async (collegeId: string) => {
    setIsLoadingPrediction(true)
    
    try {
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}')
      
      const predictionRequest: PredictionRequest = {
        gpa_unweighted: userProfile.gpa_unweighted || '',
        gpa_weighted: userProfile.gpa_weighted || '',
        sat: userProfile.sat || '',
        act: userProfile.act || '',
        rigor: userProfile.rigor || '5',
        extracurricular_depth: userProfile.extracurricular_depth || '5',
        leadership_positions: userProfile.leadership_positions || '5',
        awards_publications: userProfile.awards_publications || '5',
        passion_projects: userProfile.passion_projects || '5',
        business_ventures: userProfile.business_ventures || '5',
        volunteer_work: userProfile.volunteer_work || '5',
        research_experience: userProfile.research_experience || '5',
        portfolio_audition: userProfile.portfolio_audition || '5',
        essay_quality: userProfile.essay_quality || '5',
        recommendations: userProfile.recommendations || '5',
        interview: userProfile.interview || '5',
        demonstrated_interest: userProfile.demonstrated_interest || '5',
        legacy_status: userProfile.legacy_status || '5',
        hs_reputation: userProfile.hs_reputation || '5',
        major: userProfile.major || 'Computer Science',
        college: collegeId
      }
      
      const response = await getAdmissionProbability(predictionRequest)
      
      if (response.success) {
        setPredictionResults(prev => ({
          ...prev,
          [collegeId]: response
        }))
      } else {
        setError(response.message || 'Failed to get prediction')
      }
    } catch (err) {
      console.error('Error getting prediction:', err)
      setError('Failed to get prediction. Please try again.')
    } finally {
      setIsLoadingPrediction(false)
    }
  }

  // Animation variants
  const enter = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div {...enter} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-primary/15 text-primary">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">College Selection</h1>
            <p className="text-gray-400">AI-powered college recommendations and predictions</p>
          </div>
        </div>
      </motion.div>

      {/* Error Display */}
      {error && (
        <motion.div {...enter} className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-400">{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Search and Results */}
        <motion.div {...enter} className="space-y-6">
          {/* Search Bar */}
          <div className="rox-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Search Colleges</h2>
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="rox-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Search Results</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredColleges.map((college) => (
                <motion.div
                  key={college.value}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-3 border border-gray-600 rounded-lg hover:border-yellow-400/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedColleges.includes(college.value)}
                      onChange={() => handleCollegeSelect(college.value)}
                      className="w-4 h-4 text-yellow-400 bg-transparent border-gray-600 rounded focus:ring-yellow-400"
                    />
                    <div>
                      <p className="text-white font-medium">{college.label}</p>
                      <p className="text-gray-400 text-sm">{college.tier} • {college.acceptance_rate}% acceptance</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleGetPrediction(college.value)}
                    disabled={isLoadingPrediction}
                  >
                    {isLoadingPrediction ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Predict'
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - AI Suggestions */}
        <motion.div {...enter} className="space-y-6">
          <div className="rox-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4">AI Recommendations</h2>
            {isLoadingSuggestions ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
                <span className="ml-3 text-gray-400">Loading AI suggestions...</span>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Safety Schools (75%+ chance) */}
                {suggestedColleges.filter(c => c.category === 'safety').length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      Safety Schools (Top Tier)
                    </h3>
                    <div className="space-y-3">
                      {suggestedColleges.filter(c => c.category === 'safety').map((college, index) => (
                        <motion.div
                          key={college.college_id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 border border-green-400/30 bg-green-400/5 rounded-xl hover:border-green-400/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-white font-semibold">{college.name}</h4>
                              <p className="text-gray-400 text-sm">{college.selectivity_tier}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-green-400 font-bold text-lg">
                                {(college.probability * 100).toFixed(1)}%
                              </div>
                              <div className="text-green-400 text-sm font-medium">
                                Safety
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-300">
                              <Users className="w-4 h-4 text-green-400" />
                              <span>{(college.acceptance_rate * 100).toFixed(1)}% acceptance</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <MapPin className="w-4 h-4 text-blue-400" />
                              <span>{college.city}, {college.state}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <DollarSign className="w-4 h-4 text-yellow-400" />
                              <span>${college.tuition_in_state?.toLocaleString() || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <Star className="w-4 h-4 text-green-400" />
                              <span>High confidence</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex gap-2">
                            <input
                              type="checkbox"
                              checked={selectedColleges.includes(college.college_id)}
                              onChange={() => handleCollegeSelect(college.college_id)}
                              className="w-4 h-4 text-green-400 bg-transparent border-gray-600 rounded focus:ring-green-400"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleGetPrediction(college.college_id)}
                              disabled={isLoadingPrediction}
                            >
                              {isLoadingPrediction ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                'Get Detailed Prediction'
                              )}
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Target Schools (25-75% chance) */}
                {suggestedColleges.filter(c => c.category === 'target').length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      Target Schools (Middle Tier)
                    </h3>
                    <div className="space-y-3">
                      {suggestedColleges.filter(c => c.category === 'target').map((college, index) => (
                        <motion.div
                          key={college.college_id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 border border-yellow-400/30 bg-yellow-400/5 rounded-xl hover:border-yellow-400/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-white font-semibold">{college.name}</h4>
                              <p className="text-gray-400 text-sm">{college.selectivity_tier}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-yellow-400 font-bold text-lg">
                                {(college.probability * 100).toFixed(1)}%
                              </div>
                              <div className="text-yellow-400 text-sm font-medium">
                                Target
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-300">
                              <Users className="w-4 h-4 text-yellow-400" />
                              <span>{(college.acceptance_rate * 100).toFixed(1)}% acceptance</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <MapPin className="w-4 h-4 text-blue-400" />
                              <span>{college.city}, {college.state}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <DollarSign className="w-4 h-4 text-yellow-400" />
                              <span>${college.tuition_in_state?.toLocaleString() || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span>Good match</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex gap-2">
                            <input
                              type="checkbox"
                              checked={selectedColleges.includes(college.college_id)}
                              onChange={() => handleCollegeSelect(college.college_id)}
                              className="w-4 h-4 text-yellow-400 bg-transparent border-gray-600 rounded focus:ring-yellow-400"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleGetPrediction(college.college_id)}
                              disabled={isLoadingPrediction}
                            >
                              {isLoadingPrediction ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                'Get Detailed Prediction'
                              )}
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reach Schools (10-25% chance) */}
                {suggestedColleges.filter(c => c.category === 'reach').length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      Reach Schools (Challenging Tier)
                    </h3>
                    <div className="space-y-3">
                      {suggestedColleges.filter(c => c.category === 'reach').map((college, index) => (
                        <motion.div
                          key={college.college_id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 border border-red-400/30 bg-red-400/5 rounded-xl hover:border-red-400/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-white font-semibold">{college.name}</h4>
                              <p className="text-gray-400 text-sm">{college.selectivity_tier}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-red-400 font-bold text-lg">
                                {(college.probability * 100).toFixed(1)}%
                              </div>
                              <div className="text-red-400 text-sm font-medium">
                                Reach
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-300">
                              <Users className="w-4 h-4 text-red-400" />
                              <span>{(college.acceptance_rate * 100).toFixed(1)}% acceptance</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <MapPin className="w-4 h-4 text-blue-400" />
                              <span>{college.city}, {college.state}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <DollarSign className="w-4 h-4 text-yellow-400" />
                              <span>${college.tuition_in_state?.toLocaleString() || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <Star className="w-4 h-4 text-red-400" />
                              <span>Challenging</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex gap-2">
                            <input
                              type="checkbox"
                              checked={selectedColleges.includes(college.college_id)}
                              onChange={() => handleCollegeSelect(college.college_id)}
                              className="w-4 h-4 text-red-400 bg-transparent border-gray-600 rounded focus:ring-red-400"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleGetPrediction(college.college_id)}
                              disabled={isLoadingPrediction}
                            >
                              {isLoadingPrediction ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                'Get Detailed Prediction'
                              )}
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Prediction Results */}
      {Object.keys(predictionResults).length > 0 && (
        <motion.div {...enter} className="mt-8">
          <div className="rox-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Prediction Results</h2>
            <div className="space-y-4">
              {Object.entries(predictionResults).map(([collegeId, result]) => (
                <div key={collegeId} className="p-4 border border-gray-600 rounded-xl">
                  <h3 className="text-white font-semibold mb-2">{result.college_name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Probability</p>
                      <p className="text-yellow-400 font-bold">{(result.probability * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Category</p>
                      <p className="text-white capitalize">{result.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">ML Model</p>
                      <p className="text-white">{result.model_used}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Confidence</p>
                      <p className="text-white">{((result.confidence_interval.upper - result.confidence_interval.lower) * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">{result.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <motion.div {...enter} className="mt-8 flex justify-between">
        <Button
          variant="ghost"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            // Save selected colleges to localStorage for calculate page
            localStorage.setItem('selectedColleges', JSON.stringify(selectedColleges))
            router.push('/calculate')
          }}
          disabled={selectedColleges.length === 0}
        >
          Calculate My Chances
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  )
}