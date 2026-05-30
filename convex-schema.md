# Schema dati Convex — Budget Tracker

Schema **generico** per il backend Convex. Tutti i documenti sono per-utente
(`userId` su ogni riga) — Convex usa un singolo namespace, quindi è
l'applicazione a garantire l'isolamento via filtri/index.

Le `mutations`/`queries` devono sempre verificare `ctx.auth.getUserIdentity()`
e filtrare per `userId`. Vedi `convex/auth.ts` per il pattern.

---

## Tabelle

### `users`
Profilo applicativo. Lo crei alla prima login (Convex Auth ti dà già
`tokenIdentifier` univoco, qui aggiungi i metadati di prodotto).

| Campo            | Tipo                                    | Note                              |
|------------------|-----------------------------------------|-----------------------------------|
| `tokenIdentifier`| `string`                                | da `ctx.auth.getUserIdentity()`   |
| `email`          | `string`                                |                                   |
| `name`           | `string`                                |                                   |
| `avatarUrl?`     | `string`                                |                                   |
| `currency`       | `"EUR" \| "USD" \| "GBP"`               | default `"EUR"`                   |
| `locale`         | `string`                                | default `"it-IT"`                 |
| `weekStart`      | `"mon" \| "sun"`                        | default `"mon"`                   |
| `theme`          | `"light" \| "dark" \| "auto"`           | default `"light"`                 |
| `createdAt`      | `number`                                | `Date.now()`                      |

**Index**: `by_token` su `tokenIdentifier`.

---

### `categories`
Categorie di spesa. Ne crei alcune di sistema al primo accesso (`isSystem: true`)
e l'utente può aggiungerne altre.

| Campo       | Tipo                                                                                              | Note                                                  |
|-------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| `userId`    | `id("users")`                                                                                     |                                                       |
| `name`      | `string`                                                                                          | es. `"Cibo"`                                          |
| `slug`      | `string`                                                                                          | es. `"food"` — usato nel codice (matcha `CategoryId`) |
| `swatch`    | `"lavender" \| "pink" \| "blush" \| "cream" \| "mint"`                                            | colore pastello                                       |
| `icon`      | `string`                                                                                          | nome icona (vedi `IconName` lato frontend)            |
| `isSystem`  | `boolean`                                                                                         | `true` per le predefinite                             |
| `archivedAt?`| `number`                                                                                         | soft-delete                                           |
| `order?`    | `number`                                                                                          | per drag-reorder                                      |

**Index**: `by_user` su `userId`, `by_user_slug` su `["userId","slug"]`.

---

### `transactions`
Movimenti. `amount` è sempre **positivo**; il segno è dato da `type`.

| Campo         | Tipo                            | Note                                                         |
|---------------|---------------------------------|--------------------------------------------------------------|
| `userId`      | `id("users")`                   |                                                              |
| `type`        | `"in" \| "out"`                 | entrata / uscita                                             |
| `amount`      | `number`                        | sempre positivo, in centesimi consigliato (`4820` = €48,20)  |
| `currency`    | `string`                        | snapshot di `users.currency` al momento del salvataggio      |
| `date`        | `string`                        | ISO `"YYYY-MM-DD"` — separato da `createdAt` per editing UI  |
| `categoryId?` | `id("categories")`              | `null` per entrate o transazioni non categorizzate           |
| `description` | `string`                        |                                                              |
| `note?`       | `string`                        |                                                              |
| `recurringId?`| `id("recurringRules")`          | popolato se la transazione è generata da una regola          |
| `createdAt`   | `number`                        | `Date.now()` — usato per ordinamento secondario              |

**Index**:
- `by_user_date` su `["userId","date"]` — per timeline & paginazione
- `by_user_category` su `["userId","categoryId"]`
- `by_user_recurring` su `["userId","recurringId"]`

---

### `recurringRules`
Regole di ricorrenza. Un job notturno (Convex Scheduled Function) materializza
le transazioni `due` quel giorno.

