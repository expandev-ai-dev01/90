import type {
  ClientEntity,
  ClientCreateRequest,
  ClientUpdateRequest,
  ClientListRequest,
  ClientListResponse,
} from './clientTypes';

// In-memory storage for clients
const clients: ClientEntity[] = [];

/**
 * @summary
 * Creates a new client with validation
 *
 * @function clientCreate
 * @module client
 *
 * @param {ClientCreateRequest} params - Client creation parameters
 *
 * @returns {Promise<ClientEntity>} Created client entity
 *
 * @throws {Error} When CPF or email already exists
 * @throws {Error} When validation fails
 */
export async function clientCreate(params: ClientCreateRequest): Promise<ClientEntity> {
  // Validate CPF uniqueness
  if (params.cpf) {
    const existingCpf = clients.find((c) => c.cpf === params.cpf && c.status === 'Ativo');
    if (existingCpf) {
      throw new Error('CPF já cadastrado no sistema');
    }
  }

  // Validate email uniqueness
  if (params.email) {
    const existingEmail = clients.find((c) => c.email === params.email && c.status === 'Ativo');
    if (existingEmail) {
      throw new Error('Email já cadastrado no sistema');
    }
  }

  // Validate at least one contact method
  if (!params.telefone && !params.email) {
    throw new Error('É necessário informar pelo menos um telefone ou email');
  }

  // Validate alternative phone is different
  if (params.telefone_alternativo && params.telefone_alternativo === params.telefone) {
    throw new Error('O telefone alternativo deve ser diferente do principal');
  }

  // Create new client
  const newClient: ClientEntity = {
    id_cliente: `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    nome_completo: params.nome_completo,
    cpf: params.cpf || null,
    data_nascimento: params.data_nascimento ? new Date(params.data_nascimento) : null,
    telefone: params.telefone,
    telefone_alternativo: params.telefone_alternativo || null,
    email: params.email || null,
    endereco: params.endereco || null,
    como_conheceu: params.como_conheceu || null,
    data_cadastro: new Date(),
    ultima_atualizacao: new Date(),
    status: 'Ativo',
    usuario_cadastro: 'system',
    usuario_ultima_atualizacao: 'system',
  };

  clients.push(newClient);

  return newClient;
}

/**
 * @summary
 * Lists clients with optional filters and pagination
 *
 * @function clientList
 * @module client
 *
 * @param {ClientListRequest} params - List parameters
 *
 * @returns {Promise<ClientListResponse>} Paginated list of clients
 */
export async function clientList(params: ClientListRequest): Promise<ClientListResponse> {
  const { status, page = 1, pageSize = 50 } = params;

  // Filter by status if provided
  let filteredClients = clients;
  if (status) {
    filteredClients = clients.filter((c) => c.status === status);
  }

  // Calculate pagination
  const total = filteredClients.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedClients = filteredClients.slice(startIndex, endIndex);

  return {
    data: paginatedClients,
    total,
    page,
    pageSize,
  };
}

/**
 * @summary
 * Gets a specific client by ID
 *
 * @function clientGet
 * @module client
 *
 * @param {string} id - Client identifier
 *
 * @returns {Promise<ClientEntity | null>} Client entity or null if not found
 */
export async function clientGet(id: string): Promise<ClientEntity | null> {
  const client = clients.find((c) => c.id_cliente === id);
  return client || null;
}

/**
 * @summary
 * Updates a client's information
 *
 * @function clientUpdate
 * @module client
 *
 * @param {ClientUpdateRequest} params - Update parameters
 *
 * @returns {Promise<ClientEntity>} Updated client entity
 *
 * @throws {Error} When client not found
 * @throws {Error} When validation fails
 */
export async function clientUpdate(params: ClientUpdateRequest): Promise<ClientEntity> {
  const clientIndex = clients.findIndex((c) => c.id_cliente === params.id);

  if (clientIndex === -1) {
    throw new Error('Cliente não encontrado');
  }

  const client = clients[clientIndex];

  // Validate CPF uniqueness if changed
  if (params.cpf && params.cpf !== client.cpf) {
    const existingCpf = clients.find(
      (c) => c.cpf === params.cpf && c.id_cliente !== params.id && c.status === 'Ativo'
    );
    if (existingCpf) {
      throw new Error('CPF já cadastrado no sistema');
    }
  }

  // Validate email uniqueness if changed
  if (params.email && params.email !== client.email) {
    const existingEmail = clients.find(
      (c) => c.email === params.email && c.id_cliente !== params.id && c.status === 'Ativo'
    );
    if (existingEmail) {
      throw new Error('Email já cadastrado no sistema');
    }
  }

  // Update client
  const updatedClient: ClientEntity = {
    ...client,
    nome_completo: params.nome_completo ?? client.nome_completo,
    cpf: params.cpf !== undefined ? params.cpf : client.cpf,
    data_nascimento:
      params.data_nascimento !== undefined
        ? params.data_nascimento
          ? new Date(params.data_nascimento)
          : null
        : client.data_nascimento,
    telefone: params.telefone ?? client.telefone,
    telefone_alternativo:
      params.telefone_alternativo !== undefined
        ? params.telefone_alternativo
        : client.telefone_alternativo,
    email: params.email !== undefined ? params.email : client.email,
    endereco: params.endereco !== undefined ? params.endereco : client.endereco,
    como_conheceu: params.como_conheceu !== undefined ? params.como_conheceu : client.como_conheceu,
    ultima_atualizacao: new Date(),
    usuario_ultima_atualizacao: 'system',
  };

  clients[clientIndex] = updatedClient;

  return updatedClient;
}

/**
 * @summary
 * Soft deletes a client (marks as inactive)
 *
 * @function clientDelete
 * @module client
 *
 * @param {string} id - Client identifier
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} When client not found
 */
export async function clientDelete(id: string): Promise<void> {
  const clientIndex = clients.findIndex((c) => c.id_cliente === id);

  if (clientIndex === -1) {
    throw new Error('Cliente não encontrado');
  }

  clients[clientIndex].status = 'Inativo';
  clients[clientIndex].ultima_atualizacao = new Date();
  clients[clientIndex].usuario_ultima_atualizacao = 'system';
}
