import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, MessageCircle, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import Page from '../components/ui/Page';
import { useQuoteStore } from '../store/quoteStore';
import { buildQuoteWhatsAppLink } from '../lib/whatsapp';
import { staggerContainer, fadeInUp } from '../lib/animations';

export default function Cotizador() {
  const items = useQuoteStore((s) => s.items);
  const remove = useQuoteStore((s) => s.remove);
  const clear = useQuoteStore((s) => s.clear);
  const subtotal = useQuoteStore((s) => s.subtotal());
  const descuento = useQuoteStore((s) => s.descuento());
  const total = useQuoteStore((s) => s.total());

  const [paciente, setPaciente] = useState({ nombre: '', documento: '', correo: '' });

  const link = buildQuoteWhatsAppLink(items, total, paciente, descuento);

  return (
    <Page
      title="Mi cotización — Confialab"
      description="Revisa los exámenes seleccionados y envía tu cotización por WhatsApp."
    >
      <section className="bg-soft-gradient border-b border-soft">
        <div className="container-x py-10">
          <span className="badge bg-brand-50 text-brand mb-3">Tu cotización</span>
          <h1 className="section-title">Solicita tu atención</h1>
          <p className="section-subtitle">
            Confirma tus datos y envíanos tu cotización por WhatsApp para reservar tu cita.
          </p>
        </div>
      </section>

      <section className="container-x py-10 grid lg:grid-cols-[1fr_380px] gap-8">
        {/* List */}
        <div>
          {items.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-soft flex items-center justify-center mb-4">
                <ShoppingBag className="text-muted" />
              </div>
              <h3 className="font-display font-bold text-ink text-xl">Tu cotización está vacía</h3>
              <p className="text-muted mt-2">Agrega exámenes desde el catálogo para empezar.</p>
              <Link to="/catalogo" className="btn-primary mt-6">
                Explorar catálogo <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <motion.ul
              variants={staggerContainer(0.05)}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              <AnimatePresence>
                {items.map((it) => (
                  <motion.li
                    key={it.codigo}
                    layout
                    variants={fadeInUp}
                    exit={{ opacity: 0, x: -20 }}
                    className="card p-4 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                      {it.codigo.slice(0, 3)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold text-ink truncate">{it.nombre}</div>
                      <div className="text-xs text-muted font-mono">{it.codigo}</div>
                    </div>
                    <div className="font-display font-bold text-brand">S/ {it.precio.toFixed(2)}</div>
                    <button
                      onClick={() => remove(it.codigo)}
                      aria-label={`Quitar ${it.nombre}`}
                      className="p-2 rounded-full text-muted hover:bg-rose-50 hover:text-rose-600 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}

          {items.length > 0 && (
            <div className="mt-4 flex justify-end">
              <button onClick={clear} className="btn-ghost text-sm">
                Vaciar cotización
              </button>
            </div>
          )}
        </div>

        {/* Summary */}
        <aside>
          <div className="lg:sticky lg:top-28 card p-6 space-y-5">
            <h3 className="font-display font-bold text-ink text-lg">Resumen</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal ({items.length} exámenes)</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>
              <AnimatePresence>
                {descuento > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-between text-accent font-semibold"
                  >
                    <span className="flex items-center gap-1">
                      <Sparkles size={14} /> Descuento (10%)
                    </span>
                    <span>- S/ {descuento.toFixed(2)}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="border-t border-soft pt-3 flex justify-between items-center">
                <span className="text-ink font-semibold">Total estimado</span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  className="font-display font-bold text-brand text-2xl"
                >
                  S/ {total.toFixed(2)}
                </motion.span>
              </div>
            </div>

            {items.length < 3 && (
              <div className="rounded-xl bg-accent-50 text-accent text-xs p-3">
                <Sparkles size={14} className="inline mr-1" />
                Agrega {3 - items.length} examen(es) más y obtén un 10% de descuento.
              </div>
            )}

            <div className="space-y-3 pt-2 border-t border-soft">
              <input
                value={paciente.nombre}
                onChange={(e) => setPaciente({ ...paciente, nombre: e.target.value })}
                className="input"
                placeholder="Nombre completo"
              />
              <input
                value={paciente.documento}
                onChange={(e) => setPaciente({ ...paciente, documento: e.target.value })}
                className="input"
                placeholder="DNI / Documento"
              />
              <input
                value={paciente.correo}
                onChange={(e) => setPaciente({ ...paciente, correo: e.target.value })}
                type="email"
                className="input"
                placeholder="Correo electrónico"
              />
            </div>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn w-full px-6 py-3 ${
                items.length === 0
                  ? 'bg-soft text-muted pointer-events-none'
                  : 'bg-[#25D366] hover:bg-[#1FAE54] text-white shadow-card'
              }`}
            >
              <MessageCircle size={18} fill="white" /> Enviar por WhatsApp
            </a>
            <p className="text-xs text-muted text-center">
              Confirmaremos tu cita y los precios al recibir tu mensaje.
            </p>
          </div>
        </aside>
      </section>
    </Page>
  );
}
