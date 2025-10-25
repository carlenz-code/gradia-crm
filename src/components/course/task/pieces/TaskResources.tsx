'use client';

import {
  DocumentText, DocumentCode, Document, DocumentDownload,
  PlayCircle, Link1, Add, Trash
} from 'iconsax-react';

type Resource = {
  id: string;
  title: string;
  type: 'pdf' | 'document' | 'notebook' | 'slide' | 'link' | 'video';
  url: string;
  size?: string;
  updatedAt?: string;
};

export default function TaskResources({
  role = 'STUDENT',
  resources = [],
  onDownloadAll,
  onAddResource,
  onRemoveResource,
}: {
  role?: 'STUDENT' | 'TEACHER';
  resources?: Resource[];
  onDownloadAll?: (items: Resource[]) => void;
  onAddResource?: () => void;
  onRemoveResource?: (id: string) => void;
}) {
  const isTeacher = role === 'TEACHER';
  const hasItems = (resources?.length ?? 0) > 0;

  return (
    <section className="relative border border-[var(--border)] rounded-2xl p-5 bg-[var(--card)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-[15px] sm:text-[16px] text-[var(--fg)]">Recursos</h2>
          {hasItems && (
            <span className="inline-grid place-items-center h-5 min-w-5 px-1 rounded-full text-[11px] font-semibold bg-[var(--section)] border border-[var(--border)] text-[color:var(--muted)]">
              {resources.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isTeacher && (
            <button
              onClick={onAddResource}
              aria-label="Agregar recurso"
              className="icon-btn" /* h-9 w-9 redondo de globals.css */
              title="Agregar recurso"
            >
              <Add size={18} color="var(--icon)" />
            </button>
          )}
          <button
            onClick={() => hasItems && onDownloadAll?.(resources)}
            disabled={!hasItems}
            className="h-9 px-3 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] text-[13px] enabled:hover:bg-[var(--section)] disabled:opacity-50"
            title="Descargar todo"
          >
            <DocumentDownload size={18} color="var(--icon)" />
            Descargar todo
          </button>
        </div>
      </div>

      <div className="mt-3 h-px w-full bg-[var(--border)]" />

      {!hasItems ? (
        <p className="mt-3 text-[14px] text-[color:var(--muted)]">No hay recursos aún.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {resources.map((r) => (
            <li key={r.id}>
              <ResourceRow r={r} teacher={isTeacher} onRemove={onRemoveResource} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function ResourceRow({
  r,
  teacher,
  onRemove,
}: {
  r: Resource;
  teacher: boolean;
  onRemove?: (id: string) => void;
}) {
  const icon = getIcon(r.type);
  const colors = getColors(r.type);

  return (
    <div className="group relative flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--section)]/60 px-3 py-3 transition-colors hover:bg-[var(--section)]">
      {/* Icono del tipo */}
      <div className={`grid place-items-center h-10 w-10 rounded-lg ${colors.bg} ${colors.fg}`} aria-hidden="true">
        {icon}
      </div>

      {/* Texto */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-[15px] text-[var(--fg)]">{r.title}</p>
        <p className="text-[12.5px] text-[color:var(--muted)]">{labelType(r.type)}</p>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2">
        <a
          href={r.url}
          download
          title="Descargar"
          aria-label={`Descargar ${r.title}`}
          className="h-9 w-9 inline-grid place-items-center rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--section)]"
        >
          <DocumentDownload size={18} color="var(--icon)" />
        </a>

        {teacher && (
          <button
            onClick={() => onRemove?.(r.id)}
            title="Eliminar"
            className="h-9 w-9 inline-grid place-items-center rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-rose-500/10"
          >
            <Trash size={18} color="var(--accent-red)" />
          </button>
        )}
      </div>
    </div>
  );
}

/* helpers visuales */
function getIcon(t: Resource['type']) {
  switch (t) {
    case 'pdf': return <DocumentText size={18} color="var(--icon)" />;
    case 'notebook': return <DocumentCode size={18} color="var(--icon)" />;
    case 'video': return <PlayCircle size={18} color="var(--icon)" />;
    case 'link': return <Link1 size={18} color="var(--icon)" />;
    default: return <Document size={18} color="var(--icon)" />;
  }
}
function getColors(t: Resource['type']) {
  switch (t) {
    case 'pdf': return { bg: 'bg-rose-500/10',    fg: 'text-rose-600' };
    case 'notebook': return { bg: 'bg-indigo-500/10',  fg: 'text-indigo-600' };
    case 'slide': return { bg: 'bg-amber-500/10',  fg: 'text-amber-600' };
    case 'video': return { bg: 'bg-sky-500/10',    fg: 'text-sky-600' };
    case 'link': return { bg: 'bg-emerald-500/10', fg: 'text-emerald-600' };
    default: return { bg: 'bg-[var(--brand)]/10', fg: 'text-[var(--brand)]' };
  }
}
function labelType(t: Resource['type']) {
  switch (t) {
    case 'pdf': return 'PDF';
    case 'document': return 'Documento';
    case 'notebook': return 'Notebook';
    case 'slide': return 'Presentación';
    case 'link': return 'Enlace';
    case 'video': return 'Video';
  }
}
