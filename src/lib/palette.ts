// src/lib/palette.ts
// Centralized pastel palette + helpers. The Tailwind config exposes the same
// names under `bg-lavender`, `bg-pink-deep`, etc.

import type { PaletteSwatch } from './types';

export const PALETTE: Record<PaletteSwatch, string> = {
  lavender: '#e8d7ff',
  pink: '#ffd3e8',
  blush: '#ffd7d5',
  cream: '#f3ffe1',
  mint: '#dfffd6',
};

export const PALETTE_DEEP: Record<PaletteSwatch, string> = {
  lavender: '#b89be0',
  pink: '#e89dc1',
  blush: '#e89e9a',
  cream: '#c5d99a',
  mint: '#9dd190',
};

/** Tailwind bg class for a swatch (lighter shade). */
export function bgClass(s: PaletteSwatch): string {
  return ({
    lavender: 'bg-lavender',
    pink: 'bg-pink',
    blush: 'bg-blush',
    cream: 'bg-cream',
    mint: 'bg-mint',
  } as const)[s];
}

/** Tailwind bg class for the deeper variant. */
export function bgDeepClass(s: PaletteSwatch): string {
  return ({
    lavender: 'bg-lavender-deep',
    pink: 'bg-pink-deep',
    blush: 'bg-blush-deep',
    cream: 'bg-cream-deep',
    mint: 'bg-mint-deep',
  } as const)[s];
}
