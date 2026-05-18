import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/mongodb'
import HeroImage from '../../../../models/HeroImage'

export async function GET() {
  try {
    await dbConnect()
    const images = await HeroImage.find({ active: true }).sort({ order: 1 })
    return NextResponse.json({ images })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch hero images' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await dbConnect()
    const { url, caption } = await req.json()

    const count = await HeroImage.countDocuments()
    const image = await HeroImage.create({ url, caption, order: count })

    return NextResponse.json({ image }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create hero image' }, { status: 500 })
  }
}

export async function DELETE(req) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    await HeroImage.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete hero image' }, { status: 500 })
  }
}
