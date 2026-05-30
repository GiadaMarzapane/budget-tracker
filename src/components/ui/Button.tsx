// src/components/ui/Button.tsx

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from './Icon';
import { cn } from '@/lib/utils';
import type { IconName } from '@/lib/types';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconRight?: IconName;
  full?: boolean;
  children?: ReactNode;
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-5 text-base gap-2.5',
};

const ICON_SIZE: Record<ButtonSize, number> = { sm: 14, md: 16, lg: 18 };

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-ink text-white shadow-[0_3px_10px_rgba(42,36,51,0.20)] hover:shadow-[0_6px_16px_rgba(42,36,51,0.28)]',
  secondary:
    'bg-surface-glass-hi text-ink border border-line backdrop-blur-sm shadow-sm hover:bg-white hover:shadow',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
  danger: 'bg-blush/40 text-[#8a3530] border border-blush hover:bg-blush shadow-sm',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  iconRight,
  full,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50',
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        full && 'w-full',
        className,
      )}
      {...rest}
    >
      {icon ? <Icon name={icon} size={ICON_SIZE[size]} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={ICON_SIZE[size]} /> : null}
    </button>
  );
}
