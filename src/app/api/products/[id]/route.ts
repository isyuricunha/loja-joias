import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' }
        },
        sizes: true,
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Delete existing images and sizes
    await prisma.productImage.deleteMany({
      where: { productId: params.id }
    })
    await prisma.productSize.deleteMany({
      where: { productId: params.id }
    })

    const product = await prisma.product.update({
      where: { id: params.id },
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

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
