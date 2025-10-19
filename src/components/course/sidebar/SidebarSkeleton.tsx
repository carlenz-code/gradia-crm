'use client';

export default function SidebarSkeleton() {
  return (
    <aside className="lg:sticky lg:top-[calc(var(--header-h)+var(--rail-gap,8px))] lg:h-[calc(100vh-var(--header-h)-var(--rail-gap,8px))] lg:pr-4 lg:mr-2 lg:border-r lg:border-[var(--border)] overflow-y-auto">
      <div className="animate-pulse space-y-4 p-2">
        <div className="h-4 w-32 rounded bg-[var(--section)]" />
        <div className="h-6 w-56 rounded bg-[var(--section)]" />
        <div className="h-px w-full bg-[var(--border)]" />
        <div className="h-16 rounded-xl border border-[var(--border)] bg-[var(--section)]" />
        <div className="h-16 rounded-xl border border-[var(--border)] bg-[var(--section)]" />
        <div className="h-16 rounded-xl border border-[var(--border)] bg-[var(--section)]" />
      </div>
    </aside>
  );
}
