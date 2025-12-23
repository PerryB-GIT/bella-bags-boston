"use client";
import { useState } from "react";
import Link from "next/link";
import { useOrderStore } from "@/store";
import { Package, Truck, CheckCircle, Clock, Search, ArrowRight, AlertCircle } from "lucide-react";
import { Order } from "@/types";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { orders } = useOrderStore();

  const formatPrice = (price: number) => {
    return "$" + price.toFixed(2);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);

    const found = orders.find(order => order.id === orderId.trim());

    if (found) {
      setSearchedOrder(found);
      setNotFound(false);
    } else {
      setSearchedOrder(null);
      setNotFound(true);
    }
  };

  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 1;
      case 'confirmed':
        return 2;
      case 'shipped':
        return 3;
      case 'delivered':
        return 4;
      case 'cancelled':
        return 0;
      default:
        return 1;
    }
  };

  const statusSteps = [
    { label: 'Pending', icon: Clock, step: 1 },
    { label: 'Confirmed', icon: CheckCircle, step: 2 },
    { label: 'Shipped', icon: Truck, step: 3 },
    { label: 'Delivered', icon: Package, step: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 bg-gradient-to-br from-purple-100 via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-serif text-gray-900 text-center">Track Your Order</h1>
          <p className="text-gray-600 text-center mt-2">Enter your order ID to track your shipment</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <form onSubmit={handleSearch} className="card-elegant p-8 mb-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID (e.g., ORD-123456)"
                  className="input-elegant"
                  required
                />
              </div>
              <button type="submit" className="btn-primary inline-flex items-center gap-2">
                <Search size={18} />
                Track Order
              </button>
            </div>
          </form>

          {notFound && (
            <div className="card-elegant p-8 text-center border-l-4 border-red-500">
              <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
              <h2 className="text-2xl font-serif text-gray-900 mb-2">Order Not Found</h2>
              <p className="text-gray-600 mb-4">
                We could not find an order with ID: <strong>{orderId}</strong>
              </p>
              <p className="text-gray-500 text-sm">
                Please check your order ID and try again. Order IDs are sent to your email after purchase.
              </p>
            </div>
          )}

          {searchedOrder && !notFound && (
            <div className="space-y-6 animate-fade-in">
              <div className="card-elegant p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-serif text-gray-900 mb-1">Order Details</h2>
                    <p className="text-gray-500">Order ID: {searchedOrder.id}</p>
                    <p className="text-gray-500 text-sm">
                      Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-semibold text-pink-500">{formatPrice(searchedOrder.total)}</p>
                  </div>
                </div>

                {searchedOrder.status === 'cancelled' ? (
                  <div className="bg-red-50 border border-red-200 p-4 rounded mb-6">
                    <p className="text-red-700 font-semibold">This order has been cancelled</p>
                  </div>
                ) : (
                  <div className="mb-8">
                    <div className="relative">
                      <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                        <div
                          className="h-full bg-pink-500 transition-all duration-500"
                          style={{ width: getStatusStep(searchedOrder.status) * 25 + "%" }}
                        />
                      </div>
                      <div className="relative flex justify-between">
                        {statusSteps.map((step) => {
                          const Icon = step.icon;
                          const isActive = getStatusStep(searchedOrder.status) >= step.step;
                          const isCurrent = getStatusStep(searchedOrder.status) === step.step;

                          return (
                            <div key={step.label} className="flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                isActive
                                  ? 'bg-pink-500 text-white'
                                  : 'bg-gray-200 text-gray-400'
                              } ${isCurrent ? 'ring-4 ring-pink-200' : ''}`}>
                                <Icon size={20} />
                              </div>
                              <p className={`mt-2 text-xs font-semibold ${
                                isActive ? 'text-gray-900' : 'text-gray-400'
                              }`}>
                                {step.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {searchedOrder.trackingNumber && (
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded mb-6">
                    <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                    <p className="font-mono font-semibold text-gray-900">{searchedOrder.trackingNumber}</p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-serif text-lg mb-4">Shipping Address</h3>
                  <div className="text-gray-700">
                    <p>{searchedOrder.shippingAddress.street}</p>
                    <p>
                      {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} {searchedOrder.shippingAddress.zipCode}
                    </p>
                    <p>{searchedOrder.shippingAddress.country}</p>
                  </div>
                </div>
              </div>

              <div className="card-elegant p-8">
                <h3 className="font-serif text-lg mb-4">Order Items</h3>
                <div className="space-y-4">
                  {searchedOrder.items.map((item, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-white flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-400 text-xs text-center">{item.product.brand}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif">{item.product.name}</h4>
                        <p className="text-gray-500 text-sm">{item.product.brand} - {item.product.condition}</p>
                        <p className="text-gray-600 text-sm mt-1">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice((item.product.salePrice || item.product.price) * item.quantity)}</p>
                        <p className="text-gray-500 text-sm">{formatPrice(item.product.salePrice || item.product.price)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
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
