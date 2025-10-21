// lib/hooks/useTask.ts
'use client';
import { useEffect, useState } from 'react';
import type { TaskDetail } from '@/lib/types/task.types';
import { getTaskByIdMock } from '@/lib/services/mock/task.mock';
// import { getTaskById } from '@/lib/services/api/tasks.service';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS !== 'false';

export function useTask(taskId: string) {
  const [task, setTask] = useState<TaskDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    (async () => {
      const data = useMocks ? await getTaskByIdMock(taskId) : null; // await getTaskById(taskId)
      if (!alive) return;
      setTask(data);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [taskId]);

  return { task, loading, setTask };
}
