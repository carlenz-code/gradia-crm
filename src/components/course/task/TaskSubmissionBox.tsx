'use client';

import { useState } from 'react';
import { DocumentUpload, Microphone2 } from 'iconsax-react';
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
  const [hover, setHover] = useState<'file' | 'record' | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="text-[13px] font-medium text-[color:var(--muted)] mb-2">Entrega</div>

      <div
        className="rounded-xl border-2 border-dashed border-[var(--border)] p-6 grid place-items-center text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const dropped = Array.from(e.dataTransfer.files);
          setFiles((prev) => [...prev, ...dropped]);
        }}
      >
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => setHover('file')}
              onMouseLeave={() => setHover(null)}
              className="h-11 w-11 rounded-full border border-[var(--border)] grid place-items-center hover:bg-[var(--section)]"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.onchange = () => {
                  const picked = Array.from(input.files ?? []);
                  setFiles((prev) => [...prev, ...picked]);
                };
                input.click();
              }}
              aria-label="Adjuntar archivo"
              title="Adjuntar archivo"
            >
              <DocumentUpload size={20} color="currentColor" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => setHover('record')}
              onMouseLeave={() => setHover(null)}
              className="h-11 w-11 rounded-full border border-[var(--border)] grid place-items-center hover:bg-[var(--section)]"
              onClick={() => alert('Simular “Grabarme en vivo”')}
              aria-label="Grabarme en vivo"
              title="Grabarme en vivo"
            >
              <Microphone2 size={20} color="currentColor" />
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
                {hover === 'file' ? 'Adjuntar archivo' : 'Grabarme en vivo'}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-[13px] text-[color:var(--muted)]">
            Arrastra y suelta aquí o usa los botones
          </div>
        </motion.div>
      </div>

      {!!files.length && (
        <ul className="mt-4 space-y-2">
          {files.map((f, i) => (
            <li key={i} className="text-[13px] flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--section)] px-3 py-2">
              <span className="truncate">{f.name}</span>
              <button
                onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                className="text-[12px] underline decoration-dotted hover:opacity-80"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}

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
