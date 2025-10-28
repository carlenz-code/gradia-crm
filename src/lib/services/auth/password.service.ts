import { apiClient } from '../apiClient';
import type { ForgotPasswordInput, ForgotPasswordResponse } from '@/lib/types/auth/password.types';

export const forgotPasswordService = (
  formData: ForgotPasswordInput
): Promise<ForgotPasswordResponse> => {
  // 'forgot-password' es público, así que usa el apiClient simple
  return apiClient<ForgotPasswordResponse>('auth', '/forgot-password', 'POST', formData);
};