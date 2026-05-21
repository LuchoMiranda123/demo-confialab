import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, FlaskConical, Download, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import Page from '../components/ui/Page';
import logoUrl from '../assets/logo_confialab.png';

// ── Simulated patient results ─────────────────────────────────────────────────
const RESULTADOS = [
  {
    id: 'R-20260510-001',
    nombre: 'Hemograma Completo (CBC)',
    codigo: 'HEM001',
    fecha: '10/05/2026',
    estado: 'disponible' as const,
    valores: [
      { param: 'Hemoglobina',  valor: '14.2 g/dL',      ref: '13.5 – 17.5 g/dL',        ok: true  },
      { param: 'Hematocrito',  valor: '42.1 %',          ref: '41.0 – 53.0 %',            ok: true  },
      { param: 'Leucocitos',   valor: '7,200 /mm³',      ref: '4,500 – 11,000 /mm³',      ok: true  },
      { param: 'Plaquetas',    valor: '280,000 /mm³',    ref: '150,000 – 400,000 /mm³',   ok: true  },
      { param: 'Neutrófilos',  valor: '62 %',            ref: '50 – 70 %',                ok: true  },
      { param: 'Linfocitos',   valor: '30 %',            ref: '20 – 40 %',                ok: true  },
    ],
  },
  {
    id: 'R-20260510-002',
    nombre: 'Glucosa en ayunas',
    codigo: 'BIO001',
    fecha: '10/05/2026',
    estado: 'disponible' as const,
    valores: [
      { param: 'Glucosa', valor: '95 mg/dL', ref: '70 – 100 mg/dL', ok: true },
    ],
  },
  {
    id: 'R-20260510-003',
    nombre: 'Perfil Lipídico Completo',
    codigo: 'BIO002',
    fecha: '10/05/2026',
    estado: 'disponible' as const,
    valores: [
      { param: 'Colesterol total',  valor: '185 mg/dL',  ref: '< 200 mg/dL',    ok: true  },
      { param: 'HDL',               valor: '52 mg/dL',   ref: '> 40 mg/dL',     ok: true  },
      { param: 'LDL',               valor: '112 mg/dL',  ref: '< 130 mg/dL',    ok: true  },
      { param: 'Triglicéridos',     valor: '148 mg/dL',  ref: '< 150 mg/dL',    ok: true  },
      { param: 'VLDL',              valor: '30 mg/dL',   ref: '< 40 mg/dL',     ok: true  },
    ],
  },
  {
    id: 'R-20260513-001',
    nombre: 'TSH (Hormona Estimulante de Tiroides)',
    codigo: 'HOR001',
    fecha: '13/05/2026',
    estado: 'proceso' as const,
    valores: [],
  },
];

// ── Login screen (fixed overlay matching screenshot style) ──────────────────
function LoginScreen({ onLogin }: { onLogin: (user: string) => void }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.trim() && pass.trim()) {
      onLogin(user.trim());
    } else {
      setError('Por favor ingrese un usuario válido.');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-hero-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-sm bg-white/95 backdrop-blur-md rounded-3xl shadow-glass p-8"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-7">
          <img src={logoUrl} alt="Confialab" className="h-24 w-auto object-contain" />
          <p className="text-muted text-xs mt-1 tracking-widest uppercase">Laboratorio Clínico</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <div className="relative">
              <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={user}
                onChange={e => { setUser(e.target.value); setError(''); }}
                className="input !pl-10"
                placeholder="Usuario"
                autoComplete="username"
              />
            </div>
            {error && (
              <p className="text-rose-500 text-xs mt-1 ml-1">{error}</p>
            )}
          </div>

          <div className="relative">
            <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              className="input !pl-10"
              placeholder="Contraseña"
              autoComplete="current-password"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-muted cursor-pointer select-none">
            <input type="checkbox" className="w-4 h-4 rounded border-brand-200 accent-brand" />
            Recordar sesión
          </label>

          <button type="submit" className="btn-primary w-full !py-3 text-base">
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-muted/70 border-t border-soft pt-4">
          Acceso exclusivo para pacientes Confialab.
          <br />
          <span className="text-brand/50">Demo: cualquier usuario y contraseña.</span>
        </p>
      </motion.div>
    </div>
  );
}

