export type Role = 'TEACHER' | 'STUDENT';

export type MinimalUser = {
  id: string;
  name: string;
  role: Role;
  org?: string;
  avatarUrl?: string | null;
};
