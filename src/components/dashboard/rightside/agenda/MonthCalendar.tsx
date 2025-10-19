'use client';

import type { AgendaEvent } from '@/lib/utils/types-agenda';

const WEEKDAYS = ['Ln', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
function keyForDay(y: number, m: number, d: number) { return `${y}-${m + 1}-${d}`; }

export default function MonthCalendar({
  year, month, events, selectedDate, onSelectDate, onPrev, onNext,
}: {
  year: number;
  month: number; // 0-11
  events: AgendaEvent[];
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const dots = new Set<string>();
  events.forEach(e => {
    const d = new Date(e.start);
    dots.add(keyForDay(d.getFullYear(), d.getMonth(), d.getDate()));
  });

  const first = new Date(year, month, 1);
  const startWeekIndex = (first.getDay() + 6) % 7; // 0=Ln
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: { day?: number; isCurrentMonth: boolean }[] = [];
  for (let i = 0; i < startWeekIndex; i++) cells.push({ isCurrentMonth: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, isCurrentMonth: true });
  while (cells.length % 7 !== 0) cells.push({ isCurrentMonth: false });

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)]">
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="font-semibold text-[15px] sm:text-[16px]">
          {first.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
        </div>
        <div className="flex gap-2">
          <button onClick={onPrev} className="px-2 py-1 rounded-md border border-[var(--border)] text-sm">←</button>
          <button onClick={onNext} className="px-2 py-1 rounded-md border border-[var(--border)] text-sm">→</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 px-4 pt-3 pb-2 text-[11px] sm:text-[12px] text-[color:var(--muted)]">
        {WEEKDAYS.map(w => <div key={w} className="text-center">{w}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1 px-4 pb-4">
        {cells.map((c, i) => {
          const isSel = !!c.day
            && selectedDate.getFullYear() === year
            && selectedDate.getMonth() === month
            && selectedDate.getDate() === c.day;

          const hasDot = !!c.day && dots.has(keyForDay(year, month, c.day));

          return (
            <button
              key={i}
              disabled={!c.isCurrentMonth}
              onClick={() => c.day && onSelectDate(new Date(year, month, c.day))}
              className={[
                'h-9 sm:h-10 rounded-lg text-sm flex items-center justify-center relative',
                c.isCurrentMonth ? 'text-[var(--fg)]' : 'text-[color:var(--muted)] opacity-60',
                isSel ? 'outline outline-2 outline-[var(--brand)] outline-offset-0 bg-[var(--section)]' : '',
              ].join(' ')}
            >
              {c.day ?? ''}
              {hasDot && <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
