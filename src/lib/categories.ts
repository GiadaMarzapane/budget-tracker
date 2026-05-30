// src/lib/categories.ts
// Default categories shipped with the app. Users can add their own — in
// production those live in the `categories` Convex table and are merged with
// this list.

import type { Category } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'home',      name: 'Casa',        swatch: 'lavender', icon: 'home' },
  { id: 'transport', name: 'Trasporti',   swatch: 'pink',     icon: 'transport' },
  { id: 'food',      name: 'Cibo',        swatch: 'blush',    icon: 'food' },
  { id: 'subs',      name: 'Abbonamenti', swatch: 'cream',    icon: 'subs' },
  { id: 'shopping',  name: 'Shopping',    swatch: 'mint',     icon: 'shopping' },
  { id: 'wellness',  name: 'Benessere',   swatch: 'lavender', icon: 'wellness' },
  { id: 'travel',    name: 'Viaggi',      swatch: 'pink',     icon: 'travel' },
];

export const CATEGORY_BY_ID: Record<string, Category> = Object.fromEntries(
  DEFAULT_CATEGORIES.map((c) => [c.id, c]),
);
