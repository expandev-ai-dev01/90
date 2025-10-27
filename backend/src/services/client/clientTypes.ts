/**
 * @types ClientTypes
 * @summary Type definitions for client service
 * @domain client
 * @category business-logic
 */

export interface ClientEntity {
  id_cliente: string;
  nome_completo: string;
  cpf: string | null;
  data_nascimento: Date | null;
  telefone: string;
  telefone_alternativo: string | null;
  email: string | null;
  endereco: ClientAddress | null;
  como_conheceu: string | null;
  data_cadastro: Date;
  ultima_atualizacao: Date;
  status: 'Ativo' | 'Inativo';
  usuario_cadastro: string;
  usuario_ultima_atualizacao: string;
}

export interface ClientAddress {
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
}

export interface ClientCreateRequest {
  nome_completo: string;
  cpf?: string | null;
  data_nascimento?: string | null;
  telefone: string;
  telefone_alternativo?: string | null;
  email?: string | null;
  endereco?: ClientAddress | null;
  como_conheceu?: string | null;
}

export interface ClientUpdateRequest {
  id: string;
  nome_completo?: string;
  cpf?: string | null;
  data_nascimento?: string | null;
  telefone?: string;
  telefone_alternativo?: string | null;
  email?: string | null;
  endereco?: ClientAddress | null;
  como_conheceu?: string | null;
}

export interface ClientListRequest {
  status?: 'Ativo' | 'Inativo';
  page?: number;
  pageSize?: number;
}

export interface ClientListResponse {
  data: ClientEntity[];
  total: number;
  page: number;
  pageSize: number;
}
