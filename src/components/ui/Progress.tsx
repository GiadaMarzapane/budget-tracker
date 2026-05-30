// src/components/ui/Progress.tsx — linear bar + circular ring

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number; // 0..1
  color?: string;
  bg?: string;
  h?: number;
  label?: ReactNode;
  className?: string;
}

export function Progress({ value, color, bg, h = 8, label, className }: ProgressProps) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div className={cn('w-full', className)}>
      <div
        className="relative w-full overflow-hidden rounded-full"
        style={{ height: h, background: bg ?? 'rgba(42,36,51,0.06)' }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{
            width: `${clamped * 100}%`,
            background: color ?? '#b89be0',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
          }}
        />
      </div>
      {label ? <div className="mt-1.5 text-[11px] text-ink-soft">{label}</div> : null}
    </div>
  );
}

interface RingProps {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  bg?: string;
  children?: ReactNode;
}

export function Ring({
  value,
  size = 80,
  stroke = 8,
  color = '#b89be0',
  bg = 'rgba(42,36,51,0.08)',
  children,
}: RingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(1, value)));
  const style: CSSProperties = { width: size, height: size };
  return (
    <div className="relative inline-flex items-center justify-center" style={style}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      {children ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}
