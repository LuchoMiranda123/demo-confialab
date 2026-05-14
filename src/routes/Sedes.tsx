import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Clock, Navigation } from 'lucide-react';
import Page from '../components/ui/Page';
import sedesData from '../data/sedes.json';
import type { Sede } from '../types';
import { useSedeStatus, formatHorario } from '../hooks/useSedeStatus';
import { staggerContainer, fadeInUp } from '../lib/animations';

function SedeCard({ sede }: { sede: Sede }) {
  const status = useSedeStatus(sede);
  return (
    <motion.article variants={fadeInUp} id={sede.id} className="card overflow-hidden grid md:grid-cols-2 scroll-mt-28">
      <div className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden bg-soft">
        <img src={sede.imagen} alt={sede.nombre} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="p-6 flex flex-col">
        <div className="flex items-center justify-between gap-3 mb-2">
          <h3 className="font-display font-bold text-ink text-xl">{sede.nombre}</h3>
          <span
            className={`badge ${
              status.abierto ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status.abierto ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
            {status.abierto ? 'Abierto ahora' : 'Cerrado'}
          </span>
        </div>
        <p className="text-muted text-sm">{sede.distrito}</p>

        <div className="space-y-2.5 mt-4 text-sm">
          <div className="flex items-start gap-2 text-muted">
            <MapPin size={16} className="text-brand mt-0.5 shrink-0" />
            <span>{sede.direccion}</span>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <Phone size={16} className="text-brand shrink-0" />
            <span>{sede.telefono}</span>
          </div>
          <div className="flex items-start gap-2 text-muted">
            <Clock size={16} className="text-brand mt-0.5 shrink-0" />
            <div className="text-xs">
              <div>Lun-Vie: {formatHorario(sede.horarios.lunVie)}</div>
              <div>Sáb: {formatHorario(sede.horarios.sab)}</div>
              <div>Dom: {formatHorario(sede.horarios.dom)}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {sede.servicios.map((s) => (
            <span key={s} className="badge bg-brand-50 text-brand-700">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-soft flex flex-wrap gap-2">
          <a href={sede.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4 !py-2 text-sm">
            <Navigation size={16} /> Ver en Maps
          </a>
          <a
            href={`https://wa.me/${sede.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn !px-4 !py-2 text-sm bg-[#25D366] hover:bg-[#1FAE54] text-white"
          >
            <MessageCircle size={16} fill="white" /> WhatsApp
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Sedes() {
  const sedes = sedesData as Sede[];
  return (
    <Page title="Nuestras sedes — Confialab" description="3 sedes en Lima: Pueblo Libre, San Miguel y Magdalena.">
      <section className="bg-soft-gradient border-b border-soft">
        <div className="container-x py-12">
          <span className="badge bg-brand-50 text-brand mb-3">Nuestras sedes</span>
          <h1 className="section-title">Estamos cerca de ti</h1>
          <p className="section-subtitle">
            Encuentra la sede más cercana, conoce nuestros horarios y agenda tu visita.
          </p>
        </div>
      </section>

      <section className="container-x py-10">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6"
        >
          {sedes.map((s) => (
            <SedeCard key={s.id} sede={s} />
          ))}
        </motion.div>
      </section>
    </Page>
  );
}
