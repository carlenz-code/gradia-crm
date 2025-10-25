'use client';
import { PropsWithChildren } from 'react';

export default function SectionShell({ children }: PropsWithChildren) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
      {children}
    </section>
  );
}
