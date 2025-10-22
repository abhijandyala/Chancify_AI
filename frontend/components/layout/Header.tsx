'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Settings as SettingsIcon, Bell, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isSignedIn, setIsSignedIn] = useState(false)
  
  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      if (typeof window !== 'undefined') {
        const authToken = localStorage.getItem('auth_token')
        setIsSignedIn(!!authToken)
      }
    }
    
    checkAuthStatus()
    
    // Listen for auth changes
    const handleStorageChange = () => {
      checkAuthStatus()
    }
    
    const handleAuthStateChange = () => {
      checkAuthStatus()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('authStateChanged', handleAuthStateChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authStateChanged', handleAuthStateChange)
    }
  }, [])
  
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

  const handleSignUpClick = () => {
    // Navigate to auth page
    router.push('/auth')
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
        {isSignedIn ? (
          // Show notification, profile, and settings buttons when signed in
          <>
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
          </>
        ) : (
          // Show "Sign up now" button when not signed in
          <motion.button
            onClick={handleSignUpClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl border-2 border-yellow-400/50 bg-yellow-400/10 hover:bg-yellow-400/20 hover:border-yellow-400/70 text-yellow-400 font-semibold transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
          >
            Sign up now
          </motion.button>
        )}
      </div>
    </header>
  )
}

