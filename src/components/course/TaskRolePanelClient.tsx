'use client';

import { useState } from 'react';
import { DocumentUpload, Microphone2, ArrowDown2, ArrowUp2, TickCircle } from 'iconsax-react';
import { motion, AnimatePresence } from '@/lib/utils/motion';

type Role = 'STUDENT' | 'TEACHER';

export default function TaskRolePanelClient({
  role,
  courseId, // por si luego navegas / usas params
  taskId,
}: {
  role: Role;
  courseId: string;
  taskId: string;
}) {
  return role === 'TEACHER' ? <TeacherPanel /> : <StudentPanel />;
}

/* ============ helpers UI ============ */

function SectionShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-[var(--brand)]/80 via-[var(--brand)] to-[var(--brand)]/80" />
      <div className="p-5">{children}</div>
    </section>
  );
}

/* ============ Estudiante (2 columnas en lg) ============ */

function StudentPanel() {
  const [hover, setHover] = useState<'file' | 'record' | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="space-y-4">
      {/* Grid: IZQ descripción, DER entrega */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Descripción (IZQUIERDA) */}
        <SectionShell>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-[13px] text-[color:var(--muted)] mb-1">Descripción</div>

            <div className="relative pl-3">
              <div className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-[var(--brand)]/70" />
              <h3 className="font-semibold text-[15px]">Tarea t1: Taller de análisis exploratorio</h3>
            </div>

            <p className="mt-3 text-[14px] leading-relaxed">
              Prepara un EDA breve con hallazgos clave y adjunta tu notebook con el
              preprocesamiento. Usa visualizaciones simples y deja anotadas las decisiones
              de limpieza.
            </p>

            <ul className="mt-3 list-disc pl-6 text-[14px] space-y-1">
              <li>Contexto del problema</li>
              <li>Datos disponibles y calidad</li>
              <li>KPIs candidatos</li>
            </ul>

            <div className="mt-4">
              <div className="text-[13px] text-[color:var(--muted)] mb-2">Recursos</div>
              <div className="flex flex-wrap gap-2">
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--section)] px-3 py-1.5 text-[13px]"
                  href="#"
                >
                  Guía de reporte (PDF)
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--section)] px-3 py-1.5 text-[13px]"
                  href="#"
                >
                  Plantilla EDA (Notebook)
                </a>
              </div>
            </div>
          </motion.div>
        </SectionShell>

        {/* Entrega (DERECHA) */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="text-[13px] text-[color:var(--muted)] mb-2">Entrega</div>

          <div
            className="rounded-xl border-2 border-dashed border-[var(--border)] p-6 grid place-items-center text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const dropped = Array.from(e.dataTransfer.files);
              setFiles((prev) => [...prev, ...dropped]);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
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
                  <DocumentUpload size={20} color="var(--icon)" />
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
                  <Microphone2 size={20} color="var(--icon)" />
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

          {/* Lista de archivos */}
          <ul className="mt-4 space-y-2">
            {files.map((f, i) => (
              <li
                key={i}
                className="text-[13px] flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--section)] px-3 py-2"
              >
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

          <div className="mt-4">
            <button className="w-full h-11 rounded-xl bg-[var(--brand)] text-white font-medium hover:opacity-95">
              Enviar mi tarea
            </button>
          </div>
        </section>
      </div>

      {/* Comentario (full width) */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
        <div className="text-[13px] text-[color:var(--muted)] mb-2">Comentario</div>
        <div className="rounded-xl bg-[var(--section)] border border-[var(--border)] p-3">
          <input
            className="w-full bg-transparent outline-none text-[14px]"
            placeholder="Iniciar conversación"
          />
        </div>
      </section>
    </div>
  );
}

/* ============ Docente ============ */

const MOCK_SUBMISSIONS = [
  { id: 'stu1', name: 'Carla Esquivel', status: 'Entregado', date: '20/05/2025 19:12' },
  { id: 'stu2', name: 'Luis Chávez', status: 'Pendiente', date: '-' },
  { id: 'stu3', name: 'Rocío Ramos', status: 'Entregado', date: '20/05/2025 22:01' },
];

function TeacherPanel() {
  return (
    <div className="space-y-4">
      {/* KPIs */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <div className="grid sm:grid-cols-3 gap-3">
          <Stat title="Estudiantes" value="28" />
          <Stat title="Entregadas" value="12" />
          <Stat title="Pendientes" value="16" />
        </div>
      </section>

      {/* Entregas */}
      <SectionShell>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[14px] font-semibold">Entregas</div>
          <div className="flex gap-2">
            <button className="h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--section)] text-[13px] flex items-center gap-2">
              <ArrowDown2 size={16} /> Descargar ZIP
            </button>
            <button className="h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--section)] text-[13px] flex items-center gap-2">
              <ArrowUp2 size={16} /> Subir calificaciones
            </button>
          </div>
        </div>

        <ul className="divide-y divide-[var(--border)]">
          {MOCK_SUBMISSIONS.map((s) => (
            <li key={s.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="text-[14px] font-medium">{s.name}</div>
                <div className="text-[12px] text-[color:var(--muted)]">
                  {s.status} · {s.date}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--section)] text-[13px]">
                  Ver
                </button>
                <button className="h-9 px-3 rounded-lg bg-[var(--brand)]/10 border border-[var(--brand)]/30 text-[13px] text-[var(--brand)]">
                  Calificar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </SectionShell>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--section)] p-4">
      <div className="text-[13px] text-[color:var(--muted)]">{title}</div>
      <div className="text-xl font-semibold mt-1 flex items-center gap-1">
        <TickCircle size={18} color="var(--brand)" /> {value}
      </div>
    </div>
  );
}
