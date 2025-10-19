'use client';
import type { AgendaItem } from '@/lib/types/dashboard.types';

export default function AgendaList({ items }: { items: AgendaItem[] }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)]">
      <div className="p-3 border-b border-[var(--border)] text-[13px] font-medium">Agenda</div>
      <ul className="divide-y divide-[var(--border)]">
        {items.map(ev => (
          <li key={ev.id} className="p-3 flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 px-2 rounded-full bg-[var(--section)] text-[11px] font-medium">
              {ev.type}
            </span>
            <div className="min-w-0">
              <div className="text-[14px] font-medium">{ev.title}</div>
              <div className="text-[12px] text-[color:var(--muted)]">
                {new Date(ev.when).toLocaleString('es-PE')} {ev.location ? `• ${ev.location}` : ''}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
