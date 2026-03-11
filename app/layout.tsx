import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ModalProvider } from '@/context/modal-context'
import ConsultationModal from '@/components/consultation-modal'
import VideoModal from '@/components/video-modal'
import ImageModal from '@/components/image-modal'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Arckijoe Designs | Architectural Design & Building Materials',
  description: 'Designing spaces that inspire, perform, and stand the test of time. Expert architectural design and premium building materials for your projects.',
  generator: 'v0.app',
  icons: {
    icon: '/logo.JPG',
    shortcut: '/logo.JPG',
    apple: '/logo.JPG',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ModalProvider>
            {children}
            <ConsultationModal />
            <VideoModal />
            <ImageModal />
            <Toaster richColors position="top-right" />
          </ModalProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
