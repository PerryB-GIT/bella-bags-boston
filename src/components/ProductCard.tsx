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
            <div className="text-center p-4">
              <p className="text-gray-600 font-serif text-lg">{product.brand}</p>
              <p className="text-gray-400 text-sm mt-1">{product.name}</p>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.salePrice && (
              <span className="bg-pink-500 text-white text-xs px-2 py-1 font-semibold">
                SALE
              </span>
            )}
            {product.featured && (
              <span className="bg-black text-white text-xs px-2 py-1 font-semibold">
                FEATURED
              </span>
            )}
          </div>

          {/* Condition badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 text-gray-800 text-xs px-2 py-1 border border-gray-200">
              {product.condition}
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
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

        <div className="p-4">
          <p className="text-gray-500 text-sm tracking-wider uppercase">{product.brand}</p>
          <h3 className="font-serif text-lg mt-1 group-hover:text-pink-500 transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-pink-500 font-semibold">{formatPrice(product.salePrice)}</span>
                <span className="text-gray-400 line-through text-sm">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-gray-800 font-semibold">{formatPrice(product.price)}</span>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-2">{product.category}</p>
        </div>
      </Link>
    </div>
  );
}
