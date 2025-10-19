'use client';

import type { Unit } from '@/lib/types/course.types';
import SidebarUnitItem from './SidebarUnitItem';

export default function SidebarUnitList({
  units,
  courseId,
  pathname,
  openUnitId,
  onToggle,
}: {
  units: Unit[];
  courseId: string;
  pathname: string;
  openUnitId: string | null;
  onToggle: (id: string) => void;
}) {
  return (
    <ul className="grid gap-2">
      {units.map((u, idx) => (
        <SidebarUnitItem
          key={u.id}
          unit={u}
          unitOrder={idx + 1}
          courseId={courseId}
          pathname={pathname}
          open={openUnitId === u.id}
          onToggle={() => onToggle(u.id)}
        />
      ))}
    </ul>
  );
}
