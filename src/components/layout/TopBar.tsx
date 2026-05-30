// src/components/layout/TopBar.tsx

import { useState, type ReactNode } from 'react';
import { Button, Eyebrow, IconButton, SearchInput } from '@/components/ui';

interface TopBarProps {
  title: string;
  subtitle?: string;
  onAdd?: () => void;
  search?: boolean;
  right?: ReactNode;
}

export function TopBar({ title, subtitle, onAdd, search = true, right }: TopBarProps) {
  const [q, setQ] = useState('');
  return (
    <header className="flex items-center justify-between gap-4 border-b border-line bg-white/40 px-7 py-5 backdrop-blur-md">
      <div className="min-w-0">
        {subtitle ? <Eyebrow>{subtitle}</Eyebrow> : null}
        <div
          className={`text-2xl font-bold leading-tight text-ink ${subtitle ? 'mt-1' : ''}`}
        >
          {title}
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        {search ? (
          <div className="w-[280px]">
            <SearchInput value={q} onChange={setQ} placeholder="Cerca transazioni…" />
          </div>
        ) : null}
        {right}
        <IconButton name="bell" ariaLabel="Notifiche" />
        {onAdd ? (
          <Button variant="primary" icon="plus" onClick={onAdd}>
            Nuova
          </Button>
        ) : null}
      </div>
    </header>
  );
}
