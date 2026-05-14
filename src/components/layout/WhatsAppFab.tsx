import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP } from '../../lib/whatsapp';

export default function WhatsAppFab() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola Confialab, necesito información sobre sus servicios.')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-40 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
    >
      <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink text-white text-xs font-semibold px-3 py-1.5 opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-card">
        ¿Necesitas ayuda?
      </span>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-cardHover ring-4 ring-white"
      >
        <MessageCircle size={26} fill="white" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      </motion.div>
    </motion.a>
  );
}
