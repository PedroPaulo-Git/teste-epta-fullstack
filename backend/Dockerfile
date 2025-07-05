# ============================================================================
# DOCKERFILE PARA BACKEND (Express + TypeScript)
# ============================================================================

# Imagem base Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Instala dependências do sistema
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copia arquivos de dependências
ENV NODE_ENV=development
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia o código fonte
COPY . .

# Gerar banco prisma
RUN npx prisma generate

# Compila TypeScript
RUN npm run build

# Expõe a porta
EXPOSE 5000

# Comando padrão
CMD ["npm", "run","server"] 