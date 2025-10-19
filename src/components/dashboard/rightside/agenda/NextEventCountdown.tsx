'use client';
import { useEffect, useMemo, useState } from 'react';
import type { AgendaEvent } from '@/lib/utils/types-agenda';

function diffHMS(from: Date, to: Date) {
  const ms = Math.max(0, +to - +from);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { h, m, s };
}

export default function NextEventCountdown({ events }: { events: AgendaEvent[] }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const nextStart = useMemo(() => {
    const fut = events
      .map(e => new Date(e.start))
      .filter(d => d > now)
      .sort((a, b) => +a - +b)[0];
    return fut ?? null;
  }, [events, now]);

  if (!nextStart) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {['Horas', 'Minutos', 'Segundos'].map(label => (
          <div key={label} className="rounded-xl border bg-[var(--card)] border-[var(--border)] text-center py-3">
            <div className="text-2xl font-semibold">--</div>
            <div className="text-[13px] text-[color:var(--muted)]">{label}</div>
          </div>
        ))}
      </div>
    );
  }

  const { h, m, s } = diffHMS(now, nextStart);

  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: 'Horas', val: h },
        { label: 'Minutos', val: m },
        { label: 'Segundos', val: s },
      ].map(({ label, val }) => (
        <div key={label} className="rounded-xl border bg-[var(--card)] border-[var(--border)] text-center py-3">
          <div className="text-2xl font-semibold">{String(val).padStart(2, '0')}</div>
          <div className="text-[13px] text-[color:var(--muted)]">{label}</div>
        </div>
      ))}
    </div>
  );
}
