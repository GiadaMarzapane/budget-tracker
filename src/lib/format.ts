// src/lib/format.ts
// Currency + date formatting helpers (it-IT locale).

export function fmtEUR(
  n: number,
  opts: { showSign?: boolean; showCents?: boolean } = {},
): string {
  const { showSign = false, showCents = true } = opts;
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString('it-IT', {
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  });
  const sign = n < 0 ? '−' : showSign && n > 0 ? '+' : '';
  return `${sign}€ ${formatted}`;
}

const MONTHS_SHORT = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];

export function fmtDate(iso: string, opts: { long?: boolean } = {}): string {
  const d = new Date(iso);
  const day = d.getDate();
  const month = MONTHS_SHORT[d.getMonth()];
  if (opts.long) return `${day} ${month} ${d.getFullYear()}`;
  return `${day} ${month}`;
}
