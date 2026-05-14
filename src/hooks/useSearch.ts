import { useMemo } from 'react';
import Fuse from 'fuse.js';
import type { Examen } from '../types';

export function useSearch(items: Examen[], query: string): Examen[] {
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: 'nombre', weight: 0.6 },
          { name: 'codigo', weight: 0.2 },
          { name: 'descripcion', weight: 0.1 },
          { name: 'paraQueSimple', weight: 0.1 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [items]
  );

  return useMemo(() => {
    const q = query.trim();
    if (!q) return items;
    return fuse.search(q).map((r) => r.item);
  }, [fuse, query, items]);
}
