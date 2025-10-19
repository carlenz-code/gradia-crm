import { z } from 'zod';


export const loginSchema = z.object({
email: z.string().email('Correo inválido'),
password: z.string().min(8, 'Mínimo 8 caracteres'),
});


export const registerSchema = z.object({
firstName: z.string().min(1, 'Requerido'),
lastName: z.string().min(1, 'Requerido'),
email: z.string().email('Correo inválido'),
password: z.string().min(8, 'Mínimo 8 caracteres'),
});


export type LoginSchema = typeof loginSchema;
export type RegisterSchema = typeof registerSchema;