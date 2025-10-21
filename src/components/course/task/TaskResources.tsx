// src/components/course/task/TaskResources.tsx
'use client';

import {
  DocumentText, DocumentCode, Document, DocumentDownload,
  PlayCircle, Link1,
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
  resources = [],
  onDownloadAll,
}: {
  resources?: Resource[];
  onDownloadAll?: (items: Resource[]) => void;
}) {
  const hasItems = (resources?.length ?? 0) > 0;

  return (
    <section
      className="relative border border-[var(--border)] rounded-2xl p-4 bg-[var(--card)] overflow-hidden"
    >
      {/* glow sutil detrás de la lista (opcional) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 right-6 top-16 h-10 rounded-full 
                   bg-[rgb(var(--brand-rgb)_/_0.12)] blur-2xl -z-10"
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-[16px] text-[var(--fg)]">Recursos</h2>
          {hasItems && (
            <span className="text-[11px] px-2 py-[2px] rounded-full border border-[var(--border)] text-[color:var(--muted)]">
              {resources.length}
            </span>
          )}
        </div>

        <button
          onClick={() => hasItems && onDownloadAll?.(resources)}
          disabled={!hasItems}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-1.5 text-[13px]
                     enabled:hover:bg-[var(--section)] disabled:opacity-50"
          title="Descargar todo"
        >
          <DocumentDownload size={18} color="currentColor" />
          Descargar todo
        </button>
      </div>

      <hr className="border-[var(--border)] my-3" />

      {!hasItems ? (
        <p className="text-[14px] text-[color:var(--muted)]">No hay recursos aún.</p>
      ) : (
        <ul className="space-y-2">
          {resources.map((r) => (
            <li key={r.id}>
              <ResourceRow r={r} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function ResourceRow({ r }: { r: Resource }) {
  const icon = getIcon(r.type);
  const colors = getColors(r.type);

  return (
    <div
      className="relative flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-3
                 hover:bg-[var(--section)]/60 transition-colors"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -z-10 top-1/2 -translate-y-1/2 h-6 rounded-full 
                   bg-[rgb(var(--brand-rgb)_/_0.10)] blur-xl"
      />
      <div className={`grid place-items-center h-10 w-10 rounded-lg ${colors.bg} ${colors.fg}`} aria-hidden="true">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-[15px] text-[var(--fg)]">{r.title}</p>
        <p className="text-[12.5px] text-[color:var(--muted)]">{labelType(r.type)}</p>
      </div>
      <a
        href={r.url}
        download
        title="Descargar"
        aria-label={`Descargar ${r.title}`}
        className="inline-grid place-items-center h-9 w-9 rounded-xl border border-[var(--border)] hover:bg-[var(--section)]"
      >
        <DocumentDownload size={18} color="currentColor" />
      </a>
    </div>
  );
}

function getIcon(t: Resource['type']) {
  switch (t) {
    case 'pdf': return <DocumentText size={18} color="currentColor" />;
    case 'notebook': return <DocumentCode size={18} color="currentColor" />;
    case 'video': return <PlayCircle size={18} color="currentColor" />;
    case 'link': return <Link1 size={18} color="currentColor" />;
    default: return <Document size={18} color="currentColor" />;
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
