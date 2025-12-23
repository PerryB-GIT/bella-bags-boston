"use client";
import Link from "next/link";
import { useCartStore } from "@/store";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-3xl font-serif text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you have not added any bags to your cart yet.</p>
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2">Continue Shopping <ArrowRight size={18} /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 bg-gradient-to-br from-purple-100 via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-serif text-gray-900 text-center">Shopping Cart</h1>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="card-elegant p-6 flex gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-white flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-400 text-xs text-center">{item.product.brand}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg">{item.product.name}</h3>
                    <p className="text-gray-500 text-sm">{item.product.brand} - {item.product.condition}</p>
                    <p className="text-pink-500 font-semibold mt-2">{formatPrice(item.product.salePrice || item.product.price)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => removeItem(item.product.id)} className="text-red-500 hover:text-red-600">
                      <Trash2 size={20} />
                    </button>
                    <div className="flex items-center gap-2 border border-gray-200">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 hover:bg-gray-100"><Minus size={16} /></button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 hover:bg-gray-100"><Plus size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-red-500 hover:text-red-600 text-sm">Clear Cart</button>
            </div>

            <div className="lg:col-span-1">
              <div className="card-elegant p-6 sticky top-24">
                <h2 className="text-xl font-serif mb-4">Order Summary</h2>
                <div className="space-y-2 border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>{formatPrice(total())}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span>{total() >= 500 ? "FREE" : formatPrice(25)}</span></div>
                </div>
                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>Total</span>
                  <span>{formatPrice(total() + (total() >= 500 ? 0 : 25))}</span>
                </div>
                <Link href="/checkout" className="btn-primary w-full text-center block">Proceed to Checkout</Link>
                <Link href="/shop" className="btn-secondary w-full text-center block mt-4">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link href="/" className="text-pink-500 hover:text-pink-600 inline-flex items-center gap-2">
            <ArrowRight className="rotate-180" size={18} /> Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
