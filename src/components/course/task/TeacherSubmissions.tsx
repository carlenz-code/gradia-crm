// components/course/task/TeacherSubmissions.tsx
'use client';
import SectionShell from './pieces/SectionShell';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import { useTaskSubmissions } from '@/lib/hooks/useTaskSubmissions';

export default function TeacherSubmissions({ taskId }: { taskId: string }) {
  const { items, loading } = useTaskSubmissions(taskId);

  return (
    <SectionShell>
      <div className="flex items-center justify-between mb-3">
        <div className="text-[14px] font-semibold">Entregas</div>
        <div className="flex gap-2">
          <button className="h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--section)] text-[13px] flex items-center gap-2">
            <ArrowDown2 size={16} /> Descargar ZIP
          </button>
          <button className="h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--section)] text-[13px] flex items-center gap-2">
            <ArrowUp2 size={16} /> Subir calificaciones
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-[13px] text-[color:var(--muted)]">Cargando…</div>
      ) : (
        <ul className="divide-y divide-[var(--border)]">
          {items.map((s) => (
            <li key={s.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="text-[14px] font-medium">{s.studentName}</div>
                <div className="text-[12px] text-[color:var(--muted)]">
                  {s.status} · {new Date(s.submittedAt).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--section)] text-[13px]">
                  Ver
                </button>
                <button className="h-9 px-3 rounded-lg bg-[var(--brand)]/10 border border-[var(--brand)]/30 text-[13px] text-[var(--brand)]">
                  Calificar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SectionShell>
  );
}
