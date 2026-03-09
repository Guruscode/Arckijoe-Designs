'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'design-consultation',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Form submitted:', formData)
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'design-consultation',
        message: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">Send us a Message</h2>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-foreground">
            Full Name
          </label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="border-border bg-white"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-border bg-white"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+234 902 811 5562"
            value={formData.phone}
            onChange={handleChange}
            className="border-border bg-white"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
            Subject
          </label>
          <Select value={formData.subject} onValueChange={handleSubjectChange}>
            <SelectTrigger className="border-border bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="design-consultation">Design Consultation</SelectItem>
              <SelectItem value="material-inquiry">Material Inquiry</SelectItem>
              <SelectItem value="project-inquiry">Project Inquiry</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={handleChange}
            required
            className="border-border bg-white"
            rows={6}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>

      {/* Contact Info */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-primary">Get in Touch</h2>

        <div className="space-y-6">
          {/* Phone */}
          <div className="flex gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">Phone</h3>
              <p className="text-sm text-foreground/70">
                <a href="tel:+2349028115562" className="hover:text-accent">
                  +234 902 811 5562
                </a>
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">Email</h3>
              <p className="text-sm text-foreground/70">
                <a href="mailto:info@arckijoe.com" className="hover:text-accent">
                  info@arckijoe.com
                </a>
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">Address</h3>
              <p className="text-sm text-foreground/70">Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="rounded-xl border-2 border-accent bg-accent/5 p-6">
          <h3 className="mb-3 font-semibold text-primary">Quick Chat</h3>
          <p className="mb-4 text-sm text-foreground/70">
            Connect with us on WhatsApp for instant responses
          </p>
          <a
            href="https://wa.me/2347060630685"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-accent px-6 py-2 text-sm font-medium text-primary transition-all hover:bg-accent/90"
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
