'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface GoogleAccount {
  id: string
  name: string
  email: string
  picture?: string
  initial: string
}

interface FullScreenGoogleModalProps {
  isOpen: boolean
  onClose: () => void
  onAccountSelect: (account: GoogleAccount) => void
}

export default function FullScreenGoogleModal({ isOpen, onClose, onAccountSelect }: FullScreenGoogleModalProps) {
  const [accounts, setAccounts] = useState<GoogleAccount[]>([
    {
      id: '1',
      name: 'Abhi Jandyala',
      email: 'abhijandyala@gmail.com',
      picture: 'https://lh3.googleusercontent.com/a/default-user',
      initial: 'A'
    },
    {
      id: '2',
      name: 'DebateX',
      email: 'debatexai.com@gmail.com',
      initial: 'D'
    },
    {
      id: '3',
      name: 'BrosGood AtRNG',
      email: 'brosgoodatrng@gmail.com',
      initial: 'B'
    },
    {
      id: '4',
      name: 'Abhiraag Jandyala',
      email: '6996472989@student.ucps.k12.nc.us',
      initial: 'A'
    },
    {
      id: '5',
      name: 'Rex IsCool',
      email: 'rexiscool110409@gmail.com',
      initial: 'R'
    },
    {
      id: '6',
      name: 'Soap Fx',
      email: 'soapfxreborn@gmail.com',
      initial: 'S'
    },
    {
      id: '7',
      name: 'The TechLit NPO',
      email: 'techlitus@gmail.com',
      initial: 'T'
    }
  ])

  const handleAccountClick = (account: GoogleAccount) => {
    onAccountSelect(account)
    onClose()
  }

  const handleUseAnotherAccount = () => {
    // This would typically open the Google OAuth flow for adding a new account
    console.log('Use another account clicked')
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-gray-900"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          borderRadius: 0,
          border: 'none'
        }}
        onClick={onClose}
      >
        <div 
          className="w-full h-full bg-gray-900 overflow-hidden"
          style={{
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0,
            borderRadius: 0,
            border: 'none'
          }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <h1 className="text-xl font-semibold text-white">Sign in with Google</h1>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="flex h-full">
              {/* Left Panel - Branding */}
              <div className="w-1/2 bg-gray-800 flex flex-col items-center justify-center p-12">
                <div className="w-24 h-24 bg-white border-2 border-white rounded-2xl flex items-center justify-center mb-8">
                  <span className="text-4xl font-bold text-black">CAI</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">Choose an account</h2>
                <p className="text-gray-400 text-lg">
                  to continue to <span className="text-blue-400">Chancify AI</span>
                </p>
              </div>

              {/* Right Panel - Account List */}
              <div className="w-1/2 p-6 overflow-y-auto bg-gray-900">
                <div className="space-y-2">
                  {accounts.map((account, index) => (
                    <motion.button
                      key={account.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAccountClick(account)}
                      className="w-full p-4 hover:bg-gray-700 rounded-xl transition-colors text-left border border-transparent hover:border-gray-500"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {account.picture ? (
                            <img 
                              src={account.picture} 
                              alt={account.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            account.initial
                          )}
                        </div>
                        <div>
                          <div className="text-white font-medium text-lg">{account.name}</div>
                          <div className="text-gray-400 text-sm">{account.email}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                  
                  {/* Use another account */}
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: accounts.length * 0.1 }}
                    onClick={handleUseAnotherAccount}
                    className="w-full p-4 hover:bg-gray-700 rounded-xl transition-colors text-left border border-transparent hover:border-gray-500"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-white font-medium text-lg">Use another account</div>
                        <div className="text-gray-400 text-sm">Add a new Google account</div>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm text-center">
                Before using this app, you can review{' '}
                <span className="text-blue-400 hover:underline cursor-pointer">Chancify AI's privacy policy</span>
                {' '}and{' '}
                <span className="text-blue-400 hover:underline cursor-pointer">terms of service</span>.
              </p>
            </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
