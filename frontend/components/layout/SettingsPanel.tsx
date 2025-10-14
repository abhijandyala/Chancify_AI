'use client'

import { X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toggle } from '../ui/Toggle'
import { useTheme } from '../providers/ThemeProvider'
import { Button } from '../ui/Button'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-80 glass-panel border-l border-gray-200/50 dark:border-white/10 p-6 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Settings
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Settings Content */}
            <div className="flex-1 space-y-6">
              {/* Theme Toggle */}
              <div className="glass-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? (
                      <Moon className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Sun className="w-5 h-5 text-amber-500" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Appearance
                      </p>
                      <p className="text-sm text-muted">
                        {theme === 'dark' ? 'Dark' : 'Light'} mode
                      </p>
                    </div>
                  </div>
                  <Toggle
                    enabled={theme === 'dark'}
                    onChange={toggleTheme}
                  />
                </div>
              </div>

              {/* User Info (Placeholder) */}
              <div className="glass-card p-4 opacity-50 cursor-not-allowed">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">
                  Account
                </p>
                <p className="text-sm text-muted mb-4">
                  Email: Coming soon
                </p>
                <Button variant="ghost" size="sm" disabled>
                  Sign Out
                </Button>
              </div>

              {/* Danger Zone (Placeholder) */}
              <div className="glass-card p-4 border-2 border-red-500/20 opacity-50 cursor-not-allowed">
                <p className="font-semibold text-red-600 dark:text-red-400 mb-2">
                  Danger Zone
                </p>
                <p className="text-sm text-muted mb-4">
                  Permanently delete your account
                </p>
                <Button variant="ghost" size="sm" disabled className="text-red-600">
                  Delete Account
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs text-muted text-center">
                Chancify AI v0.1.0
                <br />
                Made with precision
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

