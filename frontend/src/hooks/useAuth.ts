import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkTokenValidity, logout } from '../services/api';
import api from '../services/api';

type User = {
  id: number;
  name: string;
  email: string;
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const response = await api.get('/auth/user');
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        const isValid = await checkTokenValidity();
        setIsAuthenticated(isValid);
        
        if (isValid) {
          // Se o token é válido, buscar dados do usuário imediatamente
          await fetchUserData();
        } else {
          // Token inválido, redirecionar para login
          router.push('/login');
        }
      } catch (error) {
        console.error('Erro ao validar token:', error);
        setIsAuthenticated(false);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [router]);

  const handleLogout = () => {
    logout();
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    logout: handleLogout,
    fetchUserData
  };
};
