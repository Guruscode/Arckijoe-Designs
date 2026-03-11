'use client'

import { useState } from 'react'
import ProductCard from '@/components/product-card'
import { Product } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

type ProductCatalogProps = {
  products: Product[]
}

const emptyForm = {
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  quantity: '1',
  notes: '',
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedProduct) return

    setIsSubmitting(true)
    setSuccessMessage('')

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct.id,
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          customerPhone: form.customerPhone,
          quantity: Number(form.quantity),
          notes: form.notes || null,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit order.')
      }

      setSuccessMessage(data.message)
      setForm(emptyForm)
      toast.success('Order submitted successfully.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to submit order.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function closeDialog(open: boolean) {
    if (!open) {
      setSelectedProduct(null)
      setForm(emptyForm)
      setSuccessMessage('')
    }
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            unit={product.unit}
            image={product.imageUrl ?? undefined}
            isHighlight={product.isFeatured || index === 0}
            ctaLabel="Buy Now"
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      <Dialog open={Boolean(selectedProduct)} onOpenChange={closeDialog}>
        <DialogContent className="max-w-2xl border-border p-0 sm:max-w-2xl">
          {selectedProduct ? (
            <div className="overflow-hidden rounded-lg">
              <div className="border-b border-border bg-secondary/40 px-6 py-5">
                <DialogHeader className="text-left">
                  <DialogTitle className="text-2xl text-primary">
                    Buy {selectedProduct.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-foreground/70">
                    Fill this form and our team will contact you to confirm the order.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full bg-accent px-3 py-1 font-semibold text-primary">
                    NGN {selectedProduct.price.toLocaleString()}
                  </span>
                  <span className="text-foreground/60">{selectedProduct.unit}</span>
                </div>
              </div>

              {successMessage ? (
                <div className="space-y-4 px-6 py-8">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <p className="text-lg font-semibold text-emerald-800">Request sent</p>
                    <p className="mt-2 text-sm text-emerald-700">{successMessage}</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => setSelectedProduct(null)}>
                    Close
                  </Button>
                </div>
              ) : (
                <form className="grid gap-4 px-6 py-6" onSubmit={handleSubmit}>
                  <div className="grid gap-2">
                    <Label htmlFor="customerName">Full name</Label>
                    <Input
                      id="customerName"
                      value={form.customerName}
                      onChange={(event) => setForm((current) => ({ ...current, customerName: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="customerEmail">Email</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        value={form.customerEmail}
                        onChange={(event) => setForm((current) => ({ ...current, customerEmail: event.target.value }))}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="customerPhone">Phone number</Label>
                      <Input
                        id="customerPhone"
                        value={form.customerPhone}
                        onChange={(event) => setForm((current) => ({ ...current, customerPhone: event.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={form.quantity}
                      onChange={(event) => setForm((current) => ({ ...current, quantity: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      rows={4}
                      placeholder="Delivery location, preferred contact time, or anything else."
                      value={form.notes}
                      onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                    />
                  </div>
                  <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Order'}
                  </Button>
                </form>
              )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
