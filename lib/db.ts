import { createClient, type Client } from '@libsql/client'
import { Product, Order } from '@/lib/types'

let clientInstance: Client | null = null
let initPromise: Promise<void> | null = null

function getDatabaseUrl() {
  const url = process.env.TURSO_DATABASE_URL
  if (!url) {
    throw new Error('Missing TURSO_DATABASE_URL environment variable.')
  }
  return url
}

function getDatabaseAuthToken() {
  return process.env.TURSO_AUTH_TOKEN
}

export function getDb() {
  if (!clientInstance) {
    clientInstance = createClient({
      url: getDatabaseUrl(),
      authToken: getDatabaseAuthToken(),
    })
  }

  return clientInstance
}

export async function ensureDb() {
  if (!initPromise) {
    initPromise = (async () => {
      const db = getDb()
      await db.batch(
        [
          `CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            unit TEXT NOT NULL DEFAULT 'per item',
            image_url TEXT,
            image_alt TEXT,
            is_active INTEGER NOT NULL DEFAULT 1,
            is_featured INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
          )`,
          `CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            product_title TEXT NOT NULL,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            customer_phone TEXT NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 1,
            notes TEXT,
            status TEXT NOT NULL DEFAULT 'new',
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(product_id) REFERENCES products(id)
          )`,
          `CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active, is_featured, created_at DESC)`,
          `CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status, created_at DESC)`,
        ],
        'write',
      )
    })().catch((error) => {
      initPromise = null
      throw error
    })
  }

  await initPromise
}

function asBoolean(value: unknown) {
  return Number(value) === 1
}

export function mapProductRow(row: Record<string, unknown>): Product {
  return {
    id: Number(row.id),
    title: String(row.title),
    slug: String(row.slug),
    description: String(row.description),
    price: Number(row.price),
    unit: String(row.unit),
    imageUrl: row.image_url ? String(row.image_url) : null,
    imageAlt: row.image_alt ? String(row.image_alt) : null,
    isActive: asBoolean(row.is_active),
    isFeatured: asBoolean(row.is_featured),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  }
}

export function mapOrderRow(row: Record<string, unknown>): Order {
  return {
    id: Number(row.id),
    productId: Number(row.product_id),
    productTitle: String(row.product_title),
    customerName: String(row.customer_name),
    customerEmail: String(row.customer_email),
    customerPhone: String(row.customer_phone),
    quantity: Number(row.quantity),
    notes: row.notes ? String(row.notes) : null,
    status: String(row.status) as Order['status'],
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  }
}
