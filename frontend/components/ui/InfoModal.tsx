'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  examples?: string[]
}

export const InfoModal = ({ isOpen, onClose, title, description, examples }: InfoModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-xl border border-yellow-400/20 rounded-2xl shadow-2xl shadow-yellow-400/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ 
                scale: 0.8,
                opacity: 0,
                y: 50
              }}
              animate={{ 
                scale: 1,
                opacity: 1,
                y: 0
              }}
              exit={{ 
                scale: 0.8,
                opacity: 0,
                y: 50
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-400 hover:text-white" />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {description}
                </p>
                
                {examples && examples.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-yellow-400">Examples:</h3>
                    <ul className="space-y-2">
                      {examples.map((example, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-3 text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                          <span>{example}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
