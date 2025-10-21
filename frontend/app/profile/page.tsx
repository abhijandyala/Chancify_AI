'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()

  useEffect(() => {
    // Simple authentication check - redirect to auth if no token
    const token = localStorage.getItem('auth_token')
    if (!token) {
      router.push('/auth')
    }
  }, [router])

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
