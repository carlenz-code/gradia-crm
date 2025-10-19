'use client';
import { useEffect, useState } from 'react';
import type { DashboardData } from '@/lib/types/dashboard.types';
import { getDashboardDataMock } from '@/lib/services/mock/dashboard.mock';
import { fetchDashboardData } from '@/lib/services/api/dashboard.service';

export function useDashboardData(userId: string) {
  const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === '1';
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const res = useMocks ? await getDashboardDataMock(userId) : await fetchDashboardData(userId);
        if (alive) setData(res);
      } catch (err: any) {
        if (alive) setError(err?.message || 'Error desconocido');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [userId, useMocks]);

  return { data, loading, error };
}
