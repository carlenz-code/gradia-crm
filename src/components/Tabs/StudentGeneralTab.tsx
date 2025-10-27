'use client';

import type { MinimalUser } from '@/lib/types';
import { TaskSquare, Calendar } from 'iconsax-react';

import CourseCard, { CourseCardSkeleton } from '@/components/dashboard/CourseCard';
import SectionHeader from '@/components/dashboard/SectionHeader';
import RightAgendaRail from '@/components/dashboard/rightside/RightAgendaRail';
import { useUserCourses } from '@/lib/hooks/useUserCourses';

export default function StudentGeneralTab({ user }: { user: MinimalUser }) {
  const firstName = user.name.split(' ')[0];
  const { courses, loading } = useUserCourses(user.id);

  return (
    <div className="grid items-start gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_320px]">
      {/* Columna izquierda */}
      <div className="min-w-0 space-y-6 lg:space-y-8">
        {/* Bienvenida */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--section)] px-4 py-4 sm:px-6 sm:py-6">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <h1 className="font-medium leading-tight text-[clamp(22px,3vw,32px)]">
                ¡Bienvenido de nuevo, {firstName} 👋!
              </h1>
              <div className="mt-3 text-[12px] sm:text-[13px] text-[color:var(--muted)]">
                {new Date().toLocaleDateString('es-PE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
            </div>

            {/* Métricas en md+ */}
            <div className="hidden md:col-span-5 md:grid md:grid-cols-2 md:gap-4">
              <MetricCard icon={<TaskSquare size={24} color="var(--accent-amber)"/>} value={7} label="Tareas pendientes" wide />
              <MetricCard icon={<Calendar size={24} color="var(--accent-red)"/>} value={2} label="Próximos plazos" wide />
            </div>

            {/* Métricas en mobile */}
            <div className="md:hidden -mx-4 px-4">
              <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                <MetricCard icon={<TaskSquare size={22} color="var(--accent-amber)"/>} value={7} label="Tareas pendientes" />
                <MetricCard icon={<Calendar size={22} color="var(--accent-red)"/>} value={2} label="Próximos plazos" />
              </div>
            </div>
          </div>
        </section>

        {/* Cursos en proceso */}
        <div className="space-y-4 sm:space-y-6">
          <SectionHeader title="Tus cursos en proceso" href="/cursos?view=all" />
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {loading && (
              <>
                <CourseCardSkeleton/><CourseCardSkeleton/><CourseCardSkeleton/>
              </>
            )}

            {!loading && (courses?.length ?? 0) === 0 && (
              <div className="text-[13px] text-[color:var(--muted)]">
                Aún no tienes cursos asignados.
              </div>
            )}

            {!loading && (courses ?? []).map((c) => (
              <CourseCard
                key={c.id}
                id={c.id}
                titulo={c.title}
                carrera={c.career}
                estadistica1={`${c.units?.length ?? 0} unidades`}
                estadistica2={`${(c.units?.flatMap(u => u.tasks) ?? []).length} tareas`}
                progress={Math.min(100, Math.round(Math.random()*70)+20)} // demo
                docente={undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Columna derecha (sticky) */}
      <RightAgendaRail />
    </div>
  );
}

function MetricCard({
  icon, value, label, wide = false,
}: { icon: React.ReactNode; value: number | string; label: string; wide?: boolean; }) {
  return (
    <div className={[
      wide ? 'w-full' : 'w-[180px] sm:w-[200px]',
      'h-[120px] snap-center flex-shrink-0 flex flex-col items-center justify-center gap-1.5',
      'rounded-2xl border bg-[var(--card)] border-[var(--border)] shadow-sm px-5 hover:shadow-md transition text-center',
    ].join(' ')}>
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
