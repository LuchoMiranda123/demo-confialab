import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Page from '../components/ui/Page';

export default function NotFound() {
  return (
    <Page title="Página no encontrada" description="La página que buscas no existe.">
      <section className="container-x py-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-display text-7xl sm:text-9xl font-bold bg-hero-gradient bg-clip-text text-transparent"
        >
          404
        </motion.div>
        <h1 className="section-title mt-4">Página no encontrada</h1>
        <p className="section-subtitle mx-auto">Es posible que el enlace haya cambiado o ya no esté disponible.</p>
        <Link to="/" className="btn-primary mt-8">
          Volver al inicio
        </Link>
      </section>
    </Page>
  );
}
