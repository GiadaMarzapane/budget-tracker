// src/components/ui/Avatar.tsx

import { PALETTE } from '@/lib/palette';
import type { PaletteSwatch } from '@/lib/types';

interface AvatarProps {
  name?: string;
  size?: number;
  swatch?: PaletteSwatch;
  className?: string;
}

export function Avatar({ name = 'M', size = 40, swatch = 'pink', className }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-bold text-ink shadow-clay-soft ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        background: PALETTE[swatch],
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </div>
  );
}
