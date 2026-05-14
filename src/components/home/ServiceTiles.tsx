import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TestTube2, Syringe, HeartPulse, Home, Briefcase, MonitorSmartphone } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../../lib/animations';

const SERVICES = [
  {
    icon: TestTube2,
    title: 'Análisis Clínicos',
    desc: 'Más de 1000 pruebas con resultados confiables y oportunos.',
    to: '/catalogo',
    color: 'from-brand to-brand-700',
  },
  {
    icon: Syringe,
    title: 'Vacunación',
    desc: 'Influenza, fiebre amarilla, hepatitis B, VPH y más.',
    to: '/catalogo?tipo=vacuna',
    color: 'from-accent to-accent-500',
  },
  {
    icon: HeartPulse,
    title: 'Perfiles de Bienestar',
    desc: 'Paquetes preventivos pensados para ti y tu familia.',
    to: '/perfiles',
    color: 'from-brand-700 to-accent',
  },
  {
    icon: Home,
    title: 'A Domicilio',
    desc: 'Llevamos el laboratorio hasta tu casa u oficina.',
    to: '/contacto',
    color: 'from-accent-500 to-brand',
  },
  {
    icon: Briefcase,
    title: 'Ocupacional',
    desc: 'Exámenes pre-empleo y de control para empresas.',
    to: '/contacto',
    color: 'from-brand to-accent',
  },
  {
    icon: MonitorSmartphone,
    title: 'Resultados Online',
    desc: 'Consulta tus resultados desde donde estés.',
    to: 'https://confialab.com/labresultado/login.php',
    color: 'from-accent to-brand-700',
    external: true,
  },
];

export default function ServiceTiles() {
  return (
    <section className="container-x py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="badge bg-accent-50 text-accent mb-3">Nuestros servicios</span>
        <h2 className="section-title">Cuidado integral en un solo lugar</h2>
        <p className="section-subtitle mx-auto">
          Desde análisis de rutina hasta exámenes especializados, te acompañamos en cada paso de tu salud.
        </p>
      </div>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {SERVICES.map((s) => {
          const Icon = s.icon;
          const Wrapper: any = s.external ? 'a' : Link;
          const props: any = s.external
            ? { href: s.to, target: '_blank', rel: 'noopener noreferrer' }
            : { to: s.to };
          return (
            <motion.div key={s.title} variants={fadeInUp}>
              <Wrapper
                {...props}
                className="group block card p-6 hover:shadow-cardHover transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center mb-4 shadow-card group-hover:scale-110 transition`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-bold text-ink text-lg mb-2 group-hover:text-brand transition">
                  {s.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-4 text-brand text-sm font-semibold opacity-0 group-hover:opacity-100 transition">
                  Conocer más →
                </div>
              </Wrapper>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
