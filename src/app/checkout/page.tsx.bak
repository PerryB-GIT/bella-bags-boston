"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore, useAuthStore, useOrderStore } from "@/store";
import { ArrowRight, CreditCard, Lock, CheckCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { addOrder } = useOrderStore();
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  const [shipping, setShipping] = useState({ firstName: "", lastName: "", email: "", phone: "", street: "", city: "", state: "", zipCode: "", country: "USA" });
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "", cvv: "", nameOnCard: "" });

  const formatPrice = (price: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = uuidv4().slice(0, 8).toUpperCase();
    addOrder({ id: newOrderId, userId: user?.id || "guest", items, total: total() + (total() >= 500 ? 0 : 25), status: "confirmed", shippingAddress: shipping, trackingNumber: "BBOB" + newOrderId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    setOrderId(newOrderId);
    setOrderComplete(true);
    clearCart();
  };

  if (items.length === 0 && !orderComplete) { router.push("/cart"); return null; }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
          <h1 className="text-3xl font-serif text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">Order ID: <span className="font-semibold">{orderId}</span></p>
          <div className="space-y-4">
            <Link href={"/track?order=" + orderId} className="btn-primary block">Track Order</Link>
            <Link href="/shop" className="btn-secondary block">Continue Shopping</Link>
            <Link href="/" className="text-pink-500 block mt-4">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 bg-gradient-to-br from-purple-100 via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4"><h1 className="text-4xl font-serif text-gray-900 text-center">Checkout</h1></div>
      </section>
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="card-elegant p-6 space-y-4">
                  <h2 className="text-xl font-serif mb-4">Shipping</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" required className="input-elegant" value={shipping.firstName} onChange={(e) => setShipping({...shipping, firstName: e.target.value})} />
                    <input type="text" placeholder="Last Name" required className="input-elegant" value={shipping.lastName} onChange={(e) => setShipping({...shipping, lastName: e.target.value})} />
                  </div>
                  <input type="email" placeholder="Email" required className="input-elegant" value={shipping.email} onChange={(e) => setShipping({...shipping, email: e.target.value})} />
                  <input type="text" placeholder="Address" required className="input-elegant" value={shipping.street} onChange={(e) => setShipping({...shipping, street: e.target.value})} />
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="City" required className="input-elegant" value={shipping.city} onChange={(e) => setShipping({...shipping, city: e.target.value})} />
                    <input type="text" placeholder="State" required className="input-elegant" value={shipping.state} onChange={(e) => setShipping({...shipping, state: e.target.value})} />
                    <input type="text" placeholder="ZIP" required className="input-elegant" value={shipping.zipCode} onChange={(e) => setShipping({...shipping, zipCode: e.target.value})} />
                  </div>
                  <button type="submit" className="btn-primary w-full">Continue</button>
                </form>
              )}
              {step === 2 && (
                <form onSubmit={handlePlaceOrder} className="card-elegant p-6 space-y-4">
                  <h2 className="text-xl font-serif mb-4"><CreditCard className="inline mr-2" size={24} />Payment</h2>
                  <input type="text" placeholder="Name on Card" required className="input-elegant" value={payment.nameOnCard} onChange={(e) => setPayment({...payment, nameOnCard: e.target.value})} />
                  <input type="text" placeholder="Card Number" required className="input-elegant" value={payment.cardNumber} onChange={(e) => setPayment({...payment, cardNumber: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" required className="input-elegant" value={payment.expiry} onChange={(e) => setPayment({...payment, expiry: e.target.value})} />
                    <input type="text" placeholder="CVV" required className="input-elegant" value={payment.cvv} onChange={(e) => setPayment({...payment, cvv: e.target.value})} />
                  </div>
                  <div className="flex gap-4"><button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1">Back</button><button type="submit" className="btn-primary flex-1">Place Order</button></div>
                </form>
              )}
            </div>
            <div className="lg:col-span-1">
              <div className="card-elegant p-6 sticky top-24">
                <h2 className="text-xl font-serif mb-4">Summary</h2>
                {items.map(item => (<div key={item.product.id} className="flex justify-between text-sm mb-2"><span>{item.product.name}</span><span>{formatPrice((item.product.salePrice || item.product.price) * item.quantity)}</span></div>))}
                <div className="border-t pt-4 mt-4"><div className="flex justify-between font-semibold"><span>Total</span><span>{formatPrice(total() + (total() >= 500 ? 0 : 25))}</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
