'use client';

import { useState } from 'react';
import { Book1, Calendar, Eye } from 'iconsax-react';
import GradeDetailModal from './notamodal/GradeDetailModal';

/* ---------- Tipos ---------- */
type RubricItem = {
  label: string;
  score: number;
  max: number;
  date?: string;
};

type AIFeedback = {
  videoUrl?: string;
  overall?: string;
  bullets?: Array<{ text: string; at?: string }>;
  aspects?: Array<{ label: string; score: number; max: number }>;
};

/* ---------- Helpers ---------- */
const toGradeNumber = (grade: unknown): number | null => {
  if (typeof grade === 'number' && Number.isFinite(grade)) return grade;
  if (typeof grade === 'string') {
    const n = Number(grade);
    return Number.isFinite(n) ? n : null;
  }
  return null;
};

/* ---------- Componente ---------- */
export default function TaskHeaderCard({
  title,
  dueAt,
  grade,
  eyebrow, // ej: "Módulo 1"
  dueHref,
  rubric,
  ai,
}: {
  title: string;
  dueAt?: string | null;
  grade?: string | number | null;
  eyebrow?: string;
  dueHref?: string;
  rubric?: RubricItem[];
  ai?: AIFeedback;
}) {
  const [open, setOpen] = useState(false);

  // === Fecha formateada ===
  const formattedDate = dueAt
    ? new Date(dueAt).toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'Sin fecha';

  // === Nota (segura, evita NaN) ===
  const gradeNum = toGradeNumber(grade);
  const displayedGrade = gradeNum == null ? '—' : String(gradeNum);

  // === Datos de ejemplo si no vienen props ===
  const rubricData: RubricItem[] =
    rubric ??
    [
      { label: 'Resistencia (test de milla)', score: 4, max: 5, date: '13/03/2024' },
      { label: 'Estructura', score: 3, max: 5, date: '13/03/2024' },
      { label: 'Uso de lenguaje', score: 5, max: 5, date: '13/03/2024' },
      { label: 'Presentación', score: 4, max: 5, date: '13/03/2024' },
    ];

  const aiData: AIFeedback =
    ai ??
    {
      videoUrl: '',
      overall: 'Buen desempeño general. Mejora la claridad al exponer ideas clave.',
      bullets: [
        { text: 'Organiza mejor las ideas en apartados o subtítulos.', at: '0:15' },
        { text: 'Evita solo resumir; añade análisis propio.', at: '2:10' },
        { text: 'Buen uso de lenguaje técnico y fluido.', at: '4:32' },
      ],
      aspects: [
        { label: 'Claridad', score: 4, max: 5 },
        { label: 'Dominio del tema', score: 4, max: 5 },
        { label: 'Lenguaje', score: 5, max: 5 },
        { label: 'Estructura', score: 3, max: 5 },
      ],
    };

  return (
    <>
      <section
        className="relative rounded-2xl border border-[var(--border)] 
                   bg-[var(--section)] px-5 py-4 overflow-visible"
      >
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

          {/* Derecha: fecha + nota + botón Ver detalle */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Fecha */}
            <div className="hidden sm:flex items-center gap-2 text-[14px] text-[color:var(--muted)]">
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
                <span className="font-medium text-[var(--brand)]">{formattedDate}</span>
              )}
            </div>

            {/* Nota circular (segura, sin NaN) */}
            <div
              aria-label="Nota"
              className="inline-grid place-items-center h-11 w-11 rounded-full border border-[var(--border)] 
                         bg-[var(--card)] text-[var(--brand)] font-semibold text-[15px]"
              title="Nota"
            >
              {displayedGrade}
            </div>

            {/* Botón Ver detalle */}
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] 
                         bg-[var(--card)] px-3 py-2 text-[13px] hover:bg-[var(--section)] transition-colors"
            >
              <Eye size={18} color="var(--icon)" />
              Ver detalle
            </button>
          </div>
        </div>

        {/* ===== Sticker (Módulo) ===== */}
        {eyebrow && (
          <div className="absolute -top-3 -left-2 rotate-[-8deg]">
            <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] 
                            bg-[var(--card)] px-3 py-[3px] text-[12px]">
              <span className="h-2 w-2 rounded-full bg-[var(--brand)]/70" />
              <span className="font-medium text-[var(--fg)]">{eyebrow}</span>
            </div>
          </div>
        )}
      </section>

      {/* ===== Modal de detalle ===== */}
      <GradeDetailModal
        isOpen={open}
        onClose={() => setOpen(false)}
        grade={gradeNum}
        rubric={rubricData}
        ai={aiData}
      />
    </>
  );
}
