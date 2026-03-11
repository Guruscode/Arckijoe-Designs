export type Product = {
  id: number
  title: string
  slug: string
  description: string
  price: number
  unit: string
  imageUrl: string | null
  imageAlt: string | null
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export type OrderStatus = 'new' | 'contacted' | 'completed' | 'cancelled'

export type Order = {
  id: number
  productId: number
  productTitle: string
  customerName: string
  customerEmail: string
  customerPhone: string
  quantity: number
  notes: string | null
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export type ProductPayload = {
  title: string
  description: string
  price: number
  unit: string
  imageUrl?: string | null
  imageAlt?: string | null
  isActive?: boolean
  isFeatured?: boolean
}

export type OrderPayload = {
  productId: number
  customerName: string
  customerEmail: string
  customerPhone: string
  quantity: number
  notes?: string | null
}
