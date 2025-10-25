'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight2,
  TickCircle,
  CloseCircle,
  Add,
  Refresh2,
  SearchNormal1,
} from 'iconsax-react';
import {
  getSubmissions,
  seedCohort,
  resetSubmissions,
  upsertGrade,
  type Submission,
} from '@/lib/services/mock/taskSubmissions.local';
import StudentSubmissionModal from './StudentSubmissionModal';

/* ==========================================================
   TeacherStudentsList – versión con chips sólidos y avatares
   ========================================================== */
export default function TeacherStudentsList({
  taskId,
  courseId,
}: {
  taskId: string;
  courseId: string;
}) {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((s) => s.studentName.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    setLoading(true);
    const list = getSubmissions(taskId);
    setItems(list);
    setLoading(false);
  }, [taskId]);

  const handleSeed = () => setItems(seedCohort(taskId, courseId));
  const handleReset = () => {
    resetSubmissions(taskId);
    setItems([]);
  };

  const onSaved = (subId: string, grade?: number, feedback?: string) => {
    const updated = upsertGrade(taskId, subId, grade, feedback);
    if (updated) setItems((arr) => arr.map((s) => (s.id === subId ? updated : s)));
  };

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)]">
      {/* Header */}
      <header className="px-5 py-4 flex flex-wrap items-center gap-3 justify-between">
        <h3 className="text-[15px] font-semibold">Lista de estudiantes</h3>

        <div className="flex items-center gap-2">
          {/* buscador */}
          <div className="relative">
            <input
              placeholder="Buscar estudiante…"
              className="h-9 w-[180px] md:w-[220px] rounded-xl border border-[var(--border)] bg-[var(--section)] pl-9 pr-3 text-[13px] focus:outline-none focus:border-[var(--brand)]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchNormal1
              size={16}
              color="var(--muted)"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
          </div>

          {/* botones */}
          <button
            onClick={handleSeed}
            className="h-9 px-3 rounded-xl border border-[var(--brand)]/40 bg-[var(--brand)]/10 text-[13px] text-[var(--brand)] inline-flex items-center gap-1.5"
            title="Rellenar demo con alumnos del curso"
          >
            <Add size={16} color="var(--brand)" /> Rellenar demo
          </button>

          <button
            onClick={handleReset}
            className="h-9 px-3 rounded-xl border border-[var(--border)] bg-[var(--section)] text-[13px] inline-flex items-center gap-1.5"
            title="Vaciar lista"
          >
            <Refresh2 size={16} color="var(--icon)" /> Reset
          </button>
        </div>
      </header>

      <hr className="border-[var(--border)]" />

      {/* Body */}
      {loading ? (
        <div className="p-5 text-[13px] text-[color:var(--muted)]">Cargando…</div>
      ) : filtered.length === 0 ? (
        <div className="p-5 text-[13px] text-[color:var(--muted)]">
          {items.length === 0
            ? 'Sin estudiantes aún. Usa “Rellenar demo”.'
            : 'Sin coincidencias.'}
        </div>
      ) : (
        <ul className="divide-y divide-[var(--border)]">
          {filtered.map((s, i) => (
            <li key={s.id} className="px-5 py-3 flex items-center gap-3">
              {/* # */}
              <div className="w-7 text-[12px] text-[color:var(--muted)]">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Avatar / iniciales */}
              {s.avatarUrl ? (
                <img
                  src={s.avatarUrl}
                  alt={s.studentName}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <img
                  src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(
                    s.studentName
                  )}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                  alt={s.studentName}
                  className="h-8 w-8 rounded-full"
                />
              )}

              {/* Nombre */}
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-[14px]">
                  {s.studentName}
                </div>
                {s.submittedAt && (
                  <div className="text-[12px] text-[color:var(--muted)]">
                    {new Date(s.submittedAt).toLocaleString('es-PE')}
                  </div>
                )}
              </div>

              {/* Estado + nota + botón */}
              <div className="flex items-center gap-3">
                <StatusChip status={s.status} />

                <span className="inline-grid place-items-center h-8 min-w-[80px] px-2 rounded-xl border border-[var(--border)] bg-[var(--section)] text-[13px] font-medium">
                  {s.grade == null ? 'Sin nota' : `${s.grade}/20`}
                </span>

                <button
                  onClick={() => setOpenId(s.id)}
                  className="h-9 w-9 grid place-items-center rounded-xl border border-[var(--border)] hover:bg-[var(--section)]"
                  title="Revisar y calificar"
                >
                  <ArrowRight2 size={18} color="var(--icon)" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {openId && (
        <StudentSubmissionModal
          taskId={taskId}
          submission={items.find((x) => x.id === openId)!}
          onClose={() => setOpenId(null)}
          onSave={(g, fb) => {
            onSaved(openId, g, fb);
            setOpenId(null);
          }}
        />
      )}
    </section>
  );
}

/* ---------- Chip sólido (verde / rojo) ---------- */

function StatusChip({ status }: { status: 'submitted' | 'missing' }) {
  if (status === 'submitted') {
    return (
      <span className="inline-flex items-center gap-1 h-8 px-2 rounded-xl text-[13px] font-medium text-white bg-[color:var(--accent-green)]">
        <TickCircle size={16} color="#ffffff" />
        Envió la tarea
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 h-8 px-2 rounded-xl text-[13px] font-medium text-white bg-[color:var(--accent-red)]">
      <CloseCircle size={16} color="#ffffff" />
      No envió la tarea
    </span>
  );
}
