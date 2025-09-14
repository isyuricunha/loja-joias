import { Metadata } from 'next'
import Link from 'next/link'
import { Package, Grid3X3, Settings, Home } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin - Loja de Joias',
  description: 'Painel administrativo da loja de joias',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center border-b border-neutral-200">
          <h1 className="text-xl font-bold text-neutral-900">Admin Panel</h1>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
            >
              <Home size={20} />
              Dashboard
            </Link>
            
            <Link
              href="/admin/products"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
            >
              <Package size={20} />
              Produtos
            </Link>
            
            <Link
              href="/admin/categories"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
            >
              <Grid3X3 size={20} />
              Categorias
            </Link>
            
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
            >
              <Settings size={20} />
              Configurações
            </Link>
          </div>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/"
            className="btn-secondary w-full text-center"
          >
            Ver Site
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <header className="bg-white shadow-sm border-b border-neutral-100">
          <div className="px-6 py-4">
            <h2 className="text-2xl font-semibold text-neutral-900">
              Painel Administrativo
            </h2>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
