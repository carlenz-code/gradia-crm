'use client';

import { AnimatePresence, motion } from '@/lib/utils/motion';
import type { Unit } from '@/lib/types/course.types';
import SidebarTaskItem from './SidebarTaskItem';

export default function SidebarUnitItem({
  unit,
  unitOrder,
  courseId,
  pathname,
  open,
  onToggle,
}: {
  unit: Unit;
  unitOrder: number;
  courseId: string;
  pathname: string;
  open: boolean;
  onToggle: () => void;
}) {
  const total = unit.tasks.length;

  return (
    <li className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      {/* Header del módulo */}
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-[var(--section)] transition"
      >
        <span className="mt-[4px] inline-block h-2 w-2 rounded-full bg-[var(--brand)]/70 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium text-[color:var(--muted)]">
            Módulo {unitOrder}
          </div>
          <div className="text-[15px] font-semibold leading-snug line-clamp-2 text-[color:var(--fg)]">
            {unit.title}
          </div>
        </div>
        <span
          aria-hidden
          className="ml-2 mt-[2px] inline-grid place-items-center h-6 w-6 rounded-md bg-[var(--section)] text-[11px] text-[color:var(--muted)]"
          title={`${total} tareas`}
        >
          {total}
        </span>
        <svg
          className={['ml-1 h-4 w-4 shrink-0 transition-transform', open ? 'rotate-180' : 'rotate-0'].join(' ')}
          viewBox="0 0 20 20"
          fill="currentColor"
          style={{ color: 'var(--icon)' }}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.06 1.06l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Lista de tareas */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="border-t border-[var(--border)] bg-[var(--section)]/30"
          >
            {unit.tasks.length === 0 ? (
              <div className="px-3 py-3 text-[13px] text-[color:var(--muted)]">No hay tareas</div>
            ) : (
              <ul className="py-1">
                {unit.tasks.map((t, i) => (
                  <SidebarTaskItem
                    key={t.id}
                    task={t}
                    href={`/dashboard/courses/${courseId}/task/${t.id}`}
                    active={pathname === `/dashboard/courses/${courseId}/task/${t.id}`}
                    delay={i * 0.02}
                  />
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
