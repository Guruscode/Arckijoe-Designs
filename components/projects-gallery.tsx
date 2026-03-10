'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useModal } from '@/context/modal-context'

interface ProjectVideo {
  id: number
  title: string
  category: string
  src: string
}

const projectVideos: ProjectVideo[] = [
  { id: 1, title: 'Staff Introduction 1', category: 'Team Story', src: '/vid1.MOV' },
  { id: 2, title: 'Staff Introduction 2', category: 'Team Story', src: '/vid2.MOV' },
  { id: 3, title: 'Staff Introduction 3', category: 'Team Story', src: '/vid3.MOV' },
  { id: 4, title: 'Staff Introduction 4', category: 'Team Story', src: '/vid4.MOV' },
  { id: 5, title: 'Staff Introduction 5', category: 'Team Story', src: '/vid5.MOV' },
  { id: 6, title: 'Staff Introduction 6', category: 'Team Story', src: '/vid6.MOV' },
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
  const { openVideoModal } = useModal()

  return (
    <section className="w-full bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
            Meet The Team
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Hear From Our Staff
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Click any video to watch our team talk about the company and the work we do.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projectVideos.map((project) => {
            const isHovered = hoveredId === project.id

            return (
              <motion.button
                key={project.id}
                type="button"
                variants={itemVariants}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => openVideoModal(project)}
                className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-shadow hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden bg-black"
                >
                  <video
                    src={project.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="aspect-[4/5] w-full object-cover"
                  />

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0.55 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  />

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0.8 }}
                    animate={{ scale: isHovered ? 1 : 0.9, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg">
                      <Play className="h-7 w-7 fill-current" />
                    </div>
                  </motion.div>
                </motion.div>

                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
