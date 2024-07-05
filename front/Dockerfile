FROM node:20.10-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents to the container at /app
COPY . .

# Build the React app
RUN npm run build


EXPOSE 3000

CMD ["npm", "start"]
