"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';

export const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Funciones de manejo de cambio de estado
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await login(username, password);
      document.cookie = `token=${data.token}; path=/; max-age=3600; secure; samesite=strict`;
      router.push('/dashboard');
      return data; // Retorna los datos de la API para el token
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || 'Error desconocido');
      } else {
        setError('Error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    password,
    error,
    isLoading,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
  };
};
