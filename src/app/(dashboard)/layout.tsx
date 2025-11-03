'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Header from '@/components/common/Header/Header';
import { UserProvider } from '@/components/providers/UserProvider';
import Container from '@/components/common/Container';
import { useAuthSim } from '@/context/AuthSimProvider';
import '@/app/globals.css';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthed, role, userId, name, email, org } = useAuthSim();
  const router = useRouter();
  const pathname = usePathname(); // 👈 detecta la ruta actual

  useEffect(() => {
    if (!isAuthed) router.replace('/auth/login');
  }, [isAuthed, router]);

  if (!isAuthed) return null;

  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'vista', label: 'Vista ampliada' },
  ];

  const user = {
    id: userId ?? 'u1',
    role: role ?? 'STUDENT',
    name: name ?? 'Usuario Demo',
    email: email ?? 'demo@gradia.edu',
    org: org ?? 'UPeU',
    avatarUrl: null,
  };

  // 👇 Detectamos si es una ruta de curso (para quitar Container)
  const isCourseView = pathname.startsWith('/dashboard/courses/');

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--fg)]">
      <Header user={user} tabs={tabs} />
      <main>
        <UserProvider value={user}>
          {isCourseView ? (
            // vista de curso: ocupar todo el ancho
            <div className="w-full h-full">{children}</div>
          ) : (
            // resto del dashboard: usar container
            <Container size="wide" className="py-6">{children}</Container>
          )}
        </UserProvider>
      </main>
    </div>
  );
}
