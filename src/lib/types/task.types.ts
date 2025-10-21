// lib/types/task.types.ts
export type Role = 'STUDENT' | 'TEACHER';

export type TaskResource = {
  id: string;
  title: string;
  type: 'pdf' | 'slide' | 'notebook' | 'link' | 'other';
  url: string;
};

export type TaskDetail = {
  id: string;
  courseId: string;
  title: string;
  description: string;            // markdown o texto llano
  dueAt?: string | null;          // ISO
  status?: 'PENDING' | 'SUBMITTED' | 'GRADED';
  grade?: string | null;          // '—' | '16' | null
  resources: TaskResource[];
  mySubmission?: TaskSubmission | null;  // última entrega del alumno
};

export type TaskSubmission = {
  id: string;
  studentId: string;
  studentName: string;
  submittedAt: string;            // ISO
  files: { name: string; url?: string; size?: number }[];
  grade?: string | null;
  feedback?: string | null;
  status: 'SUBMITTED' | 'RETURNED' | 'MISSING';
};

export type TaskComment = {
  id: string;

  /** ← agregado para separar hilos por tarea */
  taskId: string;

  authorId: string;
  authorName: string;
  role: Role;

  createdAt: string;              // ISO
  body: string;

  /** null si es comentario raíz; id del padre si es respuesta */
  parentId: string | null;

  /** opcional: si luego quieres contadores */
  likes?: number;
};
