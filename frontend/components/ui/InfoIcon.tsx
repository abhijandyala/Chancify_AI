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
      className={`w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center transition-colors duration-200 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <Info className="w-4 h-4 text-white" />
    </motion.button>
  )
}
