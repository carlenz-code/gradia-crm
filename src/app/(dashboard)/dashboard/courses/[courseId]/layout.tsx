// src/app/(dashboard)/dashboard/courses/[courseId]/layout.tsx
'use client';

import { use } from 'react';
import { useMemo } from 'react';
import CourseSidebar from '@/components/course/sidebar/CourseSidebar';
import { makeMockCourse } from '@/lib/services/mock/courses.mock';
import { useCurrentUser } from '@/lib/auth.client';

export default function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const user = useCurrentUser();
  const course = useMemo(() => makeMockCourse(courseId, user.role), [courseId, user.role]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-6 px-4 lg:px-6">
      {/* Sidebar rail (fijo) */}
      <aside className="min-w-0">
        {/* Puedes omitir variant porque por defecto es 'rail' */}
        <CourseSidebar course={course} role={user.role} />
      </aside>

      {/* Contenido principal */}
      <main className="min-w-0 ">
        {children}
      </main>
    </div>
  );
}
