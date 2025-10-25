import type { ReactNode } from 'react';
import Image from 'next/image';
import '@/app/globals.css';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh w-dvw lg:overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      <div className="grid h-full w-full lg:grid-cols-2">
        {/* Izquierda: imagen */}
        <div className="relative hidden lg:block h-full">
          <Image
            src="/auth/hero.webp"       // Asegúrate que exista: /public/auth/hero.webp
            alt="Grad.IA"
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width:1024px) 50vw, 0px"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/25" />
        </div>

        {/* Derecha: contenido (scroll interno si crece) */}
        <div className="h-full bg-white">
          <div className="h-full overflow-y-auto">
            <div className="mx-auto w-full max-w-[440px] px-6 sm:px-8 py-10 lg:py-14">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
