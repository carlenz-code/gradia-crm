import type { DashboardData } from '@/lib/types/dashboard.types';

export async function fetchDashboardData(userId: string): Promise<DashboardData> {
  // TODO: reemplazar con tu backend real
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/${userId}`, { cache: 'no-store' });
  // if (!res.ok) throw new Error('Error al obtener el dashboard');
  // return res.json();
  throw new Error('API no implementada aún');
}
