import { useState, useEffect, useCallback } from 'react'
import { getApiBaseUrl, withNgrokHeaders } from '@/lib/config'

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

export const useImprovementAnalysis = (collegeName: string | null, userProfile: any) => {
  const [improvementData, setImprovementData] = useState<ImprovementAnalysisData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchImprovementAnalysis = useCallback(async () => {
    // Validate collegeName: must be a non-empty string (can be string or null)
    // Silently wait if collegeName is null/undefined (it will be set later)
    if (collegeName === null || collegeName === undefined) {
      // Don't log - this is expected during initial render
      setImprovementData(null)
      setLoading(false)
      setError(null)
      return
    }
    
    // Now we know it's not null, check if it's a string
    if (typeof collegeName !== 'string') {
      // Only log actual errors, not expected null states
      console.warn('⚠️ useImprovementAnalysis: collegeName is not a string', { type: typeof collegeName, value: collegeName })
      setImprovementData(null)
      setLoading(false)
      setError('Invalid college name type')
      return
    }
    
    // Trim and validate it's not empty
    const trimmedCollegeName = collegeName.trim()
    if (!trimmedCollegeName) {
      // Only log actual errors
      console.warn('⚠️ useImprovementAnalysis: collegeName is empty after trim', { original: collegeName })
      setImprovementData(null)
      setLoading(false)
      setError('College name is empty')
      return
    }

    // Validate userProfile: must be an object with at least some data
    if (!userProfile || typeof userProfile !== 'object' || Object.keys(userProfile).length === 0) {
      // Silently wait if userProfile is not ready yet
      setImprovementData(null)
      setLoading(false)
      setError(null)
      return
    }

    // Check if userProfile has at least one required field (basic validation)
    // Note: We check for !== undefined, not truthy, because empty strings are valid (user might not have entered data yet)
    const hasRequiredFields = userProfile.gpa_unweighted !== undefined || 
                              userProfile.gpa_weighted !== undefined || 
                              userProfile.sat !== undefined || 
                              userProfile.act !== undefined ||
                              userProfile.rigor !== undefined ||
                              userProfile.extracurricular_depth !== undefined
    if (!hasRequiredFields) {
      // Silently wait if required fields are not ready yet
      setImprovementData(null)
      setLoading(false)
      setError(null)
      return
    }

    // All validations passed - proceed with fetching
    setLoading(true)
    setError(null)

    try {
      const API_BASE_URL = getApiBaseUrl()
      const headers = withNgrokHeaders(API_BASE_URL, {
        'Content-Type': 'application/json',
      })

      const url = `${API_BASE_URL}/api/improvement-analysis/${encodeURIComponent(trimmedCollegeName)}`

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userProfile),
      })

      if (response.ok) {
        const data: ImprovementAnalysisData = await response.json()
        setImprovementData(data)
        setError(null)
      } else {
        const errorText = await response.text()
        console.error(`❌ Error fetching improvement analysis for ${trimmedCollegeName}:`, {
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
      console.error(`❌ Network error fetching improvement analysis for ${trimmedCollegeName}:`, err)
      setError((err as Error).message || 'Network error')
      setImprovementData(null)
    } finally {
      setLoading(false)
    }
  }, [collegeName, userProfile]) // Note: collegeName can be null, which is fine - the function handles it

  useEffect(() => {
    fetchImprovementAnalysis()
  }, [fetchImprovementAnalysis])

  return { improvementData, loading, error, refetch: fetchImprovementAnalysis }
}
