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
    console.log('🔍 useImprovementAnalysis hook called with:')
    console.log('  - collegeName:', collegeName, '(type:', typeof collegeName, ')')
    console.log('  - userProfile:', userProfile, '(type:', typeof userProfile, ')')
    
    // Validate collegeName: must be a non-empty string (can be string or null)
    // Handle null case explicitly
    if (collegeName === null || collegeName === undefined) {
      console.log('🚫 Skipping improvement analysis - collegeName is null/undefined')
      console.log('  - collegeName value:', collegeName)
      setImprovementData(null)
      setLoading(false)
      return
    }
    
    // Now we know it's not null, check if it's a string
    if (typeof collegeName !== 'string') {
      console.log('🚫 Skipping improvement analysis - collegeName is not a string')
      console.log('  - collegeName type:', typeof collegeName)
      console.log('  - collegeName value:', collegeName)
      setImprovementData(null)
      setLoading(false)
      return
    }
    
    // Trim and validate it's not empty
    const trimmedCollegeName = collegeName.trim()
    if (!trimmedCollegeName) {
      console.log('🚫 Skipping improvement analysis - collegeName is empty after trim')
      console.log('  - Original collegeName:', collegeName)
      console.log('  - Trimmed result:', trimmedCollegeName)
      setImprovementData(null)
      setLoading(false)
      return
    }

    // Validate userProfile: must be an object with at least some data
    if (!userProfile || typeof userProfile !== 'object' || Object.keys(userProfile).length === 0) {
      console.log('🚫 Skipping improvement analysis - userProfile is missing or empty')
      console.log('  - userProfile value:', userProfile)
      console.log('  - userProfile type:', typeof userProfile)
      console.log('  - userProfile keys:', userProfile ? Object.keys(userProfile) : 'N/A')
      setImprovementData(null)
      setLoading(false)
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
      console.log('🚫 Skipping improvement analysis - userProfile missing required fields')
      console.log('  - userProfile keys:', Object.keys(userProfile))
      console.log('  - Checking for: gpa_unweighted, gpa_weighted, sat, act, rigor, extracurricular_depth')
      setImprovementData(null)
      setLoading(false)
      return
    }

    console.log('🔄 Fetching improvement analysis for:', trimmedCollegeName)
    console.log('🔄 User profile:', userProfile)
    
    setLoading(true)
    setError(null)

    try {
      const API_BASE_URL = getApiBaseUrl()
      const headers = withNgrokHeaders(API_BASE_URL, {
        'Content-Type': 'application/json',
      })

      const url = `${API_BASE_URL}/api/improvement-analysis/${encodeURIComponent(trimmedCollegeName)}`
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
