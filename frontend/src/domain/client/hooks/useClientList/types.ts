import type { Client, ClientListParams } from '../../types';

/**
 * @types UseClientListTypes
 * @summary Type definitions for useClientList hook
 * @domain client
 * @category hooks
 */

export interface UseClientListOptions {
  filters?: ClientListParams;
  enabled?: boolean;
}

export interface UseClientListReturn {
  clients: Client[];
  total: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
