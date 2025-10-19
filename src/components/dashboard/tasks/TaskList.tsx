'use client';
import type { TaskSummary } from '@/lib/types/dashboard.types';
import Link from 'next/link';
import { ArrowRight3 } from 'iconsax-react';

export default function TaskList({ tasks }: { tasks: TaskSummary[] }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)]">
      <div className="p-3 border-b border-[var(--border)] text-[13px] font-medium">Tareas pendientes</div>
      <ul className="divide-y divide-[var(--border)]">
        {tasks.map(t => (
          <li key={t.id} className="p-3 flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-medium truncate">{t.title}</div>
              <div className="text-[12px] text-[color:var(--muted)] truncate">
                {t.courseTitle} • vence {new Date(t.dueAt).toLocaleDateString()}
              </div>
            </div>
            <Link
              href={`/dashboard/courses/${t.courseTitle.toLowerCase().replace(/\s+/g, '-')}/task/${t.id}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] hover:bg-[var(--section)]"
            >
              <ArrowRight3 size={18} color="var(--icon)" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
