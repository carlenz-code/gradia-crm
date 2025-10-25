'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeSlash } from 'iconsax-react';

const schema = z.object({
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  confirmPassword: z.string().min(8, 'Mínimo 8 caracteres'),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

type FormInput = { password: string; confirmPassword: string };

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token'); // úsalo al llamar a tu API

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } =
    useForm<FormInput>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormInput) {
    setLoading(true);
    try {
      // TODO: POST { token, password: values.password } a tu API
      await new Promise(r => setTimeout(r, 800));
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="mb-8">
        <h1 className="text-[32px] sm:text-[36px] font-semibold leading-tight">Nueva contraseña</h1>
        <p className="mt-2 text-[13px] text-[var(--muted)]">Ingresa tu nueva contraseña para continuar.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs mb-1">Nueva contraseña</label>
          <div className="relative">
            <input
              type={show1 ? 'text' : 'password'}
              {...register('password')}
              className="w-full rounded-md border px-4 py-3 pr-12 text-sm bg-[var(--input)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder="Mínimo 8 caracteres"
            />
            <button type="button" onClick={() => setShow1(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
              {show1 ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{String(errors.password.message)}</p>}
        </div>

        <div>
          <label className="block text-xs mb-1">Confirmar contraseña</label>
          <div className="relative">
            <input
              type={show2 ? 'text' : 'password'}
              {...register('confirmPassword')}
              className="w-full rounded-md border px-4 py-3 pr-12 text-sm bg-[var(--input)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder="Repite tu nueva contraseña"
            />
            <button type="button" onClick={() => setShow2(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
              {show2 ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{String(errors.confirmPassword.message)}</p>}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full rounded-full py-3 text-sm font-medium bg-[var(--accent)] text-white disabled:opacity-60"
        >
          {loading ? 'Guardando…' : 'Guardar contraseña'}
        </motion.button>
      </form>
    </motion.div>
  );
}
