'use client'

import Reveal from './Reveal'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MAJORS } from '@/lib/majors'

export default function ROXHero() {
  const [selectedMajor, setSelectedMajor] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filter majors based on search query
  const filteredMajors = MAJORS.filter(major =>
    major.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 50) // Limit to 50 results for performance

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 py-16 sm:py-20 md:py-24">
        <Reveal>
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="hidden sm:inline">Chancify AI is now generally available!</span>
              <span className="sm:hidden">Now Available!</span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground text-center leading-tight px-2">
            College Admissions<br />
            <span className="text-primary">AI Predictor</span>
          </h1>
        </Reveal>
        
        <Reveal delay={0.1}>
          <p className="mt-4 sm:mt-6 text-foreground/70 max-w-xs sm:max-w-2xl md:max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-center mx-auto leading-relaxed px-2">
            <span className="hidden sm:inline">Fastest time-to-insight | Holistic analysis | Full-service deployment</span>
            <span className="sm:hidden">Fastest insights | Holistic analysis | Full deployment</span>
          </p>
        </Reveal>

        {/* Major Selection Card */}
        <Reveal delay={0.15}>
          <div className="mt-8 sm:mt-10 max-w-md mx-auto px-4">
            <div className="relative" ref={dropdownRef}>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-primary/15 text-primary">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Intended Major</h3>
                    <p className="text-sm text-white/60">Select your field of study</p>
                  </div>
                </div>
                
                <div className="relative">
                  <motion.button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-left flex items-center justify-between hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={selectedMajor ? 'text-white' : 'text-white/50'}>
                      {selectedMajor || 'Choose your major...'}
                    </span>
                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 text-white/50" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-[9999] max-h-80 overflow-hidden"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {/* Search Bar */}
                        <div className="p-3 border-b border-white/10">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                            <input
                              type="text"
                              placeholder="Search majors..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                            />
                          </div>
                        </div>

                        {/* Majors List */}
                        <div className="max-h-60 overflow-y-auto">
                          {filteredMajors.length > 0 ? (
                            filteredMajors.map((major, index) => (
                              <motion.button
                                key={major}
                                onClick={() => {
                                  setSelectedMajor(major)
                                  setIsDropdownOpen(false)
                                  setSearchQuery('')
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 border-b border-white/5 last:border-b-0"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.02 }}
                                whileHover={{ x: 4 }}
                              >
                                <span className="text-white text-sm">{major}</span>
                              </motion.button>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-center text-white/50">
                              <p>No majors found</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/auth" className="w-full sm:w-auto">
              <Button className="btn-primary text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <span className="hidden sm:inline">Log In</span>
                <span className="sm:hidden">Login</span>
              </Button>
            </Link>
            <Link href="/home" className="w-full sm:w-auto">
              <Button 
                variant="ghost" 
                className="text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 border border-border w-full sm:w-auto"
                onClick={() => {
                  // Set trial mode flag when clicking "Try for Now"
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('trial_mode', 'true')
                    localStorage.removeItem('auth_token') // Remove any existing auth token
                    // Trigger a custom event to notify header of trial mode change
                    window.dispatchEvent(new CustomEvent('trialModeChanged'))
                  }
                }}
              >
                <span className="hidden sm:inline">Try for Now</span>
                <span className="sm:hidden">Try Now</span>
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
      
      {/* Background Elements */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute -top-48 right-0 h-96 w-96 bg-primary/10 blur-3xl rounded-full"
      />
      <div 
        aria-hidden 
        className="pointer-events-none absolute -bottom-48 left-0 h-96 w-96 bg-accent/5 blur-3xl rounded-full"
      />
    </section>
  )
}
