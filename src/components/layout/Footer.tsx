import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ShieldCheck, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-900 text-white">
      <div className="container-x py-16 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-brand-300 flex items-center justify-center text-white font-display font-bold text-lg">
              C
            </div>
            <div>
              <div className="font-display font-bold text-xl">
                Confia<span className="text-accent-200">Lab</span>
              </div>
              <div className="text-[10px] text-white/60 -mt-0.5 tracking-widest">LABORATORIO CLÍNICO</div>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            El mejor valor predictivo es la prevención. Más de 1000 exámenes a tu disposición.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.facebook.com/confialabsolucionesensalud/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent transition flex items-center justify-center"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://www.instagram.com/confialab_peru/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent transition flex items-center justify-center"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.linkedin.com/company/confialab/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent transition flex items-center justify-center"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Servicios */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
            Servicios
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/catalogo" className="text-white/70 hover:text-accent-200 transition">Análisis Clínicos</Link></li>
            <li><Link to="/perfiles" className="text-white/70 hover:text-accent-200 transition">Perfiles de Bienestar</Link></li>
            <li><Link to="/catalogo?tipo=vacuna" className="text-white/70 hover:text-accent-200 transition">Vacunación</Link></li>
            <li><Link to="/contacto" className="text-white/70 hover:text-accent-200 transition">Servicio a domicilio</Link></li>
            <li><Link to="/contacto" className="text-white/70 hover:text-accent-200 transition">Análisis ocupacional</Link></li>
          </ul>
        </div>

        {/* Empresa */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
            Empresa
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/nosotros" className="text-white/70 hover:text-accent-200 transition">Sobre nosotros</Link></li>
            <li><Link to="/sedes" className="text-white/70 hover:text-accent-200 transition">Nuestras sedes</Link></li>
            <li><Link to="/blog" className="text-white/70 hover:text-accent-200 transition">Blog</Link></li>
            <li><Link to="/contacto" className="text-white/70 hover:text-accent-200 transition">Trabaja con nosotros</Link></li>
            <li>
              <a
                href="https://confialab.com/labresultado/login.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-accent-200 transition"
              >
                Resultados en línea
              </a>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
            Contáctanos
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2 text-white/80">
              <Phone size={16} className="mt-0.5 text-accent-200 shrink-0" />
              <a href="tel:013040982" className="hover:text-accent-200 transition">(01) 304-0982</a>
            </li>
            <li className="flex items-start gap-2 text-white/80">
              <Phone size={16} className="mt-0.5 text-accent-200 shrink-0" />
              <a href="https://wa.me/51946161296" target="_blank" rel="noopener noreferrer" className="hover:text-accent-200 transition">
                WhatsApp 946 161 296
              </a>
            </li>
            <li className="flex items-start gap-2 text-white/80">
              <Mail size={16} className="mt-0.5 text-accent-200 shrink-0" />
              <a href="mailto:contacto@confialab.com.pe" className="hover:text-accent-200 transition">
                contacto@confialab.com.pe
              </a>
            </li>
            <li className="flex items-start gap-2 text-white/80">
              <MapPin size={16} className="mt-0.5 text-accent-200 shrink-0" />
              <span>Av. Antonio José de Sucre 186, Pueblo Libre</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-xs text-white/60">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-accent-200" /> Certificación ISO 9001
            </span>
            <span className="flex items-center gap-2">
              <Award size={16} className="text-accent-200" /> Avalado por Médico Patólogo Clínico
            </span>
          </div>
          <div className="text-xs text-white/60">
            © {new Date().getFullYear()} Confialab. Todos los derechos reservados. RUC 20XXXXXXXXX
          </div>
        </div>
      </div>
    </footer>
  );
}
