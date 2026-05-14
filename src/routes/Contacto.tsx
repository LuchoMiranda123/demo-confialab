import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, Send } from 'lucide-react';
import Page from '../components/ui/Page';
import { buildContactWhatsAppLink } from '../lib/whatsapp';
import { fadeInUp, staggerContainer } from '../lib/animations';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', telefono: '', asunto: '', mensaje: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola Confialab, soy ${form.nombre}.\nTeléfono: ${form.telefono}\nAsunto: ${form.asunto}\n\n${form.mensaje}`;
    window.open(buildContactWhatsAppLink(text), '_blank');
  };

  return (
    <Page
      title="Contacto — Confialab"
      description="Contáctanos por WhatsApp, teléfono o correo electrónico. Estamos listos para atenderte."
    >
      <section className="bg-soft-gradient border-b border-soft">
        <div className="container-x py-12">
          <span className="badge bg-accent-50 text-accent mb-3">Contacto</span>
          <h1 className="section-title">¿En qué podemos ayudarte?</h1>
          <p className="section-subtitle">
            Escríbenos y un asesor te responderá en breve. También puedes llamarnos o enviarnos un correo.
          </p>
        </div>
      </section>

      <section className="container-x py-12 grid lg:grid-cols-[1fr_360px] gap-8">
        {/* Form */}
        <motion.form
          onSubmit={onSubmit}
          variants={staggerContainer(0.06)}
          initial="hidden"
          animate="show"
          className="card p-6 space-y-4"
        >
          <motion.h2 variants={fadeInUp} className="font-display font-bold text-ink text-xl">
            Envíanos un mensaje
          </motion.h2>
          <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-3">
            <input
              required
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="input"
              placeholder="Nombre completo"
            />
            <input
              required
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              className="input"
              placeholder="Teléfono"
            />
          </motion.div>
          <motion.input
            variants={fadeInUp}
            value={form.asunto}
            onChange={(e) => setForm({ ...form, asunto: e.target.value })}
            className="input"
            placeholder="Asunto"
          />
          <motion.textarea
            variants={fadeInUp}
            required
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            className="input min-h-[140px] resize-y"
            placeholder="¿En qué podemos ayudarte?"
          />
          <motion.button variants={fadeInUp} type="submit" className="btn-primary w-full sm:w-auto">
            <Send size={16} /> Enviar mensaje
          </motion.button>
          <p className="text-xs text-muted">
            El mensaje se enviará por WhatsApp a nuestra central de atención.
          </p>
        </motion.form>

        {/* Info */}
        <aside className="space-y-4">
          <a
            href={buildContactWhatsAppLink('Hola Confialab, necesito información.')}
            target="_blank"
            rel="noopener noreferrer"
            className="card p-5 flex items-center gap-4 hover:shadow-cardHover transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
              <MessageCircle size={20} fill="white" />
            </div>
            <div>
              <div className="text-xs text-muted">WhatsApp</div>
              <div className="font-display font-semibold text-ink">+51 946 161 296</div>
            </div>
          </a>
          <a href="tel:013040982" className="card p-5 flex items-center gap-4 hover:shadow-cardHover transition">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand flex items-center justify-center shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <div className="text-xs text-muted">Teléfono</div>
              <div className="font-display font-semibold text-ink">(01) 304-0982</div>
            </div>
          </a>
          <a href="mailto:contacto@confialab.com.pe" className="card p-5 flex items-center gap-4 hover:shadow-cardHover transition">
            <div className="w-12 h-12 rounded-2xl bg-accent-50 text-accent flex items-center justify-center shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <div className="text-xs text-muted">Correo</div>
              <div className="font-display font-semibold text-ink break-all">contacto@confialab.com.pe</div>
            </div>
          </a>
          <div className="card p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand flex items-center justify-center shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <div className="text-xs text-muted">Sedes</div>
              <div className="font-display font-semibold text-ink">3 sedes en Lima</div>
            </div>
          </div>
        </aside>
      </section>
    </Page>
  );
}
