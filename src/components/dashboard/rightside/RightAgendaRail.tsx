'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchMonthEvents } from '@/lib/utils/api-agenda';
import type { AgendaEvent } from '@/lib/utils/types-agenda';

import BigClock from './agenda/BigClock';
import MonthCalendar from './agenda/MonthCalendar';
import DayTimeline from './agenda/DayTimeline';

export default function RightAgendaRail({ className = '' }: { className?: string }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth()); // 0-11
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate()));

  useEffect(() => {
    fetchMonthEvents(year, month).then(setEvents);
  }, [year, month]);

  const dayEvents = useMemo(() => {
    const y = selectedDate.getFullYear();
    const m = selectedDate.getMonth();
    const d = selectedDate.getDate();
    return events
      .filter(e => {
        const st = new Date(e.start);
        return st.getFullYear() === y && st.getMonth() === m && st.getDate() === d;
      })
      .sort((a, b) => +new Date(a.start) - +new Date(b.start));
  }, [events, selectedDate]);

  return (
    <aside
      className={[
        'w-full sm:w-[400px] lg:w-[340px] xl:w-[320px] shrink-0 space-y-4',
        'lg:sticky lg:top-[calc(var(--header-h)+var(--rail-gap))]',
        className,
      ].join(' ')}
    >
      <BigClock />

      <MonthCalendar
        year={year}
        month={month}
        events={events}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onPrev={() => setMonth(m => (m === 0 ? (setYear(y => y - 1), 11) : m - 1))}
        onNext={() => setMonth(m => (m === 11 ? (setYear(y => y + 1), 0) : m + 1))}
      />

      <DayTimeline events={dayEvents} />
    </aside>
  );
}
