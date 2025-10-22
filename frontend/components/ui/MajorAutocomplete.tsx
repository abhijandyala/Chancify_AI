'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MAJORS } from '@/lib/majors'

interface MajorAutocompleteProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const MajorAutocomplete = ({
  label = 'Intended Major',
  value,
  onChange,
  placeholder = 'Type your major (e.g., Computer Science, Biology, Psychology...)',
  className
}: MajorAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sync local value with prop value
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Use local value for search
  const searchTerm = localValue

  // Filter majors based on search term - prioritize exact matches and popular majors
  const filteredMajors = MAJORS.filter(major =>
    major.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    // Prioritize exact matches
    if (a.toLowerCase() === searchTerm.toLowerCase()) return -1
    if (b.toLowerCase() === searchTerm.toLowerCase()) return 1
    // Prioritize popular majors
    const popularMajors = ['Computer Science', 'Business', 'Engineering', 'Medicine', 'Law', 'Arts', 'Psychology', 'Biology', 'Mathematics', 'Economics']
    const aIsPopular = popularMajors.includes(a)
    const bIsPopular = popularMajors.includes(b)
    if (aIsPopular && !bIsPopular) return -1
    if (!aIsPopular && bIsPopular) return 1
    return 0
  }).slice(0, 12) // Show more suggestions

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange(newValue)
    setIsOpen(newValue.length > 0)
  }, [onChange])

  // Prevent re-renders from causing focus loss
  const handleInputFocus = useCallback(() => {
    if (localValue.length > 0) {
      setIsOpen(true)
    }
  }, [localValue])

  const handleSuggestionClick = (major: string) => {
    setLocalValue(major)
    onChange(major)
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className={`space-y-2 ${className}`} ref={containerRef}>
      <label className="block text-sm font-semibold text-gray-300">
        {label}
      </label>
      
      <div className="relative">
        <input
          key="major-input"
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-black/50 backdrop-blur border border-gray-800/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
        />

        <AnimatePresence>
          {isOpen && filteredMajors.length > 0 && (
            <motion.div
              className="absolute w-full mt-2 bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-yellow-400/20 shadow-2xl shadow-yellow-400/10 max-h-[240px] overflow-y-auto"
              style={{ zIndex: 999999 }}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="p-3">
                {filteredMajors.map((major) => (
                  <div
                    key={major}
                    className="px-4 py-3 cursor-pointer rounded-xl text-gray-100 hover:bg-gradient-to-r hover:from-yellow-400/15 hover:to-yellow-600/10 hover:text-yellow-200 transition-all duration-300 border border-transparent hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/10 mb-1"
                    onClick={() => handleSuggestionClick(major)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-base">{major}</span>
                      <div className="w-2 h-2 rounded-full bg-yellow-400/60 opacity-0 hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-xs text-gray-500">
        Popular majors: Computer Science, Biology, Psychology, Business, Engineering, Medicine, Law, Arts
      </div>
    </div>
  )
}
