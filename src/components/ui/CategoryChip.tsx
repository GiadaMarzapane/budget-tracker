// src/components/ui/CategoryChip.tsx

import { CATEGORY_BY_ID } from '@/lib/categories';
import { PALETTE } from '@/lib/palette';
import { Icon } from './Icon';
import { cn } from '@/lib/utils';
import type { CategoryId } from '@/lib/types';

interface CategoryChipProps {
  catId: CategoryId;
  size?: 'sm' | 'md';
  className?: string;
}

export function CategoryChip({ catId, size = 'md', className }: CategoryChipProps) {
  const c = CATEGORY_BY_ID[catId];
  if (!c) return null;
  const sizeClass = size === 'sm' ? 'h-6 px-2.5 text-[10px]' : 'h-7 px-3 text-[11px]';
  const innerSize = size === 'sm' ? 17 : 18;

  return (
    <span
      style={{ background: PALETTE[c.swatch] }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-black/[0.04] font-semibold text-ink',
        sizeClass,
        className,
      )}
    >
      <span
        className="inline-flex items-center justify-center rounded-full bg-white/50"
        style={{ width: innerSize, height: innerSize }}
      >
        <Icon name={c.icon} size={size === 'sm' ? 11 : 12} strokeWidth={2} />
      </span>
      {c.name}
    </span>
  );
}
