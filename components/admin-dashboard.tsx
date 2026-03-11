'use client'

import { useMemo, useState } from 'react'
import { Product, Order, OrderStatus } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

type AdminDashboardProps = {
  initialProducts: Product[]
  initialOrders: Order[]
}

const emptyProductForm = {
  title: '',
  description: '',
  price: '',
  unit: 'per item',
  imageUrl: '',
  imageAlt: '',
  isActive: true,
  isFeatured: false,
}

const orderStatuses: OrderStatus[] = ['new', 'contacted', 'completed', 'cancelled']

export default function AdminDashboard({
  initialProducts,
  initialOrders,
}: AdminDashboardProps) {
  const [products, setProducts] = useState(initialProducts)
  const [orders, setOrders] = useState(initialOrders)
  const [productForm, setProductForm] = useState(emptyProductForm)
  const [editingProductId, setEditingProductId] = useState<number | null>(null)
  const [isSavingProduct, setIsSavingProduct] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isReadingImage, setIsReadingImage] = useState(false)

  const productStats = useMemo(() => {
    const active = products.filter((product) => product.isActive).length
    const featured = products.filter((product) => product.isFeatured).length
    return { total: products.length, active, featured }
  }, [products])

  const orderStats = useMemo(() => {
    return {
      total: orders.length,
      fresh: orders.filter((order) => order.status === 'new').length,
      contacted: orders.filter((order) => order.status === 'contacted').length,
    }
  }, [orders])

  function resetProductForm() {
    setProductForm(emptyProductForm)
    setEditingProductId(null)
  }

  async function handleProductSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSavingProduct(true)

    try {
      const payload = {
        ...productForm,
        price: Number(productForm.price),
      }
      const endpoint = editingProductId ? `/api/products/${editingProductId}` : '/api/products'
      const method = editingProductId ? 'PATCH' : 'POST'
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Unable to save product.')
      }

      const savedProduct: Product = data.product
      setProducts((current) =>
        editingProductId
          ? current.map((product) => (product.id === savedProduct.id ? savedProduct : product))
          : [savedProduct, ...current],
      )
      resetProductForm()
      toast.success(editingProductId ? 'Product updated.' : 'Product created.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to save product.')
    } finally {
      setIsSavingProduct(false)
    }
  }

  function startEditProduct(product: Product) {
    setEditingProductId(product.id)
    setProductForm({
      title: product.title,
      description: product.description,
      price: String(product.price),
      unit: product.unit,
      imageUrl: product.imageUrl ?? '',
      imageAlt: product.imageAlt ?? '',
      isActive: product.isActive,
      isFeatured: product.isFeatured,
    })
  }

  async function handleImageFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setIsReadingImage(true)

    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = () => reject(new Error('Unable to read image.'))
        reader.readAsDataURL(file)
      })

      setProductForm((current) => ({
        ...current,
        imageUrl: dataUrl,
        imageAlt: current.imageAlt || current.title || file.name,
      }))
      toast.success('Image attached.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to read image.')
    } finally {
      setIsReadingImage(false)
      event.target.value = ''
    }
  }

  async function handleDeleteProduct(productId: number) {
    if (!window.confirm('Delete this product and its related orders?')) return

    try {
      const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Unable to delete product.')
      }

      setProducts((current) => current.filter((product) => product.id !== productId))
      setOrders((current) => current.filter((order) => order.productId !== productId))
      if (editingProductId === productId) resetProductForm()
      toast.success('Product deleted.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to delete product.')
    }
  }

  async function handleOrderStatusChange(orderId: number, status: OrderStatus) {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Unable to update order.')
      }

      const updatedOrder: Order = data.order
      setOrders((current) => current.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)))
      toast.success('Order updated.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update order.')
    }
  }

  async function handleDeleteOrder(orderId: number) {
    if (!window.confirm('Delete this order?')) return

    try {
      const response = await fetch(`/api/orders/${orderId}`, { method: 'DELETE' })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Unable to delete order.')
      }

      setOrders((current) => current.filter((order) => order.id !== orderId))
      toast.success('Order deleted.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to delete order.')
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      window.location.href = '/admin/login'
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.75rem] border border-border bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Inventory control
          </p>
          <h1 className="mt-3 text-3xl font-bold text-primary">Admin panel</h1>
          <p className="mt-3 max-w-2xl text-sm text-foreground/70">
            Upload products, update stock visibility, and track customer orders from one dashboard.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-border bg-secondary/40 p-5">
            <p className="text-sm text-foreground/60">Products</p>
            <p className="mt-2 text-3xl font-semibold text-primary">{productStats.total}</p>
            <p className="mt-1 text-sm text-foreground/60">
              {productStats.active} active, {productStats.featured} featured
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-border bg-secondary/40 p-5">
            <p className="text-sm text-foreground/60">Orders</p>
            <p className="mt-2 text-3xl font-semibold text-primary">{orderStats.total}</p>
            <p className="mt-1 text-sm text-foreground/60">
              {orderStats.fresh} new, {orderStats.contacted} contacted
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Signing out...' : 'Sign out'}
        </Button>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <form onSubmit={handleProductSubmit} className="space-y-4 rounded-[1.75rem] border border-border bg-white p-6">
              <div>
                <h2 className="text-xl font-semibold text-primary">
                  {editingProductId ? 'Edit product' : 'Add product'}
                </h2>
                <p className="mt-1 text-sm text-foreground/60">
                  Add available products and control whether they show publicly.
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={productForm.title}
                  onChange={(event) => setProductForm((current) => ({ ...current, title: event.target.value }))}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={productForm.description}
                  onChange={(event) => setProductForm((current) => ({ ...current, description: event.target.value }))}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price (NGN)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={productForm.price}
                    onChange={(event) => setProductForm((current) => ({ ...current, price: event.target.value }))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Unit label</Label>
                  <Input
                    id="unit"
                    value={productForm.unit}
                    onChange={(event) => setProductForm((current) => ({ ...current, unit: event.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://..."
                    value={productForm.imageUrl}
                    onChange={(event) => setProductForm((current) => ({ ...current, imageUrl: event.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="imageAlt">Image alt text</Label>
                  <Input
                    id="imageAlt"
                    value={productForm.imageAlt}
                    onChange={(event) => setProductForm((current) => ({ ...current, imageAlt: event.target.value }))}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="imageFile">Upload image</Label>
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  disabled={isReadingImage}
                />
                <p className="text-xs text-foreground/60">
                  {isReadingImage
                    ? 'Reading image...'
                    : 'You can upload a product image directly or paste an external image URL above.'}
                </p>
              </div>

              {productForm.imageUrl ? (
                <div className="overflow-hidden rounded-2xl border border-border bg-secondary/30 p-3">
                  <img
                    src={productForm.imageUrl}
                    alt={productForm.imageAlt || productForm.title || 'Product preview'}
                    className="h-40 w-full rounded-xl object-cover"
                  />
                </div>
              ) : null}

              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 text-sm text-foreground/80">
                  <input
                    type="checkbox"
                    checked={productForm.isActive}
                    onChange={(event) => setProductForm((current) => ({ ...current, isActive: event.target.checked }))}
                  />
                  Show publicly
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground/80">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(event) => setProductForm((current) => ({ ...current, isFeatured: event.target.checked }))}
                  />
                  Feature product
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSavingProduct}>
                  {isSavingProduct ? 'Saving...' : editingProductId ? 'Update product' : 'Create product'}
                </Button>
                {editingProductId ? (
                  <Button type="button" variant="outline" onClick={resetProductForm}>
                    Cancel edit
                  </Button>
                ) : null}
              </div>
            </form>

            <div className="rounded-[1.75rem] border border-border bg-white p-6">
              <h2 className="text-xl font-semibold text-primary">Current products</h2>
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="max-w-[280px]">
                          <div>
                            <p className="font-medium text-primary">{product.title}</p>
                            <p className="truncate text-xs text-foreground/60">{product.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>NGN {product.price.toLocaleString()}</TableCell>
                        <TableCell>
                          {product.isActive ? 'Active' : 'Hidden'}
                          {product.isFeatured ? ' / Featured' : ''}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => startEditProduct(product)}>
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {products.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="py-8 text-center text-sm text-foreground/60">
                          No products yet.
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="rounded-[1.75rem] border border-border bg-white p-6">
            <h2 className="text-xl font-semibold text-primary">Incoming orders</h2>
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="max-w-[240px]">
                        <div>
                          <p className="font-medium text-primary">{order.customerName}</p>
                          <p className="text-xs text-foreground/60">{order.customerEmail}</p>
                          <p className="text-xs text-foreground/60">{order.customerPhone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[220px]">
                        <div>
                          <p className="font-medium text-primary">{order.productTitle}</p>
                          {order.notes ? <p className="truncate text-xs text-foreground/60">{order.notes}</p> : null}
                        </div>
                      </TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleOrderStatusChange(order.id, value as OrderStatus)}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {orderStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleDeleteOrder(order.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center text-sm text-foreground/60">
                        No orders yet.
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
