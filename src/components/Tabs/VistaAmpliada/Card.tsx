// src/components/Tabs/VistaAmpliada/Card.tsx
'use client';
export default function Card({
  title, icon, action, children, className = '', padded = true,
}: { title: string; icon?: React.ReactNode; action?: React.ReactNode; children: React.ReactNode; className?: string; padded?: boolean; }) {
  return (
    <div className={`rounded-2xl border border-[var(--border)] bg-[var(--card)] ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]/70 rounded-t-2xl bg-[var(--section)]/40">
        <div className="flex items-center gap-2">
          <span className="inline-grid place-items-center h-7 w-7 rounded-xl bg-[var(--brand)]/12">{icon}</span>
          <h3 className="text-[14px] sm:text-[15px] font-semibold">{title}</h3>
        </div>
        {action}
      </div>
      <div className={padded ? 'p-4' : ''}>{children}</div>
    </div>
  );
}
