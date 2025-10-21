'use client';

export default function TitleBar({
  left,
  right,
  className = '',
}: {
  left: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-[var(--border)] bg-[var(--panel-muted)] px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-4 ${className}`}>
      <div className="text-[15px] sm:text-[16px] font-semibold">{left}</div>
      {right && <div className="text-[13px]">{right}</div>}
    </div>
  );
}
