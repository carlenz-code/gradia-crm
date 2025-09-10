// src/lib/auth.ts
import type { MinimalUser } from './types';

export async function getCurrentUser(): Promise<MinimalUser> {
  return {
    id: 'u1',
    name: 'Matias Flores',
    role: 'STUDENT',
    org: 'Universidad Peruana Unión',
    avatarUrl: null,
  };
}
