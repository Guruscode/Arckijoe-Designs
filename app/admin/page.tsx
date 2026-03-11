import Header from '@/components/header'
import Footer from '@/components/footer'
import AdminDashboard from '@/components/admin-dashboard'
import { requireAdmin } from '@/lib/auth'
import { getAllOrders, getAllProducts } from '@/lib/store'

export default async function AdminPage() {
  await requireAdmin()
  const [products, orders] = await Promise.all([
    getAllProducts().catch(() => []),
    getAllOrders().catch(() => []),
  ])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdminDashboard initialProducts={products} initialOrders={orders} />
        </div>
      </main>
      <Footer />
    </>
  )
}
