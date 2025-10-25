'use client';

import { useEffect, useMemo, useState } from 'react';
import Portal from '@/components/ui/Portal';
import { CloseCircle, TickCircle, DocumentDownload, Trash } from 'iconsax-react';
import {
  getTaskMeta,
  setTaskBasics,
  setTaskDescription,
  type TaskMeta,
} from '@/lib/services/mock/taskMeta.local';

/* ---------------- Props ---------------- */
type Props = {
  isOpen?: boolean;
  open?: boolean;
  onClose: () => void;
  courseId: string;
  defaultTaskId?: string;
  onSave?: (result: {
    taskId: string;
    title: string;
    dueAt: string | null;
    description: string;
    mode: 'create' | 'update';
  }) => void;
};

/* ---------------- Opciones mock ---------------- */
const DELIVERY_TYPES = [
  'Test inicial', 'Encuesta', 'Actividades introductorias', 'Cuestionarios', 'Bitácoras',
  'Entregables parciales', 'Feedback IA', 'Presentaciones', 'Talleres aplicados',
  'Proyecto final', 'Defensa oral', 'Examen escrito', 'Portafolio digital',
  'Versiones de código', 'Videos explicativos',
];
const INDICATORS = [
  'Pensamiento lógico', 'Autonomía', 'Análisis', 'Comunicación',
  'Trabajo en equipo', 'Desempeño técnico', 'Integración de competencias',
  'Metacognición', 'Comunicación reflexiva', 'Ética', 'Liderazgo', 'Dominio técnico',
];
const LEVELS = ['Secundaria', 'Pre universitario', 'Pregrado', 'Posgrado'] as const;

/* ===== Clase central para inputs (bordes visibles + focus brand) ===== */
const INPUT =
  'h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] ' +
  'px-3 text-[14px] text-[var(--fg)] placeholder:text-[color:var(--muted)] ' +
  'focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/35 focus:border-[var(--brand)]';

/* ---------------- Component ---------------- */
export default function NewTaskModal({
  isOpen,
  open,
  onClose,
  courseId,
  defaultTaskId,
  onSave,
}: Props) {
  const visible = (isOpen ?? open) ?? false;
  const mode: 'create' | 'update' = defaultTaskId ? 'update' : 'create';
  const taskId = useMemo(() => defaultTaskId ?? `tmp-${Date.now()}`, [defaultTaskId]);

  const baseMeta: TaskMeta = visible ? getTaskMeta(taskId) : {};
  const [title, setTitle] = useState<string>(baseMeta.title ?? '');
  const [dueAt, setDueAt] = useState<string>(() => {
    const iso = baseMeta.dueAt;
    if (!iso) return '';
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
  });
  const [description, setDescription] = useState<string>(baseMeta.description ?? '');

  // Campos extra (UI demo)
  const [types, setTypes] = useState<string[]>([]);
  const [indicators, setIndicators] = useState<string[]>([]);
  const [level, setLevel] = useState<string>('');
  const [rubric, setRubric] = useState<File | null>(null);
  const [docs, setDocs] = useState<File[]>([]);

  // Efectos
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [visible, onClose]);

  useEffect(() => {
    if (!visible) return;
    const m = getTaskMeta(taskId);
    setTitle(m.title ?? '');
    const iso = m.dueAt;
    setDueAt(iso ? new Date(iso).toISOString().slice(0, 10) : '');
    setDescription(m.description ?? '');
  }, [visible, taskId]);

  if (!visible) return null;
  const canSave = title.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const dueIso = dueAt ? new Date(`${dueAt}T23:59:59`).toISOString() : null;
    setTaskBasics(taskId, { title: title.trim(), dueAt: dueIso });
    setTaskDescription(taskId, description.trim());
    onSave?.({
      taskId,
      title: title.trim(),
      dueAt: dueIso,
      description: description.trim(),
      mode,
    });
    onClose();
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-[200]">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />

        <div className="relative z-[210] grid place-items-center h-full w-full p-4">
          <div className="w-[min(880px,98vw)] rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl overflow-hidden">

            {/* Header coloreado */}
            <div className="bg-[var(--brand)]/12 border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-[17px] font-semibold text-[var(--brand)]">
                  {mode === 'create' ? 'Nueva tarea' : 'Editar tarea'}
                </h2>
                <p className="text-[12.5px] text-[color:var(--muted)] mt-[2px]">
                  Curso: <b className="text-[var(--fg)]">{courseId}</b> · ID:{' '}
                  <b className="text-[var(--fg)]">{taskId}</b>
                </p>
              </div>
              <button
                className="p-1.5 rounded-xl hover:bg-[var(--brand)]/15 transition"
                onClick={onClose}
                title="Cerrar"
              >
                <CloseCircle size={20} color="var(--brand)" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 bg-[var(--section)]">
              {/* Inputs principales */}
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Título">
                  <input
                    className={INPUT}
                    placeholder="Ej: Ensayo sobre confidencialidad…"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Field>

                <Field label="Descripción">
                  <input
                    className={INPUT}
                    placeholder="Ingresar descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Field>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Tipo de entrega">
                  <MultiSelect
                    placeholder="Seleccionar tipo"
                    options={DELIVERY_TYPES}
                    values={types}
                    onChange={setTypes}
                  />
                </Field>

                <Field label="Indicadores esperados">
                  <MultiSelect
                    placeholder="Seleccionar indicadores"
                    options={INDICATORS}
                    values={indicators}
                    onChange={setIndicators}
                  />
                </Field>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Nivel educativo">
                  <Select
                    placeholder="Seleccionar nivel"
                    options={LEVELS as unknown as string[]}
                    value={level}
                    onChange={setLevel}
                  />
                </Field>

                <Field label="Fecha de entrega">
                  <input
                    type="date"
                    className={INPUT}
                    value={dueAt}
                    onChange={(e) => setDueAt(e.target.value)}
                  />
                </Field>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <UploadArea
                  title="Subir rúbrica"
                  file={rubric}
                  onPick={(f) => setRubric(f)}
                  onRemove={() => setRubric(null)}
                />
                <UploadList
                  title="Documentos opcionales"
                  files={docs}
                  onAdd={(f) => setDocs(d => [...d, f])}
                  onRemove={(i) => setDocs(d => d.filter((_, idx) => idx !== i))}
                />
              </div>
            </div>

            {/* Footer con colores */}
            <div className="bg-[var(--card)] border-t border-[var(--border)] px-6 py-4 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="h-9 px-4 rounded-xl text-[13px] bg-[var(--section)] hover:bg-[var(--border)] transition"
              >
                Cancelar
              </button>
             <button
  onClick={handleSave}
  disabled={!canSave}
  className={`h-9 px-4 inline-flex items-center gap-2 rounded-xl text-white text-[13px]
              bg-[var(--accent-green)] hover:bg-[var(--accent-green)]/90 disabled:opacity-50 transition`}
