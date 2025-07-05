# 🐳 Docker - Sistema de Gerenciamento de Veículos

Este documento explica como usar Docker para executar o projeto completo.

## 🎯 **O que está incluído**

- **Frontend**: Next.js + React (porta 3000)
- **Backend**: Express + TypeScript (porta 5000)
- **Database**: PostgreSQL (porta 5432)

## 🚀 **Como usar**

### **1. Primeira execução**
```bash
# Construir e iniciar todos os serviços
docker-compose up --build
```

### **2. Execuções subsequentes**
```bash
# Iniciar serviços
docker-compose up

# Executar em background
docker-compose up -d

# Parar serviços
docker-compose down
```

### **3. Comandos úteis**
```bash
# Ver logs de todos os serviços
docker-compose logs

# Ver logs de um serviço específico
docker-compose logs frontend
docker-compose logs backend
docker-compose logs postgres

# Reconstruir um serviço específico
docker-compose up --build frontend

# Acessar container
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec postgres psql -U postgres -d vehicle_management
```

## 📁 **Estrutura dos arquivos Docker**

```
fullstack-q1/
├── docker-compose.yml      # Orquestração dos serviços
├── .dockerignore          # Arquivos ignorados
├── backend/
│   └── Dockerfile         # Imagem do backend
├── frontend/
│   └── Dockerfile         # Imagem do frontend
└── DOCKER.md              # Esta documentação
```

## 🌐 **Acessos**

Após executar `docker-compose up`, acesse:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432

## 🔧 **Configurações**

### **Variáveis de Ambiente**

**Backend:**
- `DATABASE_URL`: Conexão com PostgreSQL
- `JWT_SECRET`: Chave para tokens JWT
- `NODE_ENV`: Ambiente (development/production)

**Frontend:**
- `NEXT_PUBLIC_API_URL`: URL da API do backend

**Database:**
- `POSTGRES_DB`: Nome do banco
- `POSTGRES_USER`: Usuário
- `POSTGRES_PASSWORD`: Senha

### **Volumes**

- `postgres_data`: Dados persistentes do PostgreSQL
- `./backend:/app`: Código fonte do backend (hot reload)
- `./frontend:/app`: Código fonte do frontend (hot reload)

## 🛠️ **Desenvolvimento**

### **Hot Reload**
Os volumes estão configurados para hot reload:
- Alterações no código são refletidas automaticamente
- Não precisa reconstruir containers

### **Database Migrations**
```bash
# Executar migrations
docker-compose exec backend npx prisma migrate dev

# Reset database
docker-compose exec backend npx prisma migrate reset
```

### **Logs em tempo real**
```bash
# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
```

## 🚨 **Solução de Problemas**

### **Porta já em uso**
```bash
# Parar todos os containers
docker-compose down

# Verificar portas em uso
netstat -ano | findstr :3000
netstat -ano | findstr :5000
netstat -ano | findstr :5432
```

### **Reconstruir tudo**
```bash
# Parar e remover tudo
docker-compose down -v

# Reconstruir do zero
docker-compose up --build
```

### **Limpar cache do Docker**
```bash
# Limpar imagens não utilizadas
docker system prune -a

# Limpar volumes
docker volume prune
```

## 📦 **Produção**

Para produção, modifique os Dockerfiles:

**Backend:**
```dockerfile
# Usar multi-stage build
FROM node:18-alpine AS builder
# ... build steps

FROM node:18-alpine AS production
# ... production setup
```

**Frontend:**
```dockerfile
# Build estático
RUN npm run build
CMD ["npm", "start"]
```

## 💡 **Dicas**

- ✅ **Sempre use** `docker-compose up --build` na primeira vez
- ✅ **Mantenha** os volumes para persistência de dados
- ✅ **Use logs** para debug: `docker-compose logs -f`
- ❌ **Não commite** arquivos `.env` com senhas
- ❌ **Não use** `docker-compose down -v` sem backup

## 🔗 **Links úteis**

- [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL Docker](https://hub.docker.com/_/postgres)
- [Node.js Docker](https://hub.docker.com/_/node) 