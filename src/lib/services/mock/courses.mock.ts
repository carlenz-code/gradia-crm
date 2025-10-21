import type { Course } from '@/lib/types/course.types';

// ========== MOCK DB (limpio) ==========

export const MOCK_DB: Record<string, Course> = {
  // ===== Curso 1 =====
  'ml-101': {
    id: 'ml-101',
    title: 'Electivo II Fundamentos de ML',
    career: 'Ing. Sistemas',
    units: [
      {
        id: 'u1',
        title: 'Introducción a ML',
        lessons: [
          { id: 'l1', title: '¿Qué es ML?', minutes: 18 },
          { id: 'l2', title: 'Tipos de aprendizaje', minutes: 22 },
        ],
        tasks: [
          { id: 'ml-t1', title: 'Taller de análisis exploratorio', dueAt: new Date().toISOString(), grade: '—' },
        ],
      },
      {
        id: 'u2',
        title: 'Regresión Lineal',
        lessons: [
          { id: 'l3', title: 'Mínimos cuadrados', minutes: 25 },
          { id: 'l4', title: 'Regularización', minutes: 20 },
        ],
        tasks: [
          { id: 'ml-t2', title: 'Tarea: Regresión', dueAt: new Date(Date.now() + 864e5 * 3).toISOString(), grade: null },
        ],
      },
      {
        id: 'u3',
        title: 'Clasificación y Árboles',
        lessons: [
          { id: 'l5', title: 'Clasificación básica', minutes: 30 },
          { id: 'l6', title: 'Árboles de decisión', minutes: 26 },
        ],
        tasks: [
          { id: 'ml-t3', title: 'Práctica: Clasificadores', dueAt: new Date(Date.now() + 864e5 * 5).toISOString(), grade: '18' },
        ],
      },
    ],
    tasks: [],
    materials: [
      { id: 'm1', title: 'Sílabos (PDF)', type: 'pdf', url: '/docs/silabo.pdf' },
      { id: 'm2', title: 'Playlist YouTube', type: 'video', url: 'https://youtube.com/...' },
    ],
  },

  // ===== Curso 2 =====
  'seg-inf': {
    id: 'seg-inf',
    title: 'Seguridad de la Información',
    career: 'Ing. Sistemas',
    units: [
      {
        id: 'u1',
        title: 'Principios de Seguridad',
        lessons: [],
        tasks: [
          { id: 'seg-t1', title: 'Ensayo sobre confidencialidad', dueAt: '2025-05-22', grade: '—' },
        ],
      },
    ],
    tasks: [],
    materials: [],
  },

  // ===== Curso 3 (el que estás viendo) =====
  'aud-sis': {
    id: 'aud-sis',
    title: 'Auditoría de Sistemas',
    career: 'Ing. Sistemas',
    units: [
      {
        id: 'u1',
        title: 'Introducción a la Auditoría TI',
        lessons: [],
        tasks: [
          { id: 'aud-t1', title: 'Análisis de riesgos TI', dueAt: '2025-05-19', grade: '—' },
          { id: 'aud-t2', title: 'Plan de Auditoría (borrador)', dueAt: '2025-05-26', grade: null },
        ],
      },
    ],
    tasks: [],
    materials: [],
  },
};

// ===== Helpers (mock async) =====

export async function getCourseByIdMock(id: string) {
  await new Promise((r) => setTimeout(r, 50)); // simula IO
  return MOCK_DB[id] ?? null;
}

/** Fallback si el curso no existe o no tiene units. */
export function makeMockCourse(id: string, role: 'STUDENT' | 'TEACHER') {
  const fallback: Course = {
    id,
    title: 'Sistemas Dinámicos',
    career: 'Ingeniería de Sistemas',
    units: [
      {
        id: 'u1',
        title: 'Identificación de Oportunidades',
        lessons: [],
        tasks: [
          { id: 'fb-t1', title: 'Taller de análisis exploratorio', dueAt: '2025-05-21', grade: '—' as const },
          { id: 'fb-t2', title: 'Preprocesamiento final', dueAt: '2025-05-28', grade: '16' },
        ],
      },
      {
        id: 'u2',
        title: 'Adquisición y Preparación de Datos',
        lessons: [],
        tasks: [
          { id: 'fb-t3', title: 'Normalización de datasets', dueAt: '2025-06-05', grade: null },
        ],
      },
    ],
    tasks: [],
    materials: [],
  };

  const fromDb = MOCK_DB[id];
  if (!fromDb || (fromDb.units?.length ?? 0) === 0) return fallback;
  return fromDb;
}
