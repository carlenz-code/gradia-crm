import type { AuthResponse, LoginInput, RegisterInput } from '@/lib/types/auth.types';


const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';


export async function apiLogin(input: LoginInput): Promise<AuthResponse> {
const res = await fetch(`${BASE}/api/auth/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(input),
credentials: 'include',
});
if (!res.ok) throw new Error((await res.json()).message ?? 'Error en login');
return res.json();
}


export async function apiRegister(input: RegisterInput): Promise<AuthResponse> {
const res = await fetch(`${BASE}/api/auth/register`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(input),
credentials: 'include',
});
if (!res.ok) throw new Error((await res.json()).message ?? 'Error en registro');
return res.json();
}