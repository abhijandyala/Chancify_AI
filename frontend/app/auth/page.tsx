'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import SophisticatedBackground from '@/components/ui/SophisticatedBackground'
import NextAuthGoogleButton from '@/components/auth/NextAuthGoogleButton'
import SimpleGoogleOAuth from '@/components/auth/SimpleGoogleOAuth'
import { useAuth } from '@/components/providers/AuthProvider'

export default function AuthPage() {
  const router = useRouter()
  const { login, signup, isAuthenticated, isLoading: authLoading } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already authenticated OR handle OAuth success
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      
      // Check for Google OAuth success
      const googleAuth = urlParams.get('google_auth')
      const email = urlParams.get('email')
      const name = urlParams.get('name')
      
      if (googleAuth === 'success' && email) {
        // Set auth data in localStorage
        localStorage.setItem('auth_token', 'google_token_' + Date.now())
        localStorage.setItem('user_email', email)
        if (name) localStorage.setItem('user_name', name)
        localStorage.removeItem('trial_mode')
        
        // Clean up URL
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete('google_auth')
        newUrl.searchParams.delete('email')
        newUrl.searchParams.delete('name')
        newUrl.searchParams.delete('picture')
        window.history.replaceState({}, '', newUrl.toString())
        
        // Redirect to home
        router.push('/home')
        return
      }
      
      // Check for Google OAuth error
      const error = urlParams.get('error')
      if (error) {
        setError(`Google authentication failed: ${error}`)
        // Clean up URL
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete('error')
        window.history.replaceState({}, '', newUrl.toString())
      }
    }
    
    // Redirect if already authenticated
    if (isAuthenticated && !authLoading) {
      router.push('/home')
    }
  }, [isAuthenticated, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      let success = false
      
      if (isLogin) {
        // Login logic
        if (email && password) {
          success = await login(email, password)
          if (success) {
            router.push('/home')
          } else {
            setError('Invalid email or password. Please try again.')
          }
        } else {
          setError('Please fill in all fields')
        }
      } else {
        // Signup logic
        if (email) {
          success = await signup(email, password, name)
          if (success) {
            router.push('/home')
          } else {
            setError('Failed to create account. Please try again.')
          }
        } else {
          setError('Please enter your email')
        }
      }
    } catch (err) {
      setError('Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Sophisticated background with intricate symbols and designs */}
      <SophisticatedBackground />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* CAI Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4 border border-white/20">
              <div className="text-white font-black text-2xl flex items-center">
                <span className="text-white">C</span>
                <span className="text-white">A</span>
                <span className="text-yellow-400">I</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome' : 'Create Your Account'}
            </h1>
            <p className="text-gray-400">
              {isLogin ? 'Log in to continue to Chancify AI' : 'Sign up to continue to Chancify AI'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/50 border border-red-600 text-red-300 px-4 py-3 rounded-xl mb-4"
            >
              {error}
            </motion.div>
          )}

          {/* Auth Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input (only for signup) */}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name*"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      required={!isLogin}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Business email*"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isLogin ? "Password*" : "Create password*"}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-100 disabled:bg-white/50 text-black font-semibold py-3 rounded-xl transition-all duration-200"
              >
                {isLoading ? 'Please wait...' : 'Continue'}
              </Button>

              {/* Toggle between login/signup */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <span className="text-yellow-400 font-semibold">
                    {isLogin ? 'Sign up' : 'Log in'}
                  </span>
                </button>
              </div>

              {/* Separator */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">OR</span>
                </div>
              </div>

              {/* Google OAuth Button */}
              <SimpleGoogleOAuth />
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
