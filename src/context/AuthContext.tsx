"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  rol: {
    id: string;
    tipo_usuario: string;
  };
  is_habilitado: boolean;
  ubicacion_empresa: {
    id: string;
    sucursal: string;
  };
}

interface AuthContextProps {
  token: string | null;
  userInfo: UserInfo | null;
  setToken: (token: string | null, userInfo: UserInfo | null) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true); // Nuevo estado de loading
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedUserInfo = Cookies.get('userInfo');
    if (storedToken && storedUserInfo) {
      setTokenState(storedToken);
      setUserInfo(JSON.parse(storedUserInfo));
    }
    setLoading(false); // Cuando se terminan de cargar los datos
  }, []);

  const setToken = (newToken: string | null, user: UserInfo | null) => {
    setTokenState(newToken);
    setUserInfo(user);
    if (newToken) {
      Cookies.set('token', newToken, { expires: 1, secure: true, sameSite: 'strict' });
      Cookies.set('userInfo', JSON.stringify(user), { expires: 1, secure: true, sameSite: 'strict' });
    } else {
      Cookies.remove('token');
      Cookies.remove('userInfo');
    }
  };

  const handleLogout = () => {
    setToken(null, null);
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1c1c1c]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ token, userInfo, setToken, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
