# PRD - Loja Digital de Joias

## 📋 Visão Geral do Produto

### Objetivo
Criar uma loja digital de vitrine/catálogo para joias com sistema de gestão integrado, focada na apresentação visual das peças e direcionamento para WhatsApp.

### Público-Alvo
- Clientes interessados em joias (anéis, colares, brincos, pulseiras)
- Faixa etária: 18-50 anos
- Interesse em: folheados, prata 925, ouro 18k, aço inox, bijuterias

## 🎯 Funcionalidades Core

### 1. Catálogo de Produtos

**Requisitos:**
- Exibição em grid responsivo
- Filtros por categoria de material
- Sistema de busca por nome/material
- Alternância entre visualização grid/lista
- Paginação ou scroll infinito

**Campos por Produto:**
- Nome da peça
- Preço atual
- Preço original (opcional - para promoções)
- Material/tipo (folheado, prata, ouro, etc.)
- Múltiplas imagens
- Status de estoque (disponível/esgotado)
- Descrição detalhada
- Tamanhos disponíveis (quando aplicável)
- Tags/categorias
- Flag "recomendado"

### 2. Sistema de Categorias

**Categorias Principais:**
- Ouro 18k
- Prata 925
- Folheados a Ouro
- Aço Inoxidável
- Aço Inox Banhado
- Bijuterias/Liga Metálica

**Funcionalidades:**
- Contador de produtos por categoria
- Navegação rápida entre categorias
- Breadcrumb de navegação

### 3. Sistema de Recomendações

**Tipos de Recomendação:**
- Produtos em destaque (marcados manualmente)
- "Quem viu esse produto também se interessou por"
- Produtos relacionados por material/categoria
- Seção "Mais Vendidos" (baseado em métricas)

### 4. Integração WhatsApp

**Funcionalidades:**
- Botão "Tenho Interesse" em cada produto
- Mensagem pré-formatada com nome do produto
- Botão de contato geral no sidebar
- Link direto para o número da loja

## 🛠️ Stack Tecnológica Recomendada

### Opção 1: Full-Stack JavaScript (Recomendada)

**Frontend:**
- Next.js 14 (React + SSR/SSG)
- Tailwind CSS para estilização
- Framer Motion para animações suaves
- React Query/TanStack Query para cache e sincronização

**Backend:**
- Node.js com Express.js
- Prisma ORM para gerenciamento do banco
- PostgreSQL ou MySQL como banco principal
- Cloudinary ou AWS S3 para upload de imagens

**CMS/Admin Panel:**
- Next.js Admin customizado
- React Hook Form para formulários
- React Table para listagens
- React Dropzone para upload de imagens

### Opção 2: Jamstack (Mais Simples)

**Frontend:**
- Next.js 14 com Static Generation
- Tailwind CSS
- MDX ou Contentful para conteúdo

**Backend:**
- Supabase (banco + auth + storage)
- Vercel Functions para APIs simples
- Stripe para futuro e-commerce (se necessário)

### Opção 3: Low-Code (Mais Rápida)

**CMS Headless:**
- Strapi (auto-hospedado) ou Contentful
- Next.js como frontend consumindo API
- Vercel para deploy

## 🗄️ Estrutura do Banco de Dados

### Tabela: products
```sql
id (PK) - UUID/INT
name - VARCHAR(255)
description - TEXT
price - DECIMAL(10,2)
original_price - DECIMAL(10,2) [NULLABLE]
material_type - ENUM('ouro', 'prata', 'folheado', 'aco_inox', 'aco_banhado', 'bijuteria')
category_id - INT (FK)
in_stock - BOOLEAN
stock_quantity - INT
is_recommended - BOOLEAN
is_featured - BOOLEAN
slug - VARCHAR(255) [UNIQUE]
meta_title - VARCHAR(255)
meta_description - TEXT
created_at - TIMESTAMP
updated_at - TIMESTAMP
```

### Tabela: product_images
```sql
id (PK) - INT
product_id - INT (FK)
image_url - VARCHAR(500)
alt_text - VARCHAR(255)
is_primary - BOOLEAN
sort_order - INT
```

