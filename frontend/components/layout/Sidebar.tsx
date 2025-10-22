'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Bookmark, FileText, Brain, Zap, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/home', label: 'Assessment', icon: Home },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/watchlist', label: 'Watchlist', icon: Bookmark },
  { href: '/sat', label: 'SAT Prep', icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass border-r border-white/10 flex flex-col z-20">
      {/* Brand Section - Minimal */}
      <motion.div 
        className="p-6 pb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400/20 to-amber-600/20 text-yellow-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-yellow-400 via-amber-200 to-white bg-clip-text text-transparent">
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
                      ? 'bg-gradient-to-r from-yellow-400/10 to-amber-600/10 border-yellow-400/20 text-yellow-400'
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
          <div className="text-xs font-semibold text-green-400">94.3%</div>
        </div>
      </motion.div>
    </aside>
  )
}

