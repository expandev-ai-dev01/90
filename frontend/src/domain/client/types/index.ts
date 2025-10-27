/**
 * @types ClientTypes
 * @summary Type definitions for client domain
 * @domain client
 * @category types
 */

export interface Client {
  id_cliente: string;
  nome_completo: string;
  cpf?: string;
  data_nascimento?: string;
  telefone: string;
  telefone_alternativo?: string;
  email?: string;
  endereco?: ClientAddress;
  como_conheceu?:
    | 'Indicação'
    | 'Redes Sociais'
    | 'Google'
    | 'Passou em frente'
    | 'Anúncio'
    | 'Outros';
  data_cadastro: string;
  ultima_atualizacao: string;
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

export interface CreateClientDto {
  nome_completo: string;
  cpf?: string;
  data_nascimento?: string;
  telefone: string;
  telefone_alternativo?: string;
  email?: string;
  endereco?: ClientAddress;
  como_conheceu?:
    | 'Indicação'
    | 'Redes Sociais'
    | 'Google'
    | 'Passou em frente'
    | 'Anúncio'
    | 'Outros';
}

export interface UpdateClientDto {
  nome_completo?: string;
  cpf?: string;
  data_nascimento?: string;
  telefone?: string;
  telefone_alternativo?: string;
  email?: string;
  endereco?: ClientAddress;
  como_conheceu?:
    | 'Indicação'
    | 'Redes Sociais'
    | 'Google'
    | 'Passou em frente'
    | 'Anúncio'
    | 'Outros';
}

export interface ClientListParams {
  status?: 'Ativo' | 'Inativo';
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface ClientListResponse {
  data: Client[];
  total: number;
  page: number;
  pageSize: number;
}
