import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req) {
  try {
    const { username, password } = await req.json()

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = crypto.randomBytes(32).toString('hex')
      
      return NextResponse.json({
        success: true,
        token,
        message: 'Login successful'
      })
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
