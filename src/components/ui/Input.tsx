// src/components/ui/Input.tsx

import { useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { Icon } from './Icon';
import { cn } from '@/lib/utils';
import type { IconName } from '@/lib/types';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  value?: string;
  onChange?: (v: string) => void;
  icon?: IconName;
  suffix?: ReactNode;
  size?: 'sm' | 'md';
}

export function Input({
  value,
  onChange,
  icon,
  suffix,
  size = 'md',
  className,
  ...rest
}: InputProps) {
  const [focus, setFocus] = useState(false);
  const h = size === 'sm' ? 'h-9' : 'h-11';
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md border bg-white px-3.5 transition-all',
        h,
        focus
          ? 'border-lavender-deep shadow-[0_0_0_4px_rgba(232,215,255,0.4)]'
          : 'border-line',
        className,
      )}
    >
      {icon ? <Icon name={icon} size={16} className="text-ink-soft" /> : null}
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={(e) => {
          setFocus(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocus(false);
          rest.onBlur?.(e);
        }}
        className="h-full flex-1 border-none bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
      />
      {suffix ? <span className="text-xs text-ink-soft">{suffix}</span> : null}
    </div>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Cerca…',
  className,
}: Pick<InputProps, 'value' | 'onChange' | 'placeholder' | 'className'>) {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      icon="search"
      className={className}
    />
  );
}
