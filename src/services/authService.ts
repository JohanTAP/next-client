const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error('Credenciales incorrectas. Por favor verifica tu usuario y contraseña.');
  }
  return response.json();
};
