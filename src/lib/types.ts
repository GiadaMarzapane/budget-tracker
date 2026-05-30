// src/lib/types.ts
// Shared domain types. These mirror the Convex schema in `convex/schema.ts`.
// The Convex generated types live in `convex/_generated/dataModel.d.ts` —
// in production prefer importing `Doc<'transactions'>` etc. from there.

export type CategoryId =
  | 'home'
  | 'transport'
  | 'food'
  | 'subs'
  | 'shopping'
  | 'wellness'
  | 'travel'
  | (string & {}); // allow user-defined categories

export type PaletteSwatch = 'lavender' | 'pink' | 'blush' | 'cream' | 'mint';

export type IconName =
  | 'home' | 'transport' | 'food' | 'subs' | 'shopping' | 'wellness' | 'travel'
  | 'dashboard' | 'list' | 'category' | 'goal' | 'stats' | 'settings'
  | 'plus' | 'minus' | 'arrow-up' | 'arrow-down' | 'arrow-right' | 'arrow-left'
  | 'chevron-down' | 'chevron-up' | 'chevron-right'
  | 'search' | 'bell' | 'filter' | 'calendar' | 'edit' | 'trash' | 'dots'
  | 'check' | 'x' | 'wallet' | 'eye' | 'eye-off' | 'download' | 'upload'
  | 'plane' | 'laptop' | 'shield' | 'graduation'
  | 'repeat' | 'sparkle' | 'logout' | 'menu' | 'sun' | 'moon';

export interface Category {
  id: CategoryId;
  name: string;
  swatch: PaletteSwatch;
  icon: IconName;
}

export interface Transaction {
  id: string;
  desc: string;
  cat: CategoryId | null; // null = income / uncategorized
  date: string;           // ISO yyyy-mm-dd
  time?: string;          // hh:mm
  amount: number;         // negative for expense, positive for income
  recurring: boolean;
  income?: boolean;
  note?: string;
}

export interface Budget {
  catId: CategoryId;
  spent: number;
  budget: number;
}

export interface Goal {
  id: string;
  name: string;
  amount: number;
  target: number;
  swatch: PaletteSwatch;
  icon: IconName;
  deadline: string;
  monthly: number;
}

export interface MonthlyFlow {
  month: string;
  in: number;
  out: number;
}

export type ScreenId =
  | 'onboarding'
  | 'dashboard'
  | 'tx'
  | 'categories'
  | 'goals'
  | 'stats'
  | 'settings';