### Tabela: categories
```sql
id (PK) - INT
name - VARCHAR(100)
slug - VARCHAR(100)
description - TEXT
icon - VARCHAR(255) [NULLABLE]
sort_order - INT
is_active - BOOLEAN
```

### Tabela: product_sizes (Opcional)
```sql
id (PK) - INT
product_id - INT (FK)
size_name - VARCHAR(50) // "P", "M", "G", "14", "16", etc.
size_value - VARCHAR(50) // valor técnico se necessário
is_available - BOOLEAN
```

### Tabela: recommendations
```sql
id (PK) - INT
product_id - INT (FK)
recommended_product_id - INT (FK)
recommendation_type - ENUM('manual', 'related', 'bestseller')
created_at - TIMESTAMP
```

## 📱 Design System & UI/UX

### Paleta de Cores
```css
/* Cores Primárias */
--primary-50: #fdf2f8;   /* Rosa muito claro */
--primary-500: #ec4899;  /* Rosa médio */
--primary-600: #db2777;  /* Rosa escuro */

/* Cores Neutras */
--neutral-50: #f8fafc;   /* Quase branco */
--neutral-100: #f1f5f9;  /* Cinza claro */
--neutral-800: #1e293b;  /* Cinza escuro */
--neutral-900: #0f172a;  /* Quase preto */

/* Cores de Apoio */
--success-500: #10b981;  /* Verde para "em estoque" */
--warning-500: #f59e0b;  /* Dourado para ratings */
--error-500: #ef4444;    /* Vermelho para "esgotado" */
```

### Tipografia
```css
/* Fontes Recomendadas */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Escala */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
```

### Componentes-Chave
- ProductCard - Card individual do produto
- CategoryFilter - Filtros laterais
- SearchBar - Barra de busca
- ProductGrid - Container dos produtos
- WhatsAppButton - Botão de contato
- ImageGallery - Galeria de imagens do produto
- RecommendationSection - Seção de recomendados

## 🔧 Painel Administrativo

### Funcionalidades Essenciais

#### 1. Gestão de Produtos
- CRUD completo de produtos
- Upload múltiplo de imagens com drag & drop
- Editor WYSIWYG para descrições
- Bulk actions (ativar/desativar vários produtos)
- Filtros avançados na listagem
- Exportação para CSV/Excel

#### 2. Gestão de Categorias
- Criar/editar/remover categorias
- Definir ordem de exibição
- Associar ícones (opcional)

#### 3. Gestão de Estoque
- Controle de quantidade
- Alertas de estoque baixo
- Histórico de movimentação

#### 4. Analytics Simples
- Produtos mais visualizados
- Categorias mais acessadas
- Origem do tráfego (se possível)

### Interface do Admin
**Componentes Necessários:**
- Dashboard com métricas básicas
- Tabela de produtos com paginação
- Modal de edição rápida
- Formulário completo de produto
- Preview do produto no site

## 📊 APIs Necessárias

### API de Produtos
```typescript
// GET /api/products
// GET /api/products/:id
// POST /api/products (admin)
// PUT /api/products/:id (admin)
// DELETE /api/products/:id (admin)

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  materialType: MaterialType;
  category: Category;
  images: ProductImage[];
  inStock: boolean;
  stockQuantity: number;
  isRecommended: boolean;
  isFeatured: boolean;
  sizes?: ProductSize[];
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### API de Categorias
```typescript
// GET /api/categories
// GET /api/categories/:id/products

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  isActive: boolean;
}
```

### API de Busca
```typescript
// GET /api/search?q=termo&category=ouro&inStock=true&page=1&limit=12

interface SearchParams {
  q?: string;
  category?: string;
  materialType?: MaterialType;
  inStock?: boolean;
  priceMin?: number;
  priceMax?: number;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'price' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}
```

### API de Recomendações
```typescript
// GET /api/products/:id/recommendations

