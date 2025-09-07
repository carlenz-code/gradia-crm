"use client";
import { FiEye, FiCheckCircle, FiPlay } from "react-icons/fi";
import Modal from "@/components/common/Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  onPreview: () => void; 
};

export default function TaskUploadModal({ open, onClose, onPreview }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="Subir tarea" widthClass="max-w-2xl">
      <div className="rounded-2xl border-2 border-dashed border-teal-300 bg-teal-50 p-4">
        <div className="flex items-center gap-3">
          <div className="shrink-0 rounded-2xl bg-white p-3">
            <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 text-white">
              <FiPlay />
            </div>
          </div>

          <div className="flex-1 rounded-2xl border bg-white px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-800">Entrevista_upeu_2023.docx</p>
                <p className="text-sm text-slate-500">Documento</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>100%</span>
                <FiCheckCircle className="text-emerald-600" />
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-full bg-emerald-600" />
            </div>
          </div>

          {/*aqui esta el modal para ver el detalle*/}
          <button
            onClick={onPreview}
            className="shrink-0 grid place-items-center rounded-xl bg-teal-500 p-3 text-white hover:bg-teal-600"
            aria-label="Ver archivo"
          >
            <FiEye />
          </button>
        </div>
      </div>

      <button
        disabled
        className="mt-4 w-full rounded-xl bg-slate-300 px-4 py-3 text-white opacity-80 cursor-not-allowed"
      >
        Enviar mi tarea
      </button>
    </Modal>
  );
}
