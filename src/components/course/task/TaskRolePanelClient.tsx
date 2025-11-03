'use client';

import { useEffect, useMemo, useState } from 'react';
import { getCourseByIdMock } from '@/lib/services/mock/courses.mock';
import type { Course, Task as TaskType, Material } from '@/lib/types/course.types';
import type { TaskResource as TaskRes } from '@/lib/types/task.types';

import TaskHeaderCard from './TaskHeaderCard';
import TaskDescription from './pieces/TaskDescription';
import TaskResources from './pieces/TaskResources';
import TaskSubmissionBox from './student/TaskSubmissionBox';
import TaskComments from './pieces/TaskComments';
import TeacherStudentsList from './teacher/TeacherStudentsList';
import NewTaskModal from './teacher/NewTaskModal';
import AddResourceModal from './teacher/AddResourceModal';

import { getTaskResourcesMock } from '@/lib/services/mock/taskResources.mock';
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
  // ===== state =====
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [taskResources, setTaskResources] = useState<Resource[]>([]);
  const [meta, setMeta] = useState<TaskMeta>({});
  const [openAdd, setOpenAdd] = useState(false);
  const [openNewTask, setOpenNewTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | undefined>(undefined);

  // ===== hooks =====
  useEffect(() => {
    const onOpen = (e: Event) => {
      const ce = e as CustomEvent<{ taskId?: string }>;
      setEditTaskId(ce.detail?.taskId);
      setOpenNewTask(true);
    };
    document.addEventListener('open-create-task', onOpen as EventListener);
    return () => document.removeEventListener('open-create-task', onOpen as EventListener);
  }, []);

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

  const modulo = useMemo(() => findModuleByTask(course), [course, taskId]);
  const task = useMemo(() => getTaskFromModule(modulo), [modulo, taskId]);

  const moduleLabel = useMemo(() => {
    if (!course || !modulo) return 'Módulo —';
    const idx = course.units.indexOf(modulo);
    return `Módulo ${idx + 1}`;
  }, [course, modulo]);

  const mapMaterialToResource = (m: Material): Resource => ({
    id: m.id,
    title: m.title,
    type: m.type as Resource['type'],
    url: m.url,
  });

  const normalizeTaskResource = (r: TaskRes): Resource => ({
    id: r.id,
    title: r.title,
    type: r.type === 'other' ? 'document' : (r.type as any),
    url: r.url,
  });

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

  useEffect(() => {
    setMeta(getTaskMeta(taskId));
  }, [taskId]);

  const mergedResources: Resource[] = useMemo(() => {
    const extra = (meta.resources ?? []).map<Resource>((r) => ({
      id: r.id,
      title: r.title,
      type: r.type,
      url: r.url,
      size: r.size,
      updatedAt: r.updatedAt ?? undefined,
    }));
    return [...extra, ...(taskResources ?? [])];
  }, [meta.resources, taskResources]);

  const effectiveTitle = (meta.title ?? task?.title) ?? '';
  const effectiveDueAt = (meta.dueAt ?? task?.dueAt) ?? null;
  const effectiveDescription = (meta.description ?? (task as any)?.description) ?? '';

  // ===== handlers =====
  const handleSaveDescription = (next: string) => {
    const updated = setTaskDescription(taskId, next);
    setMeta((m) => ({ ...m, description: updated.description }));
  };

  const handleAddResource = (r: { title: string; type: LocalResource['type']; url: string; size?: string }) => {
    const added = addTaskResource(taskId, r);
    setMeta((m) => ({ ...m, resources: [added, ...(m.resources ?? [])] }));
  };

  const handleRemoveResource = (id: string) => {
    const updated = removeTaskResource(taskId, id);
    setMeta((m) => ({ ...m, resources: updated.resources }));
  };

  // ===== ui =====
  if (loading) return <div className="h-48 animate-pulse bg-[var(--section)] rounded-2xl" />;
  if (!course || !task) return <div>No se encontró la tarea.</div>;

  return (
    <div className="relative z-0 space-y-6">
      {/* 1) Encabezado compacto de la tarea */}
      <TaskHeaderCard
        role={role}
        eyebrow={moduleLabel}
        title={effectiveTitle}
        dueAt={effectiveDueAt ?? undefined}
        grade={task.grade}
      />

      {/* 2) Si es docente, primero ve la lista de alumnos */}
      {role === 'TEACHER' && (
        <section>
          <TeacherStudentsList taskId={taskId} courseId={courseId} />
        </section>
      )}

      {/* 3) Descripción de la tarea */}
      <section>
        <TaskDescription
          role={role}
          description={effectiveDescription}
          onViewRubric={() => alert('Rúbrica próximamente')}
          onSaveDescription={role === 'TEACHER' ? handleSaveDescription : undefined}
        />
      </section>

      {/* 4) Entrega (solo estudiante) */}
      {role === 'STUDENT' && (
        <section>
          <TaskSubmissionBox taskId={taskId} onSubmitted={() => {}} />
        </section>
      )}

      {/* 5) Recursos (ambos roles, con CRUD solo docente) */}
      <section>
        <TaskResources
          role={role}
          resources={mergedResources}
          onDownloadAll={(res) => {
            res.forEach((r, i) => {
              setTimeout(() => {
                const a = document.createElement('a');
                a.href = r.url;
                a.download = '';
                a.target = '_blank';
                a.rel = 'noopener';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }, i * 120);
            });
          }}
          onAddResource={role === 'TEACHER' ? () => setOpenAdd(true) : undefined}
          onRemoveResource={role === 'TEACHER' ? handleRemoveResource : undefined}
        />
      </section>

      {/* 6) Comentarios (al final para ambos) */}
      <section>
        <TaskComments taskId={taskId} role={role} />
      </section>

      {/* Modales */}
      <AddResourceModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={handleAddResource}
      />

      <NewTaskModal
        open={openNewTask}
        onClose={() => setOpenNewTask(false)}
        courseId={courseId}
        defaultTaskId={editTaskId}
        onSave={(res) => {
          setMeta((m) => ({
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
