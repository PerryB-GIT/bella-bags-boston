'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/store';
import { ShoppingBag, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group card-elegant overflow-hidden">
      <Link href={'/shop/' + product.id}>
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-white">
            <div className="text-center p-3 sm:p-4">
              <p className="text-gray-600 font-serif text-sm sm:text-lg">{product.brand}</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2">{product.name}</p>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col gap-1 sm:gap-2">
            {product.salePrice && (
              <span className="bg-pink-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 font-semibold">
                SALE
              </span>
            )}
            {product.featured && (
              <span className="bg-black text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 font-semibold">
                FEATURED
              </span>
            )}
          </div>

          {/* Condition badge */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
            <span className="bg-white/90 text-gray-800 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 border border-gray-200">
              {product.condition}
            </span>
          </div>

          {/* Hover overlay - Hidden on touch devices, show add to cart button below instead */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-white text-black p-3 rounded-full hover:bg-pink-500 hover:text-white transition-colors"
            >
              <ShoppingBag size={20} />
            </button>
            <button className="bg-white text-black p-3 rounded-full hover:bg-pink-500 hover:text-white transition-colors">
              <Heart size={20} />
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <p className="text-gray-500 text-xs sm:text-sm tracking-wider uppercase">{product.brand}</p>
          <h3 className="font-serif text-sm sm:text-lg mt-1 group-hover:text-pink-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="mt-1 sm:mt-2 flex items-center gap-1 sm:gap-2 flex-wrap">
            {product.salePrice ? (
              <>
                <span className="text-pink-500 font-semibold text-sm sm:text-base">{formatPrice(product.salePrice)}</span>
                <span className="text-gray-400 line-through text-xs sm:text-sm">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-gray-800 font-semibold text-sm sm:text-base">{formatPrice(product.price)}</span>
            )}
          </div>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">{product.category}</p>
          
          {/* Mobile add to cart button */}
          <button
            onClick={handleAddToCart}
            className="sm:hidden w-full mt-3 py-2 bg-black text-white text-xs font-semibold tracking-wider hover:bg-pink-500 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} /> ADD TO CART
          </button>
        </div>
      </Link>
    </div>
  );
}
