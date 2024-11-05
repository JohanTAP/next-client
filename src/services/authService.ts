const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  // Manejo de diferentes códigos de respuesta
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Credenciales inválidas. Verifica tu usuario y contraseña.');
    } else if (response.status === 403) {
      throw new Error('No puedes iniciar sesión, este usuario está deshabilitado.');
    } else {
      throw new Error('Error desconocido. Inténtalo de nuevo más tarde.');
    }
  }

  const data = await response.json();
  return data;
};
