// lib/services/mock/comments.mock.ts
import type { TaskComment, Role } from '@/lib/types/task.types';

// 👇 Mocks por tarea. Cambia 'ml-t1' por el taskId que estés viendo en la UI.
const TASK_ID = 'ml-t1';

let comments: TaskComment[] = [
  {
    id: 'c1',
    taskId: TASK_ID,                 // ← obligatorio en tu tipo actual
    authorId: 'stu1',
    authorName: 'Noah Pierre',
    role: 'STUDENT',
    createdAt: new Date(Date.now() - 1000 * 60 * 58).toISOString(),
    body: 'Tengo dudas con la condensación del agua, ¿alguien me lo explica?',
    parentId: null,
  },
  {
    id: 'c2',
    taskId: TASK_ID,                 // ← obligatorio
    authorId: 'teach1',
    authorName: 'Skill Sprout',
    role: 'TEACHER',
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    body: 'La condensación ocurre cuando el vapor se enfría y vuelve a líquido. El ejemplo del vaso con hielo ayuda mucho 😊',
    parentId: 'c1',
  },
];

export function getCommentsMockByTask(taskId: string) {
  // si quieres más tareas, puedes duplicar el arreglo por id
  return comments.filter(c => c.taskId === taskId);
}

export function addCommentMock(entry: TaskComment) {
  comments = [entry, ...comments];
}
