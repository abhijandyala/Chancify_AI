'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SimpleGoogleOAuth() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = () => {
    if (isLoading) return
    
    setIsLoading(true)
    
    // Direct popup approach - this should definitely show the account selection
    const popup = window.open(
      `https://accounts.google.com/oauth/authorize?` +
      `client_id=117818010137-4fmntjdknmm16c9eef296196isok6620.apps.googleusercontent.com&` +
      `redirect_uri=${encodeURIComponent(window.location.origin)}&` +
      `response_type=code&` +
      `scope=openid%20email%20profile&` +
      `access_type=offline&` +
      `prompt=select_account`,
      'google-auth',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    )

    // Check if popup was blocked
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      setIsLoading(false)
      alert('Popup was blocked. Please allow popups for this site and try again.')
      return
    }

    // Simulate successful auth for now (since we don't have backend handling)
    setTimeout(() => {
      // Store mock user data
      const userData = {
        email: 'abhijandyala@gmail.com',
        name: 'Abhi Jandyala',
        picture: 'https://lh3.googleusercontent.com/a/default-user',
        google_id: 'mock_google_id',
        provider: 'google'
      }
      
      localStorage.setItem('auth_token', 'mock_token')
      localStorage.setItem('user_data', JSON.stringify(userData))
      localStorage.setItem('provider', 'google')
      
      popup.close()
      setIsLoading(false)
      router.push('/profile')
    }, 2000)
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full bg-white hover:bg-gray-100 disabled:bg-white/50 text-black font-semibold py-3 rounded-xl border border-gray-300 transition-all duration-200 flex items-center justify-center gap-3"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      {isLoading ? 'Opening Google...' : 'Continue with Google'}
    </button>
  )
}
