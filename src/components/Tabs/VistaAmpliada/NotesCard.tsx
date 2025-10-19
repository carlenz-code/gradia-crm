'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageTick, More, CloseCircle } from 'iconsax-react';
import Card from './Card';
import { IconButton } from './primitives';
import type { NoteItem, NoteTag } from '@/lib/types/notes.types';

/* ------------------ Etiquetas: estilos + label ES ------------------ */
const TAGS: { key: NoteTag; label: string; bg: string; text: string; ring: string }[] = [
  { key: 'Today',   label: 'Hoy',      bg: 'bg-rose-100',    text: 'text-rose-700',    ring: 'ring-rose-300' },
  { key: 'To-do',   label: 'Pendiente',bg: 'bg-amber-100',   text: 'text-amber-800',   ring: 'ring-amber-300' },
  { key: 'Meeting', label: 'Reunión',  bg: 'bg-orange-100',  text: 'text-orange-800',  ring: 'ring-orange-300' },
  { key: 'Team',    label: 'Equipo',   bg: 'bg-violet-100',  text: 'text-violet-800',  ring: 'ring-violet-300' },
];

function TagPill({ tag, active }: { tag: NoteTag; active?: boolean }) {
  const t = TAGS.find(x => x.key === tag)!;
  return (
    <span
      className={[
        'inline-flex items-center h-6 rounded-full px-2 text-[11px] font-medium transition',
        t.bg, t.text,
        active ? `ring-2 ${t.ring} scale-[1.02]` : 'ring-0',
      ].join(' ')}
    >
      {t.label}
    </span>
  );
}

/* ------------------ Estado (checkbox/done) ------------------ */
function StatusDot({ status, onClick }: { status: NoteItem['status']; onClick?: () => void }) {
  return status === 'done' ? (
    <button
      onClick={onClick}
      className="inline-grid place-items-center h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200"
      title="Marcar como pendiente"
    >
      ✓
    </button>
  ) : (
    <button
      onClick={onClick}
      className="inline-block h-5 w-5 rounded-full border-2 border-[var(--border)] hover:border-[var(--brand)] transition"
      title="Marcar como hecho"
    />
  );
}

/* ------------------ Modal (crear/editar) ------------------ */
function NoteModal({
  open,
  titleText,
  initial,
  onClose,
  onSubmit,
}: {
  open: boolean;
  titleText: string;
  initial?: Partial<Pick<NoteItem, 'title' | 'description' | 'tags'>>;
  onClose: () => void;
  onSubmit: (data: { title: string; description?: string; tags: NoteTag[] }) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [desc, setDesc] = useState(initial?.description ?? '');
  const [tags, setTags] = useState<NoteTag[]>(initial?.tags ?? []);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const onClick = (e: MouseEvent) => {
      if (!dialogRef.current) return;
      if (!dialogRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('keydown', onKey);
    setTimeout(() => document.addEventListener('mousedown', onClick), 0);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, onClose]);

  const toggleTag = (t: NoteTag) =>
    setTags(prev => (prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center">
      {/* Backdrop animado */}
      <div className="absolute inset-0 bg-black/30 animate-[fade_.15s_ease-out]" />
      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative w-[min(560px,92vw)] rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-lg animate-[pop_.15s_ease-out]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-[15px] font-semibold">{titleText}</div>
          <button
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-lg border border-[var(--border)] hover:bg-[var(--section)]"
            aria-label="Cerrar"
          >
            <CloseCircle size={18} color="var(--icon)" />
          </button>
        </div>

        {/* Form */}
        <div className="grid gap-3">
          <div className="grid gap-1">
            <label className="text-[12px] text-[color:var(--muted)]">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--section)]/40 px-3 py-2 text-[14px] outline-none focus:border-[var(--brand)]"
              placeholder="Ej. Revisar capítulo de regresión"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-[12px] text-[color:var(--muted)]">Descripción</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--section)]/40 px-3 py-2 text-[14px] outline-none focus:border-[var(--brand)]"
              placeholder="Detalles, links o recordatorios…"
            />
          </div>

          <div className="grid gap-2">
            <div className="text-[12px] text-[color:var(--muted)]">Etiquetas</div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map(({ key }) => {
                const active = tags.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleTag(key)}
                    className={[
                      'h-7 rounded-full px-3 text-[12px] border transition transform',
                      active ? 'scale-105 border-transparent' : 'border-[var(--border)] hover:scale-[1.02]',
                    ].join(' ')}
                    aria-pressed={active}
                  >
                    <TagPill tag={key} active={active} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-9 rounded-lg border border-[var(--border)] px-3 text-[14px] hover:bg-[var(--section)]"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSubmit({
              title: title.trim() || 'Nueva nota',
              description: desc.trim() || undefined,
              tags,
            })}
            className="h-9 rounded-lg px-3 text-[14px] bg-[var(--brand)]/90 text-white hover:bg-[var(--brand)]"
          >
            Guardar
          </button>
        </div>
      </div>
      {/* Animaciones (keyframes) */}
      <style jsx>{`
        @keyframes fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes pop  { from { opacity:0; transform: translateY(6px) scale(.98) }
                          to   { opacity:1; transform: translateY(0)  scale(1) } }
      `}</style>
    </div>
  );
}

