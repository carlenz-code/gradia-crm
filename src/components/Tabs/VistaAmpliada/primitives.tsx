// src/components/Tabs/VistaAmpliada/primitives.tsx
'use client';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export function Chip({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex h-7 items-center rounded-full px-3 text-[12px]
                     bg-[var(--brand)]/10 text-[var(--brand)] font-medium">
      {children}
    </span>
  );
}

export function IconButton({ className = '', children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`inline-flex h-7 px-3 items-center gap-1 rounded-lg text-[12px]
                 border border-[var(--border)] bg-[var(--card)]
                 hover:bg-[var(--section)] transition ${className}`}
    >
      {children}
    </button>
  );
}
