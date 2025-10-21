'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('auth_token')
    
    if (!token) {
      // Redirect to auth page if not authenticated
      router.push('/auth')
    }
  }, [router])

  return null
}
