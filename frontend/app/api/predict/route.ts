import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Forward the request to the Python backend
    // Use getApiBaseUrl() which prioritizes ngrok URL (PRIMARY), localhost (FALLBACK)
    const backendUrl = getApiBaseUrl()
    const response = await fetch(`${backendUrl}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }
    
    const result = await response.json()
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Error in predict API route:', error)
    
    // Return a mock response for development
    const mockResult = {
      probability: Math.random() * 0.4 + 0.3, // Random between 0.3 and 0.7
      outcome: Math.random() > 0.5 ? 'Acceptance' : 'Waitlist',
      confidence: 0.85,
      factors: {
        academic_strength: 0.8,
        extracurricular_impact: 0.7,
        essay_quality: 0.6,
        recommendations: 0.75
      }
    }
    
    return NextResponse.json(mockResult)
  }
}
