'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

interface Project {
  id: number
  title: string
  emoji: string
  category: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Modern Residential Complex',
    emoji: '🏢',
    category: 'Residential'
  },
  {
    id: 2,
    title: 'Luxury Office Building',
    emoji: '🏛️',
    category: 'Commercial'
  },
  {
    id: 3,
    title: 'Eco-Friendly Living Space',
    emoji: '🌿',
    category: 'Sustainable'
  },
  {
    id: 4,
    title: 'Contemporary Museum Design',
    emoji: '🎨',
    category: 'Cultural'
  },
  {
    id: 5,
    title: 'Smart Office Conversion',
    emoji: '💻',
    category: 'Tech'
  },
  {
    id: 6,
    title: 'Heritage Restoration Project',
    emoji: '🏰',
    category: 'Heritage'
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function ProjectsGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="w-full py-16 sm:py-24 bg-background">
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
            Completed Projects
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explore Our Finished Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Watch how we transform visions into architectural masterpieces
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
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <motion.div
                className="relative h-64 bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background with emoji */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <span className="text-6xl">{project.emoji}</span>
                </div>

                {/* Animated gradient overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"
                />

                {/* Play button */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ scale: hoveredId === project.id ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="p-4 rounded-full bg-accent/90 text-primary"
                  >
                    <Play className="w-6 h-6 fill-current" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">{project.category}</p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 h-1 bg-accent origin-left"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
