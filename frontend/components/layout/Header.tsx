'use client'

import { Settings as SettingsIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeaderProps {
  title: string
  onSettingsClick: () => void
}

export function Header({ title, onSettingsClick }: HeaderProps) {
  return (
    <header className="glass-card px-6 py-4 flex items-center justify-between mb-6">
      <h1 className="section-heading mb-0">
        {title}
      </h1>
      <motion.button
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.3 }}
        onClick={onSettingsClick}
        className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
      >
        <SettingsIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </motion.button>
    </header>
  )
}

