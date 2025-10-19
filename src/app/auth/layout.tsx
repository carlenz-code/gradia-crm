import type { ReactNode } from 'react';
import Image from 'next/image';
import '@/app/globals.css';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh w-dvw lg:overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      <div className="grid h-full w-full lg:grid-cols-2">
        {/* Left: hero image */}
        <div className="relative hidden lg:block h-full">
          <Image
            src="/auth/hero.webp" // pon tu imagen aquí (2560x1440 recomendado)
            alt="Grad.IA"
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width:1024px) 50vw, 0px"
          />
          {/* Overlay para contraste */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/25" />
        </div>

        {/* Right: content, scroll propio si hace falta */}
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
