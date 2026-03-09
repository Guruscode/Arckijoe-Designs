'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

interface ProcessStep {
  number: number
  title: string
  description: string
  emoji: string
}

const steps: ProcessStep[] = [
  {
    number: 1,
    title: 'Discover & Analyze',
    description: 'We understand your vision, budget, and project requirements through detailed consultation.',
    emoji: '🔍'
  },
  {
    number: 2,
    title: 'Conceptual Design',
    description: 'Our team creates initial concepts and 3D visualizations to bring your ideas to life.',
    emoji: '✏️'
  },
  {
    number: 3,
    title: 'Detailed Planning',
    description: 'We develop comprehensive architectural plans, technical drawings, and specifications.',
    emoji: '📐'
  },
  {
    number: 4,
    title: 'Engineering & Compliance',
    description: 'Structural and MEP systems are designed to meet all building codes and regulations.',
    emoji: '⚙️'
  },
  {
    number: 5,
    title: 'Construction Documents',
    description: 'We prepare detailed construction documents for bidding and contractor coordination.',
    emoji: '📋'
  },
  {
    number: 6,
    title: 'Execution & Support',
    description: 'Our team oversees construction, ensuring design intent is realized on-site.',
    emoji: '🏗️'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function ProcessVisualization() {
  return (
    <section className="w-full py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold tracking-wider text-accent uppercase">
            Our Process
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From Vision to Reality
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A streamlined, collaborative process that ensures exceptional results at every stage
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative"
            >
              {/* Connector line - hidden on mobile, visible on larger screens */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="hidden lg:block absolute left-12 top-24 h-16 w-0.5 bg-gradient-to-b from-accent to-transparent origin-top"
                />
              )}

              <div className="flex gap-6 sm:gap-8">
                {/* Number Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex-shrink-0 relative z-10"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg">
                      <div className="relative">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-0 text-2xl flex items-center justify-center"
                        >
                          {step.emoji}
                        </motion.span>
                        <span className="text-2xl font-bold text-primary relative">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex-1 pt-4"
                >
                  <div className="group rounded-lg border border-border p-6 hover:border-accent hover:shadow-lg transition-all duration-300 bg-card hover:bg-accent/5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                        {step.title}
                      </h3>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                      </motion.div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="mt-4 h-1 w-16 bg-accent origin-left"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center p-8 rounded-lg bg-secondary border border-border"
        >
          <h3 className="text-2xl font-bold text-foreground mb-3">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Contact us today to discuss your vision and how we can help transform it into reality.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
