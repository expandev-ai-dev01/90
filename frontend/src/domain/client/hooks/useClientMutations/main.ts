import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientService } from '../../services/clientService';
import type { UseClientMutationsOptions, UseClientMutationsReturn } from './types';

/**
 * @hook useClientMutations
 * @summary Hook for client create, update, and delete operations
 * @domain client
 * @type domain-hook
 * @category data
 *
 * @dependencies
 * - @tanstack/react-query: For mutations and cache invalidation
 * - clientService: For API calls
 *
 * @parameters
 * @param {UseClientMutationsOptions} options - Hook configuration options
 *
 * @returns {UseClientMutationsReturn} Mutation functions and loading states
 *
 * @examples
 * ```tsx
 * const { createClient, isCreating } = useClientMutations({
 *   onSuccess: (client) => console.log('Created:', client),
 *   onError: (error) => console.error('Error:', error)
 * });
 * ```
 */
export const useClientMutations = (
  options: UseClientMutationsOptions = {}
): UseClientMutationsReturn => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options;

  const createMutation = useMutation({
    mutationFn: clientService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => clientService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client', data.id_cliente] });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: clientService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return {
    createClient: createMutation.mutateAsync,
    updateClient: (id, data) => updateMutation.mutateAsync({ id, data }),
    deleteClient: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
