// src/components/Tabs/VistaAmpliada/CalendarCard.tsx
'use client';
import { Calendar } from 'iconsax-react';
import Card from './Card';
import { IconButton } from './primitives';
import MonthCalendar from '@/components/dashboard/rightside/agenda/MonthCalendar';
import type { AgendaEvent } from '@/lib/utils/types-agenda';

export default function CalendarCard({
  year, month, selectedDate, events, onPrev, onNext, onSelectDate,
}: {
  year: number; month: number; selectedDate: Date; events: AgendaEvent[];
  onPrev: () => void; onNext: () => void; onSelectDate: (d: Date) => void;
}) {
  return (
    <Card
      title="Calendario"
      icon={<Calendar size={16} color="var(--brand)" />}
      action={
        <div className="flex gap-2">
          <IconButton type="button" onClick={onPrev}>←</IconButton>
          <IconButton type="button" onClick={onNext}>→</IconButton>
        </div>
      }
      padded={false}
    >
      <div className="p-3">
        <MonthCalendar
          year={year}
          month={month}
          events={events}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          onPrev={onPrev}
          onNext={onNext}
        />
      </div>
    </Card>
  );
}
