import { create } from 'zustand';
import type { CartItem } from '../types';

interface CartStore {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  items: [],
  
  addToCart: (product) => 
    set((state) => {
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          items: [...state.items, { ...product, quantity: 1 }]
        };
      }
    }),
    
  removeFromCart: (id) => 
    set((state) => ({ 
      items: state.items.filter(item => item.id !== id) 
    })),
    
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    })),
    
  clearCart: () => set({ items: [] }),
}));

export default useCartStore;