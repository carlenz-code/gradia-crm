// src/lib/auth.client.ts
'use client';

import { useUser } from '@/components/providers/UserProvider';
import type { MinimalUser } from './types';

/**
 * Hook cliente: devuelve el usuario actual que el DashboardLayout
 * pasó al <UserProvider>. Esta es TU fuente de verdad en la UI.
 */
export function useCurrentUser(): MinimalUser {
  return useUser();
}
