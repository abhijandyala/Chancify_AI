import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl, withNgrokHeaders } from '@/lib/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Forward the request to the Python backend
    // Use getApiBaseUrl() which prioritizes ngrok URL (PRIMARY), localhost (FALLBACK)
    const backendUrl = getApiBaseUrl()
    
    // CRITICAL: Use the correct endpoint that uses ML models
    // This endpoint is /api/predict/frontend, not /predict
    const headers = withNgrokHeaders(backendUrl, {
      'Content-Type': 'application/json',
    })
    
    const response = await fetch(`${backendUrl}/api/predict/frontend`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Backend error (${response.status}):`, errorText)
      throw new Error(`Backend responded with status: ${response.status}`)
    }
    
    const result = await response.json()
    
    // Verify ML models are being used
    if (result.model_used === 'formula_only' || result.prediction_method === 'deterministic_fallback') {
      console.warn('⚠️ WARNING: Backend returned fallback prediction. ML models may not be loaded.')
    }
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Error in predict API route:', error)
    
    // Return error response instead of mock - let frontend handle it
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to get prediction from backend',
        probability: 0,
        outcome: 'Error',
        // Don't return mock data - this causes fallback issues
      },
      { status: 500 }
    )
  }
}
