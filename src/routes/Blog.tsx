import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import Page from '../components/ui/Page';
import postsData from '../data/posts.json';
import type { BlogPost } from '../types';
import { staggerContainer, fadeInUp } from '../lib/animations';

export default function Blog() {
  const posts = postsData as BlogPost[];
  return (
    <Page
      title="Blog — Confialab"
      description="Notas educativas sobre salud, exámenes y cuidados preventivos."
    >
      <section className="bg-soft-gradient border-b border-soft">
        <div className="container-x py-12">
          <span className="badge bg-accent-50 text-accent mb-3">Blog</span>
          <h1 className="section-title">Educación en salud</h1>
          <p className="section-subtitle">
            Información clara y útil para entender tus exámenes y cuidar tu bienestar.
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
          {posts.map((p) => (
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
                <p className="text-muted text-sm mt-2 line-clamp-3 flex-1">{p.resumen}</p>
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
    </Page>
  );
}
