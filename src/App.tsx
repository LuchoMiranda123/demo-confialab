import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppFab from './components/layout/WhatsAppFab';
import CookieBanner from './components/layout/CookieBanner';
import CompareTray from './components/comparador/CompareTray';
import CompareModal from './components/comparador/CompareModal';
import Home from './routes/Home';
import Catalogo from './routes/Catalogo';
import AnalisisDetalle from './routes/AnalisisDetalle';
import Perfiles from './routes/Perfiles';
import Cotizador from './routes/Cotizador';
import Sedes from './routes/Sedes';
import Nosotros from './routes/Nosotros';
import Blog from './routes/Blog';
import BlogPost from './routes/BlogPost';
import Contacto from './routes/Contacto';
import NotFound from './routes/NotFound';

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/analisis/:codigo" element={<AnalisisDetalle />} />
        <Route path="/perfiles" element={<Perfiles />} />
        <Route path="/cotizador" element={<Cotizador />} />
        <Route path="/sedes" element={<Sedes />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
        <WhatsAppFab />
        <CompareTray />
        <CompareModal />
        <CookieBanner />
      </div>
    </HashRouter>
  );
}
