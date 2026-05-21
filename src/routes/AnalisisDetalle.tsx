import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Check,
  Clock,
  FlaskConical,
  Thermometer,
  ListChecks,
  ChevronRight,
  AlertCircle,
  Stethoscope,
  GitCompareArrows,
  CalendarDays,
} from 'lucide-react';
import Page from '../components/ui/Page';
import TestCard from '../components/catalogo/TestCard';
import AvailabilityCalendar from '../components/analisis/AvailabilityCalendar';
import examenesData from '../data/examenes.json';
import type { Examen } from '../types';
import { useQuoteStore } from '../store/quoteStore';
import { useCompareStore } from '../store/compareStore';
import { staggerContainer, fadeInUp } from '../lib/animations';
import NotFound from './NotFound';

export default function AnalisisDetalle() {
  const { codigo } = useParams();
  const data = examenesData as Examen[];
  const examen = data.find((e) => e.codigo === codigo);
  const add = useQuoteStore((s) => s.add);
  const has = useQuoteStore((s) => s.has);
  const toggleCompare = useCompareStore((s) => s.toggle);
  const inCompare = useCompareStore((s) => s.has(examen?.codigo ?? ''));
  const [showCalendar, setShowCalendar] = useState(false);

  if (!examen) return <NotFound />;

  const inQuote = has(examen.codigo);
  const related = data
    .filter((e) => e.categoria === examen.categoria && e.codigo !== examen.codigo)
    .slice(0, 3);

  return (
    <Page
      title={`${examen.nombre} — Confialab`}
      description={examen.paraQueSimple}
    >
      {/* Breadcrumb */}
      <div className="bg-soft-gradient border-b border-soft">
        <div className="container-x py-4 text-sm text-muted flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-brand">Inicio</Link>
          <ChevronRight size={14} />
          <Link to="/catalogo" className="hover:text-brand">Catálogo</Link>
          <ChevronRight size={14} />
          <span className="text-ink font-medium truncate">{examen.nombre}</span>
        </div>
      </div>

      <section className="container-x py-10 grid lg:grid-cols-[1fr_360px] gap-10">
        {/* Main */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.header variants={fadeInUp}>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="badge bg-brand-50 text-brand font-mono">{examen.codigo}</span>
              <span className="badge bg-accent-50 text-accent capitalize">{examen.categoria}</span>
              {examen.tags.map((t) => (
                <span key={t} className="badge bg-soft text-muted capitalize">{t.replace('-', ' ')}</span>
              ))}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight">
              {examen.nombre}
            </h1>
            <p className="mt-3 text-muted text-lg">{examen.paraQueSimple}</p>
          </motion.header>

          <motion.section variants={fadeInUp} className="card p-6">
            <h2 className="font-display font-bold text-ink text-xl mb-3">Sobre este examen</h2>
            <p className="text-muted leading-relaxed">{examen.descripcion}</p>
          </motion.section>

          <motion.section variants={fadeInUp} className="card p-6">
            <div className="flex items-center gap-2 text-brand font-semibold mb-3">
              <Stethoscope size={18} /> ¿Cuándo solicitarlo?
            </div>
            <p className="text-muted leading-relaxed">{examen.cuandoPedirlo}</p>
          </motion.section>

          {/* PreanaliticaPanel */}
          <motion.section variants={fadeInUp} className="card p-6">
            <h2 className="font-display font-bold text-ink text-xl mb-4">Preparación e indicaciones</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-soft p-4">
                <div className="flex items-center gap-2 text-brand font-semibold text-sm mb-2">
                  <AlertCircle size={16} /> Ayuno requerido
                </div>
                <div className="text-ink font-display font-bold text-lg">
                  {examen.preAnalitica.ayuno}
                </div>
              </div>
              <div className="rounded-xl bg-soft p-4">
                <div className="flex items-center gap-2 text-brand font-semibold text-sm mb-2">
                  <Clock size={16} /> Tiempo de entrega
                </div>
                <div className="text-ink font-display font-bold text-lg">
                  {examen.tiempoEntrega}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-soft p-4">
              <div className="flex items-center gap-2 text-brand font-semibold text-sm mb-2">
                <ListChecks size={16} /> Condiciones
              </div>
              <ul className="text-sm text-muted space-y-1.5">
                {examen.preAnalitica.condiciones.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <Check size={14} className="text-accent mt-0.5 shrink-0" /> {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-soft p-4">
                <div className="flex items-center gap-2 text-muted text-xs">
                  <FlaskConical size={14} /> Muestra
                </div>
                <div className="mt-1 text-ink font-medium">{examen.preAnalitica.muestra}</div>
              </div>
              <div className="rounded-xl border border-soft p-4">
                <div className="text-muted text-xs">Volumen</div>
                <div className="mt-1 text-ink font-medium">{examen.preAnalitica.volumen}</div>
              </div>
              <div className="rounded-xl border border-soft p-4">
                <div className="flex items-center gap-2 text-muted text-xs">
                  <Thermometer size={14} /> Temperatura
                </div>
                <div className="mt-1 text-ink font-medium">{examen.preAnalitica.temperatura}</div>
              </div>
            </div>
          </motion.section>

          {/* Related */}
          {related.length > 0 && (
            <motion.section variants={fadeInUp}>
              <h2 className="font-display font-bold text-ink text-xl mb-4">
                Exámenes relacionados
              </h2>
              <motion.div
                variants={staggerContainer(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {related.map((r) => (
                  <TestCard key={r.codigo} examen={r} />
                ))}
              </motion.div>
            </motion.section>
          )}
        </motion.div>

        {/* PriceBox sticky */}
        <aside>
          <div className="lg:sticky lg:top-28 card p-6">
            <div className="text-xs text-muted">Precio referencial</div>
            <div className="font-display font-bold text-brand text-4xl mt-1">
              S/ {examen.precio.toFixed(2)}
            </div>
            <div className="mt-1 text-xs text-accent font-semibold">
              {examen.tiempoEntrega} · Ayuno: {examen.preAnalitica.ayuno}
            </div>

            <div className="mt-5 space-y-2">
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
                className={inQuote ? 'btn w-full bg-accent-50 text-accent border border-accent/20 px-6 py-3' : 'btn-primary w-full'}
              >
                {inQuote ? (
                  <>
                    <Check size={18} /> En cotización
                  </>
                ) : (
                  <>
                    <Plus size={18} /> Agregar a cotización
                  </>
                )}
              </button>
              <Link to="/cotizador" className="btn-outline w-full">
                Ver mi cotización
              </Link>
              <button
                onClick={() => setShowCalendar(true)}
                className="btn w-full px-6 py-3 bg-accent text-white hover:bg-accent-500 shadow-card"
              >
                <CalendarDays size={18} /> Ver disponibilidad
              </button>
              <button
                onClick={() => toggleCompare(examen)}
                className={`btn w-full px-6 py-3 ${
                  inCompare
                    ? 'bg-brand text-white'
                    : 'border border-brand-100 text-brand hover:bg-brand-50'
                }`}
              >
                <GitCompareArrows size={16} />
                {inCompare ? 'Quitar de comparación' : 'Comparar este examen'}
              </button>
            </div>

            <div className="mt-5 pt-5 border-t border-soft text-xs text-muted leading-relaxed">
              Los precios pueden variar. Para confirmación o promociones, contáctanos por WhatsApp.
            </div>
          </div>
        </aside>
      </section>

      <AvailabilityCalendar
        open={showCalendar}
        onClose={() => setShowCalendar(false)}
        examenNombre={examen.nombre}
        examenCodigo={examen.codigo}
      />
    </Page>
  );
}
