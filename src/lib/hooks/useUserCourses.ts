'use client';

import { useEffect, useState } from 'react';
import type { Course } from '@/lib/types/course.types';

// ✅ usa el gateway local que ya orquesta tus mocks
import { listCoursesForUser } from '@/lib/services/mock/gateway.local';

export function useUserCourses(userId: string) {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    (async () => {
      try {
        const res = await listCoursesForUser(userId);
        if (!alive) return;
        setCourses(res);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [userId]);

  return { courses, loading };
}
