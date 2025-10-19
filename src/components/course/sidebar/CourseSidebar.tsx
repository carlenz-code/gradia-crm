'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

// ✅ tipos de dominio (tus tipos reales)
import type { Course } from '@/lib/types/course.types';
import type { Role } from '@/lib/types';

// ✅ subcomponentes locales
import SidebarHeader from './SidebarHeader';
import SidebarActions from './SidebarActions';
import SidebarUnitList from './SidebarUnitList';
import SidebarSkeleton from './SidebarSkeleton';

type Props = {
  course?: Course;        // dominio
  role: Role;             // 'STUDENT' | 'TEACHER'
  exitHref?: string;
  loading?: boolean;
};

export default function CourseSidebar({
  course,
  role,
  exitHref = '/dashboard/courses',
  loading,
}: Props) {
  const pathname = usePathname();
  const [openUnitId, setOpenUnitId] = useState<string | null>(null);

  const firstUnitId = course?.units?.[0]?.id ?? null;
  const effectiveOpen = useMemo(
    () => openUnitId ?? firstUnitId,
    [openUnitId, firstUnitId]
  );

  if (loading) return <SidebarSkeleton />;

  if (!course) {
    return (
      <aside className="lg:sticky lg:top-[calc(var(--header-h)+var(--rail-gap,8px))] lg:h-[calc(100vh-var(--header-h)-var(--rail-gap,8px))] lg:pr-4 lg:mr-2 lg:border-r lg:border-[var(--border)] overflow-y-auto">
        <div className="p-2 text-[13px] text-[color:var(--muted)]">
          No se encontró el curso.
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:sticky lg:top-[calc(var(--header-h)+var(--rail-gap,8px))] lg:h-[calc(100vh-var(--header-h)-var(--rail-gap,8px))] lg:pr-4 lg:mr-2 lg:border-r lg:border-[var(--border)] overflow-y-auto">
      <SidebarHeader title={course.title} exitHref={exitHref} />
      {role === 'TEACHER' && <SidebarActions />}
      <SidebarUnitList
        units={course.units}          // dominio: Unit[]
        courseId={course.id}
        pathname={pathname}
        openUnitId={effectiveOpen}
        onToggle={(id) => setOpenUnitId(prev => (prev === id ? null : id))}
      />
    </aside>
  );
}
