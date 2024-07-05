FROM node:20.10-alpine

# diretório de trabalho
WORKDIR /app

COPY . .

RUN rm -rf node_modules
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
