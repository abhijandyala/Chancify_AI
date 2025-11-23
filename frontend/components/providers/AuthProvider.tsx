'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { getApiBaseUrl, withNgrokHeaders } from '@/lib/config'

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

  // Track if checkAuthStatus is currently running to prevent concurrent calls
  const isCheckingAuthRef = useRef(false)

  // Check authentication status on mount and when storage changes
  const checkAuthStatus = useCallback(async () => {
    // Prevent concurrent calls
    if (isCheckingAuthRef.current) {
      console.log('Auth check already in progress, skipping...')
      return
    }

    try {
      if (typeof window === 'undefined') return

      isCheckingAuthRef.current = true
      const authToken = localStorage.getItem('auth_token')
      const userEmail = localStorage.getItem('user_email')
      const userName = localStorage.getItem('user_name')

      if (authToken && userEmail) {
        // IMMEDIATELY set user state from localStorage to prevent redirect loops
        // This ensures isAuthenticated is true while we verify with backend
        const isGoogleToken = authToken.startsWith('google_token_')
        setUser({
          id: isGoogleToken ? 'google_user' : 'demo_user',
          email: userEmail,
          name: userName || undefined
        })
        // Verify token with backend
        const API_BASE_URL = getApiBaseUrl()
        const headers = withNgrokHeaders(API_BASE_URL, {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        })

        try {
          // Create abort controller for timeout
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
          
          let response: Response
          try {
            response = await fetch(`${API_BASE_URL}/api/auth/me`, {
              method: 'GET',
              headers,
              signal: controller.signal,
            })
          } finally {
            clearTimeout(timeoutId)
          }

          if (response.ok) {
            const userData = await response.json()
            setUser({
              id: userData.id || 'demo_user',
              email: userEmail,
              name: userName || userData.name
            })
          } else if (response.status === 401 || response.status === 403) {
            // Only clear token if we get unauthorized/forbidden (token is actually invalid)
            console.warn('Token is invalid (401/403), clearing auth data')
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_email')
            localStorage.removeItem('user_name')
            setUser(null)
          } else {
            // For other errors (network, 5xx, etc.), backend might be down but token could be valid
            // Use local storage as fallback to prevent auth loops
            console.warn('Backend unavailable or error (status:', response.status, '), using local auth data')
            // Check if token looks like a Google OAuth token
            const isGoogleToken = authToken.startsWith('google_token_')
            setUser({
              id: isGoogleToken ? 'google_user' : 'demo_user',
              email: userEmail,
              name: userName || undefined
            })
          }
        } catch (error: any) {
          // Handle AbortError from timeout
          if (error?.name === 'AbortError') {
            console.warn('Auth check timed out, using local auth data')
          } else {
            console.error('Auth verification failed (network error):', error)
          }
          // Network error - backend might be unreachable, but token could still be valid
          // Use local storage as fallback to prevent auth loops
          const isGoogleToken = authToken.startsWith('google_token_')
          setUser({
            id: isGoogleToken ? 'google_user' : 'demo_user',
            email: userEmail,
            name: userName || undefined
          })
        }
      } else {
        // No token or email in localStorage - user is not authenticated
        setUser(null)
      }
    } catch (error) {
      // Only clear user if we don't have valid localStorage data
      // This prevents clearing auth state on unexpected errors
      const authToken = localStorage.getItem('auth_token')
      const userEmail = localStorage.getItem('user_email')
      
      if (!authToken || !userEmail) {
        console.error('Auth check failed and no valid localStorage data:', error)
        setUser(null)
      } else {
        // We have valid localStorage data, preserve user state even on error
        console.warn('Auth check error but preserving user state from localStorage:', error)
        const userName = localStorage.getItem('user_name')
        const isGoogleToken = authToken.startsWith('google_token_')
        setUser({
          id: isGoogleToken ? 'google_user' : 'demo_user',
          email: userEmail,
          name: userName || undefined
        })
      }
    } finally {
      isCheckingAuthRef.current = false
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const API_BASE_URL = getApiBaseUrl()
      const headers = withNgrokHeaders(API_BASE_URL, {
        'Content-Type': 'application/json',
      })

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
      
      const API_BASE_URL = getApiBaseUrl()
      const headers = withNgrokHeaders(API_BASE_URL, {
        'Content-Type': 'application/json',
      })

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
    checkAuthStatus()
    
    // Check for Google OAuth callback
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const googleAuth = urlParams.get('google_auth')
      const email = urlParams.get('email')
      const name = urlParams.get('name')
      const token = urlParams.get('token')
      
      if (googleAuth === 'success' && email) {
        // User just completed Google OAuth
        console.log('Google OAuth success detected:', { email, name })
        
        // Store auth data
        localStorage.setItem('auth_token', token || ('google_token_' + Date.now()))
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
        
        // Trigger auth state change event
        window.dispatchEvent(new CustomEvent('authStateChanged'))
        
        // Clean up URL parameters
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete('google_auth')
        newUrl.searchParams.delete('email')
        newUrl.searchParams.delete('name')
        newUrl.searchParams.delete('picture')
        newUrl.searchParams.delete('token')
        window.history.replaceState({}, '', newUrl.toString())
        
        // Redirect to home page
        router.push('/home')
      }
    }
  }, [router])

  // Listen for storage changes (e.g., from other tabs)
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout | null = null

    const handleStorageChange = (e: StorageEvent) => {
      // Only react to auth-related storage changes
      if (e.key === 'auth_token' || e.key === 'user_email') {
        // Debounce to prevent rapid-fire calls
        if (debounceTimer) {
          clearTimeout(debounceTimer)
        }
        debounceTimer = setTimeout(() => {
          checkAuthStatus()
        }, 300) // 300ms debounce
      }
    }

    const handleAuthStateChange = () => {
      // Debounce to prevent rapid-fire calls
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
      debounceTimer = setTimeout(() => {
        checkAuthStatus()
      }, 300) // 300ms debounce
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('authStateChanged', handleAuthStateChange)

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authStateChanged', handleAuthStateChange)
    }
  }, [checkAuthStatus])

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
