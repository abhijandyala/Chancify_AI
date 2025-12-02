export type HeaderMap = Record<string, string>

// PRIMARY: Use ngrok URL for backend (user's requirement)
// FALLBACK: localhost for local development only
const NGROK_API_URL = 'https://unsmug-untensely-elroy.ngrok-free.dev'
const DEFAULT_API_URL = 'http://localhost:8000'

declare global {
  interface Window {
    __CHANCIFY_API_URL__?: string
  }
}

function resolveEnvApiUrl(): string | undefined {
  // Check environment variables (works on both client and server)
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || process.env.API_BASE_URL?.trim()
  if (envUrl) {
    return envUrl
  }
  
  // On server side, also check for a server-only env var
  if (typeof window === 'undefined') {
    return process.env.BACKEND_URL?.trim() || undefined
  }
  
  return undefined
}

function resolveRuntimeOverride(): string | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }

  if (window.__CHANCIFY_API_URL__) {
    return window.__CHANCIFY_API_URL__
  }

  try {
    const stored = window.localStorage?.getItem('api_base_url')
    return stored?.trim() || undefined
  } catch {
    return undefined
  }
}

export function getApiBaseUrl(): string {
  // Priority order:
  // 1. Runtime override (window.__CHANCIFY_API_URL__ or localStorage)
  // 2. Environment variable (NEXT_PUBLIC_API_URL)
  // 3. Ngrok URL (PRIMARY - user's requirement)
  // 4. Localhost (FALLBACK only)
  return resolveRuntimeOverride() || resolveEnvApiUrl() || NGROK_API_URL || DEFAULT_API_URL
}

export function withNgrokHeaders(
  baseUrl: string,
  headers: HeaderMap = {}
): HeaderMap {
  if (baseUrl.includes('ngrok')) {
    return {
      ...headers,
      'ngrok-skip-browser-warning': 'true',
    }
  }
  return headers
}

export function getBackendUrl(path: string): string {
  const baseUrl = getApiBaseUrl()
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

