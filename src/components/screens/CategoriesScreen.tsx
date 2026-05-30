// src/components/screens/CategoriesScreen.tsx

import { AppShell } from '@/components/layout';
import {
  Button,
  ClayCard,
  Eyebrow,
  GlassCard,
  Icon,
  IconButton,
  Progress,
  Segmented,
} from '@/components/ui';
import { CATEGORY_BY_ID } from '@/lib/categories';
import { MOCK_BUDGETS, MOCK_TRANSACTIONS } from '@/lib/mock-data';
import { PALETTE, PALETTE_DEEP } from '@/lib/palette';
import { fmtEUR } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { ScreenId } from '@/lib/types';

interface CategoriesScreenProps {
  go: (s: ScreenId) => void;
  openNewTx: () => void;
}

export function CategoriesScreen({ go, openNewTx }: CategoriesScreenProps) {
  const totalSpent = MOCK_BUDGETS.reduce((s, b) => s + b.spent, 0);
  const totalBudget = MOCK_BUDGETS.reduce((s, b) => s + b.budget, 0);

  return (
    <AppShell
      active="categories"
      onNavigate={go}
      title="Categorie & Budget"
      subtitle="Limiti mensili e categorie spesa"
      onAdd={openNewTx}
      topRight={
        <Button variant="secondary" size="sm" icon="plus">
          Categoria
        </Button>
      }
    >
      <div className="grid grid-cols-[2fr_1fr] gap-[18px]">
        <GlassCard hi className="!p-[22px]">
          <div className="flex items-center justify-between">
            <div className="text-base font-bold">Le tue categorie</div>
            <Segmented<'mag' | 'apr' | 'mar'>
              value="mag"
              options={[
                { value: 'mag', label: 'Maggio' },
                { value: 'apr', label: 'Aprile' },
                { value: 'mar', label: 'Marzo' },
              ]}
              onChange={() => {}}
            />
          </div>

          <div className="mt-3.5 flex flex-col gap-2.5">
            {MOCK_BUDGETS.map((b) => {
              const cat = CATEGORY_BY_ID[b.catId];
              const pct = b.spent / b.budget;
              const over = pct > 0.9;
              const txCount = MOCK_TRANSACTIONS.filter((t) => t.cat === cat.id).length;
              return (
                <div
                  key={b.catId}
                  className="grid grid-cols-[200px_1fr_auto] items-center gap-[18px] rounded-md border border-line-soft bg-white px-4 py-3.5 shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-[38px] w-[38px] items-center justify-center rounded-md shadow-clay-soft"
                      style={{ background: PALETTE[cat.swatch] }}
                    >
                      <Icon name={cat.icon} size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{cat.name}</div>
                      <div className="text-[11px] text-ink-soft">{txCount} transazioni</div>
                    </div>
                  </div>
                  <div>
                    <Progress
                      value={pct}
                      color={over ? PALETTE_DEEP.blush : PALETTE_DEEP[cat.swatch]}
                      h={10}
                    />
                    <div className="mt-1.5 flex justify-between">
                      <div className="text-xs font-medium text-ink-body">
                        <b className="text-ink">{fmtEUR(b.spent, { showCents: false })}</b> di{' '}
                        {fmtEUR(b.budget, { showCents: false })}
                      </div>
                      <div
                        className={cn(
                          'text-xs font-semibold',
                          over ? 'text-danger' : 'text-ink-soft',
                        )}
                      >
                        {over ? '⚠ vicino al limite' : `${Math.round(pct * 100)}% usato`}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <IconButton name="edit" size={32} ariaLabel="Modifica" />
                    <IconButton name="dots" size={32} ariaLabel="Altro" />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Right side */}
        <div className="flex flex-col gap-3.5">
          <ClayCard swatch="cream">
            <Eyebrow>Budget totale</Eyebrow>
            <div className="mt-1.5 text-[32px] font-bold">
              {fmtEUR(totalSpent, { showCents: false })}
            </div>
            <div className="text-xs text-ink-body">
              su {fmtEUR(totalBudget, { showCents: false })} mensili
            </div>
            <Progress
              value={totalSpent / totalBudget}
              color={PALETTE_DEEP.mint}
              bg="rgba(255,255,255,0.5)"
              h={12}
              className="mt-3"
            />
            <div className="mt-2 text-[11px] font-semibold text-ink-body">
              {Math.round((totalSpent / totalBudget) * 100)}% del budget mensile
            </div>
          </ClayCard>

          <GlassCard hi className="!p-5">
            <div className="flex items-center gap-2">
              <Icon name="sparkle" size={18} style={{ color: PALETTE_DEEP.lavender }} />
              <div className="text-[15px] font-bold">Consigli</div>
            </div>
            <div className="mt-3 flex flex-col gap-2.5">
              <ClayCard swatch="blush" soft className="!p-3">
                <div className="text-xs font-bold">Abbonamenti quasi al limite</div>
                <div className="mt-0.5 text-[11px] text-ink-body">
                  Hai speso il 95% di € 100 questo mese.
                </div>
              </ClayCard>
              <ClayCard swatch="mint" soft className="!p-3">
                <div className="text-xs font-bold">Bene su Trasporti!</div>
                <div className="mt-0.5 text-[11px] text-ink-body">
                  Solo il 71% del budget usato.
                </div>
              </ClayCard>
              <ClayCard swatch="lavender" soft className="!p-3">
                <div className="text-xs font-bold">Aumenta il budget Casa?</div>
                <div className="mt-0.5 text-[11px] text-ink-body">
                  Negli ultimi 3 mesi hai sempre sforato.
                </div>
              </ClayCard>
            </div>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
