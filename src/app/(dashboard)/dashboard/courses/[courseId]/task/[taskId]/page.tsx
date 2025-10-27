// server component (no hooks aquí)
import TaskRolePanelBridge from '@/components/course/task/TaskRolePanelBridge';

export default function TaskDetailPage({
  params,
}: {
  params: { courseId: string; taskId: string };
}) {
  const { courseId, taskId } = params;

  // El rol ya no se lee aquí. Lo toma el bridge cliente via useCurrentUser().
  return (
    <div className="space-y-5">
      <TaskRolePanelBridge courseId={courseId} taskId={taskId} />
    </div>
  );
}
