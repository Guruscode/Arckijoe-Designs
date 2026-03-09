'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Footer from '@/components/footer'
import AnimatedSection from '@/components/animated-section'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Target, Lightbulb, Users } from 'lucide-react'

export default function About() {
  return (
    <>
      <Header />
      <main className="w-full">
        {/* Hero */}
        <Hero
          title="About Arckijoe Designs"
          subtitle="Our Story"
          description="Crafting exceptional spaces with passion, expertise, and innovation"
          background="gradient"
          align="center"
        />

        {/* Mission & Vision */}
        <section className="border-b border-border bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6 rounded-xl border border-border bg-white p-8 shadow-soft hover:shadow-lg transition-shadow"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10"
                >
                  <Target className="h-6 w-6 text-accent" />
                </motion.div>
                <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Create a structural balance and aesthetically pleasing buildings delivered with warmth, friendliness, individual pride and company spirit. We believe that great architecture transforms lives and communities.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6 rounded-xl border-2 border-accent bg-accent/5 p-8 shadow-soft hover:shadow-lg transition-shadow"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10"
                >
                  <Lightbulb className="h-6 w-6 text-accent" />
                </motion.div>
                <h2 className="text-2xl font-bold text-primary">Our Vision</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Nigeria's leading architectural company creating iconic, sustainable structures that inspire, endure, and enhance the built environment for generations to come.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CEO Bio */}
        <section className="border-b border-border bg-secondary/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Left - Image */}
              <div className="relative h-96 w-full overflow-hidden rounded-xl bg-white shadow-soft-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 text-7xl">👨‍💼</div>
                    <p className="text-sm text-foreground/50">Founder & Lead Architect</p>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-primary">Our Founder</h2>
                  <p className="mt-2 text-accent font-semibold">Lead Architect & Design Visionary</p>
                </div>

                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  <p>
                    With years of experience in architectural design and construction, our founder has built a reputation for excellence and innovation in Nigeria's built environment sector.
                  </p>
                  <p>
                    Driven by a passion for solving complex design challenges, they believe that great architecture is a perfect balance of form, function, and sustainability. Their work spans residential, commercial, and institutional projects.
                  </p>
                  <p>
                    Beyond design, they are committed to mentoring the next generation of architects and contributing to the advancement of architectural practices in Nigeria.
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Passionate about sustainable and innovative design</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Committed to client satisfaction and collaboration</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Focused on delivering exceptional quality in every project</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="border-b border-border bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-primary">Our Core Values</h2>
              <p className="mt-4 text-lg text-foreground/70">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: 'Excellence',
                  description: 'Commitment to the highest standards in design and execution',
                  icon: '⭐'
                },
                {
                  title: 'Innovation',
                  description: 'Embracing creative solutions and modern architectural practices',
                  icon: '💡'
                },
                {
                  title: 'Integrity',
                  description: 'Honesty, transparency, and ethical conduct in all dealings',
                  icon: '🤝'
                },
                {
                  title: 'Sustainability',
                  description: 'Creating environmentally responsible and enduring structures',
                  icon: '🌱'
                },
                {
                  title: 'Collaboration',
                  description: 'Working closely with clients to achieve their vision',
                  icon: '👥'
                },
                {
                  title: 'Professionalism',
                  description: 'Delivering projects on time with exceptional quality',
                  icon: '✨'
                },
                {
                  title: 'Warmth',
                  description: 'Creating welcoming spaces and building lasting relationships',
                  icon: '❤️'
                },
                {
                  title: 'Pride',
                  description: 'Taking pride in our work and company reputation',
                  icon: '🏆'
                }
              ].map((value, index) => (
                <div key={index} className="flex flex-col gap-3 rounded-lg border border-border bg-white p-6 text-center">
                  <div className="text-4xl">{value.icon}</div>
                  <h3 className="font-semibold text-primary">{value.title}</h3>
                  <p className="text-sm text-foreground/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Sets Us Apart */}
        <section className="border-b border-border bg-secondary/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-primary">What Sets Us Apart</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Personalized Approach',
                  description: 'Every project is unique. We take time to understand your specific needs, preferences, and constraints before developing a tailored solution.'
                },
                {
                  title: 'Technical Expertise',
                  description: 'Our team combines years of experience with up-to-date knowledge of building codes, materials, and sustainable practices.'
                },
                {
                  title: 'Full-Service Solutions',
                  description: 'From initial concept through final execution, we provide comprehensive services including design, material sourcing, and project oversight.'
                },
                {
                  title: 'Quality Materials',
                  description: 'We partner with trusted suppliers to ensure your projects are built with original, high-quality materials that last.'
                },
                {
                  title: 'Client Satisfaction',
                  description: 'Your satisfaction is our ultimate goal. We maintain transparent communication and stay committed throughout the entire project.'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 rounded-lg border border-border bg-white p-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <span className="text-lg font-bold text-accent">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{item.title}</h3>
                    <p className="mt-1 text-sm text-foreground/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-b border-border bg-primary py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
              Let's Create Something Exceptional
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/90">
              Ready to bring your vision to life? Contact us today to discuss your project.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-accent text-primary hover:bg-accent/90"
              >
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/services">
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
