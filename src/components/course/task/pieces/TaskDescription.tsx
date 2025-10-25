'use client';

import { useEffect, useState } from 'react';
import { Edit2, TickCircle, CloseCircle } from 'iconsax-react';

export default function TaskDescription({
  role = 'STUDENT',
  description,
  onViewRubric,
  onSaveDescription,
}: {
  role?: 'STUDENT' | 'TEACHER';
  description: string;
  onViewRubric?: () => void;
  onSaveDescription?: (next: string) => void;
}) {
  const isTeacher = role === 'TEACHER';
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(description ?? '');
  useEffect(() => setText(description ?? ''), [description]);

  const save = () => {
    onSaveDescription?.(text.trim());
    setEditing(false);
  };

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-[15px] sm:text-[16px] text-[var(--fg)]">Descripción</h2>

        {!isTeacher ? (
          <button
            onClick={onViewRubric}
            className="h-9 px-3 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--section)] text-[13px]"
          >
            Ver rúbrica
          </button>
        ) : !editing ? (
          <button
            onClick={() => setEditing(true)}
            className="h-9 px-3 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--section)] text-[13px]"
            title="Editar descripción"
          >
            <Edit2 size={16} color="var(--icon)" />
            Editar
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={save}
              className="h-9 px-3 inline-flex items-center gap-2 rounded-xl border border-[var(--brand)]/30 bg-[var(--brand)]/10 text-[13px] text-[var(--brand)]"
              title="Guardar"
            >
              <TickCircle size={16} color="var(--brand)" />
              Guardar
            </button>
            <button
              onClick={() => { setText(description ?? ''); setEditing(false); }}
              className="h-9 px-3 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[13px]"
              title="Cancelar"
            >
              <CloseCircle size={16} color="var(--icon)" />
              Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 h-px w-full bg-[var(--border)]" />

      {!isTeacher || !editing ? (
        <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--muted)]">
          {text?.trim() || 'Sin descripción proporcionada por el docente.'}
        </p>
      ) : (
        <textarea
          className="mt-3 w-full min-h-[160px] rounded-xl border border-[var(--border)] bg-[var(--section)] p-3 text-[14px] leading-relaxed"
          placeholder="Escribe la descripción de la tarea…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
    </section>
  );
}
