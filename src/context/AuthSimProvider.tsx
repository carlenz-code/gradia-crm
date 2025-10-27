'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { UserRole } from '@/lib/services/mock/userDirectory.local';

type AuthState = {
  isAuthed: boolean;
  userId?: string | null;
  role?: UserRole;
  name?: string;
  email?: string;
  org?: string;
};

type Ctx = AuthState & {
  login: (p: { userId: string; role: UserRole; name: string; email: string; org?: string }) => void;
  logout: () => void;
};

const AuthCtx = createContext<Ctx | null>(null);
const LS_KEY = 'gradia:auth';

export function AuthSimProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ isAuthed: false });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const login: Ctx['login'] = ({ userId, role, name, email, org }) =>
    setState({ isAuthed: true, userId, role, name, email, org });

  const logout = () => setState({ isAuthed: false });

  const value = useMemo(() => ({ ...state, login, logout }), [state]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuthSim = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuthSim debe usarse dentro de AuthSimProvider');
  return ctx;
};
