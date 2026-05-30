// src/hooks/useScreen.ts
// Trivial screen-state hook. Persists the current screen in localStorage so
// hot-reloads keep you where you were. Swap for react-router / TanStack
// Router if you outgrow this.

import { useEffect, useState, useCallback } from 'react';
import type { ScreenId } from '@/lib/types';

const STORAGE_KEY = 'bt-screen';
const DEFAULT_SCREEN: ScreenId = 'onboarding';

export function useScreen(initial: ScreenId = DEFAULT_SCREEN) {
  const [screen, setScreen] = useState<ScreenId>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return (stored as ScreenId) || initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, screen);
    } catch {
      /* ignore */
    }
  }, [screen]);

  const go = useCallback((s: ScreenId) => setScreen(s), []);

  return [screen, go] as const;
}
