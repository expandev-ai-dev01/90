import type { Client } from '../../types';

/**
 * @types ClientListTypes
 * @summary Type definitions for ClientList component
 * @domain client
 * @category components
 */

export interface ClientListProps {
  clients: Client[];
  isLoading: boolean;
  onClientClick: (client: Client) => void;
  onDeleteClick: (client: Client) => void;
}
