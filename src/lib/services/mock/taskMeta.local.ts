'use client';

/**
 * Persistencia local simple para tareas (sin backend).
 * Guarda por taskId: title, dueAt, description y resources.
 */

export type ResourceType = 'pdf' | 'document' | 'notebook' | 'slide' | 'link' | 'video';

export type LocalResource = {
  id: string;
  title: string;
  type: ResourceType;
  url: string;         // http(s), dataURL o blob:...
  size?: string;
  updatedAt?: string;  // ISO
};

export type TaskMeta = {
  /** NUEVO: título editable por el docente */
  title?: string;
  /** NUEVO: fecha/hora ISO (o null) */
  dueAt?: string | null;
  /** Descripción editable por el docente */
  description?: string;
  /** Recursos agregados por el docente */
  resources?: LocalResource[];
};

const KEY = '__gradia_task_meta__';

function readStore(): Record<string, TaskMeta> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStore(data: Record<string, TaskMeta>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

/** Lee el meta de una tarea */
export function getTaskMeta(taskId: string): TaskMeta {
  const db = readStore();
  return db[taskId] ?? {};
}

/** NUEVO: set de 'title' y/o 'dueAt' */
export function setTaskBasics(taskId: string, basics: { title?: string; dueAt?: string | null }) {
  const db = readStore();
  const prev = db[taskId] ?? {};
  db[taskId] = { ...prev, ...basics };
  writeStore(db);
  return db[taskId]!;
}

/** Set de la descripción */
export function setTaskDescription(taskId: string, description: string) {
  const db = readStore();
  db[taskId] = { ...(db[taskId] ?? {}), description };
  writeStore(db);
  return db[taskId]!;
}

/** Agregar recurso */
export function addTaskResource(taskId: string, res: Omit<LocalResource, 'id' | 'updatedAt'>) {
  const db = readStore();
  const next: LocalResource = {
    ...res,
    id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    updatedAt: new Date().toISOString(),
  };
  const prev = db[taskId]?.resources ?? [];
  db[taskId] = { ...(db[taskId] ?? {}), resources: [next, ...prev] };
  writeStore(db);
  return next;
}

/** Quitar recurso */
export function removeTaskResource(taskId: string, resId: string) {
  const db = readStore();
  const prev = db[taskId]?.resources ?? [];
  db[taskId] = { ...(db[taskId] ?? {}), resources: prev.filter(r => r.id !== resId) };
  writeStore(db);
  return db[taskId]!;
}
