# 🚗 Fullstack Vehicle Manager – Teste Técnico

Aplicação fullstack desenvolvida como parte do teste técnico para vaga de desenvolvedor júnior na **EPTA Softwares**.

Gerencie veículos com autenticação JWT, dashboard e operações completas de CRUD.

---

## 🛠️ Tecnologias Utilizadas

### 💻 Frontend
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [TypeScript](https://www.typescriptlang.org/)

### 🔧 Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)
- [TypeScript](https://www.typescriptlang.org/)

### ☁️ Hospedagem / Deploy
- **Frontend:** [Vercel](https://vercel.com/)
- **Backend:** [Railway](https://railway.app/)
- **Banco de Dados:** Railway PostgreSQL

---

## 🔐 Autenticação

- Login com email e senha
- Geração de token JWT
- Rotas protegidas por middleware no backend
- Token armazenado no `localStorage` e usado via `Axios Interceptor`

---

## 📊 Funcionalidades

- Autenticação com JWT
- Dashboard com cards informativos:
  - Total de veículos
  - Veículos ativos
  - Veículos inativos
- Tabela de veículos com ações:
  - Editar
  - Arquivar / Desarquivar
  - Excluir
- Cadastro de novo veículo via modal
- Validação de formulário com Zod + React Hook Form

---

## 🧭 Rotas da API (Express)

| Método | Rota                    | Descrição                        |
|--------|-------------------------|----------------------------------|
| POST   | `/login`                | Login e geração de token JWT     |
| POST   | `/register`             | Cadastro de novo usuário          |
| GET    | `/vehicles`             | Listar todos os veículos         |
| POST   | `/vehicles`             | Criar novo veículo               |
| PUT    | `/vehicles/:id`         | Editar dados de um veículo       |
| PATCH  | `/vehicles/:id/archive` | Arquivar (inativar) veículo      |
| PATCH  | `/vehicles/:id/restore` | Desarquivar (ativar) veículo     |
| DELETE | `/vehicles/:id`         | Excluir um veículo               |

---

## 📂 Estrutura de Pastas
/backend
├── prisma/
│   └── schema.prisma               # Modelo do banco Prisma
│
└── src/
    ├── controllers/
    │   ├── authController.ts       # Login, register (se tiver)
    │   └── vehicleController.ts    # CRUD veículos
    │
    ├── routes/
    │   ├── authRoutes.ts           # Rotas de login, register
    │   └── vehicleRoutes.ts        # Rotas CRUD veículos
    │
    ├── middlewares/
    │   ├── authMiddleware.ts       # Verifica JWT, protege rotas
    │   └── errorHandler.ts         # Middleware de tratamento de erros
    │
    ├── services/
    │   └── authService.ts          # Lógica auth (hash, token JWT)
    │
    ├── utils/
    │   └── logger.ts               # Logs ou helpers gerais (opcional)
    │
    └── server.ts                   # Ponto de entrada do backend (Express app)

/frontend
└── src/
    ├── components/
    │   ├── VehicleTable.tsx        # Tabela listando veículos
    │   ├── VehicleModal.tsx        # Modal cadastro/edição veículo
    │   └── Layout.tsx              # Layout geral (header, footer)
    │
    ├── pages/
    │   ├── index.tsx               # Tela de login
    │   └── dashboard.tsx           # Dashboard com cards e lista
    │
    ├── services/
    │   └── api.ts                  # Axios com interceptors para JWT
    │
    └── hooks/
        └── useAuth.ts              # Hook customizado para auth (opcional)


## 🚀 Como Rodar Localmente

### 🔧 Backend


# Entrar na pasta backend
cd backend

# Instalar dependências
npm install

# Configurar o .env
cp .env.example .env

# Criar o banco e rodar as migrations
npx prisma migrate dev

# Rodar o servidor
npm run dev

### 🔧 Frontend


# Entrar na pasta frontend
cd frontend

# Instalar dependências
npm install

# Configurar o .env.local
cp .env.local.example .env.local

# Rodar o frontend
npm run dev
