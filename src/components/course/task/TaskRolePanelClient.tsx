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
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [taskResources, setTaskResources] = useState<Resource[]>([]);
  const [meta, setMeta] = useState<TaskMeta>({});
  const [openAdd, setOpenAdd] = useState(false);
  const [openNewTask, setOpenNewTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | undefined>(undefined);

  // 👉 NUEVO: estado del tab
  const [tab, setTab] = useState<'task' | 'comments'>('task');

  // Modal para crear tarea desde evento global
  useEffect(() => {
    const onOpen = (e: Event) => {
      const ce = e as CustomEvent<{ taskId?: string }>;
      setEditTaskId(ce.detail?.taskId);
      setOpenNewTask(true);
    };
    document.addEventListener('open-create-task', onOpen as EventListener);
    return () => document.removeEventListener('open-create-task', onOpen as EventListener);
  }, []);

  // Cargar curso
  useEffect(() => {
    let mounted = true;
    (async () => {
      const c = await getCourseByIdMock(courseId);
      if (!mounted) return;
      setCourse(c);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [courseId]);

  // Buscar módulo y tarea
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

  // Mapear recursos
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

  // Cargar recursos
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
    return () => {
      mounted = false;
    };
  }, [taskId, course]);

  // Meta (localStorage)
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

  // Datos efectivos
  const effectiveTitle = (meta.title ?? task?.title) ?? '';
  const effectiveDueAt = (meta.dueAt ?? task?.dueAt) ?? null;
  const effectiveDescription = (meta.description ?? (task as any)?.description) ?? '';

  // Handlers
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

  if (loading) return <div className="h-48 animate-pulse bg-[var(--section)] rounded-2xl" />;
  if (!course || !task) return <div>No se encontró la tarea.</div>;

  // Header (vive dentro del tab "Tarea")
  const Header = (
    <TaskHeaderCard
      role={role}
      eyebrow={moduleLabel}
      title={effectiveTitle}
      dueAt={effectiveDueAt ?? undefined}
      grade={task.grade}
    />
  );

  /** ====== RENDER ======
   *  Barra de tabs pegada al sidebar con línea continua (border-t).
   *  Tabs con fondo gris claro, borde gris claro, texto negro.
   */
  return (
    <div className="relative z-0">
      {/* Línea superior que conecta con el sidebar */}
      <div className="border-t border-[var(--border)] -mt-[1px]" />

      {/* Barra de tabs */}
      <div className="flex items-end gap-2 pt-3">
        <TabButton active={tab === 'task'} onClick={() => setTab('task')}>
          Tarea
        </TabButton>
        <TabButton active={tab === 'comments'} onClick={() => setTab('comments')}>
          Comentarios
        </TabButton>

        {/* línea que se extiende hasta el final para “unir” visualmente */}
        <div className="flex-1 border-b border-[var(--border)] translate-y-[1px]" />
      </div>

      {/* Contenido del tab */}
      {tab === 'task' ? (
        <div className="mt-4 flex gap-6">
          {/* Columna central */}
          <div className="flex-1 space-y-6 pr-4">
            {Header}

            {role === 'TEACHER' && (
              <TeacherStudentsList taskId={taskId} courseId={courseId} />
            )}

            <TaskDescription
              role={role}
              description={effectiveDescription}
              onViewRubric={() => alert('Rúbrica próximamente')}
              onSaveDescription={role === 'TEACHER' ? handleSaveDescription : undefined}
            />
          </div>

          {/* Columna derecha */}
          <div className="w-[280px] shrink-0 space-y-6">
            {role === 'STUDENT' && (
              <TaskSubmissionBox taskId={taskId} onSubmitted={() => {}} />
            )}

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
          </div>
        </div>
      ) : (
        // Tab: Comentarios (solo comentarios, a ancho de contenido)
        <div className="mt-4">
          <TaskComments taskId={taskId} role={role} />
        </div>
      )}

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

/** Botón de tab, con estilo gris claro, borde gris, texto negro */
function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'h-10 px-4 rounded-t-xl text-[13px] font-medium',
        'border border-b-0',
        active
          ? 'bg-[var(--card)] border-[var(--border)] text-black dark:text-white'
          : 'bg-[var(--section)] border-[var(--border)] text-black/80 dark:text-white/85 hover:bg-[var(--card)]',
      ].join(' ')}
      style={{ transform: 'translateY(1px)' }} // hace que el borde inferior se funda con la línea
    >
      {children}
    </button>
  );
}
