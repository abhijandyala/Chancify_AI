import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    // Handle OAuth error - redirect to home page with error
    return NextResponse.redirect(new URL(`/home?error=${error}`, request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/home?error=no_code', request.url))
  }

  try {
    // Check if environment variables are set
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      console.error('Missing Google OAuth environment variables')
      return NextResponse.redirect(new URL('/home?error=missing_config', request.url))
    }

    // Get the correct base URL
    const baseUrl = process.env.NEXTAUTH_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
                   process.env.RAILWAY_STATIC_URL ? `https://${process.env.RAILWAY_STATIC_URL}` :
                   'http://localhost:3000'

    // DEBUG: Log all environment variables and URL construction
    console.log('=== OAUTH CALLBACK DEBUG ===')
    console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
    console.log('VERCEL_URL:', process.env.VERCEL_URL)
    console.log('RAILWAY_STATIC_URL:', process.env.RAILWAY_STATIC_URL)
    console.log('request.url:', request.url)
    console.log('Calculated baseUrl:', baseUrl)
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID)
    console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET')

    // Exchange code for tokens
    const redirectUri = `${baseUrl}/api/auth/callback/google`
    console.log('Redirect URI being sent to Google:', redirectUri)
    
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
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
    const successUrl = new URL('/home', request.url)
    successUrl.searchParams.set('google_auth', 'success')
    successUrl.searchParams.set('email', userInfo.email)
    successUrl.searchParams.set('name', userInfo.name)
    successUrl.searchParams.set('picture', userInfo.picture)

    return NextResponse.redirect(successUrl)

  } catch (error) {
    console.error('Google OAuth error:', error)
    return NextResponse.redirect(new URL('/home?error=oauth_failed', request.url))
  }
}