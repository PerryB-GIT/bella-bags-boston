"use client";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { sampleProducts } from "@/lib/data";
import { useCartStore } from "@/store";
import { ShoppingBag, Heart, ArrowLeft, Check, Truck, Shield, RotateCcw } from "lucide-react";

interface ProductDetailClientProps {
  product: Product | undefined;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCartStore();
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = sampleProducts
    .filter(p => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-pink-500">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/shop" className="text-gray-500 hover:text-pink-500">Shop</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">{product.name}</li>
          </ol>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="relative aspect-square bg-gradient-to-br from-purple-100 via-pink-50 to-white rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-gray-600 font-serif text-3xl">{product.brand}</p>
                <p className="text-gray-400 text-lg mt-2">{product.name}</p>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.salePrice && (
                  <span className="bg-pink-500 text-white text-xs px-3 py-1 font-semibold">SALE</span>
                )}
                {product.featured && (
                  <span className="bg-black text-white text-xs px-3 py-1 font-semibold">FEATURED</span>
                )}
              </div>

              <div className="absolute top-4 right-4">
                <span className="bg-white/90 text-gray-800 text-xs px-3 py-1 border border-gray-200">{product.condition}</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <p className="text-gray-500 text-sm tracking-wider uppercase">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mt-2">{product.name}</h1>

              {/* Price */}
              <div className="mt-4 flex items-center gap-3">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl text-pink-500 font-semibold">{formatPrice(product.salePrice)}</span>
                    <span className="text-xl text-gray-400 line-through">{formatPrice(product.price)}</span>
                    <span className="bg-pink-100 text-pink-600 text-sm px-2 py-1 font-medium">
                      Save {Math.round((1 - product.salePrice / product.price) * 100)}%
                    </span>
                  </>
                ) : (
                  <span className="text-3xl text-gray-900 font-semibold">{formatPrice(product.price)}</span>
                )}
              </div>

              {/* Description */}
              <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>

              {/* Details */}
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500 inline">Category:</dt>
                  <dd className="ml-2 text-gray-900 inline">{product.category}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 inline">Condition:</dt>
                  <dd className="ml-2 text-gray-900 inline">{product.condition}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 inline">Availability:</dt>
                  <dd className={"ml-2 inline " + (product.inStock ? "text-green-600" : "text-red-500")}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </dd>
                </div>
              </dl>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  aria-label={addedToCart ? "Added to cart" : "Add to cart"}
                  className={"flex-1 py-4 px-6 font-semibold text-sm tracking-wider flex items-center justify-center gap-2 transition-all " +
                    (addedToCart
                      ? "bg-green-500 text-white"
                      : product.inStock
                        ? "bg-black text-white hover:bg-pink-500"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    )}
                >
                  {addedToCart ? (
                    <><Check size={20} /> Added to Cart</>
                  ) : (
                    <><ShoppingBag size={20} /> Add to Cart</>
                  )}
                </button>
                <button
                  aria-label="Add to wishlist"
                  className="py-4 px-6 border-2 border-gray-200 hover:border-pink-500 hover:text-pink-500 transition-colors"
                >
                  <Heart size={20} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <Truck className="mx-auto text-gray-400 mb-2" size={24} aria-hidden="true" />
                  <p className="text-xs text-gray-500">Free Shipping Over $500</p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto text-gray-400 mb-2" size={24} aria-hidden="true" />
                  <p className="text-xs text-gray-500">Authenticity Guaranteed</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="mx-auto text-gray-400 mb-2" size={24} aria-hidden="true" />
                  <p className="text-xs text-gray-500">14-Day Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-white" aria-labelledby="related-products-heading">
          <div className="max-w-7xl mx-auto px-4">
            <h2 id="related-products-heading" className="text-2xl font-serif text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  href={"/shop/" + relatedProduct.id}
                  className="group card-elegant overflow-hidden"
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-white flex items-center justify-center p-4">
                    <div className="text-center">
                      <p className="text-gray-600 font-serif text-sm">{relatedProduct.brand}</p>
                      <p className="text-gray-400 text-xs mt-1">{relatedProduct.name}</p>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{relatedProduct.brand}</p>
                    <p className="text-sm font-serif mt-1 group-hover:text-pink-500 transition-colors line-clamp-1">{relatedProduct.name}</p>
                    <p className="mt-1 text-sm font-semibold">
                      {relatedProduct.salePrice ? formatPrice(relatedProduct.salePrice) : formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to shop */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link href="/shop" className="text-pink-500 hover:text-pink-600 inline-flex items-center gap-2">
            <ArrowLeft size={18} aria-hidden="true" /> Back to Shop
          </Link>
        </div>
      </section>
    </div>
  );
}
