'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'

function ProfileContent() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Check for Google OAuth callback
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const googleAuth = urlParams.get('google_auth')
      
      if (googleAuth === 'success') {
        // Handle Google OAuth success
        const userData = {
          email: urlParams.get('email') || '',
          name: urlParams.get('name') || '',
          picture: urlParams.get('picture') || '',
          provider: 'google'
        }
        
        // Store user data
        localStorage.setItem('auth_token', 'google_oauth_' + Date.now())
        localStorage.setItem('user_data', JSON.stringify(userData))
        localStorage.setItem('provider', 'google')
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname)
        
        setUserData(userData)
        return
      }
      
      // Check for stored user data
      const token = localStorage.getItem('auth_token')
      const storedUserData = localStorage.getItem('user_data')
      
      if (!token) {
        router.push('/auth')
        return
      }
      
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData))
      }
    }
  }, [router])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      localStorage.removeItem('provider')
    }
    router.push('/auth')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Profile Page</h1>
          <p className="text-gray-400 mb-8">
            🎉 Authentication successful! This is a placeholder profile page.
          </p>
          
          <div className="bg-gray-900 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome to Chancify AI!</h2>
            {userData && (
              <div className="bg-gray-800 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={userData.picture} 
                    alt={userData.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{userData.name}</h3>
                    <p className="text-gray-400">{userData.email}</p>
                    <p className="text-sm text-green-400">✓ {userData.provider} Authentication</p>
                  </div>
                </div>
              </div>
            )}
            <p className="text-gray-300 mb-6">
              Your authentication is working correctly. This page will be developed with full profile functionality.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-xl p-4">
                <h3 className="text-lg font-medium mb-2">Next Steps:</h3>
                <ul className="text-gray-400 space-y-1">
                  <li>• Complete user profile setup</li>
                  <li>• Academic information input</li>
                  <li>• College search and matching</li>
                  <li>• Probability calculations</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  )
}
