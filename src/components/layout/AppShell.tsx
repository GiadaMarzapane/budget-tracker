// src/components/layout/AppShell.tsx
// Wraps every screen: decorative bg + sidebar + topbar + scrollable content.

import type { ReactNode } from 'react';
import type { ScreenId } from '@/lib/types';
import { AppBackground } from './AppBackground';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface AppShellProps {
  active: ScreenId;
  onNavigate?: (id: ScreenId) => void;
  title: string;
  subtitle?: string;
  onAdd?: () => void;
  hideSearch?: boolean;
  topRight?: ReactNode;
  children?: ReactNode;
}

export function AppShell({
  active,
  onNavigate,
  title,
  subtitle,
  onAdd,
  hideSearch,
  topRight,
  children,
}: AppShellProps) {
  return (
    <div className="relative flex h-full w-full overflow-hidden bg-surface text-ink">
      <AppBackground />
      <div className="relative z-10 flex h-full w-full">
        <Sidebar active={active} onNavigate={onNavigate} />
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <TopBar
            title={title}
            subtitle={subtitle}
            onAdd={onAdd}
            search={!hideSearch}
            right={topRight}
          />
          <div className="flex-1 overflow-y-auto px-7 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
