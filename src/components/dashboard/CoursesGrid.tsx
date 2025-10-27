'use client';

import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/lib/auth.client';
import { listCoursesForUser } from '@/lib/services/mock/gateway.local';
import type { Course } from '@/lib/types/course.types';
import CourseCard, { CourseCardSkeleton } from './CourseCard';

export default function CoursesGrid() {
  const user = useCurrentUser();
  const [courses, setCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    let alive = true;
    listCoursesForUser(user.id).then((res) => alive && setCourses(res));
    return () => { alive = false; };
  }, [user.id]);

  if (!courses) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => <CourseCardSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((c) => {
        const units = c.units?.length ?? 0;
        const tasks = c.units?.reduce((acc, u) => acc + (u.tasks?.length ?? 0), 0) ?? 0;
        return (
          <CourseCard
            key={c.id}
            id={c.id}
            titulo={c.title}
            carrera={c.career}
            estadistica1={`${units} unidades`}
            estadistica2={`${tasks} actividades`}
            docente={undefined}
            progress={Math.min(100, Math.round(Math.random() * 80 + 10))}
          />
        );
      })}
    </div>
  );
}
