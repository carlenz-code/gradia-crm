'use client';

import { Book1, Calendar } from 'iconsax-react';

export default function TaskHeaderCard({
  title,
  dueAt,
  grade,
  eyebrow, // p.ej. "Módulo 1"
  dueHref,
}: {
  title: string;
  dueAt?: string | null;
  grade?: string | number | null;
  eyebrow?: string;
  dueHref?: string;
}) {
  // === Fecha formateada ===
  const formattedDate = dueAt
    ? new Date(dueAt).toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'Sin fecha';

  // === Nota (si no hay, muestra “—”) ===
  const displayedGrade =
    grade === null || grade === undefined || grade === ''
      ? '—'
      : grade;

  return (
    <section className="relative rounded-2xl border border-[var(--border)] 
                    bg-[var(--card)] px-5 py-4 overflow-visible">
      {/* ===== Fila principal ===== */}
      <div className="flex items-center justify-between gap-3">
        {/* Izquierda: icono + título */}
        <div className="min-w-0 flex items-center gap-3">
          <span className="inline-grid place-items-center h-8 w-8 rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]">
            <Book1 size={18} color="currentColor" variant="Linear" />
          </span>
          <h1 className="truncate text-[16px] sm:text-[17px] font-medium text-[var(--fg)]">
            {title}
          </h1>
        </div>

        {/* Derecha: fecha + nota */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Fecha */}
          <div className="flex items-center gap-2 text-[14px] text-[color:var(--muted)]">
            <Calendar size={18} color="currentColor" variant="Linear" />
            <span>Entrega:</span>
            {dueHref ? (
              <a
                href={dueHref}
                className="font-medium text-[var(--brand)] underline underline-offset-2"
              >
                {formattedDate}
              </a>
            ) : (
              <span className="font-medium text-[var(--brand)]">
                {formattedDate}
              </span>
            )}
          </div>

          {/* Nota circular (siempre visible) */}
          <div
            aria-label="Nota"
            className="inline-grid place-items-center h-11 w-11 rounded-full border border-[var(--border)] 
                       bg-[var(--card)] text-[var(--brand)] font-semibold text-[15px]"
          >
            {displayedGrade}
          </div>
        </div>
      </div>

      {/* ===== Sticker (Módulo) ===== */}
      {eyebrow && (
        <div className="absolute -top-3 -left-2 rotate-[-8deg]">
          <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-[3px] text-[12px]">
            <span className="h-2 w-2 rounded-full bg-[var(--brand)]/70" />
            <span className="font-medium text-[var(--fg)]">{eyebrow}</span>
          </div>
        </div>
      )}
    </section>
  );
}
