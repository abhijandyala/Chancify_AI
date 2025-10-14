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
    <aside className="fixed left-0 top-0 h-screen w-64 glass-panel border-r border-gray-200/50 dark:border-white/10 p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold gradient-text">
          Chancify AI
        </h1>
        <p className="text-sm text-muted mt-1">
          Your Path to College
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          // Special shine animation for Home tab
          const isHome = item.href === '/home'
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 overflow-hidden',
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5',
                isHome && !isActive && 'hover:shadow-lg hover:shadow-amber-500/20 home-shine'
              )}
            >
              <Icon className="w-5 h-5 relative z-10" />
              <span className="font-semibold relative z-10">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="ml-auto w-2 h-2 rounded-full bg-white"
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10">
        <p className="text-xs text-muted text-center">
          Powered by AI
          <br />
          85.51% ROC-AUC
        </p>
      </div>
    </aside>
  )
}

