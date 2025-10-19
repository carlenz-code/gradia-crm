'use client';

import { useEffect, useMemo, useState } from 'react';

import NotesCard from './NotesCard';
import AgendaCard from './AgendaCard';
import CalendarCard from './CalendarCard';
import ClockCard from './ClockCard';

import { fetchMonthEvents } from '@/lib/utils/api-agenda';
import type { AgendaEvent } from '@/lib/utils/types-agenda';
import { useNotes } from '@/lib/hooks/useNotes';

export default function VistaAmpliadaTab() {
  const userId = 'u1';

  // -------- Agenda (eventos) --------
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth()); // 0..11
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const ev = await fetchMonthEvents(year, month); // mock
        if (alive) setEvents(ev);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [year, month]);

  const dayEvents = useMemo(() => {
    const y = selectedDate.getFullYear();
    const m = selectedDate.getMonth();
    const d = selectedDate.getDate();
    return events.filter(e => {
      const st = new Date(e.start);
      return st.getFullYear() === y && st.getMonth() === m && st.getDate() === d;
    });
  }, [events, selectedDate]);

  const goPrevMonth = () => setMonth(m => (m === 0 ? (setYear(y => y - 1), 11) : m - 1));
  const goNextMonth = () => setMonth(m => (m === 11 ? (setYear(y => y + 1), 0) : m + 1));

  // -------- Notas (LocalStorage por usuario) --------
  const { items: notes, add: addNote, toggle: toggleNote, update: updateNote, remove: removeNote } = useNotes(userId);

  if (loading) return <div className="p-6 text-[13px] text-[color:var(--muted)]">Cargando…</div>;

  return (
    <div className="va-bg grid gap-5 lg:gap-6 grid-cols-1 lg:grid-cols-[1.2fr_1fr_0.85fr]">
      {/* IZQUIERDA: Notas + Hora actual */}
      <div className="space-y-5">
        <NotesCard
          items={notes}
          onToggle={toggleNote}
          onCreate={(payload) => addNote(payload)}
          onEdit={(id, patch) => updateNote(id, patch)}
          onDelete={(id) => removeNote(id)}
        />
        <ClockCard />
      </div>

      {/* CENTRO: Agenda del día (más estrecha para que no empuje al calendario) */}
      <div className="space-y-5 lg:max-w-[520px]">
        <AgendaCard
          title="Mi agenda"
          selectedDate={selectedDate}
          events={dayEvents}
        />
      </div>

      {/* DERECHA: Calendario */}
      <div className="space-y-5 lg:sticky lg:top-[calc(var(--header-h)+16px)] self-start">
        <CalendarCard
          year={year}
          month={month}
          selectedDate={selectedDate}
          events={events}
          onPrev={goPrevMonth}
          onNext={goNextMonth}
          onSelectDate={setSelectedDate}
        />
      </div>
    </div>
  );
}
