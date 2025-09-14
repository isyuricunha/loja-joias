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
    <div className="min-h-screen bg-white">
      {/* Enhanced AXELS Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo AXELS Style */}
            <div className="flex items-center">
              <h1 className="text-2xl font-light tracking-[0.3em] text-gray-900 hover:text-gray-700 transition-colors duration-300 cursor-pointer">AXELS</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-light text-sm tracking-wide transition-all duration-300 uppercase relative group">
                Categorias
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-light text-sm tracking-wide transition-all duration-300 uppercase relative group">
                Sobre
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-light text-sm tracking-wide transition-all duration-300 uppercase relative group">
                Loja
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-light text-sm tracking-wide transition-all duration-300 uppercase relative group">
                Contato
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-5">
              <Search className="h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-all duration-300 hover:scale-110" />
              <div className="w-5 h-5 border border-gray-600 rounded-full cursor-pointer hover:border-gray-900 transition-all duration-300 hover:scale-110"></div>
            </div>
          </div>
        </div>
      </header>

      {/* AXELS Hero Section - "Discover Sparkle with Style" */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          {/* Left Side - Content */}
          <div className="flex items-center justify-center px-8 lg:px-16 py-20">
            <div className="max-w-lg">
              <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight">
                DESCUBRA O BRILHO
                <br />
                <span className="italic">com Estilo</span>
              </h1>

              <p className="text-gray-600 text-lg font-light leading-relaxed mb-12 max-w-md">
                Coleção exclusiva de joias artesanais criadas com diamantes raros e metais preciosos para a perfeição absoluta.
              </p>

              <button className="group bg-gray-900 text-white px-8 py-3 font-light tracking-wide text-sm uppercase hover:bg-gray-800 transition-all duration-500 relative overflow-hidden">
                <span className="relative z-10">Comprar</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
            </div>
          </div>

          {/* Right Side - Product Image */}
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Jewelry"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500"></div>
          </div>
        </div>
      </section>

      {/* Best Seller Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-light text-gray-900">Mais Vendidos</h2>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-light tracking-wide uppercase relative group">
              Ver Todos
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Product Cards */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Diamond Drop Earrings"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                <button className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 text-xs font-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800">
                  Ver Mais
                </button>
              </div>
              <h3 className="text-gray-900 font-light mb-1 group-hover:text-gray-700 transition-colors duration-300">Brincos Gota Diamante</h3>
              <p className="text-gray-600 text-sm font-medium">R$ 2.890</p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Femme Chunky Watch"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                <button className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 text-xs font-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800">
                  Ver Mais
                </button>
              </div>
              <h3 className="text-gray-900 font-light mb-1 group-hover:text-gray-700 transition-colors duration-300">Relógio Femme Chunky</h3>
              <p className="text-gray-600 text-sm font-medium">R$ 1.450</p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Birthday Chain Bracelet"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                <button className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 text-xs font-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800">
                  Ver Mais
                </button>
              </div>
              <h3 className="text-gray-900 font-light mb-1 group-hover:text-gray-700 transition-colors duration-300">Pulseira Corrente Aniversário</h3>
              <p className="text-gray-600 text-sm font-medium">R$ 890</p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Pearl Stud Earrings"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                <button className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 text-xs font-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800">
                  Ver Mais
                </button>
              </div>
              <h3 className="text-gray-900 font-light mb-1 group-hover:text-gray-700 transition-colors duration-300">Brincos Pérola</h3>
              <p className="text-gray-600 text-sm font-medium">R$ 1.290</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live in Glamour Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
                Viva com
                <br />
                <span className="italic">Glamour</span>
              </h2>
              <p className="text-gray-600 text-lg font-light leading-relaxed mb-8">
                Descubra o glamour perfeito com nossa coleção exclusiva de joias artesanais.
              </p>
              <button className="group border border-gray-900 text-gray-900 px-8 py-3 font-light tracking-wide text-sm uppercase hover:bg-gray-900 hover:text-white transition-all duration-500 relative overflow-hidden">
                <span className="relative z-10">Comprar Agora</span>
                <div className="absolute inset-0 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="group overflow-hidden rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Luxury Collection"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="group overflow-hidden rounded-sm mt-8">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Elegant Jewelry"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section - AXELS Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Clean Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="text-lg font-light text-gray-900 mb-4">Categorias</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-gray-600 font-light">Brincos</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-gray-600 font-light">Colares</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-gray-600 font-light">Pulseiras</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-gray-600 font-light">Anéis</span>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-light text-gray-900 mb-4">Preço</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-gray-600 font-light">R$ 0 - R$ 500</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-gray-600 font-light">R$ 500 - R$ 1.000</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-gray-600 font-light">R$ 1.000 - R$ 2.000</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-gray-600 font-light">R$ 2.000+</span>
                    </div>
                  </div>
                </div>

                {/* Material */}
                <div>
                  <h3 className="text-lg font-light text-gray-900 mb-4">Material</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-gray-600 font-light">Ouro 18k</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-gray-600 font-light">Prata 925</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-gray-600 font-light">Folheado</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-light text-gray-900">Nossos Produtos</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 text-sm">Ordenar por:</span>
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option>Relevância</option>
                    <option>Menor Preço</option>
                    <option>Maior Preço</option>
                    <option>Mais Recentes</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Product Cards - AXELS Style */}
                <div className="group">
                  <div className="relative overflow-hidden mb-4 bg-gray-50">
                    <img
                      src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Brincos Gota Diamante"
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute bottom-4 left-4 bg-gray-900 text-white px-4 py-2 text-xs font-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver Mais
                    </button>
                  </div>
                  <h3 className="text-gray-900 font-light mb-1">Brincos Gota Diamante</h3>
                  <p className="text-gray-600 text-sm">R$ 2.890</p>
                </div>

                <div className="group">
                  <div className="relative overflow-hidden mb-4 bg-gray-50">
                    <img
                      src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Relógio Femme Chunky"
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute bottom-4 left-4 bg-gray-900 text-white px-4 py-2 text-xs font-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver Mais
                    </button>
                  </div>
                  <h3 className="text-gray-900 font-light mb-1">Relógio Femme Chunky</h3>
                  <p className="text-gray-600 text-sm">R$ 1.450</p>
                </div>

                <div className="group">
                  <div className="relative overflow-hidden mb-4 bg-gray-50">
                    <img
                      src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Pulseira Corrente Aniversário"
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute bottom-4 left-4 bg-gray-900 text-white px-4 py-2 text-xs font-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver Mais
                    </button>
                  </div>
                  <h3 className="text-gray-900 font-light mb-1">Pulseira Corrente Aniversário</h3>
                  <p className="text-gray-600 text-sm">R$ 890</p>
                </div>

                <div className="group">
                  <div className="relative overflow-hidden mb-4 bg-gray-50">
                    <img
                      src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Brincos Pérola"
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute bottom-4 left-4 bg-gray-900 text-white px-4 py-2 text-xs font-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver Mais
                    </button>
                  </div>
                  <h3 className="text-gray-900 font-light mb-1">Brincos Pérola</h3>
                  <p className="text-gray-600 text-sm">R$ 1.290</p>
                </div>

                <div className="group">
                  <div className="relative overflow-hidden mb-4 bg-gray-50">
                    <img
                      src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Colar Vintage"
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute bottom-4 left-4 bg-gray-900 text-white px-4 py-2 text-xs font-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver Mais
                    </button>
                  </div>
                  <h3 className="text-gray-900 font-light mb-1">Colar Vintage</h3>
                  <p className="text-gray-600 text-sm">R$ 1.890</p>
                </div>

                <div className="group">
                  <div className="relative overflow-hidden mb-4 bg-gray-50">
                    <img
                      src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Anel Diamante"
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute bottom-4 left-4 bg-gray-900 text-white px-4 py-2 text-xs font-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver Mais
                    </button>
                  </div>
                  <h3 className="text-gray-900 font-light mb-1">Anel Diamante</h3>
                  <p className="text-gray-600 text-sm">R$ 3.450</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingWhatsAppButton />
    </div>
  );
}
