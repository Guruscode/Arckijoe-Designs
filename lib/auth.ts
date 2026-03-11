import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHash, timingSafeEqual } from 'crypto'

const ADMIN_COOKIE = 'arckijoe_admin_session'

function sha256(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

function getSecret() {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) {
    throw new Error('Missing ADMIN_PASSWORD environment variable.')
  }
  return secret
}

export function createAdminSessionValue() {
  return sha256(getSecret())
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(ADMIN_COOKIE)?.value
  if (!cookieValue) return false

  const expected = Buffer.from(createAdminSessionValue())
  const actual = Buffer.from(cookieValue)
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export async function requireAdmin() {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    redirect('/admin/login')
  }
}

export function getAdminCookieName() {
  return ADMIN_COOKIE
}
