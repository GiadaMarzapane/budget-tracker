// src/components/ui/Pill.tsx

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { Icon } from './Icon';
import { cn } from '@/lib/utils';
import type { IconName } from '@/lib/types';

interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  color?: string; // raw color string; pass undefined for default neutral
  ghost?: boolean;
  size?: 'sm' | 'md';
  icon?: IconName;
  children?: ReactNode;
}

export function Pill({
  color,
  ghost,
  size = 'md',
  icon,
  className,
  style,
  children,
  ...rest
}: PillProps) {
  const sizeClass = size === 'sm' ? 'h-6 px-2.5 text-[11px]' : 'h-7 px-3 text-xs';
  const bg: CSSProperties = ghost
    ? { background: 'transparent' }
    : { background: color ?? 'rgba(42,36,51,0.06)' };

  return (
    <span
      style={{ ...bg, ...style }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-semibold text-ink leading-none',
        ghost ? 'border border-line' : 'border border-black/[0.04]',
        sizeClass,
        className,
      )}
      {...rest}
    >
      {icon ? <Icon name={icon} size={12} /> : null}
      {children}
    </span>
  );
}
