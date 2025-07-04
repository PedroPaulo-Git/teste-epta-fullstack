import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkTokenValidity, logout } from '../services/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
        
        if (!isValid) {
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
    logout: handleLogout
  };
};
