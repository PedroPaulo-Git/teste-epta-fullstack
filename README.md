# 🚗 Fullstack Vehicle Manager – Teste Técnico

Aplicação fullstack desenvolvida como parte do teste técnico para vaga de desenvolvedor júnior na **EPTA Softwares**.

Gerencie veículos com autenticação JWT, dashboard intuitivo e operações completas de CRUD com uma experiência de usuário moderna e responsiva.

---

## 🛠️ Tecnologias Utilizadas

### 💻 Frontend
- [Next.js](https://nextjs.org/) - Framework React com roteamento e SSR
- [React](https://reactjs.org/) - Biblioteca para interfaces de usuário
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Axios](https://axios-http.com/) - Cliente HTTP com interceptors
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [Lucide React](https://lucide.dev/) - Ícones modernos e consistentes

### 🔧 Backend
- [Node.js](https://nodejs.org/) - Runtime JavaScript
- [Express](https://expressjs.com/) - Framework web minimalista
- [Prisma ORM](https://www.prisma.io/) - ORM moderno para TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken) - Autenticação stateless
- [Zod](https://zod.dev/) - Validação de schemas TypeScript-first
- [bcrypt](https://github.com/dcodeIO/bcrypt.js/) - Hash seguro de senhas

### ☁️ Hospedagem / Deploy
- **Frontend:** [Vercel](https://vercel.com/) - Deploy automático e otimizado
- **Backend:** [Railway](https://railway.app/) - Plataforma serverless
- **Banco de Dados:** Railway PostgreSQL

---

## 🎯 Funcionalidades Principais

### 🔐 Sistema de Autenticação
- **Login/Registro** com validação em tempo real
- **Tokens JWT** com expiração automática
- **Rotas protegidas** com middleware de autenticação
- **Interceptors Axios** para gerenciamento automático de tokens
- **Redirecionamento inteligente** baseado no status de autenticação

### 📊 Dashboard Interativo
- **Cards informativos** com estatísticas em tempo real:
  - Total de veículos cadastrados
  - Veículos ativos (em uso)
  - Veículos inativos (arquivados)
- **Tabela responsiva** com ações contextuais
- **Sidebar de navegação** com dropdown mobile otimizado

### 🚗 Gestão de Veículos
- **Cadastro completo** com validação de placa (formato ABC-1D23)
- **Edição inline** com toggle switch para status
- **Arquivamento/restauração** sem exclusão permanente
- **Exclusão segura** com confirmação modal
- **Busca e filtros** por status

### 🎨 Interface Moderna
- **Design responsivo** que funciona em qualquer dispositivo
- **Modais intuitivos** com feedback visual
- **Notificações toast** para ações do usuário
- **Animações suaves** e transições elegantes
- **Tema consistente** com cores personalizadas

---

## 🧭 Rotas da API

| Método | Rota                    | Descrição                        |
|--------|-------------------------|----------------------------------|
| POST   | `/auth/login`           | Autenticação de usuário          |
| POST   | `/auth/register`        | Cadastro de novo usuário         |
| GET    | `/auth/verify`          | Validação de token JWT           |
| GET    | `/auth/user`            | Dados do usuário autenticado     |
| GET    | `/api/vehicles`         | Listar todos os veículos         |
| POST   | `/api/vehicles`         | Criar novo veículo               |
| PUT    | `/api/vehicles/:id`     | Atualizar dados do veículo       |
| PATCH  | `/api/vehicles/:id/archive` | Arquivar veículo            |
| PATCH  | `/api/vehicles/:id/restore` | Restaurar veículo           |
| DELETE | `/api/vehicles/:id`     | Excluir veículo permanentemente  |

---

## 📂 Estrutura do Projeto

### 🎯 Organização Frontend

```plaintext
/frontend/src/
├── app/                          # App Router do Next.js 13+
│   ├── layout.tsx               # Layout principal da aplicação
│   ├── page.tsx                 # Página inicial (apresentação)
│   └── globals.css              # Estilos globais
│
├── components/                   # Componentes React organizados
│   ├── Auth/                    # Componentes de autenticação
│   │   ├── AuthLoginPage.tsx    # Página de login
│   │   ├── AuthRegisterPage.tsx # Página de registro
│   │   └── ProtectedRoute.tsx   # Rota protegida
│   │
│   ├── DashboardComponents/     # Componentes do dashboard
│   │   ├── ManagerDashboard.tsx # Dashboard principal
│   │   ├── VehicleTableDashboard.tsx # Tabela de veículos
│   │   ├── SidebarDashboard.tsx # Navegação lateral
│   │   └── shared/              # Componentes compartilhados
│   │       └── HeaderManager.tsx # Cabeçalho do dashboard
│   │
│   ├── Modals/                  # Modais interativos
│   │   ├── VehicleModal.tsx     # Cadastro de veículo
│   │   ├── EditVehicleModal.tsx # Edição com toggle switch
│   │   ├── DeleteVehicleModal.tsx # Confirmação de exclusão
│   │   └── ArchiveVehicleModal.tsx # Arquivamento
│   │
│   └── ui/                      # Componentes de interface
│       └── Toast.tsx            # Notificações toast
│
├── hooks/                       # Hooks customizados
│   └── useAuth.ts              # Gerenciamento de autenticação
│
├── services/                    # Serviços e configurações
│   ├── api.ts                  # Cliente Axios com interceptors
│   └── useAuthGuard.ts         # Guarda de rota
│
├── types/                       # Tipos TypeScript centralizados
│   └── index.ts                # Definições de tipos (Vehicle, User, etc.)
│
└── pages/                       # Páginas legadas (se necessário)
    ├── index.tsx               # Página de apresentação
    └── dashboard.tsx           # Dashboard (redirecionamento)
```

### 🔧 Organização Backend

```plaintext
/backend/src/
├── controllers/                 # Controladores das rotas
│   ├── authController.ts       # Autenticação e usuários
│   └── vehicleController.ts    # CRUD de veículos
│
├── routes/                      # Definição das rotas
│   ├── authRoutes.ts           # Rotas de autenticação
│   └── vehicleRoutes.ts        # Rotas de veículos
│
├── services/                    # Lógica de negócio
│   ├── authService.ts          # Autenticação e JWT
│   └── vehicleService.ts       # Operações de veículos
│
├── middlewares/                 # Middlewares Express
│   └── authMiddleware.ts       # Verificação de JWT
│
├── schemas/                     # Validação com Zod
│   └── vehicleSchema.ts        # Schema de validação de veículos
│
├── utils/                       # Utilitários (se necessário)
└── server.ts                   # Configuração do servidor Express
```

### 🐳 **Configuração Docker**

```plaintext
/
├── docker-compose.yml          # Orquestração dos serviços
├── .dockerignore              # Arquivos ignorados pelo Docker
├── DOCKER.md                  # Documentação Docker completa
├── backend/
│   └── Dockerfile             # Imagem do backend
└── frontend/
    └── Dockerfile             # Imagem do frontend
```

---

## 🚀 Como Executar o Projeto

### 🐳 **Com Docker (Recomendado)**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/projeto-veiculos.git

# Acesse a pasta do projeto
cd projeto-veiculos

# Execute com Docker Compose
docker-compose up --build

# Acesse a aplicação
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

📖 **Documentação Docker completa**: [DOCKER.md](./DOCKER.md)

### 🔧 **Instalação Manual**

#### Backend

```bash
# Acesse a pasta do backend
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Execute as migrações do banco
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```

#### Frontend

```bash
# Entre na pasta frontend
cd frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite o arquivo .env.local com a URL do backend

# Execute o servidor de desenvolvimento
npm run dev
```

---

## 🎨 Experiência do Usuário

### ✨ Interface Intuitiva
- **Navegação fluida** entre páginas com transições suaves
- **Feedback visual** para todas as ações do usuário
- **Modais contextuais** que não interrompem o fluxo
- **Responsividade total** que funciona em desktop, tablet e mobile

### 🔒 Segurança e Confiabilidade
- **Validação em tempo real** de formulários
- **Confirmações para ações destrutivas** (exclusão, arquivamento)
- **Tokens JWT seguros** com expiração automática
- **Interceptors inteligentes** que gerenciam autenticação automaticamente

### 🚀 Performance e Organização
- **Tipos centralizados** para manutenibilidade
- **Componentes reutilizáveis** e bem estruturados
- **Separação clara** entre lógica de negócio e interface
- **Código limpo** seguindo boas práticas de React e TypeScript

---

## 🤝 Contribuição

Este projeto foi desenvolvido como teste técnico, mas está estruturado de forma profissional e escalável. A organização de pastas, tipagem TypeScript e padrões de código seguem as melhores práticas da indústria.

---

*Desenvolvido com ❤️ para a EPTA Softwares*

*"May the code be with you"* 🚀✨

*"And also with you"* 💻⚡
