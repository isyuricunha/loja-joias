'use client';

import { MessageCircle, Sparkles } from 'lucide-react';
import { Product, getWhatsAppUrl } from '@/lib/utils';

interface WhatsAppButtonProps {
  product?: Product;
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppButton({ 
  product, 
  message, 
  className = "bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",
  children 
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const url = getWhatsAppUrl(product, message);
    window.open(url, '_blank');
  };

  return (
    <button onClick={handleClick} className={className}>
      {children || (
        <span className="flex items-center justify-center space-x-2">
          <MessageCircle className="h-4 w-4" />
          <span>Tenho Interesse</span>
          <Sparkles className="h-4 w-4" />
        </span>
      )}
    </button>
  );
}

interface FloatingWhatsAppButtonProps {
  message?: string;
}

export default function FloatingWhatsAppButton({ message }: FloatingWhatsAppButtonProps) {
  const handleClick = () => {
    const url = getWhatsAppUrl(undefined, message || "Olá! Gostaria de saber mais sobre as joias da sua loja. ✨");
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Floating Animation Ring */}
      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
      <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-30"></div>
      
      <button
        onClick={handleClick}
        className="relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-luxury hover:shadow-luxury-lg transition-all duration-500 transform hover:scale-110 group animate-float"
      >
        <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-dark-800 text-white text-sm rounded-xl shadow-luxury opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
          <span className="font-medium">Fale conosco no WhatsApp</span>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-800"></div>
        </div>
      </button>
    </div>
  );
}