| Campo            | Tipo                                       | Note                                                |
|------------------|--------------------------------------------|-----------------------------------------------------|
| `userId`         | `id("users")`                              |                                                     |
| `type`           | `"in" \| "out"`                            |                                                     |
| `amount`         | `number`                                   | sempre positivo                                     |
| `categoryId?`    | `id("categories")`                         |                                                     |
| `description`    | `string`                                   |                                                     |
| `frequency`      | `"daily" \| "weekly" \| "monthly" \| "yearly"` |                                                  |
| `interval`       | `number`                                   | es. `1` = ogni periodo, `2` = ogni 2 periodi        |
| `dayOfMonth?`    | `number`                                   | per `monthly` (1..31)                               |
| `dayOfWeek?`     | `number`                                   | per `weekly` (0=dom..6=sab)                         |
| `startDate`      | `string`                                   | ISO                                                 |
| `endDate?`       | `string`                                   |                                                     |
| `nextRun`        | `string`                                   | data prossima esecuzione — letta dal cron job       |
| `active`         | `boolean`                                  |                                                     |

**Index**: `by_user` su `userId`, `by_active_nextRun` su `["active","nextRun"]`.

---

### `budgets`
Budget mensile per categoria. Un record per (`userId`, `categoryId`, `month`).
Se non esiste per il mese corrente, copia quello del mese precedente.

| Campo        | Tipo               | Note                                              |
|--------------|--------------------|---------------------------------------------------|
| `userId`     | `id("users")`      |                                                   |
| `categoryId` | `id("categories")` |                                                   |
| `month`      | `string`           | `"YYYY-MM"` — chiave di partizione                |
| `amount`     | `number`           | budget in centesimi                               |

**Index**: `by_user_month` su `["userId","month"]`,
`by_user_cat_month` su `["userId","categoryId","month"]`.

---

### `goals`
Obiettivi di risparmio. `currentAmount` viene aggiornato da `goalDeposits`.

| Campo           | Tipo                                                  | Note                                          |
|-----------------|-------------------------------------------------------|-----------------------------------------------|
| `userId`        | `id("users")`                                         |                                               |
| `name`          | `string`                                              |                                               |
| `targetAmount`  | `number`                                              | centesimi                                     |
| `currentAmount` | `number`                                              | centesimi — somma dei depositi                |
| `monthlyAmount?`| `number`                                              | versamento automatico mensile suggerito       |
| `deadline?`     | `string`                                              | ISO                                           |
| `swatch`        | `"lavender" \| "pink" \| "blush" \| "cream" \| "mint"`|                                               |
| `icon`          | `string`                                              | nome icona                                    |
| `completedAt?`  | `number`                                              |                                               |
| `archivedAt?`   | `number`                                              | soft-delete                                   |
| `createdAt`     | `number`                                              |                                               |

**Index**: `by_user` su `userId`.

---

### `goalDeposits`
Storico versamenti su un obiettivo. Tenerli separati permette di mostrare il
timeline "+€200 il 15 mag" e di rollback singoli.

| Campo     | Tipo            | Note                                         |
|-----------|-----------------|----------------------------------------------|
| `userId`  | `id("users")`   |                                              |
| `goalId`  | `id("goals")`   |                                              |
| `amount`  | `number`        | centesimi                                    |
| `date`    | `string`        | ISO                                          |
| `note?`   | `string`        |                                              |

**Index**: `by_goal_date` su `["goalId","date"]`.

---

## Esempio `convex/schema.ts`

