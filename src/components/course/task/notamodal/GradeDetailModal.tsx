'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Award, Cpu, Eye, VideoPlay, CloseCircle } from 'iconsax-react';

type RubricItem = {
  label: string;
  score: number;
  max: number;
  date?: string;
};

type AIFeedback = {
  videoUrl?: string;
  overall?: string;
  bullets?: Array<{ text: string; at?: string }>;
  aspects?: Array<{ label: string; score: number; max: number }>;
};

/* ---------- Helpers ---------- */
const isFiniteNumber = (v: unknown): v is number =>
  typeof v === 'number' && Number.isFinite(v);

const toGradeNumber = (grade: unknown): number | null => {
  if (isFiniteNumber(grade)) return grade;
  if (typeof grade === 'string') {
    const n = Number(grade);
    return Number.isFinite(n) ? n : null;
  }
  return null;
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

/* ---------- Portal to body ---------- */
function ModalPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

export default function GradeDetailModal({
  isOpen,
  onClose,
  grade,            // 0..20 o null o string
  rubric = [],
  ai = {},
}: {
  isOpen: boolean;
  onClose: () => void;
  grade: number | string | null;
  rubric?: RubricItem[];
  ai?: AIFeedback;
}) {
  const [tab, setTab] = useState<'rubric' | 'ai'>('rubric');

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Saneo de nota
  const gradeNum = toGradeNumber(grade);
  const gradeText = gradeNum == null ? '—' : String(gradeNum);
  const pct = gradeNum == null ? 0 : clamp((gradeNum / 20) * 100, 0, 100);

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-[9999] grid place-items-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="grade-detail-title"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Card */}
        <div className="relative z-10 w-[min(980px,92vw)] max-h-[86vh] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Eye size={20} color="var(--brand)" />
              <h2 id="grade-detail-title" className="text-[15px] font-semibold">
                Detalle de la nota
              </h2>
            </div>

            <button
              onClick={onClose}
              className="icon-btn icon-btn--round"
              aria-label="Cerrar"
              title="Cerrar"
            >
              <CloseCircle size={20} color="var(--icon)" />
            </button>
          </div>

          {/* Progress / resumen */}
          <div className="px-5 pt-4">
            <div className="flex items-center gap-4">
              <div className="inline-grid place-items-center h-10 w-10 rounded-full border border-[var(--border)] text-[var(--brand)] font-semibold">
                {gradeText /* nunca NaN */}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-[13px] mb-1">
                  <span className="text-[color:var(--muted)]">Promedio</span>
                  <span className="font-medium">
                    {gradeNum == null ? '—' : `${gradeNum}/20`}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[color:var(--border)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent-green)] transition-[width] duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-5 pt-4">
            <div className="inline-flex rounded-xl border border-[var(--border)] bg-[var(--card)] p-1">
              <button
                className={`px-3 py-1.5 rounded-lg text-[13px] flex items-center gap-1 ${
                  tab === 'rubric' ? 'bg-[var(--section)] font-semibold' : 'text-[color:var(--muted)]'
                }`}
                onClick={() => setTab('rubric')}
              >
                <Award size={16} /> Rúbrica docente
              </button>
              <button
                className={`px-3 py-1.5 rounded-lg text-[13px] flex items-center gap-1 ${
                  tab === 'ai' ? 'bg-[var(--section)] font-semibold' : 'text-[color:var(--muted)]'
                }`}
                onClick={() => setTab('ai')}
              >
                <Cpu size={16} /> Evaluación de IA
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 overflow-auto" style={{ maxHeight: 'calc(86vh - 164px)' }}>
            {tab === 'rubric' ? <RubricView rubric={rubric} /> : <AIView ai={ai} />}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}

/* ---------- Subvistas ---------- */

function RubricView({ rubric }: { rubric: RubricItem[] }) {
  if (!rubric?.length) return <EmptyState text="Sin rúbrica registrada aún." />;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h3 className="text-[14px] font-semibold">Resultados</h3>
        <div className="space-y-2">
          {rubric.map((r, idx) => {
            const pct = clamp((r.score / r.max) * 100, 0, 100);
            return (
              <div key={idx} className="rounded-xl border border-[var(--border)] p-3">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="text-[13px] font-medium">{r.label}</div>
                  <div className="text-[13px]">
                    <span className="font-semibold">{r.score}</span> / {r.max}
                  </div>
                </div>
                <div className="h-2 rounded-full bg-[color:var(--border)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--brand)]/70"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                {r.date && (
                  <div className="mt-2 text-[12px] text-[color:var(--muted)]">{r.date}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-[14px] font-semibold">Retroalimentación</h3>
        <ul className="space-y-2">
          {rubric.map((r, idx) => (
            <li key={idx} className="flex items-start gap-2 text-[14px]">
              <span className="mt-[6px] h-2 w-2 rounded-full bg-[var(--brand)]/80" />
              <div>
                <div className="font-medium">{r.label}</div>
                <div className="text-[13px] text-[color:var(--muted)]">
                  Descripción breve del logro y oportunidad de mejora.
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AIView({ ai }: { ai: AIFeedback }) {
  const hasVideo = !!ai.videoUrl;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h3 className="text-[14px] font-semibold flex items-center gap-2">
          <VideoPlay size={18} /> Evidencia (video)
        </h3>
        <div className="aspect-video overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--section)] grid place-items-center">
          {hasVideo ? (
            <video src={ai.videoUrl} controls className="h-full w-full object-cover" />
          ) : (
            <div className="text-[13px] text-[color:var(--muted)]">Sin video adjunto</div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-[14px] font-semibold">Retroalimentación de IA</h3>
        {ai.overall && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--section)] p-3 text-[14px]">
            {ai.overall}
          </div>
        )}
        <div className="space-y-2">
          {ai.bullets?.map((b, i) => (
            <div key={i} className="rounded-xl border border-[var(--border)] p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[14px]">{b.text}</p>
                {b.at && (
                  <span className="ml-3 shrink-0 rounded-md bg-[var(--card)] px-2 py-[2px] text-[12px] border border-[var(--border)]">
                    {b.at}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {ai.aspects?.length ? (
          <div className="space-y-2 pt-2">
            <h4 className="text-[13px] font-semibold">Criterios evaluados</h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {ai.aspects.map((a, i) => {
                const pct = clamp((a.score / a.max) * 100, 0, 100);
                return (
                  <div key={i} className="rounded-xl border border-[var(--border)] p-3">
                    <div className="flex items-center justify-between text-[13px] mb-1">
                      <span>{a.label}</span>
                      <span className="font-medium">
                        {a.score}/{a.max}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[color:var(--border)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--brand)]/70"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-[var(--border)] bg-[var(--section)] p-8 text-[14px] text-[color:var(--muted)]">
      {text}
    </div>
  );
}
