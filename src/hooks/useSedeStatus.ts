import { useEffect, useState } from 'react';
import type { Sede } from '../types';

export type SedeStatus = {
  abierto: boolean;
  proximaApertura?: string;
  cierraEn?: string;
};

export function getSedeStatus(sede: Sede, now = new Date()): SedeStatus {
  const day = now.getDay(); // 0=dom, 1-5=lun-vie, 6=sab
  let hoyHorario: { open: string; close: string } | null = null;
  if (day >= 1 && day <= 5) hoyHorario = sede.horarios.lunVie;
  else if (day === 6) hoyHorario = sede.horarios.sab;
  else hoyHorario = sede.horarios.dom;

  if (!hoyHorario) return { abierto: false, proximaApertura: 'Próximo día hábil' };

  const [oh, om] = hoyHorario.open.split(':').map(Number);
  const [ch, cm] = hoyHorario.close.split(':').map(Number);
  const openMin = oh * 60 + om;
  const closeMin = ch * 60 + cm;
  const nowMin = now.getHours() * 60 + now.getMinutes();

  if (nowMin >= openMin && nowMin < closeMin) {
    return { abierto: true, cierraEn: hoyHorario.close };
  }
  if (nowMin < openMin) {
    return { abierto: false, proximaApertura: hoyHorario.open };
  }
  return { abierto: false, proximaApertura: 'Mañana' };
}

export function formatHorario(h: { open: string; close: string } | null): string {
  if (!h) return 'Cerrado';
  return `${h.open} - ${h.close}`;
}

export function useSedeStatus(sede: Sede): SedeStatus {
  const [status, setStatus] = useState<SedeStatus>(() => getSedeStatus(sede));
  useEffect(() => {
    setStatus(getSedeStatus(sede));
    const id = setInterval(() => setStatus(getSedeStatus(sede)), 60_000);
    return () => clearInterval(id);
  }, [sede]);
  return status;
}
