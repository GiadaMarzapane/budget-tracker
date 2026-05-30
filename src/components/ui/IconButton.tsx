// src/components/ui/IconButton.tsx

import type { ButtonHTMLAttributes } from 'react';
import { Icon } from './Icon';
import { cn } from '@/lib/utils';
import type { IconName } from '@/lib/types';

type Variant = 'primary' | 'secondary' | 'ghost';

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  name: IconName;
  size?: number;
  variant?: Variant;
  ariaLabel?: string;
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-ink text-white shadow-sm',
  secondary: 'bg-surface-glass-hi text-ink border border-line shadow-sm hover:bg-white',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
};

export function IconButton({
  name,
  size = 36,
  variant = 'secondary',
  ariaLabel,
  className,
  style,
  ...rest
}: IconButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      style={{ width: size, height: size, ...style }}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-0 transition-all',
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      <Icon name={name} size={Math.round(size * 0.5)} />
    </button>
  );
}
