import { useState, useEffect } from 'react';

interface TuitionByZipcodeData {
  success: boolean;
  college_name: string;
  zipcode: string;
  college_state: string | null;
  zipcode_state: string | null;
  zipcode_city: string | null;
  is_in_state: boolean;
  tuition: number;
  in_state_tuition: number;
  out_state_tuition: number;
  error?: string;
}

interface UseTuitionByZipcodeResult {
  tuitionData: TuitionByZipcodeData | null;
  loading: boolean;
  error: string | null;
}

export const useTuitionByZipcode = (
  collegeName: string | null,
  zipcode: string | null
): UseTuitionByZipcodeResult => {
  const [tuitionData, setTuitionData] = useState<TuitionByZipcodeData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTuition = async () => {
      if (!collegeName || !zipcode || zipcode.length < 5) {
        setTuitionData(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const API_BASE_URL = 'https://unsmug-untensely-elroy.ngrok-free.dev';
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        if (API_BASE_URL.includes('ngrok')) {
          headers['ngrok-skip-browser-warning'] = 'true';
        }

        const response = await fetch(`${API_BASE_URL}/api/tuition-by-zipcode/${encodeURIComponent(collegeName)}/${encodeURIComponent(zipcode)}`, {
          headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: TuitionByZipcodeData = await response.json();

        if (data.success) {
          setTuitionData(data);
          console.log(`✔ Zipcode-based tuition data loaded for ${collegeName} (${zipcode}):`, data);
        } else {
          setError(data.error || 'Failed to fetch zipcode-based tuition data');
          setTuitionData(null);
        }
      } catch (e: any) {
        console.error("❌ Error fetching zipcode-based tuition data for", collegeName, "with zipcode", zipcode, ":", e);
        setError(e.message || 'An unexpected error occurred');
        setTuitionData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTuition();
  }, [collegeName, zipcode]);

  return { tuitionData, loading, error };
};
