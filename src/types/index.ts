export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  condition: 'New' | 'Like New' | 'Excellent' | 'Good' | 'Fair';
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  role: 'client' | 'admin';
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  paidAt?: string;
  createdAt: string;
}

export interface Client extends User {
  orders: Order[];
  invoices: Invoice[];
  totalSpent: number;
}
