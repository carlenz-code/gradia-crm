import Link from 'next/link';

export default function SidebarHeader({ title, exitHref }: { title: string; exitHref: string }) {
  return (
    <>
      <div className="px-1 flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold text-[var(--brand)]">Curso</div>
          <h2 className="text-[16px] font-semibold leading-tight mt-1 truncate">{title}</h2>
        </div>
        <Link
          href={exitHref}
          className="shrink-0 mt-[2px] h-7 w-7 grid place-items-center rounded-md hover:bg-[var(--section)] transition"
          aria-label="Salir del curso"
          title="Salir del curso"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" style={{ color: 'var(--icon)' }}>
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </Link>
      </div>
      <div className="my-3 h-px bg-[var(--border)]" />
    </>
  );
}
