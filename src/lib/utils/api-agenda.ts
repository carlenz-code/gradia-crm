// src/lib/api-agenda.ts
import type { AgendaEvent } from './types-agenda';

function z(n: number) { return n.toString().padStart(2, '0'); }
function localISO(y: number, m0: number, d: number, hh: number, mm: number) {
  return `${y}-${z(m0 + 1)}-${z(d)}T${z(hh)}:${z(mm)}:00`;
}

export async function fetchMonthEvents(year: number, month: number): Promise<AgendaEvent[]> {
  // Solo SEPTIEMBRE (0-based => 8) tiene datos de demo
  if (month !== 8) return [];

  const DAY = 11;
  return [
    {
      id: 'e1',
      title: 'Tarea',
      course: 'Taller de Análisis Exploratorio',
      start: localISO(year, month, DAY, 10, 20),
      end:   localISO(year, month, DAY, 11, 40),
      color: 'lilac',
      href:  '#',
      description: 'Entrega un EDA (gráficos, limpieza y breve reporte de hallazgos, 1–2 páginas).',
    },
    {
      id: 'e2',
      title: 'Tarea',
      course: 'Taller de Análisis Exploratorio',
      start: localISO(year, month, DAY, 12,  0),
      end:   localISO(year, month, DAY, 12, 30),
      color: 'mint',
      href:  '#',
      description: 'Sube el notebook con el preprocesamiento final y dataset balanceado.',
    },
    {
      id: 'e3',
      title: 'Tarea',
      course: 'Modelos de Predicción',
      start: localISO(year, month, DAY, 16, 30),
      end:   localISO(year, month, DAY, 17, 15),
      color: 'brand',
      href:  '#',
      description: 'Experimentos base con validación cruzada; adjunta métricas y breve análisis.',
    },
    {
      id: 'e4',
      title: 'Tarea',
      course: 'Bases de Datos Avanzadas',
      start: localISO(year, month, DAY, 18, 30),
      end:   localISO(year, month, DAY, 19,  0),
      color: 'lilac',
      href:  '#',
      description: 'Optimiza consultas con índices; explica el plan de ejecución.',
    },
  ];
}
