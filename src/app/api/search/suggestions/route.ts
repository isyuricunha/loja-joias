import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.toLowerCase().trim()

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] })
    }

    const suggestions = []

    // Search products
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
        inStock: true,
      },
      select: {
        id: true,
        name: true,
      },
      take: 5,
    })

    products.forEach(product => {
      suggestions.push({
        id: `product-${product.id}`,
        text: product.name,
        type: 'product',
      })
    })

    // Search categories
    const categories = await prisma.category.findMany({
      where: {
        name: { contains: query, mode: 'insensitive' },
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: { products: true }
        }
      },
      take: 3,
    })

    categories.forEach(category => {
      suggestions.push({
        id: `category-${category.id}`,
        text: category.name,
        type: 'category',
        count: category._count.products,
      })
    })

    // Search by material type
    const materialTypes = [
      { key: 'OURO_18K', label: 'Ouro 18k' },
      { key: 'PRATA_925', label: 'Prata 925' },
      { key: 'FOLHEADO', label: 'Folheado' },
      { key: 'ACO_INOX', label: 'Aço Inox' },
      { key: 'ACO_BANHADO', label: 'Aço Banhado' },
      { key: 'BIJUTERIA', label: 'Bijuteria' },
    ]

    const matchingMaterials = materialTypes.filter(material =>
      material.label.toLowerCase().includes(query)
    )

    for (const material of matchingMaterials) {
      const count = await prisma.product.count({
        where: {
          materialType: material.key,
          inStock: true,
        },
      })

      if (count > 0) {
        suggestions.push({
          id: `material-${material.key}`,
          text: material.label,
          type: 'material',
          count,
        })
      }
    }

    // Limit total suggestions
    const limitedSuggestions = suggestions.slice(0, 8)

    return NextResponse.json({ suggestions: limitedSuggestions })
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
