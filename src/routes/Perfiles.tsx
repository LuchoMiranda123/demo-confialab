import { motion } from 'framer-motion';
import { Check, Plus, Sparkles } from 'lucide-react';
import Page from '../components/ui/Page';
import perfilesData from '../data/perfiles.json';
import examenesData from '../data/examenes.json';
import type { Perfil, Examen } from '../types';
import { useQuoteStore } from '../store/quoteStore';
import { staggerContainer, fadeInUp } from '../lib/animations';

export default function Perfiles() {
  const perfiles = perfilesData as Perfil[];
  const examenes = examenesData as Examen[];
  const add = useQuoteStore((s) => s.add);
  const has = useQuoteStore((s) => s.has);

  const addPerfil = (p: Perfil) => {
    p.examenes.forEach((cod) => {
      const ex = examenes.find((e) => e.codigo === cod);
      if (ex && !has(ex.codigo)) {
        add({ codigo: ex.codigo, nombre: ex.nombre, precio: ex.precio, tipo: ex.tipo });
      }
    });
  };

  return (
    <Page
      title="Perfiles y paquetes — Confialab"
      description="Paquetes preventivos diseñados para distintos momentos de tu vida con precios especiales."
    >
      <section className="bg-soft-gradient border-b border-soft">
        <div className="container-x py-12">
          <span className="badge bg-accent-50 text-accent mb-3">Perfiles preventivos</span>
          <h1 className="section-title">Cuidar tu salud, más fácil</h1>
          <p className="section-subtitle">
            Paquetes diseñados por nuestro equipo médico, con precios especiales sobre el costo individual.
          </p>
        </div>
      </section>

      <section className="container-x py-12">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {perfiles.map((p) => {
            const ahorro = p.precioRegular - p.precio;
            const porc = Math.round((ahorro / p.precioRegular) * 100);
            const incluidos = p.examenes
              .map((cod) => examenes.find((e) => e.codigo === cod))
              .filter(Boolean) as Examen[];
            return (
              <motion.div
                key={p.codigo}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="card overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/9] overflow-hidden bg-soft relative">
                  <img src={p.imagen} alt={p.nombre} loading="lazy" className="w-full h-full object-cover" />
                  {ahorro > 0 && (
                    <span className="absolute top-3 right-3 badge bg-amber-500 text-white shadow-card">
                      <Sparkles size={12} /> Ahorra {porc}%
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-ink text-xl">{p.nombre}</h3>
                  <p className="text-muted text-sm mt-2">{p.descripcion}</p>

                  <div className="mt-4 space-y-1.5 flex-1">
                    {incluidos.slice(0, 5).map((ex) => (
                      <div key={ex.codigo} className="flex items-start gap-2 text-sm text-muted">
                        <Check size={14} className="text-accent mt-0.5 shrink-0" />
                        <span>{ex.nombre}</span>
                      </div>
                    ))}
                    {incluidos.length > 5 && (
                      <div className="text-xs text-muted/80">+ {incluidos.length - 5} exámenes más</div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-soft flex items-end justify-between gap-3">
                    <div>
                      {ahorro > 0 && (
                        <div className="text-xs text-muted line-through">S/ {p.precioRegular.toFixed(2)}</div>
                      )}
                      <div className="font-display font-bold text-brand text-2xl">
                        S/ {p.precio.toFixed(2)}
                      </div>
                    </div>
                    <button onClick={() => addPerfil(p)} className="btn-primary !px-4 !py-2 text-sm">
                      <Plus size={16} /> Cotizar paquete
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </Page>
  );
}
