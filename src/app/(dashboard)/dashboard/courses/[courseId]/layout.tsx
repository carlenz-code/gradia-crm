// src/app/(dashboard)/dashboard/courses/[courseId]/layout.tsx
'use client';

import { use } from 'react';
import { useMemo } from 'react';
import CourseSidebar from '@/components/course/sidebar/CourseSidebar';
import { makeMockCourse } from '@/lib/services/mock/courses.mock';
import { useCurrentUser } from '@/lib/auth.client';
import Container from '@/components/common/Container'; // 👈 importa el Container

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
    // 👇 usamos el mismo Container que el Header para alinear bordes
    <Container className="">
      <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-6">
        {/* Sidebar rail */}
        <aside className="min-w-0">
          <CourseSidebar course={course} role={user.role} />
        </aside>

        {/* Contenido principal */}
        <main className="min-w-0">
          {children}
        </main>
      </div>
    </Container>
  );
}
