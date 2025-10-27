import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/core/contexts/auth';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { Card } from '@/core/components/Card';

/**
 * @page LoginPage
 * @summary Login page for user authentication
 * @domain core
 * @type auth-page
 * @category authentication
 */
export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao fazer login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card variant="elevated" className="max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-primary-600 mb-6">Login - BarberPro</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            fullWidth
          />
          <Input
            type="password"
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            fullWidth
          />
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
