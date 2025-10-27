import { Link } from 'react-router-dom';
import { Button } from '@/core/components/Button';
import { Card } from '@/core/components/Card';

/**
 * @page NotFoundPage
 * @summary 404 error page for non-existent routes
 * @domain core
 * @type error-page
 * @category error
 */
export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card variant="elevated" className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-secondary-900 mb-2">Página não encontrada</h2>
        <p className="text-secondary-600 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg" fullWidth>
            Voltar para o início
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default NotFoundPage;
