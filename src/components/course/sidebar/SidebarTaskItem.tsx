'use client';

import Link from 'next/link';
import { motion } from '@/lib/utils/motion';
import type { Task } from '@/lib/types/course.types';

// 🔧 Acepta number | string | null (para convivir con mocks actuales)
type MaybeGradedTask = Task & { grade?: number | string | null };

// helper: ISO → dd/mm/yyyy
function formatISO(dateISO?: string) {
  if (!dateISO) return 'Sin fecha';
  const d = new Date(dateISO);
  if (Number.isNaN(+d)) return 'Sin fecha';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = d.getFullYear();
  return `${dd}/${mm}/${yy}`;
}

// helper: decidir si hay nota “real”
function hasGrade(g: unknown) {
  if (typeof g === 'number') return true;
  if (typeof g === 'string') {
    if (g.trim() === '' || g.trim() === '—') return false;
    return !Number.isNaN(Number(g));
  }
  return false;
}

// helper: mostrar la nota como texto
function gradeText(g: unknown) {
  if (!hasGrade(g)) return '—';
  return typeof g === 'number' ? String(g) : String(g);
}

export default function SidebarTaskItem({
  task,
  href,
  active,
  delay = 0,
}: {
  task: MaybeGradedTask;   // 👈 ahora Task también encaja porque grade es opcional
  href: string;
  active: boolean;
  delay?: number;
}) {
  const graded = hasGrade(task.grade);

  return (
    <motion.li initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Link
        href={href}
        className={[
          'group relative block px-4 py-2.5 transition rounded-lg mx-1 my-[1px]',
          active ? 'bg-[var(--brand)]/10' : 'hover:bg-[var(--section)]',
        ].join(' ')}
      >
        <div className="pr-10">
          <div className="text-[14px] font-medium text-[color:var(--fg)] leading-snug line-clamp-2">
            {task.title}
          </div>
          <div className="mt-0.5 text-[12px] text-[color:var(--muted)]">
            Entrega: {formatISO(task.dueAt)}
          </div>
        </div>

        {/* Nota */}
        <motion.div
          className={[
            'absolute top-1/2 -translate-y-1/2 right-3 h-7 w-7 rounded-full grid place-items-center',
            'text-[12px] font-semibold',
            graded ? 'bg-emerald-100 text-emerald-800' : 'bg-[var(--section)] text-[color:var(--muted)]',
          ].join(' ')}
          animate={graded ? { scale: [1, 1.08, 1] } : {}}
          transition={graded ? { duration: 0.9, repeat: 1 } : {}}
          title={graded ? `Nota: ${gradeText(task.grade)}` : 'Sin nota'}
        >
          {gradeText(task.grade)}
        </motion.div>
      </Link>
    </motion.li>
  );
}
