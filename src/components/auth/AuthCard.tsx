'use client';
import type { ReactNode } from 'react';


export default function AuthCard({ title, subtitle, children }: { title: string; subtitle?: ReactNode; children: ReactNode }) {
return (
<div className="bg-[var(--card)] text-[var(--fg)] rounded-2xl shadow/50 shadow-black/5 border border-[var(--border)] w-full max-w-md p-6 sm:p-8">
<div className="mb-6">
<h1 className="text-2xl sm:text-3xl font-semibold mb-1">{title}</h1>
{subtitle && <div className="text-sm text-[var(--muted)]">{subtitle}</div>}
</div>
{children}
</div>
);
}