"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export const useLogout = () => {
  const { setToken } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    setToken(null, null); // Limpiamos el token y userInfo en el contexto de autenticación
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'; // Limpiamos la cookie
    router.push('/'); // Redirigimos al usuario a la página de inicio de sesión
  };

  return { handleLogout };
};
