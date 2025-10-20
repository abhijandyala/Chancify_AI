'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SearchableSelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  error?: string
  className?: string
}

export const SearchableSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Search...',
  error,
  className,
}: SearchableSelectProps) => {
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

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option: string) => {
    onChange(option)
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className="w-full" ref={containerRef}>
      {label && <label className="label-text">{label}</label>}
      
      <div className="relative">
        <div
          className={cn(
            'input-glass cursor-pointer flex items-center justify-between min-h-[44px] px-4',
            error && 'border-red-500',
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={value ? 'text-white font-medium' : 'text-gray-400'}>
            {value || 'Select a major...'}
          </span>
          <svg
            className={cn(
              'w-5 h-5 transition-transform text-gray-400',
              isOpen && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-gray-900 rounded-xl border border-gray-700 shadow-2xl max-h-[300px] overflow-hidden flex flex-col backdrop-blur-sm">
            <div className="p-3 border-b border-gray-700 bg-gray-800/90">
              <input
                type="text"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
            
            <div className="overflow-y-auto bg-gray-900">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-400">No majors found</div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option}
                    className={cn(
                      'px-4 py-3 cursor-pointer hover:bg-gray-800 text-gray-100 text-sm transition-colors border-b border-gray-800 last:border-b-0',
                      value === option && 'bg-blue-600 text-white font-medium'
                    )}
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}

