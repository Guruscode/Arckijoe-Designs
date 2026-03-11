'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useModal } from '@/context/modal-context'

export default function VideoModal() {
  const { isOpen, modalType, videoData, closeModal } = useModal()

  return (
    <AnimatePresence>
      {isOpen && modalType === 'video' && videoData && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 z-40 bg-black"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-background shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-4 sm:px-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                    {videoData.category}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-foreground sm:text-2xl">
                    {videoData.title}
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="rounded-lg p-2 transition-colors hover:bg-secondary"
                  aria-label="Close video modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="bg-black">
                <video
                  key={videoData.src}
                  src={videoData.src}
                  poster={videoData.thumbnail}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
