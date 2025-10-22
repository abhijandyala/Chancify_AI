'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Bookmark, FileText, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/watchlist', label: 'Watchlist', icon: Bookmark },
  { href: '/sat', label: 'SAT Prep', icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-r border-gray-800/50 p-6 flex flex-col z-20">
      {/* Logo */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
          Chancify AI
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Your Path to College
        </p>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          // Special shine animation for Home tab
          const isHome = item.href === '/home'
          
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * navItems.indexOf(item), duration: 0.5 }}
            >
              <Link
                href={item.href}
                className={cn(
                  'relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden group',
                  isActive
                    ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 text-yellow-400 shadow-lg shadow-yellow-400/20'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-700/50 border border-transparent',
                  isHome && !isActive && 'hover:shadow-lg hover:shadow-yellow-400/20'
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 relative z-10 transition-colors duration-300",
                  isActive ? "text-yellow-400" : "text-gray-400 group-hover:text-white"
                )} />
                <span className="font-semibold relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
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
      </nav>

      {/* Footer */}
      <motion.div 
        className="mt-auto pt-6 border-t border-gray-800/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p className="text-xs text-gray-500 text-center">
          Powered by AI
          <br />
          <span className="text-yellow-400 font-semibold">85.51% ROC-AUC</span>
        </p>
      </motion.div>
    </aside>
  )
}

