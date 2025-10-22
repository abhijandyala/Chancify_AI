import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    // Handle OAuth error
    return NextResponse.redirect(new URL(`/auth?error=${error}`, request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/auth?error=no_code', request.url))
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/callback/google`,
      }),
    })

    const tokens = await tokenResponse.json()

    if (!tokens.access_token) {
      throw new Error('No access token received')
    }

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    const userInfo = await userResponse.json()

    // Create success URL with user data
    const successUrl = new URL('/profile', request.url)
    successUrl.searchParams.set('google_auth', 'success')
    successUrl.searchParams.set('email', userInfo.email)
    successUrl.searchParams.set('name', userInfo.name)
    successUrl.searchParams.set('picture', userInfo.picture)

    return NextResponse.redirect(successUrl)

  } catch (error) {
    console.error('Google OAuth error:', error)
    return NextResponse.redirect(new URL('/auth?error=oauth_failed', request.url))
  }
}