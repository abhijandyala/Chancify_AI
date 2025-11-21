import { useState, useEffect } from 'react';
import { getApiBaseUrl, withNgrokHeaders } from '@/lib/config';

interface TuitionByZipcodeData {
  success: boolean;
  college_name: string;
  zipcode: string;
  college_state: string | null;
  zipcode_state: string | null;
  is_in_state: boolean;
  tuition: number;
  in_state_tuition: number | null;
  out_state_tuition: number | null;
  error?: string;
}

export function useCollegeTuitionByZipcode(collegeName: string | null, zipcode: string | null) {
  const [tuitionData, setTuitionData] = useState<TuitionByZipcodeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collegeName || !zipcode) {
      setTuitionData(null);
      return;
    }

    const fetchTuitionByZipcode = async () => {
      setLoading(true);
      setError(null);

      try {
        const API_BASE_URL = getApiBaseUrl();
        const headers = withNgrokHeaders(API_BASE_URL, {
          'Content-Type': 'application/json',
        });

        const response = await fetch(
          `${API_BASE_URL}/api/tuition-by-zipcode/${encodeURIComponent(collegeName)}/${zipcode}`,
          { headers }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: TuitionByZipcodeData = await response.json();

        if (data.success) {
          setTuitionData(data);
          console.log(`✅ Tuition by zipcode loaded for ${collegeName} (${zipcode}):`, data);
        } else {
          setError(data.error || 'Failed to fetch tuition data');
          setTuitionData(null);
        }
      } catch (e: any) {
        console.error("❌ Error fetching tuition by zipcode:", e);
        setError(e.message || 'An unexpected error occurred');
        setTuitionData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTuitionByZipcode();
  }, [collegeName, zipcode]);

  return { tuitionData, loading, error };
}
