'use client';

import type { MinimalUser } from '@/lib/types';
import { useCurrentUser } from '@/lib/auth.client';
import StudentGeneralTab from '@/components/Tabs/StudentGeneralTab';
import TeacherGeneralTab from '@/components/Tabs/TeacherGeneralTab';

export default function DashboardPageBridge({ tab }: { tab: 'general' | 'vista' }) {
  const user = useCurrentUser() as MinimalUser;

  if (tab === 'general') {
    return user.role === 'TEACHER'
      ? <TeacherGeneralTab user={user} />
      : <StudentGeneralTab user={user} />;
  }

  // “Vista ampliada” (WIP)
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
      Vista ampliada (en construcción)
    </div>
  );
}
