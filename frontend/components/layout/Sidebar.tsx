'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Bookmark, FileText, Brain, Zap, ChevronRight, ChevronLeft, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/home', label: 'Assessment', icon: Home },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/watchlist', label: 'Watchlist', icon: Bookmark },
  { href: '/sat', label: 'SAT Prep', icon: FileText },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile hamburger menu
  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-50 p-3 rounded-xl bg-black/80 backdrop-blur border border-white/10 hover:bg-black/90 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-5 h-5 text-yellow-400" />
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {/* Mobile Sidebar */}
              <motion.aside
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed left-0 top-0 h-screen w-80 glass border-r border-white/10 flex flex-col z-50"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <div className="flex justify-between items-center p-6 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-400/20 text-yellow-400">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-yellow-400">Chancify AI</h1>
                      <p className="text-xs text-gray-500">Revenue Agents</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 px-6 pb-6">
                  <div className="space-y-2">
                    {navItems.map((item, index) => {
                      const isActive = pathname === item.href
                      const Icon = item.icon
                      
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.1 + (0.05 * index), 
                            duration: 0.3
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              'group relative flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300',
                              'hover:bg-white/5 border border-transparent',
                              isActive
                                ? 'bg-yellow-400/10 border-yellow-400/20 text-yellow-400'
                                : 'text-gray-400 hover:text-white hover:border-white/10'
                            )}
                          >
                            <Icon className={cn(
                              "w-5 h-5 transition-all duration-300",
                              isActive ? "text-yellow-400" : "text-gray-500 group-hover:text-white"
                            )} />
                            <span className="font-medium text-base">{item.label}</span>
                            
                            {isActive && (
                              <motion.div
                                layoutId="mobileActiveIndicator"
                                className="ml-auto w-2 h-2 rounded-full bg-yellow-400"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </nav>

                {/* Mobile Status */}
                <div className="p-6 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-sm text-gray-400">Model Status</span>
                    </div>
                    <div className="text-sm font-semibold text-green-400">81.8%</div>
                  </div>
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Desktop sidebar (original code)
  return (
    <>
      {/* Collapsed Sidebar - Just the arrow button */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.div
            initial={{ x: -64, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -64, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-1/2 -translate-y-1/2 z-30"
          >
            <motion.button
              onClick={onToggle}
              className="p-3 rounded-r-xl bg-black/80 backdrop-blur border border-white/10 border-l-0 hover:bg-black/90 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sidebar */}
      <motion.aside 
        className="fixed left-0 top-0 h-screen w-64 glass border-r border-white/10 flex flex-col z-20"
        animate={{ 
          x: isCollapsed ? -256 : 0,
          opacity: isCollapsed ? 0 : 1
        }}
        transition={{ duration: 0.3 }}
      >
      {/* Brand Section - Minimal */}
      <motion.div 
        className="p-6 pb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-400/20 text-yellow-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-yellow-400">
              Chancify AI
            </h1>
            <p className="text-xs text-gray-500">
              Revenue Agents
            </p>
          </div>
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Collapse Button - Middle of Sidebar */}
      <motion.div 
        className="flex justify-center py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
      >
        <motion.button
          onClick={onToggle}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
        </motion.button>
      </motion.div>

      {/* Clean Navigation - Bottom */}
      <motion.nav 
        className="p-6 pt-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
      >
        <div className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.4 + (0.1 * index), 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 120
                }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                    'hover:bg-white/5 border border-transparent',
                    isActive
                      ? 'bg-yellow-400/10 border-yellow-400/20 text-yellow-400'
                      : 'text-gray-400 hover:text-white hover:border-white/10'
                  )}
                >
                  <Icon className={cn(
                    "w-4 h-4 transition-all duration-300",
                    isActive ? "text-yellow-400" : "text-gray-500 group-hover:text-white"
                  )} />
                  <span className="font-medium text-sm">{item.label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  <motion.div
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -5 }}
                    whileHover={{ x: 0 }}
                  >
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.nav>

      {/* Performance Indicator - Minimal */}
      <motion.div 
        className="p-6 pt-4 border-t border-white/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-400">Model Status</span>
          </div>
          <div className="text-xs font-semibold text-green-400">81.8%</div>
        </div>
      </motion.div>
      </motion.aside>
    </>
  )
}

