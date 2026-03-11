import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminSessionValue, getAdminCookieName } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid admin password.' }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set(getAdminCookieName(), createAdminSessionValue(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Unable to sign in.' }, { status: 500 })
  }
}
