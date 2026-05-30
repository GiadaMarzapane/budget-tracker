// src/components/screens/StatsScreen.tsx

import { AppShell } from '@/components/layout';
import {
  Button,
  ClayCard,
  Eyebrow,
  GlassCard,
  Icon,
  Pill,
} from '@/components/ui';
import { BarChartDual, DonutChart } from '@/components/charts';
import { DEFAULT_CATEGORIES } from '@/lib/categories';
import { MOCK_BUDGETS, MOCK_MONTHLY_FLOW } from '@/lib/mock-data';
import { PALETTE, PALETTE_DEEP } from '@/lib/palette';
import { fmtEUR } from '@/lib/format';
import type { IconName, PaletteSwatch, ScreenId } from '@/lib/types';

interface StatsScreenProps {
  go: (s: ScreenId) => void;
  openNewTx: () => void;
}

interface KpiTile {
  label: string;
  value: string;
  swatch: PaletteSwatch;
  trend: string;
}

const KPIS: KpiTile[] = [
  { label: 'Entrate',   value: '€ 3.200',  swatch: 'mint',     trend: '↑ 6%' },
  { label: 'Uscite',    value: '€ 719,50', swatch: 'blush',    trend: '↓ 14%' },
  { label: 'Risparmio', value: '€ 2.480',  swatch: 'lavender', trend: '↑ 12%' },
  { label: 'Tasso',     value: '77,5%',    swatch: 'cream',    trend: '↑ 4pt' },
];

interface SummaryRow {
  label: string;
  value: string;
  swatch: PaletteSwatch;
  icon: IconName;
}

const SUMMARY: SummaryRow[] = [
  { label: 'Entrate totali',  value: fmtEUR(3200),    swatch: 'mint',     icon: 'arrow-up' },
  { label: 'Uscite totali',   value: fmtEUR(719.50),  swatch: 'blush',    icon: 'arrow-down' },
  { label: 'Risparmio netto', value: fmtEUR(2480.50), swatch: 'lavender', icon: 'wallet' },
  { label: 'Tasso risparmio', value: '77,5%',         swatch: 'cream',    icon: 'sparkle' },
];

