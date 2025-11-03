// Persistencia local del perfil por usuario (sin backend)
export type ProfileLocal = {
  name?: string;
  org?: string;
  phone?: string;
  bio?: string;
  avatarDataUrl?: string; // imagen en base64
};

const KEY = (userId: string) => `gradia:profile:${userId}`;

export function loadProfile(userId: string): ProfileLocal {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(KEY(userId));
    return raw ? (JSON.parse(raw) as ProfileLocal) : {};
  } catch {
    return {};
  }
}

export function saveProfile(userId: string, patch: ProfileLocal) {
  if (typeof window === 'undefined') return;
  const current = loadProfile(userId);
  const next = { ...current, ...patch };
  localStorage.setItem(KEY(userId), JSON.stringify(next));
  return next;
}
