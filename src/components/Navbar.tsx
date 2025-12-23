'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCartStore, useAuthStore } from '@/store';
import { ShoppingBag, User, Menu, X, Facebook, Instagram } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-black text-white text-center py-2 text-sm tracking-wider">
        <span>FREE SHIPPING ON ORDERS OVER $500</span>
        <span className="mx-4">|</span>
        <a href="https://www.facebook.com/profile.php?id=61578321601654" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors inline-flex items-center gap-1">
          <Facebook size={14} /> Follow us on Facebook
        </a>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Bella Bags of Boston"
              width={80}
              height={80}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 hover:text-pink-500 transition-colors font-medium tracking-wide">
              Home
            </Link>
            <Link href="/shop" className="text-gray-800 hover:text-pink-500 transition-colors font-medium tracking-wide">
              Shop
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-pink-500 transition-colors font-medium tracking-wide">
              About
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-pink-500 transition-colors font-medium tracking-wide">
              Contact
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="text-gray-800 hover:text-pink-500 transition-colors flex items-center gap-2">
                  <User size={24} />
                  <span className="hidden md:inline">{user?.firstName}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href={user?.role === 'admin' ? '/admin' : '/client'} className="block px-4 py-2 hover:bg-gray-50">
                    Dashboard
                  </Link>
                  <Link href="/track" className="block px-4 py-2 hover:bg-gray-50">
                    Track Order
                  </Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/client" className="text-gray-800 hover:text-pink-500 transition-colors">
                <User size={24} />
              </Link>
            )}
            
            <Link href="/cart" className="text-gray-800 hover:text-pink-500 transition-colors relative">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <Link href="/" className="block text-gray-800 hover:text-pink-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/shop" className="block text-gray-800 hover:text-pink-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
              Shop
            </Link>
            <Link href="/about" className="block text-gray-800 hover:text-pink-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block text-gray-800 hover:text-pink-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <Link href="/track" className="block text-gray-800 hover:text-pink-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
              Track Order
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
