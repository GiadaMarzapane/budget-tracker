// src/components/ui/Eyebrow.tsx — small uppercase label

import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EyebrowProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function Eyebrow({ className, children, ...rest }: EyebrowProps) {
  return (
    <div
      className={cn('text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
