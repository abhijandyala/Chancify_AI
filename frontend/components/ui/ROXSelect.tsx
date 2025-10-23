'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface ROXSelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  error?: string
  className?: string
}

export const ROXSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option...',
  error,
  className
}: ROXSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className={`w-full space-y-1 sm:space-y-2 ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-xs sm:text-sm font-semibold text-gray-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        <motion.div
          className={`relative overflow-hidden rounded-lg sm:rounded-xl bg-black/50 backdrop-blur border cursor-pointer flex items-center justify-between min-h-[44px] sm:min-h-[56px] px-3 sm:px-4 hover:border-yellow-400/30 transition-all duration-300 ${
            error ? 'border-red-500' : 'border-gray-800/30'
          } ${isOpen ? 'border-yellow-400/50 shadow-lg shadow-yellow-400/10' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span className={`${value ? 'text-white font-medium' : 'text-gray-400'} text-sm sm:text-base lg:text-lg truncate pr-2`}>
            {selectedOption?.label || placeholder}
          </span>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute w-full mt-1 sm:mt-2 bg-black/90 backdrop-blur-xl rounded-lg sm:rounded-2xl border border-yellow-400/20 shadow-2xl shadow-yellow-400/10 max-h-[200px] sm:max-h-[240px] overflow-y-auto z-[9999]"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-2 sm:p-3">
                {options.map((option, index) => (
                  <motion.div
                    key={option.value}
                    className={`px-3 sm:px-4 py-2 sm:py-3 cursor-pointer rounded-lg sm:rounded-xl transition-all duration-300 border border-transparent mb-1 ${
                      value === option.value
                        ? 'bg-yellow-400/20 text-yellow-200 border-yellow-400/30'
                        : 'text-gray-100 hover:bg-yellow-400/15 hover:text-yellow-200 hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-400/10'
                    }`}
                    onClick={() => handleSelect(option.value)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    whileHover={{ scale: 1.02, x: 6 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm sm:text-base truncate pr-2">{option.label}</span>
                      {value === option.value && (
                        <motion.div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400 flex-shrink-0"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
          {error}
        </p>
      )}
    </div>
  )
}
