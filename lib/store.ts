import { z } from 'zod'
import { ensureDb, getDb, mapOrderRow, mapProductRow } from '@/lib/db'
import { Order, OrderPayload, Product, ProductPayload } from '@/lib/types'

const productSchema = z.object({
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().min(10).max(1000),
  price: z.coerce.number().nonnegative(),
  unit: z.string().trim().min(2).max(40),
  imageUrl: z.string().trim().url().optional().nullable().or(z.literal('')),
  imageAlt: z.string().trim().max(120).optional().nullable().or(z.literal('')),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
})

const orderSchema = z.object({
  productId: z.coerce.number().int().positive(),
  customerName: z.string().trim().min(2).max(120),
  customerEmail: z.string().trim().email(),
  customerPhone: z.string().trim().min(7).max(40),
  quantity: z.coerce.number().int().min(1).max(1000),
  notes: z.string().trim().max(1000).optional().nullable().or(z.literal('')),
})

const orderStatusSchema = z.enum(['new', 'contacted', 'completed', 'cancelled'])

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function createUniqueSlug(title: string, excludeId?: number) {
  await ensureDb()
  const db = getDb()
  const base = slugify(title) || 'product'
  let attempt = base
  let counter = 1

  while (true) {
    const query = excludeId
      ? 'SELECT id FROM products WHERE slug = ? AND id != ? LIMIT 1'
      : 'SELECT id FROM products WHERE slug = ? LIMIT 1'
    const args = excludeId ? [attempt, excludeId] : [attempt]
    const existing = await db.execute({ sql: query, args })
    if (existing.rows.length === 0) return attempt
    counter += 1
    attempt = `${base}-${counter}`
  }
}

export async function getPublicProducts() {
  await ensureDb()
  const result = await getDb().execute(
    'SELECT * FROM products WHERE is_active = 1 ORDER BY is_featured DESC, created_at DESC',
  )
  return result.rows.map((row) => mapProductRow(row as Record<string, unknown>))
}

export async function getAllProducts() {
  await ensureDb()
  const result = await getDb().execute('SELECT * FROM products ORDER BY created_at DESC')
  return result.rows.map((row) => mapProductRow(row as Record<string, unknown>))
}

export async function getAllOrders() {
  await ensureDb()
  const result = await getDb().execute('SELECT * FROM orders ORDER BY created_at DESC')
  return result.rows.map((row) => mapOrderRow(row as Record<string, unknown>))
}

export async function createProduct(payload: ProductPayload): Promise<Product> {
  const input = productSchema.parse(payload)
  await ensureDb()
  const slug = await createUniqueSlug(input.title)
  await getDb().execute({
    sql: `INSERT INTO products
      (title, slug, description, price, unit, image_url, image_alt, is_active, is_featured, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    args: [
      input.title,
      slug,
      input.description,
      input.price,
      input.unit,
      input.imageUrl || null,
      input.imageAlt || null,
      input.isActive === false ? 0 : 1,
      input.isFeatured ? 1 : 0,
    ],
  })

  const inserted = await getDb().execute('SELECT * FROM products ORDER BY id DESC LIMIT 1')
  return mapProductRow(inserted.rows[0] as Record<string, unknown>)
}

export async function updateProduct(id: number, payload: Partial<ProductPayload>) {
  await ensureDb()
  const existingResult = await getDb().execute({
    sql: 'SELECT * FROM products WHERE id = ? LIMIT 1',
    args: [id],
  })
  if (existingResult.rows.length === 0) {
    throw new Error('Product not found.')
  }

  const existing = mapProductRow(existingResult.rows[0] as Record<string, unknown>)
  const mergedInput = productSchema.parse({
    title: payload.title ?? existing.title,
    description: payload.description ?? existing.description,
    price: payload.price ?? existing.price,
    unit: payload.unit ?? existing.unit,
    imageUrl: payload.imageUrl ?? existing.imageUrl,
    imageAlt: payload.imageAlt ?? existing.imageAlt,
    isActive: payload.isActive ?? existing.isActive,
    isFeatured: payload.isFeatured ?? existing.isFeatured,
  })
  const slug = await createUniqueSlug(mergedInput.title, id)

  await getDb().execute({
    sql: `UPDATE products
      SET title = ?, slug = ?, description = ?, price = ?, unit = ?, image_url = ?, image_alt = ?,
          is_active = ?, is_featured = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
    args: [
      mergedInput.title,
      slug,
      mergedInput.description,
      mergedInput.price,
      mergedInput.unit,
      mergedInput.imageUrl || null,
      mergedInput.imageAlt || null,
      mergedInput.isActive === false ? 0 : 1,
      mergedInput.isFeatured ? 1 : 0,
      id,
    ],
  })

  const updated = await getDb().execute({
    sql: 'SELECT * FROM products WHERE id = ? LIMIT 1',
    args: [id],
  })
  return mapProductRow(updated.rows[0] as Record<string, unknown>)
}

export async function deleteProduct(id: number) {
  await ensureDb()
  await getDb().batch(
    [
      {
        sql: 'DELETE FROM orders WHERE product_id = ?',
        args: [id],
      },
      {
        sql: 'DELETE FROM products WHERE id = ?',
        args: [id],
      },
    ],
    'write',
  )
}

export async function createOrder(payload: OrderPayload): Promise<Order> {
  const input = orderSchema.parse(payload)
  await ensureDb()
  const productResult = await getDb().execute({
    sql: 'SELECT id, title, is_active FROM products WHERE id = ? LIMIT 1',
    args: [input.productId],
  })

  if (productResult.rows.length === 0) {
    throw new Error('Selected product was not found.')
  }

  const product = productResult.rows[0] as Record<string, unknown>
  if (Number(product.is_active) !== 1) {
    throw new Error('Selected product is currently unavailable.')
  }

  await getDb().execute({
    sql: `INSERT INTO orders
      (product_id, product_title, customer_name, customer_email, customer_phone, quantity, notes, status, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'new', CURRENT_TIMESTAMP)`,
    args: [
      input.productId,
      String(product.title),
      input.customerName,
      input.customerEmail,
      input.customerPhone,
      input.quantity,
      input.notes || null,
    ],
  })

  const inserted = await getDb().execute('SELECT * FROM orders ORDER BY id DESC LIMIT 1')
  return mapOrderRow(inserted.rows[0] as Record<string, unknown>)
}

export async function updateOrder(id: number, updates: { status?: string }) {
  const input = z.object({ status: orderStatusSchema.optional() }).parse(updates)
  await ensureDb()
  const existing = await getDb().execute({
    sql: 'SELECT * FROM orders WHERE id = ? LIMIT 1',
    args: [id],
  })
  if (existing.rows.length === 0) {
    throw new Error('Order not found.')
  }

  const current = mapOrderRow(existing.rows[0] as Record<string, unknown>)
  const nextStatus = input.status ?? current.status

  await getDb().execute({
    sql: 'UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    args: [nextStatus, id],
  })

  const updated = await getDb().execute({
    sql: 'SELECT * FROM orders WHERE id = ? LIMIT 1',
    args: [id],
  })
  return mapOrderRow(updated.rows[0] as Record<string, unknown>)
}

export async function deleteOrder(id: number) {
  await ensureDb()
  await getDb().execute({
    sql: 'DELETE FROM orders WHERE id = ?',
    args: [id],
  })
}
