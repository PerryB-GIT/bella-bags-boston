"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuthStore, useOrderStore } from "@/store";
import { User, Package, LogOut, ArrowRight } from "lucide-react";

export default function ClientPortal() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  const { orders } = useOrderStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ id: Date.now().toString(), email, firstName: firstName || email.split("@")[0], lastName: lastName || "", role: "client", createdAt: new Date().toISOString() });
  };

  const userOrders = orders.filter(o => o.userId === user?.id || o.userId === "guest");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="card-elegant p-8">
            <h1 className="text-2xl font-serif text-center mb-6">{isRegister ? "Create Account" : "Client Login"}</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              {isRegister && (
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="input-elegant" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <input type="text" placeholder="Last Name" className="input-elegant" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              )}
              <input type="email" placeholder="Email" required className="input-elegant" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" required className="input-elegant" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="btn-primary w-full">{isRegister ? "Create Account" : "Login"}</button>
            </form>
            <p className="text-center mt-4 text-gray-600">
              {isRegister ? "Already have an account? " : "New customer? "}
              <button onClick={() => setIsRegister(!isRegister)} className="text-pink-500 hover:underline">{isRegister ? "Login" : "Create Account"}</button>
            </p>
            <div className="mt-6 pt-6 border-t"><Link href="/admin" className="text-sm text-gray-500 hover:text-pink-500 block text-center">Admin Login</Link></div>
          </div>
          <div className="text-center mt-8"><Link href="/" className="text-pink-500 hover:text-pink-600 inline-flex items-center gap-2"><ArrowRight className="rotate-180" size={18} /> Back to Home</Link></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 bg-gradient-to-br from-purple-100 via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4"><h1 className="text-4xl font-serif text-gray-900 text-center">My Account</h1><p className="text-center text-gray-600 mt-2">Welcome back, {user?.firstName}!</p></div>
      </section>
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <aside className="space-y-2">
              <button onClick={() => setActiveTab("orders")} className={"w-full text-left px-4 py-3 rounded flex items-center gap-3 " + (activeTab === "orders" ? "bg-pink-500 text-white" : "hover:bg-gray-100")}><Package size={20} /> My Orders</button>
              <button onClick={() => setActiveTab("profile")} className={"w-full text-left px-4 py-3 rounded flex items-center gap-3 " + (activeTab === "profile" ? "bg-pink-500 text-white" : "hover:bg-gray-100")}><User size={20} /> Profile</button>
              <button onClick={logout} className="w-full text-left px-4 py-3 rounded flex items-center gap-3 text-red-500 hover:bg-red-50"><LogOut size={20} /> Logout</button>
            </aside>
            <div className="md:col-span-3">
              {activeTab === "orders" && (
                <div className="card-elegant p-6">
                  <h2 className="text-xl font-serif mb-4">Order History</h2>
                  {userOrders.length === 0 ? (
                    <p className="text-gray-500">No orders yet. <Link href="/shop" className="text-pink-500">Start shopping</Link></p>
                  ) : (
                    <div className="space-y-4">
                      {userOrders.map(order => (
                        <div key={order.id} className="border p-4 rounded">
                          <div className="flex justify-between mb-2"><span className="font-semibold">Order #{order.id}</span><span className={"px-2 py-1 rounded text-xs " + (order.status === "delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>{order.status}</span></div>
                          <p className="text-sm text-gray-500">Tracking: {order.trackingNumber}</p>
                          <p className="text-sm text-gray-500">{order.items.length} items - {"$"}{order.total}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeTab === "profile" && (
                <div className="card-elegant p-6">
                  <h2 className="text-xl font-serif mb-4">Profile</h2>
                  <div className="space-y-4">
                    <div><label className="text-sm text-gray-500">Name</label><p>{user?.firstName} {user?.lastName}</p></div>
                    <div><label className="text-sm text-gray-500">Email</label><p>{user?.email}</p></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 bg-gray-100"><div className="max-w-7xl mx-auto px-4 text-center"><Link href="/" className="text-pink-500 hover:text-pink-600 inline-flex items-center gap-2"><ArrowRight className="rotate-180" size={18} /> Back to Home</Link></div></section>
    </div>
  );
}
