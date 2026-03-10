'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useModal } from '@/context/modal-context'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  background?: 'gradient' | 'image' | 'solid'
  align?: 'left' | 'center'
  imageSrc?: string
  imageAlt?: string
}

export default function Hero({
  title,
  subtitle,
  description,
  ctaText = 'Get Started',
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref,
  background = 'gradient',
  align = 'center',
  imageSrc,
  imageAlt = 'Hero image',
}: HeroProps) {
  const { openModal } = useModal()
  const bgClass =
    background === 'gradient'
      ? 'bg-gradient-to-br from-primary to-primary/80'
      : background === 'image'
        ? 'bg-cover bg-center'
        : 'bg-primary'

  const alignClass = align === 'center' ? 'text-center' : 'text-left'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className={`relative w-full overflow-hidden py-16 sm:py-24 lg:py-32 ${bgClass}`}>
      {/* Content */}
      <div className={`relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center`}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${alignClass}`}
        >
          {subtitle && (
            <motion.p variants={itemVariants} className="mb-2 text-sm font-semibold tracking-wider text-accent uppercase">
              {subtitle}
            </motion.p>
          )}

          <motion.h1 variants={itemVariants} className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
            {title}
          </motion.h1>

          {description && (
            <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/90 sm:text-xl">
              {description}
            </motion.p>
          )}

          {/* CTA Buttons */}
          {(ctaText || secondaryCtaText) && (
            <motion.div variants={itemVariants} className={`mt-8 flex flex-col gap-4 sm:flex-row ${align === 'center' ? 'justify-center' : ''}`}>
              {ctaText && (
                <Button
                  onClick={openModal}
                  size="lg"
                  className="gap-2 bg-accent text-primary hover:bg-accent/90"
                >
                  {ctaText}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}

              {secondaryCtaText && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href={secondaryCtaHref || '#'}>
                    {secondaryCtaText}
                  </Link>
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Animated Image Column */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="hidden lg:flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl"
          >
            {imageSrc ? (
              <>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 opacity-10"
                >
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <path d="M50 10 L90 90 L10 90 Z" fill="currentColor" className="text-primary" />
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-6xl"
                >
                  🏛️
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
        <div className="h-96 w-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>
    </section>
  )
}
