'use client'

import { useState, useRef, useEffect, useCallback, useMemo, startTransition } from 'react'
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
  const [isComposing, setIsComposing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  
  // Diagnostic logging to detect remounts
  const idRef = useRef(Math.random().toString(36).slice(2))
  useEffect(() => { 
    console.log('MAJOR INPUT MOUNT', idRef.current)
    return () => console.log('MAJOR INPUT UNMOUNT', idRef.current)
  }, [])

  // Sync local value with prop value only when not focused
  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setLocalValue(value)
    }
  }, [value])

  // Use local value for search
  const searchTerm = localValue

  // Filter majors based on search term - prioritize exact matches and popular majors
  const filteredMajors = useMemo(() => {
    if (!searchTerm) return MAJORS.slice(0, 12)
    
    return MAJORS.filter(major =>
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
  }, [searchTerm])

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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Don't process changes during IME composition
    if (isComposing) return
    
    const newValue = e.target.value
    setLocalValue(newValue)
    setIsOpen(newValue.length > 0)
    
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Use startTransition to keep typing responsive
    startTransition(() => {
      // Debounce the onChange call to parent
      timeoutRef.current = setTimeout(() => {
        onChange(newValue)
      }, 100)
    })
  }, [onChange, isComposing])

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
    // Keep focus in the input for continuous typing
    inputRef.current?.focus()
  }
  
  const handleCompositionStart = useCallback(() => {
    setIsComposing(true)
  }, [])
  
  const handleCompositionEnd = useCallback((e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false)
    // Process the final composed value
    const newValue = e.currentTarget.value
    setLocalValue(newValue)
    onChange(newValue)
  }, [onChange])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className={`space-y-1 sm:space-y-2 ${className}`} ref={containerRef}>
      <label className="block text-xs sm:text-sm font-semibold text-gray-300">
        {label}
      </label>
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="major-listbox"
          value={localValue ?? ''}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onBlur={(e) => {
            // Delay closing so option clicks (onMouseDown) can run first
            requestAnimationFrame(() => {
              if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
                setIsOpen(false)
              }
            })
          }}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/50 backdrop-blur border border-gray-800/30 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 text-sm sm:text-base"
        />

        <AnimatePresence>
          {isOpen && filteredMajors.length > 0 && (
            <motion.div
              id="major-listbox"
              role="listbox"
              className="absolute w-full mt-1 sm:mt-2 bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-xl rounded-lg sm:rounded-2xl border border-yellow-400/20 shadow-2xl shadow-yellow-400/10 max-h-[200px] sm:max-h-[240px] overflow-y-auto z-50"
              style={{ zIndex: 999999 }}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-2 sm:p-3">
                {filteredMajors.map((major) => (
                  <div
                    key={major}
                    role="option"
                    aria-selected={false}
                    tabIndex={-1}
                    className="px-3 sm:px-4 py-2 sm:py-3 cursor-pointer rounded-lg sm:rounded-xl text-gray-100 hover:bg-gradient-to-r hover:from-yellow-400/15 hover:to-yellow-600/10 hover:text-yellow-200 transition-all duration-300 border border-transparent hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/10 mb-1"
                    onMouseDown={(e) => e.preventDefault()} // Prevent blur before click handler fires
                    onClick={() => handleSuggestionClick(major)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm sm:text-base">{major}</span>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400/60 opacity-0 hover:opacity-100 transition-opacity duration-200" />
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
