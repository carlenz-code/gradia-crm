import type { AuthResponse, LoginInput, RegisterInput, AuthUser } from '@/lib/types/auth.types';


const MOCK_USERS: AuthUser[] = [
{ id: 'u1', name: 'Matias Flores', email: 'matias@upeu.edu.pe', role: 'STUDENT', org: 'Universidad Peruana Unión', avatarUrl: null },
{ id: 'u2', name: 'M.Sc. Pérez', email: 'mperez@upeu.edu.pe', role: 'TEACHER' },
];


export async function mockLogin(input: LoginInput): Promise<AuthResponse> {
await new Promise(r => setTimeout(r, 400));
const found = MOCK_USERS.find(u => u.email.toLowerCase() === input.email.toLowerCase());
if (!found) throw new Error('Credenciales inválidas');
return { user: found, token: 'mock-token-' + found.id };
}


export async function mockRegister(input: RegisterInput): Promise<AuthResponse> {
await new Promise(r => setTimeout(r, 500));
const exists = MOCK_USERS.some(u => u.email.toLowerCase() === input.email.toLowerCase());
if (exists) throw new Error('El correo ya está registrado');
const user: AuthUser = {
id: 'u' + (MOCK_USERS.length + 1),
name: `${input.firstName} ${input.lastName}`.trim(),
email: input.email,
role: 'STUDENT',
};
return { user, token: 'mock-token-' + user.id };
}