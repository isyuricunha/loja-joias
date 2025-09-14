'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { MATERIAL_TYPE_LABELS } from '@/types'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?limit=100')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return

    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
      setProducts(products.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Erro ao excluir produto')
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-neutral-900">Produtos</h1>
          <div className="h-10 w-32 bg-neutral-200 rounded animate-pulse"></div>
        </div>
        <div className="card p-6">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 bg-neutral-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Produtos</h1>
          <p className="text-neutral-600 mt-1">
            Gerencie o catálogo de produtos da sua loja
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Novo Produto
        </Link>
      </div>

      {/* Search */}
      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-neutral-900">Produto</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-900">Material</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-900">Preço</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-900">Estoque</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-900">Status</th>
                <th className="text-right py-3 px-4 font-medium text-neutral-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-neutral-200 rounded-lg flex-shrink-0">
                        {product.images[0] && (
                          <img
                            src={product.images[0].imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{product.name}</p>
                        <p className="text-sm text-neutral-600 truncate max-w-xs">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-neutral-600">
                    {MATERIAL_TYPE_LABELS[product.materialType]}
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-neutral-900">
                        {formatPrice(product.price)}
                      </p>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <p className="text-sm text-neutral-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-neutral-600">
                    {product.stockQuantity}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.inStock
                        ? 'bg-success-100 text-success-800'
                        : 'bg-error-100 text-error-800'
                    }`}>
                      {product.inStock ? 'Em estoque' : 'Esgotado'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/produtos/${product.slug}`}
                        target="_blank"
                        className="p-2 text-neutral-400 hover:text-neutral-600"
                        title="Visualizar"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 text-neutral-400 hover:text-primary-600"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-neutral-400 hover:text-error-600"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-neutral-400" />
            <h3 className="mt-2 text-sm font-medium text-neutral-900">Nenhum produto encontrado</h3>
            <p className="mt-1 text-sm text-neutral-500">
              {searchQuery ? 'Tente buscar por outros termos.' : 'Comece criando um novo produto.'}
            </p>
            {!searchQuery && (
              <div className="mt-6">
                <Link href="/admin/products/new" className="btn-primary">
                  <Plus size={20} className="mr-2" />
                  Novo Produto
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
