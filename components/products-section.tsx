'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCatalog from '@/components/product-catalog'
import { Product } from '@/lib/types'

type ProductsSectionProps = {
  compact?: boolean
}

export default function ProductsSection({ compact = false }: ProductsSectionProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadProducts() {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || 'Unable to load products.')
        }

        if (active) {
          setProducts(data.products ?? [])
        }
      } catch {
        if (active) {
          setProducts([])
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="border-b border-border bg-secondary/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            Materials Store
          </p>
          <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
            Available products ready for order
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
            Browse the materials currently available, open any product, and submit your request. We will follow up directly to complete the sale.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[26rem] rounded-[1.25rem] border border-border bg-white" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <ProductCatalog products={products} />
        ) : (
          <div className="rounded-[2rem] border border-dashed border-border bg-white px-6 py-12 text-center">
            <p className="text-lg font-semibold text-primary">No products have been uploaded yet.</p>
            <p className="mt-2 text-sm text-foreground/70">
              Use the admin panel to add inventory and it will appear here automatically.
            </p>
          </div>
        )}

        {!compact ? (
          <div className="mt-12 text-center">
            <p className="mb-6 text-foreground/70">
              Looking for a specific material or a bulk order?
            </p>
            <Button asChild size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              <Link href="/contact">
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
