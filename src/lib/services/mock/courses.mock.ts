import type { Course } from '@/lib/types/course.types';

// ========== MOCK DB ==========
export const MOCK_DB: Record<string, Course> = {
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
        tasks: [{ id: 't1', title: 'Quiz 1', dueAt: new Date().toISOString(), grade: '—' }],
      },
      {
        id: 'u2',
        title: 'Regresión Lineal',
        lessons: [
          { id: 'l3', title: 'Mínimos cuadrados', minutes: 25 },
          { id: 'l4', title: 'Regularización', minutes: 20 },
        ],
        tasks: [
          { id: 't2', title: 'Tarea: Regresión', dueAt: new Date(Date.now() + 864e5 * 3).toISOString() },
        ],
      },
    ],
    tasks: [
      {
        id: 't3',
        title: 'Proyecto AE: Operación Atlas',
        dueAt: new Date(Date.now() + 864e5 * 10).toISOString(),
        project: 'Operación Atlas',
      },
    ],
    materials: [
      { id: 'm1', title: 'Sílabos (PDF)', type: 'pdf', url: '/docs/silabo.pdf' },
      { id: 'm2', title: 'Playlist YouTube', type: 'video', url: 'https://youtube.com/...' },
    ],
  },
  'seg-inf': { id: 'seg-inf', title: 'Seguridad de la Información', career: 'Ing. Sistemas', units: [], tasks: [], materials: [] },
  'aud-sis': { id: 'aud-sis', title: 'Auditoría de Sistemas', career: 'Ing. Sistemas', units: [], tasks: [], materials: [] },
};

// helper mock
export async function getCourseByIdMock(id: string) {
  await new Promise((r) => setTimeout(r, 50)); // simula IO
  return MOCK_DB[id] ?? null;
}

// ✅ fallback si no hay datos
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
          { id: 't1', title: 'Taller de análisis exploratorio', dueAt: '2025-05-21', grade: '—' as const },
          { id: 't2', title: 'Preprocesamiento final', dueAt: '2025-05-28', grade: '16' },
        ],
      },
      {
        id: 'u2',
        title: 'Adquisición y Preparación de Datos',
        lessons: [],
        tasks: [{ id: 't3', title: 'Normalización de datasets', dueAt: '2025-06-05', grade: null }],
      },
    ],
    tasks: [],
    materials: [],
  };

  const fromDb = MOCK_DB[id];
  if (!fromDb || (fromDb.units?.length ?? 0) === 0) return fallback;
  return fromDb;
}
