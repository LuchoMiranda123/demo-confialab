import { useCompareStore } from '../../store/compareStore';
import { useQuoteStore } from '../../store/quoteStore';
import Modal from '../ui/Modal';
import { Check, Plus } from 'lucide-react';

export default function CompareModal() {
  const isOpen = useCompareStore((s) => s.isOpen);
  const close = useCompareStore((s) => s.close);
  const items = useCompareStore((s) => s.items);
  const add = useQuoteStore((s) => s.add);
  const hasInQuote = useQuoteStore((s) => s.has);

  const rows: { label: string; key: string; get: (i: typeof items[number]) => string }[] = [
    { label: 'Código', key: 'codigo', get: (i) => i.codigo },
    { label: 'Categoría', key: 'cat', get: (i) => i.categoria },
    { label: 'Precio', key: 'precio', get: (i) => `S/ ${i.precio.toFixed(2)}` },
    { label: 'Tiempo de entrega', key: 'tiempo', get: (i) => i.tiempoEntrega },
    { label: 'Ayuno', key: 'ayuno', get: (i) => i.preAnalitica.ayuno },
    { label: 'Tipo de muestra', key: 'muestra', get: (i) => i.preAnalitica.muestra },
    { label: 'Volumen', key: 'vol', get: (i) => i.preAnalitica.volumen },
    { label: 'Para qué sirve', key: 'para', get: (i) => i.paraQueSimple },
  ];

  return (
    <Modal open={isOpen} onClose={close} title="Comparar exámenes" maxWidth="max-w-5xl">
      {items.length === 0 ? (
        <p className="text-muted text-center py-8">Aún no hay exámenes para comparar.</p>
      ) : (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-[640px] border-separate border-spacing-y-1">
            <thead>
              <tr>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted pb-3 w-40">
                  Característica
                </th>
                {items.map((it) => (
                  <th key={it.codigo} className="text-left pb-3">
                    <div className="font-display font-bold text-ink text-base">{it.nombre}</div>
                    <div className="text-xs text-muted font-normal mt-0.5">{it.codigo}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key}>
                  <td className="text-sm text-muted font-medium align-top py-2 pr-3">{r.label}</td>
                  {items.map((it) => (
                    <td key={it.codigo} className="text-sm text-ink align-top py-2 pr-3">
                      {r.get(it)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td></td>
                {items.map((it) => {
                  const inQuote = hasInQuote(it.codigo);
                  return (
                    <td key={it.codigo} className="pt-4">
                      <button
                        onClick={() =>
                          !inQuote &&
                          add({ codigo: it.codigo, nombre: it.nombre, precio: it.precio, tipo: it.tipo })
                        }
                        disabled={inQuote}
                        className={
                          inQuote
                            ? 'btn !px-3 !py-2 text-xs bg-accent-50 text-accent border border-accent/20'
                            : 'btn-primary !px-3 !py-2 text-xs'
                        }
                      >
                        {inQuote ? (
                          <>
                            <Check size={14} /> En cotización
                          </>
                        ) : (
                          <>
                            <Plus size={14} /> Agregar
                          </>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}
