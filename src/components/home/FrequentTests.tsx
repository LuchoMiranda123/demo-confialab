import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Check, ArrowRight, Clock } from 'lucide-react';
import examenes from '../../data/examenes.json';
import type { Examen } from '../../types';
import { useQuoteStore } from '../../store/quoteStore';
import { staggerContainer, fadeInUp } from '../../lib/animations';

export default function FrequentTests() {
  const data = examenes as Examen[];
  const featured = data.filter((e) => e.tags.includes('mas-pedido')).slice(0, 6);
  const add = useQuoteStore((s) => s.add);
  const has = useQuoteStore((s) => s.has);

  return (
    <section className="bg-soft py-20">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="badge bg-brand-50 text-brand mb-3">Más solicitados</span>
            <h2 className="section-title">Análisis más pedidos</h2>
            <p className="section-subtitle">Los exámenes que más confían nuestros pacientes.</p>
          </div>
          <Link to="/catalogo" className="btn-ghost">
            Ver todo el catálogo <ArrowRight size={18} />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {featured.map((ex) => {
            const inQuote = has(ex.codigo);
            return (
              <motion.article
                key={ex.codigo}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="card p-5 flex flex-col group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="badge bg-accent-50 text-accent">Más pedido</span>
                  <span className="text-xs text-muted font-mono">{ex.codigo}</span>
                </div>
                <Link to={`/analisis/${ex.codigo}`} className="block flex-1">
                  <h3 className="font-display font-bold text-ink text-lg leading-snug group-hover:text-brand transition">
                    {ex.nombre}
                  </h3>
                  <p className="text-muted text-sm mt-2 line-clamp-2">{ex.paraQueSimple}</p>
                </Link>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted">
                  <Clock size={14} />
                  <span>{ex.tiempoEntrega}</span>
                  <span className="mx-1">·</span>
                  <span className="capitalize">Ayuno: {ex.preAnalitica.ayuno}</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-soft">
                  <div>
                    <div className="text-xs text-muted">Precio</div>
                    <div className="font-display font-bold text-brand text-xl">
                      S/ {ex.precio.toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      !inQuote &&
                      add({ codigo: ex.codigo, nombre: ex.nombre, precio: ex.precio, tipo: ex.tipo })
                    }
                    disabled={inQuote}
                    className={
                      inQuote
                        ? 'btn !px-3 !py-2 text-sm bg-accent-50 text-accent border border-accent/20'
                        : 'btn-primary !px-3 !py-2 text-sm'
                    }
                  >
                    {inQuote ? (
                      <>
                        <Check size={16} /> Agregado
                      </>
                    ) : (
                      <>
                        <Plus size={16} /> Cotizar
                      </>
                    )}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
