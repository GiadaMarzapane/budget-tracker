// src/components/ui/Toggle.tsx — and Checkbox + Segmented

import { cn } from '@/lib/utils';
import { Icon } from './Icon';

interface ToggleProps {
  on: boolean;
  onChange?: (v: boolean) => void;
}

export function Toggle({ on, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange?.(!on)}
      className={cn(
        'inline-flex h-6 w-[42px] items-center rounded-full p-0.5 transition-colors',
        on ? 'bg-mint-deep' : 'bg-ink/10',
      )}
    >
      <span
        className="block h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform"
        style={{ transform: `translateX(${on ? 18 : 0}px)` }}
      />
    </button>
  );
}

interface CheckboxProps {
  checked: boolean;
  onChange?: (v: boolean) => void;
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <button
      onClick={() => onChange?.(!checked)}
      className={cn(
        'inline-flex h-[18px] w-[18px] items-center justify-center rounded-md border-[1.5px] transition-all',
        checked ? 'border-ink bg-ink text-white' : 'border-line bg-white',
      )}
    >
      {checked ? <Icon name="check" size={12} strokeWidth={2.5} /> : null}
    </button>
  );
}

type SegmentedOption<T extends string> = T | { value: T; label: string };

interface SegmentedProps<T extends string> {
  value: T;
  options: SegmentedOption<T>[];
  onChange?: (v: T) => void;
  className?: string;
}

export function Segmented<T extends string>({ value, options, onChange, className }: SegmentedProps<T>) {
  return (
    <div className={cn('inline-flex gap-0.5 rounded-md bg-ink/5 p-1', className)}>
      {options.map((o) => {
        const v = typeof o === 'string' ? o : o.value;
        const l = typeof o === 'string' ? o : o.label;
        const sel = v === value;
        return (
          <button
            key={v}
            onClick={() => onChange?.(v)}
            className={cn(
              'rounded-sm px-3.5 py-1.5 text-xs font-semibold transition-all',
              sel ? 'bg-white text-ink shadow-sm' : 'bg-transparent text-ink-soft hover:text-ink',
            )}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
