// src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grad.IA",
  description: "LMS con IA",
};

// Importa la fuente y usa className
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* Usamos poppins.className directamente */}
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
