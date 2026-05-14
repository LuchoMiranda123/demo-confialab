import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Phone, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useQuoteStore } from '../../store/quoteStore';
import logoUrl from '../../assets/logo_confialab.png';

const NAV = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Exámenes' },
  { to: '/perfiles', label: 'Perfiles' },
  { to: '/sedes', label: 'Sedes' },
  { to: '/blog', label: 'Blog' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const count = useQuoteStore((s) => s.items.length);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-brand-900 text-white text-xs">
        <div className="container-x flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <a href="tel:013040982" className="flex items-center gap-1.5 hover:text-accent-200 transition">
              <Phone size={12} /> (01) 304-0982
            </a>
            <span className="text-white/60">|</span>
            <span className="text-white/80">Lun-Vie 7:00 - 19:00 · Sáb 7:00 - 13:00</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://confialab.com/labresultado/login.php"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-200 transition"
            >
              Resultados en línea
            </a>
            <ChevronRight size={12} />
          </div>
        </div>
      </div>

      <motion.header
        initial={false}
        animate={{
          paddingTop: scrolled ? 8 : 14,
          paddingBottom: scrolled ? 8 : 14,
        }}
        transition={{ duration: 0.2 }}
        className={clsx(
          'sticky top-0 z-50 transition-all',
          scrolled ? 'glass shadow-glass border-b border-white/40' : 'bg-white'
        )}
      >
        <div className="container-x flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logoUrl}
              alt="Confialab Laboratorio Clínico"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  clsx(
                    'px-3 py-2 rounded-full text-sm font-medium transition',
                    isActive ? 'text-brand bg-brand-50' : 'text-ink/80 hover:text-brand hover:bg-brand-50/60'
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/cotizador"
              className="btn-accent !px-4 !py-2.5 text-sm relative"
              aria-label={`Cotizador con ${count} exámenes`}
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cotizar</span>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-brand text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 ring-2 ring-white"
                >
                  {count}
                </motion.span>
              )}
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden p-2 rounded-xl hover:bg-soft transition"
              aria-label="Menú"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-soft"
            >
              <div className="container-x py-4 flex flex-col gap-1">
                {NAV.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    end={n.to === '/'}
                    className={({ isActive }) =>
                      clsx(
                        'px-4 py-3 rounded-xl text-base font-medium transition',
                        isActive ? 'text-brand bg-brand-50' : 'text-ink/80 hover:bg-soft'
                      )
                    }
                  >
                    {n.label}
                  </NavLink>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
