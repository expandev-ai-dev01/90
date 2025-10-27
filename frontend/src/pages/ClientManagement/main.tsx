import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { useClientList } from '@/domain/client/hooks/useClientList';
import { useClientMutations } from '@/domain/client/hooks/useClientMutations';
import { ClientList } from '@/domain/client/components/ClientList';
import { ClientForm } from '@/domain/client/components/ClientForm';
import type { Client, CreateClientDto } from '@/domain/client/types';

/**
 * @page ClientManagementPage
 * @summary Client management page with list, create, and search functionality
 * @domain client
 * @type management-page
 * @category client-management
 *
 * @routing
 * - Path: /dashboard/clients
 * - Guards: Authentication required
 *
 * @layout
 * - Layout: DashboardLayout
 * - Sections: Header, Search, List, Form Modal
 */
export const ClientManagementPage = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Ativo' | 'Inativo' | ''>('');

  const { clients, isLoading, refetch } = useClientList({
    filters: {
      status: statusFilter || undefined,
      search: searchTerm || undefined,
    },
  });

  const { createClient, deleteClient, isCreating, isDeleting } = useClientMutations({
    onSuccess: () => {
      setShowForm(false);
      refetch();
    },
    onError: (error: Error) => {
      alert(`Erro: ${error.message}`);
    },
  });

  const handleClientClick = (client: Client) => {
    navigate(`/dashboard/clients/${client.id_cliente}`);
  };

  const handleDeleteClick = async (client: Client) => {
    if (window.confirm(`Deseja realmente excluir o cliente ${client.nome_completo}?`)) {
      try {
        await deleteClient(client.id_cliente);
        refetch();
      } catch (error: unknown) {
        console.error('Error deleting client:', error);
      }
    }
  };

  const handleFormSubmit = async (data: CreateClientDto) => {
    await createClient(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Clientes</h1>
          <p className="text-secondary-600 mt-2">Gerencie o cadastro de clientes</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setShowForm(true)}>
          Novo Cliente
        </Button>
      </div>

      <Card variant="elevated">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Buscar por nome, telefone ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'Ativo' | 'Inativo' | '')}
                className="w-full px-3 py-2 rounded-md border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Todos os status</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      <ClientList
        clients={clients}
        isLoading={isLoading || isDeleting}
        onClientClick={handleClientClick}
        onDeleteClick={handleDeleteClick}
      />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card variant="elevated" className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">Novo Cliente</h2>
            <ClientForm
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
              isLoading={isCreating}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default ClientManagementPage;