>
  <TickCircle size={18} color="#ffffff" />
  Guardar
</button>

            </div>
          </div>
        </div>
      </div>
    </Portal>       
  );
}

/* ----------- Subcomponentes reutilizables ----------- */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="text-[13.5px] font-medium text-[var(--fg)] space-y-1">
      <span>{label}</span>
      {children}
    </label>
  );
}

function MultiSelect({
  options, values, onChange, placeholder,
}: { options: string[]; values: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const toggle = (v: string) => onChange(values.includes(v) ? values.filter(x => x !== v) : [...values, v]);

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(o => !o)} className={`${INPUT} text-left truncate`}>
        {values.length ? values.join(', ') : (placeholder ?? 'Seleccionar…')}
      </button>
      {open && (
        <div className="absolute z-[220] mt-1 max-h-60 w-full overflow-auto rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-lg">
          {options.map(op => (
            <label
              key={op}
              className="flex items-center gap-2 px-2 py-1.5 text-[14px] hover:bg-[var(--section)] rounded-lg cursor-pointer transition"
            >
              <input
                type="checkbox"
                className="accent-[var(--brand)]"
                checked={values.includes(op)}
                onChange={() => toggle(op)}
              />
              <span className="truncate">{op}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function Select({
  options, value, onChange, placeholder,
}: { options: string[]; value?: string; onChange: (v: string) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(o => !o)} className={`${INPUT} text-left`}>
        {value || (placeholder ?? 'Seleccionar…')}
      </button>
      {open && (
        <div className="absolute z-[220] mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] p-1 shadow-lg">
          {options.map(op => (
            <button
              key={op}
              className="w-full text-left px-3 py-2 text-[14px] hover:bg-[var(--section)] rounded-lg transition"
              onClick={() => { onChange(op); setOpen(false); }}
            >
              {op}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Uploads ---------------- */
function UploadArea({
  title, file, onPick, onRemove,
}: { title: string; file: File | null; onPick: (f: File) => void; onRemove: () => void }) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onPick(f);
    e.currentTarget.value = '';
  };

  return (
    <div className="rounded-xl border-2 border-dashed border-[var(--brand)]/35 bg-[var(--card)] p-4 hover:bg-[var(--section)] transition">
      <div className="text-[13px] font-medium mb-2 text-[var(--brand)]">{title}</div>
      {!file ? (
        <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--section)] px-3 py-2 text-[13px] hover:bg-[var(--border)]/50 transition">
          <DocumentDownload size={18} color="var(--brand)" />
          <span className="text-[var(--brand)]">Adjuntar archivo</span>
          <input type="file" className="hidden" onChange={onChange} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--section)] px-3 py-2">
          <div className="truncate text-[14px] text-[var(--fg)]">{file.name}</div>
          <button className="hover:bg-rose-100 rounded-lg p-1" onClick={onRemove} title="Quitar">
            <Trash size={18} color="#e11d48" />
          </button>
        </div>
      )}
    </div>
  );
}

function UploadList({
  title, files, onAdd, onRemove,
}: { title: string; files: File[]; onAdd: (f: File) => void; onRemove: (idx: number) => void }) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onAdd(f);
    e.currentTarget.value = '';
  };

  return (
    <div className="rounded-xl border-2 border-dashed border-[var(--brand)]/35 bg-[var(--card)] p-4 hover:bg-[var(--section)] transition">
      <div className="text-[13px] font-medium mb-2 text-[var(--brand)]">{title}</div>
      <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--section)] px-3 py-2 text-[13px] hover:bg-[var(--border)]/50 transition">
        <DocumentDownload size={18} color="var(--brand)" />
        <span className="text-[var(--brand)]">Adjuntar archivo</span>
        <input type="file" className="hidden" onChange={onChange} />
      </label>

      {!!files.length && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--section)] px-3 py-2">
              <div className="truncate text-[14px] text-[var(--fg)]">{f.name}</div>
              <button className="hover:bg-rose-100 rounded-lg p-1" onClick={() => onRemove(i)} title="Quitar">
                <Trash size={18} color="#e11d48" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
