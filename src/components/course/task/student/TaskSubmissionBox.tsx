// src/components/course/task/TaskSubmissionBox.tsx
'use client';

import { useState } from 'react';
import {
  DocumentUpload,
  PlayCircle,
  Trash,
  DocumentText,
  Document,
  Code,
  Image as ImageIcon,
  Music,
  Folder,
} from 'iconsax-react';
import type { TaskSubmission } from '@/lib/types/task.types';
import { createSubmissionMock } from '@/lib/services/mock/task.mock';
import { motion, AnimatePresence } from '@/lib/utils/motion';

export default function TaskSubmissionBox({
  taskId,
  onSubmitted,
}: {
  taskId: string;
  onSubmitted: (sub: TaskSubmission) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [hover, setHover] = useState<'file' | 'video' | null>(null);
  const [busy, setBusy] = useState(false);

  function handlePickFiles(accept?: string) {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    if (accept) input.accept = accept;
    input.onchange = () => {
      const picked = Array.from(input.files ?? []);
      setFiles((prev) => [...prev, ...picked]);
    };
    input.click();
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files ?? []);
    if (dropped.length) setFiles((prev) => [...prev, ...dropped]);
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="text-[13px] font-medium text-[color:var(--muted)] mb-2">Entrega</div>

      {/* Dropzone */}
      <div
        className="rounded-xl border-2 border-dashed border-[var(--border)] p-6 grid place-items-center text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-center gap-3">
            {/* Adjuntar archivo */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => setHover('file')}
              onMouseLeave={() => setHover(null)}
              className="icon-btn icon-btn--round"
              onClick={() => handlePickFiles()}
              aria-label="Adjuntar archivo"
              title="Adjuntar archivo"
            >
              <DocumentUpload size={20} color="currentColor" />
            </motion.button>

            {/* Adjuntar video */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => setHover('video')}
              onMouseLeave={() => setHover(null)}
              className="icon-btn icon-btn--round"
              onClick={() => handlePickFiles('video/*')}
              aria-label="Adjuntar video"
              title="Adjuntar video"
            >
              <PlayCircle size={20} color="currentColor" />
            </motion.button>
          </div>

          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-1 inline-block rounded-full px-3 py-1 text-[12px] border border-[var(--border)] bg-[var(--card)]"
              >
                {hover === 'file' ? 'Adjuntar archivo' : 'Adjuntar video'}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-[13px] text-[color:var(--muted)]">
            Arrastra y suelta aquí o usa los botones
          </div>
        </motion.div>
      </div>

      {/* Lista de archivos */}
      {!!files.length && (
        <ul className="mt-4 space-y-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--section)] px-3 py-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`grid place-items-center h-9 w-9 rounded-md ${getIconStyle(f).bg} ${getIconStyle(f).fg}`}>
                  {getIcon(f)}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[14px]">{f.name}</div>
                  <div className="flex items-center gap-2 text-[12px] text-[color:var(--muted)]">
                    <span className="chip">{getExt(f) || 'archivo'}</span>
                    <span>•</span>
                    <span>{prettySize(f.size)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                className="grid place-items-center h-9 w-9 min-w-[36px] rounded-lg border border-[var(--border)] hover:bg-[var(--card)]"
                aria-label="Eliminar archivo"
                title="Eliminar archivo"
              >
                <Trash size={18} color="currentColor" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Enviar */}
      <div className="mt-4">
        <button
          disabled={!files.length || busy}
          onClick={async () => {
            setBusy(true);
            const sub = await createSubmissionMock(taskId, files);
            setFiles([]);
            setBusy(false);
            onSubmitted(sub);
          }}
          className="w-full h-11 rounded-xl bg-[var(--brand)] text-white font-medium disabled:opacity-50 hover:opacity-95"
        >
          {busy ? 'Enviando…' : 'Enviar mi tarea'}
        </button>
      </div>
    </section>
  );
}

/* ===== helpers ===== */

function getExt(f: File) {
  const m = /\.(\w+)$/.exec(f.name.toLowerCase());
  return m?.[1] ?? '';
}

function prettySize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(1)} GB`;
}

function is(exts: string[], f: File) {
  const e = getExt(f);
  return exts.includes(e);
}

function getIcon(f: File) {
  if (is(['pdf'], f)) return <DocumentText size={18} color="currentColor" />;
  if (is(['doc', 'docx', 'rtf', 'txt', 'md'], f)) return <Document size={18} color="currentColor" />;
  if (is(['xls', 'xlsx', 'csv'], f)) return <Document size={18} color="currentColor" />;
  if (is(['ppt', 'pptx'], f)) return <Document size={18} color="currentColor" />;
  if (is(['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'], f)) return <ImageIcon size={18} color="currentColor" />;
  if (is(['mp4', 'mov', 'mkv', 'webm', 'avi'], f)) return <PlayCircle size={18} color="currentColor" />;
  if (is(['mp3', 'wav', 'ogg', 'm4a'], f)) return <Music size={18} color="currentColor" />;
  if (is(['zip', 'rar', '7z'], f)) return <Folder size={18} color="currentColor" />;
  if (is(['py', 'ipynb', 'js', 'ts', 'java', 'cpp', 'c', 'cs', 'rb', 'go'], f)) return <Code size={18} color="currentColor" />;
  return <Document size={18} color="currentColor" />;
}

function getIconStyle(f: File) {
  if (is(['pdf'], f)) return { bg: 'bg-rose-500/10', fg: 'text-rose-600' };
  if (is(['doc', 'docx', 'rtf', 'txt', 'md'], f)) return { bg: 'bg-sky-500/10', fg: 'text-sky-600' };
  if (is(['xls', 'xlsx', 'csv'], f)) return { bg: 'bg-emerald-500/10', fg: 'text-emerald-600' };
  if (is(['ppt', 'pptx'], f)) return { bg: 'bg-amber-500/10', fg: 'text-amber-600' };
  if (is(['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'], f)) return { bg: 'bg-indigo-500/10', fg: 'text-indigo-600' };
  if (is(['mp4', 'mov', 'mkv', 'webm', 'avi'], f)) return { bg: 'bg-violet-500/10', fg: 'text-violet-600' };
  if (is(['mp3', 'wav', 'ogg', 'm4a'], f)) return { bg: 'bg-fuchsia-500/10', fg: 'text-fuchsia-600' };
  if (is(['zip', 'rar', '7z'], f)) return { bg: 'bg-orange-500/10', fg: 'text-orange-600' };
  if (is(['py', 'ipynb', 'js', 'ts', 'java', 'cpp', 'c', 'cs', 'rb', 'go'], f)) return { bg: 'bg-teal-500/10', fg: 'text-teal-600' };
  return { bg: 'bg-[var(--brand)]/10', fg: 'text-[var(--brand)]' };
}
