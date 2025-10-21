import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Simple session endpoint that returns a basic response
    return NextResponse.json({
      user: null,
      expires: null
    })
  } catch (error) {
    console.error('Session API error:', error)
    return NextResponse.json(
      { error: 'Session error' },
      { status: 500 }
    )
  }
}
