'use client'

import { usePathname } from 'next/navigation'
import { Settings as SettingsIcon, Bell, User } from 'lucide-react'
import { motion } from 'framer-motion'

export function Header() {
  const pathname = usePathname()
  
  // Compute title from pathname
  const getTitle = () => {
    switch (pathname) {
      case '/home': return 'AI Assessment'
      case '/discover': return 'Discover Colleges'
      case '/watchlist': return 'Your Watchlist'
      case '/sat': return 'SAT Preparation'
      case '/results': return 'Prediction Results'
      default: return 'Dashboard'
    }
  }

  const handleSettingsClick = () => {
    // Emit custom event for settings panel
    window.dispatchEvent(new CustomEvent('open-settings'))
  }

  return (
    <header className="glass px-6 py-4 flex items-center justify-between mb-8 border border-white/10">
      <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl border border-white/10 bg-yellow-400/15 text-yellow-400 shadow-[0_0_40px_rgba(245,200,75,0.15)]">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">
            {getTitle()}
          </h1>
          <p className="text-sm text-gray-400">
            {pathname === '/home' && 'Complete your profile for AI analysis'}
            {pathname === '/discover' && 'Find colleges that match your profile'}
            {pathname === '/watchlist' && 'Track your favorite colleges'}
            {pathname === '/sat' && 'Practice and improve your scores'}
            {pathname === '/results' && 'Your admission probability results'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
        >
          <Bell className="w-5 h-5 text-gray-400 hover:text-yellow-400 transition-colors" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
        >
          <User className="w-5 h-5 text-gray-400 hover:text-yellow-400 transition-colors" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={handleSettingsClick}
          className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
        >
          <SettingsIcon className="w-5 h-5 text-gray-400 hover:text-yellow-400 transition-colors" />
        </motion.button>
      </div>
    </header>
  )
}

