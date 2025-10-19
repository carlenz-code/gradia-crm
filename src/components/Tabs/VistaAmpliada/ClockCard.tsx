// src/components/Tabs/VistaAmpliada/ClockCard.tsx
'use client';
import { Clock } from 'iconsax-react';
import Card from './Card';
import { Chip } from './primitives';
import BigClock from '@/components/dashboard/rightside/agenda/BigClock';

export default function ClockCard() {
  return (
    <Card
      title="Hora actual"
      icon={<Clock size={16} color="var(--brand)" />}
      action={<Chip>{new Date().toLocaleDateString('es-PE')}</Chip>}
    >
      <BigClock />
    </Card>
  );
}
