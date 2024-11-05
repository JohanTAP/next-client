"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';
import Cookies from 'js-cookie';

export const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setToken } = useAuth();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await login(username, password);
      Cookies.set('token', data.token, { expires: 1, secure: true, sameSite: 'strict' });
      Cookies.set('userInfo', JSON.stringify(data.usuario), { expires: 1, secure: true, sameSite: 'strict' });
      setToken(data.token, data.usuario); // Guarda token y userInfo en el contexto
      router.push('/dashboard');
      return data;
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
