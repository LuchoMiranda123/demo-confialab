import { Link } from 'react-router-dom';
import { Plus, Check, Clock, FlaskConical, Thermometer, ListChecks } from 'lucide-react';
import type { Examen } from '../../types';
import Modal from '../ui/Modal';
import { useQuoteStore } from '../../store/quoteStore';

interface Props {
  examen: Examen | null;
  onClose: () => void;
}

export default function QuickViewModal({ examen, onClose }: Props) {
  const add = useQuoteStore((s) => s.add);
  const has = useQuoteStore((s) => s.has);
  if (!examen) return null;
  const inQuote = has(examen.codigo);

  return (
    <Modal open={!!examen} onClose={onClose} title={examen.nombre} maxWidth="max-w-3xl">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="badge bg-brand-50 text-brand font-mono">{examen.codigo}</span>
          <span className="badge bg-accent-50 text-accent capitalize">{examen.categoria}</span>
          <span className="badge bg-soft text-muted">
            <Clock size={12} /> {examen.tiempoEntrega}
          </span>
        </div>

        <p className="text-muted leading-relaxed">{examen.descripcion}</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-soft p-4">
            <div className="flex items-center gap-2 text-brand font-semibold text-sm">
              <ListChecks size={16} /> Indicaciones
            </div>
            <ul className="mt-2 text-sm text-muted space-y-1 list-disc list-inside">
              <li>Ayuno: {examen.preAnalitica.ayuno}</li>
              {examen.preAnalitica.condiciones.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-soft p-4">
            <div className="flex items-center gap-2 text-brand font-semibold text-sm">
              <FlaskConical size={16} /> Muestra
            </div>
            <div className="mt-2 text-sm text-muted space-y-1">
              <div>Tipo: {examen.preAnalitica.muestra}</div>
              <div>Volumen: {examen.preAnalitica.volumen}</div>
              <div className="flex items-center gap-1">
                <Thermometer size={12} /> {examen.preAnalitica.temperatura}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-soft">
          <div>
            <div className="text-xs text-muted">Precio</div>
            <div className="font-display font-bold text-brand text-2xl">
              S/ {examen.precio.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/analisis/${examen.codigo}`} className="btn-outline !px-4 !py-2 text-sm" onClick={onClose}>
              Ver ficha completa
            </Link>
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
                  ? 'btn !px-4 !py-2 text-sm bg-accent-50 text-accent border border-accent/20'
                  : 'btn-primary !px-4 !py-2 text-sm'
              }
            >
              {inQuote ? <Check size={16} /> : <Plus size={16} />}
              {inQuote ? 'En cotización' : 'Agregar a cotización'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
