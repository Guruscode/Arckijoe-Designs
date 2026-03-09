import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Services & Products | Arckijoe Designs',
  description: 'Explore our architectural design services and premium building materials.',
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children
}
