'use client'

import { useState, useEffect } from 'react'
import { Package, Grid3X3, TrendingUp, Eye } from 'lucide-react'

interface DashboardStats {
  totalProducts: number
  totalCategories: number
  inStockProducts: number
  outOfStockProducts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    inStockProducts: 0,
    outOfStockProducts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard stats
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/categories').then(res => res.json()),
    ])
      .then(([productsData, categoriesData]) => {
        const products = productsData.products || []
        setStats({
          totalProducts: products.length,
          totalCategories: categoriesData.length,
          inStockProducts: products.filter((p: any) => p.inStock).length,
          outOfStockProducts: products.filter((p: any) => !p.inStock).length,
        })
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching dashboard stats:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-8 bg-neutral-200 rounded mb-2"></div>
              <div className="h-6 bg-neutral-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Dashboard</h1>
        <p className="text-neutral-600">Visão geral da sua loja de joias</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total de Produtos</p>
              <p className="text-3xl font-bold text-neutral-900">{stats.totalProducts}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Package className="text-primary-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Categorias</p>
              <p className="text-3xl font-bold text-neutral-900">{stats.totalCategories}</p>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <Grid3X3 className="text-warning-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Em Estoque</p>
              <p className="text-3xl font-bold text-success-600">{stats.inStockProducts}</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <TrendingUp className="text-success-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Esgotados</p>
              <p className="text-3xl font-bold text-error-600">{stats.outOfStockProducts}</p>
            </div>
            <div className="p-3 bg-error-100 rounded-lg">
              <Eye className="text-error-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/products/new"
            className="btn-primary text-center"
          >
            Adicionar Produto
          </a>
          <a
            href="/admin/categories/new"
            className="btn-secondary text-center"
          >
            Nova Categoria
          </a>
          <a
            href="/"
            target="_blank"
            className="btn-secondary text-center"
          >
            Visualizar Site
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Atividade Recente</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <span className="text-sm text-neutral-600">Sistema inicializado com sucesso</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            <span className="text-sm text-neutral-600">Banco de dados configurado</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
            <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
            <span className="text-sm text-neutral-600">Aguardando primeiro produto</span>
          </div>
        </div>
      </div>
    </div>
  )
}
