import { create } from 'zustand';
import { type Product } from '../types';

const loadFavoritesFromStorage = (): Product[] => {
  try {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

interface FavoritesStore {
  items: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  items: loadFavoritesFromStorage(),

  toggleFavorite: (product) =>
    set((state) => {
      const exists = state.items.some((item) => item.id === product.id);
      let newItems;
      
      if (exists) {
        newItems = state.items.filter((item) => item.id !== product.id);
      } else {
        newItems = [...state.items, product];
      }
      
      localStorage.setItem('favorites', JSON.stringify(newItems));
      return { items: newItems };
    }),

  isFavorite: (id) => {
    return get().items.some((item) => item.id === id);
  },

  clearFavorites: () => {
    localStorage.setItem('favorites', JSON.stringify([]));
    return { items: [] };
  },
}));

export default useFavoritesStore;