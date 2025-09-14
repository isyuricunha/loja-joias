'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Sparkles, Crown, Gem } from 'lucide-react';
import { Category, MaterialType, MATERIAL_TYPE_LABELS } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  selectedMaterial: MaterialType | '';
  onCategoryChange: (category: string) => void;
  onMaterialChange: (material: MaterialType | '') => void;
  onClearFilters: () => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  selectedMaterial,
  onCategoryChange,
  onMaterialChange,
  onClearFilters,
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [showMaterials, setShowMaterials] = useState(true);

  const materialTypes: MaterialType[] = [
    'OURO_18K',
    'PRATA_925',
    'FOLHEADOS',
    'ACO_INOX',
    'ACO_BANHADO',
    'BIJUTERIAS',
  ];

  const getMaterialIcon = (material: MaterialType) => {
    switch (material) {
      case 'OURO_18K':
        return <Crown className="h-4 w-4 text-gold-500" />;
      case 'PRATA_925':
        return <Gem className="h-4 w-4 text-gray-400" />;
      default:
        return <Sparkles className="h-4 w-4 text-rose-400" />;
    }
  };

  const hasActiveFilters = selectedCategory || selectedMaterial;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300">
      {/* Mobile Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 text-left border-b border-gray-200/50"
        >
          <div className="flex items-center space-x-3">
            <Filter className="h-5 w-5 text-amber-600" />
            <span className="font-semibold text-gray-800">Filtros</span>
            {hasActiveFilters && (
              <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full font-medium">
                Ativos
              </span>
            )}
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block p-6 space-y-8`}>
        {/* Header for Desktop */}
        <div className="hidden lg:block">
          <h3 className="text-lg font-semibold text-dark-800 mb-2 flex items-center">
            <Filter className="h-5 w-5 mr-2 text-gold-600" />
            Filtrar Produtos
          </h3>
          <p className="text-sm text-pearl-600">
            Encontre exatamente o que procura
          </p>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-2 text-sm text-gold-600 hover:text-gold-700 transition-all duration-300 group"
          >
            <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-medium">Limpar filtros</span>
          </button>
        )}

        {/* Categories */}
        <div>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <h4 className="font-semibold text-dark-800 group-hover:text-gold-600 transition-colors">
              Categorias
            </h4>
            {showCategories ? (
              <ChevronUp className="h-4 w-4 text-pearl-400 group-hover:text-gold-500 transition-colors" />
            ) : (
              <ChevronDown className="h-4 w-4 text-pearl-400 group-hover:text-gold-500 transition-colors" />
            )}
          </button>
          
          {showCategories && (
            <div className="space-y-2">
              <button
                onClick={() => onCategoryChange('')}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  !selectedCategory
                    ? 'bg-gradient-luxury text-white shadow-gold transform scale-[1.02]'
                    : 'text-dark-700 hover:bg-gold-50 hover:text-gold-700 border border-transparent hover:border-gold-200'
                }`}
              >
                Todas as categorias
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-luxury text-white shadow-gold transform scale-[1.02]'
                      : 'text-dark-700 hover:bg-gold-50 hover:text-gold-700 border border-transparent hover:border-gold-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-pearl-100 text-pearl-600'
                    }`}>
                      {category._count?.products || 0}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Materials */}
        <div>
          <button
            onClick={() => setShowMaterials(!showMaterials)}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <h4 className="font-semibold text-dark-800 group-hover:text-gold-600 transition-colors">
              Materiais
            </h4>
            {showMaterials ? (
              <ChevronUp className="h-4 w-4 text-pearl-400 group-hover:text-gold-500 transition-colors" />
            ) : (
              <ChevronDown className="h-4 w-4 text-pearl-400 group-hover:text-gold-500 transition-colors" />
            )}
          </button>
          
          {showMaterials && (
            <div className="space-y-2">
              <button
                onClick={() => onMaterialChange('')}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  !selectedMaterial
                    ? 'bg-gradient-luxury text-white shadow-gold transform scale-[1.02]'
                    : 'text-dark-700 hover:bg-gold-50 hover:text-gold-700 border border-transparent hover:border-gold-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Todos os materiais</span>
                </div>
              </button>
              {materialTypes.map((material) => (
                <button
                  key={material}
                  onClick={() => onMaterialChange(material)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedMaterial === material
                      ? 'bg-gradient-luxury text-white shadow-gold transform scale-[1.02]'
                      : 'text-dark-700 hover:bg-gold-50 hover:text-gold-700 border border-transparent hover:border-gold-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {getMaterialIcon(material)}
                    <span>{MATERIAL_TYPE_LABELS[material]}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
