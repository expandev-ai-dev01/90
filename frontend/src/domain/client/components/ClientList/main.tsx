import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { formatDate } from '@/core/utils/format';
import type { ClientListProps } from './types';

/**
 * @component ClientList
 * @summary List component for displaying clients
 * @domain client
 * @type domain-component
 * @category display
 *
 * @props
 * @param {Client[]} clients - Array of clients to display
 * @param {boolean} isLoading - Loading state
 * @param {Function} onClientClick - Callback when client is clicked
 * @param {Function} onDeleteClick - Callback when delete is clicked
 */
export const ClientList = (props: ClientListProps) => {
  const { clients, isLoading, onClientClick, onDeleteClick } = props;

  if (isLoading) {
    return <LoadingSpinner size="large" />;
  }

  if (clients.length === 0) {
    return (
      <Card variant="outlined">
        <p className="text-center text-secondary-600 py-8">Nenhum cliente encontrado</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <Card
          key={client.id_cliente}
          variant="outlined"
          className="hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 cursor-pointer" onClick={() => onClientClick(client)}>
              <h3 className="text-lg font-semibold text-secondary-900">{client.nome_completo}</h3>
              <div className="mt-2 space-y-1 text-sm text-secondary-600">
                <p>Telefone: {client.telefone}</p>
                {client.email && <p>Email: {client.email}</p>}
                <p>Cadastrado em: {formatDate(client.data_cadastro)}</p>
                <p>
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
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => onClientClick(client)}>
                Ver Detalhes
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDeleteClick(client)}>
                Excluir
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
