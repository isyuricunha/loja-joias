export type MaterialType = 
  | 'OURO_18K'
  | 'PRATA_925'
  | 'FOLHEADO'
  | 'ACO_INOX'
  | 'ACO_BANHADO'
  | 'BIJUTERIA'

export type RecommendationType = 'MANUAL' | 'RELATED' | 'BESTSELLER'

export interface Product {
  id: string
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
  slug: string
  metaTitle?: string
  metaDescription?: string
  createdAt: Date
  updatedAt: Date
  category: Category
  images: ProductImage[]
  sizes?: ProductSize[]
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  icon?: string
  sortOrder: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  _count?: {
    products: number
  }
}

export interface ProductImage {
  id: number
  productId: string
  imageUrl: string
  altText?: string
  isPrimary: boolean
  sortOrder: number
}

export interface ProductSize {
  id: number
  productId: string
  sizeName: string
  sizeValue?: string
  isAvailable: boolean
}

export interface SearchParams {
  q?: string
  category?: string
  materialType?: MaterialType
  inStock?: boolean
  priceMin?: number
  priceMax?: number
  page?: number
  limit?: number
  sortBy?: 'name' | 'price' | 'created_at'
  sortOrder?: 'asc' | 'desc'
}

export interface RecommendationResponse {
  related: Product[]
  recommended: Product[]
  bestsellers: Product[]
}

export const MATERIAL_TYPE_LABELS: Record<MaterialType, string> = {
  OURO_18K: 'Ouro 18k',
  PRATA_925: 'Prata 925',
  FOLHEADO: 'Folheado a Ouro',
  ACO_INOX: 'Aço Inoxidável',
  ACO_BANHADO: 'Aço Inox Banhado',
  BIJUTERIA: 'Bijuteria/Liga Metálica',
}
