import Image from "next/image";
import Header from "@/components/common/Header";
import StudentSidebar from "@/components/common/StudentSidebar";

export default function StudentHome() {
  return (
    <div className="min-h-dvh bg-slate-50">
      <Header />

      <div className="mx-auto max-w-[1400px] grid md:grid-cols-[320px_1fr]">
        <StudentSidebar />

        <main className="p-6">
          <div className="h-[calc(100dvh-6rem)] grid place-items-center">
            <div className="text-center">
              <Image src="/img/gralmag.svg"
                alt="Ilustración: esperando"
                width={420}           
                height={300}
                className="mx-auto h-auto w-[360px] md:w-[420px] max-w-full"
                priority
              />
              <p className="mt-4 text-slate-600">
                Presione la unidad y la tareas que quiera evaluar
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
