import type { CreateClientDto, UpdateClientDto, Client } from '../../types';

/**
 * @types ClientFormTypes
 * @summary Type definitions for ClientForm component
 * @domain client
 * @category components
 */

export interface ClientFormProps {
  client?: Client;
  onSubmit: ((data: CreateClientDto) => Promise<void>) | ((data: UpdateClientDto) => Promise<void>);
  onCancel: () => void;
  isLoading?: boolean;
}
