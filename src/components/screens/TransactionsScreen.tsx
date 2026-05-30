// src/components/screens/TransactionsScreen.tsx

import { useState } from 'react';
import { AppShell } from '@/components/layout';
import {
  Button,
  CategoryChip,
  Checkbox,
  FlatCard,
  Icon,
  IconButton,
  Pill,
  SearchInput,
  Segmented,
} from '@/components/ui';
import { CATEGORY_BY_ID } from '@/lib/categories';
import { MOCK_TRANSACTIONS } from '@/lib/mock-data';
import { PALETTE } from '@/lib/palette';
import { fmtDate, fmtEUR } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { ScreenId } from '@/lib/types';

type TxFilter = 'all' | 'in' | 'out' | 'rec';

interface TransactionsScreenProps {
  go: (s: ScreenId) => void;
  openNewTx: () => void;
}

export function TransactionsScreen({ go, openNewTx }: TransactionsScreenProps) {
  const [filter, setFilter] = useState<TxFilter>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const rows = MOCK_TRANSACTIONS.filter((t) => {
    if (filter === 'in' && !t.income) return false;
    if (filter === 'out' && t.income) return false;
    if (filter === 'rec' && !t.recurring) return false;
    if (search && !t.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleAll = (v: boolean) => setSelected(v ? new Set(rows.map((r) => r.id)) : new Set());
  const toggleOne = (id: string, v: boolean) => {
    const next = new Set(selected);
    if (v) next.add(id);
    else next.delete(id);
    setSelected(next);
  };

  return (
    <AppShell
      active="tx"
      onNavigate={go}
      title="Transazioni"
      subtitle="Tutte le movimentazioni"
      onAdd={openNewTx}
    >
      <FlatCard className="!p-0" style={{ borderRadius: 20, overflow: 'hidden' }}>
        {/* Filter bar */}
        <div className="flex items-center gap-2.5 border-b border-line p-4">
          <div className="w-[260px]">
            <SearchInput value={search} onChange={setSearch} placeholder="Cerca per descrizione…" />
          </div>
          <Segmented<TxFilter>
            value={filter}
            options={[
              { value: 'all', label: 'Tutte' },
              { value: 'in', label: 'Entrate' },
              { value: 'out', label: 'Uscite' },
              { value: 'rec', label: 'Ricorrenti' },
            ]}
            onChange={setFilter}
          />
          <Button variant="secondary" size="sm" icon="calendar">
            Maggio 2026
          </Button>
          <Button variant="secondary" size="sm" icon="filter">
            Categorie
          </Button>
          <div className="ml-auto flex gap-2">
            <Button variant="secondary" size="sm" icon="download">
              Esporta CSV
            </Button>
          </div>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[40px_2.2fr_1fr_0.9fr_1fr_80px_40px] gap-3.5 border-b border-line px-[18px] py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
          <span>
            <Checkbox checked={selected.size === rows.length && rows.length > 0} onChange={toggleAll} />
          </span>
          <span>Descrizione</span>
          <span>Categoria</span>
          <span>Data ▾</span>
          <span className="text-right">Importo</span>
          <span>Ricor.</span>
          <span />
        </div>

        {/* Rows */}
        <div>
          {rows.map((tx, i) => {
            const cat = tx.cat ? CATEGORY_BY_ID[tx.cat] : null;
            const sel = selected.has(tx.id);
            return (
              <div
                key={tx.id}
                className={cn(
                  'grid grid-cols-[40px_2.2fr_1fr_0.9fr_1fr_80px_40px] items-center gap-3.5 px-[18px] py-3 transition-colors',
                  i < rows.length - 1 && 'border-b border-line-soft',
                )}
                style={{ background: sel ? `${PALETTE.lavender}55` : 'transparent' }}
              >
                <Checkbox checked={sel} onChange={(v) => toggleOne(tx.id, v)} />
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-md shadow-clay-soft"
                    style={{ background: tx.income ? PALETTE.mint : cat ? PALETTE[cat.swatch] : '#eee' }}
                  >
                    {tx.income ? (
                      <Icon name="arrow-up" size={16} strokeWidth={2.2} className="text-success" />
                    ) : (
                      <Icon name={cat?.icon ?? 'wallet'} size={16} />
                    )}
                  </div>
                  <div className="text-[13px] font-medium">{tx.desc}</div>
                </div>
                {tx.income ? (
                  <Pill color={PALETTE.mint} size="sm">
                    entrata
                  </Pill>
                ) : cat ? (
                  <CategoryChip catId={tx.cat as string} size="sm" />
                ) : null}
                <div className="text-xs text-ink-soft">{fmtDate(tx.date)}</div>
                <div
                  className={cn(
                    'tnum text-right text-sm font-bold',
                    tx.income ? 'text-success' : 'text-ink',
                  )}
                >
                  {fmtEUR(tx.amount, { showSign: tx.income })}
                </div>
                <div>
                  {tx.recurring ? (
                    <Pill color={PALETTE.cream} size="sm" icon="repeat">
                      mens.
                    </Pill>
                  ) : (
                    <span className="text-ink-muted">—</span>
                  )}
                </div>
                <IconButton name="dots" size={28} variant="ghost" />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-line px-[18px] py-3.5">
          <div className="text-xs text-ink-soft">
            1–{rows.length} di {MOCK_TRANSACTIONS.length}
          </div>
          <div className="flex gap-1">
            <IconButton name="chevron-right" size={32} style={{ transform: 'rotate(180deg)' }} />
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-lavender text-[13px] font-bold text-ink shadow-sm">
              1
            </button>
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[13px] font-semibold text-ink-body">
              2
            </button>
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[13px] font-semibold text-ink-body">
              3
            </button>
            <IconButton name="chevron-right" size={32} />
          </div>
        </div>
      </FlatCard>
    </AppShell>
  );
}
