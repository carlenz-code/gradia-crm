import { use } from 'react';
import { getCurrentUser } from '@/lib/auth';
import TaskRolePanelClient from '@/components/course/TaskRolePanelClient'; // ← único client

export default function TaskDetailPage({
  params,
}: { params: Promise<{ courseId: string; taskId: string }> }) {
  const { courseId, taskId } = use(params);
  const user = use(getCurrentUser()); // STUDENT | TEACHER

  return (
    <div className="space-y-4">
      {/* Barra título */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-4">
        <div className="text-[15px] sm:text-[16px] font-semibold">
          {`Unidad 1 · Tarea ${taskId}: Taller de análisis exploratorio`}
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="text-[color:var(--muted)]">Fecha de entrega:</span>
          <span className="font-medium text-[var(--brand)]">21/05/2025</span>
        </div>
      </div>

      {/* Todo lo interactivo/animado va en el client */}
      <TaskRolePanelClient role={user.role} courseId={courseId} taskId={taskId} />
    </div>
  );
}
