// page.tsx
export default function CourseOverviewPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl sm:text-2xl font-semibold">Resumen del curso</h1>
      <p className="text-[color:var(--muted)]">
        Selecciona una unidad, sesión o tarea en la columna izquierda para ver el detalle aquí.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--section)] p-4">
          <div className="text-[13px] text-[color:var(--muted)]">Progreso</div>
          <div className="mt-1 text-2xl font-semibold">42%</div>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--section)] p-4">
          <div className="text-[13px] text-[color:var(--muted)]">Tareas pendientes</div>
          <div className="mt-1 text-2xl font-semibold">3</div>
        </div>
      </div>
    </div>
  );
}
