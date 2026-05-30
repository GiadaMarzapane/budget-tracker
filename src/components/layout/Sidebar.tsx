// src/components/layout/Sidebar.tsx

import type { ScreenId, IconName } from '@/lib/types';
import { Avatar, ClayCard, Eyebrow, Icon, IconButton } from '@/components/ui';
import { cn } from '@/lib/utils';

interface NavItem {
  id: ScreenId;
  label: string;
  icon: IconName;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard',  label: 'Dashboard',    icon: 'dashboard' },
  { id: 'tx',         label: 'Transazioni',  icon: 'list' },
  { id: 'categories', label: 'Categorie',    icon: 'category' },
  { id: 'goals',      label: 'Obiettivi',    icon: 'goal' },
  { id: 'stats',      label: 'Statistiche',  icon: 'stats' },
  { id: 'settings',   label: 'Impostazioni', icon: 'settings' },
];

interface SidebarProps {
  active: ScreenId;
  onNavigate?: (id: ScreenId) => void;
  user?: { name: string; email: string };
}

export function Sidebar({
  active,
  onNavigate,
  user = { name: 'Marco R.', email: 'marco@mail.it' },
}: SidebarProps) {
  return (
    <aside className="flex h-full w-60 flex-shrink-0 flex-col gap-2 border-r border-line bg-white/50 p-4 backdrop-blur-lg">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-2.5 pb-3.5 pt-1.5">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-md text-lg font-extrabold text-ink shadow-clay-soft"
          style={{
            background: 'linear-gradient(135deg, #e8d7ff, #ffd3e8)',
          }}
        >
          €
        </div>
        <div>
          <div className="text-[15px] font-bold leading-none text-ink">Budget</div>
          <div className="mt-0.5 text-[11px] text-ink-soft">Tracker</div>
        </div>
      </div>

      <div className="mx-1.5 mb-1.5 h-px bg-line" />

      <Eyebrow className="mt-0.5 px-2.5 py-1">Menu</Eyebrow>

      {NAV_ITEMS.map((item) => (
        <SidebarItem
          key={item.id}
          item={item}
          active={item.id === active}
          onClick={() => onNavigate?.(item.id)}
        />
      ))}

      {/* Bottom user card */}
      <div className="mt-auto">
        <ClayCard swatch="cream" soft className="flex items-center gap-2.5 !p-3">
          <Avatar name={user.name} size={36} swatch="pink" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold leading-tight text-ink">
              {user.name}
            </div>
            <div className="truncate text-[11px] text-ink-soft">{user.email}</div>
          </div>
          <IconButton name="logout" size={28} variant="ghost" ariaLabel="Esci" />
        </ClayCard>
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  item: NavItem;
  active: boolean;
  onClick?: () => void;
}

function SidebarItem({ item, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13px] transition-all',
        active
          ? 'bg-lavender font-bold text-ink shadow-clay-soft'
          : 'font-medium text-ink hover:bg-white/60',
      )}
    >
      <Icon name={item.icon} size={18} strokeWidth={active ? 2 : 1.8} />
      <span>{item.label}</span>
      {active ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-ink" /> : null}
    </button>
  );
}