interface RecommendationResponse {
  related: Product[];
  recommended: Product[];
  bestsellers: Product[];
}
```

## 🚀 Fases de Desenvolvimento

### Fase 1 - MVP (2-3 semanas) ✅ CONCLUÍDA
- [x] Setup do projeto (Next.js + Tailwind + Banco)
- [x] Estrutura do banco de dados
- [x] CRUD básico de produtos (admin)
- [x] Listagem de produtos (frontend)
- [x] Filtros por categoria
- [x] Integração WhatsApp
- [x] Upload de imagens básico
- [x] Dashboard administrativo
- [x] Páginas de visualização e edição de produtos

### Fase 2 - Melhorias (1-2 semanas) ✅ CONCLUÍDA
- [x] Sistema de busca avançado com sugestões
- [x] Seção de recomendados e produtos em destaque
- [x] Otimização de imagens com upload drag-and-drop
- [x] Animações e micro-interações
- [x] SEO básico (meta tags, sitemap)
- [x] Mobile responsivo

### Fase 3 - Avançado (1-2 semanas)
- [ ] Analytics de produtos
- [ ] Sistema de cache
- [ ] Otimização de performance
- [ ] Testes automatizados
- [ ] Monitoramento de erros
- [ ] Backup automático

### Fase 4 - Futuro (Opcional)
- [ ] Sistema de avaliações
- [ ] Wishlist de produtos
- [ ] Newsletter/notificações
- [ ] Programa de afiliados
- [ ] Marketplace (múltiplos vendedores)

## 🔒 Considerações de Segurança

### Essenciais
- Autenticação robusta para admin (JWT + refresh tokens)
- Validação de dados em frontend e backend
- Rate limiting nas APIs públicas
- Sanitização de inputs
- HTTPS obrigatório
- Backup regular do banco

### Upload de Arquivos
- Validação de tipo e tamanho
- Escaneamento de malware
- Redimensionamento automático
- CDN para servir imagens

## 📈 Métricas de Sucesso

### KPIs Técnicos
- Page Load Speed: < 3 segundos
- Core Web Vitals: todas em "Good"
- Uptime: > 99.5%
- Error Rate: < 1%

### KPIs de Negócio
- Tempo na página: > 2 minutos
- Taxa de clique WhatsApp: > 5%
- Produtos visualizados por sessão: > 3
- Taxa de retorno: > 30%

## 🛡️ Plano de Testes

### Testes Funcionais
- [ ] CRUD de produtos funciona
- [ ] Filtros retornam resultados corretos
- [ ] Busca funciona com termos parciais
- [ ] WhatsApp abre com mensagem correta
- [ ] Upload de imagens funciona
- [ ] Responsividade em diferentes telas

### Testes de Performance
- [ ] Carregamento inicial < 3s
- [ ] Imagens otimizadas
- [ ] Cache funcionando
- [ ] Lazy loading implementado

### Testes de Usabilidade
- [ ] Navegação intuitiva
- [ ] CTAs claramente visíveis
- [ ] Feedback visual para ações
- [ ] Acessibilidade básica (WCAG)

## 📦 Deploy e DevOps

### Recomendação de Hospedagem
**Vercel + Supabase**
- Frontend na Vercel (gratis até certo limite)
- Banco PostgreSQL no Supabase (gratis 500MB)
- Images no Cloudinary (gratis 25 créditos/mês)

## 📋 Checklist Final

### Antes do Launch
- [ ] Todos os produtos cadastrados
- [ ] Imagens otimizadas e carregadas
- [ ] WhatsApp testado e funcionando
- [ ] SEO básico configurado
- [ ] Analytics instalado (Google Analytics)
- [ ] Sitemap.xml gerado
- [ ] Robots.txt configurado
- [ ] Favicon e meta tags
- [ ] Testes em diferentes navegadores
- [ ] Testes mobile
- [ ] Backup do banco configurado

### Pós-Launch
- [ ] Monitorar erros (Sentry)
- [ ] Acompanhar métricas
- [ ] Coletar feedback dos usuários
- [ ] Otimizar baseado nos dados
- [ ] Planejar próximas features

---

## Status da Fase 1 - MVP

### Verifica se tudo da Fase 1 - MVP (2-3 semanas) foi implementado:
- [x] Setup do projeto (Next.js + Tailwind + Banco)
- [x] Estrutura do banco de dados
- [ ] CRUD básico de produtos (admin)
- [x] Listagem de produtos (frontend)
- [x] Filtros por categoria
- [x] Integração WhatsApp
- [ ] Upload de imagens básico
