import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import sedes from '../../data/sedes.json';
import type { Sede } from '../../types';
import { useSedeStatus, formatHorario } from '../../hooks/useSedeStatus';
import { staggerContainer, fadeInUp } from '../../lib/animations';

function SedeItem({ sede }: { sede: Sede }) {
  const status = useSedeStatus(sede);
  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -4 }} className="card p-6 group">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-display font-bold text-ink text-lg">{sede.nombre}</h3>
          <p className="text-xs text-muted">{sede.distrito}</p>
        </div>
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
          {status.abierto ? 'Abierto' : 'Cerrado'}
        </span>
      </div>
      <div className="space-y-2 text-sm text-muted">
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-brand mt-0.5 shrink-0" />
          <span>{sede.direccion}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-brand shrink-0" />
          <span>{sede.telefono}</span>
        </div>
        <div className="flex items-start gap-2">
          <Clock size={16} className="text-brand mt-0.5 shrink-0" />
          <div className="text-xs">
            <div>Lun-Vie: {formatHorario(sede.horarios.lunVie)}</div>
            <div>Sáb: {formatHorario(sede.horarios.sab)}</div>
            <div>Dom: {formatHorario(sede.horarios.dom)}</div>
          </div>
        </div>
      </div>
      <Link
        to={`/sedes#${sede.id}`}
        className="mt-4 inline-flex items-center gap-1 text-brand text-sm font-semibold opacity-80 group-hover:opacity-100"
      >
        Ver detalle <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

export default function SedesPreview() {
  const data = sedes as Sede[];
  return (
    <section className="bg-soft py-20">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="badge bg-accent-50 text-accent mb-3">Estamos cerca de ti</span>
            <h2 className="section-title">Nuestras sedes</h2>
            <p className="section-subtitle">3 sedes en Lima para atenderte de forma rápida y segura.</p>
          </div>
          <Link to="/sedes" className="btn-ghost">
            Ver todas las sedes <ArrowRight size={18} />
          </Link>
        </div>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {data.map((s) => (
            <SedeItem key={s.id} sede={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
