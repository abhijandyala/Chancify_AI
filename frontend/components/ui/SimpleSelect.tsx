'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

interface SimpleSelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  error?: string
  className?: string
}

export const SimpleSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Search...',
  error,
  className,
}: SimpleSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen && containerRef.current) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (option: string) => {
    onChange(option)
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className="w-full relative" ref={containerRef} style={{ zIndex: 99999999, overflow: 'visible' }}>
      {label && (
        <motion.label 
          className="block text-sm font-semibold text-gray-300 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        <motion.div
          className={cn(
            'relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-xl border border-gray-800/30 cursor-pointer flex items-center justify-between min-h-[56px] px-4 hover:border-yellow-400/30 transition-all duration-300',
            error && 'border-red-500',
            isOpen && 'border-yellow-400/50 shadow-lg shadow-yellow-400/10',
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className={value ? 'text-white font-medium text-lg' : 'text-gray-400 text-lg'}>
            {value || placeholder}
          </span>
          
          <motion.svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </motion.div>

        <AnimatePresence>
          {isOpen && createPortal(
            <motion.div 
              className="fixed bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-xl border border-gray-800/50 shadow-2xl max-h-[500px] overflow-hidden flex flex-col"
              style={{ 
                zIndex: 99999999,
                top: containerRef.current ? containerRef.current.getBoundingClientRect().bottom + 8 : 0,
                left: containerRef.current ? containerRef.current.getBoundingClientRect().left : 0,
                width: containerRef.current ? containerRef.current.getBoundingClientRect().width : 'auto'
              }}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 border-b border-gray-800/50 bg-gradient-to-r from-yellow-400/5 to-transparent">
                <motion.input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 placeholder-gray-400"
                  placeholder={placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                />
              </div>
              
              <div className="overflow-y-auto bg-transparent max-h-[400px]">
                {filteredOptions.length === 0 ? (
                  <motion.div 
                    className="px-4 py-6 text-center text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-lg mb-2">🔍</div>
                    <div>No options found</div>
                    <div className="text-sm text-gray-500 mt-1">Try a different search term</div>
                  </motion.div>
                ) : (
                  <div className="p-2">
                    {filteredOptions.slice(0, 20).map((option, index) => (
                      <motion.div
                        key={option}
                        className={cn(
                          'px-4 py-3 cursor-pointer rounded-xl text-gray-100 transition-all duration-200 border border-transparent hover:border-gray-700/50 hover:bg-gray-800/30 mb-1',
                          value === option && 'bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border-yellow-400/30 text-yellow-100'
                        )}
                        onClick={() => handleSelect(option)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02, duration: 0.3 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option}</span>
                          {value === option && (
                            <motion.div
                              className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>,
            document.body
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.p 
          className="mt-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-2 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

