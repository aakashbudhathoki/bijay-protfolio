import { NextResponse } from 'next/server'
import crypto from 'crypto'
import dbConnect from '../../../lib/mongodb'
import Admin from '../../../models/Admin'

export async function POST(req) {
  try {
    await dbConnect()
    const { username, password } = await req.json()

    const admin = await Admin.findOne({ email: username })

    if (!admin || admin.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = crypto.randomBytes(32).toString('hex')
    
    return NextResponse.json({
      success: true,
      token,
      message: 'Login successful'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
