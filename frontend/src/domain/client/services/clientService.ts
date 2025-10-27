import { authenticatedClient } from '@/core/lib/api';
import type {
  Client,
  CreateClientDto,
  UpdateClientDto,
  ClientListParams,
  ClientListResponse,
} from '../types';

/**
 * @service clientService
 * @summary Client management service for authenticated endpoints
 * @domain client
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/client/...
 *
 * Authentication token is automatically added by interceptor.
 */
export const clientService = {
  /**
   * @endpoint GET /api/v1/internal/client
   * @summary Fetches list of clients with filters
   */
  async list(params?: ClientListParams): Promise<ClientListResponse> {
    const response = await authenticatedClient.get('/client', { params });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/client/:id
   * @summary Fetches single client by ID
   */
  async getById(id: string): Promise<Client> {
    const response = await authenticatedClient.get(`/client/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/client
   * @summary Creates new client
   */
  async create(data: CreateClientDto): Promise<Client> {
    const response = await authenticatedClient.post('/client', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/client/:id
   * @summary Updates existing client
   */
  async update(id: string, data: UpdateClientDto): Promise<Client> {
    const response = await authenticatedClient.put(`/client/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/client/:id
   * @summary Soft deletes client (marks as inactive)
   */
  async delete(id: string): Promise<void> {
    await authenticatedClient.delete(`/client/${id}`);
  },
};
