'use client'

import React from 'react'
import { useModal } from '@/context/modal-context'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ConsultationModal() {
  const { isOpen, closeModal } = useModal()

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@arckijoe.com',
      href: 'mailto:contact@arckijoe.com',
      action: 'Send Email'
    },
    {
      icon: Phone,
      label: 'Call Us',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      action: 'Call Now'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+1 (555) 987-6543',
      href: 'https://wa.me/15559876543',
      action: 'Message on WhatsApp'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl shadow-2xl"
          >
            <div className="max-w-2xl mx-auto w-full p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Book a Consultation</h2>
                  <p className="text-muted-foreground mt-1">Get in touch with our team today</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contact Methods */}
              <div className="grid gap-4 sm:grid-cols-3">
                {contactMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      target={method.label === 'WhatsApp' ? '_blank' : undefined}
                      rel={method.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                      whileHover={{ y: -4 }}
                      className="p-6 rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all bg-card group"
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 rounded-lg bg-secondary group-hover:bg-accent/10 transition-colors">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{method.label}</p>
                          <p className="text-sm text-muted-foreground mt-1">{method.value}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3"
                          onClick={(e) => {
                            e.preventDefault()
                            window.open(method.href, method.label === 'WhatsApp' ? '_blank' : undefined)
                          }}
                        >
                          {method.action}
                        </Button>
                      </div>
                    </motion.a>
                  )
                })}
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Business Hours: Monday - Friday, 9:00 AM - 6:00 PM EST
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
