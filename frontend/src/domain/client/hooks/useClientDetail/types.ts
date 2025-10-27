import type { Client } from '../../types';

/**
 * @types UseClientDetailTypes
 * @summary Type definitions for useClientDetail hook
 * @domain client
 * @category hooks
 */

export interface UseClientDetailOptions {
  clientId: string;
  enabled?: boolean;
}

export interface UseClientDetailReturn {
  client: Client | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
