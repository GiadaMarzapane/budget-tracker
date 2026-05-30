// src/lib/utils.ts
// Small utilities used across the app.

/**
 * Tailwind className combiner — null/false/undefined-safe.
 * Replace with `clsx`/`tailwind-merge` if you want fancier merging.
 */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(' ');
}
