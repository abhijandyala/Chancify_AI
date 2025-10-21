'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import SophisticatedBackground from '@/components/ui/SophisticatedBackground'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Simple authentication simulation
      if (isLogin) {
        // Login logic
        if (email && password) {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Store auth token
          localStorage.setItem('auth_token', 'demo_token_' + Date.now())
          localStorage.setItem('user_email', email)
          
          // Redirect to profile
          router.push('/profile')
        } else {
          setError('Please fill in all fields')
        }
      } else {
        // Signup logic
        if (email) {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Store auth token
          localStorage.setItem('auth_token', 'demo_token_' + Date.now())
          localStorage.setItem('user_email', email)
          
          // Redirect to profile
          router.push('/profile')
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

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Store auth token
      localStorage.setItem('auth_token', 'google_token_' + Date.now())
      localStorage.setItem('user_email', 'user@gmail.com')
      localStorage.setItem('provider', 'google')
      
      // Redirect to profile
      router.push('/profile')
    } catch (err) {
      setError('Google authentication failed. Please try again.')
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
              <div className="text-black font-black text-2xl flex items-center">
                <span className="text-black">C</span>
                <span className="text-black">A</span>
                <span className="text-yellow-500">I</span>
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

              {/* Password Input (only for login) */}
              <AnimatePresence>
                {isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password*"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

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
              <Button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-100 disabled:bg-white/50 text-black font-semibold py-3 rounded-xl border border-gray-300 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
