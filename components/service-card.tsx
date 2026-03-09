import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  features?: string[]
  href?: string
}

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  href,
}: ServiceCardProps) {
  const content = (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-white p-6 shadow-soft transition-all duration-300 hover:border-accent hover:shadow-soft-md">
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-primary">{title}</h3>

      {/* Description */}
      <p className="flex-grow text-sm text-foreground/70">{description}</p>

      {/* Features List */}
      {features && features.length > 0 && (
        <ul className="space-y-2 border-t border-border pt-4">
          {features.map((feature, index) => (
            <li key={index} className="flex gap-2 text-xs text-foreground/60">
              <span className="mt-1 flex-shrink-0 h-1 w-1 rounded-full bg-accent" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      {href && (
        <div className="flex items-center gap-2 text-sm font-medium text-accent pt-2">
          <span>Learn More</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <a href={href} className="group">
        {content}
      </a>
    )
  }

  return content
}
