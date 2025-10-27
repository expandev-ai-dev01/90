/**
 * @types AuthTypes
 * @summary Type definitions for authentication context
 * @domain core
 * @category authentication
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'barber' | 'receptionist';
  permissions?: string[];
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

export interface LoginResponse {
  user: User;
  token: string;
}
