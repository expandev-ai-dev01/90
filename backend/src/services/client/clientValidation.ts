import { z } from 'zod';

/**
 * @validation ClientValidation
 * @summary Zod validation schemas for client operations
 * @domain client
 * @category validation
 */

// Helper validators
const validateCPF = (cpf: string): boolean => {
  const cleanCpf = cpf.replace(/\D/g, '');
  if (cleanCpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleanCpf)) return false;
  return true;
};

const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length === 10 || cleanPhone.length === 11;
};

const validateAge = (birthDate: string): boolean => {
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= 12;
  }
  return age >= 12;
};

// Address schema
const addressSchema = z
  .object({
    rua: z.string().max(200).optional(),
    numero: z.string().max(20).optional(),
    complemento: z.string().max(100).optional(),
    bairro: z.string().max(100).optional(),
    cidade: z.string().max(100).optional(),
    estado: z.string().max(2).optional(),
    cep: z.string().max(10).optional(),
  })
  .nullable()
  .optional();

// Create client schema
export const clientCreateSchema = z
  .object({
    nome_completo: z
      .string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(100, 'O nome não pode exceder 100 caracteres')
      .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Nome contém caracteres inválidos'),
    cpf: z
      .string()
      .optional()
      .nullable()
      .refine((val) => !val || validateCPF(val), {
        message: 'CPF inválido',
      }),
    data_nascimento: z
      .string()
      .optional()
      .nullable()
      .refine(
        (val) => {
          if (!val) return true;
          const date = new Date(val);
          return date <= new Date();
        },
        { message: 'A data de nascimento não pode ser futura' }
      )
      .refine((val) => !val || validateAge(val), {
        message: 'O cliente deve ter pelo menos 12 anos',
      }),
    telefone: z.string().refine(validatePhone, {
      message: 'Telefone deve seguir o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX',
    }),
    telefone_alternativo: z
      .string()
      .optional()
      .nullable()
      .refine((val) => !val || validatePhone(val), {
        message: 'Telefone alternativo deve seguir o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX',
      }),
    email: z
      .string()
      .email('Formato de email inválido')
      .max(200, 'Email muito longo')
      .optional()
      .nullable(),
    endereco: addressSchema,
    como_conheceu: z
      .enum(['Indicação', 'Redes Sociais', 'Google', 'Passou em frente', 'Anúncio', 'Outros'])
      .optional()
      .nullable(),
  })
  .refine((data) => data.telefone || data.email, {
    message: 'É necessário informar pelo menos um telefone ou email',
    path: ['telefone'],
  })
  .refine(
    (data) => {
      if (data.telefone_alternativo && data.telefone) {
        return data.telefone_alternativo !== data.telefone;
      }
      return true;
    },
    {
      message: 'O telefone alternativo deve ser diferente do principal',
      path: ['telefone_alternativo'],
    }
  );

// Update client schema
export const clientUpdateSchema = z
  .object({
    id: z.string().min(1, 'ID do cliente é obrigatório'),
    nome_completo: z
      .string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(100, 'O nome não pode exceder 100 caracteres')
      .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Nome contém caracteres inválidos')
      .optional(),
    cpf: z
      .string()
      .optional()
      .nullable()
      .refine((val) => !val || validateCPF(val), {
        message: 'CPF inválido',
      }),
    data_nascimento: z
      .string()
      .optional()
      .nullable()
      .refine(
        (val) => {
          if (!val) return true;
          const date = new Date(val);
          return date <= new Date();
        },
        { message: 'A data de nascimento não pode ser futura' }
      )
      .refine((val) => !val || validateAge(val), {
        message: 'O cliente deve ter pelo menos 12 anos',
      }),
    telefone: z
      .string()
      .refine(validatePhone, {
        message: 'Telefone deve seguir o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX',
      })
      .optional(),
    telefone_alternativo: z
      .string()
      .optional()
      .nullable()
      .refine((val) => !val || validatePhone(val), {
        message: 'Telefone alternativo deve seguir o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX',
      }),
    email: z
      .string()
      .email('Formato de email inválido')
      .max(200, 'Email muito longo')
      .optional()
      .nullable(),
    endereco: addressSchema,
    como_conheceu: z
      .enum(['Indicação', 'Redes Sociais', 'Google', 'Passou em frente', 'Anúncio', 'Outros'])
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      if (data.telefone_alternativo && data.telefone) {
        return data.telefone_alternativo !== data.telefone;
      }
      return true;
    },
    {
      message: 'O telefone alternativo deve ser diferente do principal',
      path: ['telefone_alternativo'],
    }
  );

// Get client schema
export const clientGetSchema = z.object({
  id: z.string().min(1, 'ID do cliente é obrigatório'),
});

// List clients schema
export const clientListSchema = z.object({
  status: z.enum(['Ativo', 'Inativo']).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().max(100).optional().default(50),
});

// Delete client schema
export const clientDeleteSchema = z.object({
  id: z.string().min(1, 'ID do cliente é obrigatório'),
});
