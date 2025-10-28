// src/services/auth/user.service.ts
import { apiClient } from '../apiClient';
import type {
  RegisterFormInput,
  RegisterInputAPI,
  RegisterResponse,
} from '@/lib/types/auth/user.types';


export const registerUserService = (
  formData: RegisterFormInput
): Promise<RegisterResponse> => {
  // Traduce los datos del formulario a lo que la API espera
  const apiData: RegisterInputAPI = {
    nombre: formData.firstName,
    apellido: formData.lastName,
    correo: formData.email,
    password: formData.password,
  };

  // Llama al "mensajero" con las instrucciones correctas
  return apiClient<RegisterResponse>( 'auth','/register', 'POST', apiData);
};