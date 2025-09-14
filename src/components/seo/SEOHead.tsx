import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'product' | 'article'
  noIndex?: boolean
}

export default function SEOHead({
  title = 'Loja de Joias - Joias Artesanais de Luxo',
  description = 'Descubra nossa coleção exclusiva de joias artesanais. Anéis, colares, brincos e pulseiras em ouro 18k, prata 925 e materiais premium.',
  keywords = 'joias, joias artesanais, ouro 18k, prata 925, anéis, colares, brincos, pulseiras, joias de luxo',
  image = '/images/og-image.jpg',
  url = 'https://loja-joias.com',
  type = 'website',
  noIndex = false
}: SEOHeadProps) {
  const fullTitle = title.includes('Loja de Joias') ? title : `${title} | Loja de Joias`
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Loja de Joias" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Loja de Joias" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#ec4899" />
      <meta name="msapplication-TileColor" content="#ec4899" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Loja de Joias",
            "description": description,
            "url": url,
            "logo": `${url}/logo.png`,
            "image": image,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BR",
              "addressLocality": "São Paulo"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+55-11-99999-9999",
              "contactType": "customer service",
              "availableLanguage": "Portuguese"
            },
            "sameAs": [
              "https://instagram.com/loja-joias",
              "https://facebook.com/loja-joias"
            ]
          })
        }}
      />
    </Head>
  )
}
