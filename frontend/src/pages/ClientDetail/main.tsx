import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { useClientDetail } from '@/domain/client/hooks/useClientDetail';
import { useClientMutations } from '@/domain/client/hooks/useClientMutations';
import { ClientForm } from '@/domain/client/components/ClientForm';
import { formatDate } from '@/core/utils/format';
import type { UpdateClientDto } from '@/domain/client/types';

/**
 * @page ClientDetailPage
 * @summary Client detail page showing full client information
 * @domain client
 * @type detail-page
 * @category client-management
 *
 * @routing
 * - Path: /dashboard/clients/:id
 * - Params: { id: string }
 * - Guards: Authentication required
 */
export const ClientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { client, isLoading, refetch } = useClientDetail({
    clientId: id!,
  });

  const { updateClient, deleteClient, isUpdating, isDeleting } = useClientMutations({
    onSuccess: () => {
      setIsEditing(false);
      refetch();
    },
    onError: (error: Error) => {
      alert(`Erro: ${error.message}`);
    },
  });

  const handleUpdate = async (data: UpdateClientDto) => {
    await updateClient(id!, data);
  };

  const handleDelete = async () => {
    if (window.confirm(`Deseja realmente excluir o cliente ${client?.nome_completo}?`)) {
      try {
        await deleteClient(id!);
        navigate('/dashboard/clients');
      } catch (error: unknown) {
        console.error('Error deleting client:', error);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="large" />;
  }

  if (!client) {
    return (
      <Card variant="outlined">
        <p className="text-center text-secondary-600 py-8">Cliente não encontrado</p>
        <div className="flex justify-center mt-4">
          <Button variant="primary" onClick={() => navigate('/dashboard/clients')}>
            Voltar para Lista
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/clients')}>
            ← Voltar
          </Button>
          <h1 className="text-3xl font-bold text-secondary-900 mt-2">{client.nome_completo}</h1>
          <p className="text-secondary-600 mt-1">
            Status:{' '}
            <span
              className={`font-medium ${
                client.status === 'Ativo' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {client.status}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" onClick={() => setIsEditing(true)} disabled={isEditing}>
            Editar
          </Button>
          <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
            Excluir
          </Button>
        </div>
      </div>

      {isEditing ? (
        <Card variant="elevated">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Editar Cliente</h2>
          <ClientForm
            client={client}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            isLoading={isUpdating}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="elevated">
            <h2 className="text-xl font-bold text-secondary-900 mb-4">Informações Pessoais</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-secondary-600">Nome Completo</p>
                <p className="font-medium text-secondary-900">{client.nome_completo}</p>
              </div>
              {client.cpf && (
                <div>
                  <p className="text-sm text-secondary-600">CPF</p>
                  <p className="font-medium text-secondary-900">{client.cpf}</p>
                </div>
              )}
              {client.data_nascimento && (
                <div>
                  <p className="text-sm text-secondary-600">Data de Nascimento</p>
                  <p className="font-medium text-secondary-900">
                    {formatDate(client.data_nascimento)}
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card variant="elevated">
            <h2 className="text-xl font-bold text-secondary-900 mb-4">Contato</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-secondary-600">Telefone Principal</p>
                <p className="font-medium text-secondary-900">{client.telefone}</p>
              </div>
              {client.telefone_alternativo && (
                <div>
                  <p className="text-sm text-secondary-600">Telefone Alternativo</p>
                  <p className="font-medium text-secondary-900">{client.telefone_alternativo}</p>
                </div>
              )}
              {client.email && (
                <div>
                  <p className="text-sm text-secondary-600">Email</p>
                  <p className="font-medium text-secondary-900">{client.email}</p>
                </div>
              )}
            </div>
          </Card>

          <Card variant="elevated">
            <h2 className="text-xl font-bold text-secondary-900 mb-4">Informações Adicionais</h2>
            <div className="space-y-3">
              {client.como_conheceu && (
                <div>
                  <p className="text-sm text-secondary-600">Como conheceu</p>
                  <p className="font-medium text-secondary-900">{client.como_conheceu}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-secondary-600">Data de Cadastro</p>
                <p className="font-medium text-secondary-900">{formatDate(client.data_cadastro)}</p>
              </div>
              <div>
                <p className="text-sm text-secondary-600">Última Atualização</p>
                <p className="font-medium text-secondary-900">
                  {formatDate(client.ultima_atualizacao)}
                </p>
              </div>
            </div>
          </Card>

          <Card variant="elevated">
            <h2 className="text-xl font-bold text-secondary-900 mb-4">Histórico</h2>
            <p className="text-secondary-600">Funcionalidade em desenvolvimento...</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ClientDetailPage;
