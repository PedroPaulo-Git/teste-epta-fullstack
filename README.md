# 🚗 Fullstack Vehicle Manager – Teste Técnico

Aplicação fullstack desenvolvida como parte do teste técnico para vaga de desenvolvedor júnior na **EPTA Softwares**.

Gerencie veículos com autenticação JWT, dashboard intuitivo e operações completas de CRUD com uma experiência de usuário moderna e responsiva.

## 🌐 **APLICAÇÃO EM PRODUÇÃO**

**🚀 Deploy concluído e funcionando na Railway!**

**🔗 Link da aplicação:** [https://teste-epta-fullstack-frontend.up.railway.app/dashboard](https://teste-epta-fullstack-frontend.up.railway.app/dashboard)

**✅ Status:** Online e funcionando em produção
**📱 Responsivo:** Funciona perfeitamente em desktop, tablet e mobile
**🔒 Seguro:** Autenticação JWT implementada e funcionando

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
- **Frontend:**  [Railway](https://railway.app/) - Deploy automático e otimizado
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
/frontend/
├── src/
│   ├── app/                          # App Router do Next.js 13+
│   │   ├── layout.tsx               # Layout principal da aplicação
│   │   ├── page.tsx                 # Página inicial (apresentação)
│   │   ├── globals.css              # Estilos globais
│   │   ├── favicon.ico              # Ícone da aplicação
│   │   ├── login/                   # Página de login
│   │   │   └── page.tsx
│   │   ├── register/                # Página de registro
│   │   │   └── page.tsx
│   │   ├── dashboard/               # Dashboard principal
│   │   │   └── page.tsx
│   │   └── relatorio/               # Página de relatórios
│   │       └── page.tsx
│   │
│   ├── components/                   # Componentes React organizados
│   │   ├── Auth/                    # Componentes de autenticação
│   │   │   ├── AuthLoginPage.tsx    # Página de login
│   │   │   ├── AuthRegisterPage.tsx # Página de registro
│   │   │   └── ProtectedRoute.tsx   # Rota protegida
│   │   │
│   │   ├── DashboardComponents/     # Componentes do dashboard
│   │   │   ├── ManagerDashboard.tsx # Dashboard principal
│   │   │   ├── VehicleTableDashboard.tsx # Tabela de veículos
│   │   │   ├── SidebarDashboard.tsx # Navegação lateral
│   │   │   └── shared/              # Componentes compartilhados
│   │   │       └── HeaderManager.tsx # Cabeçalho do dashboard
│   │   │
│   │   ├── Modals/                  # Modais interativos
│   │   │   ├── VehicleModal.tsx     # Cadastro de veículo
│   │   │   ├── EditVehicleModal.tsx # Edição com toggle switch
│   │   │   ├── DeleteVehicleModal.tsx # Confirmação de exclusão
│   │   │   ├── ArchiveVehicleModal.tsx # Arquivamento
│   │   │   └── HeaderModalUserEdit.tsx # Cabeçalho de edição
│   │   │
│   │   └── ui/                      # Componentes de interface
│   │       └── NotificationToast.tsx # Notificações toast
│   │
│   ├── hooks/                       # Hooks customizados
│   │   ├── useAuth.ts              # Gerenciamento de autenticação
│   │   └── useNotificationToast.ts # Hook para notificações
│   │
│   ├── services/                    # Serviços e configurações
│   │   ├── api.ts                  # Cliente Axios com interceptors
│   │   ├── searchService.ts        # Serviço de pesquisa de veículos
│   │   └── useAuthGuard.ts         # Guarda de rota
│   │
│   └── types/                       # Tipos TypeScript centralizados
│       ├── index.ts                # Definições de tipos (Vehicle, User, etc.)
│       └── README.md               # Documentação dos tipos
│
├── public/                          # Arquivos estáticos
│   ├── assets/                      # Imagens e ícones
│   │   ├── DashboardArrowDown.svg
│   │   ├── DashboardCheckMark.svg
│   │   ├── DashboardIcon.svg
│   │   ├── DashboardIconActive.svg
│   │   ├── DashboardRelatorioActive.svg
│   │   ├── DashboardUser.svg
│   │   ├── DashboardUserYellow.svg
│   │   ├── Logo.png
│   │   └── Relatorio.svg
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── package.json                     # Dependências do frontend
├── next.config.ts                   # Configuração do Next.js
├── tsconfig.json                    # Configuração TypeScript
├── postcss.config.mjs               # Configuração PostCSS
├── eslint.config.mjs                # Configuração ESLint
├── Dockerfile                       # Imagem Docker do frontend
└── README.md                        # Documentação do frontend
```

### 🔧 Organização Backend

```plaintext
/backend/
├── src/
│   ├── controllers/                 # Controladores das rotas
│   │   ├── authController.ts       # Autenticação e usuários
│   │   └── vehicleController.ts    # CRUD de veículos
│   │
│   ├── routes/                      # Definição das rotas
│   │   ├── authRoutes.ts           # Rotas de autenticação
│   │   └── vehicleRoutes.ts        # Rotas de veículos
│   │
│   ├── services/                    # Lógica de negócio
│   │   ├── authService.ts          # Autenticação e JWT
│   │   └── vehicleService.ts       # Operações de veículos
│   │
│   ├── middlewares/                 # Middlewares Express
│   │   ├── authMiddleware.ts       # Verificação de JWT
│   │   └── validationMiddleware.ts # Validação de dados
│   │
│   ├── schemas/                     # Validação com Zod
│   │   ├── authSchemas.ts          # Schemas de autenticação
│   │   ├── vehicleSchema.ts        # Schema de validação de veículos
│   │   └── README.md               # Documentação dos schemas
│   │
│   ├── utils/                       # Utilitários (vazio atualmente)
│   └── server.ts                   # Configuração do servidor Express
│
├── prisma/                          # Configuração do Prisma ORM
│   ├── migrations/                  # Migrações do banco de dados
│   │   ├── 20250703033017_init/
│   │   │   └── migration.sql
│   │   ├── 20250703222325_init_with_model_field/
│   │   │   └── migration.sql
│   │   ├── 20250704083643_add_user_name_field/
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma               # Schema do banco de dados
│
├── package.json                     # Dependências do backend
├── tsconfig.json                    # Configuração TypeScript
├── Dockerfile                       # Imagem Docker do backend
└── .gitignore                       # Arquivos ignorados pelo Git
```

### 🐳 **Configuração Docker**

```plaintext
/
├── docker-compose.yml              # Orquestração dos serviços
├── .dockerignore                   # Arquivos ignorados pelo Docker
├── DOCKER.md                       # Documentação Docker completa
├── backend/
│   └── Dockerfile                  # Imagem do backend
└── frontend/
    └── Dockerfile                  # Imagem do frontend
```

---

## 🚀 Como Executar o Projeto Localmente

### 📋 **Pré-requisitos**

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **PostgreSQL** (para instalação manual)
- **Docker** e **Docker Compose** (para execução com Docker)

### 🐳 **Opção 1: Com Docker (Recomendado)**

A forma mais simples e rápida de executar o projeto:

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/projeto-veiculos.git

# 2. Acesse a pasta do projeto
cd projeto-veiculos

# 3. Execute com Docker Compose
docker-compose up --build

# 4. Acesse a aplicação
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

**✅ Vantagens do Docker:**
- Não precisa instalar PostgreSQL localmente
- Ambiente isolado e reproduzível
- Configuração automática do banco de dados
- Funciona igual em qualquer sistema operacional

📖 **Documentação Docker completa**: [DOCKER.md](./DOCKER.md)

### 🔧 **Opção 2: Instalação Manual**

Para desenvolvimento local sem Docker:

#### **Passo 1: Configurar o Backend**

```bash
# 1. Acesse a pasta do backend
cd backend

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
# Crie um arquivo .env baseado no .env.example
cp .env.example .env

# 4. Edite o arquivo .env com suas configurações:
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
# JWT_SECRET="sua_chave_secreta_aqui"

# 5. Execute as migrações do banco
npx prisma migrate dev

# 6. Inicie o servidor de desenvolvimento
npm run server
```

**🎯 Comando de desenvolvimento do backend:** `npm run server`

#### **Passo 2: Configurar o Frontend**

```bash
# 1. Abra um novo terminal e entre na pasta frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
# Crie um arquivo .env.local baseado no .env.local.example
cp .env.local.example .env.local

# 4. Edite o arquivo .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:5000

# 5. Execute o servidor de desenvolvimento
npm run dev
```

**🎯 Comando de desenvolvimento do frontend:** `npm run dev`

### 🌐 **Acessando a Aplicação**

Após executar os comandos acima:

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Dashboard:** http://localhost:3000/dashboard (após fazer login)

### 🔍 **Verificando se está funcionando**

1. **Backend:** Acesse http://localhost:5000 - deve mostrar uma mensagem de API funcionando
2. **Frontend:** Acesse http://localhost:3000 - deve carregar a página inicial
3. **Login:** Use as credenciais de teste ou crie uma nova conta

### 🛠️ **Comandos Úteis**

```bash
# Backend
npm run server         # Inicia servidor de desenvolvimento
npm run build          # Build para produção
npx prisma studio      # Interface visual do banco de dados

# Frontend  
npm run dev            # Inicia servidor de desenvolvimento
npm run build          # Build para produção
npm run lint           # Verifica código com ESLint
```

---

## 🚀 **Deploy em Produção**

### ☁️ **Railway - Plataforma de Deploy**

O projeto está configurado para deploy automático na **Railway**:

- **Frontend:** Deploy automático via GitHub
- **Backend:** Deploy automático via GitHub  
- **Banco de Dados:** PostgreSQL gerenciado pela Railway
- **Domínio:** HTTPS automático e customizado

### 🔧 **Configuração de Deploy**

Para fazer deploy na Railway:

1. **Conecte seu repositório** na Railway
2. **Configure as variáveis de ambiente:**
   - `DATABASE_URL` (PostgreSQL)
   - `JWT_SECRET` (Chave secreta para JWT)
   - `NEXT_PUBLIC_API_URL` (URL do backend em produção)
3. **Deploy automático** a cada push para main

### 📊 **Status de Produção**

- ✅ **Frontend:** Online em https://teste-epta-fullstack-frontend.up.railway.app
- ✅ **Backend:** Online e funcionando
- ✅ **Banco de Dados:** PostgreSQL ativo
- ✅ **Autenticação:** JWT funcionando
- ✅ **Responsividade:** Testada em todos os dispositivos

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
