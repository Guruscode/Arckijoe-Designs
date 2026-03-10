import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ModalProvider } from '@/context/modal-context'
import ConsultationModal from '@/components/consultation-modal'
import VideoModal from '@/components/video-modal'
import ImageModal from '@/components/image-modal'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

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
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased">
        <ModalProvider>
          {children}
          <ConsultationModal />
          <VideoModal />
          <ImageModal />
        </ModalProvider>
        <Analytics />
      </body>
    </html>
  )
}
