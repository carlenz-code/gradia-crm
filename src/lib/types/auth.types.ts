export type Role = 'STUDENT' | 'TEACHER';


export type AuthUser = {
id: string;
name: string;
email: string;
role: Role;
org?: string;
avatarUrl?: string | null;
};


export type LoginInput = { email: string; password: string };
export type RegisterInput = { firstName: string; lastName: string; email: string; password: string };


export type AuthResponse = {
user: AuthUser;
token: string; // placeholder (JWT/sesion)
};