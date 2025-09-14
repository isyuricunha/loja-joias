'use client'

import Image from 'next/image';
import { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Crown } from 'lucide-react';
import { Product, MATERIAL_TYPE_LABELS } from '@/types';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import WhatsAppButton from './WhatsAppButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const getMaterialBadge = (material: string) => {
    switch (material.toLowerCase()) {
      case 'ouro_18k':
        return 'bg-gradient-to-r from-amber-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg';
      case 'prata_925':
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium';
      case 'folheados':
        return 'bg-gradient-to-r from-rose-400 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-medium';
      case 'aco_inox':
        return 'bg-gradient-to-r from-gray-600 to-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white px-3 py-1 rounded-full text-xs font-medium';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-500 hover:scale-105 group cursor-pointer">
      {/* Premium Image Section */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-amber-50 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <>
            <img
              src={product.images[currentImageIndex]?.url || '/placeholder-jewelry.jpg'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
            />
            
            {/* Luxury Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Image Navigation Dots */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-gold-400 shadow-gold scale-125' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pearl-100 to-gold-50">
            <div className="text-center">
              <Crown className="h-12 w-12 text-pearl-400 mx-auto mb-2" />
              <span className="text-pearl-500 text-sm font-medium">Imagem em breve</span>
            </div>
          </div>
        )}

        {/* Premium Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {!product.inStock && (
            <span className="status-sold-out">
              Esgotado
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg animate-pulse">
              <Sparkles className="h-3 w-3 inline mr-1" />
              Oferta
            </span>
          )}
          {product.featured && (
            <span className="status-featured">
              <Crown className="h-3 w-3 inline mr-1" />
              Premium
            </span>
          )}
        </div>

        {/* Elegant Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
              isLiked 
                ? 'bg-rose-500 text-white shadow-lg' 
                : 'bg-white/90 text-dark-600 hover:bg-white shadow-luxury'
            }`}
          >
            <Heart className="h-4 w-4" fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2.5 bg-white/90 backdrop-blur-sm text-dark-600 rounded-xl shadow-luxury hover:shadow-luxury-lg hover:bg-white transition-all duration-300 transform hover:scale-110">
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Premium Content Section */}
      <div className="p-6">
        {/* Material Badge */}
        <div className="mb-3">
          <span className={getMaterialBadge(product.material)}>
            {MATERIAL_TYPE_LABELS[product.material]}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-display font-semibold text-dark-800 mb-3 text-lg leading-tight line-clamp-2 group-hover:text-gold-600 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Luxury Price Display */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl font-bold text-dark-800">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="flex flex-col">
              <span className="text-sm text-pearl-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs text-success-600 font-medium">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Premium WhatsApp Button */}
        <WhatsAppButton
          product={product}
          className="w-full btn-luxury group/btn"
        >
          <span className="flex items-center justify-center space-x-2">
            <span>Tenho Interesse</span>
            <Sparkles className="h-4 w-4 group-hover/btn:animate-spin" />
          </span>
        </WhatsAppButton>
      </div>
    </div>
  );
}
