import type { DashboardData } from '@/lib/types/dashboard.types';
import { fetchMonthEvents } from '@/lib/utils/api-agenda'; // si ya tienes ese archivo

export async function getDashboardDataMock(userId: string): Promise<DashboardData> {
  await new Promise(r => setTimeout(r, 80)); // simular IO

  const now = new Date();
  const plus = (d: number) => new Date(now.getTime() + d * 864e5).toISOString();

  const agenda = await fetchMonthEvents(now.getFullYear(), now.getMonth()); // reutiliza tu agenda demo

  return {
    userId,
    kpis: {
      avgGrade: 15.4,
      globalProgress: 68,
      pendingTasks: 3,
      attendance: 95,
    },
    trend: Array.from({ length: 7 }).map((_, i) => ({
      date: plus(-6 + i),
      score: 12 + Math.round(Math.random() * 8),
    })),
    courses: [
      { id: 'ml-101', title: 'Fundamentos de ML', progress: 45, teacher: 'M.Sc. Pérez' },
      { id: 'seg-inf', title: 'Seguridad de la Información', progress: 72 },
      { id: 'aud-sis', title: 'Auditoría de Sistemas', progress: 35 },
    ],
    tasks: [
      { id: 't1', title: 'Quiz 1', courseTitle: 'Fundamentos de ML', dueAt: plus(2), status: 'pending' },
      { id: 't2', title: 'Reporte de caso', courseTitle: 'Auditoría de Sistemas', dueAt: plus(4), status: 'pending' },
      { id: 't3', title: 'Taller 2', courseTitle: 'Seguridad de la Información', dueAt: plus(-1), status: 'submitted' },
    ],
    agenda: agenda.slice(0, 3).map(e => ({
      id: e.id,
      title: e.title,
      when: e.start,
      type: 'class',
      location: e.course,
    })),
  };
}
