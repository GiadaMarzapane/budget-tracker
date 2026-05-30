# Budget Tracker — UI export

Componenti **React + TypeScript + Tailwind** estratti dal prototipo hi-fi.
Pronti per essere integrati in un progetto Vite + Convex.

## Stack

- React 18.3
- TypeScript 5.6
- Vite 5
- Tailwind CSS 3.4
- Convex 1.17 (client, già incluso nelle dependencies)
- Font: [Sour Gummy](https://fonts.google.com/specimen/Sour+Gummy) (caricato in `index.html`)

## Avvio

```bash
npm install
npm run dev          # frontend Vite
npx convex dev       # backend Convex (in un altro terminale)
```

Crea un `.env.local` con:

```
VITE_CONVEX_URL=https://<your-deployment>.convex.cloud
```

Poi in `src/main.tsx` decommenta il blocco `<ConvexProvider>`.

## Struttura

```
src/
├── App.tsx                 # router state + modal mount
├── main.tsx                # Vite entry, Convex provider stub
├── index.css               # Tailwind + scrollbar + utilities
├── hooks/
│   └── useScreen.ts        # screen state (localStorage)
├── lib/
│   ├── types.ts            # domain types (mirror dello schema Convex)
│   ├── format.ts           # fmtEUR, fmtDate (it-IT)
│   ├── palette.ts          # tokens colore pastello
│   ├── categories.ts       # categorie predefinite
│   ├── mock-data.ts        # fixtures — da sostituire con useQuery
│   └── utils.ts            # cn() helper
└── components/
    ├── ui/                 # primitive: Button, Card (Glass/Clay/Flat),
    │                       #   Pill, CategoryChip, Input, Toggle, Segmented,
    │                       #   Progress, Ring, Avatar, Icon, IconButton, Eyebrow
    ├── charts/             # LineChartSmooth, BarChartDual, DonutChart, Sparkline
    ├── layout/             # AppShell, Sidebar, TopBar, AppBackground
    └── screens/            # 1 file per schermata (+ _shared/TxRow)
```

## Design system in breve

Definito in `tailwind.config.ts`:

**Colori**
- Palette pastello: `bg-lavender`, `bg-pink`, `bg-blush`, `bg-cream`, `bg-mint`
- Varianti deeper per chart e accenti: `-deep` (es. `bg-lavender-deep`)
- Scala neutra: `text-ink` (default), `text-ink-body`, `text-ink-soft`, `text-ink-muted`
- Bordi: `border-line`, `border-line-soft`
- Stati semantici: `text-success` (verde), `text-danger` (rosso muted)

**Tipografia**
- Font: `font-sans` → Sour Gummy

**Raggi**
- `rounded-sm` 10px, `rounded` 14px, `rounded-lg` 20px, `rounded-xl` 28px

**Ombre**
- `shadow-sm`, `shadow`, `shadow-lg` — soft drop
- `shadow-clay` — claymorphism (outer + inset highlight + inset bottom shadow)
- `shadow-clay-soft` — versione più leggera

## Wiring Convex

I componenti oggi leggono da `MOCK_*` in `src/lib/mock-data.ts`. Per cablare il backend:

1. Crea lo schema descritto in `convex-schema.md`
2. Genera queries/mutations (esempi nel doc)
3. Sostituisci gli import dei mock con `useQuery(api.transactions.list)`:

```tsx
// prima
import { MOCK_TRANSACTIONS } from '@/lib/mock-data';
const recent = MOCK_TRANSACTIONS.slice(0, 5);

// dopo
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
const transactions = useQuery(api.transactions.list, { month: '2026-05' }) ?? [];
const recent = transactions.slice(0, 5);
```

Per le mutation (es. salvataggio nuova transazione), passa la `onSave` callback al
`<NewTransactionModal>` da `App.tsx`:

```tsx
const createTx = useMutation(api.transactions.create);
// ...
<NewTransactionModal
  onClose={closeModal}
  onSave={async (payload) => {
    await createTx({
      type: payload.type,
      amount: Math.round(Number(payload.amount.replace(',', '.')) * 100), // centesimi
      date: '2026-05-28',
      categoryId: undefined, // mappa payload.catId → Id<'categories'>
      description: payload.desc,
      note: payload.note || undefined,
    });
  }}
/>
```

## Cosa manca / next

- Mobile responsive — sidebar collapsable, top bar mobile, sheet invece di modal su <768px
- Router vero (TanStack Router o React Router) se vuoi URL condivisibili per schermata
- Form validation (zod + react-hook-form) per la modale e impostazioni
- Dark mode — i token sono già pronti, manca solo la `<html class="dark">` strategy + override
- Convex Auth con magic link o OAuth
- Test (Vitest + Testing Library)
# budget-tracker
