import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, MessageCircle } from 'lucide-react';
import Modal from '../ui/Modal';

// ── Slot config ─────────────────────────────────────────────────────────────
const SLOTS_WD = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30'];
const SLOTS_SAT = [...SLOTS_WD, '12:00', '12:30'];

type DayStatus = 'past' | 'closed' | 'full' | 'partial' | 'available';

function getDayStatus(date: Date, today: Date): DayStatus {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (d < t) return 'past';
  const dow = d.getDay();
  if (dow === 0) return 'closed';
  // Deterministic availability: seed based on day + month
  const seed = (d.getDate() * 17 + d.getMonth() * 7) % 10;
  if (seed < 2) return 'full';
  if (seed < 4) return 'partial';
  return 'available';
}

function getSlots(date: Date, today: Date): string[] {
  const status = getDayStatus(date, today);
  if (status === 'past' || status === 'closed' || status === 'full') return [];
  const base = date.getDay() === 6 ? SLOTS_SAT : SLOTS_WD;
  if (status === 'partial') {
    const n = date.getDate();
    return base.filter((_, i) => (i + n) % 3 !== 0);
  }
  return base;
}

function buildMonth(year: number, month: number): (Date | null)[] {
  const cells: (Date | null)[] = [];
  const first = new Date(year, month, 1).getDay();
  const last = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= last; d++) cells.push(new Date(year, month, d));
  return cells;
}

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DOW = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

// ── Status styles ────────────────────────────────────────────────────────────
const DAY_CLS: Record<DayStatus, string> = {
  past:      'text-muted/30 cursor-default',
  closed:    'text-muted/25 cursor-default line-through',
  full:      'bg-rose-50 text-rose-300 cursor-default line-through',
  partial:   'bg-amber-50 text-amber-700 hover:bg-amber-100 cursor-pointer',
  available: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer',
};

// ── Props ────────────────────────────────────────────────────────────────────
interface Props {
  open: boolean;
  onClose: () => void;
  examenNombre: string;
  examenCodigo: string;
}

export default function AvailabilityCalendar({ open, onClose, examenNombre, examenCodigo }: Props) {
  const today = useMemo(() => new Date(), []);
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const cells = useMemo(() => buildMonth(view.y, view.m), [view]);
  const slots = useMemo(() => (selectedDay ? getSlots(selectedDay, today) : []), [selectedDay, today]);

  const isCurrentMonth = view.y === today.getFullYear() && view.m === today.getMonth();

  const prev = () => {
    if (isCurrentMonth) return;
    const d = new Date(view.y, view.m - 1, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
    setSelectedDay(null); setSelectedSlot(null);
  };
  const next = () => {
    const d = new Date(view.y, view.m + 1, 1);
    const limit = new Date(today.getFullYear(), today.getMonth() + 3, 1);
    if (d >= limit) return;
    setView({ y: d.getFullYear(), m: d.getMonth() });
    setSelectedDay(null); setSelectedSlot(null);
  };

  const handleDay = (date: Date) => {
    const s = getDayStatus(date, today);
    if (s === 'past' || s === 'closed' || s === 'full') return;
    setSelectedDay(date);
    setSelectedSlot(null);
  };

  const handleBook = () => {
    if (!selectedDay || !selectedSlot) return;
    const dateFmt = selectedDay.toLocaleDateString('es-PE', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
    const msg =
      `Hola Confialab, deseo reservar una cita para el siguiente examen:\n\n` +
      `Examen: ${examenNombre} (${examenCodigo})\n` +
      `Fecha: ${dateFmt}\n` +
      `Hora: ${selectedSlot} am\n\n` +
      `Por favor confirmen disponibilidad. Gracias.`;
    window.open(`https://wa.me/51946161296?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <Modal open={open} onClose={onClose} title="Disponibilidad de citas" maxWidth="max-w-md">
      <div className="space-y-5">

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200" />Disponible
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-100 border border-amber-200" />Plazas limitadas
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-100 border border-rose-200" />Sin citas
          </span>
        </div>

        {/* Month navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prev}
            disabled={isCurrentMonth}
            className="p-2 rounded-xl hover:bg-soft disabled:opacity-25 transition"
            aria-label="Mes anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="font-display font-semibold text-ink">
            {MONTHS[view.m]} {view.y}
          </span>
          <button onClick={next} className="p-2 rounded-xl hover:bg-soft transition" aria-label="Mes siguiente">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Calendar grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${view.y}-${view.m}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.18 }}
          >
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DOW.map(d => (
                <div key={d} className="text-center text-[11px] font-semibold text-muted py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map((date, i) => {
                if (!date) return <div key={`e-${i}`} />;
                const status = getDayStatus(date, today);
                const isSel = selectedDay?.toDateString() === date.toDateString();
                const isToday = date.toDateString() === today.toDateString();
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => handleDay(date)}
                    className={[
                      'rounded-xl py-2 text-sm font-medium transition-all text-center',
                      DAY_CLS[status],
                      isSel ? '!bg-brand !text-white shadow-card scale-105' : '',
                      isToday && !isSel ? 'ring-2 ring-accent ring-offset-1' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Time slots */}
        <AnimatePresence>
          {selectedDay && (
            <motion.div
              key={selectedDay.toISOString()}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="border-t border-soft pt-4 space-y-3"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Clock size={15} className="text-brand" />
                {selectedDay.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
              {slots.length === 0 ? (
                <p className="text-muted text-sm">No hay horarios disponibles para este día.</p>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {slots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={[
                        'rounded-xl py-2 text-sm font-medium border transition',
                        selectedSlot === slot
                          ? 'bg-brand text-white border-brand shadow-card'
                          : 'border-soft text-ink hover:border-brand-200 hover:bg-brand-50',
                      ].join(' ')}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirm + WhatsApp */}
        <AnimatePresence>
          {selectedDay && selectedSlot && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border-t border-soft pt-4 space-y-3"
            >
              <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-sm">
                <div className="font-semibold text-ink">{examenNombre}</div>
                <div className="text-muted mt-0.5">
                  {selectedDay.toLocaleDateString('es-PE', {
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                  })}
                  {' · '}
                  {selectedSlot} am
                </div>
              </div>
              <button
                onClick={handleBook}
                className="btn w-full px-6 py-3 bg-[#25D366] hover:bg-[#1FAE54] text-white shadow-card font-semibold"
              >
                <MessageCircle size={18} fill="white" />
                Reservar por WhatsApp
              </button>
              <p className="text-xs text-muted text-center">
                Te responderemos en breve para confirmar tu cita.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </Modal>
  );
}
