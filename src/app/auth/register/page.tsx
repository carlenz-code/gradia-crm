import AuthCard from '@/components/auth/AuthCard';
import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';


export default function RegisterPage() {
return (
<AuthCard title="Crear cuenta" subtitle={<span>¿Ya tienes cuenta? <Link className="underline" href="/auth/login">Inicia sesión</Link></span>}>
<AuthForm mode="register" />
</AuthCard>
);
}