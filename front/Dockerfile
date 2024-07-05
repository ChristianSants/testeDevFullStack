FROM node:20.10-alpine

# diretório de trabalho
WORKDIR /app

COPY . .

RUN rm -rf node_modules
RUN /bin/sh -c npm install

EXPOSE 3000

CMD ["npm", "start"]
