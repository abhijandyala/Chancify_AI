'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name?: string) => Promise<boolean>
  logout: () => void
  checkAuthStatus: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Check authentication status on mount and when storage changes
  const checkAuthStatus = async () => {
    try {
      if (typeof window === 'undefined') return

      const authToken = localStorage.getItem('auth_token')
      const userEmail = localStorage.getItem('user_email')
      const userName = localStorage.getItem('user_name')

      if (authToken && userEmail) {
        // Verify token with backend
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://unsmug-untensely-elroy.ngrok-free.dev'
        const headers: HeadersInit = {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        }
        
        if (API_BASE_URL.includes('ngrok')) {
          headers['ngrok-skip-browser-warning'] = 'true'
        }

        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            method: 'GET',
            headers,
          })

          if (response.ok) {
            const userData = await response.json()
            setUser({
              id: userData.id || 'demo_user',
              email: userEmail,
              name: userName || userData.name
            })
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_email')
            localStorage.removeItem('user_name')
            setUser(null)
          }
        } catch (error) {
          console.error('Auth verification failed:', error)
          // For demo purposes, if backend is not available, use local storage
          setUser({
            id: 'demo_user',
            email: userEmail,
            name: userName || undefined
          })
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://unsmug-untensely-elroy.ngrok-free.dev'
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      
      if (API_BASE_URL.includes('ngrok')) {
        headers['ngrok-skip-browser-warning'] = 'true'
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
          const data = await response.json()
          
          // Store auth data
          localStorage.setItem('auth_token', data.access_token)
          localStorage.setItem('user_email', email)
          if (data.user?.name) {
            localStorage.setItem('user_name', data.user.name)
          }
          localStorage.removeItem('trial_mode') // Clear trial mode
          
          setUser({
            id: data.user?.id || 'demo_user',
            email: email,
            name: data.user?.name
          })

          // Trigger auth state change event
          window.dispatchEvent(new CustomEvent('authStateChanged'))
          return true
        } else {
          console.error('Login failed:', response.statusText)
          return false
        }
      } catch (error) {
        console.error('Login request failed:', error)
        // For demo purposes, simulate successful login
        localStorage.setItem('auth_token', 'demo_token_' + Date.now())
        localStorage.setItem('user_email', email)
        localStorage.removeItem('trial_mode')
        
        setUser({
          id: 'demo_user',
          email: email,
        })

        window.dispatchEvent(new CustomEvent('authStateChanged'))
        return true
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://unsmug-untensely-elroy.ngrok-free.dev'
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      
      if (API_BASE_URL.includes('ngrok')) {
        headers['ngrok-skip-browser-warning'] = 'true'
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ 
            email, 
            password, 
            profile_data: { 
              name: name || email.split('@')[0],
              email: email
            }
          }),
        })

        if (response.ok) {
          const data = await response.json()
          
          // Store auth data
          localStorage.setItem('auth_token', data.access_token)
          localStorage.setItem('user_email', email)
          if (name) {
            localStorage.setItem('user_name', name)
          }
          localStorage.removeItem('trial_mode')
          
          setUser({
            id: data.user?.id || 'demo_user',
            email: email,
            name: name
          })

          window.dispatchEvent(new CustomEvent('authStateChanged'))
          return true
        } else {
          console.error('Signup failed:', response.statusText)
          return false
        }
      } catch (error) {
        console.error('Signup request failed:', error)
        // For demo purposes, simulate successful signup
        localStorage.setItem('auth_token', 'demo_token_' + Date.now())
        localStorage.setItem('user_email', email)
        if (name) {
          localStorage.setItem('user_name', name)
        }
        localStorage.removeItem('trial_mode')
        
        setUser({
          id: 'demo_user',
          email: email,
          name: name
        })

        window.dispatchEvent(new CustomEvent('authStateChanged'))
        return true
      }
    } catch (error) {
      console.error('Signup error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear all auth data
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_email')
    localStorage.removeItem('user_name')
    localStorage.removeItem('trial_mode')
    
    setUser(null)
    
    // Trigger auth state change event
    window.dispatchEvent(new CustomEvent('authStateChanged'))
    
    // Redirect to landing page
    router.push('/')
  }

  // Check auth status on mount
  useEffect(() => {
    // Check for Google OAuth callback FIRST (before checkAuthStatus)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const googleAuth = urlParams.get('google_auth')
      const email = urlParams.get('email')
      const name = urlParams.get('name')
      
      if (googleAuth === 'success' && email) {
        // User just completed Google OAuth
        console.log('Google OAuth success detected:', { email, name })
        
        // Store auth data
        localStorage.setItem('auth_token', 'google_token_' + Date.now())
        localStorage.setItem('user_email', email)
        if (name) {
          localStorage.setItem('user_name', name)
        }
        localStorage.removeItem('trial_mode')
        
        setUser({
          id: 'google_user',
          email: email,
          name: name || undefined
        })
        
        // Clean up URL parameters immediately
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete('google_auth')
        newUrl.searchParams.delete('email')
        newUrl.searchParams.delete('name')
        newUrl.searchParams.delete('picture')
        window.history.replaceState({}, '', newUrl.toString())
        
        // Set isLoading to false since we've set the user
        setIsLoading(false)
        
        // DON'T redirect - let the current page handle it
        return
      }
    }
    
    // If no OAuth callback, check auth status normally
    checkAuthStatus()
  }, [router])

  // Listen for storage changes (e.g., from other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token' || e.key === 'user_email') {
        checkAuthStatus()
      }
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

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    checkAuthStatus,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
