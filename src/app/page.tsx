'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Sparkles, Crown, Diamond } from 'lucide-react';
import { Product, Category, MaterialType, MATERIAL_TYPE_LABELS } from '@/types';
import ProductCard from '@/components/ui/ProductCard';
import CategoryFilter from '@/components/ui/CategoryFilter';
import SearchBar from '@/components/ui/SearchBar';
import ProductGrid from '@/components/ui/ProductGrid';
import FloatingWhatsAppButton from '@/components/ui/WhatsAppButton';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | ''>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [searchQuery, selectedCategory, selectedMaterial]);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedMaterial) params.append('material', selectedMaterial);
      
      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedMaterial('');
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleMaterialChange = (material: MaterialType) => {
    setSelectedMaterial(material === selectedMaterial ? '' : material);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Crown className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  <span className="text-gray-800">Loja de </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">Joias</span>
                </h1>
                <p className="text-xs text-gray-600 font-medium tracking-wider uppercase">
                  Elegância & Sofisticação
                </p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 relative group">
                Catálogo
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 relative group">
                Coleções
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 relative group">
                Sobre
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 relative group">
                Contato
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Luxury Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-amber-400 rounded-full"></div>
          <div className="absolute top-32 right-20 w-20 h-20 border border-amber-400 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-amber-400 rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Diamond className="h-16 w-16 text-amber-400" />
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              Descubra Joias
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">Extraordinárias</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Coleção exclusiva de semijoias em <span className="text-amber-400 font-semibold">ouro 18k</span>, 
              <span className="text-gray-300 font-semibold"> prata 925</span> e materiais premium
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Sparkles className="h-5 w-5 mr-2 inline" />
                Explorar Coleção
              </button>
              <button className="bg-white/80 backdrop-blur-sm text-gray-700 font-medium px-6 py-3 rounded-xl border border-gray-200 hover:border-amber-300 shadow-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Ver Lançamentos
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-50 to-transparent"></div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Elegant Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Search className="h-5 w-5 mr-2 text-amber-600" />
                  Buscar Produtos
                </h3>
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Digite o nome da joia..."
                />
              </div>
              
              <CategoryFilter
                categories={categories.map(cat => cat.name)}
                selectedCategory={selectedCategory}
                selectedMaterial={selectedMaterial}
                onCategoryChange={handleCategoryChange}
                onMaterialChange={handleMaterialChange}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Premium Product Grid */}
          <div className="flex-1">
            <ProductGrid
              products={products}
              loading={loading}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              selectedMaterial={selectedMaterial}
            />
          </div>
        </div>
      </main>

      <FloatingWhatsAppButton />
    </div>
  );
}
