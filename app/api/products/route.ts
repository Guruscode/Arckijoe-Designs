import { NextResponse } from 'next/server'
import { createProduct, getAllProducts, getPublicProducts } from '@/lib/store'
import { getErrorMessage } from '@/lib/http'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const includeAll = searchParams.get('scope') === 'admin'

    if (includeAll) {
      const authenticated = await isAdminAuthenticated()
      if (!authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const products = await getAllProducts()
      return NextResponse.json({ products })
    }

    const products = await getPublicProducts()
    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authenticated = await isAdminAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const product = await createProduct(body)
    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 400 })
  }
}
