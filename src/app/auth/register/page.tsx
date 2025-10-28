'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeSlash } from 'iconsax-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import GoogleIcon from '@/components/auth/GoogleIcon';
import { useRegister } from '@/lib/hooks/auth/useRegister';
import type { RegisterFormInput } from '@/lib/types/auth/user.types';

type RegisterInput = { firstName: string; lastName: string; email: string; password: string };

const schema = z.object({
  firstName: z.string().min(1, 'Requerido'),
  lastName: z.string().min(1, 'Requerido'),
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

export default function RegisterPage() {
const [show, setShow] = useState(false);
  // Toda la lógica ahora viene del hook
  const { handleRegister, isLoading, error: apiError } = useRegister();

  const { register, handleSubmit, formState: { errors } } =
    useForm<RegisterFormInput>({
      resolver: zodResolver(schema),
      defaultValues: { firstName: '', lastName: '', email: '', password: '' }
    });

  // La función onSubmit solo delega la tarea al hook
  const onSubmit = (values: RegisterFormInput) => {
    handleRegister(values);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="mb-8">
        <h1 className="text-[32px] sm:text-[36px] font-semibold leading-tight">Crear cuenta</h1>
        <p className="mt-2 text-[13px] text-[var(--muted)]">
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth/login" className="underline">Inicia sesión</Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Nombre</label>
            <input
              {...register('firstName')}
              className="w-full rounded-md border px-4 py-3 text-sm bg-[var(--input)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder="Tu nombre"
            />
            {errors.firstName && <p className="text-xs text-red-500 mt-1">{String(errors.firstName.message)}</p>}
          </div>
          <div>
            <label className="block text-xs mb-1">Apellido</label>
            <input
              {...register('lastName')}
              className="w-full rounded-md border px-4 py-3 text-sm bg-[var(--input)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder="Tu apellido"
            />
            {errors.lastName && <p className="text-xs text-red-500 mt-1">{String(errors.lastName.message)}</p>}
          </div>
        </div>

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

        <div>
          <label className="block text-xs mb-1">Contraseña</label>
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              {...register('password')}
              className="w-full rounded-md border px-4 py-3 pr-12 text-sm bg-[var(--input)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder="Mínimo 8 caracteres"
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              tabIndex={-1}
            >
              {show ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{String(errors.password.message)}</p>}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full py-3 text-sm font-medium bg-[var(--accent)] text-white disabled:opacity-60"
        >
          {isLoading ? 'Creando cuenta…' : 'Crear cuenta'}
        </motion.button>

        <div className="text-center text-[12px] text-[var(--muted)]">o registrarte con</div>

        <button
          type="button"
          onClick={() => alert('Google OAuth pendiente de integrar')}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] py-3 text-sm hover:bg-[var(--input)] transition"
        >
          <GoogleIcon className="w-4 h-4" /> Registrarte con Google
        </button>
      </form>
    </motion.div>
  );
}
