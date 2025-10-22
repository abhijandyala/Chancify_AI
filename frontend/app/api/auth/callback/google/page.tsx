'use client'

import { useEffect } from 'react'

export default function GoogleCallbackPage() {
  useEffect(() => {
    // Get the authorization code from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const error = urlParams.get('error')
    
    if (error) {
      // Handle OAuth error
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error: error
      }, window.location.origin)
      window.close()
      return
    }
    
    if (code) {
      // Simulate successful authentication with the code
      // In a real app, you'd exchange this code for tokens on your backend
      const userData = {
        email: 'abhijandyala@gmail.com',
        name: 'Abhi Jandyala',
        picture: 'https://lh3.googleusercontent.com/a/default-user',
        google_id: 'real_google_id_123',
        provider: 'google'
      }
      
      // Send success message to parent window
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_SUCCESS',
        user: userData
      }, window.location.origin)
      
      // Close the popup
      window.close()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing Google sign-in...</p>
      </div>
    </div>
  )
}
