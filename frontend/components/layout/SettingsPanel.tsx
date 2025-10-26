'use client'

import { X, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'
import { useAuth } from '@/components/providers/AuthProvider'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    onClose()
  }

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
            className="fixed right-0 top-0 h-screen w-80 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-l border-gray-800/50 p-6 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                Settings
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Settings Content */}
            <div className="flex-1 space-y-6">

              {/* User Info */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                <p className="font-semibold text-white mb-2">
                  Account
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Email: {user?.email || 'Not signed in'}
                </p>
                {user?.name && (
                  <p className="text-sm text-gray-400 mb-4">
                    Name: {user.name}
                  </p>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              {/* Danger Zone (Placeholder) */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-2 border-red-500/20 rounded-xl p-4 opacity-50 cursor-not-allowed">
                <p className="font-semibold text-red-400 mb-2">
                  Danger Zone
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Permanently delete your account
                </p>
                <Button variant="ghost" size="sm" disabled className="text-red-500">
                  Delete Account
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-6 border-t border-gray-800/50">
              <p className="text-xs text-gray-500 text-center">
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

