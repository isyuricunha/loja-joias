# Loja Digital de Joias

Uma loja digital de vitrine/catálogo para joias com sistema de gestão integrado, focada na apresentação visual das peças e direcionamento para WhatsApp.

## 🚀 Funcionalidades

### Frontend (Catálogo)
- ✅ Catálogo de produtos com grid responsivo
- ✅ Sistema de filtros por categoria e material
- ✅ Busca por nome/descrição
- ✅ Integração WhatsApp para cada produto
- ✅ Design system com cores da marca
- ✅ Layout responsivo para mobile/desktop

### Admin Panel
- ✅ Dashboard com métricas básicas
- ✅ CRUD completo de produtos
- ✅ Upload de múltiplas imagens
- ✅ Gestão de categorias
- ✅ Controle de estoque
- ✅ Sistema de tamanhos
- ✅ Configurações SEO

## 🛠️ Stack Tecnológica

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL + Prisma ORM
- **UI Components**: Lucide React, React Hook Form
- **Animations**: Framer Motion
- **State Management**: React Query/TanStack Query

## 📋 Pré-requisitos

- Node.js 18+ 
- pnpm (recomendado)
- PostgreSQL database

## 🔧 Configuração

1. **Clone o repositório**
```bash
git clone <repository-url>
cd loja-joias
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configure o banco de dados**
```bash
# Configure a DATABASE_URL no arquivo .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/loja_joias"

# Execute as migrações
pnpm db:push

# (Opcional) Abra o Prisma Studio
pnpm db:studio
```

4. **Configure as variáveis de ambiente**
Edite o arquivo `.env.local`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/loja_joias"

# WhatsApp
WHATSAPP_NUMBER="5511999999999"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

5. **Execute o projeto**
```bash
pnpm dev
```

Acesse:
- **Site público**: http://localhost:3000
- **Admin panel**: http://localhost:3000/admin

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── admin/           # Painel administrativo
│   ├── api/             # API routes
│   └── page.tsx         # Página principal
├── components/
│   └── ui/              # Componentes reutilizáveis
├── lib/
│   ├── db.ts           # Cliente Prisma
│   └── utils.ts        # Funções utilitárias
└── types/
    └── index.ts        # Tipos TypeScript
```

## 🗄️ Banco de Dados

### Modelos Principais:
- **Product**: Produtos com preço, material, estoque
- **Category**: Categorias de produtos
- **ProductImage**: Múltiplas imagens por produto
- **ProductSize**: Tamanhos disponíveis
- **Recommendation**: Sistema de recomendações

### Materiais Suportados:
- Ouro 18k
- Prata 925
- Folheados a Ouro
- Aço Inoxidável
- Aço Inox Banhado
- Bijuterias/Liga Metálica

## 📱 WhatsApp Integration

Cada produto possui um botão "Tenho Interesse" que:
- Abre o WhatsApp com mensagem pré-formatada
- Inclui nome do produto, preço e material
- Usa o número configurado em `WHATSAPP_NUMBER`

## 🎨 Design System

### Cores:
- **Primary**: Rosa (#ec4899, #db2777)
- **Neutral**: Cinzas para texto e backgrounds
- **Success**: Verde para "em estoque"
- **Error**: Vermelho para "esgotado"

### Tipografia:
- **Font**: Inter (Google Fonts)
- **Escala**: xs (12px) até 3xl (30px)

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Iniciar produção
pnpm start

# Linting
pnpm lint

# Database
pnpm db:generate    # Gerar cliente Prisma
pnpm db:push        # Push schema para DB
pnpm db:migrate     # Criar migração
pnpm db:studio      # Abrir Prisma Studio
```

## 📈 Próximos Passos (Fase 2)

- [ ] Sistema de busca avançado
- [ ] Seção de produtos recomendados
- [ ] Otimização de imagens
- [ ] Animações e micro-interações
- [ ] SEO básico (meta tags, sitemap)
- [ ] Melhorias de responsividade

## 🔒 Segurança

- Validação de dados no frontend e backend
- Sanitização de inputs
- Rate limiting nas APIs (a implementar)
- HTTPS obrigatório em produção

## 📄 Licença

Este projeto está sob a licença MIT.
