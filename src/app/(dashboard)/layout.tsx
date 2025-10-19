import type { ReactNode } from 'react';
import Header from '@/components/common/Header/Header';
import { getCurrentUser } from '@/lib/auth';
import { UserProvider } from '../../components/providers/UserProvider';
import Container from '@/components/common/Container';
import '@/app/globals.css';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'vista', label: 'Vista ampliada' }, // ✅ nuevo tab
  ];

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--fg)]">
      <Header user={user} tabs={tabs} />
      <main>
        <Container className="py-6">
          <UserProvider value={user}>{children}</UserProvider>
        </Container>
      </main>
    </div>
  );
}
