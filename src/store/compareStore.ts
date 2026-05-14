import { create } from 'zustand';
import type { Examen } from '../types';

interface CompareState {
  items: Examen[];
  isOpen: boolean;
  toggle: (examen: Examen) => void;
  remove: (codigo: string) => void;
  clear: () => void;
  has: (codigo: string) => boolean;
  open: () => void;
  close: () => void;
}

const MAX_ITEMS = 3;

export const useCompareStore = create<CompareState>((set, get) => ({
  items: [],
  isOpen: false,
  toggle: (examen) =>
    set((s) => {
      if (s.items.find((i) => i.codigo === examen.codigo)) {
        return { items: s.items.filter((i) => i.codigo !== examen.codigo) };
      }
      if (s.items.length >= MAX_ITEMS) return s;
      return { items: [...s.items, examen] };
    }),
  remove: (codigo) => set((s) => ({ items: s.items.filter((i) => i.codigo !== codigo) })),
  clear: () => set({ items: [], isOpen: false }),
  has: (codigo) => !!get().items.find((i) => i.codigo === codigo),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
