'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from '@/lib/utils/validations';
import type { LoginInput, RegisterInput } from '@/lib/types/auth.types';
import { useAuth } from '@/lib/hooks/useAuth';
import PasswordInput from './PasswordInput';

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  return mode === 'login' ? <LoginForm /> : <RegisterForm />;
}

/* -------------------- LOGIN -------------------- */
function LoginForm() {
  const router = useRouter();
  const { login, loading, error } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: LoginInput) {
    const res = await login(values);
    router.push(`/dashboard?tab=general`); // ajusta si tu ruta difiere
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs mb-1">Correo</label>
        <input
          type="email"
          {...register('email')}
          className="w-full rounded-md border px-4 py-3 text-sm bg-[var(--input)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{String(errors.email.message)}</p>}
      </div>

      <div>
        <label className="block text-xs mb-1">Contraseña</label>
        <PasswordInput {...register('password')} />
        {errors.password && <p className="text-xs text-red-500 mt-1">{String(errors.password.message)}</p>}
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full py-3 text-sm font-medium bg-[var(--accent)] text-white disabled:opacity-60"
      >
        {loading ? 'Ingresando…' : 'Sign in'}
      </button>
    </form>
  );
}

/* ------------------ REGISTER ------------------- */
function RegisterForm() {
  const router = useRouter();
  const { register: doRegister, loading, error } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
  });

  async function onSubmit(values: RegisterInput) {
    const res = await doRegister(values);
    router.push(`/dashboard?tab=general`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs mb-1">Nombre</label>
          <input
            {...register('firstName')}
            className="w-full rounded-md border px-4 py-3 text-sm bg-[var(--input)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{String(errors.firstName.message)}</p>}
        </div>
        <div>
          <label className="block text-xs mb-1">Apellido</label>
          <input
            {...register('lastName')}
            className="w-full rounded-md border px-4 py-3 text-sm bg-[var(--input)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
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
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{String(errors.email.message)}</p>}
      </div>

      <div>
        <label className="block text-xs mb-1">Contraseña</label>
        <PasswordInput {...register('password')} />
        {errors.password && <p className="text-xs text-red-500 mt-1">{String(errors.password.message)}</p>}
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full py-3 text-sm font-medium bg-[var(--accent)] text-white disabled:opacity-60"
      >
        {loading ? 'Creando cuenta…' : 'Create account'}
      </button>
    </form>
  );
}
