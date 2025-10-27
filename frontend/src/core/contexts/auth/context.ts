import { createContext } from 'react';
import type { AuthContextValue } from './types';

/**
 * @context AuthContext
 * @summary Authentication context for managing user authentication state
 * @domain core
 * @type context
 * @category authentication
 */
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
