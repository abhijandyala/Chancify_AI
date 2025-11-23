'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // CRITICAL: Check if we're in the middle of processing OAuth
    // If OAuth params are present, wait a bit before redirecting
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const googleAuth = urlParams.get('google_auth')
      
      if (googleAuth === 'success') {
        // OAuth is being processed, wait before checking auth status
        console.log('🔐 ProtectedRoute: OAuth in progress, waiting...')
        return
      }
    }

    if (!isLoading && !isAuthenticated) {
      // Double-check localStorage in case auth state hasn't synced yet
      const authToken = localStorage.getItem('auth_token')
      const userEmail = localStorage.getItem('user_email')
      
      if (authToken && userEmail) {
        // We have auth data but state isn't synced yet, wait a bit
        console.log('🔐 ProtectedRoute: Auth data exists but state not synced, waiting...')
        return
      }
      
      // Check if user is in trial mode
      const trialMode = localStorage.getItem('trial_mode')
      if (!trialMode) {
        // Only redirect if we're sure user is not authenticated
        console.log('🔐 ProtectedRoute: No auth data, redirecting to /auth')
        router.push('/auth')
      }
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4 border border-white/20">
            <div className="text-white font-black text-2xl flex items-center">
              <span className="text-white">C</span>
              <span className="text-white">A</span>
              <span className="text-yellow-400">I</span>
            </div>
          </div>
          <div className="text-white text-lg font-semibold mb-2">Loading...</div>
          <div className="text-gray-400 text-sm">Checking authentication status</div>
        </div>
      </div>
    )
  }

  // Show fallback or redirect if not authenticated
  if (!isAuthenticated) {
    const trialMode = localStorage.getItem('trial_mode')
    if (trialMode) {
      // Allow access in trial mode
      return <>{children}</>
    }
    
    if (fallback) {
      return <>{fallback}</>
    }
    
    // Default: redirect to auth (this will be handled by useEffect)
    return null
  }

  // User is authenticated, show protected content
  return <>{children}</>
}
