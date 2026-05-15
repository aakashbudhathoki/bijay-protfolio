import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const caption = formData.get('caption') || ''

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`
    const filepath = path.join(uploadDir, filename)

    fs.writeFileSync(filepath, buffer)

    const image = {
      _id: Date.now().toString(),
      url: `/uploads/${filename}`,
      caption,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, image }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
