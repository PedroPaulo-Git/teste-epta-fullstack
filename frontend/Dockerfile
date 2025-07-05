# ============================================================================
# DOCKERFILE PARA FRONTEND (Next.js + React)
# ============================================================================

# Imagem base Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Instala dependências do sistema
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

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