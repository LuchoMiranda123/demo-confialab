import type { QuoteItem } from '../types';

const WHATSAPP_NUMBER = '51946161296';

export function buildQuoteWhatsAppLink(
  items: QuoteItem[],
  total: number,
  paciente: { nombre: string; documento: string; correo: string },
  descuento: number
): string {
  const lines: string[] = [];
  lines.push('*Cotización Confialab*');
  lines.push('');
  lines.push(`Paciente: ${paciente.nombre || '-'}`);
  lines.push(`Documento: ${paciente.documento || '-'}`);
  lines.push(`Correo: ${paciente.correo || '-'}`);
  lines.push('');
  lines.push('*Exámenes solicitados:*');
  items.forEach((it, idx) => {
    lines.push(`${idx + 1}. ${it.nombre} (${it.codigo}) — S/ ${it.precio.toFixed(2)}`);
  });
  lines.push('');
  if (descuento > 0) {
    lines.push(`Subtotal: S/ ${(total + descuento).toFixed(2)}`);
    lines.push(`Descuento: -S/ ${descuento.toFixed(2)}`);
  }
  lines.push(`*Total estimado: S/ ${total.toFixed(2)}*`);
  lines.push('');
  lines.push('Quisiera coordinar mi atención. ¡Gracias!');

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function buildContactWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP = WHATSAPP_NUMBER;
