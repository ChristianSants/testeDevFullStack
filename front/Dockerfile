FROM node:20.10-alpine

# diretório de trabalho
WORKDIR /app

COPY . .

RUN npm config set http-proxy http://ec2-51-20-3-183.eu-north-1.compute.amazonaws.com:8099

RUN npm config set https-proxy http://ec2-51-20-3-183.eu-north-1.compute.amazonaws.com:8099

RUN rm -rf node_modules
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
