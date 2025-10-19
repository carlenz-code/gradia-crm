'use client';

import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from '@/lib/utils/motion'; // ✅
// <- IMPORTA DEL WRAPPER
import { DocumentUpload, Video } from 'iconsax-react';

type Props = {
  role: 'STUDENT' | 'TEACHER';
  courseId: string;
  taskId: string;
};

export default function TaskSubmitPanelClient({ role }: Props) {
  const [hover, setHover] = useState<'file' | 'record' | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const isTeacher = role === 'TEACHER';

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* Izquierda: descripción */}
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .25 }}
        className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"
      >
        <div className="text-[13px] font-medium text-[color:var(--muted)] mb-2">Descripción</div>

        <div className="relative pl-3">
          <div className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-[var(--brand)]/70" />
          <h3 className="font-semibold">Tarea t1: Taller de análisis exploratorio</h3>
        </div>

        <p className="mt-3 text-[14px] leading-relaxed">
          Prepara un EDA breve con hallazgos clave y adjunta tu notebook con el
          preprocesamiento. Usa visualizaciones simples y justifica decisiones de limpieza.
        </p>

        <ul className="mt-3 list-disc pl-6 text-[14px] space-y-1">
          <li>Contexto del problema</li>
          <li>Datos disponibles y calidad</li>
          <li>KPIs candidatos</li>
        </ul>
      </motion.section>

      {/* Derecha: entrega */}
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .25, delay: .05 }}
        className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-medium text-[color:var(--muted)]">Entrega</div>
          <div className="text-[12px] text-[color:var(--muted)]">
            Archivos subidos: <span className="font-semibold text-[var(--fg)]">{files.length}</span>
          </div>
        </div>

        {/* Zona drag & drop (simplificada) */}
        <div
          className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--section)] p-6 grid place-items-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const dropped = Array.from(e.dataTransfer.files);
            setFiles((prev) => [...prev, ...dropped]);
          }}
        >
          <div className="text-center">
            <div className="text-[13px] mb-1">Arrastra y suelta aquí</div>
            <div className="text-[12px] text-[color:var(--muted)]">o elige una opción</div>

            {/* Botones circulares con tooltip hover */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onMouseEnter={() => setHover('file')}
                onMouseLeave={() => setHover(null)}
                className="h-11 w-11 rounded-full border border-[var(--border)] bg-[var(--card)] grid place-items-center hover:shadow-sm"
                onClick={async () => {
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
              >
                <DocumentUpload size={20} color="var(--icon)" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onMouseEnter={() => setHover('record')}
                onMouseLeave={() => setHover(null)}
                className="h-11 w-11 rounded-full border border-[var(--border)] bg-[var(--card)] grid place-items-center hover:shadow-sm"
                onClick={() => alert('Simular “Grabarme en vivo”')}
                aria-label="Grabarme en vivo"
              >
                <Video size={20} color="var(--icon)" />
              </motion.button>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {hover && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-2 inline-block rounded-full px-3 py-1 text-[12px] border border-[var(--border)] bg-[var(--card)]"
                >
                  {hover === 'file' ? 'Adjuntar archivo' : 'Grabarme en vivo'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Lista simple de archivos */}
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

        {/* Acciones (si es profesor, cambia el CTA) */}
        <div className="mt-4">
          {isTeacher ? (
            <button className="w-full h-11 rounded-xl bg-[var(--brand)]/10 border border-[var(--brand)]/40 text-[var(--brand)] font-medium hover:bg-[var(--brand)]/15">
              Revisar entregas
            </button>
          ) : (
            <button className="w-full h-11 rounded-xl bg-[var(--brand)] text-white font-medium hover:opacity-95">
              Enviar mi tarea
            </button>
          )}
        </div>
      </motion.section>
    </div>
  );
}
