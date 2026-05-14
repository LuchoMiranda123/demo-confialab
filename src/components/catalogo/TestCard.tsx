import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Check, GitCompareArrows, Eye, Clock } from 'lucide-react';
import type { Examen } from '../../types';
import { useQuoteStore } from '../../store/quoteStore';
import { useCompareStore } from '../../store/compareStore';
import { fadeInUp } from '../../lib/animations';

const TAG_LABEL: Record<string, { label: string; cls: string }> = {
  'mas-pedido': { label: 'Más pedido', cls: 'bg-accent-50 text-accent' },
  nuevo: { label: 'Nuevo', cls: 'bg-emerald-50 text-emerald-700' },
  oferta: { label: 'Oferta', cls: 'bg-amber-50 text-amber-700' },
  rapido: { label: 'Rápido', cls: 'bg-brand-50 text-brand' },
};

interface Props {
  examen: Examen;
  onQuickView?: (e: Examen) => void;
}

export default function TestCard({ examen, onQuickView }: Props) {
  const add = useQuoteStore((s) => s.add);
  const inQuote = useQuoteStore((s) => s.has(examen.codigo));
  const toggleCompare = useCompareStore((s) => s.toggle);
  const inCompare = useCompareStore((s) => s.has(examen.codigo));

  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="card p-5 flex flex-col group h-full"
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex flex-wrap gap-1">
          {examen.tags.slice(0, 2).map((t) => (
            <span key={t} className={`badge ${TAG_LABEL[t]?.cls ?? 'bg-soft text-muted'}`}>
              {TAG_LABEL[t]?.label ?? t}
            </span>
          ))}
        </div>
        <span className="text-xs text-muted font-mono">{examen.codigo}</span>
      </div>

      <Link to={`/analisis/${examen.codigo}`} className="block flex-1">
        <h3 className="font-display font-bold text-ink text-lg leading-snug group-hover:text-brand transition">
          {examen.nombre}
        </h3>
        <p className="text-muted text-sm mt-2 line-clamp-2">{examen.paraQueSimple}</p>
      </Link>

      <div className="flex items-center gap-2 mt-3 text-xs text-muted">
        <Clock size={14} />
        <span>{examen.tiempoEntrega}</span>
        <span className="mx-1">·</span>
        <span>Ayuno: {examen.preAnalitica.ayuno}</span>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-soft gap-2">
        <div>
          <div className="text-xs text-muted">Precio</div>
          <div className="font-display font-bold text-brand text-xl">
            S/ {examen.precio.toFixed(2)}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {onQuickView && (
            <button
              onClick={() => onQuickView(examen)}
              aria-label="Vista rápida"
              title="Vista rápida"
              className="p-2 rounded-full text-muted hover:bg-brand-50 hover:text-brand transition"
            >
              <Eye size={16} />
            </button>
          )}
          <button
            onClick={() => toggleCompare(examen)}
            aria-label="Comparar"
            title={inCompare ? 'Quitar de comparación' : 'Comparar'}
            className={`p-2 rounded-full transition ${
              inCompare
                ? 'bg-brand text-white'
                : 'text-muted hover:bg-brand-50 hover:text-brand'
            }`}
          >
            <GitCompareArrows size={16} />
          </button>
          <button
            onClick={() =>
              !inQuote &&
              add({
                codigo: examen.codigo,
                nombre: examen.nombre,
                precio: examen.precio,
                tipo: examen.tipo,
              })
            }
            disabled={inQuote}
            className={
              inQuote
                ? 'btn !px-3 !py-2 text-sm bg-accent-50 text-accent border border-accent/20'
                : 'btn-primary !px-3 !py-2 text-sm'
            }
          >
            {inQuote ? <Check size={16} /> : <Plus size={16} />}
            <span className="hidden sm:inline">{inQuote ? 'Agregado' : 'Cotizar'}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
