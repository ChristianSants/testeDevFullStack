FROM node:20.10-alpine

# diretório de trabalho
WORKDIR /app

COPY . .

RUN npm config set registry http://registry.npmjs.org/

RUN rm -rf node_modules
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
