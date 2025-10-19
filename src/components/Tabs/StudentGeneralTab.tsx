'use client';

import type { MinimalUser } from '@/lib/types';
import { TaskSquare, Calendar, TickCircle } from 'iconsax-react';

import CourseCard from '@/components/dashboard/CourseCard';
import SectionHeader from '@/components/dashboard/SectionHeader';
import RightAgendaRail from '@/components/dashboard/rightside/RightAgendaRail';

export default function StudentGeneralTab({ user }: { user: MinimalUser }) {
  const firstName = user.name.split(' ')[0];

  return (
    <div className="grid items-start gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_320px]">
      {/* Columna izquierda */}
      <div className="min-w-0 space-y-6 lg:space-y-8">
        {/* Bienvenida */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--section)] px-4 py-4 sm:px-6 sm:py-6">
          {/* Grid responsive: texto (7/12) + métricas (5/12) en md+; en mobile apilado */}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-12 md:items-center">
            {/* Texto */}
            <div className="md:col-span-7">
              <h1 className="font-medium leading-tight text-[clamp(22px,3vw,32px)]">
                ¡Bienvenido de nuevo, {firstName} 👋!
              </h1>

              {/* Línea contextual: fecha de hoy */}
              <div className="mt-3 text-[12px] sm:text-[13px] text-[color:var(--muted)]">
                {new Date().toLocaleDateString('es-PE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
            </div>

            {/* MÉTRICAS */}
            {/* Mobile: carrusel horizontal (2 tarjetas) */}
            <div className="md:hidden -mx-4 px-4">
              <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                <MetricCard icon={<TaskSquare size={22} color="var(--accent-amber)" />} value={7} label="Tareas pendientes" />
                <MetricCard icon={<Calendar size={22} color="var(--accent-red)" />} value={2} label="Próximos plazos" />
              </div>
            </div>

            {/* md+: grilla de 2 tarjetas iguales */}
            <div className="hidden md:col-span-5 md:grid md:grid-cols-2 md:gap-4">
              <MetricCard icon={<TaskSquare size={24} color="var(--accent-amber)" />} value={7} label="Tareas pendientes" wide />
              <MetricCard icon={<Calendar size={24} color="var(--accent-red)" />} value={2} label="Próximos plazos" wide />
            </div>
          </div>
        </section>


       

        {/* Cursos en proceso */}
        <div className="space-y-4 sm:space-y-6">
          <SectionHeader title="Tus cursos en proceso" href="/cursos?view=all" />
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            <CourseCard
              id="ml-101"
              titulo="Electivo II Fundamentos de ML"
              carrera="Ing. Sistemas"
              estadistica1="30 estudiantes"
              estadistica2="8 pendientes"
            />
            <CourseCard
              id="seg-inf"
              titulo="Seguridad de la Información"
              carrera="Ing. Sistemas"
              estadistica1="5 pendientes"
              estadistica2="8 completados"
            />
            <CourseCard
              id="aud-sis"
              titulo="Auditoría de Sistemas"
              carrera="Ing. Sistemas"
              estadistica1="28 est."
              estadistica2="12 comp."
            />
          </div>
        </div>
      </div>

      {/* Columna derecha (sticky desde lg) */}
      <RightAgendaRail />
    </div>
  );
}

function MetricCard({
  icon,
  value,
  label,
  wide = false, // en md+ ocupa todo el ancho del grid
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  wide?: boolean;
}) {
  return (
    <div
      className={[
        wide ? 'w-full' : 'w-[180px] sm:w-[200px]',
        'h-[120px]',
        'snap-center flex-shrink-0',
        'flex flex-col items-center justify-center gap-1.5',
        'rounded-2xl border bg-[var(--card)] border-[var(--border)] shadow-sm',
        'px-5 hover:shadow-md transition text-center',
      ].join(' ')}
    >
      <div className="grid place-items-center w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--section)]">
        {icon}
      </div>
      <div className="text-[clamp(18px,2.4vw,20px)] font-bold leading-none">{value}</div>
      <div className="text-[13px] sm:text-[14px] text-[color:var(--muted)] whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}
