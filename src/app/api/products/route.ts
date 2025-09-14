import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { MaterialType } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const q = searchParams.get('q')
    const category = searchParams.get('category')
    const materialType = searchParams.get('materialType') as MaterialType
    const inStock = searchParams.get('inStock') === 'true'
    const priceMin = searchParams.get('priceMin') ? parseFloat(searchParams.get('priceMin')!) : undefined
    const priceMax = searchParams.get('priceMax') ? parseFloat(searchParams.get('priceMax')!) : undefined
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    const where: any = {}

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ]
    }

    if (category) {
      where.category = { slug: category }
    }

    if (materialType) {
      where.materialType = materialType
    }

    if (inStock) {
      where.inStock = true
    }

    if (priceMin !== undefined || priceMax !== undefined) {
      where.price = {}
      if (priceMin !== undefined) where.price.gte = priceMin
      if (priceMax !== undefined) where.price.lte = priceMax
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: {
            orderBy: { sortOrder: 'asc' }
          },
          sizes: true,
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      price,
      originalPrice,
      materialType,
      categoryId,
      inStock,
      stockQuantity,
      isRecommended,
      isFeatured,
      slug,
      metaTitle,
      metaDescription,
      images,
      sizes,
    } = body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        materialType,
        categoryId: parseInt(categoryId),
        inStock: inStock ?? true,
        stockQuantity: parseInt(stockQuantity) || 0,
        isRecommended: isRecommended ?? false,
        isFeatured: isFeatured ?? false,
        slug,
        metaTitle,
        metaDescription,
        images: {
          create: images?.map((img: any, index: number) => ({
            imageUrl: img.imageUrl,
            altText: img.altText,
            isPrimary: index === 0,
            sortOrder: index,
          })) || [],
        },
        sizes: {
          create: sizes?.map((size: any) => ({
            sizeName: size.sizeName,
            sizeValue: size.sizeValue,
            isAvailable: size.isAvailable ?? true,
          })) || [],
        },
      },
      include: {
        category: true,
        images: true,
        sizes: true,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
