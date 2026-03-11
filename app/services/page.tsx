'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import ServiceCard from '@/components/service-card'
import Footer from '@/components/footer'
import ProductsSection from '@/components/products-section'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, CheckCircle, Users, DollarSign, Truck, Award } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Residential Design',
      description: 'Transform your home with innovative and functional design solutions.',
      features: ['Space Planning', 'Interior Design', '3D Visualization', 'Building Permits']
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Commercial Projects',
      description: 'Scalable solutions for offices, retail, and commercial spaces.',
      features: ['Office Spaces', 'Retail Design', 'Flexible Layouts', 'Sustainability']
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Project Management',
      description: 'Complete oversight from concept through completion.',
      features: ['Timeline Management', 'Budget Control', 'Quality Assurance', 'Vendor Management']
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: 'Material Consultation',
      description: 'Expert guidance on selecting the right materials for your project.',
      features: ['Material Selection', 'Supplier Connection', 'Quality Verification', 'Cost Optimization']
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Supply Chain',
      description: 'Reliable supply of quality building materials with fast delivery.',
      features: ['Original Products', 'Bulk Orders', 'Fast Delivery', 'Competitive Pricing']
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Professional Consultation',
      description: 'One-on-one guidance from experienced architects.',
      features: ['Initial Assessment', 'Design Strategy', 'Technical Advice', 'Ongoing Support']
    }
  ]

  const benefits = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Original Products',
      description: 'All materials are genuine and sourced from trusted suppliers'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Expert Guidance',
      description: 'Professional architects guide every decision'
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: 'Affordable Prices',
      description: 'Competitive pricing without compromising quality'
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Reliable Supply',
      description: 'Consistent availability and fast delivery times'
    }
  ]

  return (
    <>
      <Header />
      <main className="w-full">
        <section className="border-b border-border bg-secondary/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                  Services & Products
                </p>
                <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                  We help you get the right materials for strong and beautiful buildings.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/75">
                  From architectural planning to material sourcing and project oversight, every service is structured to reduce friction and improve build quality.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-3xl border border-border bg-white p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Design</p>
                  <p className="mt-3 text-2xl font-semibold text-primary">Custom architectural direction</p>
                </div>
                <div className="rounded-3xl border border-border bg-primary p-6 text-primary-foreground">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Supply</p>
                  <p className="mt-3 text-2xl font-semibold">Quality materials with reliable access</p>
                </div>
                <div className="rounded-3xl border border-border bg-white p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Execution</p>
                  <p className="mt-3 text-2xl font-semibold text-primary">Practical project support from start to finish</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="border-b border-border bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                Our Complete Services
              </h2>
              <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
                Everything you need for successful architectural and construction projects
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                />
              ))}
            </div>
          </div>
        </section>

        <ProductsSection />

        {/* Why Choose Our Products */}
        <section className="border-b border-border bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                Why Choose Arckijoe Materials
              </h2>
              <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
                Quality assurance in every product and service
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  whileHover={{ y: -8, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  className="flex flex-col gap-3 rounded-lg border border-border bg-white p-6 hover:shadow-lg transition-shadow"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent"
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="font-semibold text-primary">{benefit.title}</h3>
                  <p className="text-sm text-foreground/70">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-b border-border bg-secondary/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                Our Process
              </h2>
              <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
                From initial consultation to project completion
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: 'Consultation',
                  description: 'We meet to understand your project requirements, vision, and constraints.'
                },
                {
                  step: 2,
                  title: 'Design & Planning',
                  description: 'Our architects develop custom designs with 3D visualizations and detailed plans.'
                },
                {
                  step: 3,
                  title: 'Material Selection',
                  description: 'Expert guidance in choosing quality materials that match your budget and needs.'
                },
                {
                  step: 4,
                  title: 'Project Execution',
                  description: 'We oversee the construction process, ensuring quality and timeline adherence.'
                },
                {
                  step: 5,
                  title: 'Quality Assurance',
                  description: 'Final inspections and handover with complete documentation and support.'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6 rounded-lg border border-border bg-white p-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{item.title}</h3>
                    <p className="mt-1 text-sm text-foreground/70">{item.description}</p>
                  </div>
                  {index < 4 && (
                    <div className="ml-auto flex items-center">
                      <ArrowRight className="h-5 w-5 text-accent hidden sm:block" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-b border-border bg-primary py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/90">
              Contact us today to discuss your project and receive expert guidance
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-accent text-primary hover:bg-accent/90"
              >
                <Link href="/contact">
                  Schedule Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground text-primary hover:bg-primary-foreground/10"
              >
                <a href="https://wa.me/2347060630685" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