// ── Results card ─────────────────────────────────────────────────────────────
function ResultCard({
  result,
  expanded,
  onToggle,
}: {
  result: typeof RESULTADOS[number];
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      <button
        className="w-full flex items-center justify-between gap-3 p-5 text-left"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand flex items-center justify-center shrink-0">
            <FlaskConical size={18} />
          </div>
          <div className="min-w-0">
            <div className="font-display font-semibold text-ink truncate">{result.nombre}</div>
            <div className="text-xs text-muted mt-0.5">{result.codigo} · {result.fecha}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`badge ${
              result.estado === 'disponible'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-amber-50 text-amber-700'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                result.estado === 'disponible' ? 'bg-emerald-500' : 'bg-amber-400'
              }`}
            />
            {result.estado === 'disponible' ? 'Disponible' : 'En proceso'}
          </span>
          {expanded
            ? <ChevronUp size={16} className="text-muted" />
            : <ChevronDown size={16} className="text-muted" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-soft"
          >
            <div className="p-5">
              {result.estado === 'proceso' ? (
                <p className="text-muted text-sm">
                  Sus resultados están en procesamiento. Le notificaremos cuando estén disponibles.
                </p>
              ) : (
                <>
                  <div className="overflow-x-auto -mx-2 px-2">
                    <table className="w-full min-w-[480px] text-sm border-separate border-spacing-y-1">
                      <thead>
                        <tr className="text-xs font-semibold uppercase tracking-wider text-muted">
                          <th className="text-left pb-2 pl-3">Parámetro</th>
                          <th className="text-right pb-2 pr-3">Resultado</th>
                          <th className="text-right pb-2 pr-3">Referencia</th>
                          <th className="text-right pb-2 pr-3">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.valores.map(v => (
                          <tr key={v.param} className="bg-soft">
                            <td className="py-2 pl-3 rounded-l-xl text-ink">{v.param}</td>
                            <td className="py-2 pr-3 text-right font-semibold text-ink">{v.valor}</td>
                            <td className="py-2 pr-3 text-right text-muted">{v.ref}</td>
                            <td className="py-2 pr-3 text-right rounded-r-xl">
                              <span
                                className={`badge ${
                                  v.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
                                }`}
                              >
                                {v.ok ? 'Normal' : 'Fuera de rango'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      disabled
                      title="Próximamente"
                      className="btn !px-4 !py-2 text-sm border border-brand-100 text-muted cursor-not-allowed opacity-50"
                    >
                      <Download size={15} /> Descargar PDF
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Resultados() {
  const [loggedUser, setLoggedUser] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!loggedUser) {
    return <LoginScreen onLogin={setLoggedUser} />;
  }

  return (
    <Page
      title="Mis resultados — Confialab"
      description="Consulta online de resultados de exámenes de laboratorio Confialab."
    >
      <section className="bg-soft-gradient border-b border-soft">
        <div className="container-x py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="badge bg-brand-50 text-brand mb-2">Portal del paciente</span>
            <h1 className="section-title">Mis resultados</h1>
            <p className="text-muted text-sm mt-1">
              Paciente: <span className="font-semibold text-ink capitalize">{loggedUser}</span>
            </p>
          </div>
          <button
            onClick={() => setLoggedUser(null)}
            className="btn-ghost text-sm self-start sm:self-auto"
          >
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </section>

      <section className="container-x py-8 max-w-3xl space-y-3">
        {RESULTADOS.map(r => (
          <ResultCard
            key={r.id}
            result={r}
            expanded={expanded === r.id}
            onToggle={() => setExpanded(expanded === r.id ? null : r.id)}
          />
        ))}
      </section>
    </Page>
  );
}
