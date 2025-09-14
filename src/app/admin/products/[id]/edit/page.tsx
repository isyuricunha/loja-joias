'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ArrowLeft, Save } from 'lucide-react'
import { Category, MaterialType, MATERIAL_TYPE_LABELS } from '@/types'
import { generateSlug } from '@/lib/utils'
import ImageUpload from '@/components/ui/ImageUpload'

interface ProductFormData {
  name: string
  description: string
  price: number
  originalPrice?: number
  materialType: MaterialType
  categoryId: number
  inStock: boolean
  stockQuantity: number
  isRecommended: boolean
  isFeatured: boolean
  metaTitle?: string
  metaDescription?: string
}

interface ProductImage {
  imageUrl: string
  altText: string
}

interface ProductSize {
  sizeName: string
  sizeValue?: string
  isAvailable: boolean
}

export default function EditProduct() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  const [categories, setCategories] = useState<Category[]>([])
  const [images, setImages] = useState<ProductImage[]>([])
  const [sizes, setSizes] = useState<ProductSize[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>()

  const watchName = watch('name')

  // Load categories
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data.categories || []))
      .catch(console.error)
  }, [])

  // Load product data
  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then(res => res.json())
        .then(product => {
          reset({
            name: product.name,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice,
            materialType: product.materialType,
            categoryId: product.categoryId,
            inStock: product.inStock,
            stockQuantity: product.stockQuantity,
            isRecommended: product.isRecommended,
            isFeatured: product.isFeatured,
            metaTitle: product.metaTitle,
            metaDescription: product.metaDescription,
          })
          
          setImages(product.images?.map((img: any) => ({
            imageUrl: img.imageUrl,
            altText: img.altText
          })) || [])
          
          setSizes(product.sizes?.map((size: any) => ({
            sizeName: size.sizeName,
            sizeValue: size.sizeValue,
            isAvailable: size.isAvailable
          })) || [])
          
          setInitialLoading(false)
        })
        .catch(error => {
          console.error('Error loading product:', error)
          setInitialLoading(false)
        })
    }
  }, [productId, reset])

  // Auto-generate meta title from name
  useEffect(() => {
    if (watchName) {
      setValue('metaTitle', watchName)
    }
  }, [watchName, setValue])

  const addSize = () => {
    setSizes([...sizes, { sizeName: '', sizeValue: '', isAvailable: true }])
  }

  const updateSize = (index: number, field: keyof ProductSize, value: string | boolean) => {
    const newSizes = [...sizes]
    newSizes[index] = { ...newSizes[index], [field]: value }
    setSizes(newSizes)
  }

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true)
    try {
      const slug = generateSlug(data.name)
      
      const productData = {
        ...data,
        slug,
        images: images.filter(img => img.imageUrl.trim()),
        sizes: sizes.filter(size => size.sizeName.trim()),
      }

      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar produto')
      }

      router.push('/admin/products')
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Erro ao atualizar produto')
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Carregando produto...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Editar Produto</h1>
              <p className="text-neutral-600">Atualize as informações do produto</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Informações Básicas</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Nome é obrigatório' })}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Ex: Anel de Ouro 18k"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Descrição *
                </label>
                <textarea
                  {...register('description', { required: 'Descrição é obrigatória' })}
                  rows={4}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Descreva o produto..."
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Preço *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', { required: 'Preço é obrigatório', min: 0 })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Preço Original
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('originalPrice', { min: 0 })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Material *
                  </label>
                  <select
                    {...register('materialType', { required: 'Material é obrigatório' })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="">Selecione o material</option>
                    {Object.entries(MATERIAL_TYPE_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                  {errors.materialType && (
                    <p className="text-sm text-red-500 mt-1">{errors.materialType.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Categoria *
                  </label>
                  <select
                    {...register('categoryId', { required: 'Categoria é obrigatória' })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="">Selecione a categoria</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <p className="text-sm text-red-500 mt-1">{errors.categoryId.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Imagens</h2>
            <ImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={5}
            />
          </div>

          {/* Inventory & Settings */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Estoque e Configurações</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Quantidade em Estoque
                </label>
                <input
                  type="number"
                  {...register('stockQuantity', { min: 0 })}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="0"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('inStock')}
                    className="rounded border-neutral-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-sm text-neutral-700">Em estoque</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('isRecommended')}
                    className="rounded border-neutral-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-sm text-neutral-700">Produto recomendado</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('isFeatured')}
                    className="rounded border-neutral-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-sm text-neutral-700">Produto em destaque</span>
                </label>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">SEO</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Título Meta
                </label>
                <input
                  type="text"
                  {...register('metaTitle')}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Título para SEO"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Descrição Meta
                </label>
                <textarea
                  {...register('metaDescription')}
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Descrição para SEO"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
