"use client";
import { useState } from "react";
import Header from "@/components/common/Header";
import StudentSidebar from "@/components/common/StudentSidebar";
import TaskUploadModal from "@/components/student/TaskUploadModal";
import TaskPreviewModal from "@/components/student/TaskPreviewModal";

export default function StudentHome() {
  const [openUpload, setOpenUpload] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <div className="min-h-dvh bg-slate-50">
      <Header />

      <div className="mx-auto max-w-[1400px] grid md:grid-cols-[320px_1fr]">
        <StudentSidebar />

        <main className="p-6">
          <div className="flex justify-end">
            <button
              onClick={() => setOpenUpload(true)}
              className="mb-4 rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
            >
              Subir tarea
            </button>
          </div>

          <div className="h-[calc(100dvh-9rem)] grid place-items-center">
            <div className="text-center">
              <img
                src="/img/gralmag.svg"  /* no puedo visualizar mi imagen :C */
                alt="Esperando"
                className="mx-auto w-[360px] md:w-[420px] h-auto"
              />
              <p className="mt-4 text-slate-600">
                Presione la unidad y la tareas que quiera evaluar
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* subir */}
      <TaskUploadModal
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        onPreview={() => {
          setOpenUpload(false);
          setOpenDetail(true);
        }}
      />

      {/* detalle */}
      <TaskPreviewModal open={openDetail} onClose={() => setOpenDetail(false)} />
    </div>
  );
}
