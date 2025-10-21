import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    console.error('Google OAuth error:', error)
    return NextResponse.redirect(new URL('/auth/error?error=' + encodeURIComponent(error), request.url))
  }

  if (!code) {
    console.error('No authorization code received')
    return NextResponse.redirect(new URL('/auth/error?error=NoCode', request.url))
  }

  try {
    // Here you would normally exchange the code for tokens with Google
    // For now, we'll redirect to profile with a success indicator
    console.log('Google OAuth code received:', code)
    
    // Redirect to profile page with success
    return NextResponse.redirect(new URL('/profile?auth=success', request.url))
    
  } catch (error) {
    console.error('Error processing Google OAuth callback:', error)
    return NextResponse.redirect(new URL('/auth/error?error=ProcessingError', request.url))
  }
}
