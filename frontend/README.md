# BarberPro - Frontend

Sistema de gestão para barbearias desenvolvido com React, TypeScript e TailwindCSS.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Zustand 5.0.1
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── main.tsx           # Ponto de entrada
│   ├── App.tsx            # Componente raiz
│   ├── router.tsx         # Configuração de rotas
│   └── providers.tsx      # Provedores globais
├── core/                   # Componentes e lógica compartilhada
│   ├── components/        # Componentes UI reutilizáveis
│   ├── contexts/          # Contextos React
│   ├── lib/               # Configurações de bibliotecas
│   ├── utils/             # Funções utilitárias
│   └── constants/         # Constantes da aplicação
├── domain/                 # Domínios de negócio (features)
├── pages/                  # Páginas da aplicação
│   └── layouts/           # Layouts compartilhados
└── assets/                 # Recursos estáticos
    └── styles/            # Estilos globais
```

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente no .env
```

## Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Lint do código
npm run lint
```

## Variáveis de Ambiente

- `VITE_API_URL`: URL base da API (padrão: http://localhost:3000)
- `VITE_API_VERSION`: Versão da API (padrão: v1)
- `VITE_API_TIMEOUT`: Timeout das requisições em ms (padrão: 30000)

## Funcionalidades

- ✅ Autenticação de usuários
- ✅ Dashboard com métricas
- 🚧 Cadastro de clientes
- 🚧 Agendamento de horários
- 🚧 Cadastro de serviços
- 🚧 Gestão de profissionais
- 🚧 Controle de pagamentos
- 🚧 Relatórios gerenciais
- 🚧 Controle de estoque
- 🚧 Fidelização de clientes
- 🚧 Configurações do sistema

## Padrões de Código

- Componentes em PascalCase
- Hooks começam com 'use'
- Arquivos de tipos em `types.ts`
- Estilos em `variants.ts` usando clsx
- Exports centralizados em `index.ts`
- JSDoc para documentação

## Licença

Proprietary - Todos os direitos reservados