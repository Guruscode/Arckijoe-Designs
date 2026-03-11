import { NextResponse } from 'next/server'
import { createOrder, getAllOrders } from '@/lib/store'
import { getErrorMessage } from '@/lib/http'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const orders = await getAllOrders()
    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const order = await createOrder(body)
    return NextResponse.json(
      {
        order,
        message: 'Your request was received successfully. We will contact you shortly.',
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 400 })
  }
}