/* ------------------ Menú contextual '...' ------------------ */
function NoteMenu({
  onEdit, onToggle, onDelete,
}: {
  onEdit: () => void; onToggle: () => void; onDelete: () => void;
}) {
  return (
    <div className="absolute right-0 top-7 z-50 w-40 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1 shadow-sm">
      <button onClick={onEdit} className="w-full rounded-lg px-3 py-2 text-left text-[13px] hover:bg-[var(--section)]">Editar</button>
      <button onClick={onToggle} className="w-full rounded-lg px-3 py-2 text-left text-[13px] hover:bg-[var(--section)]">Marcar hecho</button>
      <button onClick={onDelete} className="w-full rounded-lg px-3 py-2 text-left text-[13px] text-rose-600 hover:bg-rose-50">Eliminar</button>
    </div>
  );
}

/* ------------------ NotesCard principal ------------------ */
export default function NotesCard({
  items,
  onToggle,
  onCreate,
  onEdit,
  onDelete,
}: {
  items: NoteItem[];
  onToggle: (id: string) => void;
  onCreate: (payload: { title: string; description?: string; tags?: NoteTag[] }) => void;
  onEdit: (id: string, patch: Partial<Pick<NoteItem, 'title' | 'description' | 'tags' | 'status'>>) => void;
  onDelete: (id: string) => void;
}) {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEditFor, setOpenEditFor] = useState<NoteItem | null>(null);
  const [menuFor, setMenuFor] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...items].sort((a, b) => (a.status === 'done' ? 1 : -1)),
    [items]
  );

  return (
    <>
      <Card
        title="Notes"
        icon={<MessageTick size={16} color="var(--brand)" />}
        action={<IconButton type="button" onClick={() => setOpenCreate(true)}>+ Nueva nota</IconButton>}
      >
        <ul className="divide-y divide-[var(--border)]/70">
          {sorted.map((n) => (
            <li key={n.id} className="py-3.5 first:pt-0 last:pb-0">
              <div className="flex items-start gap-3 relative">
                <StatusDot status={n.status} onClick={() => onToggle(n.id)} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-semibold leading-tight truncate">{n.title}</h4>
                    <div className="flex items-center gap-2 shrink-0 relative">
                      <span className="text-[11px] text-[color:var(--muted)]">{n.dateLabel}</span>
                      <button
                        className="h-7 w-7 grid place-items-center rounded-lg border border-[var(--border)] hover:bg-[var(--section)]"
                        onClick={() => setMenuFor((v) => (v === n.id ? null : n.id))}
                        aria-label="Menú de nota"
                      >
                        <More size={16} color="var(--icon)" />
                      </button>
                      {menuFor === n.id && (
                        <NoteMenu
                          onEdit={() => { setMenuFor(null); setOpenEditFor(n); }}
                          onToggle={() => { setMenuFor(null); onToggle(n.id); }}
                          onDelete={() => { setMenuFor(null); onDelete(n.id); }}
                        />
                      )}
                    </div>
                  </div>

                  {n.description && (
                    <p className="mt-1 text-[12.5px] text-[color:var(--muted)] leading-snug line-clamp-2">
                      {n.description}
                    </p>
                  )}

                  {n.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {n.tags.map((t) => <TagPill key={t} tag={t} />)}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}

          {sorted.length === 0 && (
            <li className="py-6 text-center text-[13px] text-[color:var(--muted)]">
              Aún no tienes notas. Crea la primera con “Nueva nota”.
            </li>
          )}
        </ul>
      </Card>

      {/* Modal Crear */}
      <NoteModal
        open={openCreate}
        titleText="Nueva nota"
        onClose={() => setOpenCreate(false)}
        onSubmit={(data) => { onCreate(data); setOpenCreate(false); }}
      />

      {/* Modal Editar */}
      <NoteModal
        open={!!openEditFor}
        titleText="Editar nota"
        initial={openEditFor ?? undefined}
        onClose={() => setOpenEditFor(null)}
        onSubmit={(data) => { if (openEditFor) onEdit(openEditFor.id, data); setOpenEditFor(null); }}
      />
    </>
  );
}
