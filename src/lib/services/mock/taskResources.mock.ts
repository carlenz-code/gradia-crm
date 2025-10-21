// src/lib/services/mock/taskResources.mock.ts
import type { TaskResource } from '@/lib/types/task.types';

// ⚠️ Importante: este archivo NO declara ni exporta ningún type.
// Usa SIEMPRE el TaskResource oficial de /lib/types/task.types.ts

const TASK_RESOURCES: Record<string, TaskResource[]> = {
  // ML
  'ml-t1': [
    { id: 'r-mlt1-1', title: 'Guía de reporte (PDF)', type: 'pdf', url: '/docs/guia-reporte.pdf' },
    { id: 'r-mlt1-2', title: 'Plantilla EDA (Notebook)', type: 'notebook', url: '/docs/plantilla-eda.ipynb' },
  ],
  'ml-t2': [
    { id: 'r-mlt2-1', title: 'Ejemplos de regresión', type: 'pdf', url: '/docs/regresion-ejemplos.pdf' },
  ],
  'ml-t3': [
    { id: 'r-mlt3-1', title: 'Guía de clasificadores', type: 'pdf', url: '/docs/guia-clasificadores.pdf' },
  ],

  // Seguridad
  'seg-t1': [
    { id: 'r-seg1-1', title: 'Lineamientos de confidencialidad', type: 'pdf', url: '/docs/confidencialidad.pdf' },
  ],

  // Auditoría
  'aud-t1': [
    { id: 'r-audt1-1', title: 'Matriz de riesgos (XLSX)', type: 'other', url: '/docs/matriz-riesgos.xlsx' },
  ],
  'aud-t2': [
    { id: 'r-audt2-1', title: 'Plan de auditoría (DOCX)', type: 'other', url: '/docs/plan-auditoria.docx' },
  ],
};

export async function getTaskResourcesMock(taskId: string): Promise<TaskResource[]> {
  await new Promise((r) => setTimeout(r, 25));
  return TASK_RESOURCES[taskId] ?? [];
}
