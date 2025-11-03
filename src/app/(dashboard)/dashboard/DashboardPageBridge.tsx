'use client';

import type { MinimalUser } from '@/lib/types';
import { useCurrentUser } from '@/lib/auth.client';
import StudentGeneralTab from '@/components/Tabs/StudentGeneralTab';
import TeacherGeneralTab from '@/components/Tabs/TeacherGeneralTab';
import VistaAmpliadaTab from '@/components/Tabs/VistaAmpliada/VistaAmpliadaTab'; // ✅ importa tu vista real

export default function DashboardPageBridge({ tab }: { tab: 'general' | 'vista' }) {
  const user = useCurrentUser() as MinimalUser;

  if (tab === 'general') {
    return user.role === 'TEACHER'
      ? <TeacherGeneralTab user={user} />
      : <StudentGeneralTab user={user} />;
  }

  // ✅ aquí sí se renderiza la vista completa
  return <VistaAmpliadaTab />;
}
