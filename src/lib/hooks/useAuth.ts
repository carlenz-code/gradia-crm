'use client';
import { useCallback, useState } from 'react';
import { apiLogin, apiRegister } from '@/lib/services/api/auth.service';
import { mockLogin, mockRegister } from '@/lib/services/mock/auth.mock';
import type { AuthResponse, LoginInput, RegisterInput } from '@/lib/types/auth.types';


const useMocks = () => process.env.NEXT_PUBLIC_USE_MOCKS === '1';


export function useAuth() {
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


const login = useCallback(async (input: LoginInput): Promise<AuthResponse> => {
setLoading(true); setError(null);
try {
const res = useMocks() ? await mockLogin(input) : await apiLogin(input);
// Persistencia mínima en cliente (solo para demo)
if (typeof window !== 'undefined') localStorage.setItem('gradia_session', JSON.stringify(res));
return res;
} catch (e: any) {
setError(e?.message ?? 'Error de login');
throw e;
} finally { setLoading(false); }
}, []);


const register = useCallback(async (input: RegisterInput): Promise<AuthResponse> => {
setLoading(true); setError(null);
try {
const res = useMocks() ? await mockRegister(input) : await apiRegister(input);
if (typeof window !== 'undefined') localStorage.setItem('gradia_session', JSON.stringify(res));
return res;
} catch (e: any) {
setError(e?.message ?? 'Error de registro');
throw e;
} finally { setLoading(false); }
}, []);


return { login, register, loading, error };
}