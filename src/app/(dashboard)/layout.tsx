import type { ReactNode } from 'react';
import Header from '@/components/common/Header';
import SubHeaderTabs from '@/components/common/SubHeaderTabs';
import { getCurrentUser } from '@/lib/auth';
import '@/app/globals.css';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'otro', label: 'Otro' },
  ];

  return (
    <div className="min-h-dvh bg-white">
      <Header user={user} />
      <SubHeaderTabs items={tabs} />
      <main className="mx-auto max-w-[1400px] px-4 md:px-8 xl:px-[120px] py-6">
        {children}
      </main>
    </div>
  );
}
