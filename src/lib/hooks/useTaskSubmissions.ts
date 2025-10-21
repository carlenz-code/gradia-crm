// lib/hooks/useTaskSubmissions.ts
'use client';
import { useEffect, useState } from 'react';
import type { TaskSubmission } from '@/lib/types/task.types';
import { getTaskSubmissionsMock } from '@/lib/services/mock/task.mock';
// import { getTaskSubmissions } from '@/lib/services/api/tasks.service';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS !== 'false';

export function useTaskSubmissions(taskId: string) {
  const [items, setItems] = useState<TaskSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    (async () => {
      const data = useMocks ? await getTaskSubmissionsMock(taskId) : [];
      if (!alive) return;
      setItems(data);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [taskId]);

  return { items, loading };
}
