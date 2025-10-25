// /src/app/auth/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({ email: z.string().email('Correo inválido') });

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } =
    useForm<{ email: string }>({ resolver: zodResolver(schema) });

  async function onSubmit(values: { email: string }) {
    setLoading(true);
    try {
      // TODO: POST a tu endpoint real
      await new Promise(r => setTimeout(r, 800));
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="mb-8">
        <h1 className="text-[32px] sm:text-[36px] font-semibold leading-tight">Recuperar contraseña</h1>
        <p className="mt-2 text-[13px] text-[var(--muted)]">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>
      </div>

      {!sent ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs mb-1">Correo</label>
            <input
              type="email"
              {...register('email')}
              className="w-full rounded-md border px-4 py-3 text-sm bg-[var(--input)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{String(errors.email.message)}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full py-3 text-sm font-medium bg-[var(--accent)] text-white disabled:opacity-60"
          >
            {loading ? 'Enviando…' : 'Enviar enlace'}
          </button>
        </form>
      ) : (
        <div className="text-sm text-center text-[var(--fg)] bg-[var(--input)] p-4 rounded-lg">
          Si tu correo está registrado, recibirás un enlace de recuperación.
        </div>
      )}

      <p className="mt-8 text-[13px] text-[var(--muted)] text-center">
        <Link href="/auth/login" className="underline">Volver al inicio de sesión</Link>
      </p>
    </motion.div>
  );
}
