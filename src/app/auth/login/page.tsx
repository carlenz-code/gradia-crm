'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeSlash } from 'iconsax-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import GoogleIcon from '@/components/auth/GoogleIcon';

type LoginInput = { email: string; password: string };
const schema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } =
    useForm<LoginInput>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  async function onSubmit(values: LoginInput) {
    setLoading(true);
    try {
      // TODO: integra tu useAuth().login(values)
      await new Promise(r => setTimeout(r, 600));
      router.push('/dashboard?tab=general');
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="mb-8">
        <h1 className="text-[32px] sm:text-[36px] font-semibold leading-tight">Inicia sesión en Grad.IA</h1>
        <p className="mt-2 text-[13px] text-[var(--muted)]">
          ¿No tienes cuenta?{' '}
          <Link href="/auth/register" className="underline">Regístrate</Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs mb-1">Correo</label>
          <input
            type="email"
            {...register('email')}
            autoComplete="email"
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
              autoComplete="current-password"
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

        <div className="pt-2 flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-[13px] text-[var(--muted)]">
            <input type="checkbox" className="accent-[var(--accent)]" defaultChecked />
            Recuérdame
          </label>
          <Link href="/auth/forgot-password" className="text-[13px] underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full rounded-full py-3 text-sm font-medium bg-[var(--accent)] text-white disabled:opacity-60"
        >
          {loading ? 'Ingresando…' : 'Iniciar sesión'}
        </motion.button>

        <div className="text-center text-[12px] text-[var(--muted)]">o continuar con</div>

        <button
          type="button"
          onClick={() => alert('Google OAuth pendiente de integrar')}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] py-3 text-sm hover:bg-[var(--input)] transition"
        >
          <GoogleIcon className="w-4 h-4" /> Continuar con Google
        </button>
      </form>
    </motion.div>
  );
}
