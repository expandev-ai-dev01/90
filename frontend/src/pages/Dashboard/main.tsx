import { Card } from '@/core/components/Card';
import { useAuth } from '@/core/contexts/auth';

/**
 * @page DashboardPage
 * @summary Main dashboard page showing overview and quick actions
 * @domain core
 * @type dashboard-page
 * @category dashboard
 */
export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Bem-vindo, {user?.name}!</h1>
        <p className="text-secondary-600 mt-2">Aqui está um resumo do seu negócio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="elevated">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Agendamentos Hoje</h3>
          <p className="text-3xl font-bold text-primary-600">12</p>
        </Card>

        <Card variant="elevated">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Clientes Ativos</h3>
          <p className="text-3xl font-bold text-primary-600">248</p>
        </Card>

        <Card variant="elevated">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Faturamento Mês</h3>
          <p className="text-3xl font-bold text-primary-600">R$ 15.420</p>
        </Card>

        <Card variant="elevated">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Taxa de Ocupação</h3>
          <p className="text-3xl font-bold text-primary-600">87%</p>
        </Card>
      </div>

      <Card variant="elevated">
        <h2 className="text-xl font-bold text-secondary-900 mb-4">Próximos Agendamentos</h2>
        <p className="text-secondary-600">Funcionalidade em desenvolvimento...</p>
      </Card>
    </div>
  );
};

export default DashboardPage;
