'use client'

import { motion } from 'framer-motion'
import { Info } from 'lucide-react'

interface InfoIconProps {
  onClick: () => void
  className?: string
}

export const InfoIcon = ({ onClick, className = '' }: InfoIconProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-6 h-6 rounded-full border-2 border-blue-500 hover:border-blue-400 bg-transparent hover:bg-blue-500/10 flex items-center justify-center transition-all duration-200 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <span className="text-blue-500 hover:text-blue-400 text-sm font-medium">i</span>
    </motion.button>
  )
}
