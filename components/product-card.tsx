import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  title: string
  description: string
  price?: number
  unit?: string
  image?: string
  icon?: React.ReactNode
  href?: string
  ctaLabel?: string
  onClick?: () => void
  isHighlight?: boolean
}

export default function ProductCard({
  title,
  description,
  price,
  unit,
  image,
  icon,
  href,
  ctaLabel = 'Shop Now',
  onClick,
  isHighlight = false,
}: ProductCardProps) {
  const cardClass = isHighlight
    ? 'border-2 border-accent bg-gradient-to-br from-white to-accent/5'
    : 'border border-border bg-white'

  return (
    <div className={`group flex h-full flex-col overflow-hidden rounded-xl ${cardClass} shadow-soft transition-all duration-300 hover:shadow-soft-md`}>
      {/* Image or Icon */}
      <div className="relative h-48 w-full overflow-hidden bg-secondary">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-accent">
            {icon ? icon : <div className="text-5xl">🏗️</div>}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <p className="flex-grow text-sm text-foreground/70">{description}</p>
        {typeof price === 'number' ? (
          <div className="rounded-lg border border-border bg-secondary/60 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Price
            </p>
            <p className="mt-1 text-xl font-semibold text-primary">
              NGN {price.toLocaleString()}
              {unit ? <span className="ml-2 text-sm font-medium text-foreground/60">{unit}</span> : null}
            </p>
          </div>
        ) : null}

        {/* CTA Button */}
        {href ? (
          <Button
            asChild
            variant="outline"
            className="w-full gap-2 border-accent text-accent hover:bg-accent/10"
          >
            <Link href={href}>
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : onClick ? (
          <Button
            type="button"
            variant="outline"
            className="w-full gap-2 border-accent text-accent hover:bg-accent/10"
            onClick={onClick}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <div className="text-sm font-medium text-accent cursor-pointer hover:gap-2 transition-all flex items-center gap-1">
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  )
}
