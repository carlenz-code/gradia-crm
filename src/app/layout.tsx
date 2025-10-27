import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthSimProvider } from '@/context/AuthSimProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'GradIA',
  description: 'LMS con IA',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider>
          <AuthSimProvider>
            {children}
          </AuthSimProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
