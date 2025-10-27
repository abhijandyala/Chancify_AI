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
    if (!isLoading && !isAuthenticated) {
      // Check if user is in trial mode
      const trialMode = localStorage.getItem('trial_mode')
      if (!trialMode) {
        // Redirect to auth page if not authenticated and not in trial mode
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
