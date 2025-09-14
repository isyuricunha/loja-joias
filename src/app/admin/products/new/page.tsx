'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Upload, X, Plus } from 'lucide-react'
import { Category, MaterialType, MATERIAL_TYPE_LABELS } from '@/types'
import { generateSlug } from '@/lib/utils'

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

export default function NewProduct() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [images, setImages] = useState<ProductImage[]>([])
  const [sizes, setSizes] = useState<ProductSize[]>([])
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      inStock: true,
      stockQuantity: 0,
      isRecommended: false,
      isFeatured: false,
    },
  })

  const watchName = watch('name')

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error)
  }, [])

  // Auto-generate slug from name
  useEffect(() => {
    if (watchName) {
      setValue('metaTitle', watchName)
    }
  }, [watchName, setValue])

  const addImage = () => {
    setImages([...images, { imageUrl: '', altText: '' }])
  }

  const updateImage = (index: number, field: keyof ProductImage, value: string) => {
    const newImages = [...images]
    newImages[index] = { ...newImages[index], [field]: value }
    setImages(newImages)
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

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

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        router.push('/admin/products')
      } else {
        throw new Error('Erro ao criar produto')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Erro ao criar produto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Novo Produto</h1>
        <p className="text-neutral-600 mt-1">Adicione um novo produto ao catálogo</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Informações Básicas</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Nome do Produto *
                  </label>
                  <input
                    {...register('name', { required: 'Nome é obrigatório' })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.name && (
                    <p className="text-sm text-error-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Descrição *
                  </label>
                  <textarea
                    {...register('description', { required: 'Descrição é obrigatória' })}
                    rows={4}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.description && (
                    <p className="text-sm text-error-500 mt-1">{errors.description.message}</p>
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
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {errors.price && (
                      <p className="text-sm text-error-500 mt-1">{errors.price.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Preço Original (Promoção)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('originalPrice', { min: 0 })}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Selecione o material</option>
                      {Object.entries(MATERIAL_TYPE_LABELS).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                    {errors.materialType && (
                      <p className="text-sm text-error-500 mt-1">{errors.materialType.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Categoria *
                    </label>
                    <select
                      {...register('categoryId', { required: 'Categoria é obrigatória' })}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Selecione a categoria</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.categoryId && (
                      <p className="text-sm text-error-500 mt-1">{errors.categoryId.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-neutral-900">Imagens</h2>
                <button
                  type="button"
                  onClick={addImage}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Plus size={16} />
                  Adicionar Imagem
                </button>
              </div>

              <div className="space-y-4">
                {images.map((image, index) => (
                  <div key={index} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-neutral-700">
                        Imagem {index + 1} {index === 0 && '(Principal)'}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-error-500 hover:text-error-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          URL da Imagem
                        </label>
                        <input
                          type="url"
                          value={image.imageUrl}
                          onChange={(e) => updateImage(index, 'imageUrl', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="https://exemplo.com/imagem.jpg"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Texto Alternativo
                        </label>
                        <input
                          type="text"
                          value={image.altText}
                          onChange={(e) => updateImage(index, 'altText', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Descrição da imagem"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {images.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-neutral-200 rounded-lg">
                    <Upload className="mx-auto h-12 w-12 text-neutral-400" />
                    <p className="mt-2 text-sm text-neutral-600">Nenhuma imagem adicionada</p>
                    <button
                      type="button"
                      onClick={addImage}
                      className="mt-2 btn-primary"
                    >
                      Adicionar Primeira Imagem
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sizes */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-neutral-900">Tamanhos (Opcional)</h2>
                <button
                  type="button"
                  onClick={addSize}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Plus size={16} />
                  Adicionar Tamanho
                </button>
              </div>

              <div className="space-y-4">
                {sizes.map((size, index) => (
                  <div key={index} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-neutral-700">
                        Tamanho {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSize(index)}
                        className="text-error-500 hover:text-error-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Nome do Tamanho
                        </label>
                        <input
                          type="text"
                          value={size.sizeName}
                          onChange={(e) => updateSize(index, 'sizeName', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="P, M, G, 14, 16..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Valor Técnico
                        </label>
                        <input
                          type="text"
                          value={size.sizeValue || ''}
                          onChange={(e) => updateSize(index, 'sizeValue', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Opcional"
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={size.isAvailable}
                            onChange={(e) => updateSize(index, 'isAvailable', e.target.checked)}
                            className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-2 text-sm text-neutral-700">Disponível</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stock & Status */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Estoque e Status</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Quantidade em Estoque
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register('stockQuantity', { min: 0 })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('inStock')}
                      className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-neutral-700">Em estoque</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('isFeatured')}
                      className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-neutral-700">Produto em destaque</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('isRecommended')}
                      className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-neutral-700">Produto recomendado</span>
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
                    Título SEO
                  </label>
                  <input
                    {...register('metaTitle')}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Título para motores de busca"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Descrição SEO
                  </label>
                  <textarea
                    {...register('metaDescription')}
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Descrição para motores de busca"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="card p-6">
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary"
                >
                  {loading ? 'Salvando...' : 'Salvar Produto'}
                </button>
                
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-full btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
