import { NextResponse } from 'next/server'
import { deleteOrder, updateOrder } from '@/lib/store'
import { getErrorMessage } from '@/lib/http'
import { isAdminAuthenticated } from '@/lib/auth'

type Context = {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, context: Context) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await request.json()
    const order = await updateOrder(Number(id), body)
    return NextResponse.json({ order })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 400 })
  }
}

export async function DELETE(_: Request, context: Context) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    await deleteOrder(Number(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 400 })
  }
}
