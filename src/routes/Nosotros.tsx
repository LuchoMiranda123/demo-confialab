import { motion } from 'framer-motion';
import { Award, Microscope, HeartHandshake, Users, ShieldCheck, Stethoscope } from 'lucide-react';
import Page from '../components/ui/Page';
import { staggerContainer, fadeInUp } from '../lib/animations';

const VALORES = [
  { icon: ShieldCheck, t: 'Confianza', d: 'Cumplimos con los más altos estándares de bioseguridad y calidad.' },
  { icon: Microscope, t: 'Precisión', d: 'Equipos automatizados de última generación y controles internos estrictos.' },
  { icon: HeartHandshake, t: 'Calidez', d: 'Atención humana, cercana y comprometida con cada paciente.' },
  { icon: Users, t: 'Cercanía', d: '3 sedes en Lima y servicio a domicilio para llegar a ti.' },
];

export default function Nosotros() {
  return (
    <Page
      title="Nosotros — Confialab"
      description="Más de 15 años brindando servicios de laboratorio clínico de calidad en Lima."
    >
      {/* Hero */}
      <section className="bg-hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-[0.07]" />
        <div className="container-x py-16 lg:py-20 relative grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-3">
              Sobre nosotros
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
              Más de 15 años cuidando tu salud
            </h1>
            <p className="mt-4 text-white/80 text-lg max-w-xl">
              Confialab es un laboratorio clínico peruano comprometido con brindar resultados confiables,
              precisos y oportunos, respaldados por un equipo médico altamente calificado.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            src="https://confialab.com.pe/wp-content/uploads/2022/10/laboratorio-clinico-confialab-referencia.jpg"
            alt="Laboratorio Confialab"
            className="rounded-3xl shadow-glass aspect-[4/3] object-cover"
          />
        </div>
      </section>

      {/* Mision/Vision */}
      <section className="container-x py-16 grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-8"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand flex items-center justify-center mb-4">
            <Stethoscope size={22} />
          </div>
          <h2 className="font-display font-bold text-ink text-2xl">Misión</h2>
          <p className="text-muted mt-3 leading-relaxed">
            Brindar servicios de laboratorio clínico con altos estándares de calidad, contribuyendo
            al diagnóstico oportuno y al cuidado integral de nuestros pacientes.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          className="card p-8"
        >
          <div className="w-12 h-12 rounded-2xl bg-accent-50 text-accent flex items-center justify-center mb-4">
            <Award size={22} />
          </div>
          <h2 className="font-display font-bold text-ink text-2xl">Visión</h2>
          <p className="text-muted mt-3 leading-relaxed">
            Ser reconocidos como un laboratorio de referencia en el Perú por la calidad humana,
            precisión técnica y excelencia en el servicio.
          </p>
        </motion.div>
      </section>

      {/* Valores */}
      <section className="bg-soft py-16">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge bg-brand-50 text-brand mb-3">Nuestros valores</span>
            <h2 className="section-title">Lo que nos define</h2>
          </div>
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {VALORES.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.t} variants={fadeInUp} className="card p-6 text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-brand to-accent text-white flex items-center justify-center mb-4 shadow-card">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-ink">{v.t}</h3>
                  <p className="text-muted text-sm mt-2">{v.d}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </Page>
  );
}
