import { useState, useEffect, ReactNode } from 'react';
import { AuthContext } from './context';
import type { User, AuthContextValue } from './types';

/**
 * @component AuthProvider
 * @summary Provides authentication context to the application
 * @domain core
 * @type context-provider
 * @category authentication
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const storedUser = localStorage.getItem('auth_user');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsAuthenticated(true);
          }
        }
      } catch (error: unknown) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const mockUser: User = {
        id: '1',
        name: 'Admin User',
        email,
        role: 'admin',
        permissions: ['all'],
      };
      const mockToken = 'mock-jwt-token';

      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      return mockUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error: unknown) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
