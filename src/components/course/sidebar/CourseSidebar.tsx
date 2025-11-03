'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Course } from '@/lib/types/course.types';
import type { Role } from '@/lib/types';

import SidebarHeader from './SidebarHeader';
import SidebarActions from './SidebarActions';
import SidebarUnitList from './SidebarUnitList';
import SidebarSkeleton from './SidebarSkeleton';

type Variant = 'rail' | 'embedded';

type Props = {
  course?: Course;
  role: Role;
  exitHref?: string;
  loading?: boolean;
  /**
   * 'rail'    => sidebar fijo tipo rail (sticky a la izquierda)
   * 'embedded'=> columna dentro del grid
   */
  variant?: Variant;
};

export default function CourseSidebar({
  course,
  role,
  exitHref = '/dashboard/courses',
  loading,
  variant = 'rail', // valor por defecto
}: Props) {
  const pathname = usePathname();
  const [openUnitId, setOpenUnitId] = useState<string | null>(null);

  const firstUnitId = course?.units?.[0]?.id ?? null;
  const effectiveOpen = useMemo(
    () => openUnitId ?? firstUnitId,
    [openUnitId, firstUnitId]
  );

  // estilos base comunes
  const common = 'overflow-y-auto py-4';

  // rail: sticky tomando alto de viewport menos header
  const rail =
    'lg:sticky lg:top-[calc(var(--header-h)-1px)] ' +
    'lg:h-[calc(100vh-var(--header-h)+1px)] ' +
    // 👇 dejamos padding interno a la derecha y el borde,
    // PERO quitamos cualquier margen externo (antes había mr-2)
    'lg:pr-4 lg:border-r border-[var(--border)]';

  // embedded: solo separador inferior en móvil
  const embedded = 'border-b border-[var(--border)] lg:border-b-0';

  const asideClass = `${common} ${variant === 'rail' ? rail : embedded}`;

  if (loading) {
    return (
      <aside className={asideClass}>
        <SidebarSkeleton />
      </aside>
    );
  }

  if (!course) {
    return (
      <aside className={asideClass}>
        <div className="p-2 text-[13px] text-[color:var(--muted)]">
          No se encontró el curso.
        </div>
      </aside>
    );
  }

  return (
    <aside className={asideClass}>
      <SidebarHeader title={course.title} exitHref={exitHref} />
      {role === 'TEACHER' && <SidebarActions />}

      <SidebarUnitList
        units={course.units}
        courseId={course.id}
        pathname={pathname}
        openUnitId={effectiveOpen}
        onToggle={(id) => setOpenUnitId((prev) => (prev === id ? null : id))}
      />
    </aside>
  );
}
