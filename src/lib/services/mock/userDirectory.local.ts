// Pequeño directorio local de usuarios con roles y matrícula en cursos.

export type UserRole = 'STUDENT' | 'TEACHER';

export type User = {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;       // si no hay, se muestran iniciales
  courses: string[];        // ids de course donde está matriculado
};

const USERS: User[] = [
  { id: 'u-matias', name: 'Matías Flores', role: 'STUDENT', avatarUrl: '', courses: ['ml-101', 'ml-102'] },
  { id: 'u-valentina', name: 'Valentina Ruiz', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-diego', name: 'Diego Castro', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-camila', name: 'Camila Rojas', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-sofia', name: 'Sofía Herrera', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-luis', name: 'Luis Gutiérrez', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-daniela', name: 'Daniela Paredes', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-joaquin', name: 'Joaquín Torres', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-renata', name: 'Renata Vargas', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-bruno', name: 'Bruno Morales', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-lucia', name: 'Lucía Quispe', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-andres', name: 'Andrés Ponce', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-maria', name: 'María Salazar', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-thiago', name: 'Thiago Pérez', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-isabella', name: 'Isabella León', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-gael', name: 'Gael Reyes', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-antonella', name: 'Antonella Campos', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-emilio', name: 'Emilio Delgado', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-mia', name: 'Mía Fernández', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  { id: 'u-santiago', name: 'Santiago Soto', role: 'STUDENT', avatarUrl: '', courses: ['ml-101'] },
  // Puedes agregar TEACHER si quieres listar docentes
];

export function getStudentsForCourse(courseId: string): User[] {
  return USERS.filter(u => u.role === 'STUDENT' && u.courses.includes(courseId));
}
