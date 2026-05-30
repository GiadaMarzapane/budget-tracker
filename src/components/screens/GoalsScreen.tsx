// src/components/screens/GoalsScreen.tsx

import { AppShell } from '@/components/layout';
import {
  Button,
  ClayCard,
  Icon,
  IconButton,
  Pill,
  Progress,
} from '@/components/ui';
import { MOCK_GOALS } from '@/lib/mock-data';
import { PALETTE } from '@/lib/palette';
import { fmtEUR } from '@/lib/format';
import type { ScreenId } from '@/lib/types';

interface GoalsScreenProps {
  go: (s: ScreenId) => void;
  openNewTx: () => void;
}

export function GoalsScreen({ go, openNewTx }: GoalsScreenProps) {
  return (
    <AppShell
      active="goals"
      onNavigate={go}
      title="Obiettivi"
      subtitle="I tuoi piani di risparmio"
      onAdd={openNewTx}
    >
      <div className="grid grid-cols-3 gap-[18px]">
        {MOCK_GOALS.map((g) => {
          const pct = g.amount / g.target;
          return (
            <ClayCard
              key={g.id}
              swatch={g.swatch}
              className="!p-[22px]"
              style={{ borderRadius: 22, minHeight: 240 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white shadow-clay-soft">
                  <Icon name={g.icon} size={22} />
                </div>
                <Pill color="rgba(255,255,255,0.6)" size="sm" icon="repeat">
                  €{g.monthly}/mese
                </Pill>
              </div>
              <div className="mt-4">
                <div className="text-lg font-bold">{g.name}</div>
                <div className="mt-0.5 text-xs text-ink-body">entro {g.deadline}</div>
              </div>
              <div className="mt-4">
                <Progress value={pct} color="#fff" bg="rgba(255,255,255,0.5)" h={12} />
                <div className="mt-2 flex items-baseline justify-between">
                  <div className="text-base font-bold">{fmtEUR(g.amount, { showCents: false })}</div>
                  <div className="text-xs text-ink-body">
                    {Math.round(pct * 100)}% di {fmtEUR(g.target, { showCents: false })}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-1.5">
                <Button variant="primary" size="sm" icon="plus" full style={{ background: '#2a2433' }}>
                  Versa
                </Button>
                <IconButton name="dots" size={36} />
              </div>
            </ClayCard>
          );
        })}

        {/* Add new goal card */}
        <button
          className="flex min-h-[240px] flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-dashed border-line bg-white/40 p-[22px] text-[13px] font-semibold text-ink-soft backdrop-blur-md transition-all hover:border-ink hover:bg-white/70"
          style={{ borderRadius: 22 }}
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-clay-soft"
            style={{ color: PALETTE.lavender }}
          >
            <Icon name="plus" size={26} className="text-ink" />
          </div>
          <div>Nuovo obiettivo</div>
          <div className="max-w-[200px] text-center text-[11px] text-ink-muted">
            Vacanze, gadget, fondi: imposta un target e versa ogni mese.
          </div>
        </button>
      </div>
    </AppShell>
  );
}
