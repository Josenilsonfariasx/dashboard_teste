# Use uma imagem base do Node.js
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos necessários para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o resto dos arquivos para o contêiner
COPY . .

# Construa o aplicativo
RUN npm run build

# Exponha a porta 3000
EXPOSE 3000

# Comando para iniciar o aplicativo quando o contêiner for iniciado
CMD ["npm", "run", "dev"]
