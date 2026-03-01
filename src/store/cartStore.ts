import { create } from 'zustand';
import { type CartItem } from '../types';

const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

interface CartStore {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  items: loadCartFromStorage(),

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity: 1 }];
      }
      
      localStorage.setItem('cart', JSON.stringify(newItems));
      
      return { items: newItems };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return { items: newItems };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(newItems));
      return { items: newItems };
    }),

  clearCart: () => {
    console.log('1. clearCart вызван');
    localStorage.setItem('cart', JSON.stringify([]));
    console.log('2. localStorage очищен:', localStorage.getItem('cart'));
    const newState = { items: [] };
    console.log('3. Возвращаем новое состояние:', newState);
    return newState;
  },
}));

export default useCartStore;