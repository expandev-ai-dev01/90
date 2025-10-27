import { useQuery } from '@tanstack/react-query';
import { clientService } from '../../services/clientService';
import type { UseClientListOptions, UseClientListReturn } from './types';

/**
 * @hook useClientList
 * @summary Hook for fetching and managing client list with caching
 * @domain client
 * @type domain-hook
 * @category data
 *
 * @dependencies
 * - @tanstack/react-query: For data fetching and caching
 * - clientService: For API calls
 *
 * @parameters
 * @param {UseClientListOptions} options - Hook configuration options
 *
 * @returns {UseClientListReturn} Client list data and operations
 *
 * @examples
 * ```tsx
 * const { clients, isLoading, refetch } = useClientList({
 *   filters: { status: 'Ativo', page: 1, pageSize: 10 }
 * });
 * ```
 */
export const useClientList = (options: UseClientListOptions = {}): UseClientListReturn => {
  const { filters = {}, enabled = true } = options;

  const queryKey = ['clients', filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => clientService.list(filters),
    enabled,
    staleTime: 2 * 60 * 1000,
  });

  return {
    clients: data?.data || [],
    total: data?.total || 0,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
