// src/components/course/task/TaskRolePanelClient.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { getCourseByIdMock } from '@/lib/services/mock/courses.mock';
import type { Course, Task as TaskType, Material } from '@/lib/types/course.types';
import type { TaskSubmission, TaskResource as TaskRes } from '@/lib/types/task.types';

import TaskHeaderCard from './TaskHeaderCard';
import TaskDescription from './TaskDescription';
import TaskResources from './TaskResources';
import TaskSubmissionBox from './TaskSubmissionBox';
import TaskComments from './TaskComments';

import { getTaskResourcesMock } from '@/lib/services/mock/taskResources.mock';

type Resource = {
  id: string;
  title: string;
  type: 'pdf' | 'document' | 'notebook' | 'slide' | 'link' | 'video';
  url: string;
  size?: string;
  updatedAt?: string;
};

export default function TaskRolePanelClient({
  role,
  courseId,
  taskId,
}: {
  role: 'STUDENT' | 'TEACHER';
  courseId: string;
  taskId: string;
}) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [taskResources, setTaskResources] = useState<Resource[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const c = await getCourseByIdMock(courseId);
      if (!mounted) return;
      setCourse(c);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [courseId]);

  const findModuleByTask = (c: Course | null) =>
    c?.units.find((u) => u.tasks.some((t) => t.id === taskId)) ?? null;

  const getTaskFromModule = (u: Course['units'][number] | null): TaskType | null =>
    u ? u.tasks.find((t) => t.id === taskId) ?? null : null;

  const mapMaterialToResource = (m: Material): Resource => {
    const lower = m.title.toLowerCase();
    const guessed: Resource['type'] =
      lower.includes('ipynb') || lower.includes('notebook') ? 'notebook'
      : lower.includes('pdf') ? 'pdf'
      : lower.includes('slide') || lower.includes('presentación') ? 'slide'
      : m.type === 'video' ? 'video'
      : m.type === 'pdf' ? 'pdf'
      : m.type === 'slide' ? 'slide'
      : m.type === 'link' ? 'link'
      : 'document';
    return { id: m.id, title: m.title, type: guessed, url: m.url };
  };

  const normalizeTaskResource = (r: TaskRes): Resource => {
    const map: Record<TaskRes['type'], Resource['type']> = {
      pdf: 'pdf',
      slide: 'slide',
      notebook: 'notebook',
      link: 'link',
      other: 'document',
    };
    return { id: r.id, title: r.title, type: map[r.type], url: r.url };
  };

  const modulo = useMemo(() => findModuleByTask(course), [course, taskId]);
  const task = useMemo(() => getTaskFromModule(modulo), [modulo, taskId]);

  const moduleLabel = useMemo(() => {
    if (!course || !modulo) return 'Módulo —';
    const idx = course.units.indexOf(modulo);
    return `Módulo ${idx + 1}`;
  }, [course, modulo]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const perTask = await getTaskResourcesMock(taskId);
      if (!mounted) return;
      if (perTask.length > 0) {
        setTaskResources(perTask.map(normalizeTaskResource));
      } else {
        setTaskResources((course?.materials ?? []).map(mapMaterialToResource));
      }
    })();
    return () => { mounted = false; };
  }, [taskId, course]);

  const onDownloadAll = (items: Resource[]) => {
    items.forEach((r, i) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = r.url;
        a.download = '';
        a.rel = 'noopener';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, i * 120);
    });
  };

  const handleSubmitted = (_sub: TaskSubmission) => {};

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 rounded-2xl border border-[var(--border)] bg-[var(--section)] animate-pulse" />
        <div className="grid md:grid-cols-2 gap-5">
          <div className="h-64 rounded-2xl border border-[var(--border)] animate-pulse" />
          <div className="space-y-5">
            <div className="h-28 rounded-2xl border border-[var(--border)] animate-pulse" />
            <div className="h-44 rounded-2xl border border-[var(--border)] animate-pulse" />
          </div>
        </div>
        <div className="h-40 rounded-2xl border border-[var(--border)] animate-pulse" />
      </div>
    );
  }

  if (!course) return <div>No se encontró el curso.</div>;
  if (!task) return <div>Tarea no encontrada.</div>;

  const description = (task as any)?.description ?? '';

  return (
    // 👇 SIN overflow-hidden aquí (para que la luz no se corte arriba)
    <div className="relative space-y-6 z-0">
      {/* 🔆 Glow centrado en TODA la mitad derecha (no solo una columna) */}
      <div className="pointer-events-none absolute -z-10 top-[-160px] bottom-[-160px] left-1/2 right-[-160px]">
        {/* El lienzo se expande 160px en top/bottom/right para que el fade
            muera antes de tocar bordes y no se note corte alguno. */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]"
          style={{
            background: `
              radial-gradient(
                closest-side,
                rgb(var(--brand-rgb, 139 140 251) / 0.22) 0%,
                rgb(var(--brand-rgb, 139 140 251) / 0.14) 36%,
                rgb(var(--brand-rgb, 139 140 251) / 0.08) 56%,
                transparent 74%
              )
            `,
            // Máscara para plumar bordes (arriba/abajo/der) y evitar “cortes”
            WebkitMaskImage: `
              radial-gradient(130% 130% at 50% 50%, #000 70%, transparent 100%),
              linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%),
              linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)
            `,
            maskImage: `
              radial-gradient(130% 130% at 50% 50%, #000 70%, transparent 100%),
              linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%),
              linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)
            `,
          }}
        />
      </div>

      {/* Header */}
      <TaskHeaderCard
        eyebrow={moduleLabel}
        title={task.title}
        dueAt={task.dueAt}
        grade={task.grade}
      />

      <div className="grid md:grid-cols-2 gap-5">
        <TaskDescription
          description={description}
          onViewRubric={() => alert('Rúbrica próximamente')}
        />

        <div className="space-y-5">
          <TaskSubmissionBox taskId={taskId} onSubmitted={handleSubmitted} />
          <TaskResources resources={taskResources} onDownloadAll={onDownloadAll} />
        </div>
      </div>

      <TaskComments taskId={taskId} role={role} />
    </div>
  );
}
