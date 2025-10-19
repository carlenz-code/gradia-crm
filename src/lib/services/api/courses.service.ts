import type { Course } from '@/lib/types/course.types';
import { getCourseByIdMock } from '@/lib/services/mock/courses.mock';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // ej. https://api.midominio.com

/** Trae el curso. Si no hay backend o falla, usa MOCK. */
export async function fetchCourseById(courseId: string): Promise<Course | null> {
  // 1) Si NO hay backend configurado → mock
  if (!BASE_URL) return getCourseByIdMock(courseId);

  try {
    // 2) Intentar backend real
    const res = await fetch(`${BASE_URL}/courses/${courseId}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Course;
    return data;
  } catch (err) {
    // 3) Fallback al mock si falla
    console.warn('[courses.service] usando MOCK por error en API:', err);
    return getCourseByIdMock(courseId);
  }
}
