'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"          // pone/quita .dark en <html>
      defaultTheme="system"
      enableSystem
      enableColorScheme={false}  // evita style="color-scheme: ..." inline
      disableTransitionOnChange  // evita parpadeos al cambiar tema
    >
      {children}
    </NextThemesProvider>
  );
}
