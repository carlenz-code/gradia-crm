// src/app/(dashboard)/dashboard/page.tsx
import { use } from 'react';
import DashboardPageBridge from './DashboardPageBridge';

export default function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>; // 👈 Promise
}) {
  const sp = use(searchParams);                         // 👈 desenvuelve
  const tab = sp?.tab === 'vista' ? 'vista' : 'general';

  return <DashboardPageBridge tab={tab} />;            // 👈 puente cliente
}
