// src/lib/types-agenda.ts
export type AgendaEvent = {
  id: string;
  title: string;          // "Tarea", "Evaluación", etc.
  course: string;         // "Taller de Análisis Exploratorio"
  start: string;          // ISO local: "2025-03-10T10:20:00"
  end: string;            // ISO local: "2025-03-10T11:40:00"
  color?: 'mint' | 'lilac' | 'brand';
  description?: string;   // ⬅ info breve para tooltip
  href?: string;          // ⬅ link al detalle (card clickeable)
};
