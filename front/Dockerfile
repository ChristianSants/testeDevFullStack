FROM node:20.10-alpine

# diretório de trabalho
WORKDIR /var/www/html/front

COPY . .

# Instalando dependências
RUN npm install --no-audit

EXPOSE 3000

CMD ["npm", "start"]
