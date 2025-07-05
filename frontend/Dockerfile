# ============================================================================
# DOCKERFILE PARA FRONTEND (Next.js + React)
# ============================================================================

# Imagem base Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Instala dependências do sistema
RUN apk add --no-cache python3 make g++

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia o código fonte
COPY . .

# Expõe a porta
EXPOSE 3000

# Comando padrão (desenvolvimento)
CMD ["npm", "run", "dev"] 