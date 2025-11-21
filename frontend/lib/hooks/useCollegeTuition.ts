import { useState, useEffect } from 'react';
import { getApiBaseUrl, withNgrokHeaders } from '@/lib/config';

interface TuitionData {
  in_state_tuition: number;
  out_state_tuition: number;
  fees: number;
  room_board: number;
  books: number;
  other_expenses: number;
  total_in_state: number;
  total_out_state: number;
  is_private: boolean;
}

interface TuitionResponse {
  success: boolean;
  college_name: string;
  tuition_data: TuitionData | null;
  error?: string;
}

export function useCollegeTuition(collegeName: string | null) {
  const [tuitionData, setTuitionData] = useState<TuitionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collegeName) {
      setTuitionData(null);
      return;
    }

    const fetchTuitionData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get the backend URL from environment or use ngrok URL
        const backendUrl = getApiBaseUrl();
        const encodedCollegeName = encodeURIComponent(collegeName);
        
        console.log(`🔍 Fetching tuition data for: ${collegeName}`);
        console.log(`🔍 Backend URL: ${backendUrl}`);
        console.log(`🔍 Full URL: ${backendUrl}/api/college-tuition/${encodedCollegeName}`);
        
        const headers = withNgrokHeaders(backendUrl, {
          'Content-Type': 'application/json',
        });

        const response = await fetch(`${backendUrl}/api/college-tuition/${encodedCollegeName}`, {
          headers
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: TuitionResponse = await response.json();

        if (data.success && data.tuition_data) {
          setTuitionData(data.tuition_data);
          console.log(`✅ Tuition data loaded for ${collegeName}:`, data.tuition_data);
        } else {
          throw new Error(data.error || 'Failed to fetch tuition data');
        }
      } catch (err) {
        console.error(`❌ Error fetching tuition data for ${collegeName}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        
        // Fallback to default data
        setTuitionData({
          in_state_tuition: 50000,
          out_state_tuition: 50000,
          fees: 1000,
          room_board: 15000,
          books: 1000,
          other_expenses: 2000,
          total_in_state: 67000,
          total_out_state: 67000,
          is_private: true
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTuitionData();
  }, [collegeName]);

  return { tuitionData, loading, error };
}
