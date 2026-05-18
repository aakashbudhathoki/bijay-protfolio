import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/mongodb'
import SiteSettings from '../../../../models/SiteSettings'

export async function GET() {
  try {
    await dbConnect()
    let settings = await SiteSettings.findOne()
    if (!settings) {
      settings = await SiteSettings.create({})
    }
    return NextResponse.json({ settings })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    await dbConnect()
    const body = await req.json()

    let settings = await SiteSettings.findOne()
    if (settings) {
      Object.assign(settings, body)
      await settings.save()
    } else {
      settings = await SiteSettings.create(body)
    }

    return NextResponse.json({ settings })
  } catch {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
