'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUserService } from '@/lib/services/auth/user.service';
import type { RegisterFormInput } from '@/lib/types/auth/user.types';

export function useRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (values: RegisterFormInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await registerUserService(values);
      alert(result.message);
      router.push('/auth/login');
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error desconocido.');
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRegister, isLoading, error };
}