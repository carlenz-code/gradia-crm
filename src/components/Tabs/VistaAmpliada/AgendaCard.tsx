'use client';

import { Calendar as CalIcon } from 'iconsax-react';
import Card from './Card';
import DayTimeline from '@/components/dashboard/rightside/agenda/DayTimeline';
import type { AgendaEvent } from '@/lib/utils/types-agenda';

export default function AgendaCard({
  title = 'Mi agenda',
  selectedDate,
  events,
}: {
  title?: string;
  selectedDate: Date;
  events: AgendaEvent[];
}) {
  const dateLabel = selectedDate.toLocaleDateString('es-PE', {
    weekday: 'short', day: '2-digit', month: 'short',
  }).replace('.', '');

  return (
    <Card
      title={title}
      icon={<CalIcon size={16} color="var(--brand)" />}
      action={
        <span className="inline-flex h-7 items-center rounded-full bg-[var(--section)] px-3 text-[12px]">
          {dateLabel}
        </span>
      }
    >
      {/* Usamos DayTimeline sin título y en modo mejorado */}
      <DayTimeline events={events} showTitle={false} enhanced />
    </Card>
  );
}
