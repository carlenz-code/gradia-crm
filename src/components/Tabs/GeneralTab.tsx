'use client'

import type { MinimalUser } from '@/lib/types'
import { TaskSquare, Calendar, TickCircle } from 'iconsax-react'
import SessionCard from '@/components/dashboard/SessionCard'
import CourseCard from '@/components/dashboard/CourseCard'

import SectionHeader from '@/components/common/SectionHeader'
import TaskSummaryCard from '@/components/dashboard/TaskSummaryCard'
import TaskCard from '../dashboard/TaskCardItem'

export default function GeneralTab({ user }: { user: MinimalUser }) {
  const firstName = user.name.split(' ')[0]

  return (
    <>
      {/* Header (igual) */}
      <div className="-mx-4 md:-mx-8 xl:-mx-[120px] bg-gray-50">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 xl:px-[120px] h-[141px] flex items-center justify-between">
          <div className="space-y-2 max-w-xl">
            <h1 className="text-3xl font-medium text-black">
              ¡Bienvenido de nuevo, {firstName} 👋!
            </h1>
            <p className="text-gray-600 text-[16px]">
              Revisa tus próximas tareas y sigue avanzando en tu formación.
            </p>
          </div>

          <div className="flex gap-4">
            <MetricCard icon={<TaskSquare size={24} color="#F59E0B" />} value={7} label="Tareas pendientes" />
            <MetricCard icon={<TickCircle size={24} color="#16A34A" />} value={28} label="Tareas completas" />
            <MetricCard icon={<Calendar size={24} color="#EF4444" />} value={2} label="Próximos plazos" />
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="mt-6 grid gap-6 items-start grid-cols-1 xl:grid-cols-[864px_272px]">

        {/* IZQUIERDA: fija 864px en xl */}
        <div className="space-y-6 min-w-0 xl:w-auto">

          <SectionHeader title="Próximas Sesiones de Clase" href="/clases?view=all" className="mb-6" />

          <SessionCard
            carrera="Ingeniería de Sistemas"
            titulo="Electivo II Fundamentos de ML"
            enlaceHref="https://educadventist..."
            enlaceTexto="https://educadventist..."
            fecha="10/08/2025"
            thumbnailSrc="/sessionimage.jpg"
          />

          <SectionHeader title="Tus cursos en proceso" href="/cursos?view=all" className="mb-6" />

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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

        {/* DERECHA (fija 272) */}
        <aside className="space-y-4 w-[272px] shrink-0">
          {/* Top summary */}
          <TaskSummaryCard count={3} subtitle="Tareas en la semana" />

          {/* Lista de tareas */}
          <div className="text-[14px] font-semibold text-gray-900 mt-2 mb-1">Tareas por entregar</div>

          <TaskCard
            titulo="Electivo II: Fundamentos de Machine Learning"
            descripcion='Proyecto AE: "Operación Atlas: La Misión para Redibujar el Futuro"'
            fecha="Miércoles 10 de Septiembre 1:00PM"
            href="#"
          />
          <TaskCard
            titulo="Arquitectura Empresarial"
            descripcion='Proyecto AE: "Operación Atlas"'
            fecha="Domingo 14 de Octubre 12:56"
            href="#"
          />
        </aside>
      </div>

    </>
  )
}

function MetricCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: number
  label: string
}) {
  return (
    <div className="h-[72px] w-[174px] flex flex-col p-4 items-start justify-center rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-lg font-semibold text-black">{value}</span>
      </div>
      <span className="text-[14px] text-gray-600">{label}</span>
    </div>
  )
}
