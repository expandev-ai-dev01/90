import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/core/contexts/auth';
import { Button } from '@/core/components/Button';

/**
 * @layout DashboardLayout
 * @summary Dashboard layout with navigation and header
 * @domain core
 * @type layout-component
 * @category layout
 */
export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-xl font-bold text-primary-600">
                BarberPro
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-secondary-600">{user?.name}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};
