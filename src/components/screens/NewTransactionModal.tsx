// src/components/screens/NewTransactionModal.tsx
// Center modal — variant A.

import { useState } from 'react';
import {
  Button,
  ClayCard,
  Eyebrow,
  Icon,
  IconButton,
  Input,
  Toggle,
} from '@/components/ui';
import { DEFAULT_CATEGORIES } from '@/lib/categories';
import { PALETTE } from '@/lib/palette';
import { cn } from '@/lib/utils';
import type { CategoryId } from '@/lib/types';

interface NewTransactionModalProps {
  onClose: () => void;
  /** Called when user clicks Save. Wire to Convex mutation. */
  onSave?: (payload: NewTxPayload) => void;
}

export interface NewTxPayload {
  type: 'in' | 'out';
  amount: string;
  catId: CategoryId | null;
  desc: string;
  date: string;
  recurring: boolean;
  note: string;
}

export function NewTransactionModal({ onClose, onSave }: NewTransactionModalProps) {
  const [type, setType] = useState<'in' | 'out'>('out');
  const [amount, setAmount] = useState('48,20');
  const [catId, setCatId] = useState<CategoryId>('food');
  const [desc, setDesc] = useState('Conad — spesa settimanale');
  const [date, setDate] = useState('28 mag 2026');
  const [recurring, setRecurring] = useState(false);
  const [note, setNote] = useState('');

  const handleSave = () => {
    onSave?.({ type, amount, catId: type === 'out' ? catId : null, desc, date, recurring, note });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-ink/35 p-5 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-[540px] animate-slide-up overflow-auto rounded-xl bg-white p-7 shadow-lg"
      >
        <div className="flex items-start justify-between">
          <div>
            <Eyebrow>Nuova movimentazione</Eyebrow>
            <div className="mt-1 text-2xl font-bold">
              {type === 'out' ? 'Aggiungi una spesa' : "Registra un'entrata"}
            </div>
          </div>
          <IconButton name="x" onClick={onClose} ariaLabel="Chiudi" />
        </div>

        {/* Type toggle */}
        <div className="mt-4 flex gap-2 rounded-md bg-ink/5 p-1">
          <TypeButton active={type === 'out'} color={PALETTE.blush} icon="arrow-down" onClick={() => setType('out')}>
            Uscita
          </TypeButton>
          <TypeButton active={type === 'in'} color={PALETTE.mint} icon="arrow-up" onClick={() => setType('in')}>
            Entrata
          </TypeButton>
        </div>

        {/* Big amount input */}
        <ClayCard
          swatch={type === 'out' ? 'cream' : 'mint'}
          soft
          className="mt-4 text-center"
        >
          <Eyebrow>Importo</Eyebrow>
          <div className="mt-1.5 flex items-baseline justify-center gap-1">
            <span className="text-[28px] font-semibold text-ink-body">€</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-[200px] border-none bg-transparent text-center text-[48px] font-bold tracking-[-1px] text-ink outline-none"
            />
          </div>
        </ClayCard>

        {/* Fields */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <FieldLabel label="Data">
            <Input value={date} onChange={setDate} icon="calendar" />
          </FieldLabel>
          <FieldLabel label="Frequenza">
            <div className="flex h-11 items-center justify-between rounded-md border-[1.5px] border-line bg-white px-3.5">
              <span className={cn('text-sm', recurring ? 'text-ink' : 'text-ink-soft')}>
                {recurring ? 'Ogni mese' : 'Una tantum'}
              </span>
              <Toggle on={recurring} onChange={setRecurring} />
            </div>
          </FieldLabel>
        </div>

        {/* Description */}
        <div className="mt-3">
          <FieldLabel label="Descrizione">
            <Input value={desc} onChange={setDesc} placeholder="es. spesa al Conad" />
          </FieldLabel>
        </div>

        {/* Category */}
        {type === 'out' ? (
          <div className="mt-3">
            <div className="mb-2 text-[11px] font-semibold text-ink-body">Categoria</div>
            <div className="flex flex-wrap gap-1.5">
              {DEFAULT_CATEGORIES.map((c) => {
                const sel = c.id === catId;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCatId(c.id)}
                    style={{ background: sel ? PALETTE[c.swatch] : '#fff' }}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border-[1.5px] py-1.5 pl-2.5 pr-3 text-xs font-semibold text-ink transition-all',
                      sel ? 'border-transparent shadow-clay-soft' : 'border-line',
                    )}
                  >
                    <Icon name={c.icon} size={14} /> {c.name}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Note */}
        <div className="mt-3">
          <FieldLabel label="Note (opzionale)">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="aggiungi una nota…"
              className="min-h-16 w-full resize-y rounded-md border-[1.5px] border-line bg-white p-3 text-[13px] text-ink outline-none placeholder:text-ink-muted"
            />
          </FieldLabel>
        </div>

        {/* Actions */}
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Annulla
          </Button>
          <Button variant="primary" icon="check" onClick={handleSave}>
            Salva
          </Button>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-semibold text-ink-body">{label}</div>
      {children}
    </div>
  );
}

function TypeButton({
  active,
  color,
  icon,
  children,
  onClick,
}: {
  active: boolean;
  color: string;
  icon: 'arrow-up' | 'arrow-down';
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{ background: active ? color : 'transparent' }}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 rounded-sm px-3.5 py-2.5 text-[13px] font-bold transition-all',
        active ? 'text-ink shadow-sm' : 'text-ink-soft',
      )}
    >
      <Icon name={icon} size={16} />
      {children}
    </button>
  );
}
