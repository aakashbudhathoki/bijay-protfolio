import { NextResponse } from 'next/server'
import crypto from 'crypto'
import dbConnect from '../../../../lib/mongodb'
import Admin from '../../../../models/Admin'

export async function POST(req) {
  try {
    await dbConnect()
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const admin = await Admin.findOne({ email: username.trim() })

    if (!admin || admin.password !== password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = crypto.randomBytes(32).toString('hex')
    
    return NextResponse.json({
      success: true,
      token,
      message: 'Login successful'
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed. Check Vercel runtime logs.' },
      { status: 500 }
    )
  }
}
