'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCartStore, useAuthStore } from '@/store';
import { ShoppingBag, User, Menu, X, Facebook } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-black text-white text-center py-2 text-xs sm:text-sm tracking-wider px-4">
        <span className="hidden sm:inline">FREE SHIPPING ON ORDERS OVER $500</span>
        <span className="sm:hidden">FREE SHIPPING $500+</span>
        <span className="mx-2 sm:mx-4">|</span>
        <a href="https://www.facebook.com/profile.php?id=61578321601654" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors inline-flex items-center gap-1">
          <Facebook size={14} /> <span className="hidden sm:inline">Follow us on</span> Facebook
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24 md:h-28">
          {/* Logo - Bigger, no extra white space */}
          <Link href="/" className="flex items-center -ml-2">
            <Image
              src="/images/logo.png"
              alt="Bella Bags of Boston"
              width={120}
              height={120}
              className="w-[80px] h-auto sm:w-[100px] md:w-[120px]"
              priority
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
          <div className="flex items-center space-x-3 sm:space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="text-gray-800 hover:text-pink-500 transition-colors flex items-center gap-2">
                  <User size={22} className="sm:w-6 sm:h-6" />
                  <span className="hidden md:inline">{user?.firstName}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 rounded-lg">
                  <Link href={user?.role === 'admin' ? '/admin' : '/client'} className="block px-4 py-3 hover:bg-gray-50 rounded-t-lg">
                    Dashboard
                  </Link>
                  <Link href="/track" className="block px-4 py-3 hover:bg-gray-50">
                    Track Order
                  </Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-red-600 rounded-b-lg">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/client" className="text-gray-800 hover:text-pink-500 transition-colors">
                <User size={22} className="sm:w-6 sm:h-6" />
              </Link>
            )}

            <Link href="/cart" className="text-gray-800 hover:text-pink-500 transition-colors relative">
              <ShoppingBag size={22} className="sm:w-6 sm:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-800 p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-6 py-6 space-y-1">
            <Link href="/" className="block text-gray-800 hover:text-pink-500 hover:bg-pink-50 transition-colors font-medium py-3 px-4 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/shop" className="block text-gray-800 hover:text-pink-500 hover:bg-pink-50 transition-colors font-medium py-3 px-4 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              Shop
            </Link>
            <Link href="/about" className="block text-gray-800 hover:text-pink-500 hover:bg-pink-50 transition-colors font-medium py-3 px-4 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block text-gray-800 hover:text-pink-500 hover:bg-pink-50 transition-colors font-medium py-3 px-4 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <Link href="/track" className="block text-gray-800 hover:text-pink-500 hover:bg-pink-50 transition-colors font-medium py-3 px-4 rounded-lg" onClick={() => setIsMenuOpen(false)}>
              Track Order
            </Link>
            <div className="pt-4 border-t border-gray-100 mt-4">
              <Link href="/client" className="block text-center btn-primary w-full" onClick={() => setIsMenuOpen(false)}>
                Sign In / Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
