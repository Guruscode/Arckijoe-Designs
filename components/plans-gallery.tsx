'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

interface Plan {
  id: number
  title: string
  emoji: string
  type: string
}

const plans: Plan[] = [
  {
    id: 1,
    title: 'Floor Plan - Ground Level',
    emoji: '📐',
    type: 'Floor Plan'
  },
  {
    id: 2,
    title: 'Elevation Design - Front View',
    emoji: '🏗️',
    type: 'Elevation'
  },
  {
    id: 3,
    title: 'Site Layout Analysis',
    emoji: '🗺️',
    type: 'Site Plan'
  },
  {
    id: 4,
    title: '3D Sectional View',
    emoji: '📏',
    type: 'Section'
  },
  {
    id: 5,
    title: 'Structural Details',
    emoji: '⚙️',
    type: 'Details'
  },
  {
    id: 6,
    title: 'Landscape Integration',
    emoji: '🌳',
    type: 'Landscape'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function PlansGallery() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="w-full py-16 sm:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-semibold tracking-wider text-accent uppercase">
            Architectural Plans
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Browse Our Detailed Plans
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Click any plan to view in detail - each showcases our meticulous approach to design
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.button
              key={plan.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(plan.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedPlan(plan.id)}
              className="group relative overflow-hidden rounded-lg cursor-pointer text-left"
            >
              <motion.div
                className="relative h-72 bg-gradient-to-br from-primary/5 to-accent/10 rounded-lg overflow-hidden border border-border"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="border border-muted/20" />
                    ))}
                  </div>
                </div>

                {/* Emoji display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    animate={{ scale: hoveredId === plan.id ? 1.2 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl"
                  >
                    {plan.emoji}
                  </motion.span>
                </div>

                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === plan.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: hoveredId === plan.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 rounded-full bg-accent text-primary"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Plan Info */}
              <motion.div className="mt-4 p-4">
                <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                  {plan.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.type}</p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredId === plan.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 h-0.5 bg-accent origin-left"
                />
              </motion.div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedPlan(null)}
              className="fixed inset-0 bg-primary z-50"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedPlan(null)
              }}
            >
              <div className="relative w-full max-w-4xl">
                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setSelectedPlan(null)}
                  className="absolute -top-12 right-0 p-2 text-white hover:text-accent transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="w-8 h-8" />
                </motion.button>

                {/* Content */}
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-background rounded-xl overflow-hidden shadow-2xl"
                >
                  {plans.find(p => p.id === selectedPlan) && (
                    <>
                      <div className="h-96 sm:h-[500px] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                          className="text-9xl"
                        >
                          {plans.find(p => p.id === selectedPlan)?.emoji}
                        </motion.span>
                      </div>
                      <div className="p-6 sm:p-8">
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {plans.find(p => p.id === selectedPlan)?.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {plans.find(p => p.id === selectedPlan)?.type}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          This detailed {plans.find(p => p.id === selectedPlan)?.type?.toLowerCase()} showcases our precision and attention to architectural excellence. Each element is carefully planned to meet both aesthetic and functional requirements.
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
