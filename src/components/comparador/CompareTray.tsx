import { motion, AnimatePresence } from 'framer-motion';
import { GitCompareArrows, X } from 'lucide-react';
import { useCompareStore } from '../../store/compareStore';

export default function CompareTray() {
  const items = useCompareStore((s) => s.items);
  const remove = useCompareStore((s) => s.remove);
  const open = useCompareStore((s) => s.open);
  const clear = useCompareStore((s) => s.clear);

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-30 sm:max-w-2xl"
        >
          <div className="card border border-brand-100 shadow-glass p-3 sm:p-4 flex items-center gap-3">
            <div className="hidden sm:flex w-10 h-10 rounded-full bg-brand-50 text-brand items-center justify-center shrink-0">
              <GitCompareArrows size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted font-medium">Comparador ({items.length}/3)</div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {items.map((it) => (
                  <span
                    key={it.codigo}
                    className="badge bg-brand-50 text-brand-700 max-w-[160px]"
                  >
                    <span className="truncate">{it.nombre}</span>
                    <button
                      onClick={() => remove(it.codigo)}
                      aria-label={`Quitar ${it.nombre}`}
                      className="hover:text-brand"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={clear} className="btn-ghost text-xs hidden sm:inline-flex">
                Limpiar
              </button>
              <button
                onClick={open}
                disabled={items.length < 2}
                className="btn-primary !px-4 !py-2 text-sm"
              >
                Comparar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
