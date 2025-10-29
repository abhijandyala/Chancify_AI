import { useState, useEffect, useCallback } from 'react'

interface ImprovementArea {
  area: string
  current: string
  target: string
  impact: number
  priority: string
  description: string
  actionable_steps: string[]
}

interface ImprovementAnalysisData {
  success: boolean
  college_name: string
  improvements: ImprovementArea[]
  combined_impact: number
  total_improvements: number
  error?: string
}

export const useImprovementAnalysis = (collegeName: string, userProfile: any) => {
  const [improvementData, setImprovementData] = useState<ImprovementAnalysisData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchImprovementAnalysis = useCallback(async () => {
    if (!collegeName || !userProfile) {
      console.log('🚫 Skipping improvement analysis - missing collegeName or userProfile')
      setImprovementData(null)
      setLoading(false)
      return
    }

    console.log('🔄 Fetching improvement analysis for:', collegeName)
    console.log('🔄 User profile:', userProfile)
    
    setLoading(true)
    setError(null)

    try {
      const API_BASE_URL = 'https://unsmug-untensely-elroy.ngrok-free.dev'
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (API_BASE_URL.includes('ngrok')) {
        headers['ngrok-skip-browser-warning'] = 'true'
      }

      const url = `${API_BASE_URL}/api/improvement-analysis/${encodeURIComponent(collegeName)}`
      console.log('🔄 API URL:', url)
      console.log('🔄 Request body:', userProfile)

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userProfile),
      })

      console.log('🔄 Response status:', response.status)
      console.log('🔄 Response headers:', Object.fromEntries(response.headers.entries()))

      if (response.ok) {
        const data: ImprovementAnalysisData = await response.json()
        console.log('✅ Improvement analysis data received:', data)
        setImprovementData(data)
        setError(null)
      } else {
        const errorText = await response.text()
        console.error(`❌ Error fetching improvement analysis for ${collegeName}:`, {
          status: response.status,
          statusText: response.statusText,
          errorText
        })
        
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.error || errorMessage
        } catch {
          // Use the text error if JSON parsing fails
          errorMessage = errorText || errorMessage
        }
        
        setError(errorMessage)
        setImprovementData(null)
      }
    } catch (err) {
      console.error(`❌ Network error fetching improvement analysis for ${collegeName}:`, err)
      setError((err as Error).message || 'Network error')
      setImprovementData(null)
    } finally {
      setLoading(false)
    }
  }, [collegeName, userProfile])

  useEffect(() => {
    fetchImprovementAnalysis()
  }, [fetchImprovementAnalysis])

  return { improvementData, loading, error, refetch: fetchImprovementAnalysis }
}
