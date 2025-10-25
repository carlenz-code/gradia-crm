// lib/hooks/useTaskStudents.ts
'use client';

import { useEffect, useMemo, useState } from 'react';

export type TaskStudentItem = {
  id: string;
  index: number;                 // 01, 02, 03…
  name: string;
  avatar?: string;
  submitted: boolean;
  submittedAt?: string | null;   // ISO
  grade?: number | null;         // 0..20 o null
};

export function useTaskStudents(taskId: string) {
  const [items, setItems] = useState<TaskStudentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const t = setTimeout(() => {
      if (!mounted) return;
      const base = 'Carlos Eduardo Saavedra Vasconez';
      const arr = Array.from({ length: 24 }).map((_, i) => {
        const submitted = i % 7 !== 6;
        const grade = submitted && i % 5 === 0 ? 11 + (i % 9) : null;
        return {
          id: `st-${i + 1}`,
          index: i + 1,
          name: base,
          avatar: `https://i.pravatar.cc/100?img=${(i % 70) + 1}`,
          submitted,
          submittedAt: submitted ? new Date(Date.now() - i * 3600e3).toISOString() : null,
          grade,
        } as TaskStudentItem;
      });
      setItems(arr);
      setLoading(false);
    }, 250);
    return () => { mounted = false; clearTimeout(t); };
  }, [taskId]);

  const stats = useMemo(() => {
    const total = items.length;
    const submitted = items.filter(i => i.submitted).length;
    const pending = total - submitted;
    return { total, submitted, pending };
  }, [items]);

  return { items, loading, stats };
}