export function StatsScreen({ go, openNewTx }: StatsScreenProps) {
  const catTotals = DEFAULT_CATEGORIES.slice(0, 5)
    .map((c) => ({
      label: c.name,
      deep: PALETTE_DEEP[c.swatch],
      value: MOCK_BUDGETS.find((b) => b.catId === c.id)?.spent ?? 0,
    }))
    .sort((a, b) => b.value - a.value);
  const catTotal = catTotals.reduce((s, c) => s + c.value, 0);

  return (
    <AppShell
      active="stats"
      onNavigate={go}
      title="Statistiche"
      subtitle="Andamento mensile e annuale"
      onAdd={openNewTx}
      topRight={
        <Button variant="secondary" size="sm" icon="calendar">
          Maggio 2026
        </Button>
      }
    >
      {/* KPI band */}
      <div className="mb-[18px] grid grid-cols-4 gap-3.5">
        {KPIS.map((kpi, i) => (
          <ClayCard key={i} swatch={kpi.swatch} soft className="!p-4">
            <Eyebrow>{kpi.label}</Eyebrow>
            <div className="mt-1 text-[26px] font-bold tracking-tight">{kpi.value}</div>
            <Pill color="rgba(255,255,255,0.65)" size="sm" className="mt-1.5">
              <span className="font-bold text-success">{kpi.trend}</span>
            </Pill>
          </ClayCard>
        ))}
      </div>

      {/* 2-col body */}
      <div className="grid auto-rows-auto grid-cols-[1.6fr_1fr] gap-[18px]">
        {/* Bar chart */}
        <GlassCard hi className="!p-[22px]">
          <div className="flex items-start justify-between">
            <div>
              <Eyebrow>Entrate vs Uscite</Eyebrow>
              <div className="mt-1 text-lg font-bold">Ultimi 7 mesi</div>
            </div>
            <div className="flex items-center gap-3">
              <Legend color={PALETTE_DEEP.mint} label="Entrate" />
              <Legend color={PALETTE_DEEP.blush} label="Uscite" />
            </div>
          </div>
          <div className="mt-4">
            <BarChartDual data={MOCK_MONTHLY_FLOW.slice(-7)} width={640} height={240} />
          </div>
        </GlassCard>

        {/* Riepilogo */}
        <GlassCard hi className="!p-[22px]">
          <div className="text-base font-bold">Riepilogo mese</div>
          <div className="mt-3.5 flex flex-col gap-2.5">
            {SUMMARY.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md px-3.5 py-3 shadow-clay-soft"
                style={{ background: PALETTE[row.swatch] }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white/60">
                    <Icon name={row.icon} size={14} />
                  </div>
                  <span className="text-xs font-semibold">{row.label}</span>
                </div>
                <span className="text-sm font-bold">{row.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Insight card */}
        <GlassCard hi className="!p-[22px]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-bold">Insight del mese</div>
              <div className="mt-0.5 text-xs text-ink-soft">Cosa è successo a maggio</div>
            </div>
            <Pill color={PALETTE.lavender} icon="sparkle">
              auto
            </Pill>
          </div>
          <div className="mt-3.5 grid grid-cols-2 gap-2.5">
            <ClayCard swatch="mint" soft className="!p-3.5">
              <Eyebrow>Spesa più alta</Eyebrow>
              <div className="mt-1 text-lg font-bold">{fmtEUR(750, { showCents: false })}</div>
              <div className="mt-0.5 text-[11px] text-ink-body">Affitto · 20 maggio</div>
            </ClayCard>
            <ClayCard swatch="pink" soft className="!p-3.5">
              <Eyebrow>Giorno più costoso</Eyebrow>
              <div className="mt-1 text-lg font-bold">20 mag</div>
              <div className="mt-0.5 text-[11px] text-ink-body">{fmtEUR(812.4)} totali</div>
            </ClayCard>
            <ClayCard swatch="cream" soft className="!p-3.5">
              <Eyebrow>Categoria in crescita</Eyebrow>
              <div className="mt-1 flex items-center gap-1.5">
                <Icon name="food" size={16} />
                <div className="text-[15px] font-bold">Cibo</div>
              </div>
              <div className="mt-0.5 text-[11px] font-semibold text-danger">↑ 18% vs aprile</div>
            </ClayCard>
            <ClayCard swatch="lavender" soft className="!p-3.5">
              <Eyebrow>Risparmio extra</Eyebrow>
              <div className="mt-1 text-lg font-bold">{fmtEUR(265, { showCents: false })}</div>
              <div className="mt-0.5 text-[11px] text-ink-body">
                vs media degli ultimi 3 mesi
              </div>
            </ClayCard>
          </div>
        </GlassCard>

        {/* Donut */}
        <GlassCard hi className="!p-[22px]">
          <div className="text-base font-bold">Distribuzione categorie</div>
          <div className="mt-4 flex items-center gap-[18px]">
            <DonutChart
              size={170}
              thickness={26}
              data={catTotals.map((c) => ({ value: c.value, color: c.deep }))}
            >
              <div className="text-[11px] font-semibold text-ink-soft">SPESO</div>
              <div className="text-lg font-bold">{fmtEUR(catTotal, { showCents: false })}</div>
            </DonutChart>
            <div className="flex flex-1 flex-col gap-2">
              {catTotals.map((c, i) => {
                const pct = Math.round((c.value / catTotal) * 100);
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: c.deep }} />
                      <span className="text-xs font-medium">{c.label}</span>
                    </div>
                    <span className="text-xs font-bold text-ink-body">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-3 w-3 rounded" style={{ background: color }} />
      <span className="text-[11px] font-semibold text-ink-body">{label}</span>
    </div>
  );
}
