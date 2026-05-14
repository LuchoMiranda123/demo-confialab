import { motion } from 'framer-motion';
import { Users, FlaskConical, Calendar, MapPin } from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';
import { staggerContainer, fadeInUp } from '../../lib/animations';

const STATS = [
  { icon: Users, value: 250000, suffix: '+', label: 'Pacientes atendidos' },
  { icon: FlaskConical, value: 1000, suffix: '+', label: 'Exámenes disponibles' },
  { icon: Calendar, value: 15, suffix: '+', label: 'Años de experiencia' },
  { icon: MapPin, value: 3, suffix: '', label: 'Sedes en Lima' },
];

export default function StatsCounter() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient text-white py-20">
      <div className="absolute inset-0 dot-pattern opacity-[0.07]" />
      <div className="container-x relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-3">
            Nuestra trayectoria
          </span>
          <h2 className="section-title text-white">El respaldo que tu salud merece</h2>
          <p className="section-subtitle mx-auto !text-white/70">
            Más de una década comprometidos con tu bienestar.
          </p>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-accent text-white flex items-center justify-center mb-4 shadow-card">
                  <Icon size={22} />
                </div>
                <div className="font-display font-bold text-3xl sm:text-4xl text-white">
                  <AnimatedCounter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-white/70 text-sm mt-1">{s.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
