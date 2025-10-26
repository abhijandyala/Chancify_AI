/**
 * React hook for fetching college information using OpenAI
 */

import { useState, useEffect } from 'react';
import { openaiCollegeService, CollegeInfo, CollegeInfoResponse } from '@/lib/openai-college-service';

export interface UseCollegeInfoOptions {
  enabled?: boolean;
  refetchOnMount?: boolean;
}

export interface UseCollegeInfoReturn {
  data: CollegeInfo | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCollegeInfo(
  collegeName: string | null,
  options: UseCollegeInfoOptions = {}
): UseCollegeInfoReturn {
  const { enabled = true, refetchOnMount = true } = options;
  
  const [data, setData] = useState<CollegeInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollegeInfo = async () => {
    if (!collegeName || !enabled) return;

    setLoading(true);
    setError(null);

    try {
      const response: CollegeInfoResponse = await openaiCollegeService.getCollegeInfo(collegeName);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError('Failed to fetch college information');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching college info:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refetchOnMount && collegeName && enabled) {
      fetchCollegeInfo();
    }
  }, [collegeName, enabled, refetchOnMount]);

  return {
    data,
    loading,
    error,
    refetch: fetchCollegeInfo,
  };
}

export interface UseMultipleCollegesInfoOptions {
  enabled?: boolean;
  refetchOnMount?: boolean;
}

export interface UseMultipleCollegesInfoReturn {
  data: Record<string, CollegeInfo> | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMultipleCollegesInfo(
  collegeNames: string[],
  options: UseMultipleCollegesInfoOptions = {}
): UseMultipleCollegesInfoReturn {
  const { enabled = true, refetchOnMount = true } = options;
  
  const [data, setData] = useState<Record<string, CollegeInfo> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMultipleCollegesInfo = async () => {
    if (!collegeNames.length || !enabled) return;

    setLoading(true);
    setError(null);

    try {
      const response = await openaiCollegeService.getMultipleCollegesInfo(collegeNames);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError('Failed to fetch college information');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching multiple colleges info:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refetchOnMount && collegeNames.length > 0 && enabled) {
      fetchMultipleCollegesInfo();
    }
  }, [collegeNames.join(','), enabled, refetchOnMount]);

  return {
    data,
    loading,
    error,
    refetch: fetchMultipleCollegesInfo,
  };
}
