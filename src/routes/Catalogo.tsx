import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import Page from '../components/ui/Page';
import TestCard from '../components/catalogo/TestCard';
import QuickViewModal from '../components/catalogo/QuickViewModal';
import examenesData from '../data/examenes.json';
import type { Examen, Categoria, TipoServicio } from '../types';
import { useSearch } from '../hooks/useSearch';
import { staggerContainer } from '../lib/animations';

const CATEGORIAS: { v: Categoria | 'todas'; label: string }[] = [
  { v: 'todas', label: 'Todas' },
  { v: 'hematologia', label: 'Hematología' },
  { v: 'bioquimica', label: 'Bioquímica' },
  { v: 'hormonal', label: 'Hormonal' },
  { v: 'inmunologia', label: 'Inmunología' },
  { v: 'microbiologia', label: 'Microbiología' },
  { v: 'parasitologia', label: 'Parasitología' },
  { v: 'toxicologia', label: 'Toxicología' },
  { v: 'genetica', label: 'Genética' },
  { v: 'vacuna', label: 'Vacunación' },
];

const TIPOS: { v: TipoServicio | 'todos'; label: string }[] = [
  { v: 'todos', label: 'Todos' },
  { v: 'analisis', label: 'Análisis' },
  { v: 'vacuna', label: 'Vacuna' },
];

const SORTS = [
  { v: 'relevancia', label: 'Relevancia' },
  { v: 'nombre', label: 'Nombre A-Z' },
  { v: 'precio-asc', label: 'Precio menor' },
  { v: 'precio-desc', label: 'Precio mayor' },
];

export default function Catalogo() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [cat, setCat] = useState<string>(params.get('cat') ?? 'todas');
  const [tipo, setTipo] = useState<string>(params.get('tipo') ?? 'todos');
  const [sort, setSort] = useState<string>('relevancia');
  const [openFilters, setOpenFilters] = useState(false);
  const [quick, setQuick] = useState<Examen | null>(null);

  // Sync URL params
  useEffect(() => {
    const next: Record<string, string> = {};
    if (q) next.q = q;
    if (cat !== 'todas') next.cat = cat;
    if (tipo !== 'todos') next.tipo = tipo;
    setParams(next, { replace: true });
  }, [q, cat, tipo, setParams]);

  const data = examenesData as Examen[];
  const searched = useSearch(data, q);

  const filtered = useMemo(() => {
    let r = searched;
    if (cat !== 'todas') r = r.filter((e) => e.categoria === cat);
    if (tipo !== 'todos') r = r.filter((e) => e.tipo === tipo);
    if (sort === 'nombre') r = [...r].sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (sort === 'precio-asc') r = [...r].sort((a, b) => a.precio - b.precio);
    if (sort === 'precio-desc') r = [...r].sort((a, b) => b.precio - a.precio);
    return r;
  }, [searched, cat, tipo, sort]);

  return (
    <Page
      title="Catálogo de exámenes — Confialab"
      description="Más de 1000 exámenes clínicos con precios públicos. Busca, filtra y cotiza online."
    >
      {/* Header */}
      <section className="bg-soft-gradient border-b border-soft">
        <div className="container-x py-12">
          <span className="badge bg-brand-50 text-brand mb-3">Catálogo</span>
          <h1 className="section-title">Encuentra tu examen</h1>
          <p className="section-subtitle">
            Explora nuestro catálogo completo, conoce el precio y las condiciones de cada análisis.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por nombre, código o palabra clave…"
                className="input !pl-11 !py-3.5"
              />
              {q && (
                <button
                  onClick={() => setQ('')}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-soft text-muted"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={() => setOpenFilters((v) => !v)}
              className="btn-outline sm:hidden"
            >
              <SlidersHorizontal size={18} /> Filtros
            </button>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-x py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className={`${openFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Tipo
            </div>
            <div className="flex flex-wrap gap-2">
              {TIPOS.map((t) => (
                <button
                  key={t.v}
                  onClick={() => setTipo(t.v)}
                  className={`chip ${tipo === t.v ? 'chip-active' : ''}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Categoría
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS.map((c) => (
                <button
                  key={c.v}
                  onClick={() => setCat(c.v)}
                  className={`chip ${cat === c.v ? 'chip-active' : ''}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Ordenar
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input !py-2.5"
            >
              {SORTS.map((s) => (
                <option key={s.v} value={s.v}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="text-sm text-muted">
              <span className="font-semibold text-ink">{filtered.length}</span> exámenes
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-muted">No encontramos exámenes con esos criterios.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer(0.04)}
              initial="hidden"
              animate="show"
              className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {filtered.map((ex) => (
                <TestCard key={ex.codigo} examen={ex} onQuickView={setQuick} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <QuickViewModal examen={quick} onClose={() => setQuick(null)} />
    </Page>
  );
}
