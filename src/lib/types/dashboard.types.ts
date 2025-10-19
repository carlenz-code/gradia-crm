export type DashboardKpis = {
  avgGrade: number;        // promedio 0..20
  globalProgress: number;  // %
  pendingTasks: number;
  attendance: number;      // %
};

export type GradePoint = {
  date: string; // ISO
  score: number;
};

export type CourseSummary = {
  id: string;
  title: string;
  progress: number;
  teacher?: string;
};

export type TaskSummary = {
  id: string;
  title: string;
  courseTitle: string;
  dueAt: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number | null;
};

export type AgendaItem = {
  id: string;
  title: string;
  when: string;
  type: 'class' | 'exam' | 'meeting' | 'deadline';
  location?: string;
};

export type DashboardData = {
  userId: string;
  kpis: DashboardKpis;
  trend: GradePoint[];
  courses: CourseSummary[];
  tasks: TaskSummary[];
  agenda: AgendaItem[];
};
