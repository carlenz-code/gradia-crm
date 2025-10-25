// src/components/course/task/TaskRolePanelClient.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { getCourseByIdMock } from '@/lib/services/mock/courses.mock';
import type { Course, Task as TaskType, Material } from '@/lib/types/course.types';
import type { TaskSubmission, TaskResource as TaskRes } from '@/lib/types/task.types';

import TaskHeaderCard from './TaskHeaderCard';
import TaskDescription from './pieces/TaskDescription';
import TaskResources from './pieces/TaskResources';
import TaskSubmissionBox from './student/TaskSubmissionBox';
import TaskComments from './pieces/TaskComments';
import TeacherStudentsList from './teacher/TeacherStudentsList';
import NewTaskModal from './teacher/NewTaskModal';
import AddResourceModal from './teacher/AddResourceModal';

import { getTaskResourcesMock } from '@/lib/services/mock/taskResources.mock';

// Persistencia local (sin backend)
import {
  getTaskMeta,
  setTaskDescription,
  addTaskResource,
  removeTaskResource,
  type LocalResource,
  type TaskMeta,
} from '@/lib/services/mock/taskMeta.local';

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
  // ===== estado base del curso/tarea =====
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  // recursos provenientes de mocks/curso
  const [taskResources, setTaskResources] = useState<Resource[]>([]);

  // meta local (title, dueAt, description, resources agregados)
  const [meta, setMeta] = useState<TaskMeta>({});
  const [openAdd, setOpenAdd] = useState(false);

  // Modal Nueva/Editar tarea (escuchado desde SidebarActions)
  const [openNewTask, setOpenNewTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const ce = e as CustomEvent<{ taskId?: string }>;
      setEditTaskId(ce.detail?.taskId); // si llega => editar, si no => crear
      setOpenNewTask(true);
    };
    document.addEventListener('open-create-task', onOpen as EventListener);
    return () => document.removeEventListener('open-create-task', onOpen as EventListener);
  }, []);

  // ===== cargar curso =====
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

  // ===== localizar módulo y tarea =====
  const findModuleByTask = (c: Course | null) =>
    c?.units.find((u) => u.tasks.some((t) => t.id === taskId)) ?? null;

  const getTaskFromModule = (u: Course['units'][number] | null): TaskType | null =>
    u ? u.tasks.find((t) => t.id === taskId) ?? null : null;

  const modulo = useMemo(() => findModuleByTask(course), [course, taskId]);
  const task = useMemo(() => getTaskFromModule(modulo), [modulo, taskId]);

  const moduleLabel = useMemo(() => {
    if (!course || !modulo) return 'Módulo —';
    const idx = course.units.indexOf(modulo);
    return `Módulo ${idx + 1}`;
  }, [course, modulo]);

  // ===== mapear materiales del curso a "Resource" =====
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
      pdf: 'pdf', slide: 'slide', notebook: 'notebook', link: 'link', other: 'document',
    };
    return { id: r.id, title: r.title, type: map[r.type], url: r.url };
  };

  // ===== cargar recursos por tarea (mock) =====
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

  // ===== cargar meta local por taskId =====
  useEffect(() => {
    setMeta(getTaskMeta(taskId));
  }, [taskId]);

  // ===== merge de recursos: primero los agregados por docente (meta), luego los base =====
  const mergedResources: Resource[] = useMemo(() => {
    const extra = (meta.resources ?? []).map<Resource>(r => ({
      id: r.id,
      title: r.title,
      type: r.type,
      url: r.url,
      size: r.size,
      updatedAt: r.updatedAt ?? undefined,
    }));
    return [...extra, ...(taskResources ?? [])];
  }, [meta.resources, taskResources]);

  // ===== campos efectivos (title, dueAt, description) =====
  const effectiveTitle = (meta.title ?? task?.title) ?? '';
  const effectiveDueAt = (meta.dueAt ?? task?.dueAt) ?? null;
  const effectiveDescription = (meta.description ?? (task as any)?.description) ?? '';

  // ===== handlers =====
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

  const handleSaveDescription = (next: string) => {
    const updated = setTaskDescription(taskId, next);
    setMeta(m => ({ ...m, description: updated.description }));
  };

  const handleAddResource = (r: { title: string; type: LocalResource['type']; url: string; size?: string }) => {
    const added = addTaskResource(taskId, r);
    setMeta(m => ({ ...m, resources: [added, ...(m.resources ?? [])] }));
  };

  const handleRemoveResource = (id: string) => {
    const updated = removeTaskResource(taskId, id);
    setMeta(m => ({ ...m, resources: updated.resources }));
  };

  // ===== loading / guards =====
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 rounded-2xl border border-[var(--border)] bg-[var(--section)] animate-pulse" />
        <div className="h-64 rounded-2xl border border-[var(--border)] animate-pulse" />
        <div className="h-40 rounded-2xl border border-[var(--border)] animate-pulse" />
      </div>
    );
  }
  if (!course) return <div>No se encontró el curso.</div>;
  if (!task) return <div>Tarea no encontrada.</div>;

  // ===== header (usa valores efectivos y oculta nota en TEACHER dentro del componente) =====
  const Header = (
    <TaskHeaderCard
      role={role}
      eyebrow={moduleLabel}
      title={effectiveTitle}
      dueAt={effectiveDueAt ?? undefined}
      grade={task.grade}
    />
  );

  // ===== glow de fondo (mitad derecha) =====
  const Glow = (
    <div className="pointer-events-none absolute -z-10 top-[-160px] bottom-[-160px] left-1/2 right-[-160px]">
      <div
        aria-hidden
        className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]"
        style={{
          background: `
            radial-gradient(
              closest-side,
              rgb(var(--brand-rgb,139 140 251)/0.22) 0%,
              rgb(var(--brand-rgb,139 140 251)/0.14) 36%,
              rgb(var(--brand-rgb,139 140 251)/0.08) 56%,
              transparent 74%
            )
          `,
        }}
      />
    </div>
  );

  // ===== vistas por rol =====
  if (role === 'STUDENT') {
    return (
      <div className="relative space-y-6 z-0">
        {Glow}
        {Header}

        <div className="grid md:grid-cols-2 gap-5">
          <TaskDescription
            role={role}
            description={effectiveDescription}
            onViewRubric={() => alert('Rúbrica próximamente')}
          />
          <div className="space-y-5">
            <TaskSubmissionBox taskId={taskId} onSubmitted={handleSubmitted} />
            <TaskResources
              role={role}
              resources={mergedResources}
              onDownloadAll={onDownloadAll}
            />
          </div>
        </div>

        <TaskComments taskId={taskId} role={role} />
      </div>
    );
  }

  // ===== TEACHER =====
  return (
    <div className="relative space-y-6 z-0">
      {Glow}
      {Header}

      {/* Lista de estudiantes del docente */}
     <TeacherStudentsList taskId={taskId} courseId={courseId} />


      <div className="grid md:grid-cols-2 gap-5">
        <TaskDescription
          role={role}
          description={effectiveDescription}
          onViewRubric={() => alert('Rúbrica (edición docente) próximamente')}
          onSaveDescription={handleSaveDescription}
        />

        <TaskResources
          role={role}
          resources={mergedResources}
          onDownloadAll={onDownloadAll}
          onAddResource={() => setOpenAdd(true)}
          onRemoveResource={handleRemoveResource}
        />
      </div>

      <TaskComments taskId={taskId} role={role} />

      {/* Modal agregar recurso */}
      <AddResourceModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={handleAddResource}
      />

      {/* Modal crear/editar tarea (escuchado desde SidebarActions) */}
      <NewTaskModal
        open={openNewTask}
        onClose={() => setOpenNewTask(false)}
        courseId={courseId}
        defaultTaskId={editTaskId}
        onSave={(res) => {
          // Refresca meta en memoria (header/descripcion al instante)
          setMeta(m => ({
            ...m,
            title: res.title,
            dueAt: res.dueAt ?? undefined,
            description: res.description,
          }));
        }}
      />
    </div>
  );
}
