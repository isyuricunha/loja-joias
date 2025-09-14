'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Edit, Trash2, Eye, EyeOff, Star, Tag, Package, Calendar } from 'lucide-react'
import { MATERIAL_TYPE_LABELS } from '@/types'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  materialType: string
  inStock: boolean
  stockQuantity: number
  isRecommended: boolean
  isFeatured: boolean
  slug: string
  metaTitle?: string
  metaDescription?: string
  createdAt: string
  updatedAt: string
  category: {
    id: number
    name: string
    slug: string
  }
  images: Array<{
    id: string
    imageUrl: string
    altText: string
    isPrimary: boolean
    sortOrder: number
  }>
  sizes: Array<{
    id: string
    sizeName: string
    sizeValue?: string
    isAvailable: boolean
  }>
}

export default function ViewProduct() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error loading product:', error)
          setLoading(false)
        })
    }
  }, [productId])

  const handleDelete = async () => {
    if (!product) return
    
    const confirmed = confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)
    if (!confirmed) return

    setDeleting(true)
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erro ao excluir produto')
      }

      router.push('/admin/products')
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Erro ao excluir produto')
    } finally {
      setDeleting(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Carregando produto...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Produto não encontrado</h1>
          <p className="text-neutral-600 mb-4">O produto que você está procurando não existe.</p>
          <button
            onClick={() => router.push('/admin/products')}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            Voltar aos Produtos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/products')}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">{product.name}</h1>
              <p className="text-neutral-600">Visualizar detalhes do produto</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push(`/admin/products/${productId}/edit`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Edit size={16} />
              Editar
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {deleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Excluir
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Imagens</h2>
              
              {product.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product.images
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
                          <img
                            src={image.imageUrl}
                            alt={image.altText}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {image.isPrimary && (
                          <div className="absolute top-2 left-2 bg-rose-500 text-white px-2 py-1 rounded text-xs font-medium">
                            Principal
                          </div>
                        )}
                        {image.altText && (
                          <p className="text-xs text-neutral-600 mt-1 truncate">
                            {image.altText}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-neutral-500">
                  <Package className="w-12 h-12 mx-auto mb-2 text-neutral-300" />
                  <p className="text-sm">Nenhuma imagem cadastrada</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Descrição</h2>
              <p className="text-neutral-700 whitespace-pre-wrap">{product.description}</p>
            </div>

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">Tamanhos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {product.sizes.map((size) => (
                    <div
                      key={size.id}
                      className={`p-3 border rounded-lg ${
                        size.isAvailable 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{size.sizeName}</span>
                        {size.isAvailable ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      {size.sizeValue && (
                        <p className="text-sm text-neutral-600 mt-1">{size.sizeValue}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SEO */}
            {(product.metaTitle || product.metaDescription) && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">SEO</h2>
                <div className="space-y-3">
                  {product.metaTitle && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Título Meta
                      </label>
                      <p className="text-neutral-900">{product.metaTitle}</p>
                    </div>
                  )}
                  {product.metaDescription && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Descrição Meta
                      </label>
                      <p className="text-neutral-700">{product.metaDescription}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Informações</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Preço
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-neutral-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-lg text-neutral-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Material
                  </label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                    {MATERIAL_TYPE_LABELS[product.materialType as keyof typeof MATERIAL_TYPE_LABELS]}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Categoria
                  </label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Tag className="w-3 h-3 mr-1" />
                    {product.category.name}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Estoque
                  </label>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'Em estoque' : 'Fora de estoque'}
                    </span>
                    <span className="text-sm text-neutral-600">
                      ({product.stockQuantity} unidades)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Status</h2>
              
              <div className="space-y-3">
                {product.isFeatured && (
                  <div className="flex items-center gap-2 text-yellow-700">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">Produto em destaque</span>
                  </div>
                )}
                
                {product.isRecommended && (
                  <div className="flex items-center gap-2 text-blue-700">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">Produto recomendado</span>
                  </div>
                )}

                {!product.isFeatured && !product.isRecommended && (
                  <p className="text-sm text-neutral-500">Produto padrão</p>
                )}
              </div>
            </div>

            {/* Timestamps */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Datas</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Calendar className="w-4 h-4" />
                  <div>
                    <p className="text-sm font-medium">Criado em</p>
                    <p className="text-xs">{formatDate(product.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-neutral-600">
                  <Calendar className="w-4 h-4" />
                  <div>
                    <p className="text-sm font-medium">Atualizado em</p>
                    <p className="text-xs">{formatDate(product.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Info */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Técnico</h2>
              
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">
                    ID
                  </label>
                  <code className="text-xs bg-neutral-100 px-2 py-1 rounded">
                    {product.id}
                  </code>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">
                    Slug
                  </label>
                  <code className="text-xs bg-neutral-100 px-2 py-1 rounded">
                    {product.slug}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
