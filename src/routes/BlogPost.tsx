import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, ArrowLeft } from 'lucide-react';
import Page from '../components/ui/Page';
import postsData from '../data/posts.json';
import type { BlogPost } from '../types';
import NotFound from './NotFound';

export default function BlogPostPage() {
  const { slug } = useParams();
  const posts = postsData as BlogPost[];
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <NotFound />;

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <Page title={`${post.titulo} — Blog Confialab`} description={post.resumen}>
      <div className="bg-soft-gradient border-b border-soft">
        <div className="container-x py-4 text-sm text-muted flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-brand">Inicio</Link>
          <ChevronRight size={14} />
          <Link to="/blog" className="hover:text-brand">Blog</Link>
          <ChevronRight size={14} />
          <span className="text-ink font-medium truncate">{post.titulo}</span>
        </div>
      </div>

      <article className="container-x py-10 max-w-3xl">
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="badge bg-accent-50 text-accent">{post.categoria}</span>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {post.fecha}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight mt-3">
            {post.titulo}
          </h1>
          <p className="mt-3 text-muted text-lg">{post.resumen}</p>
        </motion.header>

        <motion.img
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          src={post.imagen}
          alt={post.titulo}
          className="mt-6 rounded-2xl aspect-[16/9] object-cover w-full shadow-card"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none mt-8 text-muted"
        >
          {post.contenido.split('\n\n').map((p, i) => (
            <p key={i} className="leading-relaxed mb-4">{p}</p>
          ))}
        </motion.div>

        <Link to="/blog" className="btn-ghost mt-8">
          <ArrowLeft size={18} /> Volver al blog
        </Link>
      </article>

      {related.length > 0 && (
        <section className="bg-soft py-12">
          <div className="container-x">
            <h2 className="font-display font-bold text-ink text-xl mb-6">También te puede interesar</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  to={`/blog/${p.slug}`}
                  key={p.slug}
                  className="card overflow-hidden group"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-white">
                    <img
                      src={p.imagen}
                      alt={p.titulo}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="badge bg-accent-50 text-accent text-xs">{p.categoria}</span>
                    <h3 className="font-display font-bold text-ink mt-2 group-hover:text-brand transition leading-snug">
                      {p.titulo}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Page>
  );
}
