'use client';

import { createContext, useContext } from 'react';
import type { MinimalUser } from '@/lib/types';

const Ctx = createContext<MinimalUser | null>(null);

export function UserProvider({ value, children }: { value: MinimalUser; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUser() {
  const u = useContext(Ctx);
  if (!u) throw new Error('useUser must be used inside UserProvider');
  return u;
}
