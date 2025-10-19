import { getCurrentUser } from '@/lib/auth';
import TabAnimator from '@/components/Tabs/TabAnimator';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>; // 👈 cambiar tipo a Promise
}) {
  const params = await searchParams; // 👈 resolver la promesa
  const tab = ['general', 'vista'].includes(params?.tab || '')
    ? (params!.tab as 'general' | 'vista')
    : 'general';

  const user = await getCurrentUser();

  return <TabAnimator tab={tab} user={user} />;
}
