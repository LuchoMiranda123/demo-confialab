import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const KEY = 'confialab-cookie-ack';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ack = window.localStorage.getItem(KEY);
    if (!ack) {
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem(KEY, '1');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-24 z-40 max-w-md"
        >
          <div className="card p-4 sm:p-5 shadow-glass border border-soft flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-accent-50 text-accent flex items-center justify-center shrink-0">
              <Cookie size={18} />
            </div>
            <div className="flex-1 text-sm">
              <p className="text-ink font-medium">Usamos cookies para mejorar tu experiencia.</p>
              <p className="text-muted text-xs mt-1">
                Al continuar navegando aceptas nuestra política de cookies y privacidad.
              </p>
            </div>
            <button onClick={accept} className="btn-primary !px-4 !py-2 text-sm">
              Aceptar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
