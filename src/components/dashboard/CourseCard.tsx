'use client';

import { Book, Flash, Activity, DocumentText } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { motion } from '@/lib/utils/motion';

type CourseCardProps = {
  id: string;
  thumbnailSrc?: string;
  titulo: string;
  carrera: string;
  estadistica1: string; // ej: "8 unidades"
  estadistica2: string; // ej: "24 tareas"
  progress?: number;    // 0..100 (opcional)
  docente?: string;     // opcional: “M.Sc. Pérez”
  status?: 'Activo' | 'En pausa' | 'Completado'; // opcional
  onOpen?: () => void;
};

export default function CourseCard({
  id,
  thumbnailSrc = '/sessionimage.jpg',
  titulo,
  carrera,
  estadistica1,
  estadistica2,
  progress,
  docente,
  status = 'Activo',
  onOpen,
}: CourseCardProps) {
  const router = useRouter();
  const go = () => (onOpen ? onOpen() : router.push(`/dashboard/courses/${id}`));

  const pct =
    typeof progress === 'number' && progress >= 0 && progress <= 100 ? Math.round(progress) : undefined;

  return (
    <motion.article
      role="button"
      onClick={go}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && go()}
      tabIndex={0}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="group w-full rounded-2xl border border-[var(--border)] bg-[var(--card)]
                 text-[var(--fg)] shadow-sm cursor-pointer focus:outline-none
                 focus:ring-2 focus:ring-[var(--brand)]/40"
    >
      {/* Cover */}
      <div className="relative w-full">
        <div className="w-full aspect-[13/6] overflow-hidden rounded-2xl rounded-b-none">
          <img src={thumbnailSrc} alt="" className="h-full w-full object-cover" />
          {/* overlay suave */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
          {/* Badge status */}
          {status && (
            <span
              className="absolute top-2 left-2 rounded-full border border-white/20 bg-black/30
                         px-2.5 h-6 inline-grid place-items-center text-[11px] text-white/90 backdrop-blur
                         shadow"
            >
              {status}
            </span>
          )}
          {/* CTA */}
          <button
            type="button"
            aria-label="Abrir curso"
            onClick={(e) => {
              e.stopPropagation();
              go();
            }}
            className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full
                       bg-[var(--card)]/95 border border-[var(--border)] shadow
                       hover:bg-[var(--section)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40"
          >
            <Flash size={18} color="var(--icon)" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-0.5 rounded-xl bg-[var(--section)]/70 h-9 w-9 grid place-items-center">
            <Book size={20} color="var(--brand)" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[15px] sm:text-[16px] font-semibold leading-tight line-clamp-2">
              {titulo}
            </h4>
            <p className="text-[12px] text-[color:var(--muted)] truncate">
              Carrera: {carrera}
              {docente ? ` • Docente: ${docente}` : ''}
            </p>
          </div>

          {/* Progress ring (opcional) */}
          {typeof pct === 'number' && (
            <ProgressRing value={pct} size={40} stroke={4} />
          )}
        </div>

        {/* Stats */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatPill icon={<Activity size={16} color="var(--icon)" />} label={estadistica1} />
          <StatPill icon={<DocumentText size={16} color="var(--icon)" />} label={estadistica2} />
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Subcomponents ---------- */

function StatPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 h-7 rounded-full border border-[var(--border)]
                 bg-[var(--section)] text-[12px] text-[color:var(--fg)]/85 leading-none"
    >
      {icon}
      <span className="truncate">{label}</span>
    </span>
  );
}

function ProgressRing({
  value,
  size = 40,
  stroke = 4,
}: {
  value: number;
  size?: number;
  stroke?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-10 w-10 grid place-items-center shrink-0">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--border)"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--brand)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="transparent"
          className="transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <span className="absolute text-[11px] font-semibold text-[color:var(--fg)]">
        {value}%
      </span>
    </div>
  );
}

/* ---------- Skeleton para loading ---------- */
export function CourseCardSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      <div className="aspect-[13/6] bg-[var(--section)] animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/5 bg-[var(--section)] rounded animate-pulse" />
        <div className="h-3 w-2/5 bg-[var(--section)] rounded animate-pulse" />
        <div className="flex gap-2 pt-1">
          <div className="h-7 w-24 bg-[var(--section)] rounded-full animate-pulse" />
          <div className="h-7 w-24 bg-[var(--section)] rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
