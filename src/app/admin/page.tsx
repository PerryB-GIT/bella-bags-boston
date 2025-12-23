'use client';

import { useState } from 'react';
import { useAuthStore, useOrderStore } from '@/store';
import { sampleProducts, adminUsers } from '@/lib/data';
import { Product, Order } from '@/types';
import {
  Package,
  ShoppingCart,
  Users,
  FileText,
  Edit,
  Trash2,
  Plus,
  Home,
  LogOut
} from 'lucide-react';
import Link from 'next/link';

type TabType = 'inventory' | 'orders' | 'clients' | 'invoices';

const formatPrice = (value: number): string => {
  return "$" + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function AdminPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('inventory');
  const [adminName, setAdminName] = useState('');

  const { orders, updateOrderStatus } = useOrderStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const admin = adminUsers.find(
      user => user.email === email && user.password === password
    );

    if (admin) {
      setIsLoggedIn(true);
      setAdminName(admin.name);
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setAdminName('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="card-elegant p-8 w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
            <p className="text-gray-600">Bella Bags of Boston</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-elegant"
                placeholder="admin@bellabags.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-elegant"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-black">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {adminName}</p>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/" className="btn-secondary flex items-center gap-2">
                <Home size={16} />
                Home
              </Link>
              <button onClick={handleLogout} className="btn-primary flex items-center gap-2">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('inventory')}
            className={activeTab === 'inventory' ? 'btn-primary flex items-center gap-2' : 'btn-secondary flex items-center gap-2'}
          >
            <Package size={18} />
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={activeTab === 'orders' ? 'btn-primary flex items-center gap-2' : 'btn-secondary flex items-center gap-2'}
          >
            <ShoppingCart size={18} />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={activeTab === 'clients' ? 'btn-primary flex items-center gap-2' : 'btn-secondary flex items-center gap-2'}
          >
            <Users size={18} />
            Clients
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={activeTab === 'invoices' ? 'btn-primary flex items-center gap-2' : 'btn-secondary flex items-center gap-2'}
          >
            <FileText size={18} />
            Invoices
          </button>
        </div>

        <div className="card-elegant p-6">
          {activeTab === 'inventory' && <InventoryTab />}
          {activeTab === 'orders' && <OrdersTab orders={orders} updateOrderStatus={updateOrderStatus} />}
          {activeTab === 'clients' && <ClientsTab />}
          {activeTab === 'invoices' && <InvoicesTab />}
        </div>
      </div>
    </div>
  );
}

function InventoryTab() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-accent-light border border-accent">
          <p className="text-sm text-gray-700">Add Product form would go here</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold">Product</th>
              <th className="text-left py-3 px-4 font-semibold">Brand</th>
              <th className="text-left py-3 px-4 font-semibold">Category</th>
              <th className="text-left py-3 px-4 font-semibold">Price</th>
              <th className="text-left py-3 px-4 font-semibold">Condition</th>
              <th className="text-left py-3 px-4 font-semibold">Stock</th>
              <th className="text-right py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium">{product.name}</div>
                </td>
                <td className="py-3 px-4">{product.brand}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">
                  <div className="font-medium">
                    {formatPrice(product.salePrice || product.price)}
                  </div>
                  {product.salePrice && (
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 border border-gray-300">
                    {product.condition}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {product.inStock ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 border border-gray-300">
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 hover:bg-red-50 border border-red-300 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrdersTab({ orders, updateOrderStatus }: {
  orders: Order[],
  updateOrderStatus: (orderId: string, status: Order['status']) => void
}) {
  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
          <p>No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{formatPrice(order.total)}</div>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className="mt-2 input-elegant text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium mb-2">Items:</h4>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li key={item.product.id} className="flex justify-between text-sm">
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="font-medium mb-2">Shipping Address:</h4>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ClientsTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Client Management</h2>
      <div className="text-center py-12 text-gray-500">
        <Users size={48} className="mx-auto mb-4 opacity-50" />
        <p>Client management coming soon</p>
        <p className="text-sm mt-2">Track customer information, purchase history, and preferences</p>
      </div>
    </div>
  );
}

function InvoicesTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Invoice Management</h2>
      <div className="text-center py-12 text-gray-500">
        <FileText size={48} className="mx-auto mb-4 opacity-50" />
        <p>Invoice management coming soon</p>
        <p className="text-sm mt-2">Generate and track invoices for orders</p>
      </div>
    </div>
  );
}
