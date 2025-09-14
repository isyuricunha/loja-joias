'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Buscar..." }: SearchBarProps) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <Search className="h-5 w-5 text-amber-500 group-focus-within:text-amber-600 transition-colors" />
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pl-12 pr-12 bg-gray-900/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 placeholder-gray-400 text-white"
      />
      
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-amber-500 transition-all duration-300 transform hover:scale-110 z-10"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      
      {/* Elegant Focus Ring */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-focus-within:border-amber-300 transition-all duration-300 pointer-events-none"></div>
      
      {/* Subtle Shimmer Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-amber-100/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}
