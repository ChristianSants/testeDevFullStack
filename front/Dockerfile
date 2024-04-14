FROM node:20.10-alpine

# diretório de trabalho
WORKDIR /var/www/html/front

COPY . .

# Instalando dependências
RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN npm install -g react-scripts --force
RUN npm install --no-audit

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
