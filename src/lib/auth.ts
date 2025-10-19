import type { MinimalUser } from './types';

export async function getCurrentUser(): Promise<MinimalUser> {
  // Cambia STUDENT ↔ TEACHER para probar
  return {
    id: 'u1',
    name: 'Matias Flores',
    role: 'STUDENT',
    org: 'Universidad Peruana Unión',
    avatarUrl: null,
  };
}
