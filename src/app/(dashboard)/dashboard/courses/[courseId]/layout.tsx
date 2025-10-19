import { use } from 'react';
import CourseSidebar from '@/components/course/sidebar/CourseSidebar';
import { getCurrentUser } from '@/lib/auth';
import { makeMockCourse } from '@/lib/services/mock/courses.mock'; 

export default function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const user = use(getCurrentUser());

  // 👉 mientras no haya backend, usamos mock:
  const course = makeMockCourse(courseId, user.role);

  return (
    <div className="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)]">
      <aside className="min-w-0">
        <CourseSidebar course={course} role={user.role} />
      </aside>
      <main className="min-w-0">{children}</main>
    </div>
  );
}
