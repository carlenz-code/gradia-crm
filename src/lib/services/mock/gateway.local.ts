// src/lib/services/mock/gateway.local.ts
// Orquesta los mocks existentes para comportarse "como backend".

import {
  MOCK_DB as COURSES,
  getCourseByIdMock as getCourseById,
} from './courses.mock';
import { getTaskResourcesMock } from './taskResources.mock';

import {
  seedCohort,
  resetSubmissions,
  getSubmissions,
  setSubmissions,
  submitTask,
  upsertGrade,
  listForTeacher,
  type Submission,
} from './taskSubmissions.local';

import {
  listCoursesForUser as listCourseIdsForUser,
  getStudentsForCourse,
} from './userDirectory.local';

type Course = (typeof COURSES)[string];

/* ===== cursos visibles para un usuario (dashboard) ===== */
export async function listCoursesForUser(userId: string) {
  const ids = listCourseIdsForUser(userId);
  return ids.map((id) => COURSES[id]).filter(Boolean) as Course[];
}

/* ===== curso por id ===== */
export { getCourseById, getTaskResourcesMock };

/* ===== entregas (docente) ===== */
export function listStudentsForTeacher(taskId: string, courseId: string) {
  return listForTeacher(taskId, courseId);
}
export { seedCohort, resetSubmissions, getSubmissions, setSubmissions, upsertGrade };

/* ===== envío de tarea (alumno) ===== */
export async function submitMyTask(
  taskId: string,
  user: { id: string; name: string },
  files: File[]
) {
  return submitTask(taskId, user, files);
}

/* ===== utilidades ===== */
export { getStudentsForCourse };
export type { Submission };
