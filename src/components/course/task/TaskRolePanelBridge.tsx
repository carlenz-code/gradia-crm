'use client';

import { useCurrentUser } from '@/lib/auth.client';
import TaskRolePanelClient from './TaskRolePanelClient';

export default function TaskRolePanelBridge({
  courseId,
  taskId,
}: {
  courseId: string;
  taskId: string;
}) {
  const user = useCurrentUser(); // ✅ rol real
  return <TaskRolePanelClient role={user.role} courseId={courseId} taskId={taskId} />;
}
