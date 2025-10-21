// lib/services/mock/tasks.mock.ts
import type { TaskDetail, TaskSubmission } from '@/lib/types/task.types';

const addDaysISO = (d: number) => {
  const dt = new Date();
  dt.setDate(dt.getDate() + d);
  return dt.toISOString();
};

const submissions: TaskSubmission[] = [
  {
    id: 'sub1',
    studentId: 'stu1',
    studentName: 'Carla Esquivel',
    submittedAt: addDaysISO(-1),
    files: [{ name: 'EDA_carla.ipynb', size: 420_000 }],
    grade: null,
    feedback: null,
    status: 'SUBMITTED',
  },
  {
    id: 'sub2',
    studentId: 'stu2',
    studentName: 'Luis Chávez',
    submittedAt: addDaysISO(-1),
    files: [{ name: 'EDA_luis.ipynb', size: 390_000 }],
    grade: null,
    feedback: null,
    status: 'SUBMITTED',
  },
];

export const TASKS_DB: Record<string, TaskDetail> = {
  t1: {
    id: 't1',
    courseId: 'ml-101',
    title: 'Taller de análisis exploratorio',
    description: `Prepara un EDA con hallazgos clave y adjunta tu notebook.
- Contexto del problema
- Datos disponibles y calidad
- KPIs candidatos`,
    dueAt: addDaysISO(3),
    status: 'PENDING',
    grade: '—',
    resources: [
      { id: 'r1', title: 'Guía de reporte (PDF)', type: 'pdf', url: '/docs/guia-reporte.pdf' },
      { id: 'r2', title: 'Plantilla EDA (Notebook)', type: 'notebook', url: '/templates/eda_template.ipynb' },
    ],
    mySubmission: null,
  },
};

export function getTaskByIdMock(taskId: string): Promise<TaskDetail | null> {
  return new Promise((r) => setTimeout(() => r(TASKS_DB[taskId] ?? null), 60));
}

export function getTaskSubmissionsMock(_taskId: string): Promise<TaskSubmission[]> {
  return new Promise((r) => setTimeout(() => r(submissions), 80));
}

export function createSubmissionMock(taskId: string, files: File[]): Promise<TaskSubmission> {
  const sub: TaskSubmission = {
    id: `sub_${Math.random().toString(36).slice(2)}`,
    studentId: 'me',
    studentName: 'Tú',
    submittedAt: new Date().toISOString(),
    files: files.map(f => ({ name: f.name, size: f.size })),
    grade: null,
    feedback: null,
    status: 'SUBMITTED',
  };
  if (TASKS_DB[taskId]) TASKS_DB[taskId].mySubmission = sub;
  return new Promise((r) => setTimeout(() => r(sub), 400));
}
