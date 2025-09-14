'use client'

import { useState, useEffect } from 'react'
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react'
import { Product } from '@/types'

interface RecommendedProductsProps {
  title?: string
  subtitle?: string
  limit?: number
  type?: 'recommended' | 'featured' | 'bestsellers'
}

export default function RecommendedProducts({ 
  title = "Produtos Recomendados",
  subtitle = "Selecionados especialmente para você",
  limit = 4,
  type = 'recommended'
}: RecommendedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecommendedProducts()
  }, [type, limit])

  const fetchRecommendedProducts = async () => {
    try {
      const params = new URLSearchParams()
      params.append('limit', limit.toString())
      
      let endpoint = '/api/products'
      if (type === 'recommended') {
        params.append('isRecommended', 'true')
      } else if (type === 'featured') {
        params.append('isFeatured', 'true')
      } else if (type === 'bestsellers') {
        params.append('sortBy', 'popular')
      }

      const response = await fetch(`${endpoint}?${params}`)
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error fetching recommended products:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleWhatsAppContact = (product: Product) => {
    const message = `Olá! Tenho interesse no produto: ${product.name} - ${formatPrice(product.price)}`
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-80 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 font-light">{subtitle}</p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              {/* Product Image */}
              <div className="relative overflow-hidden mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                <img
                  src={product.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isRecommended && (
                    <span className="bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Recomendado
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Destaque
                    </span>
                  )}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Oferta
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleWhatsAppContact(product)}
                    className="flex-1 bg-green-600 text-white px-3 py-2 text-xs font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    WhatsApp
                  </button>
                  <button className="bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    Ver Mais
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="text-gray-900 font-light group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-medium">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-gray-500 line-through text-sm">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Material Badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product.materialType}
                  </span>
                  {!product.inStock && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Esgotado
                    </span>
                  )}
                </div>

                {/* Rating (placeholder) */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < 4 ? 'text-amber-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {products.length >= limit && (
          <div className="text-center mt-12">
            <button className="group border border-gray-900 text-gray-900 px-8 py-3 font-light tracking-wide text-sm uppercase hover:bg-gray-900 hover:text-white transition-all duration-500 relative overflow-hidden">
              <span className="relative z-10">Ver Todos os Produtos</span>
              <div className="absolute inset-0 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
