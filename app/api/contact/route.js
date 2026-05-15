let messages = []

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const contact = {
      _id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      message,
      createdAt: new Date().toISOString(),
    }

    messages.push(contact)

    return Response.json(
      { success: true, data: contact },
      { status: 201 }
    )
  } catch (error) {
    return Response.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}
