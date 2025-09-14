'use client';

import { Grid, List, Package, Sparkles, Crown } from 'lucide-react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export default function ProductGrid({ products, loading, viewMode, onViewModeChange }: ProductGridProps) {
  if (loading) {
    return (
      <div className="space-y-8">
        {/* View Mode Toggle Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-7 bg-gradient-to-r from-pearl-200 to-gold-100 rounded-lg w-48 animate-shimmer"></div>
            <div className="h-4 bg-pearl-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="flex space-x-3">
            <div className="h-12 w-12 bg-pearl-200 rounded-xl animate-pulse"></div>
            <div className="h-12 w-12 bg-pearl-200 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="card-product animate-pulse">
              <div className="aspect-square bg-gradient-to-br from-pearl-200 to-gold-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-pearl-200 rounded-full w-20"></div>
                <div className="h-5 bg-pearl-200 rounded w-3/4"></div>
                <div className="h-8 bg-pearl-200 rounded w-1/2"></div>
                <div className="h-12 bg-gradient-to-r from-pearl-200 to-gold-100 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-gold-100 to-pearl-100 rounded-full animate-float"></div>
          </div>
          <div className="relative">
            <Crown className="h-20 w-20 text-gold-400 mx-auto animate-float" />
          </div>
        </div>
        
        <h3 className="text-2xl font-display font-bold text-dark-800 mb-3">
          Nenhuma joia encontrada
        </h3>
        <p className="text-pearl-600 text-lg mb-8 max-w-md mx-auto">
          Não encontramos produtos que correspondam aos seus critérios. 
          Tente ajustar os filtros ou explore nossa coleção completa.
        </p>
        
        <button className="btn-luxury group">
          <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
          Ver Toda Coleção
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Elegant Header with View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-dark-800 mb-1">
            {products.length} joia{products.length !== 1 ? 's' : ''} encontrada{products.length !== 1 ? 's' : ''}
          </h2>
          <p className="text-pearl-600">
            Peças selecionadas especialmente para você
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-pearl-600 hidden sm:block">
            Visualização:
          </span>
          <div className="flex bg-white rounded-xl p-1 shadow-sm border border-pearl-200">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-3 rounded-lg transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-gradient-luxury text-white shadow-gold transform scale-105'
                  : 'text-pearl-500 hover:text-gold-600 hover:bg-gold-50'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-3 rounded-lg transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-gradient-luxury text-white shadow-gold transform scale-105'
                  : 'text-pearl-500 hover:text-gold-600 hover:bg-gold-50'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Premium Products Grid */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
          : 'space-y-6'
      }>
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
