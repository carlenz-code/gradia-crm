export type Course = {
  id: string
  title: string
  career: string
  units: Unit[]
  tasks: Task[]
  materials: Material[]
}

export type Unit = {
  id: string
  title: string
  lessons: { id: string; title: string; minutes?: number }[]
  tasks: Task[]
}

export type Task = {
  id: string
  title: string
  dueAt: string // ISO
  project?: string
}

export type Material = {
  id: string
  title: string
  type: 'pdf' | 'video' | 'slide' | 'link'
  url: string
}

/* MOCK DB */
const db: Record<string, Course> = {
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
        tasks: [{ id: 't1', title: 'Quiz 1', dueAt: new Date().toISOString() }],
      },
      {
        id: 'u2',
        title: 'Regresión Lineal',
        lessons: [
          { id: 'l3', title: 'Mínimos cuadrados', minutes: 25 },
          { id: 'l4', title: 'Regularización', minutes: 20 },
        ],
        tasks: [{ id: 't2', title: 'Tarea: Regresión', dueAt: new Date(Date.now()+864e5*3).toISOString() }],
      },
    ],
    tasks: [
      { id: 't3', title: 'Proyecto AE: Operación Atlas', dueAt: new Date(Date.now()+864e5*10).toISOString(), project: 'Operación Atlas' },
    ],
    materials: [
      { id: 'm1', title: 'Sílabos (PDF)', type: 'pdf', url: '/docs/silabo.pdf' },
      { id: 'm2', title: 'Playlist YouTube', type: 'video', url: 'https://youtube.com/...' },
    ],
  },
  'seg-inf': {
    id: 'seg-inf',
    title: 'Seguridad de la Información',
    career: 'Ing. Sistemas',
    units: [],
    tasks: [],
    materials: [],
  },
  'aud-sis': {
    id: 'aud-sis',
    title: 'Auditoría de Sistemas',
    career: 'Ing. Sistemas',
    units: [],
    tasks: [],
    materials: [],
  },
}

export async function getCourseById(id: string): Promise<Course | null> {
  await new Promise(r => setTimeout(r, 50)) // simular IO
  return db[id] ?? null
}
