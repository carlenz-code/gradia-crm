'use client';

import { useEffect, useState } from 'react';

function fmtTime(d: Date) {
  return d.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export default function BigClock() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeParts = mounted && now ? fmtTime(now).split(':') : ['--', '--', '--'];

  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: 'Horas', val: timeParts[0] },
        { label: 'Minutos', val: timeParts[1] },
        { label: 'Segundos', val: timeParts[2] },
      ].map(({ label, val }) => (
        <div
          key={label}
          className="rounded-xl border bg-[var(--card)] border-[var(--border)] text-center py-3"
        >
          <div className="text-xl sm:text-2xl font-semibold">{val}</div>
          <div className="text-[12px] sm:text-[13px] text-[color:var(--muted)]">{label}</div>
        </div>
      ))}
    </div>
  );
}