```ts
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const swatch = v.union(
  v.literal('lavender'),
  v.literal('pink'),
  v.literal('blush'),
  v.literal('cream'),
  v.literal('mint'),
);

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    email: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
    currency: v.union(v.literal('EUR'), v.literal('USD'), v.literal('GBP')),
    locale: v.string(),
    weekStart: v.union(v.literal('mon'), v.literal('sun')),
    theme: v.union(v.literal('light'), v.literal('dark'), v.literal('auto')),
    createdAt: v.number(),
  }).index('by_token', ['tokenIdentifier']),

  categories: defineTable({
    userId: v.id('users'),
    name: v.string(),
    slug: v.string(),
    swatch,
    icon: v.string(),
    isSystem: v.boolean(),
    archivedAt: v.optional(v.number()),
    order: v.optional(v.number()),
  })
    .index('by_user', ['userId'])
    .index('by_user_slug', ['userId', 'slug']),

  transactions: defineTable({
    userId: v.id('users'),
    type: v.union(v.literal('in'), v.literal('out')),
    amount: v.number(),
    currency: v.string(),
    date: v.string(),
    categoryId: v.optional(v.id('categories')),
    description: v.string(),
    note: v.optional(v.string()),
    recurringId: v.optional(v.id('recurringRules')),
    createdAt: v.number(),
  })
    .index('by_user_date', ['userId', 'date'])
    .index('by_user_category', ['userId', 'categoryId'])
    .index('by_user_recurring', ['userId', 'recurringId']),

  recurringRules: defineTable({
    userId: v.id('users'),
    type: v.union(v.literal('in'), v.literal('out')),
    amount: v.number(),
    categoryId: v.optional(v.id('categories')),
    description: v.string(),
    frequency: v.union(
      v.literal('daily'),
      v.literal('weekly'),
      v.literal('monthly'),
      v.literal('yearly'),
    ),
    interval: v.number(),
    dayOfMonth: v.optional(v.number()),
    dayOfWeek: v.optional(v.number()),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    nextRun: v.string(),
    active: v.boolean(),
  })
    .index('by_user', ['userId'])
    .index('by_active_nextRun', ['active', 'nextRun']),

  budgets: defineTable({
    userId: v.id('users'),
    categoryId: v.id('categories'),
    month: v.string(),
    amount: v.number(),
  })
    .index('by_user_month', ['userId', 'month'])
    .index('by_user_cat_month', ['userId', 'categoryId', 'month']),

  goals: defineTable({
    userId: v.id('users'),
    name: v.string(),
    targetAmount: v.number(),
    currentAmount: v.number(),
    monthlyAmount: v.optional(v.number()),
    deadline: v.optional(v.string()),
    swatch,
    icon: v.string(),
    completedAt: v.optional(v.number()),
    archivedAt: v.optional(v.number()),
    createdAt: v.number(),
  }).index('by_user', ['userId']),

  goalDeposits: defineTable({
    userId: v.id('users'),
    goalId: v.id('goals'),
    amount: v.number(),
    date: v.string(),
    note: v.optional(v.string()),
  }).index('by_goal_date', ['goalId', 'date']),
});
```

---

## Esempi query/mutation

```ts
// convex/transactions.ts
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { getCurrentUser } from './auth';

export const list = query({
  args: { month: v.optional(v.string()) }, // "YYYY-MM"
  handler: async (ctx, { month }) => {
    const user = await getCurrentUser(ctx);
    let q = ctx.db
      .query('transactions')
      .withIndex('by_user_date', (q) => q.eq('userId', user._id))
      .order('desc');
    if (month) {
      q = q.filter((q) =>
        q.and(q.gte(q.field('date'), `${month}-01`), q.lte(q.field('date'), `${month}-31`)),
      );
    }
    return await q.take(100);
  },
});

export const create = mutation({
  args: {
    type: v.union(v.literal('in'), v.literal('out')),
    amount: v.number(),
    date: v.string(),
    categoryId: v.optional(v.id('categories')),
    description: v.string(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    return await ctx.db.insert('transactions', {
      userId: user._id,
      currency: user.currency,
      createdAt: Date.now(),
      ...args,
    });
  },
});
```

```ts
// convex/auth.ts
import type { QueryCtx, MutationCtx } from './_generated/server';

export async function getCurrentUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error('Not authenticated');
  const user = await ctx.db
    .query('users')
    .withIndex('by_token', (q) => q.eq('tokenIdentifier', identity.tokenIdentifier))
    .unique();
  if (!user) throw new Error('User not found');
  return user;
}
```

---

## Note sui valori monetari

Lo schema usa `number` ma è consigliato **memorizzare in centesimi** (interi):
- evita errori di virgola mobile su somme e divisioni
- semplifica il porting a una valuta diversa
- la UI converte solo al render con `fmtEUR(amount / 100)`

Se preferisci mantenere `number` con decimali, OK — assicurati però di
arrotondare a 2 cifre al momento dell'insert.

## Note sull'auth

Convex Auth (o un provider esterno come Clerk/Auth0) popola
`ctx.auth.getUserIdentity()`. La prima `mutation` chiamata dall'utente deve
creare il record `users` se non esiste (pattern "upsert by token").
