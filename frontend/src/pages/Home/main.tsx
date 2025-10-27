import { Link } from 'react-router-dom';
import { Button } from '@/core/components/Button';
import { Card } from '@/core/components/Card';

/**
 * @page HomePage
 * @summary Landing page for the application
 * @domain core
 * @type landing-page
 * @category public
 */
export const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card variant="elevated" className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">BarberPro</h1>
        <p className="text-secondary-600 mb-8">Sistema completo de gestão para barbearias</p>
        <div className="space-y-4">
          <Link to="/login" className="block">
            <Button variant="primary" size="lg" fullWidth>
              Acessar Sistema
            </Button>
          </Link>
          <p className="text-sm text-secondary-500">
            Gerencie agendamentos, clientes, serviços e muito mais
          </p>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
