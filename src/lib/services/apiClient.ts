const getApiBaseUrl = (api: 'auth' | 'core'): string => {
  const url = api === 'auth' 
    ? process.env.NEXT_PUBLIC_AUTH_API_URL 
    : process.env.NEXT_PUBLIC_CORE_API_URL;
  
  if (!url) throw new Error(`URL para API "${api}" no configurada.`);
  return url;
};

export const apiClient = async <T>(
  api: 'auth' | 'core',
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body: unknown = null
): Promise<T> => {
  const url = `${getApiBaseUrl(api)}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Para las cookies HttpOnly
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Ocurrió un error en la API.');
  }

  return data as T;
};