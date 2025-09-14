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
        {/* Ultra Premium Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3 font-serif">Nossa Coleção</h2>
            <p className="text-xl text-gray-700 font-light">Descubra peças únicas criadas com materiais premium</p>
          </div>
        </div>

        {/* Premium Shimmer Loading Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl shadow-2xl overflow-hidden animate-pulse border border-amber-100/50">
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300"></div>
              <div className="p-8 space-y-6">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2"></div>
                <div className="flex justify-between items-center">
                  <div className="h-7 bg-gradient-to-r from-amber-200 to-yellow-300 rounded-xl w-1/3"></div>
                  <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-1/4"></div>
                </div>
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
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Crown className="h-20 w-20 text-amber-400 drop-shadow-lg" />
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Nenhuma joia encontrada</h3>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
          Não encontramos produtos que correspondam aos seus critérios. 
          Tente ajustar os filtros ou explore nossa coleção completa.
        </p>
        <button className="group relative bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-700 text-white font-semibold px-10 py-4 rounded-2xl shadow-2xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all duration-500 border border-amber-400/50">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="relative flex items-center">
            <Sparkles className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-lg">Ver Toda Coleção</span>
          </div>
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
