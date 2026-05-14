import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Calendar, MapPin, ShieldCheck } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../../lib/animations';

export default function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4]);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/catalogo?q=${encodeURIComponent(term)}` : '/catalogo');
  };

  return (
    <section ref={ref} className="relative overflow-hidden bg-hero-gradient text-white">
      {/* Parallax decorations */}
      <motion.div
        style={{ y, opacity }}
        className="absolute -top-20 -right-32 w-[480px] h-[480px] rounded-full bg-accent/30 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 600], [0, 60]) }}
        className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-brand-300/20 blur-3xl pointer-events-none"
      />
      <div className="absolute inset-0 dot-pattern opacity-[0.07] pointer-events-none" />

      <div className="container-x relative pt-12 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
          >
            <ShieldCheck size={14} /> Más de 1000 exámenes disponibles
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white"
          >
            Tu salud,
            <br />
            <span className="text-accent-200">en manos confiables.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-white/80 max-w-lg">
            Análisis clínicos, vacunación y servicio a domicilio con resultados oportunos.
            Cotiza, compara y agenda en segundos.
          </motion.p>

          {/* Quick search */}
          <motion.form
            variants={fadeInUp}
            onSubmit={onSearch}
            className="flex w-full max-w-xl rounded-full bg-white/95 shadow-glass overflow-hidden"
          >
            <div className="flex items-center pl-5 text-muted">
              <Search size={18} />
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Busca tu examen (ej. glucosa, hemograma)…"
              className="flex-1 bg-transparent px-4 py-3.5 text-ink placeholder:text-muted focus:outline-none"
            />
            <button type="submit" className="btn-primary !rounded-none !px-6 text-sm">
              Buscar
            </button>
          </motion.form>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
            <Link to="/cotizador" className="btn-accent">
              <Calendar size={18} /> Cotizar ahora
            </Link>
            <Link to="/sedes" className="btn-outline border-white text-white hover:bg-white hover:text-brand">
              <MapPin size={18} /> Ver sedes
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center gap-6 pt-4 text-sm">
            <div>
              <div className="font-display font-bold text-2xl text-accent-200">+15</div>
              <div className="text-white/60 text-xs">Años de experiencia</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <div className="font-display font-bold text-2xl text-accent-200">+1000</div>
              <div className="text-white/60 text-xs">Pruebas disponibles</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <div className="font-display font-bold text-2xl text-accent-200">24h</div>
              <div className="text-white/60 text-xs">Resultados online</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative hidden lg:block"
        >
          <motion.div
            style={{ y: useTransform(scrollY, [0, 500], [0, -40]) }}
            className="relative rounded-3xl overflow-hidden shadow-glass aspect-[4/5] max-h-[560px] mx-auto"
          >
            <img
              src="https://confialab.com.pe/wp-content/uploads/2022/07/00lab.jpg"
              alt="Laboratorio Confialab"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent" />
          </motion.div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -left-6 top-12 card !bg-white p-4 w-56 shadow-glass"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="text-ink font-semibold text-sm">Resultados validados</div>
                <div className="text-muted text-xs">Patólogo Clínico</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute -right-4 bottom-12 card !bg-white p-4 w-60 shadow-glass"
          >
            <div className="text-xs text-muted font-medium">Hemograma Completo</div>
            <div className="text-ink font-display font-bold text-lg mt-0.5">S/ 28.00</div>
            <div className="text-accent text-xs font-semibold mt-1">Resultado mismo día</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave bottom */}
      <svg
        className="block w-full text-white"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,90L1360,90C1280,90,1120,90,960,90C800,90,640,90,480,90C320,90,160,90,80,90L0,90Z"
        />
      </svg>
    </section>
  );
}
