// src/components/screens/DashboardScreen.tsx

import { AppShell } from '@/components/layout';
import {
  Button,
  ClayCard,
  Eyebrow,
  GlassCard,
  Icon,
  Pill,
  Progress,
  Ring,
  Segmented,
} from '@/components/ui';
import { DonutChart, LineChartSmooth, Sparkline } from '@/components/charts';
import { DEFAULT_CATEGORIES } from '@/lib/categories';
import { MOCK_MONTHLY_FLOW, MOCK_TRANSACTIONS } from '@/lib/mock-data';
import { PALETTE, PALETTE_DEEP } from '@/lib/palette';
import { fmtEUR } from '@/lib/format';
import { TxRow } from './_shared/TxRow';
import type { ScreenId } from '@/lib/types';

interface DashboardScreenProps {
  go: (s: ScreenId) => void;
  openNewTx: () => void;
}

export function DashboardScreen({ go, openNewTx }: DashboardScreenProps) {
  const recent = MOCK_TRANSACTIONS.slice(0, 5);
  const flowData = MOCK_MONTHLY_FLOW.map((m) => ({
    label: m.month,
    value: m.in - m.out,
  }));
  const catTotals = DEFAULT_CATEGORIES.slice(0, 5)
    .map((c) => ({
      label: c.name,
      value: MOCK_TRANSACTIONS.filter((t) => t.cat === c.id).reduce(
        (s, t) => s + Math.abs(t.amount),
        0,
      ),
      color: PALETTE[c.swatch],
      deep: PALETTE_DEEP[c.swatch],
    }))
    .sort((a, b) => b.value - a.value);
  const catTotal = catTotals.reduce((s, c) => s + c.value, 0);

  return (
    <AppShell
      active="dashboard"
      onNavigate={go}
      title="Ciao Marco 👋"
      subtitle="Dashboard · maggio 2026"
      onAdd={openNewTx}
    >
      <div className="grid grid-cols-[1.5fr_1fr] gap-[18px]">
        {/* Hero balance */}
        <ClayCard swatch="lavender" className="!p-7" style={{ borderRadius: 24 }}>
          <div className="flex items-start justify-between">
            <div>
              <Eyebrow>Saldo del mese</Eyebrow>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <div className="text-[52px] font-bold leading-none tracking-[-1px]">€ 2.480</div>
                <div className="text-2xl font-semibold text-ink-body">,50</div>
              </div>
              <div className="mt-4 flex gap-2.5">
                <Pill color="rgba(255,255,255,0.6)" icon="arrow-up">
                  Entrate <b className="ml-1">{fmtEUR(3200, { showCents: false })}</b>
                </Pill>
                <Pill color="rgba(255,255,255,0.6)" icon="arrow-down">
                  Uscite <b className="ml-1">{fmtEUR(719.5)}</b>
                </Pill>
              </div>
            </div>
            <Ring value={0.776} size={88} stroke={9} color="#2a2433" bg="rgba(255,255,255,0.5)">
              <div className="text-lg font-bold">77%</div>
              <div className="text-[9px] uppercase tracking-wide text-ink-body">risp.</div>
            </Ring>
          </div>
          <div className="mt-5 flex gap-2">
            <Button variant="primary" icon="plus" onClick={openNewTx}>
              Aggiungi spesa
            </Button>
            <Button variant="secondary" onClick={() => go('stats')}>
              Vedi report
            </Button>
          </div>
        </ClayCard>

        {/* KPI grid */}
        <div className="grid grid-cols-2 gap-3">
          <ClayCard swatch="mint" soft className="!p-4">
            <Eyebrow>Media / giorno</Eyebrow>
            <div className="mt-1 text-[22px] font-bold">{fmtEUR(23.98)}</div>
            <Sparkline data={[8, 12, 9, 15, 10, 18, 14, 20, 13]} width={120} height={22} color="#9dd190" />
          </ClayCard>
          <ClayCard swatch="pink" soft className="!p-4">
            <Eyebrow>Top categoria</Eyebrow>
            <div className="mt-1.5 flex items-center gap-1.5">
              <Icon name="food" size={18} />
              <div className="text-base font-bold">Cibo</div>
            </div>
            <div className="mt-1 text-xs text-ink-body">{fmtEUR(218, { showCents: false })} questo mese</div>
          </ClayCard>
          <ClayCard swatch="blush" soft className="!p-4">
            <Eyebrow>Budget usato</Eyebrow>
            <div className="mt-1 text-[22px] font-bold">71%</div>
            <Progress value={0.71} color="#fff" bg="rgba(255,255,255,0.5)" h={8} className="mt-1.5" />
          </ClayCard>
          <ClayCard swatch="cream" soft className="!p-4">
            <Eyebrow>Risparmio</Eyebrow>
            <div className="mt-1 text-[22px] font-bold">{fmtEUR(850, { showCents: false })}</div>
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-ink-body">
              <Icon name="arrow-up" size={11} className="text-success" />
              <span className="font-semibold text-success">+12%</span> vs mese scorso
            </div>
          </ClayCard>
        </div>

        {/* Line chart */}
        <GlassCard hi className="!p-[22px]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-bold">Andamento ultimi 9 mesi</div>
              <div className="mt-0.5 text-xs text-ink-soft">Risparmio netto per mese</div>
            </div>
            <Segmented<'mese' | 'anno'>
              value="anno"
              options={[
                { value: 'mese', label: 'Mese' },
                { value: 'anno', label: 'Anno' },
              ]}
              onChange={() => {}}
            />
          </div>
          <div className="mt-4">
            <LineChartSmooth data={flowData} width={560} height={210} color="#b89be0" fillColor="#e8d7ff" />
          </div>
        </GlassCard>

        {/* Donut categories */}
        <GlassCard hi className="!p-[22px]">
          <div className="flex items-center justify-between">
            <div className="text-base font-bold">Spese per categoria</div>
            <Button variant="ghost" size="sm" iconRight="arrow-right" onClick={() => go('categories')}>
              dettagli
            </Button>
          </div>
          <div className="mt-3.5 flex items-center gap-5">
            <DonutChart size={150} thickness={22} data={catTotals.map((c) => ({ value: c.value, color: c.deep }))}>
              <div className="text-[11px] font-semibold text-ink-soft">TOTALE</div>
              <div className="text-lg font-bold">{fmtEUR(catTotal, { showCents: false })}</div>
            </DonutChart>
            <div className="flex flex-1 flex-col gap-2">
              {catTotals.slice(0, 5).map((c, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: c.deep }} />
                    <span className="text-xs font-medium">{c.label}</span>
                  </div>
                  <span className="text-xs font-bold text-ink-body">{fmtEUR(c.value, { showCents: false })}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Recent transactions full width */}
        <GlassCard hi className="col-span-full !p-[22px]">
          <div className="flex items-center justify-between">
            <div className="text-base font-bold">Transazioni recenti</div>
            <Button variant="ghost" size="sm" iconRight="arrow-right" onClick={() => go('tx')}>
              vedi tutte
            </Button>
          </div>
          <div className="mt-3">
            {recent.map((tx, i) => (
              <TxRow key={tx.id} tx={tx} divider={i > 0} />
            ))}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
