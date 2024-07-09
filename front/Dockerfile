FROM node:20.10-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json .
RUN yarn install

# Copy source files and build the application
COPY . .
RUN yarn build

# Serve the static files using nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
