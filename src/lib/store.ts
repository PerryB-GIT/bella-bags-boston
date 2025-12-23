import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';
import { sampleProducts } from './data';

interface ProductStore {
  products: Product[];
  initializeProducts: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      initializeProducts: () => {
        set((state) => {
          // Only initialize if products are empty
          if (state.products.length === 0) {
            return { products: sampleProducts };
          }
          return state;
        });
      },
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
    }),
    {
      name: 'product-storage',
    }
  )
);
