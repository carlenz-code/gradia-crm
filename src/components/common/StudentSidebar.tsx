import { NotebookText } from "lucide-react";

const unidades = [
  "U1: Identificación de Oportunidades, Definición del Problema y Fuentes",
  "U2: Adquisición, Exploración y Preparación de Datos para un",
  "U3: Modelado, Análisis y Validación para entornos de Big Data",
  "U4: Adquisición, Exploración y Preparación de Datos para un",
];

export default function StudentSidebar() {
  return (
    <aside className="w-full md:w-[320px] border-r bg-white">
      <div className="m-3 rounded-2xl overflow-hidden shadow-sm border">
        <div className="bg-blue-500 text-white p-4 relative">
          <div className="text-xs uppercase opacity-90">Programa</div>
          <div className="text-sm opacity-90">Carrera : <b>Ingeniería de sistemas</b></div>
          <h2 className="mt-2 text-xl font-bold">Sistemas dinámicos</h2>
          <span className="absolute right-3 top-3 text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-semibold">
            Activo
          </span>
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-slate-700">Unidades</h3>
          <ul className="mt-2 space-y-2">
            {unidades.map((t, i) => (
              <li key={i} className="flex items-start gap-2 rounded-xl border p-3 hover:bg-slate-50">
                <span className="mt-0.5 inline-block size-4 rounded-full border border-slate-300"></span>
                <div className="text-sm text-slate-700 flex-1">{t}</div>
                <NotebookText size={18} className="opacity-60" />
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-3 border-t">
            <h3 className="font-semibold text-slate-700">Tareas</h3>
            <div className="mt-3 grid place-items-center rounded-2xl border p-6">
              <div className="size-20 rounded-2xl bg-slate-100 grid place-items-center">
                <NotebookText />
              </div>
              <p className="mt-3 text-sm text-slate-500">No hay tareas</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
