// src/components/screens/_shared/TxRow.tsx
// Compact transaction row used in the dashboard's "recent" list.

import type { Transaction } from '@/lib/types';
import { CATEGORY_BY_ID } from '@/lib/categories';
import { PALETTE } from '@/lib/palette';
import { fmtDate, fmtEUR } from '@/lib/format';
import { Icon, Pill } from '@/components/ui';
import { cn } from '@/lib/utils';

interface TxRowProps {
  tx: Transaction;
  divider?: boolean;
}

export function TxRow({ tx, divider }: TxRowProps) {
  const cat = tx.cat ? CATEGORY_BY_ID[tx.cat] : null;
  return (
    <div
      className={cn(
        'grid grid-cols-[40px_1fr_auto_auto] items-center gap-3.5 py-3',
        divider && 'border-t border-line-soft',
      )}
    >
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
      <div>
        <div className="text-[13px] font-semibold">{tx.desc}</div>
        <div className="mt-0.5 text-[11px] text-ink-soft">
          {tx.income ? 'Entrata' : cat?.name ?? 'Altro'} · {fmtDate(tx.date)}
        </div>
      </div>
      {tx.recurring ? (
        <Pill size="sm" icon="repeat" color={PALETTE.cream}>
          mens.
        </Pill>
      ) : (
        <span />
      )}
      <div
        className={cn(
          'tnum text-sm font-bold',
          tx.income ? 'text-success' : 'text-ink',
        )}
      >
        {fmtEUR(tx.amount, { showSign: tx.income })}
      </div>
    </div>
  );
}
