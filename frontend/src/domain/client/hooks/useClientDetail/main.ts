import { useQuery } from '@tanstack/react-query';
import { clientService } from '../../services/clientService';
import type { UseClientDetailOptions, UseClientDetailReturn } from './types';

/**
 * @hook useClientDetail
 * @summary Hook for fetching single client details
 * @domain client
 * @type domain-hook
 * @category data
 *
 * @dependencies
 * - @tanstack/react-query: For data fetching and caching
 * - clientService: For API calls
 *
 * @parameters
 * @param {UseClientDetailOptions} options - Hook configuration options
 *
 * @returns {UseClientDetailReturn} Client detail data and operations
 *
 * @examples
 * ```tsx
 * const { client, isLoading } = useClientDetail({ clientId: '123' });
 * ```
 */
export const useClientDetail = (options: UseClientDetailOptions): UseClientDetailReturn => {
  const { clientId, enabled = true } = options;

  const queryKey = ['client', clientId];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => clientService.getById(clientId),
    enabled: enabled && !!clientId,
    staleTime: 2 * 60 * 1000,
  });

  return {
    client: data || null,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
