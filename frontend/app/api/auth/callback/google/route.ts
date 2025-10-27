import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    // Handle OAuth error - redirect to home page with error
    return NextResponse.redirect(new URL(`/home?error=${error}`, 'https://chancifyai.up.railway.app'))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/home?error=no_code', 'https://chancifyai.up.railway.app'))
  }

  try {
    // Check if environment variables are set
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      console.error('Missing Google OAuth environment variables')
      return NextResponse.redirect(new URL('/home?error=missing_config', 'https://chancifyai.up.railway.app'))
    }

    // ALWAYS use Railway URL - NO localhost fallbacks
    const baseUrl = 'https://chancifyai.up.railway.app'

    // DEBUG: Log OAuth callback information
    console.log('=== OAUTH CALLBACK DEBUG ===')
    console.log('ALWAYS using Railway URL:', baseUrl)
    console.log('request.url:', request.url)
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID)
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

    // Call backend API to create user in database
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://unsmug-untensely-elroy.ngrok-free.dev'
      const createUserResponse = await fetch(`${backendUrl}/api/auth/google-oauth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          email: userInfo.email,
          name: userInfo.name,
          google_id: userInfo.id
        })
      })

      if (createUserResponse.ok) {
        const userData = await createUserResponse.json()
        console.log('User created in database:', userData)
      } else {
        console.error('Failed to create user in database:', await createUserResponse.text())
      }
    } catch (error) {
      console.error('Error calling backend API:', error)
    }

    // Create success URL with user data - redirect to home page
    // CRITICAL: Use Railway URL for redirect, not request.url which might be localhost
    const successUrl = new URL('/home', 'https://chancifyai.up.railway.app')
    successUrl.searchParams.set('google_auth', 'success')
    successUrl.searchParams.set('email', userInfo.email)
    successUrl.searchParams.set('name', userInfo.name)
    successUrl.searchParams.set('picture', userInfo.picture)

    console.log('Success redirect URL:', successUrl.toString())
    return NextResponse.redirect(successUrl)

  } catch (error) {
    console.error('Google OAuth error:', error)
    return NextResponse.redirect(new URL('/home?error=oauth_failed', 'https://chancifyai.up.railway.app'))
  }
}