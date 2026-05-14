import { motion } from 'framer-motion';
import { ShieldCheck, BadgeCheck, Stethoscope, Award } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../../lib/animations';

const ITEMS = [
  { icon: ShieldCheck, title: 'Bioseguridad ISO', desc: 'Cumplimos estándares internacionales de calidad y bioseguridad.' },
  { icon: Stethoscope, title: 'Patólogo Clínico', desc: 'Resultados validados por nuestro Médico Patólogo Clínico.' },
  { icon: BadgeCheck, title: 'Equipos automatizados', desc: 'Tecnología de última generación para mayor precisión.' },
  { icon: Award, title: 'Atención humana', desc: 'Más de 15 años cuidando la salud de nuestros pacientes.' },
];

export default function TrustBadges() {
  return (
    <section className="container-x py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="badge bg-brand-50 text-brand mb-3">¿Por qué Confialab?</span>
        <h2 className="section-title">Calidad que puedes confiar</h2>
      </div>
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {ITEMS.map((it) => {
          const Icon = it.icon;
          return (
            <motion.div
              key={it.title}
              variants={fadeInUp}
              className="text-center p-6 rounded-2xl border border-soft hover:border-brand-200 hover:shadow-card transition"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-brand to-accent text-white flex items-center justify-center mb-4 shadow-card">
                <Icon size={26} />
              </div>
              <h3 className="font-display font-bold text-ink mb-2">{it.title}</h3>
              <p className="text-muted text-sm">{it.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
