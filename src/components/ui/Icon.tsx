// src/components/ui/Icon.tsx
// Inline SVG icon set. Single-color rounded line icons — pass `className` to
// recolor via Tailwind (uses `currentColor`).

import type { CSSProperties } from 'react';
import type { IconName } from '@/lib/types';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}

export function Icon({ name, size = 20, className, strokeWidth = 1.8, style }: IconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    style: { display: 'block', ...style },
  };
  switch (name) {
    case 'home':       return <svg {...props}><path d="M4 11l8-7 8 7v8a2 2 0 0 1-2 2h-3v-6h-6v6H6a2 2 0 0 1-2-2z" /></svg>;
    case 'transport':  return <svg {...props}><rect x="3" y="7" width="18" height="11" rx="3" /><circle cx="8" cy="18" r="1.5" /><circle cx="16" cy="18" r="1.5" /><path d="M7 13h10" /></svg>;
    case 'food':       return <svg {...props}><path d="M12 3c4 0 7 3 7 7 0 5-4 11-7 11s-7-6-7-11c0-4 3-7 7-7z" /><path d="M12 7v6" /></svg>;
    case 'subs':       return <svg {...props}><path d="M4 12a8 8 0 0 1 13-6l3 3M20 12a8 8 0 0 1-13 6l-3-3" /><path d="M20 3v6h-6M4 21v-6h6" /></svg>;
    case 'shopping':   return <svg {...props}><path d="M5 7h14l-1.5 11a2 2 0 0 1-2 1.7h-7a2 2 0 0 1-2-1.7z" /><path d="M9 7V5a3 3 0 0 1 6 0v2" /></svg>;
    case 'wellness':   return <svg {...props}><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" /></svg>;
    case 'travel':     return <svg {...props}><path d="M21 16l-6-3 1-7-2-1-3 6-5-1-1.5 1.5L8 14l-3 4 1.5 1L10 16l4 1z" /></svg>;
    case 'dashboard':  return <svg {...props}><rect x="3" y="3" width="8" height="10" rx="2" /><rect x="13" y="3" width="8" height="6" rx="2" /><rect x="13" y="11" width="8" height="10" rx="2" /><rect x="3" y="15" width="8" height="6" rx="2" /></svg>;
    case 'list':       return <svg {...props}><path d="M8 6h13M8 12h13M8 18h13" /><circle cx="4" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1" fill="currentColor" stroke="none"/></svg>;
    case 'category':   return <svg {...props}><circle cx="7" cy="7" r="3.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><path d="M7 13.5L11 20.5h-8z" /><circle cx="17" cy="17" r="3.5" /></svg>;
    case 'goal':       return <svg {...props}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></svg>;
    case 'stats':      return <svg {...props}><path d="M4 19V5M4 19h16" /><path d="M7 16l4-5 3 3 5-6" /></svg>;
    case 'settings':   return <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.7l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.7-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.7.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.7 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.7.3 1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.7-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.7 1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" /></svg>;
    case 'plus':       return <svg {...props}><path d="M12 5v14M5 12h14" /></svg>;
    case 'minus':      return <svg {...props}><path d="M5 12h14" /></svg>;
    case 'arrow-up':   return <svg {...props}><path d="M12 19V5M5 12l7-7 7 7" /></svg>;
    case 'arrow-down': return <svg {...props}><path d="M12 5v14M5 12l7 7 7-7" /></svg>;
    case 'arrow-right':return <svg {...props}><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
    case 'arrow-left': return <svg {...props}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>;
    case 'chevron-down':return <svg {...props}><path d="M6 9l6 6 6-6" /></svg>;
    case 'chevron-up': return <svg {...props}><path d="M6 15l6-6 6 6" /></svg>;
    case 'chevron-right':return <svg {...props}><path d="M9 6l6 6-6 6" /></svg>;
    case 'search':     return <svg {...props}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>;
    case 'bell':       return <svg {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9z" /><path d="M10 21h4" /></svg>;
    case 'filter':     return <svg {...props}><path d="M3 5h18l-7 9v6l-4-2v-4z" /></svg>;
    case 'calendar':   return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>;
    case 'edit':       return <svg {...props}><path d="M14 5l5 5L9 20H4v-5z" /><path d="M13 6l5 5" /></svg>;
    case 'trash':      return <svg {...props}><path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" /></svg>;
    case 'dots':       return <svg {...props}><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/></svg>;
    case 'check':      return <svg {...props}><path d="M5 13l4 4L19 7" /></svg>;
    case 'x':          return <svg {...props}><path d="M6 6l12 12M18 6L6 18" /></svg>;
    case 'wallet':     return <svg {...props}><path d="M3 7a2 2 0 0 1 2-2h14v4H5a2 2 0 0 1-2-2z" /><path d="M3 7v11a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-3" /><path d="M17 12h4v4h-4a2 2 0 0 1 0-4z" /></svg>;
    case 'eye':        return <svg {...props}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>;
    case 'eye-off':    return <svg {...props}><path d="M3 3l18 18M10.6 6.1A9.7 9.7 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-2.6 3.1M6.6 6.6C3.5 8.4 2 12 2 12s4 6 10 6c1.7 0 3.2-.4 4.5-1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>;
    case 'download':   return <svg {...props}><path d="M12 4v12M6 12l6 6 6-6M4 20h16" /></svg>;
    case 'upload':     return <svg {...props}><path d="M12 20V8M6 12l6-6 6 6M4 4h16" /></svg>;
    case 'plane':      return <svg {...props}><path d="M21 16l-6-3 1-7-2-1-3 6-5-1-1.5 1.5L8 14l-3 4 1.5 1L10 16l4 1z" /></svg>;
    case 'laptop':     return <svg {...props}><rect x="4" y="5" width="16" height="11" rx="2" /><path d="M2 19h20" /></svg>;
    case 'shield':     return <svg {...props}><path d="M12 3l8 3v5c0 5-4 9-8 10-4-1-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>;
    case 'graduation': return <svg {...props}><path d="M2 9l10-4 10 4-10 4z" /><path d="M6 11v5a6 4 0 0 0 12 0v-5" /></svg>;
    case 'repeat':     return <svg {...props}><path d="M17 2l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>;
    case 'sparkle':    return <svg {...props}><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" /><path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z" /></svg>;
    case 'logout':     return <svg {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></svg>;
    case 'menu':       return <svg {...props}><path d="M3 6h18M3 12h18M3 18h18" /></svg>;
    case 'sun':        return <svg {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>;
    case 'moon':       return <svg {...props}><path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z" /></svg>;
    default:           return <svg {...props}><circle cx="12" cy="12" r="9" /></svg>;
  }
}
