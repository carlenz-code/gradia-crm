"use client";
import Modal from "@/components/common/Modal";
import { FiEye, FiDownload, FiAward } from "react-icons/fi";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TaskPreviewModal({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      widthClass="max-w-5xl"
      title={
        <span className="flex items-center gap-2">
          <FiEye /> Ver detalle
        </span>
      }
    >
      {/* Contenido */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Columna izquierda: video + promedio + rúbrica */}
        <div>
          {/* Video (usa tu URL de YouTube o video propio) */}
          <div className="rounded-xl overflow-hidden border">
            <div className="aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Promedio */}
          <div className="mt-3 flex items-center justify-between">
            <div className="font-semibold">
              Promedio <span className="text-slate-900">16</span>
              <span className="text-slate-500">/20</span>
            </div>
            <FiAward className="text-amber-500" />
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full w-[80%] bg-emerald-600" />
          </div>

          {/* Rúbrica */}
          <div className="mt-4 text-slate-800 font-semibold">Rúbrica docente:</div>
          <div className="mt-2 space-y-2 text-sm">
            <RubricaItem label="Resistencia (test de milla)" score="4/5" />
            <RubricaItem label="Estructura" score="3/5" />
            <RubricaItem label="Uso de lenguaje" score="5/5" />
            <RubricaItem label="Uso de lenguaje" score="5/5" />
          </div>
        </div>

        {/* Columna derecha: retroalimentación */}
        <div>
          <div className="text-slate-800 font-semibold">Retroalimentación</div>
          <ul className="mt-3 space-y-3">
            <FeedbackItem text="Organiza tus ideas de forma más clara y lógica. Puedes usar subtítulos o apartados para separar cada punto y facilitar la comprensión del lector." time="0:15" />
            <FeedbackItem text="Organiza tus ideas de forma más clara y lógica. Puedes usar subtítulos o apartados para separar cada punto y facilitar la comprensión del lector." time="0:15" />
            <FeedbackItem text="Organiza tus ideas de forma más clara y lógica. Puedes usar subtítulos o apartados para separar cada punto y facilitar la comprensión del lector." time="0:15" />
          </ul>

          <div className="mt-5 text-slate-800 font-semibold">Retroalimentación de IA</div>
          <div className="mt-3 space-y-3">
            <AIBox text="Te animo a desarrollar más tu propio análisis o punto de vista sobre el tema, en lugar de limitarte a resumir fuentes. Esto le dará más valor y originalidad a tu trabajo." />
            <AIBox text="Te animo a desarrollar más tu propio análisis o punto de vista sobre el tema, en lugar de limitarte a resumir fuentes. Esto le dará más valor y originalidad a tu trabajo." />
            <AIBox text="Te animo a desarrollar más tu propio análisis o punto de vista sobre el tema, en lugar de limitarte a resumir fuentes. Esto le dará más valor y originalidad a tu trabajo." />
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-6 flex justify-end gap-2 border-t pt-4">
       
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-white hover:bg-blue-700">
          <FiDownload /> Descargar informe
        </button>
         <button
          className="rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-100"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}

/* ---- subcomponentes UI ---- */
function RubricaItem({ label, score }: { label: string; score: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-700">{label}</span>
      <span className="min-w-12 grid place-items-center rounded-md bg-slate-800 px-2 py-1 text-white">{score}</span>
    </div>
  );
}

function FeedbackItem({ text, time }: { text: string; time: string }) {
  return (
    <li className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-2">
        <span className="mt-2 inline-block size-2 rounded-full bg-sky-500" />
        <p className="text-sm text-slate-700 leading-snug">{text}</p>
      </div>
      <span className="text-xs text-slate-500 shrink-0">{time}</span>
    </li>
  );
}

function AIBox({ text }: { text: string }) {
  return (
    <div className="rounded-xl bg-sky-100 text-slate-800 px-3 py-2 text-sm leading-snug">
      {text}
    </div>
  );
}
