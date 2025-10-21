// src/lib/types/course.types.ts

// ===== Rol de usuario (para distinguir vistas) =====
export type Role = 'STUDENT' | 'TEACHER';

export type Course = {
  id: string;
  title: string;
  career: string;
  units: Unit[];
  tasks: Task[];
  materials: Material[];
};

export type Unit = {
  id: string;
  title: string;
  lessons: { id: string; title: string; minutes?: number }[];
  tasks: Task[];
};

export type Task = {
  id: string;
  title: string;
  dueAt: string; // ISO
  project?: string;
  grade?: string | null;
};

export type Material = {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'slide' | 'link';
  url: string;
};
