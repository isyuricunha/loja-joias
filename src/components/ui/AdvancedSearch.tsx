'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, Filter, Clock, TrendingUp } from 'lucide-react'
import { MaterialType, MATERIAL_TYPE_LABELS } from '@/types'

interface SearchSuggestion {
  id: string
  text: string
  type: 'product' | 'category' | 'material' | 'recent'
  count?: number
}

interface AdvancedSearchProps {
  value: string
  onChange: (value: string) => void
  onFiltersChange: (filters: SearchFilters) => void
  placeholder?: string
}

interface SearchFilters {
  category?: string
  materialType?: MaterialType
  priceRange?: [number, number]
  inStock?: boolean
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'popular'
}

export default function AdvancedSearch({ 
  value, 
  onChange, 
  onFiltersChange,
  placeholder = "Buscar joias..." 
}: AdvancedSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({})
  const [loading, setLoading] = useState(false)
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('jewelry-recent-searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Fetch suggestions when typing
  useEffect(() => {
    if (value.length >= 2) {
      setLoading(true)
      fetchSuggestions(value)
    } else {
      setSuggestions([])
      setLoading(false)
    }
  }, [value])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data.suggestions || [])
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (newValue: string) => {
    onChange(newValue)
    setIsOpen(newValue.length > 0 || recentSearches.length > 0)
  }

  const handleInputFocus = () => {
    setIsOpen(value.length > 0 || recentSearches.length > 0)
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onChange(suggestion.text)
    addToRecentSearches(suggestion.text)
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      addToRecentSearches(searchTerm)
      setIsOpen(false)
    }
  }

  const addToRecentSearches = (search: string) => {
    const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('jewelry-recent-searches', JSON.stringify(updated))
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('jewelry-recent-searches')
  }

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearFilters = () => {
    setFilters({})
    onFiltersChange({})
  }

  const activeFiltersCount = Object.values(filters).filter(v => v !== undefined && v !== '').length

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(value)
            }
            if (e.key === 'Escape') {
              setIsOpen(false)
              inputRef.current?.blur()
            }
          }}
          placeholder={placeholder}
          className="w-full px-4 py-4 pl-12 pr-20 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 text-gray-900 placeholder-gray-500 shadow-sm"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-4">
          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              activeFiltersCount > 0 
                ? 'bg-rose-100 text-rose-600' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Filter className="h-4 w-4" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Clear Button */}
          {value && (
            <button
              onClick={() => {
                onChange('')
                setIsOpen(false)
              }}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Filtros</h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-rose-600 hover:text-rose-700"
              >
                Limpar filtros
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Material Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material
              </label>
              <select
                value={filters.materialType || ''}
                onChange={(e) => handleFilterChange({ 
                  materialType: e.target.value as MaterialType || undefined 
                })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="">Todos os materiais</option>
                {Object.entries(MATERIAL_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                value={filters.sortBy || 'relevance'}
                onChange={(e) => handleFilterChange({ 
                  sortBy: e.target.value as SearchFilters['sortBy'] 
                })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="relevance">Relevância</option>
                <option value="price_asc">Menor preço</option>
                <option value="price_desc">Maior preço</option>
                <option value="newest">Mais recentes</option>
                <option value="popular">Mais populares</option>
              </select>
            </div>

            {/* In Stock Filter */}
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock || false}
                  onChange={(e) => handleFilterChange({ 
                    inStock: e.target.checked || undefined 
                  })}
                  className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                />
                <span className="ml-2 text-sm text-gray-700">Apenas produtos em estoque</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-96 overflow-y-auto z-40">
          {loading && (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rose-500 mx-auto"></div>
            </div>
          )}

          {!loading && suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-3 py-2">
                Sugestões
              </div>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg flex items-center gap-3"
                >
                  {suggestion.type === 'product' && <Search className="h-4 w-4 text-gray-400" />}
                  {suggestion.type === 'category' && <Filter className="h-4 w-4 text-blue-500" />}
                  {suggestion.type === 'material' && <TrendingUp className="h-4 w-4 text-green-500" />}
                  
                  <div className="flex-1">
                    <span className="text-gray-900">{suggestion.text}</span>
                    {suggestion.count && (
                      <span className="text-xs text-gray-500 ml-2">
                        ({suggestion.count} produtos)
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {!loading && suggestions.length === 0 && value.length >= 2 && (
            <div className="p-4 text-center text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Nenhuma sugestão encontrada</p>
            </div>
          )}

          {!loading && recentSearches.length > 0 && value.length === 0 && (
            <div className="p-2">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs font-medium text-gray-500">
                  Buscas recentes
                </span>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Limpar
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick({ 
                    id: `recent-${index}`, 
                    text: search, 
                    type: 'recent' 
                  })}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg flex items-center gap-3"
                >
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
