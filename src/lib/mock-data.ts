// src/lib/mock-data.ts
// Static fixtures used while wiring the UI before the Convex backend is live.
// Once Convex is connected, swap each `MOCK_*` with the matching
// `useQuery(api.transactions.list)` etc.

import type { Budget, Goal, MonthlyFlow, Transaction } from './types';

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1',  desc: 'Conad — spesa settimanale', cat: 'food',      date: '2026-05-28', time: '12:32', amount: -48.20, recurring: false },
  { id: 't2',  desc: 'Caffè bar Centro',          cat: 'food',      date: '2026-05-28', time: '08:45', amount: -1.50,  recurring: false },
  { id: 't3',  desc: 'Netflix',                   cat: 'subs',      date: '2026-05-28', time: '08:00', amount: -11.49, recurring: true  },
  { id: 't4',  desc: 'Stipendio aprile',          cat: null,        date: '2026-05-27', time: '09:00', amount:  1800,  recurring: true,  income: true },
  { id: 't5',  desc: 'Treno Milano-Roma',         cat: 'transport', date: '2026-05-27', time: '14:20', amount: -79.00, recurring: false },
  { id: 't6',  desc: 'Farmacia Comunale',         cat: 'wellness',  date: '2026-05-22', time: '17:10', amount: -18.40, recurring: false },
  { id: 't7',  desc: 'Affitto',                   cat: 'home',      date: '2026-05-20', time: '09:00', amount: -750,   recurring: true  },
  { id: 't8',  desc: 'Zara',                      cat: 'shopping',  date: '2026-05-19', time: '18:42', amount: -62.00, recurring: false },
  { id: 't9',  desc: 'Booking · Bologna',         cat: 'travel',    date: '2026-05-15', time: '21:00', amount: -145.00,recurring: false },
  { id: 't10', desc: 'Spotify',                   cat: 'subs',      date: '2026-05-14', time: '08:00', amount: -10.99, recurring: true  },
  { id: 't11', desc: 'Rimborso amico',            cat: null,        date: '2026-05-12', time: '14:00', amount:  50.00, recurring: false, income: true },
  { id: 't12', desc: 'Esselunga',                 cat: 'food',      date: '2026-05-10', time: '11:00', amount: -67.30, recurring: false },
  { id: 't13', desc: 'Benzina',                   cat: 'transport', date: '2026-05-08', time: '08:15', amount: -52.00, recurring: false },
];

export const MOCK_BUDGETS: Budget[] = [
  { catId: 'home',      spent: 750, budget: 900 },
  { catId: 'transport', spent: 142, budget: 200 },
  { catId: 'food',      spent: 218, budget: 300 },
  { catId: 'subs',      spent: 95,  budget: 100 },
  { catId: 'shopping',  spent: 78,  budget: 150 },
  { catId: 'wellness',  spent: 18,  budget: 80  },
  { catId: 'travel',    spent: 145, budget: 200 },
];

export const MOCK_GOALS: Goal[] = [
  { id: 'g1', name: 'Vacanza Grecia',   amount: 1200, target: 2000, swatch: 'pink',     icon: 'plane',      deadline: 'lug 2026', monthly: 200 },
  { id: 'g2', name: 'Nuovo MacBook',    amount: 850,  target: 1800, swatch: 'lavender', icon: 'laptop',     deadline: 'set 2026', monthly: 250 },
  { id: 'g3', name: 'Fondo emergenza',  amount: 3200, target: 5000, swatch: 'mint',     icon: 'shield',     deadline: 'dic 2026', monthly: 300 },
  { id: 'g4', name: 'Corso UX',         amount: 420,  target: 600,  swatch: 'cream',    icon: 'graduation', deadline: 'giu 2026', monthly: 100 },
];

export const MOCK_MONTHLY_FLOW: MonthlyFlow[] = [
  { month: 'Set', in: 2600, out: 1850 },
  { month: 'Ott', in: 2800, out: 2100 },
  { month: 'Nov', in: 2750, out: 1950 },
  { month: 'Dic', in: 3100, out: 2400 },
  { month: 'Gen', in: 2950, out: 1820 },
  { month: 'Feb', in: 3200, out: 1950 },
  { month: 'Mar', in: 3400, out: 2200 },
  { month: 'Apr', in: 3300, out: 2050 },
  { month: 'Mag', in: 3200, out: 1446 },
];
