import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // Determine base URL based on current request
  // For localhost, use localhost; for Railway, use Railway URL
  const url = new URL(request.url)
  let baseUrl: string
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    baseUrl = `${url.protocol}//${url.host}`
  } else {
    baseUrl = 'https://chancifyai.up.railway.app'
  }

  if (error) {
    // Handle OAuth error - redirect to home page with error
    return NextResponse.redirect(new URL(`/home?error=${error}`, baseUrl))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/home?error=no_code', baseUrl))
  }

  try {
    // Check if environment variables are set
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      console.error('Missing Google OAuth environment variables')
      console.error('GOOGLE_CLIENT_ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET')
      console.error('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET')
      return NextResponse.redirect(new URL('/home?error=missing_config', baseUrl))
    }

    // DEBUG: Log OAuth callback information
    console.log('=== OAUTH CALLBACK DEBUG ===')
    console.log('Using base URL:', baseUrl)
    console.log('request.url:', request.url)
    console.log('request.hostname:', url.hostname)
    console.log('GOOGLE_CLIENT_ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
    console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET')
    console.log('============================')

    // Exchange code for tokens
    const redirectUri = `${baseUrl}/api/auth/callback/google`
    console.log('Redirect URI being sent to Google:', redirectUri)
    
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    })

    const tokens = await tokenResponse.json()
    console.log('Google token response status:', tokenResponse.status)
    console.log('Google token response:', tokens)

    if (!tokens.access_token) {
      console.error('No access token received from Google:', tokens)
      throw new Error(`No access token received: ${JSON.stringify(tokens)}`)
    }

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    const userInfo = await userResponse.json()

    // Create success URL with user data - redirect to home page
    // CRITICAL: Use Railway URL for redirect, not request.url which might be localhost
    const successUrl = new URL('/home', baseUrl)
    successUrl.searchParams.set('google_auth', 'success')
    successUrl.searchParams.set('email', userInfo.email)
    successUrl.searchParams.set('name', userInfo.name)
    successUrl.searchParams.set('picture', userInfo.picture)

    console.log('Success redirect URL:', successUrl.toString())
    return NextResponse.redirect(successUrl)

  } catch (error) {
    console.error('Google OAuth error:', error)
    return NextResponse.redirect(new URL('/home?error=oauth_failed', baseUrl))
  }
}