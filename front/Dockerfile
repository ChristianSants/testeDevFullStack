# Use a imagem oficial do Node.js
FROM node:20.10-alpine

# Defina o diretório de trabalho
WORKDIR /var/www/frontend

# Copie os arquivos do código fonte para o contêiner
COPY . .

# Instale as dependências
RUN npm install

# Construa o aplicativo React para produção
RUN npm run build

# Exponha a porta que o servidor do aplicativo React está ouvindo
EXPOSE 3000

# Comando padrão para iniciar o servidor do aplicativo React
CMD ["npm", "start"]
