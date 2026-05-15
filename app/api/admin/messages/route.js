import { NextResponse } from 'next/server'

let messages = []

export async function GET() {
  try {
    return NextResponse.json({ success: true, messages })
  } catch (error) {
    return NextResponse.json(
      { error: error.message, messages: [] },
      { status: 200 }
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

    messages = messages.filter((msg) => msg._id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
