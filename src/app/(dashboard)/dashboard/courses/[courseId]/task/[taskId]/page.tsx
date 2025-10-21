// app/(dashboard)/dashboard/courses/[courseId]/task/[taskId]/page.tsx
import { use } from 'react';
import { getCurrentUser } from '@/lib/auth';
import TaskRolePanelClient from '@/components/course/task/TaskRolePanelClient';

export default function TaskDetailPage({
  params,
}: { params: Promise<{ courseId: string; taskId: string }> }) {
  const { courseId, taskId } = use(params);
  const user = use(getCurrentUser()); // 'STUDENT' | 'TEACHER'

  return (
    // ❌ sin barra título aquí — el header lo renderiza el client
    <div className="space-y-5">
      <TaskRolePanelClient role={user.role} courseId={courseId} taskId={taskId} />
    </div>
  );
}
