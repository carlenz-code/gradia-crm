// SERVER COMPONENT
import { notFound } from 'next/navigation'
import { getCourseById } from '@/lib/courses'
import TaskCard from '@/components/dashboard/TaskCardItem'
import SectionHeader from '@/components/common/SectionHeader'
import { UnitAccordion, MaterialRow } from './_pieces'

export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const course = await getCourseById(params.courseId)
  if (!course) return notFound()

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8 xl:px-[120px]">
      <div className="mx-auto w-full max-w-[1160px] space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{course.title}</h1>
            <p className="text-gray-500">Carrera: {course.career}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Unidades</div>
            <div className="text-lg font-semibold">{course.units.length}</div>
          </div>
        </div>

        {/* Contenido */}
        <div className="grid gap-6 items-start grid-cols-1 xl:grid-cols-[minmax(0,1fr)_272px]">
          {/* IZQUIERDA */}
          <div className="space-y-6 min-w-0">
            <SectionHeader title="Unidades" showInfoIcon={false} />
            <div className="space-y-3">
              {course.units.map(u => (
                <UnitAccordion key={u.id} unit={u} />
              ))}
              {course.units.length === 0 && (
                <div className="text-sm text-gray-500">Sin unidades.</div>
              )}
            </div>

            <SectionHeader title="Materiales" showInfoIcon={false} />
            <div className="grid gap-3">
              {course.materials.map(m => (
                <MaterialRow key={m.id} title={m.title} type={m.type} url={m.url} />
              ))}
              {course.materials.length === 0 && (
                <div className="text-sm text-gray-500">Sin materiales.</div>
              )}
            </div>
          </div>

          {/* DERECHA */}
          <aside className="space-y-4 w-[272px] shrink-0">
            <SectionHeader title="Tareas del curso" showInfoIcon={false} rightText="" />
            {course.tasks.length === 0 && (
              <div className="text-sm text-gray-500">Sin tareas asignadas.</div>
            )}
            {course.tasks.map(t => (
              <TaskCard
                key={t.id}
                titulo={t.title}
                descripcion={t.project ?? ''}
                fecha={new Date(t.dueAt).toLocaleString('es-PE', { dateStyle: 'full', timeStyle: 'short' })}
              />
            ))}
          </aside>
        </div>
      </div>
    </div>
  )
}
