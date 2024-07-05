FROM node:20.10-alpine

WORKDIR /var/www/html

COPY . .

# RUN rm -rf node_modules
RUN npm install

RUN npm run build

EXPOSE 3000