'use client';

import type { MinimalUser } from '@/lib/types';

export default function TeacherGeneralTab({ user }: { user: MinimalUser }) {
  const first = user.name.split(' ')[0];

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--section)] px-5 py-6">
        <h1 className="text-3xl font-medium">¡Hola, {first}! 👋</h1>
        <p className="text-[color:var(--muted)] text-[16px]">
          Vista de docente (WIP). Aquí pondremos “por revisar”, “cursos que imparto”, “sesiones”, etc.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-[color:var(--muted)]">
        (Contenido de docente en construcción)
      </div>
    </section>
  );
}
