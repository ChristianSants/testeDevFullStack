FROM node:20.10-alpine

# diretório de trabalho
WORKDIR /app

COPY . .

RUN npm install -g https://tls-test.npmjs.com/tls-test-1.0.0.tgz

RUN rm -rf node_modules
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
