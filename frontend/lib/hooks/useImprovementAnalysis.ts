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
      setImprovementData(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://unsmug-untensely-elroy.ngrok-free.dev'
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (API_BASE_URL.includes('ngrok')) {
        headers['ngrok-skip-browser-warning'] = 'true'
      }

      const response = await fetch(`${API_BASE_URL}/api/improvement-analysis/${encodeURIComponent(collegeName)}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(userProfile),
      })

      if (response.ok) {
        const data: ImprovementAnalysisData = await response.json()
        setImprovementData(data)
      } else {
        const errorData = await response.json()
        console.error(`Error fetching improvement analysis for ${collegeName}:`, errorData)
        setError(errorData.error || 'Failed to fetch improvement analysis')
        setImprovementData(null)
      }
    } catch (err) {
      console.error(`Network error fetching improvement analysis for ${collegeName}:`, err)
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
