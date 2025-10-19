'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/utils/motion';
import { DocumentUpload, Calendar as CalIcon, CloseCircle } from 'iconsax-react';

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate?: (payload: {
    title: string;
    description: string;
    indicators: string;
    level: string;
    type: string;
    dueDate: string;
    rubricFiles: File[];
    extraFiles: File[];
  }) => void;
};

export default function NewTaskModal({ open, onClose, onCreate }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [indicators, setIndicators] = useState('');
  const [level, setLevel] = useState('');
  const [type, setType] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [rubricFiles, setRubricFiles] = useState<File[]>([]);
  const [extraFiles, setExtraFiles] = useState<File[]>([]);

  const pickFiles = (cb: (fs: File[]) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = () => cb(Array.from(input.files ?? []));
    input.click();
  };

  const submit = () => {
    onCreate?.({
      title,
      description,
      indicators,
      level,
      type,
      dueDate,
      rubricFiles,
      extraFiles,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[81] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              className="w-full max-w-4xl rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 rounded-t-2xl bg-[var(--brand)] text-white">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold">Crear tarea</span>
                </div>
                <button
                  className="h-8 w-8 grid place-items-center rounded-full hover:bg-black/10"
                  onClick={onClose}
                  aria-label="Cerrar"
                >
                  <CloseCircle size={20} color="#fff" />
                </button>
              </div>

              {/* Body */}
              <div className="px-5 py-4 space-y-4">
                {/* Fila 1 */}
                <div className="grid gap-3 md:grid-cols-3">
                  <Field label="Título">
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ingresar título"
                      className="w-full h-10 rounded-lg border border-[var(--border)] bg-[var(--section)] px-3 outline-none"
                    />
                  </Field>

                  <Field label="Descripción" className="md:col-span-2">
                    <input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Ingresar descripción"
                      className="w-full h-10 rounded-lg border border-[var(--border)] bg-[var(--section)] px-3 outline-none"
                    />
                  </Field>
                </div>

                {/* Fila 2 */}
                <div className="grid gap-3 md:grid-cols-3">
                  <Field label="Indicadores esperados">
                    <select
                      value={indicators}
                      onChange={(e) => setIndicators(e.target.value)}
                      className="w-full h-10 rounded-lg border border-[var(--border)] bg-[var(--section)] px-3 outline-none"
                    >
                      <option value="">Seleccionar indicadores</option>
                      <option value="i1">Pensamiento crítico</option>
                      <option value="i2">Comunicación</option>
                    </select>
                  </Field>
                  <Field label="Nivel educativo">
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full h-10 rounded-lg border border-[var(--border)] bg-[var(--section)] px-3 outline-none"
                    >
                      <option value="">Seleccionar nivel</option>
                      <option value="pregrado">Pregrado</option>
                      <option value="posgrado">Posgrado</option>
                    </select>
                  </Field>
                  <Field label="Tipo de entrega">
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full h-10 rounded-lg border border-[var(--border)] bg-[var(--section)] px-3 outline-none"
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="archivo">Archivo</option>
                      <option value="video">Video</option>
                    </select>
                  </Field>
                </div>

                {/* Fila 3 */}
                <div className="grid gap-3 md:grid-cols-[1fr_220px]">
                  <Field label="Fecha de entrega">
                    <div className="flex items-center gap-2">
                      <div className="relative w-full">
                        <input
                          type="date"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          className="w-full h-10 rounded-lg border border-[var(--border)] bg-[var(--section)] px-3 pr-9 outline-none"
                        />
                        <CalIcon
                          size={18}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          color="var(--icon)"
                        />
                      </div>
                    </div>
                  </Field>
                </div>

                {/* Subidas */}
                <div className="grid gap-4 md:grid-cols-2">
                  <UploadBox
                    title="Subir rúbrica"
                    files={rubricFiles}
                    onPick={() => pickFiles((fs) => setRubricFiles((p) => [...p, ...fs]))}
                    onDropFiles={(fs) => setRubricFiles((p) => [...p, ...fs])}
                  />
                  <UploadBox
                    title="Subir documentos opcionales"
                    files={extraFiles}
                    onPick={() => pickFiles((fs) => setExtraFiles((p) => [...p, ...fs]))}
                    onDropFiles={(fs) => setExtraFiles((p) => [...p, ...fs])}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-4 flex items-center justify-end gap-2">
                <button
                  onClick={onClose}
                  className="h-10 px-4 rounded-lg border border-[var(--border)] bg-[var(--section)] text-[14px]"
                >
                  Cancelar
                </button>
                <button
                  onClick={submit}
                  className="h-10 px-4 rounded-lg bg-[var(--brand)] text-white text-[14px] hover:opacity-95"
                >
                  Guardar
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------------- helpers UI ---------------- */

function Field({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-[12px] text-[color:var(--muted)] mb-1">{label}</div>
      {children}
    </div>
  );
}

function UploadBox({
  title,
  files,
  onPick,
  onDropFiles,
}: {
  title: string;
  files: File[];
  onPick: () => void;
  onDropFiles: (fs: File[]) => void;
}) {
  return (
    <div
      className="rounded-xl border-2 border-dashed border-[var(--border)] p-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onDropFiles(Array.from(e.dataTransfer.files ?? []));
      }}
    >
      <div className="text-[13px] text-[color:var(--muted)] mb-2">{title}</div>
      <div className="grid place-items-center gap-3 py-6">
        <button
          onClick={onPick}
          className="h-11 w-11 rounded-full grid place-items-center border border-[var(--border)] hover:bg-[var(--section)]"
          title="Adjuntar archivo"
          aria-label="Adjuntar archivo"
        >
          <DocumentUpload size={20} color="var(--icon)" />
        </button>
        <div className="text-[13px] text-[color:var(--muted)]">
          Arrastra y suelta aquí o adjunta
        </div>
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-1">
          {files.map((f, i) => (
            <li
              key={i}
              className="text-[13px] rounded-md border border-[var(--border)] bg-[var(--section)] px-3 py-2"
            >
              {f.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
