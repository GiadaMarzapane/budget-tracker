// src/components/screens/SettingsScreen.tsx

import { useState } from 'react';
import { AppShell } from '@/components/layout';
import {
  Avatar,
  Button,
  GlassCard,
  Icon,
  Input,
  Pill,
  Segmented,
  Toggle,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import type { IconName, ScreenId } from '@/lib/types';

interface SettingsScreenProps {
  go: (s: ScreenId) => void;
  openNewTx: () => void;
}

type SettingsTab =
  | 'profile'
  | 'prefs'
  | 'notif'
  | 'cats'
  | 'security'
  | 'export'
  | 'danger';

interface TabDef {
  id: SettingsTab;
  label: string;
  icon: IconName;
}

const TABS: TabDef[] = [
  { id: 'profile',  label: 'Profilo',                icon: 'settings' },
  { id: 'prefs',    label: 'Valuta & Lingua',        icon: 'sparkle'  },
  { id: 'notif',    label: 'Notifiche',              icon: 'bell'     },
  { id: 'cats',     label: 'Categorie predefinite',  icon: 'category' },
  { id: 'security', label: 'Sicurezza',              icon: 'shield'   },
  { id: 'export',   label: 'Esporta dati',           icon: 'download' },
  { id: 'danger',   label: 'Elimina account',        icon: 'trash'    },
];

export function SettingsScreen({ go, openNewTx }: SettingsScreenProps) {
  const [tab, setTab] = useState<SettingsTab>('profile');

  return (
    <AppShell
      active="settings"
      onNavigate={go}
      title="Impostazioni"
      subtitle="Account & preferenze"
      onAdd={openNewTx}
      hideSearch
    >
      <div className="grid grid-cols-[240px_1fr] items-start gap-5">
        {/* Sub-nav */}
        <GlassCard hi className="!p-2.5">
          {TABS.map((t) => {
            const sel = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'mb-0.5 flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-[13px] transition-all',
                  sel ? 'bg-lavender font-bold shadow-clay-soft' : 'font-medium hover:bg-white/60',
                  t.id === 'danger' ? 'text-danger' : 'text-ink',
                )}
              >
                <Icon name={t.icon} size={16} />
                {t.label}
              </button>
            );
          })}
        </GlassCard>

        {/* Right pane */}
        <div className="flex flex-col gap-4">
          <GlassCard hi className="!p-[26px]">
            <div className="flex items-start justify-between">
              <div className="text-xl font-bold">Profilo</div>
              <Pill color="#f3ffe1" size="sm" icon="sparkle">
                Plan Free
              </Pill>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <Avatar name="Marco Rossi" size={72} swatch="pink" />
              <div>
                <Button variant="secondary" size="sm">
                  Cambia foto
                </Button>
                <div className="mt-1.5 text-[11px] text-ink-soft">PNG o JPG, max 2 MB</div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3.5">
              <Field label="Nome">
                <Input value="Marco" onChange={() => {}} />
              </Field>
              <Field label="Cognome">
                <Input value="Rossi" onChange={() => {}} />
              </Field>
              <Field label="Email" full>
                <Input value="marco@mail.it" onChange={() => {}} />
              </Field>
              <Field label="Fuso orario" full>
                <Input value="Europe/Rome" onChange={() => {}} icon="calendar" />
              </Field>
            </div>
          </GlassCard>

          <GlassCard hi className="!p-[26px]">
            <div className="text-lg font-bold">Preferenze</div>
            <div className="mt-4 flex flex-col gap-4">
              <PrefRow label="Valuta" hint="usata in tutta l'app">
                <Segmented<'eur' | 'usd' | 'gbp'>
                  value="eur"
                  options={[
                    { value: 'eur', label: 'EUR' },
                    { value: 'usd', label: 'USD' },
                    { value: 'gbp', label: 'GBP' },
                  ]}
                  onChange={() => {}}
                />
              </PrefRow>
              <PrefRow label="Primo giorno della settimana">
                <Segmented<'mon' | 'sun'>
                  value="mon"
                  options={[
                    { value: 'mon', label: 'Lun' },
                    { value: 'sun', label: 'Dom' },
                  ]}
                  onChange={() => {}}
                />
              </PrefRow>
              <PrefRow label="Tema">
                <Segmented<'light' | 'dark' | 'auto'>
                  value="light"
                  options={[
                    { value: 'light', label: 'Chiaro' },
                    { value: 'dark', label: 'Scuro' },
                    { value: 'auto', label: 'Auto' },
                  ]}
                  onChange={() => {}}
                />
              </PrefRow>
              <PrefRow label="Notifiche push" hint="promemoria e avvisi budget">
                <Toggle on={true} onChange={() => {}} />
              </PrefRow>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost">Annulla</Button>
              <Button variant="primary" icon="check">
                Salva modifiche
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}

function Field({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? 'col-span-full' : undefined}>
      <div className="mb-1.5 text-[11px] font-semibold text-ink-body">{label}</div>
      {children}
    </div>
  );
}

function PrefRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line-soft pb-3.5 last:border-none last:pb-0">
      <div>
        <div className="text-[13px] font-semibold">{label}</div>
        {hint ? <div className="mt-0.5 text-[11px] text-ink-soft">{hint}</div> : null}
      </div>
      {children}
    </div>
  );
}
