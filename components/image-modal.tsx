'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useModal } from '@/context/modal-context'

export default function ImageModal() {
  const { isOpen, modalType, imageData, closeModal } = useModal()

  return (
    <AnimatePresence>
      {isOpen && modalType === 'image' && imageData && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.72 }}
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
            <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-background shadow-2xl">
              <div className="flex items-center justify-between border-b border-border px-4 py-4 sm:px-6">
                <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                  {imageData.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="rounded-lg p-2 transition-colors hover:bg-secondary"
                  aria-label="Close image modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative aspect-[4/5] w-full bg-secondary sm:aspect-[16/10]">
                <Image
                  src={imageData.src}
                  alt={imageData.title}
                  fill
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
