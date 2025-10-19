'use client';
export function MenuSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3.5 pt-3 pb-2 text-[12px] font-medium tracking-wide uppercase text-[color:var(--muted)]">
      {children}
    </div>
  );
}
export function MenuDivider() {
  return <div className="h-px my-2 bg-[var(--border)]" role="separator" />;
}
export function MenuList(props: React.HTMLAttributes<HTMLUListElement>) {
  return <ul role="menu" {...props} />;
}
export function MenuItem(props: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li role="none" {...props} />;
}
