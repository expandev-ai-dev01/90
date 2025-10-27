# BarberPro Backend API

Backend REST API for BarberPro - Barbershop Management System

## Description

Sistema voltado para gestão de barbearias, ajudando no agendamento de horários, controle de clientes, serviços, pagamentos e relatórios. A ideia é facilitar a rotina do barbeiro e melhorar a experiência do cliente com um processo mais rápido e organizado.

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Architecture**: REST API

## Project Structure

```
src/
├── api/                    # API Controllers
│   └── v1/                 # API Version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   ├── v1/                 # Version 1 routes
│   └── index.ts            # Main router
├── middleware/             # Express middleware
├── services/               # Business logic services
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── tests/                  # Global test utilities
└── server.ts               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint code
- `npm run lint:fix` - Lint and fix code

## API Documentation

### Base URL

- Development: `http://localhost:3000/api/v1`
- Production: `https://api.yourdomain.com/api/v1`

### Health Check

```
GET /health
```

Returns server health status.

## Features

- ✅ RESTful API architecture
- ✅ TypeScript for type safety
- ✅ Express.js framework
- ✅ API versioning support
- ✅ CORS configuration
- ✅ Security headers (Helmet)
- ✅ Request compression
- ✅ Request logging (Morgan)
- ✅ Environment configuration
- ✅ Error handling middleware
- ✅ Path alias support (@/)
- ✅ ESLint configuration
- ✅ Jest testing setup

## Development Guidelines

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Always use semicolons
- Maximum line length: 120 characters
- Follow TypeScript strict mode

### Naming Conventions

- Files: camelCase (e.g., `userService.ts`)
- API Routes: kebab-case (e.g., `/api/v1/internal/user-profile`)
- Functions: camelCase with action verbs
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase

### Testing

- Write tests alongside source files (`.test.ts`)
- Use global `tests/` directory only for shared utilities
- Aim for high test coverage
- Test both success and error scenarios

## License

MIT