import { useState, useEffect } from 'react'

interface SubjectData {
  label: string
  value: number
}

interface SubjectEmphasisResponse {
  success: boolean
  college_name: string
  subjects: SubjectData[]
  total_subjects: number
  error?: string
}

export function useCollegeSubjectEmphasis(collegeName: string | null) {
  const [subjects, setSubjects] = useState<SubjectData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!collegeName) {
      setSubjects([])
      return
    }

    const fetchSubjectEmphasis = async () => {
      setLoading(true)
      setError(null)

      try {
        // Get the backend URL from environment or use ngrok URL (same as other API calls)
        const backendUrl = 'https://unsmug-untensely-elroy.ngrok-free.dev'
        const encodedCollegeName = encodeURIComponent(collegeName)
        
        console.log(`🔍 Fetching subject emphasis for: ${collegeName}`)
        console.log(`🔍 Backend URL: ${backendUrl}`)
        console.log(`🔍 Full URL: ${backendUrl}/api/college-subject-emphasis/${encodedCollegeName}`)
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        }

        // Add ngrok skip warning header if using ngrok
        if (backendUrl.includes('ngrok')) {
          headers['ngrok-skip-browser-warning'] = 'true'
        }

        const response = await fetch(`${backendUrl}/api/college-subject-emphasis/${encodedCollegeName}`, {
          headers
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: SubjectEmphasisResponse = await response.json()

        if (data.success) {
          setSubjects(data.subjects)
          console.log(`✅ Subject emphasis loaded for ${collegeName}:`, data.subjects)
        } else {
          throw new Error(data.error || 'Failed to fetch subject emphasis')
        }
      } catch (err) {
        console.error(`❌ Error fetching subject emphasis for ${collegeName}:`, err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        
        // Fallback to default data
        setSubjects([
          { label: 'Computer Science', value: 20 },
          { label: 'Engineering', value: 18 },
          { label: 'Business', value: 15 },
          { label: 'Biological Sciences', value: 12 },
          { label: 'Mathematics & Stats', value: 10 },
          { label: 'Social Sciences', value: 10 },
          { label: 'Arts & Humanities', value: 10 },
          { label: 'Education', value: 5 }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSubjectEmphasis()
  }, [collegeName])

  return { subjects, loading, error }
}
