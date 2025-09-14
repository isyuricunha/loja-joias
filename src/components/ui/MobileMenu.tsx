'use client'

import { useState } from 'react'
import { Menu, X, Search, User, ShoppingBag, Heart } from 'lucide-react'
import Link from 'next/link'

interface MobileMenuProps {
  categories?: Array<{ id: number; name: string; slug: string }>
}

export default function MobileMenu({ categories = [] }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
        aria-label="Menu"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 bg-white z-50 md:hidden
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          safe-area-inset
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-full">
          {/* Quick Actions */}
          <div className="p-4 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/buscar"
                className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors touch-target"
                onClick={toggleMenu}
              >
                <Search className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Buscar</span>
              </Link>
              <Link
                href="/favoritos"
                className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors touch-target"
                onClick={toggleMenu}
              >
                <Heart className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Favoritos</span>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors touch-target"
                  onClick={toggleMenu}
                >
                  <span className="font-medium text-gray-900">Início</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos"
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors touch-target"
                  onClick={toggleMenu}
                >
                  <span className="font-medium text-gray-900">Todos os Produtos</span>
                </Link>
              </li>
              
              {/* Categories */}
              {categories.length > 0 && (
                <li>
                  <div className="p-3">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Categorias
                    </span>
                  </div>
                  <ul className="ml-3 space-y-1">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/categoria/${category.slug}`}
                          className="block p-2 rounded-lg hover:bg-gray-50 transition-colors touch-target"
                          onClick={toggleMenu}
                        >
                          <span className="text-gray-700">{category.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
              
              <li>
                <Link
                  href="/sobre"
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors touch-target"
                  onClick={toggleMenu}
                >
                  <span className="font-medium text-gray-900">Sobre Nós</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors touch-target"
                  onClick={toggleMenu}
                >
                  <span className="font-medium text-gray-900">Contato</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-3">
              <Link
                href="/admin"
                className="flex items-center gap-3 p-3 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors touch-target"
                onClick={toggleMenu}
              >
                <User className="w-5 h-5 text-rose-600" />
                <span className="font-medium text-rose-700">Área Admin</span>
              </Link>
              
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors touch-target"
                onClick={toggleMenu}
              >
                <ShoppingBag className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-700">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
