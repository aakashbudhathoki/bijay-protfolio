import { NextResponse } from 'next/server'

let achievements = [
  {
    _id: '1',
    year: '2024',
    title: 'Top Sales Leader Award',
    description: 'Recognized as the top-performing sales leader in the mobile accessories industry.',
    icon: '🏆',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    year: '2023',
    title: '150% Revenue Growth',
    description: 'Achieved exceptional revenue growth for Mypower brand in a single fiscal year.',
    icon: '📈',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    year: '2022',
    title: 'Expanded to 50+ Retailers',
    description: 'Successfully expanded distribution network to over 50 major retail partners.',
    icon: '🤝',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '4',
    year: '2021',
    title: 'Best Team Performance',
    description: 'Led the sales team to win the Best Team Performance award at Mypower.',
    icon: '⭐',
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json({ success: true, achievements })
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { year, title, description, icon } = body

    const newAchievement = {
      _id: Date.now().toString(),
      year,
      title,
      description,
      icon: icon || '🏆',
      createdAt: new Date().toISOString(),
    }

    achievements.push(newAchievement)

    return NextResponse.json({ success: true, achievement: newAchievement }, { status: 201 })
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

    achievements = achievements.filter((a) => a._id !== id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
