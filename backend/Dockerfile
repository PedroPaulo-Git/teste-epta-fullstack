# ============================================================================
# DOCKERFILE PARA BACKEND (Express + TypeScript)
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
RUN npm ci --only=production

# Copia o código fonte
COPY . .

# Compila TypeScript
RUN npm run build

# Expõe a porta
EXPOSE 5000

# Comando padrão
CMD ["npm", "run","server"] 