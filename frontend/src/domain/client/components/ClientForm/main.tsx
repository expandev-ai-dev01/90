import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/core/components/Input';
import { Button } from '@/core/components/Button';
import type { ClientFormProps } from './types';

const clientSchema = z.object({
  nome_completo: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100),
  cpf: z
    .string()
    .regex(/^\d{11}$/, 'CPF deve ter 11 dígitos')
    .optional()
    .or(z.literal('')),
  data_nascimento: z.string().optional().or(z.literal('')),
  telefone: z.string().min(10, 'Telefone é obrigatório'),
  telefone_alternativo: z.string().optional().or(z.literal('')),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  como_conheceu: z
    .enum(['Indicação', 'Redes Sociais', 'Google', 'Passou em frente', 'Anúncio', 'Outros'])
    .optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

/**
 * @component ClientForm
 * @summary Form component for creating and editing clients
 * @domain client
 * @type domain-component
 * @category form
 *
 * @props
 * @param {Client} [client] - Existing client data for editing
 * @param {Function} onSubmit - Callback when form is submitted
 * @param {Function} onCancel - Callback when form is cancelled
 * @param {boolean} [isLoading] - Loading state
 */
export const ClientForm = (props: ClientFormProps) => {
  const { client, onSubmit, onCancel, isLoading = false } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: client
      ? {
          nome_completo: client.nome_completo,
          cpf: client.cpf || '',
          data_nascimento: client.data_nascimento || '',
          telefone: client.telefone,
          telefone_alternativo: client.telefone_alternativo || '',
          email: client.email || '',
          como_conheceu: client.como_conheceu,
        }
      : {},
  });

  const handleFormSubmit = async (data: ClientFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Nome Completo *"
        {...register('nome_completo')}
        error={errors.nome_completo?.message}
        fullWidth
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="CPF" {...register('cpf')} error={errors.cpf?.message} fullWidth />

        <Input
          label="Data de Nascimento"
          type="date"
          {...register('data_nascimento')}
          error={errors.data_nascimento?.message}
          fullWidth
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Telefone *"
          {...register('telefone')}
          error={errors.telefone?.message}
          fullWidth
        />

        <Input
          label="Telefone Alternativo"
          {...register('telefone_alternativo')}
          error={errors.telefone_alternativo?.message}
          fullWidth
        />
      </div>

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        fullWidth
      />

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">
          Como conheceu a barbearia?
        </label>
        <select
          {...register('como_conheceu')}
          className="w-full px-3 py-2 rounded-md border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Selecione...</option>
          <option value="Indicação">Indicação</option>
          <option value="Redes Sociais">Redes Sociais</option>
          <option value="Google">Google</option>
          <option value="Passou em frente">Passou em frente</option>
          <option value="Anúncio">Anúncio</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          {client ? 'Atualizar' : 'Cadastrar'}
        </Button>
        <Button type="button" variant="secondary" fullWidth onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
