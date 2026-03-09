import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'About Arckijoe Designs | Architectural Expertise',
  description: 'Learn about our mission, vision, and the team behind Arckijoe Designs.',
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children
}
