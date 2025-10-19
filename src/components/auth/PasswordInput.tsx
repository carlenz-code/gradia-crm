'use client';
import { useState } from 'react';


export default function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
const [show, setShow] = useState(false);
return (
<div className="relative">
<input {...props} type={show ? 'text' : 'password'} className={`w-full rounded-md border px-4 py-3 text-sm bg-[var(--input)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] ${props.className ?? ''}`} />
<button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] text-xs">{show ? 'Ocultar' : 'Mostrar'}</button>
</div>
);
}