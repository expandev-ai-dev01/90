import type { CreateClientDto, UpdateClientDto, Client } from '../../types';

/**
 * @types UseClientMutationsTypes
 * @summary Type definitions for useClientMutations hook
 * @domain client
 * @category hooks
 */

export interface UseClientMutationsOptions {
  onSuccess?: (client: Client) => void;
  onError?: (error: Error) => void;
}

export interface UseClientMutationsReturn {
  createClient: (data: CreateClientDto) => Promise<Client>;
  updateClient: (id: string, data: UpdateClientDto) => Promise<Client>;
  deleteClient: (id: string) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}
