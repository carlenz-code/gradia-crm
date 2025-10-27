// src/lib/services/mock/userDirectory.local.ts
export type UserRole = 'STUDENT' | 'TEACHER';

export type User = {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  courses: string[];
  email: string;
  password: string;
  org?: string;
};

// === Base de usuarios (mock) ===
const USERS: User[] = [
  // ==== ESTUDIANTES ====
  { id: 'u-matias', name: 'Matías Flores', role: 'STUDENT', avatarUrl: '', courses: ['ml-101', 'aud-sis', 'seg-inf'], email: 'alumno@gradia.edu', password: '12345678', org: 'UPeU' },
  { id: 'u-valentina', name: 'Valentina Ruiz', role: 'STUDENT', avatarUrl: '', courses: ['ml-101', 'seg-inf'], email: 'valentina@gradia.edu', password: '12345678', org: 'UPeU' },
  { id: 'u-diego', name: 'Diego Castro', role: 'STUDENT', avatarUrl: '', courses: ['ml-101', 'seg-inf'], email: 'diego@gradia.edu', password: '12345678', org: 'UPeU' },
  { id: 'u-nicole', name: 'Nicole García', role: 'STUDENT', avatarUrl: '', courses: ['ml-101', 'aud-sis', 'seg-inf'], email: 'nicole@gradia.edu', password: '12345678', org: 'UPeU' },
  { id: 'u-carlo', name: 'Carlo Farfán', role: 'STUDENT', avatarUrl: '', courses: ['aud-sis', 'seg-inf'], email: 'carlo@gradia.edu', password: '12345678', org: 'UPeU' },
  { id: 'u-jose', name: 'José Ramírez', role: 'STUDENT', avatarUrl: '', courses: ['ml-101', 'aud-sis'], email: 'jose@gradia.edu', password: '12345678', org: 'UPeU' },
  { id: 'u-lucia', name: 'Lucía Paredes', role: 'STUDENT', avatarUrl: '', courses: ['ml-101', 'aud-sis', 'seg-inf'], email: 'lucia@gradia.edu', password: '12345678', org: 'UPeU' },
  { id: 'u-andrea', name: 'Andrea Torres', role: 'STUDENT', avatarUrl: '', courses: ['ml-101', 'seg-inf'], email: 'andrea@gradia.edu', password: '12345678', org: 'UPeU' },
  { id: 'u-luis', name: 'Luis Campos', role: 'STUDENT', avatarUrl: '', courses: ['aud-sis', 'seg-inf'], email: 'luis@gradia.edu', password: '12345678', org: 'UPeU' },

  // ==== DOCENTES ====
  { id: 'u-docente', name: 'María Docente', role: 'TEACHER', avatarUrl: '', courses: ['ml-101', 'seg-inf', 'aud-sis'], email: 'docente@gradia.edu', password: '12345678', org: 'UPeU' },
  { id: 'u-docente2', name: 'Carlos Gómez', role: 'TEACHER', avatarUrl: '', courses: ['aud-sis'], email: 'carlos@gradia.edu', password: '12345678', org: 'UPeU' },
  { id: 'u-docente3', name: 'Laura Ruiz', role: 'TEACHER', avatarUrl: '', courses: ['ml-101'], email: 'laura@gradia.edu', password: '12345678', org: 'UPeU' },
];

// === Funciones ===
export function getStudentsForCourse(courseId: string): User[] {
  return USERS.filter((u) => u.role === 'STUDENT' && u.courses.includes(courseId));
}

export function findUserByEmail(email: string): User | null {
  const u = USERS.find((x) => x.email.toLowerCase() === email.toLowerCase());
  return u ?? null;
}

export function getUserById(id: string): User | null {
  return USERS.find((u) => u.id === id) ?? null;
}

export function listCoursesForUser(userId: string): string[] {
  const u = getUserById(userId);
  return u?.courses ?? [];
}
