import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://loja-joias.com'
  
  const robots = `User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin/
Disallow: /api/

# Allow important pages
Allow: /api/sitemap.xml

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
