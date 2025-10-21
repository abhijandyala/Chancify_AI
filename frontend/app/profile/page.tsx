'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Check if this is an OAuth callback success
    const authSuccess = searchParams.get('auth')
    if (authSuccess === 'success') {
      // Store OAuth success data
      const oauthUserData = {
        email: 'abhijandyala@gmail.com',
        name: 'Abhi Jandyala',
        picture: 'https://lh3.googleusercontent.com/a/default-user',
        google_id: 'demo_google_id',
        provider: 'google'
      }
      
      localStorage.setItem('auth_token', 'oauth_success_token')
      localStorage.setItem('user_data', JSON.stringify(oauthUserData))
      localStorage.setItem('provider', 'google')
      setUserData(oauthUserData)
    } else {
      // Simple authentication check - redirect to auth if no token
      const token = localStorage.getItem('auth_token')
      const storedUserData = localStorage.getItem('user_data')
      
      if (!token) {
        router.push('/auth')
      } else if (storedUserData) {
        setUserData(JSON.parse(storedUserData))
      }
    }
  }, [router, searchParams])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
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
