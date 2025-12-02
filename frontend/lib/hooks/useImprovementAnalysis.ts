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

  // Helper function to validate inputs
  const isValidInput = (collegeName: string | null, userProfile: any): { valid: boolean; trimmedCollegeName?: string } => {
    // Validate collegeName: must be a non-empty string
    if (collegeName === null || collegeName === undefined) {
      return { valid: false }
    }
    
    if (typeof collegeName !== 'string') {
      return { valid: false }
    }
    
    const trimmedCollegeName = collegeName.trim()
    if (!trimmedCollegeName) {
      return { valid: false }
    }

    // Validate userProfile: must be an object with at least some data
    if (!userProfile || typeof userProfile !== 'object' || Object.keys(userProfile).length === 0) {
      return { valid: false }
    }

    // Check if userProfile has at least one required field
    const hasRequiredFields = userProfile.gpa_unweighted !== undefined || 
                              userProfile.gpa_weighted !== undefined || 
                              userProfile.sat !== undefined || 
                              userProfile.act !== undefined ||
                              userProfile.rigor !== undefined ||
                              userProfile.extracurricular_depth !== undefined
    if (!hasRequiredFields) {
      return { valid: false }
    }

    return { valid: true, trimmedCollegeName }
  }

  // Main fetch function
  const fetchImprovementAnalysis = useCallback(async (collegeNameToFetch: string, userProfileToFetch: any) => {
    const validation = isValidInput(collegeNameToFetch, userProfileToFetch)
    
    if (!validation.valid || !validation.trimmedCollegeName) {
      // Silently wait - inputs not ready yet
      setImprovementData(null)
      setLoading(false)
      setError(null)
      return
    }

    const trimmedCollegeName = validation.trimmedCollegeName

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
        body: JSON.stringify(userProfileToFetch),
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
  }, [])

  // Watch for changes in collegeName and userProfile and fetch when both are ready
  useEffect(() => {
    const validation = isValidInput(collegeName, userProfile)
    
    if (!validation.valid) {
      // Inputs not ready - clear state but don't set error
      if (collegeName === null && userProfile === null) {
        // Both are null - initial state, do nothing
        return
      }
      // One or both are invalid - clear data but don't log errors
      setImprovementData(null)
      setLoading(false)
      setError(null)
      return
    }

    // Both inputs are valid - fetch the data
    // validation.trimmedCollegeName is guaranteed to be a string when validation.valid is true
    if (validation.trimmedCollegeName) {
      fetchImprovementAnalysis(validation.trimmedCollegeName, userProfile)
    }
  }, [collegeName, userProfile, fetchImprovementAnalysis])

  // Refetch function that can be called manually
  const refetch = useCallback(() => {
    const validation = isValidInput(collegeName, userProfile)
    if (validation.valid && validation.trimmedCollegeName) {
      fetchImprovementAnalysis(validation.trimmedCollegeName, userProfile)
    }
  }, [collegeName, userProfile, fetchImprovementAnalysis])

  return { improvementData, loading, error, refetch }
}
