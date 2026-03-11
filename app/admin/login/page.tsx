'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Unable to sign in.')
      }

      toast.success('Signed in successfully.')
      router.push('/admin')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to sign in.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-secondary/30 py-16">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-border bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              Protected area
            </p>
            <h1 className="mt-4 text-3xl font-bold text-primary">Admin login</h1>
            <p className="mt-3 text-sm text-foreground/70">
              Sign in to manage products and follow up on incoming orders.
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="password">Admin password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
