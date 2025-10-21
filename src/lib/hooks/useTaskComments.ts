'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Role, TaskComment } from '@/lib/types/task.types';

const KEY = (taskId: string) => `gradia.comments.${taskId}`;

function load(taskId: string): TaskComment[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY(taskId));
    return raw ? (JSON.parse(raw) as TaskComment[]) : [];
  } catch {
    return [];
  }
}

function persist(taskId: string, items: TaskComment[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY(taskId), JSON.stringify(items));
  } catch {}
}

/** Mock por taskId. En prod: cambia load/persist por fetch a tu API. */
export function useTaskComments(taskId: string, role: Role) {
  const [items, setItems] = useState<TaskComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const data = load(taskId);
    setItems(data);
    setLoading(false);
  }, [taskId]);

  const add = async (body: string, parentId: string | null) => {
    const now = new Date().toISOString();
    const newItem: TaskComment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      taskId,           // ← Tu tipo lo exige
      parentId,         // null si es raíz
      authorId: 'me',
      authorName: 'Tú',
      role,
      body,
      createdAt: now,
    };

    setItems((prev) => {
      const next = [newItem, ...prev];
      persist(taskId, next);
      return next;
    });
  };

  return useMemo(() => ({ items, loading, add }), [items, loading]);
}
