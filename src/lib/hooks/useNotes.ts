'use client';

import { useEffect, useState } from 'react';
import type { NoteItem, NoteTag } from '@/lib/types/notes.types';

const keyFor = (userId: string) => `notes:${userId}`;

export function useNotes(userId: string) {
  const [items, setItems] = useState<NoteItem[]>([]);

  // cargar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(keyFor(userId));
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  }, [userId]);

  // persistir
  useEffect(() => {
    try {
      localStorage.setItem(keyFor(userId), JSON.stringify(items));
    } catch {
      // noop
    }
  }, [userId, items]);

  // helpers
  const add = (p: { title: string; description?: string; tags?: NoteTag[] }) => {
    const nowIso = new Date().toISOString();
    const dateLabel = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short' }).replace('.', '');
    setItems(prev => [
      {
        id: crypto.randomUUID(),
        userId,
        title: (p.title ?? '').trim() || 'Nueva nota',
        description: p.description?.trim() || undefined,
        status: 'todo',
        tags: p.tags ?? [],
        dateLabel,
        createdAt: nowIso,
        updatedAt: nowIso,
      },
      ...prev,
    ]);
  };

  const toggle = (id: string) =>
    setItems(prev =>
      prev.map(n =>
        n.id === id ? { ...n, status: n.status === 'done' ? 'todo' : 'done', updatedAt: new Date().toISOString() } : n
      )
    );

  const remove = (id: string) => setItems(prev => prev.filter(n => n.id !== id));

  const update = (
    id: string,
    patch: Partial<Pick<NoteItem, 'title' | 'description' | 'tags' | 'status' | 'dateLabel'>>
  ) =>
    setItems(prev =>
      prev.map(n => (n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n))
    );

  return { items, add, toggle, remove, update };
}
