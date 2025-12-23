import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, Order } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product) => {
        const items = get().items;
        const existingItem = items.find(item => item.product.id === product.id);
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },
      removeItem: (productId: string) => {
        set({ items: get().items.filter(item => item.product.id !== productId) });
      },
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
        } else {
          set({
            items: get().items.map(item =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          });
        }
      },
      clearCart: () => set({ items: [] }),
      total: () => {
        return get().items.reduce((sum, item) => {
          const price = item.product.salePrice || item.product.price;
          return sum + price * item.quantity;
        }, 0);
      },
    }),
    { name: 'bella-bags-cart' }
  )
);

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'bella-bags-auth' }
  )
);

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order: Order) => set({ orders: [...get().orders, order] }),
      updateOrderStatus: (orderId: string, status: Order['status']) => {
        set({
          orders: get().orders.map(order =>
            order.id === orderId ? { ...order, status, updatedAt: new Date().toISOString() } : order
          ),
        });
      },
    }),
    { name: 'bella-bags-orders' }
  )
);
