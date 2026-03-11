import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                <span className="text-sm font-bold">AD</span>
              </div>
              <span className="font-bold">Arckijoe Designs</span>
            </div>
            <p className="mt-3 text-sm opacity-90">
              Designing spaces that inspire, perform, and stand the test of time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-accent">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="opacity-90 transition-opacity hover:opacity-100">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="opacity-90 transition-opacity hover:opacity-100">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="opacity-90 transition-opacity hover:opacity-100">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-90 transition-opacity hover:opacity-100">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-accent">Services</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-90 transition-opacity hover:opacity-100">
                  Architectural Design
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 transition-opacity hover:opacity-100">
                  Building Materials
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 transition-opacity hover:opacity-100">
                  Consultations
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 transition-opacity hover:opacity-100">
                  Project Management
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-accent">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a
                  href="tel:+2349028115562"
                  className="opacity-90 transition-opacity hover:opacity-100"
                >
                  +234 902 811 5562
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href="mailto:joearchitectokonkwo@yahoo.com"
                  className="opacity-90 transition-opacity hover:opacity-100"
                >
                 joearchitectokonkwo@yahoo.com  
                </a>
              </li>
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-90">Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-primary-foreground/20" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm opacity-90">
            &copy; {currentYear} Arckijoe Designs. All rights reserved.
          </p>
          {/* <div className="flex gap-6">
            <a href="#" className="text-sm opacity-90 transition-opacity hover:opacity-100">
              Privacy Policy
            </a>
            <a href="#" className="text-sm opacity-90 transition-opacity hover:opacity-100">
              Terms of Service
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
