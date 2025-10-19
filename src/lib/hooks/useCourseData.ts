'use client';
import { useEffect, useState } from 'react';
import type { Course } from '@/lib/types/course.types';
import { fetchCourseById } from '@/lib/services/api/courses.service';

export function useCourseData(courseId: string) {
  const [data, setData] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchCourseById(courseId)
      .then(c => { if (alive) setData(c); })
      .catch(e => { if (alive) setError(e); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [courseId]);

  return { data, loading, error };
}
