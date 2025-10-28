'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForgotPassword } from '@/lib/hooks/auth/useForgotPassword';
import type { ForgotPasswordInput } from '@/lib/types/auth/password.types';

const schema = z.object({ email: z.string().email('Correo inválido') });

export default function ForgotPasswordPage() {
  // Toda la lógica y el estado ahora vienen del hook
  const { handleForgotPassword, isLoading, error, isSent } = useForgotPassword();

  const { register, handleSubmit, formState: { errors } } =
    useForm<ForgotPasswordInput>({ resolver: zodResolver(schema) });

  // La función onSubmit solo delega la tarea al hook
  const onSubmit = (values: ForgotPasswordInput) => {
    handleForgotPassword(values);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="mb-8">
        <h1 className="text-[32px] sm:text-[36px] font-semibold leading-tight">Recuperar contraseña</h1>
        <p className="mt-2 text-[13px] text-[var(--muted)]">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>
      </div>

      {/* Usamos el estado 'isSent' del hook para mostrar el formulario o el mensaje de éxito */}
      {!isSent ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs mb-1">Correo</label>
            <input
              type="email"
              {...register('email')}
              className="w-full rounded-md border px-4 py-3 text-sm bg-[var(--input)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder="tu@email.com"
              disabled={isLoading}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{String(errors.email.message)}</p>}
          </div>

          {/* Mostramos el error que viene del hook */}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full py-3 text-sm font-medium bg-[var(--accent)] text-white disabled:opacity-60"
          >
            {isLoading ? 'Enviando…' : 'Enviar enlace'}
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