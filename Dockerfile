# Etapa 1: Construção da imagem
FROM node:23 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Executa o build do Next.js
RUN npm run build

# Etapa 2: Servir a aplicação
FROM node:23 AS production

WORKDIR /app

# Copia os arquivos gerados na etapa de build
COPY --from=build /app ./

# Expõe a porta em que o Next.js vai rodar (3000 por padrão)
EXPOSE 3000

# Inicia a aplicação Next.js
CMD ["npm", "start"]