// src/components/ui/Card.tsx
// Three surface flavors used across the app:
// - GlassCard: translucent white with backdrop blur
// - ClayCard: pastel-filled, soft 3D feel (inset highlight + soft shadow)
// - FlatCard: opaque white, used for data-dense areas (tables)

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import type { PaletteSwatch } from '@/lib/types';
import { PALETTE } from '@/lib/palette';
import { cn } from '@/lib/utils';

type DivProps = HTMLAttributes<HTMLDivElement>;

interface GlassCardProps extends DivProps {
  hi?: boolean;
  children?: ReactNode;
}

export function GlassCard({ hi, className, children, ...rest }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-white/60 p-5 shadow-md backdrop-blur-lg backdrop-saturate-150',
        hi ? 'bg-surface-glass-hi' : 'bg-surface-card',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

interface ClayCardProps extends DivProps {
  swatch?: PaletteSwatch;
  soft?: boolean;
  children?: ReactNode;
}

export function ClayCard({
  swatch = 'lavender',
  soft,
  className,
  style,
  children,
  ...rest
}: ClayCardProps) {
  // We set the background via inline style so consumers can also pass an
  // arbitrary color through className overrides if needed.
  const bg: CSSProperties = { background: PALETTE[swatch], ...style };
  return (
    <div
      style={bg}
      className={cn('rounded-lg p-5 relative', soft ? 'shadow-clay-soft' : 'shadow-clay', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

interface FlatCardProps extends DivProps {
  children?: ReactNode;
}

export function FlatCard({ className, children, ...rest }: FlatCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-line-soft bg-white p-5 shadow-sm',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
