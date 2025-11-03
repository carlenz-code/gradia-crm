// ✅ FIX Next.js App Router 2025 – searchParams ya no es Promise
import DashboardPageBridge from './DashboardPageBridge';

export default function DashboardPage({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  const tab = searchParams?.tab === 'vista' ? 'vista' : 'general';
  return <DashboardPageBridge tab={tab} />;
}
