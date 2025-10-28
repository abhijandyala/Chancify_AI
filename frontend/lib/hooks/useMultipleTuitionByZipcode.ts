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

interface UseMultipleTuitionByZipcodeResult {
  tuitionDataMap: Map<string, TuitionByZipcodeData>;
  loading: boolean;
  error: string | null;
}

export const useMultipleTuitionByZipcode = (
  collegeNames: string[],
  zipcode: string | null
): UseMultipleTuitionByZipcodeResult => {
  const [tuitionDataMap, setTuitionDataMap] = useState<Map<string, TuitionByZipcodeData>>(new Map());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTuitionForAllColleges = async () => {
      if (!zipcode || zipcode.length < 5 || collegeNames.length === 0) {
        setTuitionDataMap(new Map());
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://unsmug-untensely-elroy.ngrok-free.dev';
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        if (API_BASE_URL.includes('ngrok')) {
          headers['ngrok-skip-browser-warning'] = 'true';
        }

        const tuitionMap = new Map<string, TuitionByZipcodeData>();

        // Fetch tuition data for each college
        for (const collegeName of collegeNames) {
          try {
            const response = await fetch(`${API_BASE_URL}/api/tuition-by-zipcode/${encodeURIComponent(collegeName)}/${encodeURIComponent(zipcode)}`, {
              headers,
            });

            if (response.ok) {
              const data: TuitionByZipcodeData = await response.json();
              if (data.success) {
                tuitionMap.set(collegeName, data);
                console.log(`✔ Tuition data loaded for ${collegeName}:`, data);
              } else {
                console.warn(`⚠ Failed to get tuition data for ${collegeName}:`, data.error);
              }
            } else {
              console.warn(`⚠ HTTP error for ${collegeName}:`, response.status);
            }
          } catch (e: any) {
            console.error(`❌ Error fetching tuition for ${collegeName}:`, e);
          }
        }

        setTuitionDataMap(tuitionMap);
      } catch (e: any) {
        console.error("❌ Error in useMultipleTuitionByZipcode:", e);
        setError(e.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTuitionForAllColleges();
  }, [collegeNames.join(','), zipcode]);

  return { tuitionDataMap, loading, error };
};
