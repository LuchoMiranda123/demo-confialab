import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuoteItem } from '../types';

interface QuoteState {
  items: QuoteItem[];
  add: (item: QuoteItem) => void;
  remove: (codigo: string) => void;
  clear: () => void;
  has: (codigo: string) => boolean;
  count: () => number;
  subtotal: () => number;
  descuento: () => number;
  total: () => number;
}

const DESCUENTO_PORC = 0.1; // 10% si hay 3 o más

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) =>
          s.items.find((i) => i.codigo === item.codigo) ? s : { items: [...s.items, item] }
        ),
      remove: (codigo) => set((s) => ({ items: s.items.filter((i) => i.codigo !== codigo) })),
      clear: () => set({ items: [] }),
      has: (codigo) => !!get().items.find((i) => i.codigo === codigo),
      count: () => get().items.length,
      subtotal: () => get().items.reduce((acc, i) => acc + i.precio, 0),
      descuento: () => {
        const items = get().items;
        if (items.length < 3) return 0;
        return items.reduce((a, i) => a + i.precio, 0) * DESCUENTO_PORC;
      },
      total: () => {
        const sub = get().subtotal();
        const desc = get().descuento();
        return Math.max(0, sub - desc);
      },
    }),
    { name: 'confialab-quote' }
  )
);
