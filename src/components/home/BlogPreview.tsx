import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import posts from '../../data/posts.json';
import type { BlogPost } from '../../types';
import { staggerContainer, fadeInUp } from '../../lib/animations';

export default function BlogPreview() {
  const data = (posts as BlogPost[]).slice(0, 3);
  return (
    <section className="container-x py-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <span className="badge bg-brand-50 text-brand mb-3">Educación en salud</span>
          <h2 className="section-title">Últimas notas del blog</h2>
          <p className="section-subtitle">Información clara y útil para cuidar tu salud.</p>
        </div>
        <Link to="/blog" className="btn-ghost">
          Ver todas las notas <ArrowRight size={18} />
        </Link>
      </div>
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {data.map((p) => (
          <motion.article
            key={p.slug}
            variants={fadeInUp}
            whileHover={{ y: -4 }}
            className="card overflow-hidden flex flex-col group"
          >
            <Link to={`/blog/${p.slug}`} className="block aspect-[16/10] overflow-hidden bg-soft">
              <img
                src={p.imagen}
                alt={p.titulo}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </Link>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="badge bg-accent-50 text-accent">{p.categoria}</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {p.fecha}
                </span>
              </div>
              <Link to={`/blog/${p.slug}`}>
                <h3 className="font-display font-bold text-ink text-lg mt-3 leading-snug group-hover:text-brand transition">
                  {p.titulo}
                </h3>
              </Link>
              <p className="text-muted text-sm mt-2 line-clamp-2 flex-1">{p.resumen}</p>
              <Link
                to={`/blog/${p.slug}`}
                className="mt-3 inline-flex items-center gap-1 text-brand text-sm font-semibold"
              >
                Leer nota <ArrowRight size={14} />
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
