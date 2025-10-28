'use client';

import { useState } from 'react';
// 👇 CAMBIO CLAVE AQUÍ: Importamos directamente la función del servicio
import { forgotPasswordService } from '@/lib/services/auth/password.service';
import type { ForgotPasswordInput } from '@/lib/types/auth/password.types';

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const handleForgotPassword = async (values: ForgotPasswordInput) => {
    setIsLoading(true);
    setError(null);
    setIsSent(false);
    try {
      // 👇 La llamada ahora es directa a la función importada
      await forgotPasswordService(values);
      setIsSent(true);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error desconocido.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleForgotPassword,
    isLoading,
    error,
    isSent,
  };
}