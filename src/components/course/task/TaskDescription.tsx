export default function TaskDescription({
  description,
  onViewRubric,
}: { description: string; onViewRubric?: () => void }) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-[16px] text-[var(--fg)]">Descripción</h2>
        <button
          onClick={onViewRubric}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] 
                     bg-[var(--section)] px-3 py-1.5 text-[13px]"
        >
          Ver rúbrica
        </button>
      </div>

      <hr className="my-3 border-[var(--border)]" />
      <p className="text-[14px] leading-relaxed text-[color:var(--muted)]">
        {description?.trim() || 'Sin descripción proporcionada por el docente.'}
      </p>
    </section>
  );
}
