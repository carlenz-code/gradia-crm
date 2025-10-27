'use client';

import type { MinimalUser } from '@/lib/types';
import SectionHeader from '@/components/dashboard/SectionHeader';
import CourseCard, { CourseCardSkeleton } from '@/components/dashboard/CourseCard';
import { useUserCourses } from '@/lib/hooks/useUserCourses';

export default function TeacherGeneralTab({ user }: { user: MinimalUser }) {
  const first = user.name.split(' ')[0];
  const { courses, loading } = useUserCourses(user.id);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--section)] px-5 py-6">
        <h1 className="text-3xl font-medium">¡Hola, {first}! 👋</h1>
        <p className="text-[color:var(--muted)] text-[16px]">
          Vista de docente. Aquí verás tus cursos y actividades por revisar.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <SectionHeader title="Cursos que imparto" />
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {loading && (<><CourseCardSkeleton/><CourseCardSkeleton/><CourseCardSkeleton/></>)}
          {!loading && (courses ?? []).map((c) => (
            <CourseCard
              key={c.id}
              id={c.id}
              titulo={c.title}
              carrera={c.career}
              estadistica1={`${c.units?.length ?? 0} unidades`}
              estadistica2={`${(c.units?.flatMap(u => u.tasks) ?? []).length} tareas`}
              docente={user.name}
              progress={Math.min(100, Math.round(Math.random()*70)+20)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
