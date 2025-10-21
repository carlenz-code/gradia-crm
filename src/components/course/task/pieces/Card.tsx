'use client';

export default function Card({
  children,
  className = '',
  title,
  subtitle,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: React.ReactNode;
}) {
  return (
    <section className={`rounded-2xl border border-[var(--border)] bg-[var(--card)] ${className}`}>
      {(title || subtitle) && (
        <header className="px-5 pt-4">
          {title && <div className="text-[13px] font-medium text-[color:var(--muted)]">{title}</div>}
          {subtitle}
        </header>
      )}
      <div className={`${title || subtitle ? 'px-5 pb-5 pt-3' : 'p-5'}`}>{children}</div>
    </section>
  );
}
